export default function ChangePasswordForm({user}) {
    return (
        <form>
            <p>Recovery Question: {user.recoveryQuestion}</p>
            <label htmlFor="enter-rec-answer">Recovery Answer</label>
            <input type="text" id="enter-rec-answer" name="enter-rec-answer" required autoFocus />

            <fieldset id="set-password" name="Set Password">
                <label htmlFor="create-password">Create Password:</label>
                <input type="text" id="create-password" name="create-password" required />

                <label htmlFor="confirm-password">Confirm Password:</label>
                <input type="text" id="confirm-password" name="confirm-password" required />
            </fieldset>

            <button type="submit" id="change-password">Change Password</button>
        </form>
    )
}