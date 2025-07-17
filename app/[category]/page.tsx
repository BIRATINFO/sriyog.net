/* eslint-disable @typescript-eslint/no-explicit-any */
import Footer from "@/components/homepage/Footer";
import { Author, IPost } from "@/types/Post";
import Link from "next/link";
import Image from "next/image";
import NepaliDateTime from "@/components/homepage/NepaliDate";
import Header from "@/components/homepage/Header";
import { getNepaliCategory } from "@/components/homepage/Hero";
import NotFound from "../not-found";

const getAuthorName = (authors: Author[] | undefined): string => {
    if (!authors || authors.length === 0) return 'अज्ञात';
    return `${authors[0].firstName} ${authors[0].lastName}`.trim() || 'अज्ञात';
};


const API_CONFIG = {
    backend_uri: process.env.NEXT_PUBLIC_BACKEND_URL,
    apiKey: process.env.NEXT_PUBLIC_API_SPECIAL_KEY,
};

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {


    const { category } = await params;
    const { backend_uri, apiKey } = API_CONFIG;

    if (!backend_uri || !apiKey) {
        return (
            NotFound()
        )
    }

    const headers = { 'x-special-key': apiKey }
    const options: RequestInit = { headers, cache: 'no-store' }

    try {

        // Fetch category data 
        const res = await fetch(`${backend_uri}/api/posts/category-summary/${category}/sriyog.net`, options)
        if (!res.ok) {
            throw new Error(`Failed to fetch category: ${category}`)
        }
        const categoryBlocks = await res.json()
        const allPosts: IPost[] = categoryBlocks.post;

        if (allPosts.length == 0) return NotFound()


        return (
            <div className="min-h-screen flex flex-col gap-6">
                {/* Header */}
                <header className="w-full">
                    <Header />
                </header>

                {/* Main Content  */}
                <main className="flex-1">
                    <div className="w-full px-4 lg:px-16 md:px-5 py-4 bg-white">
                        <div className="max-w-8xl mx-auto md:mx-12 lg:mx-20">
                            <div className="flex flex-col gap-2">
                                <h1 className="text-2xl font-bold text-text-color">
                                    {getNepaliCategory(category)} सम्बन्धित समाचारहरू
                                </h1>
                                <div className="w-full h-[2px] bg-[#ebebeb]" />
                            </div>
                        </div>
                    </div>

                    {/* Grid Content */}
                    <div className="w-full px-4 lg:px-16 md:px-5 py-6">
                        <div className="max-w-8xl mx-auto md:mx-12 lg:mx-20">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                {allPosts.map((post) => (
                                    <div key={post._id} className="flex flex-col gap-4 justify-between">
                                        <div className="w-full aspect-[3/2] relative rounded-xl overflow-hidden">
                                            <Image
                                                src={post.heroBanner?.url || '/images/placeholder.jpg'}
                                                alt={post.title}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                        </div>

                                        <div>
                                            <Link
                                                href={`/${post.category}/${post.categoryId}`}
                                                className="font-ibm_plex_serif font-bold text-xl lg:text-2xl cursor-pointer text-text-color mt-3 hover:underline line-clamp-1"
                                            >
                                                {post.title}
                                            </Link>
                                            <p className="text-[#808080] font-ibm_plex_serif font-medium text-base mt-1.5 line-clamp-3">
                                                {post.excerpt}
                                            </p>
                                        </div>

                                        <div className="text-[#808080] font-roboto text-md flex items-center gap-2">
                                            <Link href={`/author/${post.authors[0]?.username}`} className='font-bold'>{getAuthorName(post.authors)}</Link>
                                            <span>·</span>
                                            {post.updatedAt && (
                                                <span><NepaliDateTime updatedAt={post.updatedAt} /></span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="w-full">
                    <Footer />
                </footer>
            </div>

        );

    } catch (error: any) {
        return (
            console.error('Error fetching posts:', error)
        )
    }

};