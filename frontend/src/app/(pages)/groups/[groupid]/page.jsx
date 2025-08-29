"use client"
import { useGroup } from "@/context/GroupContext"
import { useUser } from "@/context/UserContext";
import CreateGroupForm from "@/forms/CreateGroupForm";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { editGroup } from "@/utils/createGroup";
import { useGroupList } from "@/context/GroupListContext";

export default function Page () {
    const router = useRouter();
    const { activeGroup } = useGroup();
    const { fetchUsersGroups } = useGroupList();
    const { user } = useUser();

    const [loading, setLoading] = useState(true);

    //Null states to be updated by useEffect once activeGroup loads context
    const [groupMembers, setGroupMembers] = useState(null);
    const [editGroupForm, setEditGroupForm] = useState(null)

    useEffect(() => {
        if (activeGroup) {
            const memberUsernames = activeGroup.members.map(member => member.username);
            setGroupMembers(memberUsernames);

            setEditGroupForm({
                groupId: activeGroup.groupid,
                groupName: activeGroup.groupname,
                groupColour: activeGroup.groupcolour,
                groupMembers: memberUsernames
            });

            setLoading(false);
        }
    }, [activeGroup]);

    const submitEditGroup = async (e) => {
        e.preventDefault();
        const submittedData = ({...editGroupForm, groupMembers: groupMembers})
        const res = await editGroup(submittedData);
        if (res.message) {
            fetchUsersGroups();
            router.push('/groups');
        }
        else {
            router.push('/');
            alert(res.error);
        }
    }

    return (
        <div>
            <p>Edit Group Page</p>
            {
                loading ? (
                    <div id='group-edit-loading'>
                        <p>Please wait, group details loading.</p>
                    </div>
                ) : (
                    <div id='group-edit-loaded'>
                        <p>{activeGroup.groupname}</p>
                        <CreateGroupForm submitGroupFunc={submitEditGroup} createGroupForm={editGroupForm} setGroupForm={setEditGroupForm} addedUsers={groupMembers} setAddedUsers={setGroupMembers} user={user} editableGroup={activeGroup} />
                    </div>
                )
            }
            
        </div>
    )
}