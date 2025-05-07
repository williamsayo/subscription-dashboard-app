import React from "react";
import Link from "next/link";
// import Image from "next/image";
import { Bell, LogIn, UserPlus } from "lucide-react";
import Section from "../UI/Section";

const Hero = () => {
    return (
        <Section className=" flex flex-col min-[800px]:flex-row min-[800px]:items-center justify-between gap-x-20 gap-y-4 text-left py-16 px-4 md:px-12 rounded-2xl bg-[#fff] shadow-sm mx-4">
            <div className="relative min-[800px]:w-1/2 flex h-full">
                <div className="absolute -top-3 -left-3.5 bg-white opacity-95 p-2 rounded-full shadow-md animate-bounce">
                    <Bell className="h-5 w-5 text-[#555555]" />
                </div>
                <div className="bg-white p-1 rounded-xl shadow-lg">
                    <img
                        src="/hero.avif"
                        alt="Code on laptop screen"
                        className="w-full h-auto rounded-lg object-cover"
                    />
                </div>
            </div>
            <div className="flex flex-col min-[800px]:w-1/2 text-left gap-4">
                <h1 className="text-2xl sm:text-[42px] font-bold text-[#555555]">
                    Never miss a <span className="text-[#555555]">payment</span>{" "}
                    again.
                </h1>
                <p className="text-md sm:text-xl text-[#555555]">
                    RemindPay notifies you of upcoming bills, subscriptions, and
                    invoices—so you always pay on time and avoid surprise fees.
                </p>
                <div className="flex gap-4 justify-start">
                    <Link
                        href="/signup"
                        className="flex items-center bg-[#403E43] hover:bg-[#221F26] rounded-md text-white py-1 px-4"
                    >
                        <UserPlus className="mr-2 h-4 w-4" />
                        Get Started
                    </Link>

                    <Link
                        href="/login"
                        className="flex items-center px-4 py-2 rounded-lg border-[#403E43] text-[#221F26] hover:bg-[#F6F6F7]"
                    >
                        <LogIn className="mr-2 h-4 w-4" />
                        Sign in
                    </Link>
                </div>
            </div>
        </Section>
    );
};

export default Hero;
