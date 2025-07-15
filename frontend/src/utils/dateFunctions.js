export const getDaysOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
}

export const getWeekdayOfFirst = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
}

export const populateMonthWeekdays = (date) => {
    //check first weekday of month
    const firstWeekday = getWeekdayOfFirst(date);
    //check days in month
    const daysOfMonth = getDaysOfMonth(date);
    //check days in previous month
    const daysOfLastMonth = getDaysOfMonth(new Date(date.getFullYear(), date.getMonth(), 0));
    //create array of number days in month, plus number of days in week before 1st of month, plus number of days left in week after last day of the month
    const dates = new Array(daysOfMonth + firstWeekday + (7 - ((daysOfMonth + firstWeekday) % 7)));
    //Populate dates array with date numbers, including week overflow for previous and next months
    let nextMonthIterator = 1;
    for(let i = 0; i < dates.length; i++) {
        if (i < firstWeekday) {
            dates[i] = daysOfLastMonth - firstWeekday + i + 1;
        } else if (i > daysOfMonth + firstWeekday - 1) {
            dates[i] = nextMonthIterator;
            nextMonthIterator++;
        }
        else {
            dates[i] = i - firstWeekday + 1;
        }
    }

    return dates;
}