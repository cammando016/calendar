import { createContext, useContext, useState } from "react";

const DateContext = createContext();

export const DateProvider = ({ children }) => {
    const [date, setDate] = useState(() => new Date());

    //Change year functions
    const incrementYear = () => {
        const newDate = new Date(date);
        newDate.setFullYear(newDate.getFullYear() + 1);
        setDate(newDate);
    }

    const decrementYear = () => {
        const newDate = new Date(date);
        newDate.setFullYear(newDate.getFullYear() - 1);
        setDate(newDate);
    }

    //Change month functions
    const incrementMonth = () => {
        const newDate = new Date(date);
        newDate.setMonth(newDate.getMonth() + 1);
        setDate(newDate);
    }

    const decrementMonth = () => {
        const newDate = new Date(date);
        newDate.setMonth(newDate.getMonth() - 1);
        setDate(newDate);
    }

    //TO ADD NEXT
        //function to set month to clicked month when user selects a month from yearly view
        //If current date is july 2025, user in yearly view can click on feb and page which switch to feb monthly view

    return <DateContext.Provider value={{ date, incrementYear, decrementYear, incrementMonth, decrementMonth }}>{children}</DateContext.Provider>
}

export const useDate = () => useContext(DateContext);