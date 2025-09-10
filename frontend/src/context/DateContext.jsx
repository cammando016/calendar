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
        const year = date.getFullYear();
        const month = date.getMonth();
        const currentDay = date.getDate();
        //Check if next month has less days
        const lastNextMonth = new Date(year, month + 2, 0).getDate();
        const newDay = Math.min(currentDay, lastNextMonth);

        const newDate = new Date(year, month + 1, newDay);
        setDate(newDate);
    }

    const decrementMonth = () => {
        const year = date.getFullYear()
        const month = date.getMonth();
        const currentDay = date.getDate();
        //Check if previous month had less days
        const lastPrevMonth = new Date(year, month, 0).getDate();
        const newDay = Math.min(currentDay, lastPrevMonth);

        const newDate = new Date(year, month -1, newDay);
        setDate(newDate);
    }

    const setNewMonthView = (month, year) => {
        const newDate = new Date(date);
        newDate.setMonth(month);
        newDate.setYear(year);
        updateViewMode('Month');
        setDate(newDate)
    }

    //Change week functions
    const incrementWeek = () => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + 7);
        setDate(newDate);
    }

    const decrementWeek = () => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() - 7);
        setDate(newDate);
    }

    const resetDate = () => {
        const newDate = new Date();
        setDate(newDate);
    }

    return <DateContext.Provider value={{ date, incrementYear, decrementYear, incrementMonth, decrementMonth, setNewMonthView, incrementWeek, decrementWeek, resetDate }}>{children}</DateContext.Provider>
}

export const useDate = () => useContext(DateContext);