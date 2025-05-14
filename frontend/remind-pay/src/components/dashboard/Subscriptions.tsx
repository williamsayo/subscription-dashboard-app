import React, { use } from "react";
import { Subscription } from "@/types/subscription";
import { AlertCircle, BellRing, Tv } from "lucide-react";
import SubscriptionStatusToggle from "./SubscriptionStatusToggle";
import Badge from "../UI/Badge";

const Subscriptions = ({
    subscriptionsPromise,
}: {
    subscriptionsPromise: Promise<Subscription[]>;
}) => {
    const subscriptions = use(subscriptionsPromise);
    // Function to determine if a subscription is due soon or overdue
    const getPaymentStatus = (subscription: Subscription) => {
        if (!subscription.active) return null;

        const today = new Date();

        const billingDate = new Date(subscription.nextBilling);
        const differenceInDays = Math.ceil(
            (billingDate.getTime() - today.getTime()) / (1000 * 3600 * 24)
        );

        const billingDue = differenceInDays >= 1 && differenceInDays <= 5;

        return { billingDue, differenceInDays };
    };

    return (
        <div className="space-y-4">
            {subscriptions.length > 0 ? (
                subscriptions.map((subscription) => {
                    const today = new Date();
                    const billingDate = new Date(subscription.nextBillingDate);
                    const nextBilling = new Date(
                        subscription.nextBillingDate
                    ).toLocaleDateString();
                    const cancellationDate = new Date(
                        subscription.updatedAt
                    ).toLocaleDateString();

                    const dueToday =
                        Math.floor(
                            (today.getTime() - billingDate.getTime()) /
                                (1000 * 3600 * 24)
                        ) === 0;

                    const paymentStatus = getPaymentStatus(subscription);
                    return (
                        <div
                            key={subscription.id}
                            className={`flex items-center justify-between p-2 md:p-4 rounded-lg ${
                                subscription.active
                                    ? dueToday
                                        ? "bg-red-50 border border-red-200"
                                        : "bg-gray-50 border border-gray-100"
                                    : "bg-gray-100 border-dashed border border-gray-300"
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <span className="p-2 bg-[#0f172adb] rounded-full flex items-center justify-center">
                                    <Tv className=" h-4 w-4 md:h-5 md:w-5 text-gray-100" />
                                </span>

                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-medium text-gray-800 capitalize">
                                            {subscription.name}
                                        </h3>
                                        {paymentStatus?.billingDue && (
                                            <Badge className="bg-amber-500 text-white">
                                                <BellRing className="h-3 w-3" />{" "}
                                                Due in{" "}
                                                {paymentStatus.differenceInDays}{" "}
                                                days
                                            </Badge>
                                        )}

                                        {dueToday && (
                                            <Badge className="bg-red-500 text-white">
                                                <AlertCircle className="h-3 w-3" />{" "}
                                                Due
                                            </Badge>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        {subscription.active
                                            ? `Next billing: ${nextBilling}`
                                            : `Cancelled: ${cancellationDate}`}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <p className="font-semibold text-gray-800">
                                    ₦{subscription.amount.toFixed(2)}/
                                    {subscription.billingFrequency.slice(0, 2)}
                                </p>
                                <div className="flex items-center gap-2">
                                    <span
                                        className={`text-sm ${
                                            subscription.active
                                                ? "text-green-600"
                                                : "text-gray-500"
                                        }`}
                                    >
                                        {subscription.active
                                            ? "Active"
                                            : "Cancelled"}
                                    </span>
                                    <SubscriptionStatusToggle
                                        isActive={subscription.active}
                                        title={subscription.name}
                                        id={subscription.id}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })
            ) : (
                <h3 className="text-center text-stone-500 mt-4">
                    No available Subscription
                </h3>
            )}
        </div>
    );
};

export default Subscriptions;
