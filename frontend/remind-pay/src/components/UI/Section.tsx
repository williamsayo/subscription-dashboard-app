import React from "react";

const Section = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className: string;
}) => {
    return (
        <section className={`${className} max-w-[1080px]`}>{children}</section>
    );
};

export default Section;
