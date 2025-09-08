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
                <input type="radio" value="year" id="year" name="view_mode" checked={viewMode === 'year'} onChange={() => setViewMode('year')} />
                <label htmlFor="year">Year</label>
            </div>

            <div>
                <input type="radio" value="month" id="month" name="view_mode" checked={viewMode === 'month'} onChange={() => setViewMode('month')} />
                <label htmlFor="month">Month</label>
            </div>
            
            <div>
                <input type="radio" value="week" id="week" name="view_mode" checked={viewMode === 'week'} onChange={() => setViewMode('week')} />
                <label htmlFor="week">Week</label>
            </div>
          </fieldset>
        </form>
    )
}