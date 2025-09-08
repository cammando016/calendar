//Homepage main content inside layout, displayed at "/"
"use client"
import { useDate } from "@/context/DateContext";
import { useViewMode } from "@/context/ViewContext";
import Month from "@/components/Month";
import Week from "@/components/Week";
import Year from "@/components/Year";
import SelectViewMode from "@/components/SelectViewMode";
import Greeting from "@/components/Greeting";
import styles from '../styles/layout.module.css';
import { useUser } from "@/context/UserContext";

export default function Page() {
  //Allow users to change view between year month and week
  const { viewMode, updateViewMode } = useViewMode();
  //Get current date for calendar display on load
  const { date } = useDate();
  //Get user to show greeting
  const { user } = useUser();

  return (
    <div id="calendar">
      <div className={styles.heading}>
        {/* Display greeting, general if unauthenticated, personalised if authenticated */}
        <Greeting user={user} greeting="Hello" />
      </div>
      {/* User input to switch view mode */}
      <SelectViewMode viewMode={viewMode} setViewMode={updateViewMode} />
      {
        viewMode === 'year' ? (
          <Year date={date.toDateString()}/>
        ) : viewMode === 'month' ? (
          <Month date={date.toDateString()} />
        ) : (
          <Week date={date.toDateString()}/>
        )
      }
    </div>
  );
}
