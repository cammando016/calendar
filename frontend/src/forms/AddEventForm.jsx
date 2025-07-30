import Link from "next/link"
import sharedStyles from '../styles/shared.module.css'

export default function AddEventForm ({ groupList, form, setForm, submitFunc, edit }) {
    //console.log(groupList);
    return (
        <form onSubmit={submitFunc} style={{overflow: scroll, maxHeight: '65vh'}}>
            <fieldset>
                <legend>Event Details</legend>
                <div className={sharedStyles.colflex}>
                    <label htmlFor="event-name">* Event Name:</label>
                    <input type="text" placeholder="Event Name" id="event-name" name="event-name" value={form.eventName} onChange={(e) => setForm({ ...form, eventName: e.target.value})} required autoFocus />
                </div>

                <div className={sharedStyles.colflex}>
                    <p>* Event Type:</p>
                    <div className={sharedStyles.rowflex}>
                        <input type='radio' name="event-type" id="activity" value='activity' checked={form.eventType === 'activity' ? true : false} onChange={(e) => setForm({ ...form, eventType: e.target.value })} required />
                        <label htmlFor="activity">Activity</label>
                    </div>

                    <div className={sharedStyles.rowflex}>
                        <input type='radio' name="event-type" id="house" value='house' checked={form.eventType === 'house' ? true : false} onChange={(e) => setForm({ ...form, eventType: e.target.value })} />
                        <label htmlFor="house">At Home</label>
                    </div>

                    <div className={sharedStyles.rowflex}>
                        <input type='radio' name="event-type" id="birthday" value='birthday' checked={form.eventType === 'birthday' ? true : false} onChange={(e) => setForm({ ...form, eventType: e.target.value })} />
                        <label htmlFor="birthday">Birthday</label>
                    </div>

                    <div className={sharedStyles.rowflex}>
                        <input type='radio' name="event-type" id="travel" value='travel' checked={form.eventType === 'travel' ? true : false} onChange={(e) => setForm({ ...form, eventType: e.target.value })} />
                        <label htmlFor="travel">Travel</label>
                    </div>

                    <div className={sharedStyles.rowflex}>
                        <input type='radio' name="event-type" id="other" value='other' checked={(form.eventType !== 'activity' && form.eventType !== 'house' && form.eventType !== 'birthday' && form.eventType !== 'travel') ? true : false} onChange={(e) => setForm({ ...form, eventType: e.target.value })} />
                        <label htmlFor="other">Other</label>
                    </div>
                    {
                        (form.eventType !== 'activity' && form.eventType !== 'house' && form.eventType !== 'birthday' && form.eventType !== 'travel') && (
                            <input type='text' id='other-event' placeholder="Enter 'other' type for event" rows={10} disabled={(form.eventType !== 'activity' && form.eventType !== 'house' && form.eventType !== 'birthday' && form.eventType !== 'travel') ? false : true} onChange={(e) => setForm({...form, eventType: e.target.value})} />
                        )
                    }
                </div>

                <div className={sharedStyles.colflex}>
                    <label htmlFor="event-notes">Event Notes:</label>
                    <input type='text' name="event-notes" id="event-notes" value={form.eventNotes} onChange={(e) => setForm({...form, eventNotes: e.target.value})} />
                </div>

                {
                    !edit && (
                        <div>
                            <label htmlFor="invite-group">* Invite Group:</label>
                            <select id="invite-group" name="invite-group" size="1" value={form.eventInvited} onChange={(e) => setForm({...form, eventInvited: e.target.value})} required>
                                {
                                    groupList.map(group => {
                                        return <option value={group.groupid} key={group.groupid} >{group.groupname}</option>
                                    })
                                }
                            </select>
                        </div>
                    )
                }
            </fieldset>

            <fieldset>
                <legend>Event Times</legend>
                <div className={sharedStyles.colflex}>
                    <label htmlFor="event-start">* Event Start:</label>
                    <input type="datetime-local" id="event-start" name="event-start" value={form.eventStart} onChange={(e) => setForm({...form, eventStart: e.target.value})} required />
                </div>

                <div className={sharedStyles.colflex}>
                    <label htmlFor="event-end">* Event End:</label>
                    <input type="datetime-local" id="event-end" name="event-end" value={form.eventEnd} onChange={(e) => setForm({...form, eventEnd: e.target.value})} required />
                </div>
            </fieldset>

            <div>
                <Link href='/events'><button type="button">Cancel</button></Link>
                <button type="submit">
                    { 
                        edit ? 'Edit Event' : 'Create Event'
                    }
                </button>
            </div>
        </form>
    )   
}