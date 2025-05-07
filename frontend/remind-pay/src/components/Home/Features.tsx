import { Bell, Rocket, Star } from "lucide-react";
import React from "react";
import Section from "../UI/Section";

const features = [
    {
        icon: <Bell size={24} className="text-white" />,
        title: "Smart Reminders",
        desc: "Never miss a payment again",
    },
    {
        icon: <Star size={24} className="text-white" />,
        title: "Easy to Use",
        desc: "Simple and intuitive interface",
    },
    {
        icon: <Rocket size={24} className="text-white" />,
        title: "Quick Setup",
        desc: "Get started in seconds",
    },
];

const Features = () => {
    return (
        <Section className="grid md:grid-cols-3 gap-6 px-4 w-full">
            {features.map((feature) => (
                <div
                    key={feature.title}
                    className="bg-[#333333] rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-200 border border-[#444444]"
                >
                    <div className="mb-3 inline-block">{feature.icon}</div>
                    <h3 className="font-semibold text-lg mb-2 text-white">
                        {feature.title}
                    </h3>
                    <p className="text-gray-300 text-sm">{feature.desc}</p>
                </div>
            ))}
        </Section>
    );
};

export default Features;
