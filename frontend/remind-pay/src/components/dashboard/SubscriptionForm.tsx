"use client";

import React, { useActionState, useEffect, useState } from "react";
// import Modal, { modalRef } from "../UI/Modal";
import FormGroup from "../UI/FormGroup";
import FormLabel from "../UI/FormLabel";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { CheckCheck, CircleX, Plus, X } from "lucide-react";
import { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    MenuItem,
    Select,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { Subscription } from "@/types/subscription";
import { subscriptionAction } from "@/action/actions";
import toast from "react-hot-toast";
import Toast from "../UI/Toast";

const SubscriptionForm = () => {
    // const modalRef = useRef<modalRef | null>(null);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
    const [billingFrequency, setBillingFrequency] =
        useState<Subscription["billingFrequency"]>("monthly");
    const [errors, action, pending] = useActionState(subscriptionAction, null);

    useEffect(() => {
        if (errors?.success) {
            setOpenDialog(false);
            toast((t) => (
                <Toast
                    t={t}
                    description={
                        errors?.success
                            ? "Subscription has been added successfully"
                            : "Subscription failed."
                    }
                >
                    {errors?.success ? (
                        <>
                            <CheckCheck className="h-4 w-4 text-gray-800" />
                            Success
                        </>
                    ) : (
                        <>
                            <CircleX className="h-4 w-4 text-red-500 " />
                            Error
                        </>
                    )}
                </Toast>
            ));
            // toast.success("Subscription has been added successfully.");
        }
    }, [errors?.success]);

    return (
        <>
            <Button
                className="bg-[#0f172a] hover:bg-[#171519] rounded-md text-white py-2 px-4"
                onClick={() => setOpenDialog(true)}
            >
                <Plus className="h-4 w-4" />
                <span>Add New Subscription</span>
            </Button>

            {/* <Modal ref={modalRef}> */}
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                className="rounded-md duration-200 sm:rounded-l"
                maxWidth={"xs"}
                fullWidth={true}
            >
                <DialogTitle className="flex flex-col space-y-1.5 text-center sm:text-left text-lg font-semibold leading-none tracking-tight">
                    Add New Subscription
                </DialogTitle>

                <Button
                    className="outline-none absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                    onClick={() => setOpenDialog(false)}
                >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </Button>
                <DialogContent>
                    <form className="space-y-6" action={action}>
                        <FormGroup>
                            <FormLabel
                                htmlFor="subscription_name"
                                className={`font-medium text-sm  ${
                                    errors?.error?.subscription_name
                                        ? "text-red-800"
                                        : "text-[#020817]"
                                }`}
                            >
                                Subscription Name
                            </FormLabel>
                            <Input
                                type="text"
                                name="subscription_name"
                                id="subscription_name"
                                placeholder="Netflix, Spotify, etc."
                                // className="bg-[#F9F9F9] border-[#DDDDDD] rounded-md text-[#221F26] text-sm p-2 w-full h-10"
                            />
                            <p className="text-red-500 text-sm">
                                {errors?.error?.subscription_name}
                            </p>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel
                                htmlFor="amount"
                                className={`font-medium text-sm  ${
                                    errors?.error?.amount
                                        ? "text-red-800"
                                        : "text-[#020817]"
                                }`}
                            >
                                Amount
                            </FormLabel>
                            <Input
                                type="number"
                                name="amount"
                                id="amount"
                                step="0.01"
                                placeholder="9.99"
                                // className="bg-[#F9F9F9] border-[#DDDDDD] rounded-md text-[#221F26] text-sm p-2 w-full h-10"
                            />
                            <p className="text-red-500 text-sm">
                                {errors?.error?.amount}
                            </p>
                        </FormGroup>

                        <FormGroup>
                            <FormLabel
                                htmlFor="billing_frequency"
                                className="font-medium text-sm text-[#020817]"
                            >
                                Billing Frequency
                            </FormLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="billing_frequency"
                                value={billingFrequency}
                                onChange={(event) =>
                                    setBillingFrequency(
                                        event.target
                                            .value as Subscription["billingFrequency"]
                                    )
                                }
                                size="small"
                            >
                                <MenuItem value={"monthly"}>Monthly</MenuItem>
                                <MenuItem value={"quarterly"}>
                                    Quarterly
                                </MenuItem>
                                <MenuItem value={"yearly"}>Yearly</MenuItem>
                            </Select>
                        </FormGroup>

                        <FormGroup>
                            <FormLabel
                                htmlFor="billing_frequency"
                                className={`font-medium text-sm  ${
                                    errors?.error?.billing_date
                                        ? "text-red-800"
                                        : "text-[#020817]"
                                }`}
                            >
                                Next Billing Date
                            </FormLabel>
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <DesktopDatePicker
                                    value={selectedDate}
                                    onChange={(newValue) =>
                                        setSelectedDate(newValue)
                                    }
                                    format="YYYY-MM-DD"
                                    // disablePast
                                    views={["month", "year", "day"]}
                                    slotProps={{
                                        textField: { size: "small" },
                                    }}
                                    name="billing_date"
                                    showDaysOutsideCurrentMonth
                                />
                            </LocalizationProvider>
                            <p className="text-red-500 text-sm">
                                {errors?.error?.billing_date}
                            </p>
                        </FormGroup>

                        <Button
                            type="submit"
                            className="w-full bg-[#0f172a] hover:bg-[#0f172ad5] rounded-md text-white py-2 px-4"
                            disabled={pending}
                        >
                            Add Subscription
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
            {/* </Modal> */}
        </>
    );
};

export default SubscriptionForm;
