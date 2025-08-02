//Homepage main content inside layout, displayed at "/"
"use client"
import { useDate } from "@/context/DateContext";
import { useViewMode } from "@/context/ViewContext";
import Month from "@/components/Month";
import Week from "@/components/Week";
import Year from "@/components/Year";
import SelectViewMode from "@/components/SelectViewMode";

export default function Page() {
  //Allow users to change view between year month and week
  const { viewMode, updateViewMode } = useViewMode();
  //Get current date for calendar display on load
  const { date } = useDate();

  return (
    <div id="calendar">
      {/* User input to switch view mode */}
      <SelectViewMode viewMode={viewMode} setViewMode={updateViewMode} />
      {
        viewMode === 'Year' ? (
          <Year date={date.toDateString()}/>
        ) : viewMode === 'Month' ? (
          <Month date={date.toDateString()} />
        ) : (
          <Week date={date.toDateString()}/>
        )
      }
    </div>
  );
}
