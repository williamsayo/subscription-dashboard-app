import React from "react";

const FormGroup = ({ children }: { children: React.ReactNode }) => {
    return <div className="flex flex-col gap-2">{children}</div>;
};

export default FormGroup;
