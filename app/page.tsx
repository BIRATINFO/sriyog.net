/* eslint-disable @typescript-eslint/no-explicit-any */
//SERVER_SIDE_RENDERING_PAGE

import React from 'react'
import Header from '@/components/homepage/Header'
import Hero from '@/components/homepage/Hero'
import Body from '@/components/homepage/Body'
import Footer from '@/components/homepage/Footer'
import { IPost } from '@/types/Post'
import { notFound } from 'next/navigation'


export default async function Page() {
  const backend_uri = process.env.NEXT_PUBLIC_BACKEND_URL
  const apiKey = process.env.NEXT_PUBLIC_API_SPECIAL_KEY

  if (!backend_uri || !apiKey) {
    return (
      notFound()
    )
  }

  const headers = { 'x-special-key': apiKey }
  const options: RequestInit = { headers, cache: 'no-store' }

  try {
    // Fetch hero post
    const heroRes = await fetch(`${backend_uri}/api/posts/featured-news/bhadrapur.com`, options)
    if (!heroRes.ok) {
      throw new Error('Banner or hero fetch failed')
    }
    const heroPostData = await heroRes.json()
    const heroData = heroPostData?.post || []


    // Fetch category data 
    const res = await fetch(`${backend_uri}/api/posts/homepage/bhadrapur.com`, options)
    if (!res.ok) throw new Error(`Failed to fetch homepage news`)

    const response = await res.json()
    const categoryBlocks: IPost[] = response?.post || []

    return (
      <div>
        <Header />
        <Hero data={heroData} />
        <Body data={categoryBlocks} />
        <Footer />
      </div>
    )
  } catch (error: any) {
    return (
      <div className="p-4 text-center text-red-600">
        {error?.message || 'Unexpected error occurred.'}
      </div>
    )
  }
}

