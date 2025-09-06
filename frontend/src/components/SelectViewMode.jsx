//Form to allow users to change the view mode on homepage for calendar display
import sharedStyles from '../styles/shared.module.css';
import styles from '../styles/layout.module.css';
import theme from '../styles/theme.module.css';
import { useUser } from '@/context/UserContext';

export default function SelectViewMode ({ viewMode, setViewMode }) {
    const { user } = useUser();
    return (
        <form>
          <fieldset id="view-mode" className={`${sharedStyles.rowflex} ${styles.viewselect} ${user ? theme[`fldst${user.theme}`] : theme.fldstgreen}`}>
            <legend>View Mode</legend>
            <div>
                <input type="radio" value="Year" id="year" name="view_mode" checked={viewMode === 'Year'} onChange={() => setViewMode('Year')} />
                <label htmlFor="year">Year</label>
            </div>

            <div>
                <input type="radio" value="Month" id="month" name="view_mode" checked={viewMode === 'Month'} onChange={() => setViewMode('Month')} />
                <label htmlFor="month">Month</label>
            </div>
            
            <div>
                <input type="radio" value="Week" id="week" name="view_mode" checked={viewMode === 'Week'} onChange={() => setViewMode('Week')} />
                <label htmlFor="week">Week</label>
            </div>
          </fieldset>
        </form>
    )
}