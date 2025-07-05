"use client";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

export default function useLogout() {
    const router = useRouter();
    const { updateUser } = useUser();

    return () => {
        localStorage.removeItem("token");
        updateUser(null);
        router.push('/');
    };
}