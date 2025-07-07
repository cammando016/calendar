"use client"
import { useUser } from "@/context/UserContext"

export default function Page() {
    const { user } = useUser();

    return (
        <>
            {
                user !== null ? (
                    <div id="logged-in-acc-details">
                        <p>First Name:</p>
                        <p>{user.firstname}</p>

                        <p>Username:</p>
                        <p>{user.username}</p>

                        <p>Birthday:</p>
                        <p>{user.birthdate}</p>

                        <p>Default View:</p>
                        <p>{user.defaultView}</p>

                        <p>Theme:</p>
                        <p>{user.theme}</p>

                        <p>Recovery Question:</p>
                        <p>{user.recoveryQuestion}</p>
                    </div>
                ) : (
                    <p>Please login to view account details</p>
                )
            }
        </>
    )
}