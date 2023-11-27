'use client'
import { fontHeading } from "@/lib/fonts";
import Link from "next/link";
import ExpandingArrow from "@/components/expending-arrow";

function Welcome () {

  return (
    <>
    <header className="flex flex-col items-center gap-10 text-center">
      <h1
        className={`text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl ${fontHeading.variable}`}
      >
        Welcome to allbiiiz
      </h1>
      <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
        Your business journey starts here
      </p>
    </header>
    <section>
      <Link
        href="/solutions/announcements"
        className="group mx-auto flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.1)] backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50"
      >
        <p className="text-sm font-semibold text-gray-700">
          Start by sharing an announcement
        </p>
        <ExpandingArrow className="-ml-1 h-3.5 w-3.5" />
      </Link>
    </section>
    </>
  )
}

export default Welcome