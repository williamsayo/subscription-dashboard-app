import { Subscription } from "@/types/subscription";
import React from "react";
import Card from "../UI/card/Card";
import { Calendar, CreditCard, DollarSign } from "lucide-react";

interface StatsOverviewProps {
    subscriptions: Subscription[];
    totalMonthly: number;
    totalYearly: number;
    activeSubscriptions: number;
    cancelledSubscriptions: number;
}

const StatsOverview = ({
    subscriptions,
    totalMonthly,
    totalYearly,
    activeSubscriptions,
    cancelledSubscriptions,
}: StatsOverviewProps) => {
    
    const nextPayment = subscriptions
        .filter((sub) => sub.active)
        .sort(
            (a, b) =>
                new Date(a.nextBillingDate).getTime() -
                new Date(b.nextBillingDate).getTime()
        )[0];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card
                title={"Monthly Cost"}
                description={"Active subscriptions"}
                icon={<DollarSign className="h-5 w-5 text-gray-500" />}
            >
                <div className="text-2xl font-bold">
                    ${totalMonthly.toFixed(2)}
                </div>
                <p className="text-xs text-muted-foreground">
                    ${totalYearly.toFixed(2)} per year
                </p>
            </Card>
            <Card
                title=" Active Subscriptions"
                description="Currently active services"
                icon={<CreditCard className="h-5 w-5 text-gray-500" />}
            >
                <div className="text-2xl font-bold">{activeSubscriptions}</div>
                <p className="text-xs text-muted-foreground">
                    {cancelledSubscriptions} cancelled
                </p>
            </Card>
            <Card
                title="Next Payment"
                description="Upcoming billing"
                icon={<Calendar className="h-5 w-5 text-gray-500" />}
            >
                {nextPayment ? (
                    <>
                        <div className="text-2xl font-bold">
                            ${nextPayment.amount.toFixed(2)}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {new Date(
                                nextPayment.nextBillingDate
                            ).toLocaleDateString()}
                        </p>
                    </>
                ) : (
                    <div className="text-sm text-muted-foreground">
                        No upcoming payments
                    </div>
                )}
            </Card>
        </div>
    );
};

export default StatsOverview;
