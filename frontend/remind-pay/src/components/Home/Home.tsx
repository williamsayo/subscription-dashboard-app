import React from "react";
import Hero from "./Hero";
import Features from "./Features";
import HowItWorks from "./HowItWorks";
import Cta from "./Cta";

const Home = () => {
    return (
        <div className="flex flex-col gap-12 items-center py-4">
            <Hero />
            <Features />
            <HowItWorks />
            <Cta />
        </div>
    );
};

export default Home;
