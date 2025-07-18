"use client"
import { useGroup } from "@/context/GroupContext"
import { useUser } from "@/context/UserContext";
import CreateGroupForm from "@/forms/CreateGroupForm";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { editGroup } from "@/utils/createGroup";

export default function Page ({ params }) {
    const router = useRouter();
    const { activeGroup } = useGroup();
    const { user } = useUser();
    const [groupMembers, setGroupMembers] = useState(activeGroup.members);

    const [editGroupForm, setEditGroupForm] = useState({
        groupId: activeGroup.groupid,
        groupName: activeGroup.groupname,
        groupColour: activeGroup.groupcolour,
        groupMembers: groupMembers
    })

    useEffect(() => {
        setEditGroupForm(prev => ({...prev, groupMembers: groupMembers}));
    }, [groupMembers])

    const submitEditGroup = async (e) => {
        e.preventDefault();
        const res = await editGroup(editGroupForm);
        if (res.message) {
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
            <p>{activeGroup.groupname}</p>
            <CreateGroupForm submitGroupFunc={submitEditGroup} createGroupForm={editGroupForm} setGroupForm={setEditGroupForm} addedUsers={groupMembers} setAddedUsers={setGroupMembers} user={user} editableGroup={activeGroup} />
        </div>
    )
}