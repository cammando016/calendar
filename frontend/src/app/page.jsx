//Homepage main content inside layout, displayed at "/"
"use client"
import { useContext, useState } from "react";
import { useDate } from "@/context/DateContext";
import { ViewContext } from "./layout";
import Month from "@/components/Month";
import Week from "@/components/Week";
import Year from "@/components/Year";

export default function Home() {
  //Allow users to change view between year month and week
  const viewMode = useContext(ViewContext);
  //Get current date for calendar display on load
  const { date } = useDate();
  //Split current date into year, month and day
  // const [dateDisplays, setDateDisplays] = useState({
  //   year: date.getFullYear(),
  //   month: date.getMonth(),
  //   day: date.getDate()
  // });
  // console.log(dateDisplays);

  return (
    <div id="calendar">
      {
        viewMode === 'Year' ? (
          <Year year={'2025'}/>
        ) : viewMode === 'Month' ? (
          <Month date={date.toDateString()} />
        ) : (
          <Week />
        )
      }
    </div>
  );
}
