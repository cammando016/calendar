import { createContext, useContext, useState } from "react";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const updateUser = (loggedInUser) => setUser(loggedInUser);

    return <UserContext.Provider value={{ user, updateUser }}>{children}</UserContext.Provider>
}

export const useUser = () => useContext(UserContext);