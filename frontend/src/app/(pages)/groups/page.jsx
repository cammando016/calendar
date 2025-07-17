"use client"
import Link from "next/link"
import { useUser } from "@/context/UserContext"
import { getUsersGroups } from "@/utils/createGroup";
import { useEffect, useState } from "react";
import ListedGroup from "@/components/ListedGroup";

export default function Page() {
    const { user } = useUser();
    const [usersGroups, setUsersGroups] = useState([]);

    //Get groups the user is a member of if authenticated
    useEffect(() => {
        if (!user) {
            setUsersGroups([]);
            return;
        }
        async function fetchUsersGroups() {
            try {
                //Trigger error if user is unauthenticated
                if (!user) {throw new Error ({message: 'User not authenticated'})}
                //Get users groups
                const res = await getUsersGroups(user.username);
                if(res.groups) {
                    setUsersGroups(res.groups);
                } else {
                    throw new Error ({message: 'Error fetching groups'})
                }
            } catch (error) {
                console.log('Error', error.message);
            }
        }
        fetchUsersGroups();
    }, [user]);

    return (
        <div id="groups-page">
            <p>Groups Home Page</p>
            {
                user ? (
                    <>
                        <h4>My created groups</h4>
                        <div>
                            {
                                usersGroups.length > 0 ? (
                                    usersGroups.filter(userGroup => ( userGroup.creator.trim().toLowerCase() === user.username.trim().toLowerCase() )).map(group => {
                                        return <ListedGroup key={group.groupid} group={group} userCreated={true} />
                                    })
                                ) : <p>No Groups Found.</p>
                            }
                        </div>
                        <h4>My joined groups</h4>
                        <div>
                            {
                                usersGroups.length > 0 ? (
                                    usersGroups.filter(userGroup => ( userGroup.creator.trim().toLowerCase() !== user.username.trim().toLowerCase() )).map(group => {
                                        return <ListedGroup key={group.groupid} group={group} userCreated={false} />
                                    })
                                ) : <p>No Groups Found.</p>
                            }
                        </div>
                        <Link href={'/groups/create'} >Create New Group</Link>
                    </>
                ) : (
                    <p>Please login to view your groups</p>
                )
            }
        </div>
    )
}