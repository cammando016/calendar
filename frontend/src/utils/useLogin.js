"use client"
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { logUserIn } from "./authenticate";

//Custom hook used to update logged in user, used to allow login logic from multiple pages
export default function useLogin (form, route) {
    const router = useRouter();
    const { updateUser } = useUser();
    
    return async (e) => {
        e.preventDefault();
        try {
            const res = await logUserIn(form);
            updateUser(res.user);
            //Redirect to different pages after login based on route prop at each different page allowing login
            router.push(route);
        }
        catch (error) {
            alert (error.message);
        }
    }
};