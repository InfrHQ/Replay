'use client'

import React, { useState, useEffect, useRef } from 'react'
import ImagePlayerUI from '@/components/ImagePlayerUI'
import LoadingImagePlayer from '@/components/LoadingImagePlayer'
import { telemetry } from '@/utils'

function ImagePlayer({ queryString }) {

    const [imageList, setImageList] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [fetchingImages, setFetchingImages] = useState(true)
    const [searchedTime, setSearchedTime] = useState(null)

    const [olderOffset, setOlderOffset] = useState(0)
    const [newerOffset, setNewerOffset] = useState(0)

    const [allOlderSegmentsFetched, setAllOlderSegmentsFetched] =
        useState(false)
    const [allNewerSegmentsFetched, setAllNewerSegmentsFetched] =
        useState(false)

    const serverUrl = useRef('')
    const apiKey = useRef('')

    const query_limit = 100

    useEffect(() => {
        serverUrl.current = window.localStorage.getItem('serverUrl')
        apiKey.current = window.localStorage.getItem('apiKey')
        telemetry('pageview__player')
        initialLoad()
    }, [])

    const constructURL = (offset, queryStringHandler, newSearchedTime) => {
        let IQL_QUERY = `
        USE IQLV1.0.0
        FILTER status EQUAL TO 'active'
        `
        if (queryStringHandler === 'first' && queryString) {
            IQL_QUERY += `VECTOR SEARCH '${queryString}'`
        } else if (queryStringHandler === 'new' && queryString) {
            IQL_QUERY += 'FILTER date_generated GREATER THAN ' + newSearchedTime
        } else if (queryStringHandler === 'old' && queryString) {
            IQL_QUERY += 'FILTER date_generated LESS THAN ' + newSearchedTime
        }
        IQL_QUERY += `
        ORDER BY date_generated DESC
        OFFSET ${offset ? offset : 0}
        LIMIT ${query_limit}
        FIELDS id, attributes, name, extracted_text, date_generated
        MAKE screenshot_url, page_html_url
        RETURN
        `
        let base_64_query = Buffer.from(IQL_QUERY).toString('base64')
        return `${serverUrl.current}/v1/segment/query?query=${base_64_query}`
    }

    async function fetchData(offset, queryStringHandler, searchTime) {
        setFetchingImages(true)
        const url = constructURL(offset, queryStringHandler, searchTime)
        const options = {
            headers: {
                'Infr-API-Key': apiKey.current,
            },
        }
        const resp = await fetch(url, options)
        const resp_json = await resp.json()
        const new_segments = resp_json
        if (queryStringHandler !== 'first') new_segments.reverse()
        setFetchingImages(false)
        return new_segments
    }

    async function initialLoad() {
        let new_segments = []

        if (queryString) {
            const searchSegment = await fetchData(0, 'first') // Corrected argument

            let first_segment = searchSegment[0]

            let newSearchedTime = Math.floor(
                new Date(first_segment?.date_generated).getTime() / 1000,
            )
            setSearchedTime(newSearchedTime)
            const beforeSegments = await fetchData(
                olderOffset,
                'old',
                newSearchedTime,
            )
            const afterSegments = await fetchData(
                newerOffset,
                'new',
                newSearchedTime,
            )

            new_segments = [
                ...beforeSegments,
                first_segment,
                ...afterSegments,
            ]

            setOlderOffset((prevOffset) => prevOffset + query_limit)
            setNewerOffset((prevOffset) => prevOffset + query_limit)
            setCurrentIndex(parseInt(new_segments.indexOf(first_segment)))
        } else {
            new_segments = await fetchData(olderOffset) // Use olderOffset for generic load
            setCurrentIndex(parseInt(new_segments.length - 1))
            setOlderOffset((prevOffset) => prevOffset + query_limit)
            setAllNewerSegmentsFetched(true)
        }

        telemetry('page__player__first_load', {
            num_segments: new_segments.length,
        })

        setImageList(new_segments)
    }

    useEffect(() => {
        if (
            (
                ((currentIndex <= 10) && !allOlderSegmentsFetched) ||
                (((imageList.length - currentIndex) <= 10) && !allNewerSegmentsFetched)
            ) &&
                !fetchingImages
        ) {
            fetchMoreImages()
        }
    }, [currentIndex])

    async function fetchMoreImages() {
        telemetry('component__imageplayer__fetch_more_images_start', {
            num_segments: imageList.length,
        })

        // Initialize arrays to hold newly fetched segments
        let olderImages = []
        let newerImages = []

        // Fetch older images if the current index is near the start of the list
        if (currentIndex <= 10 && !allOlderSegmentsFetched) {
            if (queryString) {
                olderImages = await fetchData(olderOffset, 'old', searchedTime)
            } else {
                olderImages = await fetchData(olderOffset, 'old')
            }

            if (olderImages.length < query_limit) {
                setAllOlderSegmentsFetched(true)
            } else {
                setOlderOffset((prevOffset) => prevOffset + query_limit) // Update the olderOffset
            }
        }

        // Fetch newer images if the current index is near the end of the list
        else if (
            imageList.length - currentIndex <= 10 &&
            !allNewerSegmentsFetched
        ) {
            if (queryString) {
                newerImages = await fetchData(newerOffset, 'new', searchedTime)
            } else {
                newerImages = await fetchData(newerOffset, 'new')
            }

            if (newerImages.length < query_limit) {
                setAllNewerSegmentsFetched(true)
            } else {
                setNewerOffset((prevOffset) => prevOffset + query_limit) // Update the newerOffset
            }
        }

        // Handle neither case
        if (olderImages.length === 0 && newerImages.length === 0) {
            // If no new segments are fetched in either direction, mark the process as complete
            telemetry('component__imageplayer__fetch_more_images_complete', {
                num_segments: imageList.length,
            })
            return
        }

        // Combine older images, current image list, and newer images
        const newList = [...olderImages, ...imageList, ...newerImages]

        // Update the current index to reflect the addition of new segments
        if (olderImages.length > 0) {
            const newIndex = olderImages.length + Number(currentIndex)
            setCurrentIndex(parseInt(newIndex))
        }

        // Update the main state
        setImageList(newList)
        setFetchingImages(false)

        telemetry('component__imageplayer__fetch_more_images_success', {
            num_segments: newList.length,
        })
    }

    return (
        <>
            {imageList.length === 0 ? (
                <LoadingImagePlayer />
            ) : (
                <ImagePlayerUI
                    images={imageList}
                    currentIndex={currentIndex}
                    setCurrentIndex={setCurrentIndex}
                    fetchingImages={fetchingImages}
                    allSegmentsFetched={
                        allNewerSegmentsFetched && allOlderSegmentsFetched
                    }
                />
            )}
        </>
    )
}

export default ImagePlayer
