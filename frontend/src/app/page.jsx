//Homepage main content inside layout, displayed at "/"
"use client"
import { useContext } from "react";
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

  return (
    <div id="calendar">
      {
        viewMode === 'Year' ? (
          <Year year={'2025'}/>
        ) : viewMode === 'Month' ? (
          <Month date={date.toDateString()} />
        ) : (
          <Week date={date.toDateString()}/>
        )
      }
    </div>
  );
}
