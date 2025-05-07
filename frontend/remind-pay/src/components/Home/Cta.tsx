import React from "react";
import { Rocket } from "lucide-react";
import Link from "next/link";
import Button from "../UI/Button";

const Cta = () => {
    return (
        <section className="relative w-full mx-auto bg-gradient-to-br from-[#222222] via-[#333333] to-[#444444]  px-6 py-10 md:px-16 md:py-14 shadow-2xl border border-[#555555] mb-16 flex flex-col items-center animate-fade-in">
            {/* <div className="absolute -top-6 -right-6 animate-bounce">
                <Bell className="text-[#9b87f5] h-12 w-12" />
            </div> */}

            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 text-center flex items-center gap-3">
                Ready to take control of your subscriptions?
                <Rocket className="inline-block text-[#f7f7f7] w-8 h-8 animate-pulse" />
            </h2>
            <p className="text-gray-300 mb-8 text-center text-lg">
                Join thousands of happy users who never miss a payment!
            </p>
            <Button className="bg-[#f7f7f7] text-000 px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:scale-105 transition-all duration-300 border border-[#555555]">
                <Link href="/signup">Start Your Journey</Link>
            </Button>
        </section>
    );
};

export default Cta;
