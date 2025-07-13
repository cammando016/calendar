"use client"
import { useState, useEffect } from "react";
import { editUser } from "@/utils/editUser";
import { useRouter } from "next/navigation";
import AccountDetailsForm from "@/forms/accountForms/AccountDetailsForm"
import { useUser } from "@/context/UserContext"

export default function Page () {
    //Access user context to get account details if user is authenticated
    const { user, updateUser } = useUser();

    //Protect site crashing if user goes to /account/edit while not logged in
    const router = useRouter();
    useEffect(() => {
        if (!user) router.push('/account');
    }, [user, router]);
    if (!user) return <p>Unauthorized: redirecting to account login page.</p>

    //Put user account details into state that will be displayed as placeholders on edit
    const [editUserForm, setEditUserForm] = useState({
        username: user.username, firstname: user.firstname, defaultview: user.defaultView, recquestion: user.recoveryQuestion, recanswer: user.recoveryAnswer, birthdate: user.birthdate, usertheme: user.theme
    });
    //Existing account details before edit, to check if any changes made
    const existingUserDetails = {
        firstname: user.firstname, defaultview: user.defaultView, recquestion: user.recoveryQuestion, recanswer: user.recoveryAnswer, birthdate: user.birthdate, usertheme: user.theme
    }
    //Disable submit button unless all form inputs valid AND at least one field input has changed
    const [disabled, setDisabled] = useState(false);


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
        const hasEmptyField = Object.values(editUserForm).some(value => value === '');
        const fieldsHaveNotUpdated = (
            editUserForm.firstname === existingUserDetails.firstname &&
            editUserForm.defaultview === existingUserDetails.defaultview &&
            editUserForm.recquestion === existingUserDetails.recquestion &&
            editUserForm.recanswer === existingUserDetails.recanswer &&
            editUserForm.birthdate === existingUserDetails.birthdate &&
            editUserForm.usertheme === existingUserDetails.usertheme
        );
        (hasEmptyField || fieldsHaveNotUpdated ? setDisabled(true) : setDisabled(false));
    }, [editUserForm]);

    return (
        <div>
            <h3>Edit Account Page</h3>
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