import { AlarmClock, Mail, DollarSign, ChevronDown } from "lucide-react";
import Section from "../UI/Section";
import React from "react";

const instructions = [
    {
        icon: <Mail size={22} className="text-white" />,
        label: "Register your email",
        desc: "Sign up in seconds to get started.",
    },
    {
        icon: <AlarmClock size={22} className="text-white" />,
        label: "Set reminders",
        desc: "Add upcoming payments and choose alert times.",
    },
    {
        icon: <DollarSign size={22} className="text-white" />,
        label: "Stay on track",
        desc: "Get notified before payments are due.",
    },
];

const HowItWorks = () => {
    return (
        <Section className="max-w-4xl mx-auto my-20 mb-24 px-4 w-full">
            <h2 className="text-2xl font-bold text-[#222222] text-center mb-12">
                How RemindPay works
            </h2>
            <div className="flex flex-col md:flex-row gap-8 justify-between items-center">
                {instructions.map((instruction, index) => (
                    <React.Fragment key={instruction.label}>
                        <div className="flex flex-col items-center text-center w-full md:w-1/3 px-2">
                            <div className="bg-[#2a2a2a] p-4 rounded-full shadow-lg mb-4 flex items-center justify-center animate-scale-in">
                                {instruction.icon}
                            </div>
                            <h4 className="font-semibold text-lg mb-1 text-[#222222]">
                                {instruction.label}
                            </h4>
                            <p className="text-[#444444] text-sm">
                                {instruction.desc}
                            </p>
                        </div>
                        {index < instructions.length - 1 && (
                            <ChevronDown className="md:-rotate-90" />
                        )}
                        {/* <div className="hidden md:block w-6 h-1 mt-3 mb-2 bg-gradient-to-r from-[#333333] to-[#555555] rounded-full" /> */}
                    </React.Fragment>
                ))}
            </div>
        </Section>
    );
};

export default HowItWorks;
