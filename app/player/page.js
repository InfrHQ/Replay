'use client'

import { useEffect, useState } from 'react'
import ImagePlayer from './ImagePlayer'
import { telemetry } from '@/utils'
import Header from '@/components/Header'
import FloatingSearch from '@/components/Search'

export default function Home() {

    // Get the ?searchText=xyz parameter
    const [searchText, setSearchText] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        telemetry('pageview__player')
        let tempSearchText = window.location.search.split('=')[1]
        if (tempSearchText) {
            setSearchText(decodeURIComponent(tempSearchText))
        }
        setLoading(false)
    }, [])

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Header />
            {!loading && <ImagePlayer queryString={searchText} />}
            <FloatingSearch />
        </main>
    )
}
