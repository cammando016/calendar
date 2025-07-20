//Create group form, displayed at /groups/create
"use client"
import { useEffect, useState } from "react";
import CreateGroupForm from "@/forms/CreateGroupForm";
import { createGroup } from "@/utils/createGroup";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();
    //Get user if authenticated to send as group creator, or deny access to group creation form if not authenticated
    const { user } = useUser();
    //Empty array to store members added to the group
    const [addedUsers, setAddedUsers] = useState([]);
    //State object to store forrm input values for submission to DB
    const [createGroupForm, setCreateGroupForm] = useState({
        groupName: '', groupColour: '#ffffff', groupMembers: addedUsers
    })
    //Update createGroupForm with changes to addedUsers array
    useEffect(() => {
        setCreateGroupForm(prev => ({...prev, groupMembers: addedUsers}));
    }, [addedUsers]);

    //Submit form input values to DB
    const handleCreateGroup = async (e) => {
        e.preventDefault();
        //Get group form creator values, add logged in username for group creator field
        const groupSubmission = {
            ...createGroupForm,
            groupCreator: user.username
        }
        const res = await createGroup(groupSubmission);
        if (res.message) {
            alert('Group Created!');
            router.push('/groups');
        }
        else {
            alert(res.error);
        }
    }
    
    return (
        <div>
            <p>Group Page</p>
            {
                user ? (
                    <CreateGroupForm submitGroupFunc={handleCreateGroup} createGroupForm={createGroupForm} setGroupForm={setCreateGroupForm} addedUsers={addedUsers} setAddedUsers={setAddedUsers} user={user} />
                ) :
                (
                    <p>Please login to create groups.</p>
                )
            }
            
        </div>

    )
}