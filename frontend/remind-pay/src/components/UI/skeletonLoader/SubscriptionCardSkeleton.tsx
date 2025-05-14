import { Tv } from "lucide-react";
import React from "react";

const SubscriptionCardSkeleton = () => {
    return Array.from({ length: 3 }).map((_, index) => (
        <div
            key={index}
            className={
                "flex items-center justify-between p-2 md:p-4 rounded-lg bg-gray-50 border border-gray-100"
            }
        >
            <div className="flex items-center gap-3">
                <span className="p-2 bg-[#0f172adb] rounded-full flex items-center justify-center">
                    <Tv className=" h-4 w-4 md:h-5 md:w-5 text-gray-100" />
                </span>

                <div className="flex flex-col gap-2">
                    <h3 className="font-medium text-gray-800 capitalize">
                        <span className="block rounded-sm animate-pulse w-15 md:w-40 h-4 bg-[#00000010]" />
                    </h3>
                    <p className="text-sm text-gray-500">
                        <span className="block rounded-sm animate-pulse w-2/3 h-4 bg-[#00000010]" />
                    </p>
                </div>
            </div>
            <div className="flex flex-col items-end gap-2">
                <p className="font-semibold text-gray-800">
                    <span className="block rounded-sm animate-pulse w-15 md:w-25 h-4 bg-[#00000010]" />
                </p>
                <div className="flex items-center gap-2">
                    <span className={"text-sm text-gray-500"}>
                        <span className="block rounded-sm animate-pulse  w-12 md:w-20 h-4 bg-[#00000010]" />
                    </span>
                    <span className="block rounded-sm animate-pulse  w-12 md:w-20 h-4 bg-[#00000010]" />
                </div>
            </div>
        </div>
    ));
};

export default SubscriptionCardSkeleton;
