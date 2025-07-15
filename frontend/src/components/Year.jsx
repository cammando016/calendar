//Display for yearly view mode, showing each month within the year
import MonthOfYear from "./MonthOfYear";
import styles from '../styles/year.module.css';

export default function Year ({ date }) {
    const dateObject = new Date(date);
    //Used to map each month of the year to MonthOfYear components on screen
    const years = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    return (
        <div className="year-display">
            <h3>{dateObject.getFullYear()}</h3>
            <div className={`${styles.year}`}>
                {
                    years.map(year => {
                        return <MonthOfYear key={year} monthName={year} />
                    })
                }
            </div>
        </div>
    )
}