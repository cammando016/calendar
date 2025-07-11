//Homepage main content inside layout, displayed at "/"

"use client"
import { useContext } from "react";
import { ViewContext } from "./layout";
import Month from "@/components/Month";
import Week from "@/components/Week";
import Year from "@/components/Year";

export default function Home() {
  const viewMode = useContext(ViewContext);

  return (
    <div id="calendar">
      {
        viewMode === 'Year' ? (
          <Year year={'2025'}/>
        ) : viewMode === 'Month' ? (
          <Month month={'June 2025'}/>
        ) : (
          <Week />
        )
      }
    </div>
  );
}
