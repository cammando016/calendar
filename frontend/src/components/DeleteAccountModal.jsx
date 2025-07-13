"use client"
import { useState, useEffect, useRef } from "react"
import { deleteUser } from "@/utils/editUser";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

export default function DeleteAccountModal({ closeDelete }) {
    //Force user to click checkbox to confirm they want to delete account before delete button is enabled
    const [allowDelete, setAllowDelete] = useState(false);
    const toggleAllowDelete = () => setAllowDelete(!allowDelete);

    //Get user account to delete from DB
    const { user, updateUser } = useUser();
    const router = useRouter();

    const dialogRef = useRef(null);

    //Display modal content on page
    useEffect(() => {
        const dialog = dialogRef.current;

        if(dialog) {
            dialog.showModal();
        }

        //Ensure dialog is closed, and reset checkbox to false when modal closed
        return () => {
            if (dialog && dialog.open) {
                dialog.close();
            }
            setAllowDelete(false);
        }
    }, [])

    //Delete currently logged in user from database and return user to home page
    const handleDelete = async (e) => {
        e.preventDefault();
        const res = await deleteUser({ username: user.username });
        if (res.message) {
            updateUser(null);
            closeDelete();
            router.push('/');
        } else {
            alert(res.error);
        }
    }

    //Cancel delete and close modal
    const handleCancelDelete = () => {
        dialogRef.current.close();
        closeDelete();
    }
    
    return (
        <dialog ref={dialogRef} onCancel={handleCancelDelete} id="delete-acc-modal">
            <p>Are you sure you want to delete your account? This will remove you from all groups and delete all events created by you.</p>
            <input type='checkbox' id="confirm-delete" onChange={toggleAllowDelete} />
            <label htmlFor="confirm-delete">I understand deleting my account is irreversible and wish to proceed.</label>
            <button onClick={handleCancelDelete}>Cancel Deletion</button>
            <button disabled={!allowDelete} onClick={handleDelete}>Confirm Account Deletion</button>
        </dialog>
    )
}