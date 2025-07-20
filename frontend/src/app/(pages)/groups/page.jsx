"use client"
import Link from "next/link"
import { useUser } from "@/context/UserContext"
import { useGroup } from "@/context/GroupContext";
import { getUsersGroups } from "@/utils/createGroup";
import { useEffect, useState } from "react";
import ListedGroup from "@/components/ListedGroup";
import { deleteGroup } from "@/utils/createGroup";

export default function Page() {
    const { updateActiveGroup } = useGroup();
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

    //Function to delete a group and rerender the list of groups
    const handleDeleteGroup = async (group) => {
        updateActiveGroup(group);
        const res = await deleteGroup({groupid: group.groupid})
        if (res.message) {
            const newGroups = usersGroups.filter(userGroup => (userGroup.groupid !== group.groupid));
            setUsersGroups(newGroups);
            updateActiveGroup(null);
        } else {
            alert(res.error);
        }
    }

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
                                        return <ListedGroup key={group.groupid} group={group} userCreated={true} deleteGroup={handleDeleteGroup} />
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
                        <Link href={'/groups/create'} ><button>Create New Group</button></Link>
                    </>
                ) : (
                    <p>Please login to view your groups</p>
                )
            }
        </div>
    )
}