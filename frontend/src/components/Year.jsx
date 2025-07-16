//Display for yearly view mode, showing each month within the year
import MonthOfYear from "./MonthOfYear";
import styles from '../styles/year.module.css';
import { useDate } from "@/context/DateContext";

export default function Year ({ date }) {
    const dateObject = new Date(date);
    //Used to map each month of the year to MonthOfYear components on screen
    const months = [0,1,2,3,4,5,6,7,8,9,10,11];
    const { incrementYear, decrementYear } = useDate();

    return (
        <div className="year-display">
            <h3><button onClick={decrementYear}>{`<-`}</button>{dateObject.getFullYear()}<button onClick={incrementYear}>{`->`}</button></h3>
            <div className={`${styles.year}`}>
                {
                    months.map(month => {
                        return <MonthOfYear key={month} month={month} date={date} />
                    })
                }
            </div>
        </div>
    )
}