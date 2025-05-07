"use client";

import React from "react";
import Button from "./Button";
import Input from "./Input";
import useTogglePassword from "../hooks/TogglePassword";
import { Eye, EyeOff } from "lucide-react";

const Password = ({ name, id }: { name: string; id: string }) => {
    const { togglePassword, showPassword } = useTogglePassword();

    return (
        <>
            <div className="relative">
                <Input
                    type={showPassword ? "text" : "password"}
                    name={name}
                    id={id}
                    placeholder="••••••••"
                    className="bg-[#F9F9F9] border-[#DDDDDD] rounded-md text-[#221F26] text-sm p-2 w-full h-10"
                />

                <Button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555555] hover:text-[#333333]"
                    onClick={togglePassword}
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </Button>
            </div>
        </>
    );
};

export default Password;
