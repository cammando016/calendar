//nav bar at the bottom of the page
import styles from '../styles/layout.module.css'
import Link from 'next/link';

export default function Navbar ({ user, handleLogout }) {
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
    return (
        // Navigation bar at the bottom of the page
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
    )
}