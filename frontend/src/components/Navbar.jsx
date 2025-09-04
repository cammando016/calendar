"use client"
//nav bar at the bottom of the page
import styles from '../styles/layout.module.css'
import sharedStyles from '../styles/shared.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

// Sign Out: <a href="https://www.flaticon.com/free-icons/check-out" title="check out icons">Check out icons created by apien - Flaticon</a>
// Group : <a href="https://www.flaticon.com/free-icons/multiple-users" title="multiple users icons">Multiple users icons created by apien - Flaticon</a>
// Account: <a href="https://www.flaticon.com/free-icons/person" title="person icons">Person icons created by apien - Flaticon</a>
// Sign Up: <a href="https://www.flaticon.com/free-icons/friend" title="friend icons">Friend icons created by apien - Flaticon</a>
// Sign In: <a href="https://www.flaticon.com/free-icons/reservation" title="reservation icons">Reservation icons created by apien - Flaticon</a>
// Home: <a href="https://www.flaticon.com/free-icons/home" title="home icons">Home icons created by apien - Flaticon</a>
// Event: <a href="https://www.flaticon.com/free-icons/add-event" title="add event icons">Add event icons created by apien - Flaticon</a>

export default function Navbar ({ user, handleLogout }) {
    //Link text and assigned route for nav bar links
    const pageNav = [
        {
            name: 'Events',
            imgSrc: '/events.png',
            alt: 'link to events page',
            href: '/events'
        },
        {
            name: 'Groups',
            imgSrc: '/groups.png',
            alt: 'link to groups page icon',
            href: '/groups'
        },
        {
            name: 'Home',
            imgSrc: '/home.png',
            alt: 'link to home page',
            href: '/'
        }
    ];

    const currentPage = usePathname();

    return (
        // Navigation bar at the bottom of the page
        <div id="site-nav" className={`${styles.navbar} ${styles.layout}`}>
            {
                user?.username ? (
                    <>
                    {
                        pageNav.map(page => {
                            return (
                                <Link
                                    key={page.name.toLowerCase()}
                                    href={page.href}
                                    className={`${styles.navitem} ${sharedStyles.colflex}`}
                                >
                                    <Image 
                                        src={page.imgSrc}
                                        alt={page.alt}
                                        width={30}
                                        height={30}
                                    />
                                    <p className={`${styles.navtext} ${currentPage === page.href ? styles.activeLink : null}`}>{page.name}</p>
                                </Link>
                            )
                        })
                    }
                        <Link 
                            key={'account'}
                            href={'/account'}
                            className={`${styles.navitem} ${sharedStyles.colflex}`}
                        >
                            <Image 
                                src='/account.png'
                                alt='link to account icon'
                                width={30}
                                height={30}
                            />
                            <p className={`${styles.navtext} ${currentPage === '/account' ? styles.activeLink : null}`}>Account</p>
                        </Link>
                        <button onClick={handleLogout} id="nav-signout" style={{paddingTop: 0}} className={`${styles.navitem} ${sharedStyles.colflex} ${sharedStyles.logoutbtn}`}>
                            <Image 
                                src='/signout.png'
                                alt='signout icon'
                                width={30}
                                height={30}
                            />
                            <p className={styles.navtext}>Log Out</p>
                        </button>
                    </>
                ) : (
                    <>
                        <Link
                            key={'home'}
                            href={'/'}
                            className={`${styles.navitem} ${sharedStyles.colflex}`}
                        >
                            <Image
                                src={'/home.png'}
                                alt={'home page link'}
                                width={30}
                                height={30}
                            />
                            <p className={`${styles.navtext} ${currentPage === '/' ? styles.activeLink : null}`}>Home</p>
                        </Link>
                        <Link 
                            key={'signup'}
                            href={'/signup'}
                            className={`${styles.navitem} ${sharedStyles.colflex}`}
                        >
                            <Image 
                                src='/signup.png'
                                alt='link to signup page icon'
                                width={30}
                                height={30}
                            />
                            <p className={`${styles.navtext} ${currentPage === '/signup' ? styles.activeLink : null}`}>Sign Up</p>
                        </Link>
                        <Link
                            id="nav-signin" 
                            className={`${styles.navitem} ${sharedStyles.colflex}`}
                            key='signin'
                            href='/login'
                        >
                            <Image 
                                src='/login.png'
                                alt='login link icon'
                                width={30}
                                height={30}
                            />
                            <p className={`${styles.navtext} ${currentPage === '/login' ? styles.activeLink : null}`}>Log In</p>
                        </Link>
                    </>
                )
            }
        </div>
    )
}