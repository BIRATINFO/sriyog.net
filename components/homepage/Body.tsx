// Body.tsx
import React from 'react';
import Summary from './Summary';
import Economy from './Economy';
import Technology from './Technology';
import { IPost } from '@/types/Post';
import Tourism from './Tourism';
import Agriculture from './Agriculture';
import Lifestyle from './Lifestyle';


interface BodyProps {
    data: IPost[] | null;
}

function Body({ data }: BodyProps) {
    if (!data) return null;


    // Filter posts by category
    const summaryCategories = ['sports', 'health', 'education', 'entertainment', 'culture'];

    const summaryPosts = data.filter(post =>
        summaryCategories.includes(post.category?.toLowerCase())
    ).slice(0, 5);

    const remaining = data.filter(post => !summaryPosts.includes(post));

    const tourismPosts = remaining.filter(post => post.category?.toLowerCase() === 'tourism').slice(0, 4);
    const economyPosts = remaining.filter(post => post.category?.toLowerCase() === 'economy').slice(0, 4);
    const technologyPosts = remaining.filter(post => post.category?.toLowerCase() === 'technology').slice(0, 3);
    const agriculturePosts = remaining.filter(post => post.category?.toLowerCase() === 'agriculture').slice(0, 4);
    const lifestylePosts = remaining.filter(post => post.category?.toLowerCase() === 'lifestyle').slice(0, 4);

    return (
        <div>
            <Summary posts={summaryPosts} />
            <Tourism posts={tourismPosts} />
            <Economy posts={economyPosts} />
            <Technology posts={technologyPosts} />
            <Agriculture posts={agriculturePosts} />
            <Lifestyle posts={lifestylePosts} />
        </div>
    );
}

export default Body;