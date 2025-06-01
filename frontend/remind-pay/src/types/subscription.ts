export type Subscription = {
    id: number;
    name: string;
    amount: number;
    nextBilling: string;
    // nextBillingDate: string;
    originalBillingDate: string;
    active: boolean;
    billingFrequency: "monthly" | "quarterly" | "yearly";
    updatedAt: string;
    createdAt: string;
};
