import { createContext, useContext, useState } from "react";

const DateContext = createContext();

export const DateProvider = ({ children }) => {
    const [date, setDate] = useState(() => new Date());

    const increaseDate = () => setDate(date + 1);

    return <DateContext.Provider value={{ date, increaseDate }}>{children}</DateContext.Provider>
}

export const useDate = () => useContext(DateContext);