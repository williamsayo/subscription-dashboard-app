import React, { JSX } from "react";

const Badge = ({
    children,
    className,
    ...props
}: JSX.IntrinsicElements["span"]) => {
    return (
        <span
            className={`inline-flex gap-1 items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}
            {...props}
        >
            {children}
        </span>
    );
};

export default Badge;
