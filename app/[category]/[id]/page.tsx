/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ClapButton from '@/components/Interactions/ClapButton';
import CommentsSection from '@/components/Interactions/CommentsSection';
import NepaliDateTime from '@/components/homepage/NepaliDate';
import NepaliTimeDisplay from '@/components/homepage/NepaliTime';
import SocialShareClientWrapper from '@/components/SocialShareWrapper';
import Footer from '@/components/homepage/Footer';
import Header from '@/components/homepage/Header';
import { Clock2Icon, TagIcon } from 'lucide-react';
import { IPost, SinglePost, Author, ImageData } from '@/types/Post';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import NotFound from '@/app/not-found';
import { getNepaliCategory } from '@/components/homepage/Hero';
import ArticleContent from '@/components/ArticleContent';
import AuthorSection from '@/components/AuthorSection';
import RoadblockBanner from '@/components/RoadBlockBanner';

interface PostPageParams {
    category: string;
    id: string;
}

const getAuthorName = (authors?: Author[] | string[]): string => {
    if (!authors || authors.length === 0) return 'अज्ञात';
    if (typeof authors[0] === 'string') return 'अज्ञात';
    const author = authors[0] as Author;
    return `${author.firstName || ''} ${author.lastName || ''}`.trim() || 'अज्ञात';
};

const getAuthorInitial = (authors?: Author[] | string[]): string => {
    const name = getAuthorName(authors);
    return name.charAt(0).toUpperCase();
};

const getAuthorAvatar = (authors?: Author[] | string[]): string | undefined => {
    if (!authors || authors.length === 0 || typeof authors[0] === 'string') return undefined;
    return (authors[0] as Author).avatar;
};

const getAuthorUsername = (authors?: Author[] | string[]): string | undefined => {
    if (!authors || authors.length === 0 || typeof authors[0] === 'string') return undefined;
    return (authors[0] as Author).username;
};

