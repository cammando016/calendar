"use client"
import { useState, createContext } from "react"
import ViewContext from "@/context/ViewContext";
import styles from '../styles/layout.module.css';
import sharedStyles from '../styles/shared.module.css';
import Link from "next/link";
import Image from "next/image";

const pageNav = [
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

export default function StandardLayout ( { children } ) {
  const [isAuth, setIsAuth] = useState(true);
  const [viewMode, setViewMode] = useState('Month');

  return (
    <ViewContext.Provider value={viewMode}>
      <html>
        <body>
          <div id="page-layout">
            <div id="page-heading" className={`${sharedStyles.colflex} ${styles.layout}`}>
              <h1>Group Calendar</h1>
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
              <p>{viewMode}</p>
            </div>

            <div id="page-content" className={`${styles.main} ${styles.layout}`}>{children}</div>

            <div id="site-nav" className={`${styles.navbar} ${styles.layout}`}>
              {
                pageNav.map(page => {
                  return (
                    <Link
                      key={page.name.toLowerCase()}
                      href={page.href}
                      className={styles.navitem}
                    >
                      <p>{page.name}</p>
                    </Link>
                  )
                })
              }
              {
                isAuth ? (
                  <div id="nav-signout" className={styles.navitem}><p>Sign Out</p></div>
                ) : (
                  <div id="nav-signin" className={styles.navitem}><p>Sign In</p></div>
                )
              }
            </div>
          </div>
        </body>
      </html>
    </ViewContext.Provider>
  )
}

export {ViewContext};