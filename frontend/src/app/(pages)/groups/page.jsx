//Create group form, displayed at /groups/create

"use client"
import { useState } from "react";
import CreateGroupForm from "@/forms/CreateGroupForm";
import { createGroup } from "@/utils/createGroup";

export default function Page() {
    //State object to store forrm input values for submission to DB
    const [createGroupForm, setCreateGroupForm] = useState({
        groupName: '', groupColour: ''
    })

    //Submit form input values to DB
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