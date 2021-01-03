import { makeStyles } from "@material-ui/core";
import { useEffect, useMemo, useState } from "react";

const useStyles = makeStyles((theme) => ({
    masonryContainer: {
        "& > div": {
            display: "inline-block",
            verticalAlign: "top"
        }
    }
}));

/**
 * Calculate styles for a given column width
 * @param cols Number of columns in the masonry
 * @param sizeMetric Array of item sizes
 * @returns Array where each value is the index of an item in sizeMetrics
 */
function calculateMasonryForCols(cols: number, sizeMetrics: number[]): number[][] {
    // Get the order that the items should be in

    const rowCount = Math.ceil(sizeMetrics.length / cols);
    let colHeights = sizeMetrics.slice(0, cols);
    // Array of sorted columns, where each item represents the index of the item in sizeMetrics that should go there
    let sortedCols = Array(cols).fill(undefined).map((_, i) => i >= sizeMetrics.length ? [] : [i]);
    for(let i = 1; i < rowCount; i++) {
        // Sorted largest to smallest
        const sortedColHeights = colHeights
            .map((item, index) => ({ item, originalIndex: index }))
            .sort((a, b) => a.item - b.item);
        
        // Sorted smallest to largest
        let fullRowMetrics = sizeMetrics
            // Get the items that should be in this row
            .slice(i * cols, (i + 1) * cols);
        
        const itemsInRow = fullRowMetrics.length;
        // Add empty items to fill row
        for(let j = itemsInRow; j < cols; j++) {
            fullRowMetrics.push(0);
        }

        const sortedRow = fullRowMetrics
            // Convert the items into an object storing the value and the index, so we can
            // reference the original index when the array is sorted
            .map((sizeMetric, index) => ({ sizeMetric, originalIndex: index }))
            // Sort the array by the size metric
            .sort((a, b) => b.sizeMetric - a.sizeMetric);
                
        // Add row to sortedCols
        for(let j = 0; j < cols; j++) {
            // Rearrange the items to be in the original order of the previous row, selecting
            // each item by finding the previous row item's position in the sorted list, and
            // then finding the item with the same index in the new array. Because the arrays
            // are sorted inversely a large item in the previous array will result in a small
            // item in the new array.
            const item = sortedRow[sortedColHeights.findIndex(item => item.originalIndex === j)];
            // Update column heights
            if(item.originalIndex < itemsInRow) {
                colHeights[j] += item.sizeMetric;
                sortedCols[j].push(item.originalIndex + i * cols);
            }
        }
    }
    
    return sortedCols;
}

interface MasonryProps {
    // The main limitation with this method is that you have to have a set maximum for the number of columns
    maxCols: number,
    // A number for each child element representing its relative height
    sizeMetrics: number[],
    // Width of each column
    colWidth: string | number,
    // Distance from the edge of the window to the side of the masonry
    borderWidth: string | number,
    className?: string,
    children: React.ReactNodeArray
}

declare global {
    interface Window {
        MASONRY_REQUESTID: number | undefined,
        MASONRY_MEDIAEVTS: {
            m: boolean,
            i: number
        }[]
    }
}

if(typeof window !== 'undefined') {
    window.MASONRY_REQUESTID = undefined;
    window.MASONRY_MEDIAEVTS = [];
}

export default function Masonry(props: MasonryProps) {
    const [cols, setCols] = useState(1);

    const columnMaps = useMemo(() => Array.from({length: props.maxCols}, 
        (_, i) => calculateMasonryForCols(i + 1, props.sizeMetrics)), []);

    useEffect(() => {
        if(typeof window === 'undefined') return;
        // This will run when the client first loads the page
        const mediaQueries = Array(props.maxCols - 1).fill(undefined)
            // Create a media query for when the number of columns i + 1 should be used
            .map((_, i) => window.matchMedia(`(min-width: calc(calc(${props.borderWidth} * 2) + calc(${props.colWidth} * ${i + 2})))`));
        
        // Initial cols calculation
        const results = mediaQueries.map(query => query.matches);
        let newCols = props.maxCols;
        for(let i = 0; i < props.maxCols - 1; i++) {
            if(!results[i]) {
                newCols = i + 1;
                break;
            }
        }
        setCols(newCols);

        // Set up event listeners
        // For each possible number of columns
        for(let i = 1; i < props.maxCols; i++) {            
            mediaQueries[i - 1]
                // When the status of the query changes
                .addEventListener("change", ev => {
                    // Add the column count corresponding to the query and the new status to a global array
                    window.MASONRY_MEDIAEVTS.push({i, m: ev.matches});
                    // If there hasn't already been a requestAnimationFrame scheduled
                    if(!window.MASONRY_REQUESTID) {
                        // Request an animation frame and set its ID to a global variable
                        window.MASONRY_REQUESTID = window.requestAnimationFrame(() => {
                            // By here all media query change events for the frame will have been run,
                            // and the results are stored in a global variable
                            // All of the m values of the objects in the array will be true if the window
                            // got larger (more min-width queries activating) and they will be false
                            // if it got smaller, so we can choose the highest i as the new column count
                            // if the window got larger and the lowest i if the window got smaller. This
                            // is easy because the array items are already sorted by lowest i to highest i.
                            setCols(window.MASONRY_MEDIAEVTS[0].m
                                ? window.MASONRY_MEDIAEVTS[window.MASONRY_MEDIAEVTS.length - 1].i + 1
                                : window.MASONRY_MEDIAEVTS[0].i);
                            
                            // Clear the array for the next resize event
                            window.MASONRY_MEDIAEVTS = [];
                            // And clear the request ID
                            window.MASONRY_REQUESTID = undefined;
                        });
                    }
                });
        }
    }, [typeof window]);

    const styles = useStyles();

    return (
        <div className={styles.masonryContainer + (props.className !== undefined ? (" " + props.className) : "")}>
            {columnMaps[cols - 1].map((column, index) => (
                <div key={index}>
                    {column.map(childIndex => props.children[childIndex])}
                </div>
            ))}
        </div>
    )
}