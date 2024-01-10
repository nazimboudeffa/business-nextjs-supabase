export default function Problem() {
    return (
        <section>
        <div className="p-8 md:p-12 lg:px-16 lg:py-24">
            <div className="mx-auto max-w-lg max-h-lg text-center">
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                We try to solve many digital problems
            </h2>

            <p className="hidden text-gray-500 sm:mt-4 sm:block">
                We try to solve many digital problems, in marketing, in sales, in customer service, in product development, and more.
            </p>
            </div>
        </div>
        <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1 top-0 -z-10 h-[64rem] w-[64rem] [mask-image:radial-gradient(closest-side,white,transparent)]"
            aria-hidden="true"
        >
            <circle cx={512} cy={512} r={512} fill="url(#top)" fillOpacity="0.7" />
            <defs>
            <radialGradient id="top">
                <stop stopColor="#00FFEE" />
                <stop offset={1} stopColor="#00FFEE" />
            </radialGradient>
            </defs>
        </svg>
        <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-3/4 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
            aria-hidden="true"
        >
            <circle cx={512} cy={512} r={512} fill="url(#down)" fillOpacity="0.7" />
            <defs>
            <radialGradient id="down">
                <stop stopColor="#00FF00" />
                <stop offset={1} stopColor="#00FF00" />
            </radialGradient>
            </defs>
        </svg>
        </section>
    )
}