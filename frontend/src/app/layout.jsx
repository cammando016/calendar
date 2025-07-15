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

//Link text and assigned route for nav bar links
const pageNav = [
  {
    name: 'Home',
    href: '/'
  },
  {
    name: 'Events',
    href: '/events'
  },
  {
    name: 'Groups',
    href: '/groups'
  },
  {
    name: 'Account',
    href: '/account'
  }
];

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
              <h1>Group Calendar</h1>
              {/* User input to switch view mode */}
              <form>
                <fieldset id="view-mode">
                  <legend>Select View Mode</legend>
                  <input type="radio" value="Year" id="year" name="view_mode" checked={viewMode === 'Year'} onChange={() => setViewMode('Year')} />
                  <label htmlFor="year">Year</label>

                  <input type="radio" value="Month" id="month" name="view_mode" checked={viewMode === 'Month'} onChange={() => setViewMode('Month')} />
                  <label htmlFor="month">Month</label>

                  <input type="radio" value="Week" id="week" name="view_mode" checked={viewMode === 'Week'} onChange={() => setViewMode('Week')} />
                  <label htmlFor="week">Week</label>
                </fieldset>
              </form>
              {/* Display greeting, general if unauthenticated, personalised if authenticated */}
              {
                user?.firstname ? (
                  <div><p>Hello, {user.firstname}</p></div>
                ) : (
                  <div><p>Hello, Guest</p></div>
                )
              }
            </div>

            <div id="page-content" className={`${styles.main} ${styles.layout}`}>{children}</div>

            {/* Navigation bar at the bottom of the page */}
            <div id="site-nav" className={`${styles.navbar} ${styles.layout}`}>
              {
                pageNav.map(page => {
                  return (
                    <Link
                      key={page.name.toLowerCase()}
                      href={page.href}
                      className={styles.navitem}
                    >
                      <button><p>{page.name}</p></button>
                    </Link>
                  )
                })
              }
              {
                //Display login or logout option based on whether user is authenticated
                user?.username ? (
                  <div id="nav-signout" className={styles.navitem}>
                    <button onClick={handleLogout}>
                      <p>Log Out</p>
                    </button>
                  </div>
                ) : (
                  <div id="nav-signin" className={styles.navitem}>
                    <Link
                      key='signin'
                      href='/login'
                      className={styles.navitem}
                    >
                      <button><p>Log In</p></button>
                    </Link>
                  </div>
                )
              }
            </div>
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