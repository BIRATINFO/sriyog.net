/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { ChevronDown, Plus } from 'lucide-react';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { useAuth } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import Image from 'next/image';

export default function HeaderClient({
    navConfig,
    othersDropdownConfig
}: {
    navConfig: typeof import('./NavConfig').navConfig;
    othersDropdownConfig: typeof import('./NavConfig').othersDropdownConfig;
}) {
    const pathname = usePathname();
    const { getToken } = useAuth();
    const [navItems, setNavItems] = useState(navConfig);
    const [dropdownItems, setDropdownItems] = useState(othersDropdownConfig);

    useEffect(() => {
        const updateAuthPaths = async () => {
            const token = await getToken();
            setNavItems(prev => {
                const updated = [...prev];
                updated[13] = {
                    ...updated[13],
                    name: token ? <div className='flex items-center justify-center gap-1'><Plus size={16} />लेख्नुहोस</div> : <Tooltip>
                        <TooltipTrigger className='flex items-center justify-center cursor-pointer'><Image src={'/images/homepage/letter.svg'} alt='Write news' width={16} height={16} /></TooltipTrigger>
                        <TooltipContent className='bg-text-color'>
                            <p>समाचार लेख्नुहोस</p>
                        </TooltipContent>
                    </Tooltip>,
                    path: token ? 'https://biratinfo.com/writer' : 'https://biratinfo.com/sign-in'
                };
                return updated;
            });
        };

        updateAuthPaths();
    }, [getToken]);

    return (
        <nav className='w-full bg-text-color hidden md:flex items-center overflow-x-auto whitespace-nowrap scrollbar-hide px-1 lg:px-6 xl:px-16 font-alata text-white'>
            <div className='mx-auto flex md:gap-0 lg:gap-2 min-w-fit'>
                {navItems.map((item, index) => {
                    const isActive = pathname === item.path;
                    if (item.name === "अन्य") {
                        return (
                            <DropdownMenu key={index}>
                                <DropdownMenuTrigger asChild>
                                    <div className={`px-2 py-1 h-8 flex items-center relative cursor-pointer ${isActive ? 'bg-green-950' : ''} hover:bg-green-950 transition duration-200`}>
                                        <span className='text-xs md:text-[12px] lg:text-[16px] xl:text-[18px] flex items-center justify-center gap-1'>
                                            {item.name}
                                            <ChevronDown size={15} className='mt-0.5' />
                                        </span>
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className='absolute mt-1 z-50 bg-text-color text-white shadow-lg' align='start'>
                                    {dropdownItems.map((dropItem, dropIndex) => (
                                        <DropdownMenuItem key={dropIndex} asChild className='cursor-pointer hover:bg-green-950 px-4 py-2 text-sm'>
                                            <Link href={dropItem.path}>{dropItem.name}</Link>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        );
                    }

                    return (
                        <Link
                            key={index}
                            href={item.path}
                            className={`px-2 py-1 h-8 flex items-center ${isActive ? 'bg-green-950' : ''} hover:bg-green-950 transition duration-200`}
                        >
                            <span className='text-xs md:text-[12px] lg:text-[16px] xl:text-[18px]'>
                                {item.name}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}