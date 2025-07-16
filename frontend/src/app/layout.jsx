//Home page layout
"use client"
import { ViewProvider, useViewMode } from "@/context/ViewContext";
import { UserProvider, useUser } from "@/context/UserContext";
import { DateProvider } from "@/context/DateContext";
import styles from '../styles/layout.module.css';
import sharedStyles from '../styles/shared.module.css';
import useLogout from "@/utils/useLogout";
import Navbar from "@/components/Navbar";
import SelectViewMode from "@/components/SelectViewMode";
import Greeting from "@/components/Greeting";

function LayoutContent({ children }) {
  //Import logout function
  const handleLogout = useLogout();
  //Get user if authenticated
  const { user } = useUser();

  const { viewMode, updateViewMode } = useViewMode();
  return (
    <html>
      <body>
        <div id="page-layout">
          <div id="page-heading" className={`${sharedStyles.colflex} ${styles.layout}`}>
            <div className={sharedStyles.rowflex}>
              <h1>Group Calendar</h1>
              {/* User input to switch view mode */}
              <SelectViewMode viewMode={viewMode} setViewMode={updateViewMode} />
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
  )
}

export default function StandardLayout ({ children }) {

  return (
      <UserProvider>
        <ViewProvider>
          <DateProvider>
            <LayoutContent>
              {children}
            </LayoutContent>
          </DateProvider>
        </ViewProvider>
      </UserProvider>
  );
}