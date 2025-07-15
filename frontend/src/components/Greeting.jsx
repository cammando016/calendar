export default function Greeting ({ user, greeting }) {
    return (
        <div id="greeting">
            {
                user ? (
                    <div>
                        <p>{greeting}, {user.firstname}</p>
                    </div>
                ) : (
                    <div>
                        <p>{greeting}, Guest</p>
                    </div>
                )
            }
        </div>
    )
}