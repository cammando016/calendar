"use client"
import Image from "next/image";
import styles from "./page.module.css";
import Month from "@/components/Month";
import Week from "@/components/Week";
import Year from "@/components/Year";

export default function Home() {
  return (
    <div id="calendar">
      {/* <Month month={'June 2025'}/> */}
      {/* <Week /> */}
      <Year year={'2025'}/>
    </div>
  );
}
