import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

function ImagePlayerUI({
    images,
    currentIndex,
    setCurrentIndex,
    fetchingImages,
    allSegmentsFetched
}) {
    const [displayedIndex, setDisplayedIndex] = useState(currentIndex);
    const sliderTimeoutRef = useRef(null);

    useEffect(() => {
        setDisplayedIndex(currentIndex);
    }, [currentIndex]);

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
        <div>
            <div className="flex flex-col items-center w-full h-full mt-5">
                <div className="flex justify-center items-center h-120 w-full relative overflow-hidden">
                    <Image
                        src={images[displayedIndex]?.screenshot_url}
                        alt={`Image for timestamp: ${images[displayedIndex]?.timestamp}`}
                        objectFit="contain"
                        height={500}
                        width={1000}
                    />
                    {fetchingImages && (
                        <p className="animate-pulse absolute top-2 right-2 text-white bg-fuchsia-500 bg-opacity-40 px-2 py-1 rounded text-sm mt-2">
                            Fetching more images...
                        </p>
                    )}
                    {allSegmentsFetched && (
                        <p className=" absolute top-2 right-2 text-white bg-fuchsia-600 bg-opacity-40 px-2 py-1 rounded text-sm mt-2">
                            History fetch complete
                        </p>
                    )}
                    <p className="absolute bottom-2 left-2 text-white bg-black bg-opacity-40 px-2 py-1 rounded text-sm mt-2">
                        {new Date(images[displayedIndex]?.date_generated).toLocaleString()}
                    </p>
                    <p className="absolute bottom-12 left-2 text-white bg-black bg-opacity-40 px-2 py-1 rounded text-sm mt-2">
                        {images[displayedIndex]?.name}
                    </p>
                </div>

                <input
                    type="range"
                    min="0"
                    max={images.length - 1}
                    value={currentIndex}
                    onChange={handleSliderChange}
                    className="w-full mt-10"
                    disabled={fetchingImages}
                />
            </div>
        </div>
    );
}

export default ImagePlayerUI;
