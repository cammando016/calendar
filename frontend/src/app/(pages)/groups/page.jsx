import Link from "next/link"

export default function Page() {
    return (
        <div>
            <p>Groups Home Page</p>
            <Link href={'/groups/create'} >Create</Link>
        </div>
    )
}