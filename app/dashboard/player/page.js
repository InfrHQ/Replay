'use client'

import { useEffect, useState } from 'react'
import ImagePlayer from './ImagePlayer'
import { telemetry } from '@/utils'
import SearchBar from '@/components/SearchBar'

import DashboardLayout from '@/components/DashboardLayout'

function Home() {
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
        <div>
            <main className="flex min-h-screen flex-col items-center justify-between p-10">
                <SearchBar />
                {!loading && <ImagePlayer segment={searchText} />}
            </main>
        </div>
    )
}

export default function DashboardHome() {
    return <DashboardLayout Component={Home} />
}
