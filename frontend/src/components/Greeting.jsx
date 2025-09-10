export default function Greeting ({ user, greeting }) {
    const today = new Date();
    
    if (today.getMonth() === 11 && today.getDate() === 25) {
        greeting = 'Merry Christmas'
    } else if (today.getMonth() === 0 && today.getDate() === 1) {
        greeting = 'Happy New Year'
    }
    
    if (user) {
        if (today.getMonth() + 1 === parseInt(user.birthdate.slice(5, 7)) && today.getDate() === parseInt(user.birthdate.slice(8))) {
            greeting = 'Happy Birthday'
        }
    } 

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