import Link from "next/link"

export default function Page() {
    return (
        <div>
            <h3>Event Page</h3>
            <Link href='/events/create'><button>Create Event</button></Link>
        </div>
    )
}