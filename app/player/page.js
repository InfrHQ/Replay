'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import ImagePlayer from './ImagePlayer'
import { telemetry } from '@/utils'

export default function Home() {
    useEffect(() => {
        telemetry('pageview__player')
    }, [])

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex mb-2">
                <p className="cursor-pointer fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                    Built on the Infr server&nbsp; [
                    <code className="font-mono font-bold">github</code>]
                </p>
                <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
                    <a
                        className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
                        href="https://getinfr.com/?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        By{' '}
                        <Image
                            src="/infr-logo.svg"
                            alt="Infr Logo"
                            width={100}
                            height={24}
                            priority
                        />
                    </a>
                </div>
            </div>

            <ImagePlayer />
        </main>
    )
}
