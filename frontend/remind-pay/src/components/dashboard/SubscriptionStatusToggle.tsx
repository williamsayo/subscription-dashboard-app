"use client";

import React, {
    useActionState,
    useEffect,
    useState,
    useTransition,
} from "react";
import Button from "../UI/Button";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import { updateSubscriptionStatusAction } from "@/action/actions";
import toast from "react-hot-toast";
import { CircleX } from "lucide-react";

const SubscriptionStatusToggle = ({
    id,
    title,
    isActive,
}: {
    id: string | number;
    title: string;
    isActive: boolean;
}) => {
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const updatedAction = updateSubscriptionStatusAction.bind(null, isActive);
    const [state, action] = useActionState(updatedAction, null);

    const [pending, startTransition] = useTransition();

    const toggleStatus = () => {
        // send api request
        startTransition(() => action(id));

        // close dialog
        setOpenDialog(false);
    };

    useEffect(() => {
        if (state?.success)
            toast.success(`${title} ${state.message}`, {
                // icon:
            });
        if (state && !state?.success) {
            toast.remove();
            toast.error(`${title} ${state.message}`, {
                icon: <CircleX className="text-red-500 text-sm" />,
            });
        }
    }, [state, title]);

    return (
        <>
            <Button
                className={
                    isActive
                        ? "border border-stone-200 bg-white hover:bg-neutral-50 hover:text-accent-foreground py-2 px-4"
                        : "bg-[#0f172a] hover:bg-[#0f172ad5] text-white py-2 px-3"
                }
                onClick={() => setOpenDialog(true)}
            >
                {isActive ? "Cancel" : "Reactivate"}
            </Button>

            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                className="duration-200"
                slotProps={{ paper: { sx: { borderRadius: ".75rem" } } }}
            >
                <DialogTitle sx={{ fontWeight: "bold", paddingBottom: "5px" }}>
                    {isActive
                        ? "Cancel Subscription"
                        : "Reactivate Subscription"}
                </DialogTitle>
                <DialogContent
                    className="w-full text-[#64748b] text-sm"
                    sx={{
                        paddingBlock: "0",
                    }}
                >
                    Are you sure you want to{" "}
                    {isActive ? "cancel" : "reactivate"} your {title}{" "}
                    subscription?
                    {isActive &&
                        " This will stop your subscription notification at the end of the billing period."}
                </DialogContent>
                <DialogActions
                    className="flex gap-4"
                    sx={{
                        paddingBlock: ".75rem 1.25rem",
                        paddingRight: "1.5rem",
                    }}
                >
                    <Button
                        onClick={() => setOpenDialog(false)}
                        className="border border-stone-200 bg-white hover:bg-neutral-50 hover:text-accent-foreground py-2 px-4 text-sm"
                        disabled={pending}
                    >
                        No, go back
                    </Button>
                    <Button
                        onClick={toggleStatus}
                        className="bg-[#0f172a] hover:bg-[#0f172ad5] text-white py-2 px-4  text-sm"
                        disabled={pending}
                    >
                        Yes, {isActive ? "cancel" : "reactivate"}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default SubscriptionStatusToggle;
