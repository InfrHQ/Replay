import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { telemetry } from "@/utils";

function ImagePlayer({ images, fetchMoreImages }) {
	const [imageList, setImageList] = useState(images);
	const [currentIndex, setCurrentIndex] = useState(images.length - 1); // Start at the last image
	const [displayedIndex, setDisplayedIndex] = useState(images.length - 1); // Image index to display
	const [offset, setOffset] = useState(100);
	const sliderTimeoutRef = useRef(null);
	const [fetchingImages, setFetchingImages] = useState(false);
	const [allSegmentsFetched, setAllSegmentsFetched] = useState(false);

	var serverUrl = null;
	var apiKey = null;

	useEffect(() => {

		if (!serverUrl || !apiKey) {
	    serverUrl = window.localStorage.getItem("serverUrl");
			apiKey = window.localStorage.getItem("apiKey");
		}

		// When the user is near the end, fetch more images
		if (currentIndex <= 10 && !fetchingImages && !allSegmentsFetched) {
			handleFetchMoreImages();
		}
	}, [currentIndex]);

	async function handleFetchMoreImages() {
    telemetry("component__imageplayer__fetch_more_images_start", {num_segments: imageList.length});
		setFetchingImages(true);
		const olderImages = await fetchMoreImages(offset, serverUrl, apiKey);
		if (olderImages.length < 100) {
			setFetchingImages(false);
			setAllSegmentsFetched(true);
            telemetry("component__imageplayer__fetch_more_images_complete", {num_segments: imageList.length});
			return;
		}
		const newList = [...olderImages, ...imageList];
		// Check if user is near the end (within the last 10 images) before the fetch
		// Calculate the proportional position of currentIndex in the updated imageList
		const proportion =
			(parseInt(currentIndex) + olderImages.length) / newList.length;
		const newIndex = Math.round(proportion * newList.length);

		setCurrentIndex(newIndex.toString());
		setDisplayedIndex(newIndex.toString());

		setOffset((prevOffset) => prevOffset + 100);
		setImageList(newList);
		setFetchingImages(false);
        telemetry("component__imageplayer__fetch_more_images_success", {num_segments: imageList.length});
	}

	const handleSliderChange = (e) => {
		const newIndex = e.target.value;
		setCurrentIndex(newIndex); // Update the slider's position instantly

		// Clear any previous timeouts
		if (sliderTimeoutRef.current) clearTimeout(sliderTimeoutRef.current);

		// Set a delay of 300 milliseconds before changing the displayed image.
		sliderTimeoutRef.current = setTimeout(() => {
			setDisplayedIndex(newIndex);
		}, 300);
	};

	return (
		<div className="flex flex-col items-center w-full h-full mt-5">
			<div className="flex justify-center items-center h-120 w-full relative overflow-hidden">
				<Image
					src={imageList[displayedIndex].image_url}
					alt={`Image for timestamp: ${imageList[displayedIndex].timestamp}`}
					objectFit="contain"
					height={500}
					width={1000}
				/>
				{fetchingImages && (
					<p className="animate-pulse absolute top-2 right-2 text-white bg-fuchsia-500	 bg-opacity-40 px-2 py-1 rounded text-sm mt-2">
						Fetching more images...
					</p>
				)}{
          allSegmentsFetched && (
            <p className=" absolute top-2 right-2 text-white bg-fuchsia-600	 bg-opacity-40 px-2 py-1 rounded text-sm mt-2">
              History fetch complete
            </p>)
        }
				<p className="absolute bottom-2 left-2 text-white bg-black bg-opacity-40 px-2 py-1 rounded text-sm mt-2">
					{new Date(
						imageList[displayedIndex].date_created
					).toLocaleString()}
				</p>
				<p className="absolute bottom-12 left-2 text-white bg-black bg-opacity-40 px-2 py-1 rounded text-sm mt-2">
					{imageList[displayedIndex].name}
				</p>
			</div>

			<input
				type="range"
				min="0"
				max={imageList.length - 1}
				value={currentIndex}
				onChange={handleSliderChange}
				className="w-full mt-10"
				disabled={fetchingImages}
			/>
		</div>
	);
}

export default ImagePlayer;
