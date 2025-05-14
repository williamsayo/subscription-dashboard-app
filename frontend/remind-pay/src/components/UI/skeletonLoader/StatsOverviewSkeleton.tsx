import React from "react";
import Card from "../card/Card";
import { Calendar, CreditCard, DollarSign } from "lucide-react";

const StatsOverviewSkeleton = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card
                title={"Monthly Cost"}
                description={"Active subscriptions"}
                icon={<DollarSign className="h-5 w-5 text-gray-500" />}
            >
                <div className="text-2xl font-bold">
                    <span className="block rounded-sm animate-pulse w-1/2 my-2 h-5 bg-[#00000010]" />
                </div>
                <p className="text-xs text-muted-foreground">
                    <span className="block rounded-sm animate-pulse w-2/3 my-2 h-5 bg-[#00000010]" />
                </p>
            </Card>
            <Card
                title=" Active Subscriptions"
                description="Currently active services"
                icon={<CreditCard className="h-5 w-5 text-gray-500" />}
            >
                <div className="text-2xl font-bold">
                    <span className="block rounded-sm animate-pulse w-1/2 my-2 h-5 bg-[#00000010]" />
                </div>
                <p className="text-xs text-muted-foreground">
                    <span className="block rounded-sm animate-pulse w-2/3 my-2 h-5 bg-[#00000010]" />
                </p>
            </Card>
            <Card
                title="Next Payment"
                description="Upcoming billing"
                icon={<Calendar className="h-5 w-5 text-gray-500" />}
            >
                <div className="text-2xl font-bold">
                    <span className="block rounded-sm animate-pulse w-1/2 my-2 h-5 bg-[#00000010]" />
                </div>
                <p className="text-xs text-muted-foreground">
                    <span className="block rounded-sm animate-pulse w-2/3 my-2 h-5 bg-[#00000010]" />
                </p>
            </Card>
        </div>
    );
};

export default StatsOverviewSkeleton;
