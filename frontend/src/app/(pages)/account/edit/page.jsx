"use client"
import { useState, useEffect, useRef } from "react";
import { editUser } from "@/utils/editUser";
import { useRouter } from "next/navigation";
import AccountDetailsForm from "@/forms/accountForms/AccountDetailsForm"
import { useUser } from "@/context/UserContext"

export default function Page () {
    //Access user context to get account details if user is authenticated
    const { user, updateUser } = useUser();
    const router = useRouter();

    //Put user account details into state that will be displayed as placeholders on edit
    const [editUserForm, setEditUserForm] = useState(null);
    //Existing account details before edit, to check if any changes made
    const existingUserDetails = useRef(null)
    //Disable submit button unless all form inputs valid AND at least one field input has changed
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        if (!user) return;

        const initalForm = {
            username: user.username, firstname: user.firstname, defaultview: user.defaultView, recquestion: user.recoveryQuestion, recanswer: user.recoveryAnswer, birthdate: user.birthdate, usertheme: user.theme
        };

        setEditUserForm(initalForm);
        existingUserDetails.current = initalForm;
        setDisabled(true);
    }, [user]);

    //DB PATCH
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await editUser(editUserForm);
        if (res.message) {
            updateUser(res.user);
            router.push('/account');
        }
        else {
            alert(res.error);
        }
    };

    //Update disabled state to enable submission button when form valid
    useEffect(() => {
        if (!editUserForm || !existingUserDetails.current) return;

        const hasEmptyField = Object.values(editUserForm).some(value => value === '');
        const fieldsHaveNotUpdated = (
            editUserForm.firstname === existingUserDetails.current.firstname &&
            editUserForm.defaultview === existingUserDetails.current.defaultview &&
            editUserForm.recquestion === existingUserDetails.current.recquestion &&
            editUserForm.recanswer === existingUserDetails.current.recanswer &&
            editUserForm.birthdate === existingUserDetails.current.birthdate &&
            editUserForm.usertheme === existingUserDetails.current.usertheme
        );
        (hasEmptyField || fieldsHaveNotUpdated ? setDisabled(true) : setDisabled(false));
    }, [editUserForm]);

    if (!editUserForm) return <div><p>Loading account details...</p></div>

    return (
        <div>
            {
                user !== null ? (
                    <div>
                        <AccountDetailsForm registerAccount={false} submitFunc={handleSubmit} setFormFunc={setEditUserForm} form={editUserForm} submitDisabled={disabled} user={user} />
                    </div>
                ) : (
                    <p>Please login to your account to edit details.</p>
                )
            }
        </div>
    )
}