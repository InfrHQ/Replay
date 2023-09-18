'use client'
import { useState, useEffect } from 'react'

import Link from 'next/link'
import Footer from './Footer'
import DashboardHeader from './DashboardHeader'

function SingleLink({ text, url, currentUrl }) {
    return (
        <Link
            className={
                'font-medium block py-2.5 px-4 rounded transition duration-200 hover:bg-gradient-to-t from-[#8678f9] from-0% to-[#c7d2fe] hover:text-white' +
                (String(currentUrl).includes(url) ? ' text-white' : '')
            }
            href={url}
        >
            {text}
        </Link>
    )
}

export default function DashboardLayout({ Component }) {
    const [currentUrl, setCurrentUrl] = useState('')
    useEffect(() => {
        setCurrentUrl(window.location.pathname)
    }, [])

    return (
        <div>
            <DashboardHeader />
            <div className="flex flex-grow min-h-screen">
                <aside className="w-48 bg-white dark:bg-gray-950 border-2 border-gray-950 border-r-gray-900 text-slate-400">
                    <nav className="mt-4">
                        <SingleLink
                            text={'Player'}
                            url={'/dashboard/player'}
                            currentUrl={currentUrl}
                        />
                        <Link
                            className="font-medium block py-2.5 px-4 rounded transition duration-200 cursor-not-allowed"
                            href="#"
                        >
                            <span className="relative inline-block overflow-hidden rounded-full p-[1px]">
                                <span className="absolute inset-[-1000%] animate-[spin_8s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                                <div className="inline-flex h-full  items-center justify-center rounded-full bg-slate-950/90 p-2 text-xs text-white backdrop-blur-3xl">
                                    + Coming Soon...
                                </div>
                            </span>
                        </Link>
                    </nav>
                </aside>
                <div className="flex-grow flex-col mb-20">
                    <div className="justify-center items-center min-h-screen">
                        <Component />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
