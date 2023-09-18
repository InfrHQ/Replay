'use client'

import React, { useEffect, useState, useRef } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function SingleCard({ item, isLoading = false }) {
    let dateGenerated
    if (isLoading) {
        dateGenerated = new Date()
    } else {
        dateGenerated = new Date(item?.date_generated)
    }
    dateGenerated = dateGenerated.toLocaleString()

    let misc_item = item?.attributes?.window_name
    if (item?.attributes?.current_url) {
        misc_item = item?.attributes?.current_url
    }
    return (
        <div
            key={item?.name}
            className={
                'flex items-center p-4 border-b last:border-b-0 cursor-pointer' +
                (isLoading ? ' animate-pulse' : '')
            }
            // Onlick open a new tab /player?segment={base64 encoded segment}
            onClick={() => {
                if (!isLoading) {
                    window.open(
                        `/player?segment=${Buffer.from(
                            JSON.stringify(item),
                        ).toString('base64')}`,
                        '_blank',
                    )
                }
            }}
        >
            <img
                src={item?.screenshot_url}
                alt={item?.attributes?.app_name}
                className="w-36 h-24 rounded-m mr-3"
            />
            <div className="flex-grow">
                <h4 className="text-lg">
                    {item?.attributes?.app_name}{' '}
                    <span className="text-sm text-gray-500">{misc_item}</span>
                </h4>
                <p className="text-sm text-gray-600">{item?.name}</p>
                <p className="text-xs text-gray-400">{dateGenerated}</p>
            </div>
        </div>
    )
}

function SearchBar() {
    const [searchLoading, setSearchLoading] = useState(false)
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const [startDate, setStartDate] = useState(new Date(1971, 0, 0))
    const [endDate, setEndDate] = useState(new Date())

    const serverUrl = useRef('')
    const apiKey = useRef('')
    const searchDebounce = useRef(null)

    useEffect(() => {
        serverUrl.current = window.localStorage.getItem('serverUrl')
        apiKey.current = window.localStorage.getItem('apiKey')
    }, [])

    const constructURL = () => {
        let minTimeAsEpoch = startDate.getTime() / 1000
        let maxTimeAsEpoch = endDate.getTime() / 1000
        let IQL_QUERY = `
        USE IQLV1.0.1
        FILTER status EQUAL TO 'active'
        VECTOR SEARCH '${query}'
        FILTER date_generated GREATER THAN ${minTimeAsEpoch}
        FILTER date_generated LESS THAN ${maxTimeAsEpoch}
        ORDER BY date_generated DESC
        LIMIT 10
        FIELDS id, attributes, name, extracted_text, date_generated
        MAKE screenshot_url
        RETURN
        `
        let base_64_query = Buffer.from(IQL_QUERY).toString('base64')
        return `${serverUrl.current}/v1/segment/query?query=${base_64_query}`
    }

    async function fetchData() {
        setSearchLoading(true)
        const url = constructURL()
        const options = {
            headers: {
                'Infr-API-Key': apiKey.current,
            },
        }
        const resp = await fetch(url, options)
        const resp_json = await resp.json()
        const new_segments = resp_json
        new_segments.reverse()
        setSearchLoading(false)
        return new_segments
    }

    const handleSearch = async (e) => {
        const value = e.target.value
        setQuery(value)

        if (value) {
            // Clear any existing timeouts to prevent unnecessary searches
            if (searchDebounce.current) {
                clearTimeout(searchDebounce.current)
            }

            // Set a new timeout for the search
            searchDebounce.current = setTimeout(async () => {
                if (value) {
                    let data = await fetchData()
                    setResults(data)
                } else {
                    setResults([])
                }
            }, 500) // 500 ms delay
        } else {
            setResults([])
        }
    }

    return (
        <div className="relative w-full">
            <div className="relative w-full flex space-x-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                    </svg>
                </div>
                <input
                    type="search"
                    value={query}
                    onChange={handleSearch}
                    className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search for anything..."
                    required
                />

                <div date-rangepicker class="flex items-center ml-10">
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg
                                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                            </svg>
                        </div>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    <span class="mx-4 text-gray-500">to</span>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg
                                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                            </svg>
                        </div>

                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                </div>
            </div>
            {results.length > 0 && !searchLoading && (
                <div className="max-h-96 overflow-y-auto absolute w-full mt-2 bg-black  border border-gray-300 rounded-lg shadow-md z-10">
                    {results.map((item) => (
                        <SingleCard item={item} />
                    ))}
                </div>
            )}{' '}
            {searchLoading && (
                <div className="max-h-96 overflow-y-auto absolute w-full mt-2 bg-black bg-opacity-80 border border-gray-300 rounded-lg shadow-md z-10">
                    <SingleCard isLoading={true} />
                    <SingleCard isLoading={true} />
                    <SingleCard isLoading={true} />
                    <SingleCard isLoading={true} />
                </div>
            )}
        </div>
    )
}

export default SearchBar
