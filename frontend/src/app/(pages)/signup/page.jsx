"use client"
import { useEffect, useState } from "react";
import { userSignup } from "@/utils/authenticate";
import { useRouter } from "next/navigation";
import AccountDetailsForm from "@/forms/accountForms/AccountDetailsForm";

export default function Page() {
    const [signupForm, setSignupForm] = useState({
        username: '', password: '', defaultview: 'year', recquestion: '', recanswer: '', birthdate: '', firstname: '', usertheme: 'default'
    });
    const [createPassword, setCreatePassword] = useState("");
    const [disabled, setDisabled] = useState(true);
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

    const updatePassword = (value) => setCreatePassword(value);

    useEffect(() => {
        const hasEmptyField = Object.values(signupForm).some(value => value === '');
        const passwordConfirmationFailure = (createPassword !== signupForm.password);
        (hasEmptyField || passwordConfirmationFailure) ? setDisabled(true) : setDisabled(false);
    }, [signupForm, createPassword]);

    return <AccountDetailsForm registerAccount={true} submitFunc={handleSubmit} setFormFunc={setSignupForm} form={signupForm} submitDisabled={disabled} createPassword={createPassword} updatePassword={updatePassword} />
}