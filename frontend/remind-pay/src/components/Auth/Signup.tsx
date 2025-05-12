"use client";

import React, { useActionState } from "react";
import FormGroup from "../UI/FormGroup";
import FormLabel from "../UI/FormLabel";
import Button from "../UI/Button";
import { UserPlus } from "lucide-react";
import Link from "next/link";
import Input from "../UI/Input";
import Password from "../UI/Password";
import { signupAction } from "@/action/actions";

const Signup = () => {
    const [errors, action, pending] = useActionState(signupAction, null);

    return (
        <div className="flex flex-col justify-center items-center p-4">
            <form
                action={action}
                className="p-8 rounded-2xl shadow-xl min-w-1/4 max-w-md space-y-4  border border-[#e0e0e0] mt-10"
            >
                <header className="text-center space-y-2">
                    <h1 className="text-3xl font-bold text-[#221F26]">
                        Create Account
                    </h1>
                    <p className=" text-[#555555]">
                        Join thousands of happy users managing their
                        subscriptions!
                    </p>
                </header>
                <FormGroup>
                    <FormLabel htmlFor="username">username</FormLabel>
                    <Input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="username"
                        className="bg-[#F9F9F9] border-[#DDDDDD] rounded-md text-[#221F26] text-sm p-2 w-full h-10"
                    />
                    <p className="text-red-800 text-sm">
                        {errors?.error?.username}
                    </p>
                </FormGroup>
                <FormGroup>
                    <FormLabel htmlFor="email">email</FormLabel>
                    <Input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="email"
                        className="bg-[#F9F9F9] border-[#DDDDDD] rounded-md text-[#221F26] text-sm p-2 w-full h-10"
                    />
                    {errors?.error.email?.map((error) => (
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
                <FormGroup>
                    <FormLabel htmlFor="confirm_password">
                        confirm password
                    </FormLabel>
                    <Password name="confirm_password" id="confirm_password" />
                    <p className="text-red-800 text-sm">
                        {errors?.error?.confirm_password}
                    </p>
                </FormGroup>
                <Button
                    type="submit"
                    className="w-full bg-[#221F26] hover:bg-[#333] text-white h-10 px-4 py-2"
                    disabled={pending}
                >
                    <UserPlus className="mr-2 h-4 w-4" />
                    Create Account
                </Button>
                <div className="text-center text-sm text-[#555555]">
                    Already have an account?{" "}
                    <Link
                        href={"/login"}
                        className="font-medium text-[#7E69AB] hover:text-[#9b87f5] transition-colors"
                    >
                        Sign in here
                    </Link>
                </div>
            </form>
            {/* <div className="mt-4 text-sm text-[#555555]">
                &copy; 2025 RemindPay. All rights reserved.
            </div> */}
        </div>
    );
};

export default Signup;
