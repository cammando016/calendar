import Link from "next/link"

export default function EventError() {
    <div>
        <p>You are not logged in. Please <Link href={'/login'}>log in</Link> to your account to access event details page.</p>
    </div>
}