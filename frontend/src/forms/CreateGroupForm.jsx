export default function CreateGroupForm () {
    return (
        <form>
            <label htmlFor="group-name">Group Name</label>
            <input type="text" id="group-name" name="group-name" required autoFocus />

            <label htmlFor="group-colour">Group Colour</label>
            <input type="color" id="group-colour" name="group-colour" value="#ff0000" required />

            <label htmlFor="group-members">Group Members</label>
            <input type="text" id="group-members" name="group-members" required />

            <fieldset id="group-form-buttons">
                <button type="button">Cancel</button>
                <button type="submit">Create Group</button>
            </fieldset>
        </form>
    )
}