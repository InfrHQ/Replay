'use client'

// FloatingSearch.js
import React, { useState } from 'react'

function FloatingSearch({
    setImageList,
    setCurrentIndex,
    setDisplayedIndex,
    setOffset,
}) {
    const [isOpen, setIsOpen] = useState(false)
    function handleOpenClose(spot) {
        if (spot === 'main' && !isOpen) {
            setIsOpen(true)
        } else if (spot === 'close_tag' && isOpen) {
            setIsOpen(false)
        }
    }

    return (
        <div
            className={`fixed bottom-4 right-4 transition-all duration-100 transform ${
                isOpen ? 'w-64 h-48 rounded' : 'w-16 h-16 rounded-full'
            }  bg-pink-600 cursor-pointer overflow-hidden`}
            onClick={() => handleOpenClose('main')}
        >
            {isOpen ? (
                <div className="flex flex-col h-full relative">
                    {/* Close Button */}
                    <span
                        className="absolute top-2 right-2 cursor-pointer bg-white text-black rounded-full w-5 h-5 text-center leading-5"
                        onClick={() => handleOpenClose('close_tag')}
                    >
                        X
                    </span>
                    <div className="bg-pink-600 text-white p-2">
                        Search here
                    </div>
                    <div className="flex-1 overflow-y-auto p-2">
                        <textarea
                            id="message"
                            rows="4"
                            class="block p-3 w-full text-sm text-slate-300 bg-white-500 rounded-lg border focus:ring-blue-500 dark:bg-slate-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black"
                            placeholder="What are you looking for..."
                        ></textarea>
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export default FloatingSearch
