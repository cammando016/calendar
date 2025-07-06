"use client"
import { useState } from "react";
import CreateGroupForm from "@/forms/CreateGroupForm";
import { createGroup } from "@/utils/createGroup";

export default function Page() {
    const [createGroupForm, setCreateGroupForm] = useState({
        groupName: '', groupColour: ''
    })

    const handleCreateGroup = async (e) => {
        e.preventDefault();
        const res = await createGroup(createGroupForm);
        if (res.message) {
            alert('Group Created!');
        }
        else {
            alert(res.error);
        }
    }
    
    return (
        <div>
            <p>Group Page</p>
            <CreateGroupForm submitGroupFunc={handleCreateGroup} createGroupForm={createGroupForm} setGroupForm={setCreateGroupForm}/>
        </div>

    )
}