import React from "react";

type CardProps = {
    children: React.ReactNode;
    className?: string;
    icon?: React.ReactNode;
    title: string;
    description: string;
    // subtotal: string;
    // total: string;
};

const Card = ({ children, className, title, description, icon }: CardProps) => {
    return (
        <div
            className={`
                rounded-lg border border-gray-200 bg-white text-card-foreground shadow-2xs p-6 ${className}`}
        >
            <div className="flex flex-row items-center justify-between pb-2 border-b border-gray-100">
                <div className="space-y-1">
                    <span className="text-sm font-medium text-gray-800 leading-none tracking-tight">
                        {title}
                    </span>
                    <p className="text-sm text-muted-foreground text-gray-400">
                        {description}
                    </p>
                </div>
                {icon}
            </div>
            <div>{children}</div>
        </div>
    );
};

export default Card;
