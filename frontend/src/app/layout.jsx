//Home page layout
"use client"
import { ViewProvider } from "@/context/ViewContext";
import { UserProvider, useUser } from "@/context/UserContext";
import { DateProvider } from "@/context/DateContext";
import { GroupProvider } from "@/context/GroupContext";
import { GroupListProvider } from "@/context/GroupListContext";
import styles from '../styles/layout.module.css';
import useLogout from "@/utils/useLogout";
import Navbar from "@/components/Navbar";
import { EventListProvider } from "@/context/EventListContext";

function LayoutContent({ children }) {
  //Import logout function
  const handleLogout = useLogout();
  //Get user if authenticated
  const { user } = useUser();

  return (
    <html>
      <body className={styles.body}>
        <div id="page-layout">

          {/* Main Page Content */}
          <div id="page-content" className={`${styles.main} ${styles.layout}`}>
            {children}
          </div>

          {/* Navigation bar at the bottom of the page */}
          <Navbar 
            user={user} 
            handleLogout={handleLogout} 
          />
          
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
            <GroupListProvider>
              <GroupProvider>
                <EventListProvider>
                  <LayoutContent>
                    {children}
                  </LayoutContent>
                </EventListProvider>
              </GroupProvider>
            </GroupListProvider>
          </DateProvider>
        </ViewProvider>
      </UserProvider>
  );
}