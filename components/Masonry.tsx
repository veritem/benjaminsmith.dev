import { makeStyles } from "@material-ui/core";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import { useMemo } from "react";

interface StylesProps {
    calculatedProperties: CSSProperties
}

const useStyles = makeStyles((theme) => ({
    masonryContainer: (props: StylesProps) => ({
        display: "flex",
        flexFlow: "column wrap",
        alignContent: "start",
        ...props.calculatedProperties
    })
}));

/**
 * Calculate styles for a given column width
 * @param cols Number of columns in the masonry
 * @param sizeMetric Array of item sizes
 * @returns CSS properties to be applied to the masonry container and the number of additional divs to add
 */
function calculateMasonryForCols(cols: number, sizeMetrics: number[]): CSSProperties {
    // Get the order that the items should be in

    const rowCount = Math.ceil(sizeMetrics.length / cols);
    let colHeights = sizeMetrics.slice(0, cols);
    // The correct order for the elements, not including the first row
    let sortedRows = Array.from(Array(cols).keys());
    for(let i = 1; i < rowCount; i++) {
        // Sorted largest to smallest
        const sortedColHeights = colHeights
            .map((item, index) => ({ item, originalIndex: index }))
            .sort((a, b) => a.item - b.item);
        
        // Sorted smallest to largest
        let fullRowMetrics = sizeMetrics
            // Get the items that should be in this row
            .slice(i * cols, (i + 1) * cols);
                
        // Add empty items to fill row
        for(let j = fullRowMetrics.length; j < cols; j++) {
            fullRowMetrics.push(0);
        }

        const sortedRow = fullRowMetrics
            // Convert the items into an object storing the value and the index, so we can
            // reference the original index when the array is sorted
            .map((sizeMetric, index) => ({ sizeMetric, originalIndex: index }))
            // Sort the array by the size metric
            .sort((a, b) => b.sizeMetric - a.sizeMetric)
            // Rearrange the items to be in the original order of the previous row, selecting
            // each item by finding the previous row item's position in the sorted list, and
            // then finding the item with the same index in the new array. Because the arrays
            // are sorted inversely a large item in the previous array will result in a small
            // item in the new array.
            .map((_, index, array) => (array[sortedColHeights.findIndex(item => item.originalIndex === index)]));
        
        // Update column heights
        colHeights = colHeights.map((item, index) => item + sortedRow[index].sizeMetric);

        // Add row to sortedRows
        sortedRows.push(...sortedRow
            // Filter out any empty spots from 
            //.filter(item => item.originalIndex < itemsInRowCount)
            .map(item => item.originalIndex + i * cols));
    }

    // Rotate the array to match CSS column order, and replace non-existent indexes with undefined

    let rotatedRows: (number | undefined)[] = [];
    for(let i = 0; i < cols; i++) {
        for(let j = 0; j < rowCount; j++) {
            let newVal: number | undefined = sortedRows[i + cols * j];
            if(newVal >= sizeMetrics.length) {
                newVal = undefined;
            }
            rotatedRows.push(newVal);
        }
    }

    // Generate CSS to set the order of the items

    return rotatedRows.length > 0 ? rotatedRows.map((item, index, array): CSSProperties => (item !== undefined ? {
        [`& > *:nth-child(${item + 1})`]: {
            order: index + 1,
            // Break after the current item if it is the end of the column or if the next item is undefined
            pageBreakAfter: ((index + 1) % rowCount === 0) || (array[index + 1] === undefined) ? "always" : "inherit"
        }
        // Flatten array of objects into a single object
    } : {})).reduce((acc, cur) => ({...acc, ...cur})) : {};
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
    children: React.ReactNode
}

export default function Masonry(props: MasonryProps) {
    const calculatedProperties: CSSProperties = useMemo(() => (
        // If there is only one column masonry doesn't need to be used
        Array.from({length: props.maxCols - 1}, (_, i) => ({
            [`@media (min-width: calc(calc(${props.borderWidth} * 2) + calc(${props.colWidth} * ${i + 2})))`]: {
                ...calculateMasonryForCols(i + 2, props.sizeMetrics)
            }
        })).reduce((acc, cur) => ({...acc, ...cur}))
    ), []);

    const styles = useStyles({calculatedProperties});

    return (
        <div className={styles.masonryContainer + (props.className !== undefined ? (" " + props.className) : "")}>
            {props.children}
        </div>
    )
}