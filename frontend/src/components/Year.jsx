//Display for yearly view mode, showing each month within the year
import MonthOfYear from "./MonthOfYear";
import styles from '../styles/year.module.css';
import sharedStyles from '../styles/shared.module.css';
import theme from '@/styles/theme.module.css';
import { useDate } from "@/context/DateContext";
import { useUser } from "@/context/UserContext";

export default function Year ({ date }) {
    const dateObject = new Date(date);
    const { user } = useUser();
    const userTheme = user?.theme || 'green';
    //Used to map each month of the year to MonthOfYear components on screen
    const months = [0,1,2,3,4,5,6,7,8,9,10,11];
    const { incrementYear, decrementYear } = useDate();

    return (
        <div id="year-display">
            <div className={`${sharedStyles.rowflex} ${styles.yearheading}`}>
                <button className={`${sharedStyles.btn} ${sharedStyles.medbtn} ${theme[`btn${userTheme}`]}`} onClick={decrementYear}>{`<- Prior Year`}</button>
                <h3 className={styles.h3}>{dateObject.getFullYear()}</h3>
                <button className={`${sharedStyles.btn} ${sharedStyles.medbtn} ${theme[`btn${userTheme}`]}`} onClick={incrementYear}>{`Next Year ->`}</button>
            </div>
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