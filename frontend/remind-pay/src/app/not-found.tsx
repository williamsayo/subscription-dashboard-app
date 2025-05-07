import BackButton from "@/components/UI/BackButton";
import { Home } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center space-y-6">
                <div className="bg-white p-8 rounded-xl drop-shadow-2xl">
                    <div className="inline-flex justify-center items-center w-20 h-20 bg-[#555555] rounded-full mb-6">
                        <span className="text-[#fff] text-4xl font-bold">
                            404
                        </span>
                    </div>

                    <h1 className="text-2xl font-bold text-[#555555] mb-2">
                        Page not found
                    </h1>

                    <p className="text-gray-600 mb-8">
                        Sorry, we couldn&apos;t find the page you&apos;re
                        looking for. It might have been moved or deleted.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/"
                            className="flex items-center bg-[#403E43] hover:bg-[#221F26] rounded-md text-white py-1 px-4"
                        >
                            <Home className="mr-2 h-4 w-4" />
                            Back to home
                        </Link>

                        <BackButton />
                    </div>
                </div>

                <div className="text-center">
                    <p className="text-gray-500 text-sm">
                        Need help?{" "}
                        <Link
                            href="/"
                            className="text-[#555555] hover:underline"
                        >
                            Contact support
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
