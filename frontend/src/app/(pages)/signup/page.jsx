"use client"
import { useState } from "react";
import { userSignup } from "@/utils/authenticate";
import { useRouter } from "next/navigation";
import AccountDetailsForm from "@/forms/accountForms/AccountDetailsForm";

export default function Page() {
    const [signupForm, setSignupForm] = useState({
        username: '', password: '', defaultview: '', recquestion: '', recanswer: '', birthdate: '', firstname: '', usertheme: 'default'
    });
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await userSignup(signupForm);
        if (res.message) {
            router.push('/login');
        }
        else {
            alert(res.error);
        }
    };

    return <AccountDetailsForm registerAccount={true} submitFunc={handleSubmit} setFormFunc={setSignupForm} form={signupForm} />

}