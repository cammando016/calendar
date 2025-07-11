"use client";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

//Delete user token from local storage for logout, redirect to home page
export default function useLogout() {
    const router = useRouter();
    const { updateUser } = useUser();

    return () => {
        localStorage.removeItem("token");
        updateUser(null);
        router.push('/');
    };
}