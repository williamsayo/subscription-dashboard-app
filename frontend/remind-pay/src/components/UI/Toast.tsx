import { X } from "lucide-react";
import React from "react";
import toast, { Toast as ToastInterface } from "react-hot-toast";

const Toast = ({
    children,
    t,
    description,
}: {
    children: React.ReactNode;
    t: ToastInterface;
    description: string;
}) => {
    return (
        <div className="flex flex-col gap-2 relative group">
            <h4 className=" flex items-center gap-1 text-sm font-semibold text-stone-800 capitalize">
                {children}
            </h4>
            <span className="text-sm">{description}</span>
            <button
                title="close"
                type="button"
                onClick={() => toast.dismiss(t.id)}
                className="hidden cursor-pointer group-hover:block absolute right-0 top-0 text-stone-300 hover:text-stone-500 "
            >
                <X className="h-3.5 w-3.5 text-sm " />
            </button>
        </div>
    );
};

export default Toast;
