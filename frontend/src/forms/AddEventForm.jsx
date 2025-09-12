import Link from "next/link"
import sharedStyles from '../styles/shared.module.css'
import styles from '../styles/forms.module.css';
import theme from '@/styles/theme.module.css';
import { useUser } from "@/context/UserContext";
import { useMemo } from "react";

export default function AddEventForm ({ groupList, form, setForm, submitFunc, edit, submitDisabled }) {
    const { user } = useUser();
    const userTheme = user?.theme || 'green';

    const isValid = useMemo(() => {
        return (
            form.eventName !== '' &&
            form.eventStart !== '' &&
            new Date(form.eventStart) > new Date() &&
            form.eventEnd !== '' &&
            new Date(form.eventEnd) > new Date(form.eventStart)
        )
    }, [form.eventName, form.eventStart, form.eventEnd]);

    return (
        <div>
            <h3 className={sharedStyles.sectionheading}>{ edit ? 'Edit Event' : 'Create Event' }</h3>
            <form onSubmit={submitFunc} style={{overflowY: scroll, maxHeight: '65dvh'}}>
                <fieldset className={`${styles.fieldset} ${theme[`fldst${userTheme}`]}`}>
                    <legend><h4 className={styles.legendHeading}>Event Details</h4></legend>
                    <div className={sharedStyles.colflex}>
                        <label className={styles.formLabel} htmlFor="event-name">Event Name *</label>
                        <input className={`${styles.formInput} ${form.eventName === '' ? styles.invalidInput : null}`} maxLength={18} type="text" placeholder="Event Name" id="event-name" name="event-name" value={form.eventName} onChange={(e) => setForm({ ...form, eventName: e.target.value})} required autoFocus />
                        <p className={form.eventName === '' ? styles.invalidMessage : styles.validMessage}><em>Event name is required</em></p>
                    </div>

                    <div className={sharedStyles.colflex}>
                        <p className={styles.formLabel}>Event Type *</p>
                        <div className={sharedStyles.rowflex}>
                            <input className={styles.formInput} type='radio' name="event-type" id="activity" value='activity' checked={form.eventType === 'activity' ? true : false} onChange={(e) => setForm({ ...form, eventType: e.target.value })} required />
                            <label className={styles.formLabel} style={{marginLeft: '5px'}} htmlFor="activity">Activity</label>
                        </div>

                        <div className={sharedStyles.rowflex}>
                            <input className={styles.formInput} type='radio' name="event-type" id="house" value='house' checked={form.eventType === 'house' ? true : false} onChange={(e) => setForm({ ...form, eventType: e.target.value })} />
                            <label className={styles.formLabel} style={{marginLeft: '5px'}} htmlFor="house">At Home</label>
                        </div>

                        <div className={sharedStyles.rowflex}>
                            <input className={styles.formInput} type='radio' name="event-type" id="birthday" value='birthday' checked={form.eventType === 'birthday' ? true : false} onChange={(e) => setForm({ ...form, eventType: e.target.value })} />
                            <label className={styles.formLabel} style={{marginLeft: '5px'}} htmlFor="birthday">Birthday</label>
                        </div>

                        <div className={sharedStyles.rowflex}>
                            <input className={styles.formInput} type='radio' name="event-type" id="travel" value='travel' checked={form.eventType === 'travel' ? true : false} onChange={(e) => setForm({ ...form, eventType: e.target.value })} />
                            <label className={styles.formLabel} style={{marginLeft: '5px'}} htmlFor="travel">Travel</label>
                        </div>

                        <div className={sharedStyles.rowflex}>
                            <input className={styles.formInput} type='radio' name="event-type" id="other" value='other' checked={(form.eventType !== 'activity' && form.eventType !== 'house' && form.eventType !== 'birthday' && form.eventType !== 'travel') ? true : false} onChange={(e) => setForm({ ...form, eventType: e.target.value })} />
                            <label className={styles.formLabel} style={{marginLeft: '5px'}} htmlFor="other">Other</label>
                        </div>
                        {
                            (form.eventType !== 'activity' && form.eventType !== 'house' && form.eventType !== 'birthday' && form.eventType !== 'travel') && (
                                <input className={styles.formInput} type='text' id='other-event' placeholder="Other event type" rows={10} disabled={(form.eventType !== 'activity' && form.eventType !== 'house' && form.eventType !== 'birthday' && form.eventType !== 'travel') ? false : true} onChange={(e) => setForm({...form, eventType: e.target.value})} />
                            )
                        }
                    </div>

                    <div className={sharedStyles.colflex}>
                        <label className={styles.formLabel} htmlFor="event-notes">Event Notes</label>
                        <textarea className={styles.formInput} style={{height: '5em'}} placeholder="Optional notes for more information regarding event" rows={4} maxLength={255} type='text' name="event-notes" id="event-notes" value={form.eventNotes} onChange={(e) => setForm({...form, eventNotes: e.target.value.trim()})} />
                    </div>

                    {
                        !edit && (
                            <div className={sharedStyles.colflex}>
                                <label className={styles.formLabel} htmlFor="invite-group">Invite Group *</label>
                                <select className={styles.formInput} id="invite-group" name="invite-group" size="1" value={form.eventInvited} onChange={(e) => setForm({...form, eventInvited: e.target.value})} required>
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

                <fieldset className={`${styles.fieldset} ${theme[`fldst${userTheme}`]}`}>
                    <legend><h4 className={styles.legendHeading}>Event Times</h4></legend>
                    <div className={sharedStyles.colflex}>
                        <label className={styles.formLabel} htmlFor="event-start">Event Start *</label>
                        <input className={`${styles.formInput} ${(form.eventStart === '' || new Date(form.eventStart) < new Date()) ? styles.invalidInput : null}`} type="datetime-local" id="event-start" name="event-start" value={form.eventStart} onChange={(e) => setForm({...form, eventStart: e.target.value})} required />
                        <p className={form.eventStart === '' ? styles.invalidMessage : styles.validMessage}><em>Event start date is required</em></p>
                        <p className={new Date(form.eventStart) < new Date() ? styles.invalidMessage : styles.validMessage}><em>Event start date cannot be in the past</em></p>
                    </div>

                    <div className={sharedStyles.colflex}>
                        <label className={styles.formLabel} htmlFor="event-end">Event End *</label>
                        <input className={`${styles.formInput} ${(form.eventEnd === '' || new Date(form.eventEnd) < new Date(form.eventStart)) ? styles.invalidInput : null}`} type="datetime-local" id="event-end" name="event-end" value={form.eventEnd} onChange={(e) => setForm({...form, eventEnd: e.target.value})} required />
                        <p className={`${form.eventEnd === '' ? styles.invalidMessage : styles.validMessage}`}><em>Event end date is required</em></p>
                        <p className={`${new Date(form.eventEnd) < new Date(form.eventStart) ? styles.invalidMessage : styles.validMessage}`}><em>Event end date cannot be earlier than start date</em></p>
                    </div>
                </fieldset>

                <div>
                    <Link href='/events'><button className={`${sharedStyles.btn} ${sharedStyles.medbtn} ${theme[`btn${userTheme}`]}`} type="button">Cancel</button></Link>
                    {
                        submitDisabled ? (
                            <p>No details changed.</p>
                        ) : (
                            <button className={`${sharedStyles.btn} ${sharedStyles.medbtn} ${theme[`btn${userTheme}`]}`} type="submit" disabled={!isValid}> { edit ? 'Edit Event' : 'Create Event' } </button>
                        )
                    }
                </div>
            </form>
        </div>
    )   
}