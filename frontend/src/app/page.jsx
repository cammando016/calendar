"use client"
import { useState, useContext } from "react";
import { ViewContext } from "./layout";
import styles from "./page.module.css";
import Month from "@/components/Month";
import Week from "@/components/Week";
import Year from "@/components/Year";
import backendTest from "@/utils/fetchData";

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
      <button onClick={backendTest}>Test Backend Connection</button>
    </div>
  );
}
