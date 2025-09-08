//Create context to change view mode between yearly, monthly and weekly
import { createContext, useContext, useState, useEffect } from "react";
const ViewContext = createContext();
import { useUser } from "./UserContext";

export const ViewProvider = ({ children }) => {
    const { user } = useUser()
    const [viewMode, setViewMode] = useState(user?.defaultView || 'month');

    useEffect(() => {
        user ? setViewMode(user.defaultView) : setViewMode('month');
    }, [user]);

    const updateViewMode = (newMode) => setViewMode(newMode);

    return <ViewContext.Provider value={{ viewMode, updateViewMode }}>{children}</ViewContext.Provider>
}

export const useViewMode = () => useContext(ViewContext);
