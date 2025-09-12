import styles from '@/styles/forms.module.css';
import sharedStyles from '@/styles/shared.module.css';
import theme from '@/styles/theme.module.css';
import Link from 'next/link';

export default function LoginForm ({ form, setForm, submitFunction }) {
    return (
        <div>
            <h3 className={sharedStyles.sectionheading}>Log In</h3>
            <form onSubmit={submitFunction}>
                <fieldset className={`${styles.fieldset} ${theme.fldstgreen}`}>
                    <legend><h4 className={styles.legendHeading}>Account Details</h4></legend>
                    <div className={sharedStyles.colflex}>
                        <label className={styles.inputLabel} htmlFor='username'>Username</label>
                        <input className={styles.formInput} maxLength={10} type='text' id='username' name='username' placeholder='Enter Your Username' onChange={(e) => setForm({ ...form, username: e.target.value })} />
                    </div>
                    <div className={sharedStyles.colflex}>
                        <label className={styles.inputLabel} htmlFor='password'>Password</label>
                        <input className={styles.formInput} maxLength={20} type='password' id='password' name='password' placeholder='Enter Your Password' onChange={(e) => setForm({ ...form, password: e.target.value })} />
                    </div>
                    <div className={sharedStyles.rowflex}>
                        <button className={`${sharedStyles.btn} ${sharedStyles.medbtn} ${theme.btngreen}`} disabled={form.username === '' || form.password === ''} type="submit">Log In</button>
                        <Link key='change-password-button' href='/account/reset-password'>
                            <button className={`${sharedStyles.btn} ${sharedStyles.medbtn} ${theme.btngreen}`} type="button">Change Password</button>
                        </Link>
                    </div>
                </fieldset>
            </form>
        </div>
    )
}