import { useState, useContext, createContext } from "react";
const GroupContext = createContext();

export const GroupProvider = ({ children }) => {
    const [activeGroup, setActiveGroup] = useState(null);

    const updateActiveGroup = (newGroup) => setActiveGroup(newGroup)

    return <GroupContext.Provider value={{ activeGroup, updateActiveGroup }} >{children}</GroupContext.Provider>
}

export const useGroup = () => useContext(GroupContext);