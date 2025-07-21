import { useState, useEffect, useContext, createContext } from "react";
import { useUser } from "./UserContext";
import { getUsersGroups } from "@/utils/createGroup";

const GroupListContext = createContext();

export const GroupListProvider = ({ children }) => {
    const [usersGroups, setUsersGroups] = useState([]);
    const { user } = useUser();

    //Get all groups authenticated user is a member of
    const fetchUsersGroups = async () => {
        try {
            //Trigger error if user is unauthenticated
            if (!user) {
                setUsersGroups([])
                return;
            }
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

    useEffect(() => { fetchUsersGroups(); }, [user]);

    const updateUsersGroups = (groups) => setUsersGroups(groups);

    return <GroupListContext.Provider value={{ usersGroups, updateUsersGroups, fetchUsersGroups }} >{children}</GroupListContext.Provider>
}

export const useGroupList = () => useContext(GroupListContext)