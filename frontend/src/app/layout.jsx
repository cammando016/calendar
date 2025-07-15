//Home page layout
"use client"
import { useState } from "react"
import ViewContext from "@/context/ViewContext";
import { UserProvider, useUser } from "@/context/UserContext";
import { DateProvider } from "@/context/DateContext";
import styles from '../styles/layout.module.css';
import sharedStyles from '../styles/shared.module.css';
import Link from "next/link";
import useLogout from "@/utils/useLogout";
import Navbar from "@/components/Navbar";
import SelectViewMode from "@/components/SelectViewMode";
import Greeting from "@/components/Greeting";

function LayoutContent({ children, viewMode, setViewMode }) {
  //Import logout function
  const handleLogout = useLogout();
  //Get user if authenticated
  const { user } = useUser();
  return (
    //View context allows user to switch between viewing year, month or week
    <ViewContext.Provider value={viewMode}>
      <html>
        <body>
          <div id="page-layout">
            <div id="page-heading" className={`${sharedStyles.colflex} ${styles.layout}`}>
              <div className={sharedStyles.rowflex}>
                <h1>Group Calendar</h1>
                {/* User input to switch view mode */}
                <SelectViewMode viewMode={viewMode} setViewMode={setViewMode} />
              </div>

              {/* Display greeting, general if unauthenticated, personalised if authenticated */}
              <Greeting user={user} greeting="Hello" />
            </div>

            {/* Main Page Content */}
            <div id="page-content" className={`${styles.main} ${styles.layout}`}>{children}</div>

            {/* Navigation bar at the bottom of the page */}
            <Navbar user={user} handleLogout={handleLogout} />
          </div>
        </body>
      </html>
    </ViewContext.Provider>
  )
}

export default function StandardLayout ( { children } ) {
  const [viewMode, setViewMode] = useState('Month');

  return (
      <UserProvider>
        <DateProvider>
          <LayoutContent viewMode={viewMode} setViewMode={setViewMode}>
            {children}
          </LayoutContent>
        </DateProvider>
      </UserProvider>
  );
}

export {ViewContext};