export default function CreateGroupForm ({submitGroupFunc, createGroupForm, setGroupForm}) {
    return (
        <form onSubmit={submitGroupFunc}>
            <label htmlFor="group-name">Group Name</label>
            <input type="text" id="group-name" name="group-name" onChange={(e) => setGroupForm({...createGroupForm, groupName: e.target.value})} required autoFocus />

            <label htmlFor="group-colour">Group Colour</label>
            <input type="color" id="group-colour" name="group-colour" onChange={(e) => setGroupForm({...createGroupForm, groupColour: e.target.value})} required />

            <label htmlFor="group-members">Group Members</label>
            <input type="text" id="group-members" name="group-members" required />

            <fieldset id="group-form-buttons">
                <button type="button">Cancel</button>
                <button type="submit">Create Group</button>
            </fieldset>
        </form>
    )
}