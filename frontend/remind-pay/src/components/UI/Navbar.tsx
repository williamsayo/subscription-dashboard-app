"use client";

import React, { useCallback, useState } from "react";
import Link from "next/link";
import { BellRing, LogIn, LogOut, UserPlus, UserRound } from "lucide-react";
import { usePathname } from "next/navigation";
import Button from "./Button";
import { getUserAction, logoutAction } from "@/action/actions";
import ProfileDialog from "../dashboard/user/Profile";
import { User } from "@/types/user";

const Navbar = () => {
    const pathName = usePathname();
    const [profileDialog, setProfileDialog] = useState(false);
    const [user, setUser] = useState<User>({
        username: "",
        email: "",
    });

    const openDialog = async () => {
        const user = await getUserAction();
        setUser(user);
        setProfileDialog(true);
    };

    const closeDialog = useCallback(() => {
        setProfileDialog(false);
    }, []);

    return (
        <>
            <nav
                className={`flex justify-around items-center p-4 `}
                // className={`flex justify-around items-center p-4 bg-white
                //     ${pathName === "/dashboard" ? "drop-shadow-sm" : ""}
                // `}
            >
                <Link
                    href={"/"}
                    className="text-xl max-md:text-[12px] font-bold bg-gradient-to-r from-[#403E43] to-[#221F26] bg-clip-text text-transparent"
                >
                    RemindPay
                </Link>

                <div className="flex gap-2 md:gap-10 items-center max-md:text-[12px] ">
                    {pathName === "/dashboard" ? (
                        <>
                            <BellRing className="h-4 w-4 cursor-pointer" />
                            <Button
                                className="rounded-full"
                                onClick={openDialog}
                            >
                                <UserRound className="h-4 w-4" />
                            </Button>
                            <Button onClick={() => logoutAction()}>
                                <LogOut className="h-4 w-4 cursor-pointer" />
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            {" "}
                            <Link
                                href="/login"
                                className="flex items-center hover:text-[#403E43]"
                            >
                                <LogIn className="mr-2 h-4 w-4" />
                                Login
                            </Link>
                            <Link
                                href="/signup"
                                className="flex items-center bg-[#403E43] hover:bg-[#221F26] rounded-md text-white py-1 px-4"
                            >
                                <UserPlus className="mr-2 h-4 w-4" />
                                Get Started
                            </Link>{" "}
                        </>
                    )}
                </div>
            </nav>
            <ProfileDialog
                open={profileDialog}
                closeDialog={closeDialog}
                user={user}
            />
        </>
    );
};

export default Navbar;
