// components/Logo.tsx (Server Component)
import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
    return (
        <Link href="/" className='relative w-full max-w-[140px] md:max-w-[200px] lg:max-w-[240px] aspect-[4/1] flex items-center gap-1'>
            <div className='relative h-full flex-[1]'>
                <Image
                    src='/logo.svg'
                    alt='SRIYOG Logo'
                    fill
                    className='object-contain'
                    priority
                />
            </div>
            <div className='relative h-full' style={{ width: '70%' }}>
                <Image
                    src='/SRIOYG.svg'
                    alt='SRIYOG Text Logo'
                    fill
                    className='object-contain'
                    priority
                />
            </div>
        </Link>
    );
}