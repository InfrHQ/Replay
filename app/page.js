'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { telemetry } from '@/utils'
import FloatingSearch from '@/components/Search'
export default function Home() {
    const [serverUrl, setServerUrl] = useState('')
    const [apiKey, setApiKey] = useState('')

    function handleGo() {
        if (serverUrl && apiKey) {
            window.localStorage.setItem('serverUrl', serverUrl)
            window.localStorage.setItem('apiKey', apiKey)
            telemetry('page__home__redirect_to_player', { serverUrl })
            window.location.href = '/player'
        }
    }

    useEffect(() => {
        telemetry('pageview__home', { url: window.location.href })
    }, [])

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                <p
                    className="cursor-pointer fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
                    onClick={() => {
                        window.location.href =
                            'https://github.com/infrhq/replay'
                    }}
                >
                    Open-source & Private&nbsp; [
                    <code className="font-mono font-bold">github</code>]
                </p>
                <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
                    <a
                        className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
                        href="https://getinfr.com/?utm_source=replay&utm_medium=appdir-template&utm_campaign=replay"
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

            <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
                <Image
                    className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
                    src="/replay.svg"
                    alt="Replay Logo"
                    width={720}
                    height={148}
                    priority
                />
            </div>
            <div className="flex flex-col items-center justify-center text-center space-y-6 md:flex-row md:space-y-0 md:space-x-8">
                <div className="relative rounded-md shadow-sm w-full md:w-auto">
                    <input
                        type="text"
                        placeholder="Server URL"
                        className="block w-full p-3 rounded-md border border-gray-300 dark:border-neutral-700 dark:bg-neutral-800/30 placeholder-gray-500 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition ease-in-out duration-150"
                        aria-label="Server URL"
                        onChange={(e) => setServerUrl(e.target.value)}
                        value={serverUrl}
                    />
                </div>

                <div className="relative rounded-md shadow-sm w-full md:w-auto">
                    <input
                        type="text"
                        placeholder="API Key"
                        className="block w-full p-3 rounded-md border border-gray-300 dark:border-neutral-700 dark:bg-neutral-800/30 placeholder-gray-500 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition ease-in-out duration-150"
                        aria-label="API Key"
                        onChange={(e) => setApiKey(e.target.value)}
                        value={apiKey}
                    />
                </div>
                <div className="flex flex-col items-center justify-center mt-6 md:mt-8">
                    <button
                        type="button"
                        className="bg-pink-600 hover:bg-pink-700 focus:ring-2 focus:ring-pink-500 focus:ring-opacity-60 transition-all ease-in-out duration-150 w-full md:w-auto px-12 py-3 rounded-md text-white font-semibold shadow-md"
                        style={{ backgroundColor: '#fb0294' }}
                        onClick={handleGo}
                    >
                        Go
                    </button>
                </div>
            </div>

            <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
                <a
                    href="https://getinfr.com/docs?utm_source=replay&utm_medium=appdir-template&utm_campaign=replay"
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <h2 className={`mb-3 text-2xl font-semibold`}>
                        Docs{' '}
                        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                            -&gt;
                        </span>
                    </h2>
                    <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                        Find in-depth information about Infr features and API.
                    </p>
                </a>

                <a
                    href="https://getinfr.com/learn?utm_source=replay&utm_medium=appdir-template-tw&utm_campaign=replay"
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <h2 className={`mb-3 text-2xl font-semibold`}>
                        Learn{' '}
                        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                            -&gt;
                        </span>
                    </h2>
                    <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                        Learn about Infr in an interactive course
                        with&nbsp;quizzes!
                    </p>
                </a>

                <a
                    href="https://getinfr.com/apps?framework=infr&utm_source=replay&utm_medium=appdir-template&utm_campaign=replay"
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <h2 className={`mb-3 text-2xl font-semibold`}>
                        More Apps{' '}
                        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                            -&gt;
                        </span>
                    </h2>
                    <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                        Explore more apps built with Infr.
                    </p>
                </a>

                <a
                    href="https://getinfr.com/join?utm_source=replay&utm_medium=appdir-template&utm_campaign=replay"
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <h2 className={`mb-3 text-2xl font-semibold`}>
                        Join{' '}
                        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                            -&gt;
                        </span>
                    </h2>
                    <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                        Get a managed Infr sever & become a part of the
                        revolution.
                    </p>
                </a>
            </div>
            <FloatingSearch />
        </main>
    )
}
