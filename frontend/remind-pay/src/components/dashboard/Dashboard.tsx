import { Subscription } from "@/types/subscription";
import React from "react";
import StatsOverview from "./StatsOverview";
import Subscriptions from "./Subscriptions";
import Card from "../UI/card/Card";
import SubscriptionForm from "./SubscriptionForm";

const Dashboard = async ({
    subscriptions,
}: {
    subscriptions: Subscription[];
}) => {

    const totalMonthly = subscriptions
        .filter((sub) => sub.active)
        .reduce((sum, sub) => {
            switch (sub.billingFrequency) {
                case "monthly":
                    return sum + sub.amount;
                case "quarterly":
                    return sum + sub.amount / 3;
                case "yearly":
                    return sum + sub.amount / 12;
                default:
                    return sum;
            }
        }, 0);

    const totalYearly = totalMonthly * 12;
    const activeSubscriptions = subscriptions.filter(
        (sub) => sub.active
    ).length;
    const cancelledSubscriptions = subscriptions.filter(
        (sub) => !sub.active
    ).length;

    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <StatsOverview
                    subscriptions={subscriptions}
                    totalMonthly={totalMonthly}
                    totalYearly={totalYearly}
                    activeSubscriptions={activeSubscriptions}
                    cancelledSubscriptions={cancelledSubscriptions}
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <Subscriptions subscriptions={subscriptions} />
                    </div>
                    <Card
                        title="Add Subscription"
                        description="Track a new subscription"
                    >
                        <div className="flex items-center justify-center h-[200px]">
                            <SubscriptionForm />
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
