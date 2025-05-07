"use client";

import { useState } from "react";

const useTogglePassword = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const togglePassword = () => setShowPassword(!showPassword);

    return { showPassword, togglePassword };
};

export default useTogglePassword;
