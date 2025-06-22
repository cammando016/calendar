"use client"
import { useState } from "react"
import styles from '../styles/layout.module.css';
import Link from "next/link";
import Image from "next/image";

export default function StandardLayout ( { children } ) {
  const [isAuth, setIsAuth] = useState(true);
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
  ]

  return (
    <html>
      <body>
        <div id="page-layout">
          <div id="page-heading" className={`${styles.header} ${styles.layout}`}>
            <h1>Group Calendar</h1>
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
  )
}