import React from 'react'
import Image from 'next/image'
import { Author, IPost } from '@/types/Post'
import { getNepaliCategory } from './Hero'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

interface SummaryProps {
    posts: IPost[]
}

const Lifestyle = ({ posts }: SummaryProps) => {
    if (!posts || posts.length === 0) {
        return (
            <div className="w-full px-4 lg:px-16 md:px-5 py-10">
                <p className="text-center text-text-color">No Lifestyle posts available</p>
            </div>
        )
    }
    const getAuthorName = (authors: Author[] | undefined): string => {
        if (!authors || authors.length === 0) return 'अज्ञात'
        const firstAuthor = authors[0]
        return `${firstAuthor.firstName} ${firstAuthor.lastName}`.trim()
    }

    return (
        <section className='w-full px-4 lg:px-16 md:px-5 py-10'>
            <div className='max-w-8xl mx-auto md:mx-12 lg:mx-20 flex flex-col gap-10'>
                <div className='flex flex-col gap-2'>
                    <Link href={'/lifestyle'} className='text-text-color font-orienta text-[18px] font-[700] hover:underline'>{getNepaliCategory('lifestyle')}</Link>
                    <div className='w-full h-[2px] bg-[#ebebeb]' />
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8'>
                    {posts.map((post, index) => (
                        <div className='flex flex-col gap-3 group' key={index}>
                            <div className='w-full aspect-[16/9] relative md:group-hover:translate-y-[-8px] md:transition md:duration-400 rounded-md overflow-hidden'>
                                <Image
                                    src={post.heroBanner?.url || '/images/placeholder.jpg'}
                                    alt={post.title}
                                    fill
                                    className='object-cover'
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
                                />
                            </div>

                            <Link href={`/${post.category}/${post.categoryId}`} className='font-ibm_plex_serif font-bold text-xl lg:text-lg leading-snug text-text-color line-clamp-2 hover:underline cursor-pointer'>
                                {post.title}
                            </Link>

                            <p className='text-[#808080] font-ibm_plex_serif font-medium text-base line-clamp-2'>
                                {post.excerpt}
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="h-[24px] w-[24px] rounded-full">
                                    <Avatar className="h-5 w-5 sm:h-6 sm:w-6">
                                        <AvatarImage src={post?.authors[0]?.avatar} alt={post?.authors[0]?.firstName} />
                                        <AvatarFallback>{post?.authors[0]?.firstName.slice(0, 2).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                </div>
                                <Link href={`/author/${post?.authors[0]?.username}`} className="font-inter font-bold text-md text-[#808080]">
                                    {getAuthorName(post.authors)}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Lifestyle