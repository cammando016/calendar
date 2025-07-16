//Create context to change view mode between yearly, monthly and weekly
import { createContext, useContext, useState } from "react";
const ViewContext = createContext();

export const ViewProvider = ({ children }) => {
    const [viewMode, setViewMode] = useState('Month');

    const updateViewMode = (newMode) => setViewMode(newMode);

    return <ViewContext.Provider value={{ viewMode, updateViewMode }}>{children}</ViewContext.Provider>
}

export const useViewMode = () => useContext(ViewContext);
