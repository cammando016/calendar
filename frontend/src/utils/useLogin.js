"use client"
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { logUserIn } from "./authenticate";

export default function useLogin (form, route) {
    const router = useRouter();
    const { updateUser } = useUser();
    
    return async (e) => {
        e.preventDefault();
        try {
            const res = await logUserIn(form);
            localStorage.setItem('token', res.token);
            updateUser(res.user);
            router.push(route);
        }
        catch (error) {
            alert (error.message);
        }
    }
};