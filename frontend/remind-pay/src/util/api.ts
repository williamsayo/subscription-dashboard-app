import { Subscription } from "@/types/subscription";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export const getSubscriptions = async (): Promise<Subscription[] | []> => {
    const token = (await cookies()).get("token")?.value;

    const response = await fetch(
        `${process.env.BACKEND_URL || "http://localhost:3030/"}subscription`,
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            method: "GET",
            cache: "force-cache",
            next: {
                tags: ["subscription"],
            },
        }
    );

    const { subscriptions }: { subscriptions: Subscription[] | [] } =
        await response.json();

    // await new Promise((resolve) => setTimeout(resolve, 5000));

    return subscriptions;
};

export const getEmail = async (): Promise<string> => {
    const authToken = (await cookies()).get("token")?.value;
    const secret_key = new TextEncoder().encode(process.env.JSON_SECRET_KEY);

    const data = authToken ? await jwtVerify(authToken, secret_key) : undefined;
    const email = (data?.payload.email as string) ?? "";
    return email;
};

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
