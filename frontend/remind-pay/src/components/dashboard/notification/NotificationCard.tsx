"use client";

import Button from "@/components/UI/Button";
import { Switch } from "@mui/material";
import { Mail, MailCheck, MailMinus } from "lucide-react";
import React, { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";

const NotificationCard = () => {
    const [emailEnabled, setEmailEnabled] = useState(true);

    const handleToggleEmail = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const checked = event.target.checked;
        setEmailEnabled(checked);
        toast.success(
            checked ? "Notifications enabled" : "Notifications disabled",
            {
                icon: checked ? (
                    <MailCheck className="h-4 w-4 text-gray-800" />
                ) : (
                    <MailMinus className="h-4 w-4 text-gray-800" />
                ),
            }
        );
    };

    const handleTestEmail = () => {
        toast.success(`Test email sent to ${"userEmail"}.`, {
            icon: <MailCheck className="h-4 w-4 text-green-600" />,
        });
    };
    return (
        <div
            className={`
        rounded-lg border border-gray-200 bg-white text-card-foreground shadow-2xs p-4 md:p-6`}
        >
            <div className="flex flex-row items-baseline justify-between pb-2 border-b border-gray-100">
                <div className="space-y-1">
                    <div className="flex flex-col items-start">
                        <span className=" flex gap-1 items-center text-md font-medium text-gray-800 leading-none tracking-tight">
                            <Mail className="h-5 w-5 text-gray-500" />
                            Email Notifications
                        </span>
                        <p className="text-sm text-muted-foreground text-gray-400">
                            {/* Get reminded before your subscriptions renew */}
                            Receive subscription reminders via email
                        </p>
                    </div>
                </div>
                <Switch
                    checked={emailEnabled}
                    onChange={handleToggleEmail}
                    size="medium"
                    sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": {
                            color: "#171519",
                        },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                            {
                                backgroundColor: "#0f172a",
                            },
                    }}
                />
            </div>
            <div className="space-y-4 my-4">
                <div className="text-sm">
                    <p>Notification will be sent to:</p>
                    <p className="font-medium mt-1">{"userEmail"}</p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-md p-3 text-sm">
                    <ul className=" text-gray-600">
                        <li className="font-medium">
                            Reminders sent 7 days before next billing date
                        </li>
                    </ul>
                </div>
            </div>

            <Button
                onClick={handleTestEmail}
                disabled={!emailEnabled}
                className="border border-gray-200 bg-transparent hover:bg-gray-100 py-2 px-4 "
            >
                Send Test Email
            </Button>
        </div>
    );
};

export default NotificationCard;
