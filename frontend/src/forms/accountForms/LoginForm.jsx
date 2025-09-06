import styles from '@/styles/forms.module.css';
import sharedStyles from '@/styles/shared.module.css';
import theme from '@/styles/theme.module.css';

export default function LoginForm ({ form, setForm, submitFunction }) {
    return (
        <div>
            <h3 className={sharedStyles.sectionheading}>Log In</h3>
            <form onSubmit={submitFunction}>
                <fieldset className={`${styles.fieldset} ${theme.fldstgreen}`}>
                    <legend><h4 className={styles.legendHeading}>Account Details</h4></legend>
                    <div className={sharedStyles.colflex}>
                        <label className={styles.inputLabel} htmlFor='username'>Username</label>
                        <input className={styles.formInput} type='text' id='username' name='username' placeholder='Enter Your Username' onChange={(e) => setForm({ ...form, username: e.target.value })} />
                    </div>
                    <div className={sharedStyles.colflex}>
                        <label className={styles.inputLabel} htmlFor='password'>Password</label>
                        <input className={styles.formInput} type='password' id='password' name='password' placeholder='Enter Your Password' onChange={(e) => setForm({ ...form, password: e.target.value })} />
                    </div>
                    <button className={`${sharedStyles.btn} ${sharedStyles.medbtn} ${theme.btngreen}`} type="submit">Log In</button>
                </fieldset>
            </form>
        </div>
    )
}