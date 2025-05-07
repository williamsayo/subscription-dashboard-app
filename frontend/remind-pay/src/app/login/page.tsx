import Login from "@/components/Auth/Login";
import React from "react";

type pageProps = {
    searchParams: Promise<{
        nexturl: string;
    }>;
};

const page = async ({ searchParams }: pageProps) => {
    const next_url = (await searchParams).nexturl;
    return <Login redirectUrl={next_url} />;
};

export default page;
