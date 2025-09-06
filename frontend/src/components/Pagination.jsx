import sharedStyles from '../styles/shared.module.css';
import styles from '../styles/pagination.module.css';
import theme from '../styles/theme.module.css';
import { useUser } from '@/context/UserContext';

export default function Pagination ({ pageCount, currentPage, increment, decrement, firstPage, lastPage, pageState, stateSetter }) {
    const { user } = useUser();
    return (
        <div>
        {
            pageCount > 1 && (
                <div className={`${sharedStyles.rowflex} ${styles.pagebtns}`}>
                    {
                        currentPage > 1 && (
                            <button id='first-page' onClick={() => firstPage(stateSetter)} type='button' className={`${sharedStyles.btn} ${sharedStyles.smallbtn} ${user ? theme[`btn${user.theme}`] : theme.btngreen} ${styles.pageicon}`}>1</button>
                        )
                    }
                    {
                        currentPage > 2 && (
                            <button id='prior-page' onClick={() => decrement(pageState, stateSetter)} type='button' className={`${sharedStyles.btn} ${sharedStyles.smallbtn} ${user ? theme[`btn${user.theme}`] : theme.btngreen} ${styles.pageicon}`}>{currentPage - 1}</button>
                        )
                    }
                    <p id='current-page' className={`${styles.pageicon} ${styles.currentpage}`}>{currentPage}</p>
                    {
                        currentPage < pageCount - 1 && (
                            <button id='next-page' onClick={() => increment(pageState, stateSetter, pageCount)} type='button' className={`${sharedStyles.btn} ${sharedStyles.smallbtn} ${user ? theme[`btn${user.theme}`] : theme.btngreen} ${styles.pageicon}`}>{currentPage + 1}</button>
                        )
                    }
                    {
                        currentPage < pageCount && (
                            <button id='final-page' onClick={() => lastPage(stateSetter, pageCount)} type='button' className={`${sharedStyles.btn} ${sharedStyles.smallbtn} ${user ? theme[`btn${user.theme}`] : theme.btngreen} ${styles.pageicon}`}>{pageCount}</button>
                        )
                    }
                </div>

            )
        }
        </div>
    )
}