export async function generateMetadata({ params }: { params: Promise<PostPageParams> }) {
    const { category, id } = await params;
    const backend_uri = process.env.NEXT_PUBLIC_BACKEND_URL;
    const apiKey = process.env.NEXT_PUBLIC_API_SPECIAL_KEY;
    if (!backend_uri || !apiKey) return {};
    const res = await fetch(`${backend_uri}/api/posts/full/${category}/${id}`, {
        headers: { 'x-special-key': apiKey },
        next: { revalidate: 60 }
    });
    if (!res.ok) return {};
    const post: SinglePost = (await res.json())?.post;
    if (!post) return {};
    return {
        title: post.title,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/${category}/${id}`,
            images: [
                { url: (post.ogBanner as ImageData)?.url || (post.heroBanner as ImageData)?.url, width: 1200, height: 630 }
            ],
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
            images: [(post.ogBanner as ImageData)?.url || (post.heroBanner as ImageData)?.url],
        }
    };
}

const PostHero = ({ post }: { post: SinglePost }) => {
    const heroBannerUrl = (post.heroBanner as ImageData)?.url;
    const title = post.title || '';
    return (
        <div className="relative w-full h-[50vh] md:h-[85vh] overflow-hidden">
            {heroBannerUrl ? (
                <Image
                    src={heroBannerUrl}
                    alt={title}
                    fill
                    className="object-cover w-full"
                    priority
                    sizes="(max-width: 768px) 100vw, 80vw"
                    unoptimized
                />
            ) : (
                <div className="w-full h-full bg-gray-300" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4 drop-shadow-lg">{title}</h1>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm md:text-base text-white/90">
                        <div className="flex items-center gap-2">
                            <Avatar className="w-7 h-7 border-2">
                                <AvatarImage src={getAuthorAvatar(post.authors)} alt={getAuthorName(post.authors)} />
                                <AvatarFallback className="bg-primary text-white text-xs">
                                    {getAuthorInitial(post.authors)}
                                </AvatarFallback>
                            </Avatar>
                            <Link href={`/author/${getAuthorUsername(post.authors)}`}>{getAuthorName(post.authors)}</Link>
                        </div>
                        <span className="flex items-center gap-1.5">
                            <Clock2Icon className="w-4 h-4" />
                            <NepaliTimeDisplay timeText={post.readingTime} />
                        </span>
                        <span className="flex items-center gap-1.5">
                            <TagIcon className="w-4 h-4" />
                            {getNepaliCategory(post.category)}
                        </span>
                        <NepaliDateTime updatedAt={post.updatedAt!} />
                    </div>
                </div>
            </div>
        </div>
    );
};



export default async function PostPage({ params }: { params: Promise<PostPageParams> }) {
    const { category, id } = await params;
    const backend_uri = process.env.NEXT_PUBLIC_BACKEND_URL;
    const apiKey = process.env.NEXT_PUBLIC_API_SPECIAL_KEY;
    if (!backend_uri || !apiKey) {
        return (
            <div className="p-4 text-center text-red-600">
                Something went wrong! Please try again later.
            </div>
        );
    }

    try {

        // First fetch roadblock banner immediately
        const roadblockRes = await fetch(`${backend_uri}/api/roadblocks/network/sriyog.net`, {
            headers: { 'x-special-key': apiKey },
            cache: 'no-store'
        });
        const roadblockData = await roadblockRes.json();
        const activeBanner = roadblockData?.data || null;

        // Check if banner should be shown on article pages
        const showRoadblockBanner = activeBanner &&
            (activeBanner._doc.location === 'article' || activeBanner._doc.location === 'both') &&
            activeBanner._doc.isActive;


        // Fetch main post
        const postRes = await fetch(`${backend_uri}/api/posts/full/${category}/${id}`, {
            headers: { 'x-special-key': apiKey },
        });
        if (!postRes.ok) return NotFound();
        const fetchedPost: SinglePost = (await postRes.json())?.post;
        if (!fetchedPost) return NotFound();

        const fetchedCategory = fetchedPost.category


        //Fetch default sponsoredAds
        const response = await fetch(`${backend_uri}/api/sponsor-banners/active-banner?category=${fetchedCategory}`, {
            headers: { 'x-special-key': apiKey },
        });

        if (!response.ok) throw new Error('Failed to fetch banner');
        const defaultSponsoredAd = await response.json();

        // Fetch interaction data
        const interactionRes = await fetch(`${backend_uri}/api/posts/${fetchedPost._id}/interaction`, {
            headers: { 'x-special-key': apiKey },
        });
        const interactionData = interactionRes.ok
            ? await interactionRes.json()
            : { claps: 0, comments: [], hasClapped: false };

        // Fetch related posts
        const relatedRes = await fetch(`${backend_uri}/api/posts/category-summary/${fetchedPost.category}`, {
            headers: { 'x-special-key': apiKey },
        });
        const relatedResult = await relatedRes.json();
        const relatedPosts: IPost[] = Array.isArray(relatedResult?.post)
            ? relatedResult.post.filter((p: IPost) => (p.categoryId || p._id) !== id).slice(0, 4)
            : [];

        return (
            <div className="bg-gray-50 min-h-screen flex flex-col">
                {showRoadblockBanner && <RoadblockBanner data={activeBanner} pageType={'article'} />}
                <Header />
                <PostHero post={fetchedPost} />
                <main className="flex-1 pb-8 bg-white">
                    <div className="mt-8">
                        <ArticleContent post={fetchedPost} defaultSponsoredAd={defaultSponsoredAd} />
                    </div>
                    <div className="max-w-4xl mx-auto px-4 mt-8">
                        <ClapButton
                            postId={fetchedPost._id}
                            initialClaps={interactionData.claps}
                            initialHasClapped={interactionData.hasClapped}
                        />
                    </div>
                    {getAuthorUsername(fetchedPost.authors) && (
                        <AuthorSection author={fetchedPost.authors?.[0] as Author} />
                    )}
                    <SocialShareClientWrapper />
                    <CommentsSection
                        postId={fetchedPost._id}
                        initialComments={interactionData.comments}
                        initialLimitReached={interactionData.comments?.length >= 10}
                    />
                </main>

                {relatedPosts.length > 0 ? (
                    <section className="bg-gray-100 py-12 border-t">
                        <div className="max-w-6xl mx-auto px-4">
                            <h4 className="text-3xl font-bold mb-8 text-center text-text-color">
                                सम्बन्धित खबरहरू
                            </h4>
                            <div className="flex flex-wrap justify-center gap-6">
                                {relatedPosts.map((post) => (
                                    <article
                                        key={post._id}
                                        className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] max-w-xs bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col hover:shadow-xl transition-shadow duration-300"
                                    >
                                        <div className="relative h-48">
                                            {post.heroBanner ? (
                                                <Image
                                                    src={(post.heroBanner as ImageData).url}
                                                    alt={post.title}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 768px) 50vw, 25vw"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm p-4 text-center">
                                                    तस्वीर उपलब्ध छैन
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-4 flex flex-col flex-grow">
                                            <Link
                                                href={`/${post.category}/${post.categoryId || post._id}`}
                                                className="font-semibold text-base mb-2 text-text-color hover:underline transition-colors line-clamp-2"
                                            >
                                                {post.title}
                                            </Link>
                                            <p className="text-sm text-gray-600 line-clamp-2 mt-auto">
                                                {post.excerpt}
                                            </p>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </section>
                ) : (
                    <section className="bg-gray-50 py-12 border-t">
                        <div className="max-w-4xl mx-auto px-4 text-center text-gray-500 text-lg">
                            सम्बन्धित खबरहरू उपलब्ध छैनन्।
                        </div>
                    </section>
                )}

                <Footer />
            </div>
        );
    } catch (error: any) {
        console.error('Error fetching post:', error);
        return NotFound();
    }
}