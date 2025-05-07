import React, { JSX } from "react";

const Input = ({ type, className, ...props }: JSX.IntrinsicElements["input"]) => {
    return (
        <input
            {...props}
            type={type || "text"}
            className={`${className} flex rounded-md border border-[#DDDDDD] bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground placeholder:capitalize focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`}
        />
    );
};

export default Input;
