"use client"
import Link from "next/link"
import { useUser } from "@/context/UserContext"
import { useGroup } from "@/context/GroupContext";
import ListedGroup from "@/components/ListedGroup";
import { deleteGroup } from "@/utils/createGroup";
import { useGroupList } from "@/context/GroupListContext";
import sharedStyles from '@/styles/shared.module.css';

export default function Page() {
    const { updateActiveGroup } = useGroup();
    const { user } = useUser();
    const { usersGroups, fetchUsersGroups } = useGroupList();

    //Function to delete a group and rerender the list of groups
    const handleDeleteGroup = async (group) => {
        updateActiveGroup(group);
        const res = await deleteGroup({groupid: group.groupid})
        if (res.message) {
            fetchUsersGroups();
            updateActiveGroup(null);
        } else {
            alert(res.error);
        }
    }

    return (
        <div id="groups-page">
            <h3 className={sharedStyles.pageheading}>Groups</h3>
            <div className={`${sharedStyles.sectionheading} ${sharedStyles.rowflex}`}>
                <h4>Created groups</h4>
                <Link href={'/groups/create'}><button type="button" className={`${sharedStyles.btn} ${sharedStyles.medbtn}`}>Create New Group</button></Link>
            </div>
            {
                user ? (
                    <>
                        <div>
                            {
                                usersGroups.length > 0 ? (
                                    usersGroups.filter(userGroup => ( userGroup.creator.trim().toLowerCase() === user.username.trim().toLowerCase() )).map(group => {
                                        return <ListedGroup key={group.groupid} group={group} userCreated={true} deleteGroup={handleDeleteGroup} />
                                    })
                                ) : <p>No Groups Found.</p>
                            }
                        </div>
                        <div>
                            <h4 className={sharedStyles.sectionheading}>Joined groups</h4>
                            {
                                usersGroups.length > 0 ? (
                                    usersGroups.filter(userGroup => ( userGroup.creator.trim().toLowerCase() !== user.username.trim().toLowerCase() )).map(group => {
                                        return <ListedGroup key={group.groupid} group={group} userCreated={false} />
                                    })
                                ) : <p>No Groups Found.</p>
                            }
                        </div>
                    </>
                ) : (
                    <p>Please login to view your groups</p>
                )
            }
        </div>
    )
}