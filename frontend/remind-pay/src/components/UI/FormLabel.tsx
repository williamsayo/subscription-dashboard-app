import React from "react";

const FormLabel = ({
    children,
    htmlFor,
    className,
}: {
    children: React.ReactNode;
    htmlFor: string;
    className?: string;
}) => {
    return (
        <label
            htmlFor={htmlFor}
            className={`text-[#333] capitalize w-fit ${className}`}
        >
            {children}
        </label>
    );
};

export default FormLabel;
