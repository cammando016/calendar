"use client"
import { useState, useEffect, useRef } from "react"
import styles from '../styles/utils.module.css';
import sharedStyles from '../styles/shared.module.css';
import theme from '@/styles/theme.module.css';
import { useUser } from "@/context/UserContext";

export default function DeleteModal({ closeDelete, handleDelete, deleteMessage }) {
    const { user } = useUser();
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
        <dialog className={`${sharedStyles.colflex} ${sharedStyles.cardborder} ${sharedStyles.cardcolour} ${styles.modal} ${user ? theme[`card${user.theme}`] : theme.cardgreen}`} ref={dialogRef} onCancel={handleCancelDelete} id="delete-acc-modal">
            <p>{deleteMessage}</p>
            <div>
                <input type='checkbox' id="confirm-delete" onChange={toggleAllowDelete} />
                <label htmlFor="confirm-delete">I understand deletion is irreversible and wish to proceed.</label>
            </div>
            <div className={sharedStyles.rowflex} style={{justifyContent: 'center', margin: '15px'}}>
                <button className={`${sharedStyles.btn} ${sharedStyles.medbtn} ${user ? theme[`btn${user.theme}`] : theme.btngreen}`} type="button" onClick={handleCancelDelete}>Cancel Deletion</button>
                <button className={`${sharedStyles.btn} ${sharedStyles.medbtn} ${user ? theme[`btn${user.theme}`] : theme.btngreen}`} type="button" disabled={!allowDelete} onClick={handleDelete}>Confirm Deletion</button>
            </div>
        </dialog>
    )
}