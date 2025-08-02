import { createContext, useContext, useState } from "react";
import { useViewMode } from "./ViewContext";

const DateContext = createContext();

export const DateProvider = ({ children }) => {
    const [date, setDate] = useState(() => new Date());
    const { updateViewMode } = useViewMode();

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

    const setNewMonthView = (month, year) => {
        const newDate = new Date(date);
        newDate.setMonth(month);
        newDate.setYear(year);
        updateViewMode('Month');
        setDate(newDate)
    }

    const resetDate = () => {
        const newDate = new Date();
        setDate(newDate);
    }

    return <DateContext.Provider value={{ date, incrementYear, decrementYear, incrementMonth, decrementMonth, setNewMonthView, resetDate }}>{children}</DateContext.Provider>
}

export const useDate = () => useContext(DateContext);