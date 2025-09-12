"use client"
import { useState } from "react";
import Link from "next/link"
import { useUser } from "@/context/UserContext"
import { useGroup } from "@/context/GroupContext";
import ListedGroup from "@/components/ListedGroup";
import { deleteGroup } from "@/utils/createGroup";
import { useGroupList } from "@/context/GroupListContext";
import sharedStyles from '@/styles/shared.module.css';
import theme from '@/styles/theme.module.css';
import Pagination from "@/components/Pagination";
import { incrementPage, decrementPage, firstPage, lastPage } from "@/utils/pagination";

export default function Page() {
    const { updateActiveGroup } = useGroup();
    const { user } = useUser();
    const userTheme = user?.theme || 'green';
    const { usersGroups, fetchUsersGroups } = useGroupList();

    const [createdPageNum, setCreatedPageNum] = useState(0);
    const [joinedPageNum, setJoinedPageNum] = useState(0);

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

    if (!user) return <div><p>Please wait, loading...</p></div>
    
    const createdGroups = usersGroups.filter(userGroup => ( userGroup.creator.trim().toLowerCase() === user.username.trim().toLowerCase() ));
    const joinedGroups = usersGroups.filter(userGroup => ( userGroup.creator.trim().toLowerCase() !== user.username.trim().toLowerCase() ));

    return (
        <div id="groups-page">
            <h3 className={sharedStyles.pageheading}>Groups</h3>
            <div className={sharedStyles.overflow}>
                <div className={`${sharedStyles.sectionheading} ${sharedStyles.rowflex}`}>
                    <h4>Created groups</h4>
                    <Link href={'/groups/create'}><button type="button" className={`${sharedStyles.btn} ${sharedStyles.medbtn} ${theme[`btn${userTheme}`]}`}>Create Group</button></Link>
                </div>
                {
                    user ? (
                        <>
                            <div>
                                {
                                    createdGroups.length > 0 ? (
                                        createdGroups.slice(createdPageNum * 3, (createdPageNum + 1) * 3).map(group => {
                                            return <ListedGroup key={group.groupid} group={group} userCreated={true} deleteGroup={handleDeleteGroup} />
                                        })
                                    ) : <p>No Created Groups Found.</p>
                                }
                                <Pagination currentPage={createdPageNum + 1} pageCount={Math.ceil(createdGroups.length/3)} increment={incrementPage} decrement={decrementPage} firstPage={firstPage} lastPage={lastPage} pageState={createdPageNum} stateSetter={setCreatedPageNum} />
                            </div>
                            <div>
                                <h4 className={sharedStyles.sectionheading}>Joined groups</h4>
                                {
                                    joinedGroups.length > 0 ? (
                                        joinedGroups.slice(joinedPageNum * 3, (joinedPageNum + 1) * 3).map(group => {
                                            return <ListedGroup key={group.groupid} group={group} userCreated={false} />
                                        })
                                    ) : <p>No Joined Groups Found.</p>
                                }
                                <Pagination currentPage={joinedPageNum + 1} pageCount={Math.ceil(joinedGroups.length/3)} increment={incrementPage} decrement={decrementPage} firstPage={firstPage} lastPage={lastPage} pageState={joinedPageNum} stateSetter={setJoinedPageNum} />
                            </div>
                        </>
                    ) : (
                        <p>Please login to view your groups</p>
                    )
                }
            </div>
        </div>
    )
}