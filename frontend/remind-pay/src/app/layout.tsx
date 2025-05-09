import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/UI/Navbar";
import { geistMono, geistSans } from "./Fonts";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import React from "react";

export const metadata: Metadata = {
    title: "Remind Pay",
    description:
        "Remind Pay is a smart subscription reminder app that helps you track and manage recurring payments, avoid late fees, and stay in control of your finances with timely notifications.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <div className="min-h-screen">
                    <Navbar />
                    <main>{children}</main>
                </div>
                <Footer />
                <Toaster position="top-right" reverseOrder={false} />
            </body>
        </html>
    );
}
