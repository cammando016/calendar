export default function AddEventForm ({groupList}) {
    <form>
        <label htmlFor="event-name">Event Name:</label>
        <input type="text" placeholder="Event Name" id="event-name" name="event-name" required autoFocus />

        <label htmlFor="event-date">Event Date:</label>
        <input type="date" id="event-date" name="event-date" required />

        <label htmlFor="event-time">Event Time:</label>
        <input type="time" id="event-time" name="event-time" required />

        <label htmlFor="invite-group">Invite Group:</label>
        <select id="invite-group" name="invite-group" size="5" required>
            <option value="private" selected>Private</option>
            {
                groupList.map(group => {
                    return <option value={group.groupName} key={group.groupName} >{group.groupName}</option>
                })
            }
        </select>

        <label htmlFor="event-notes">Event Notes:</label>
        <textarea name="event-notes" id="event-notes" rows="10" cols="50" required/>

        <button type="submit">Create Event</button>
    </form>   
}