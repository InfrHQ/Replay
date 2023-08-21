'use client'


import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { telemetry } from "@/utils";
import ImagePlayerUI from "../../components/ImagePlayerUI";

function ImagePlayer() {
    const [imageList, setImageList] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [offset, setOffset] = useState(100);
    const [fetchingImages, setFetchingImages] = useState(true);
    const [allSegmentsFetched, setAllSegmentsFetched] = useState(false);

    const serverUrl = useRef(window.localStorage.getItem("serverUrl") || "");
    const apiKey = useRef(window.localStorage.getItem("apiKey") || "");

    useEffect(() => {
        telemetry('pageview__player');
        initialLoad();
    }, []);

    async function fetchData(offset) {
		setFetchingImages(true);
        const url = `${serverUrl.current}/v1/segment/query?offset=${offset}&limit=100&include_image=true&include_fields=attributes,image_url,name,extracted_text,date_created`;
        const options = {
            headers: {
                'Infr-API-Key': apiKey.current,
            },
        };
        const resp = await fetch(url, options);
        const resp_json = await resp.json();
        const new_segments = resp_json.segments;
        new_segments.reverse();
		setFetchingImages(false);
        return new_segments;
    }

    async function initialLoad() {
        const new_segments = await fetchData(0);
        telemetry('page__player__first_load', {
            num_segments: new_segments.length,
        });
        setImageList(new_segments);
        setCurrentIndex(new_segments.length - 1);
    }

    useEffect(() => {
        if (currentIndex <= 10 && !fetchingImages && !allSegmentsFetched) {
            fetchMoreImages();
        }
    }, [currentIndex]);

    async function fetchMoreImages() {
        telemetry("component__imageplayer__fetch_more_images_start", {
            num_segments: imageList.length,
        });
        setFetchingImages(true);
        const olderImages = await fetchData(offset);

        if (olderImages.length < 100) {
            setFetchingImages(false);
            setAllSegmentsFetched(true);
            telemetry("component__imageplayer__fetch_more_images_complete", {
                num_segments: imageList.length,
            });
            return;
        }
        
        const newList = [...olderImages, ...imageList];
        const proportion = (parseInt(currentIndex) + olderImages.length) / newList.length;
        const newIndex = Math.round(proportion * newList.length);

        setCurrentIndex(newIndex);
        setOffset((prevOffset) => prevOffset + 100);
        setImageList(newList);
        setFetchingImages(false);
        telemetry("component__imageplayer__fetch_more_images_success", {
            num_segments: newList.length,
        });
    }

    return (
        <ImagePlayerUI 
            images={imageList} 
            currentIndex={currentIndex} 
            setCurrentIndex={setCurrentIndex} 
            fetchingImages={fetchingImages} 
            allSegmentsFetched={allSegmentsFetched} 
        />
    );
}

export default ImagePlayer;
