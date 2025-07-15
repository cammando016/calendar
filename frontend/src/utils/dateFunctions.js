export const getDaysOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
}

export const getWeekdayOfFirst = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
}

export const populateMonthDates = (date) => {
    //Get year and month from date
    const year = date.getFullYear();
    const month = date.getMonth();
    //Create date for first of month
    const firstOfMonth = new Date(year, month, 1);
    //Get weekday of 1st
    const firstWeekday = firstOfMonth.getDay();
    //Create date for Sunday on 1st or first Sunday date before 1st (from previous month)
    const firstSunday = new Date(year, month, 1 - firstWeekday);
    //Empty array for dates
    const dates = []

    //Fill dates array with 6 weeks starting including leading dates from previous month if 1st not Sunday
    for (let i = 0; i < 42; i++) {
        const newDate = new Date(firstSunday);
        //Update newDate to next consecutive date
        newDate.setDate(firstSunday.getDate() + i);
        dates.push(newDate);
    }

    //Remove 6th week if there are no dates from following month
    const weekSix = dates.slice(35, 42);
    const currentDatesInWeekSix = weekSix.some(date => date.getMonth() === month);
    return currentDatesInWeekSix ? dates : dates.slice(0, 35);
}

export const populateWeekDates = (date) => {
    //Get weekday num of date
    const weekdayNum = date.getDay();
    //If Sunday, set current date, otherwise get date of most recent Sunday
    const sundayDate = new Date(date);
    sundayDate.setDate(date.getDate() - weekdayNum);
    //Empty array for week dates
    const weekDates = [];

    //Populate weekDates
    for(let i = 0; i < 7; i++) {
        const newDate = new Date(sundayDate);
        newDate.setDate(sundayDate.getDate() + i);
        weekDates.push(newDate);
    }

    return weekDates;
}