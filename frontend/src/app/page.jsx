import Image from "next/image";
import styles from "./page.module.css";
import Month from "@/components/Month";

export default function Home() {
  return (
    // <div className={styles.page}></div>
    <div id="calendar">
      <Month month={'June 2025'}/>
    </div>
  );
}
