"use client"
import { useState, useEffect, useRef } from "react"

export default function DeleteModal({ closeDelete, handleDelete, deleteMessage }) {
    //Force user to click checkbox to confirm they want to delete account before delete button is enabled
    const [allowDelete, setAllowDelete] = useState(false);
    const toggleAllowDelete = () => setAllowDelete(!allowDelete);

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

    //Cancel delete and close modal
    const handleCancelDelete = () => {
        dialogRef.current.close();
        closeDelete();
    }
    
    return (
        <dialog ref={dialogRef} onCancel={handleCancelDelete} id="delete-acc-modal">
            <p>{deleteMessage}</p>
            <input type='checkbox' id="confirm-delete" onChange={toggleAllowDelete} />
            <label htmlFor="confirm-delete">I understand deleting is irreversible and wish to proceed.</label>
            <button onClick={handleCancelDelete}>Cancel Deletion</button>
            <button disabled={!allowDelete} onClick={handleDelete}>Confirm Deletion</button>
        </dialog>
    )
}