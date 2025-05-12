"use client";

import React, { useActionState, useEffect } from "react";
import FormGroup from "../UI/FormGroup";
import FormLabel from "../UI/FormLabel";
import Button from "../UI/Button";
import { LogIn } from "lucide-react";
import Link from "next/link";
import Input from "../UI/Input";

import Password from "../UI/Password";
import { loginAction } from "@/action/actions";
import toast from "react-hot-toast";

export const initialState = {
    error: null,
    success: false,
};

const Login = ({ redirectUrl }: { redirectUrl: string }) => {
    const updatedLoginActuon = loginAction.bind(null, redirectUrl);
    const [errors, action, pending] = useActionState(
        updatedLoginActuon,
        initialState
    );

    useEffect(() => {
        if (errors?.message) {
            toast.error(errors.message);
        }
    }, [errors.message]);

    return (
        <div className="flex flex-col justify-center items-center p-4">
            <form
                action={action}
                className="p-8 rounded-2xl shadow-xl min-w-1/4 max-w-md space-y-4  border border-[#e0e0e0] mt-10"
            >
                <header className="text-center space-y-2">
                    <h1 className="text-3xl font-bold text-[#221F26]">
                        Welcome Back!
                    </h1>
                    <p className=" text-[#555555]">
                        Let&apos;s get you back to managing your subscriptions
                    </p>
                    <p className="text-red-500 text-sm">{errors.message}</p>
                </header>
                <FormGroup>
                    <FormLabel htmlFor="email">email</FormLabel>
                    <Input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="email"
                        className="bg-[#F9F9F9] border-[#DDDDDD] rounded-md text-[#221F26] text-sm p-2 w-full h-10"
                    />
                    {errors?.error?.email?.map((error: string) => (
                        <p key={error} className="text-red-800 text-sm">
                            {error}
                        </p>
                    ))}
                </FormGroup>
                <FormGroup>
                    <FormLabel htmlFor="password">password</FormLabel>
                    <Password name="password" id="password" />
                    <p className="text-red-800 text-sm">
                        {errors?.error?.password}
                    </p>
                </FormGroup>
                <Button
                    type="submit"
                    className="w-full bg-[#221F26] hover:bg-[#333] text-white h-10 px-4 py-2"
                >
                    <LogIn className="mr-2 h-4 w-4" />
                    {pending ? "submitting..." : "Sign In"}
                </Button>
                <div className="text-center text-sm text-[#555555]">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/signup"
                        className="font-medium text-[#7E69AB] hover:text-[#9b87f5] transition-colors"
                    >
                        Sign up here
                    </Link>
                </div>
            </form>
            {/* <div className="mt-4 text-sm text-[#555555]">
                &copy; 2025 RemindPay. All rights reserved.
            </div> */}
        </div>
    );
};

export default Login;
