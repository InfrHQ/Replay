import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function SearchBar() {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const [startDate, setStartDate] = useState(new Date(0,0,0));
    const [endDate, setEndDate] = useState(new Date());
    const data = [
        {
            image: 'path/to/image1.jpg',
            name: 'John Doe',
            nickname: 'Johnny',
            description: 'A graphic designer from NY.',
            date: '2023-01-01',
        },
        {
            image: 'path/to/image1.jpg',
            name: 'John Doe',
            nickname: 'Johnny',
            description: 'A graphic designer from NY.',
            date: '2023-01-01',
        },
        {
            image: 'path/to/image1.jpg',
            name: 'John Doe',
            nickname: 'Johnny',
            description: 'A graphic designer from NY.',
            date: '2023-01-01',
        },
        {
            image: 'path/to/image1.jpg',
            name: 'John Doe',
            nickname: 'Johnny',
            description: 'A graphic designer from NY.',
            date: '2023-01-01',
        },
        {
            image: 'path/to/image1.jpg',
            name: 'John Doe',
            nickname: 'Johnny',
            description: 'A graphic designer from NY.',
            date: '2023-01-01',
        },
        {
            image: 'path/to/image1.jpg',
            name: 'John Doe',
            nickname: 'Johnny',
            description: 'A graphic designer from NY.',
            date: '2023-01-01',
        },
        {
            image: 'path/to/image1.jpg',
            name: 'John Doe',
            nickname: 'Johnny',
            description: 'A graphic designer from NY.',
            date: '2023-01-01',
        },
        {
            image: 'path/to/image1.jpg',
            name: 'John Doe',
            nickname: 'Johnny',
            description: 'A graphic designer from NY.',
            date: '2023-01-01',
        },
        // ... Add more data as needed
    ]

    const handleSearch = (e) => {
        const value = e.target.value
        setQuery(value)
        if (value) {
            const filteredData = data.filter(
                (item) =>
                    item.name.includes(value) || item.nickname.includes(value),
            )
            setResults(filteredData)
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
                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>

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
 
                            <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                    </div>
                </div>
            </div>
            {results.length > 0 && (
                <div className="max-h-96 overflow-y-auto absolute w-full mt-2 bg-black bg-opacity-40 border border-gray-300 rounded-lg shadow-md z-10">
                    {results.map((item) => (
                        <div
                            key={item.name}
                            className="flex items-center p-4 border-b last:border-b-0 cursor-pointer"
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-12 h-12 rounded-full mr-3"
                            />
                            <div className="flex-grow">
                                <h4 className="text-lg">
                                    {item.name}{' '}
                                    <span className="text-sm text-gray-500">
                                        ({item.nickname})
                                    </span>
                                </h4>
                                <p className="text-sm text-gray-600">
                                    {item.description}
                                </p>
                                <p className="text-xs text-gray-400">
                                    {item.date}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default SearchBar
