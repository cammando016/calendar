export default function LoginForm ({ form, setForm, submitFunction }) {
    return (
        <form onSubmit={submitFunction}>
            <label htmlFor='username'>Username:</label>
            <input id='username' name='username' placeholder='Enter Your Username' onChange={(e) => setForm({ ...form, username: e.target.value })} />
            <label htmlFor='password'>Password:</label>
            <input id='password' name='password' placeholder='Enter Your Password' onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <button type="submit">Login</button>
        </form>
    )
}