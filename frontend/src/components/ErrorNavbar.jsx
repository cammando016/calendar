import Link from 'next/link';
import styles from '../styles/layout.module.css';
import sharedStyles from '../styles/shared.module.css';
import theme from '../styles/theme.module.css';
import Image from 'next/image';

export default function ErrorNavbar() {
    return (
        <div id="site-nav" style={{zIndex: '99', backgroundColor: 'white'}} className={`${styles.navbar} ${styles.layout}`}>
            <a href="/" className={`${styles.navitem} ${theme.navgreen} ${sharedStyles.colflex}`}>
                <Image src="/home.png" alt="home page link" width={30} height={30} />
                <p className={`${styles.navtext} ${theme.activelinkgreen}`}>Home</p>
            </a>
            <a href="/login" className={`${styles.navitem} ${theme.navgreen} ${sharedStyles.colflex}`}>
                <Image src="/login.png" alt="login link" width={30} height={30} />
                <p className={`${styles.navtext} ${theme.activelinkgreen}`}>Login</p>
            </a>
        </div>
    );
}