//Signup form, displayed at /signup

"use client"
import { useEffect, useState } from "react";
import { userSignup } from "@/utils/authenticate";
import { useRouter } from "next/navigation";
import AccountDetailsForm from "@/forms/accountForms/AccountDetailsForm";

export default function Page() {
    //State object to store form input values for submission to DB
    const [signupForm, setSignupForm] = useState({
        username: '', password: '', defaultview: 'year', recquestion: '', recanswer: '', birthdate: '', firstname: '', usertheme: 'default'
    });
    //State variable for the create password field, used to compare with confirm password
    const [createPassword, setCreatePassword] = useState("");
    //State to keep form submission disabled unless all form inputs are valid
    const [disabled, setDisabled] = useState(true);
    const router = useRouter();

    //Attempt to submit form data to DB and create user record
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

    //State updater for create password field
    const updatePassword = (value) => setCreatePassword(value);

    //Update "disabled" state value if there are no empty fields, and create password matches confirm password
    useEffect(() => {
        const hasEmptyField = Object.values(signupForm).some(value => value === '');
        const passwordConfirmationFailure = (createPassword !== signupForm.password);
        (hasEmptyField || passwordConfirmationFailure) ? setDisabled(true) : setDisabled(false);
    }, [signupForm, createPassword]);

    //Display signup form
    return <AccountDetailsForm registerAccount={true} submitFunc={handleSubmit} setFormFunc={setSignupForm} form={signupForm} submitDisabled={disabled} createPassword={createPassword} updatePassword={updatePassword} />
}