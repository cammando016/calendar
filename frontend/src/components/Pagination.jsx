import sharedStyles from '../styles/shared.module.css';

export default function Pagination ({ pageCount, currentPage, increment, decrement, firstPage, lastPage, pageState, stateSetter }) {
    return (
        <div>
        {
            pageCount > 1 && (
                <div className={sharedStyles.rowflex}>
                    {
                        currentPage > 1 && (
                            <button id='first-page' onClick={() => firstPage(stateSetter)} type='button' className={`${sharedStyles.btn} ${sharedStyles.medbtn}`}>1</button>
                        )
                    }
                    {
                        currentPage > 2 && (
                            <button id='prior-page' onClick={() => decrement(pageState, stateSetter)} type='button' className={`${sharedStyles.btn} ${sharedStyles.medbtn}`}>{currentPage - 1}</button>
                        )
                    }
                    <p id='current-page' className={``}>{currentPage}</p>
                    {
                        currentPage < pageCount - 1 && (
                            <button id='next-page' onClick={() => increment(pageState, stateSetter, pageCount)} type='button' className={`${sharedStyles.btn} ${sharedStyles.medbtn}`}>{currentPage + 1}</button>
                        )
                    }
                    {
                        currentPage < pageCount && (
                            <button id='final-page' onClick={() => lastPage(stateSetter, pageCount)} type='button' className={`${sharedStyles.btn} ${sharedStyles.medbtn}`}>{pageCount}</button>
                        )
                    }
                </div>

            )
        }
        </div>
    )
}