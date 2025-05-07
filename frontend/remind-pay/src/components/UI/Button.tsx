import React, { JSX } from "react";

const Button = ({
    children,
    className,
    ...props
}: JSX.IntrinsicElements["button"]) => {
    return (
        <button
            {...props}
            // type={type || "button"}
            className={` cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
