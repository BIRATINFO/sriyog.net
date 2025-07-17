// components/MobileHeader.tsx (Client Component)
'use client'
import { useAuth } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import BannerSection from './BannerSection';
import MobileNav from '../MobileNav';

export default function MobileHeader({
    mobileNav,
}: {
    mobileNav: typeof import('./NavConfig').mobileNav;
}) {
    const { getToken } = useAuth();
    const [mobileNavItems, setMobileNavItems] = useState(mobileNav);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const updateAuthPaths = async () => {
            const token = await getToken();
            setIsLoggedIn(!!token);
            setMobileNavItems(prev => {
                const updated = [...prev];
                updated[17] = {
                    ...updated[13],
                    name: token ? 'लेख्नुहोस' : 'समाचार लेख्नुहोस',
                    path: token ? 'https://biratinfo.com/manager' : 'https://biratinfo.com/sign-up'
                };
                return updated;
            });
        };

        updateAuthPaths();
    }, [getToken]);

    return (
        <div className='md:hidden'>
            <div className='flex items-center justify-between px-3 py-2'>
                <Link href="/" className='relative flex items-center gap-1 h-10 w-auto'>
                    <div className='relative h-10 w-[40px]'>
                        <Image
                            src='/logo.svg'
                            alt='SRIYOG Logo'
                            fill
                            className='object-contain'
                            priority
                        />
                    </div>
                    <div className='relative h-10 w-[120px]'>
                        <Image
                            src='/SRIOYG.svg'
                            alt='SRIYOG Logo'
                            fill
                            className='object-contain'
                            priority
                        />
                    </div>
                </Link>

                <div className='h-4 flex items-center gap-2'>
                    {isLoggedIn && (
                        <Link href="/manager" className="text-2xl font-semibold">+</Link>
                    )}
                    <MobileNav
                        navItems={mobileNavItems}
                    />
                </div>
            </div>

            <BannerSection mobile />
        </div>
    );
}