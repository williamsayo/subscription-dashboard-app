import React, { Suspense } from "react";
import StatsOverview from "./StatsOverview";
import Subscriptions from "./Subscriptions";
import Card from "../UI/card/Card";
import SubscriptionForm from "./SubscriptionForm";
import { ListPlus, Scroll } from "lucide-react";
import NotificationCard from "./notification/NotificationCard";
import { getEmail, getSubscriptions } from "@/util/api";
import StatsOverviewSkeleton from "../UI/skeletonLoader/StatsOverviewSkeleton";
import SubscriptionCardSkeleton from "../UI/skeletonLoader/SubscriptionCardSkeleton";

const Dashboard = () => {
    const subscriptions = getSubscriptions();

    const email = getEmail();

    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Suspense fallback={<StatsOverviewSkeleton />}>
                    <StatsOverview subscriptionsPromise={subscriptions} />
                </Suspense>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <Card
                            title="Subscriptions"
                            description="Manage your subscriptions"
                            icon={<Scroll className="h-5 w-5 text-gray-500" />}
                        >
                            <Suspense fallback={<SubscriptionCardSkeleton />}>
                                <Subscriptions
                                    subscriptionsPromise={subscriptions}
                                />
                            </Suspense>
                        </Card>
                    </div>
                    <div className="space-y-6">
                        <NotificationCard emailPromise={email} />
                        <Card
                            title="Add Subscription"
                            description="Track a new subscription"
                            icon={
                                <ListPlus className="h-5 w-5 text-gray-500" />
                            }
                        >
                            <div className="flex items-center justify-center h-[200px]">
                                <SubscriptionForm />
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
