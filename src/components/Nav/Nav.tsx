'use client';
import Link from 'next/link';
import React from 'react';
import styles from '@assets/styles.module.css';
import { 
    UserButton, 
    SignInButton,
    SignedIn,
    SignedOut,
    useUser 
} from '@clerk/nextjs';

const Nav = () => {
    const {user, isLoaded} = useUser();
    return (
        <header>
            <nav 
                className={styles.nav}
                aria-label="Global"
            >
                <div className={styles.navLogo}>
                    <Link href="/" className={styles.navLink}>
                        Next.js Authentication
                    </Link>
                </div>
                {
                    isLoaded && user && (
                        <>
                            <Link href="/dashboard" className={styles.navLink}>Dashboard</Link>
                            <UserButton afterSignOutUrl='/' />
                        </>
                    )
                }
                {
                    !user && (
                        <>
                            <SignedOut>
                                <SignInButton />
                            </SignedOut>
                            <SignedIn>
                                <UserButton />
                            </SignedIn>
                        </>
                    )
                }
            </nav>
        </header>
    )
}

export default Nav
