import { createContext, useContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token) {
            try {
                const decoded = jwt_decode(token);
                setUser(decoded);
            }
            catch (error) {
                console.error("Failed to decode token", error);
                setUser(null);
            }
        }
    }, []);

    const updateUser = (loggedInUser) => setUser(loggedInUser);

    return <UserContext.Provider value={{ user, updateUser }}>{children}</UserContext.Provider>
}

export const useUser = () => useContext(UserContext);