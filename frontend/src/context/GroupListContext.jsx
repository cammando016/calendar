import { useState, useEffect, useContext, createContext } from "react";
import { useUser } from "./UserContext";
import { getUsersGroups } from "@/utils/createGroup";

const GroupListContext = createContext();

export const GroupListProvider = ({ children }) => {
    const [usersGroups, setUsersGroups] = useState([]);
    const { user } = useUser();

    //Get all groups authenticated user is a member of
    useEffect(() => {
        async function fetchUsersGroups () {
            try {
                //Trigger error if user is unauthenticated
                if (!user) {setUsersGroups([])}
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

    const updateUsersGroups = (groups) => setUsersGroups(groups);

    return <GroupListContext.Provider value={{ usersGroups, updateUsersGroups }} >{children}</GroupListContext.Provider>
}

export const useGroupList = () => useContext(GroupListContext)