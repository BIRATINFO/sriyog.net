import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MailIcon, MapPinIcon, NotebookPenIcon, PhoneCallIcon } from 'lucide-react'

function Footer() {
    return (
        <div className='w-full px-4 lg:px-16 md:px-5 py-8 bg-[#D9D9D9]'>
            <div className='max-w-8xl mx-auto md:mx-12 lg:mx-20 flex flex-col gap-5'>
                <div className='flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left'>
                    <h2 className='text-[20px] font-bold text-gray-900 font-orienta'>विराट इन्फर्म्याटिक्स प्रा. लि.</h2>
                    <div className='flex gap-4 justify-center'>
                        {[{ name: 'facebook', path: 'https://www.facebook.com/biratinfo' }, { name: 'twitter', path: 'https://x.com/biratinfo' }, { name: 'youtube', path: 'https://www.youtube.com/@biratinfo' }, { name: 'instagram', path: 'https://www.instagram.com/biratinfo/' }].map((icon) => (
                            <Link
                                key={icon.name}
                                href={icon.path}
                                className='w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-300 transition-colors'
                                aria-label={`Follow us on ${icon}`}
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                <Image
                                    src={`/images/kasinHomepage/${icon.name}.svg`}
                                    alt={`${icon} icon`}
                                    width={20}
                                    height={20}
                                    className='hover:opacity-80 transition-opacity'
                                />
                            </Link>
                        ))}
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12'>
                    {/* Our Team */}
                    <div className='space-y-4 text-center md:text-left'>
                        <h3 className='text-[18px] font-semibold text-gray-900 font-orienta'>हाम्रो टिम</h3>
                        <ul className='space-y-3 text-gray-600'>
                            {[
                                'अध्यक्ष : सुधीर नेपाल',
                                'सम्पादक : ललिता घिमिरे',
                                'प्रविधि : प्रकाश उप्रेती',
                                'व्यवस्थापन : सुभाष उप्रेती'
                            ].map((item, index) => (
                                <li key={index} className='text-[16px] font-ibm_plex_serif'>{item}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className='space-y-4 flex flex-col items-center'>
                        <h3 className='text-[18px] font-semibold text-gray-900 text-center md:text-start md:mr-44 font-orienta'>सम्पर्क</h3>
                        <ul className='space-y-3 text-gray-600 flex flex-col items-center md:items-start'>
                            <li className='flex items-start gap-3'>
                                <div className='w-6 h-6 bg-[#d9d9d9] rounded-full flex items-center justify-center flex-shrink-0'>
                                    <NotebookPenIcon size={14} className='text-gray-600' />
                                </div>
                                <p className='text-[16px] text-center md:text-left font-ibm_plex_serif'>सूचना विभाग दर्ता नं. YYY-०८१/८२</p>
                            </li>
                            <li className='flex items-center gap-3'>
                                <div className='w-6 h-6 bg-[#d9d9d9] rounded-full flex items-center justify-center flex-shrink-0'>
                                    <MapPinIcon size={14} className='text-gray-600' />
                                </div>
                                <p className='text-[16px] text-center md:text-left font-ibm_plex_serif'>कमलपोखरी, काठमाडौं, नेपाल</p>
                            </li>
                            <li className='flex items-center gap-3'>
                                <div className='w-6 h-6 bg-[#d9d9d9] rounded-full flex items-center justify-center flex-shrink-0'>
                                    <PhoneCallIcon size={14} className='text-gray-600' />
                                </div>
                                <Link href={'tel:+977-01-4548068'} className='text-[16px] text-center md:text-left font-ibm_plex_serif'>+९७७-१-४५४८०६८</Link>
                            </li>
                            <li className='flex items-center gap-3'>
                                <div className='w-6 h-6 bg-[#d9d9d9] rounded-full flex items-center justify-center flex-shrink-0'>
                                    <MailIcon size={14} className='text-gray-600' />
                                </div>
                                <p className='text-[16px] text-center md:text-left font-ibm_plex_serif'>info@biratinfo.com</p>
                            </li>
                        </ul>
                    </div>

                    {/* App Downloads */}
                    <div className='space-y-4 flex flex-col items-center md:items-end'>
                        <div className='flex flex-col gap-4'>
                            <h3 className='text-[18px] font-semibold text-gray-900 font-orienta'>एप डाउनलोड गर्नुहोस्</h3>
                            <div className='flex flex-col gap-3'>
                                <Link href="#" className='hover:opacity-90 transition-opacity'>
                                    <Image
                                        src='/images/homepage/GooglePlay.png'
                                        alt='Get it on Google Play'
                                        width={150}
                                        height={56}
                                        className='rounded-sm'
                                    />
                                </Link>
                                <Link href="#" className='hover:opacity-90 transition-opacity'>
                                    <Image
                                        src='/images/homepage/AppStore.png'
                                        alt='Download on the App Store'
                                        width={150}
                                        height={56}
                                        className='rounded-sm'
                                    />
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Copyright */}
                <div className='pt-6 border-t-[0.3px] border-[#444444]'>
                    <div className='flex flex-col md:flex-row justify-between items-center gap-3 text-[14px] text-gray-500 text-center md:text-left'>
                        <div className='flex md:gap-1 gap-3 md:flex-row flex-col'>
                            <p className='text-[#444444] font-roboto hidden md:flex'>Copyright © 2025 BIRAT Informatics Pvt. Ltd. | </p>
                            <p className='text-[#444444] font-roboto md:hidden'>Copyright © 2025 BIRAT Informatics Pvt.</p>
                            <div className='text-[#444444] font-roboto'>A Product of <Link href={'https://sriyog.com/'} target='_blank'
                                rel='noopener noreferrer' className='hover:text-text-color transition-all hover:underline'>SRIYOG Consulting</Link></div>
                        </div>
                        <div className='flex flex-wrap justify-center gap-3 md:gap-4 text-[#444444]'>
                            <Link href="/terms" className='hover:text-gray-700 transition-colors font-roboto'>Terms & Conditions</Link>
                            <Link href="/privacy" className='hover:text-gray-700 transition-colors font-roboto'>Privacy Policy</Link>
                            <Link href="/advertise" className='hover:text-gray-700 transition-colors font-roboto'>Advertise</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer