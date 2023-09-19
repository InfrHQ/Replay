import Image from 'next/image'

function Footer() {
    return (
        <footer className=" rounded-lg shadow m-4">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <a
                        href="https://getinfr.com/"
                        className="flex items-center mb-4 sm:mb-0"
                    >
                        <Image
                            src="/infr-logo.svg"
                            alt="Infr Logo"
                            width={100}
                            height={24}
                            priority
                            className="h-8 mr-3"
                        />
                    </a>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                        <li>
                            <a
                                href="https://github.com/InfrHQ"
                                className="mr-4 hover:underline md:mr-6 "
                            >
                                Licensing
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://getinfr.com/privacy"
                                className="mr-4 hover:underline md:mr-6"
                            >
                                Privacy Policy
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://getinfr.com/terms"
                                className="mr-4 hover:underline md:mr-6 "
                            >
                                Terms
                            </a>
                        </li>
                        <li>
                            <a
                                href="mailto:support@infrhq.com"
                                className="hover:underline"
                            >
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
                    © 2023{' '}
                    <a href="https://getinfr.com/" className="hover:underline">
                        Infr™
                    </a>
                    . All Rights Reserved.
                </span>
            </div>
        </footer>
    )
}

export default Footer
