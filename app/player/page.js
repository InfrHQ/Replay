"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import ImagePlayer from "@/components/ImagePlayer";
import { telemetry } from "@/utils";

export default function Home() {
	var serverUrl = "";
	var apiKey = "";
	const [segments, setSegments] = useState([]);

	async function getData(offset, serverUrl, apiKey) {
		const url = `${serverUrl}/v1/segment/query?offset=${offset}&limit=100&include_image=true&include_fields=attributes,image_url,name,extracted_text,date_created`;

		const options = {
			headers: {
				"Infr-API-Key": apiKey,
			},
		};

		let resp = await fetch(url, options);
		let resp_json = await resp.json();
		let new_segments = resp_json.segments;
		// Reverse the order of the segments so that the newest ones are at the top
		new_segments.reverse();
		return new_segments;
	}

	async function firstLoad() {
		let new_segments = await getData(0, serverUrl, apiKey);
		telemetry("page__player__first_load", {
			num_segments: new_segments.length,
		});
		setSegments(new_segments);
	}

	useEffect(() => {
		telemetry("pageview__player");
		serverUrl = window.localStorage.getItem("serverUrl") || "";
		apiKey = window.localStorage.getItem("apiKey") || "";
		firstLoad();
	}, []);

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
						rel="noopener noreferrer">
						By{" "}
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

			{segments.length > 0 && (
				<ImagePlayer images={segments} fetchMoreImages={getData} />
			)}
			{segments.length == 0 && (
				<div role="status" className="animate-pulse p-10">
					<div className="flex items-center justify-center w-96 h-96 bg-gray-300 rounded dark:bg-gray-700">
						<svg
							className="w-10 h-10 text-gray-200 dark:text-gray-600"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 20 18">
							<path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
						</svg>
					</div>
				</div>
			)}
		</main>
	);
}
