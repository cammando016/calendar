import sharedStyles from '@/styles/shared.module.css';
import formStyles from '@/styles/forms.module.css';

export default function GroupFilter ({ groupList, filter, setFilter, hideFilter }) {
    return (
        <form>
            <h4 style={{textAlign: 'center', margin: '0', padding: '10px'}}>Filter Events By Group</h4>
            <div>
                <input name='group-filter' type='radio' value='All' id='All'checked={filter === 'All' ? true : false} onChange={() => {setFilter('All'); hideFilter()}} />
                <label className={`${formStyles.formLabel}`} htmlFor='All'>All</label>
            </div>
            {
                groupList.map(group => {
                    return (
                        <div key={group.groupid} className={sharedStyles.rowflex}>
                            <input name='group-filter' id={group.groupid} value={group.groupid} type='radio' checked={filter === group.groupid ? true : false} onChange={(e) => {setFilter(e.target.value); hideFilter()}} />
                            <label className={`${formStyles.formLabel}`} htmlFor={group.groupid}>{group.groupname}</label>
                        </div>
                    )
                })
            }
        </form>
    )
}