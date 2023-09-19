function DashboardHeader() {
    function handleLogout() {
        // Clean local storage
        localStorage.removeItem('serverUrl')
        localStorage.removeItem('apiKey')

        // Redirect to home page
        window.location.href = '/'
    }

    return (
        <header>
            <nav className="bg-white  py-2.5 dark:bg-slate-950 border-2 border-gray-950 border-b-gray-900 ">
                <div className="flex flex-wrap justify-between items-center">
                    <a href="https://getinfr.com" className="p-1">
                        <img
                            src="/infr-logo.svg"
                            className="mr-3 h-6 sm:h-9"
                            alt="Infr Logo"
                        />
                    </a>
                    <div className="flex items-center">
                        <a
                            href="#"
                            className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                            onClick={handleLogout}
                        >
                            Log Out
                        </a>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default DashboardHeader
