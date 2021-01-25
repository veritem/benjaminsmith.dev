interface ResizingHeaderProps {
    children: string
}

export default function ResizingHeader({ children }: ResizingHeaderProps) {
    return (
        <div>
            <svg fill="none" viewBox="0 0 134.867 19" xmlns="http://www.w3.org/2000/svg">
                <foreignObject height="100%" width="100%">
                    <div>
                        <style>
                            {`div {
                                font-size: 1rem;
                            }`}
                        </style>
                        <div className="MuiTypography-root MuiTypography-h2">{children}</div>
                    </div>
                </foreignObject>
            </svg>
        </div>
    )
}