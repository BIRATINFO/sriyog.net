/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import Header from '@/components/homepage/Header'
import Hero from '@/components/homepage/Hero'
import Body from '@/components/homepage/Body'
import Footer from '@/components/homepage/Footer'
import { notFound } from 'next/navigation'
import RoadblockBanner from '@/components/RoadBlockBanner'

export default async function Page() {
  const backend_uri = process.env.NEXT_PUBLIC_BACKEND_URL
  const apiKey = process.env.NEXT_PUBLIC_API_SPECIAL_KEY

  if (!backend_uri || !apiKey) {
    return notFound()
  }

  const headers = { 'x-special-key': apiKey }
  const options: RequestInit = { headers, cache: 'no-store' }

  // First fetch roadblock banner immediately
  const roadblockRes = await fetch(`${backend_uri}/api/roadblocks/network/sriyog.net`, options)
  const roadblockData = await roadblockRes.json()
  const activeBanner = roadblockData?.data || null

  // Then start fetching other content in parallel
  const [heroData, categoryBlocks] = await Promise.all([
    fetch(`${backend_uri}/api/posts/featured-news/sriyog.net`, options)
      .then(res => res.ok ? res.json() : { post: [] })
      .then(data => data?.post || [])
      .catch(() => []),

    fetch(`${backend_uri}/api/posts/homepage/sriyog.net`, options)
      .then(res => res.ok ? res.json() : { post: [] })
      .then(data => data?.post || [])
      .catch(() => [])
  ])

  return (
    <div>
      {/* Show roadblock banner immediately if exists */}
      {activeBanner && <RoadblockBanner data={activeBanner} pageType={'home'} />}

      <Header />
      <Hero data={heroData} />
      <Body data={categoryBlocks} />
      <Footer />
    </div>
  )
}