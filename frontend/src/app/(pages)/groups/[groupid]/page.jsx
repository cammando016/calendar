"use client"
import React from "react";
import { useUser } from "@/context/UserContext";
import CreateGroupForm from "@/forms/CreateGroupForm";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { editGroup } from "@/utils/createGroup";
import { useGroupList } from "@/context/GroupListContext";

export default function Page ({ params }) {
    const router = useRouter();
    const { usersGroups, fetchUsersGroups } = useGroupList();
    const { user } = useUser();

    const [loading, setLoading] = useState(true);
    const [activeGroup, setActiveGroup] = useState(null);

    //Null states to be updated by useEffect once activeGroup loads context
    const [groupMembers, setGroupMembers] = useState([]);
    const [editGroupForm, setEditGroupForm] = useState(null)

    const resolvedParams = React.use(params);
    const groupId = resolvedParams.groupid;

    useEffect(() => {
        if(!usersGroups || !groupId) return;

        const group = usersGroups.find(grp => grp.groupid === groupId);

        if(!group) {
            setLoading(false);
            return;
        }

        setActiveGroup(group);

        const memberUsernames = group.members?.map(member => member.username);
        setGroupMembers(memberUsernames);

        setEditGroupForm({
            groupId: group.groupid,
            groupName: group.groupname || '',
            groupColour: group.groupcolour || '',
            groupMembers: memberUsernames 
        });
        setLoading(false);

    }, [usersGroups, groupId]);

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

    if (loading) return <div><p>Please wait, group details loading...</p></div>

    return (
        <div id='group-edit-loaded'>
            <CreateGroupForm submitGroupFunc={submitEditGroup} createGroupForm={editGroupForm} setGroupForm={setEditGroupForm} addedUsers={groupMembers} setAddedUsers={setGroupMembers} user={user} editableGroup={activeGroup} />
        </div>
    )
}