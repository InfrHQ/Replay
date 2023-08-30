'use client'

import { useEffect } from 'react'
import ImagePlayer from './ImagePlayer'
import { telemetry } from '@/utils'
import Header from '@/components/Header'
import FloatingSearch from '@/components/Search'

export default function Home() {

    // Get the ?searchText=xyz parameter
    var searchText = window.location.search.split('=')[1]
    if (searchText) {
        searchText = decodeURIComponent(searchText)
    }

    useEffect(() => {
        telemetry('pageview__player')
    }, [])

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Header />
            <ImagePlayer queryString={searchText} />
            <FloatingSearch />
        </main>
    )
}
