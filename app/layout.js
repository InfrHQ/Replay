import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Replay: Remember everything.",
	description:
		"Replay is an open-source app built on Infr that allows you to remember everything you've ever seen on the internet.",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>{children}</body>
		</html>
	);
}
