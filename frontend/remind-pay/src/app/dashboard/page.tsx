import Dashboard from "@/components/dashboard/Dashboard";
import { Subscription } from "@/types/subscription";
import { cookies } from "next/headers";
import React from "react";

const page = async () => {
    const token = (await cookies()).get("token")?.value;
    const response = await fetch(
        `${process.env.BACKEND_URL || "http://localhost:3030/"}subscription`,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            method: "GET",
            next: {
                tags: ["subscription"],
            },
        }
    );

    const { subscriptions }: { subscriptions: Subscription[] | [] } =
        await response.json();

    // const subscriptions: Subscription[] = [
    //     {
    //         id: 1,
    //         title: "Netflix",
    //         amount: 15.99,
    //         nextBilling: "2025-05-05",
    //         active: true,
    //         billingFrequency: "monthly",
    //     },
    //     {
    //         id: 4,
    //         title: "Amazon Prime",
    //         amount: 15.99,
    //         nextBilling: "2025-05-02",
    //         active: true,
    //         billingFrequency: "monthly",
    //     },
    //     {
    //         id: 2,
    //         title: "YouTube Premium",
    //         amount: 11.99,
    //         nextBilling: "2025-04-28",
    //         active: true,
    //         billingFrequency: "monthly",
    //     },
    //     {
    //         id: 3,
    //         title: "Spotify",
    //         amount: 9.99,
    //         nextBilling: "2025-04-30",
    //         active: false,
    //         billingFrequency: "quarterly",
    //     },
    // ];

    return <Dashboard subscriptions={subscriptions} />;
};

export default page;
