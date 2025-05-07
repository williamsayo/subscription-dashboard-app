"use server";

import { headerProp } from "@/types/header";
import {
    loginSchema,
    signUpSchema,
    subscriptionSchema,
} from "@/util/definitions";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

const baseURL = process.env.BACKEND_URL || "http://localhost:3030/";
const headers: headerProp = {
    "Content-Type": "application/json",
    Accept: "application/json",
};

export const loginAction = async (
    redirectUrl: string,
    previousState: unknown,
    formData: FormData
) => {
    const validationResult = loginSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
    });

    if (!validationResult.success) {
        return {
            error: {
                ...validationResult.error.flatten().fieldErrors,
            },
            success: false,
        };
    }

    const { email, password } = validationResult.data;

    const body = JSON.stringify({
        email,
        password,
    });

    const response = await fetch(`${baseURL}auth/login`, {
        headers,
        body,
        method: "POST",
        cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
        return {
            message: data.message,
            error: data.errors,
            success: false,
        };
    }

    (await cookies()).set({
        name: "token",
        value: data.token,
        httpOnly: true,
        sameSite: "strict",
    });

    redirect(redirectUrl || "/dashboard", RedirectType.replace);

    return {
        error: null,
        success: true,
    };
};

export const signupAction = async (
    previousState: unknown,
    formData: FormData
): Promise<{
    success?: boolean;
    message?: string;
    error: {
        email?: string[] | undefined;
        password?: string[] | undefined;
        username?: string[] | undefined;
        confirm_password?: string[] | undefined;
    };
}> => {
    const validationResult = signUpSchema.safeParse({
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
        confirm_password: formData.get("confirm_password"),
    });

    if (!validationResult.success) {
        return {
            error: {
                ...validationResult.error.flatten().fieldErrors,
            },
        };
    }

    const { username, email, password, confirm_password } =
        validationResult.data;

    const body = JSON.stringify({
        username,
        email,
        password,
        confirm_password,
    });

    const response = await fetch(`${baseURL}auth/signup`, {
        headers,
        body,
        method: "POST",
        cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
        return {
            message: data.message,
            error: data.errors,
            success: false,
        };
    }

    (await cookies()).set({
        name: "token",
        value: data.token,
        httpOnly: true,
        sameSite: "strict",
    });

    redirect("/dashboard", RedirectType.replace);
};

export const subscriptionAction = async (
    previousState: unknown,
    formData: FormData
) => {
    const validationResult = subscriptionSchema.safeParse({
        subscription_name: formData.get("subscription_name"),
        amount: Number(formData.get("amount")),
        billing_frequency: formData.get("billing_frequency"),
        billing_date: formData.get("billing_date"),
    });

    if (!validationResult.success) {
        return {
            error: {
                ...validationResult.error.flatten().fieldErrors,
            },
        };
    }

    const { subscription_name, amount, billing_frequency, billing_date } =
        validationResult.data;

    const body = JSON.stringify({
        subscription_name,
        amount,
        billing_frequency,
        billing_date,
    });

    headers.Authorization = `Bearer ${(await cookies()).get("token")?.value}`;

    const response = await fetch(`${baseURL}subscription/add`, {
        headers,
        body,
        method: "POST",
        cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
        return {
            message: data.message,
            error: data.errors,
            success: false,
        };
    }

    revalidateTag("subscription");

    return {
        success: true,
    };
};

export const updateSubscriptionStatusAction = async (
    active: boolean,
    previousState: unknown,
    id: string | number
) => {
    headers.Authorization = `Bearer ${(await cookies()).get("token")?.value}`;

    const response = await fetch(`${baseURL}subscription/${id}`, {
        method: "PATCH",
        headers,
    });

    const data = await response.json();

    if (!response.ok) {
        return {
            message: active
                ? "subscription failed to cancel"
                : "subscription failed to activate",
            success: false,
        };
    }

    revalidateTag("subscription");

    return {
        message: active
            ? "subscription cancelled successfully"
            : "subscription reactivated successfully",
        success: true,
        data: data.message,
    };
};

export const logoutAction = async () => {
    (await cookies()).delete("token");

    redirect("/");
};
