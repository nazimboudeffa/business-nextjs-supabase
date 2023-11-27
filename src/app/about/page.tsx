import Header from "@/components/Header"
import { fontHeading } from "@/lib/fonts"

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Image from 'next/image'

const About = async () => {

    const supabase = createServerComponentClient({ cookies });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    return (
        <>
        <Header session = { session } />
            <main className="mt-10 flex flex-col items-center gap-5 text-center">
                <h1
                    className={`text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl ${fontHeading.variable}`}
                >
                    About the project
                </h1>
                <p className="max-w-[500px] text-lg text-muted-foreground sm:text-xl">
                Welcome to our innovative online business platform, we offer an all-in-one web app to do online business.
                </p>

                <section className="w-full py-12 md:py-24 lg:py-32">
                <div className="container px-4 md:px-6">
                    <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
                    <div className="flex flex-col justify-center space-y-4">
                        <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our vision</h2>
                        <p className="max-w-[600px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400">
                        At allbiiiz, we envision a world where geographical boundaries no longer limit business growth. Our platform is a conduit for turning dreams into online enterprises, connecting passionate individuals with a global audience.
                        </p>
                        </div>
                    </div>
                    <Image
                        alt="Image"
                        className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                        height="310"
                        src="/clark-tibbs-oqStl2L5oxI-unsplash.jpg"
                        width="550"
                    />
                    </div>
                </div>
                </section>

                <section className="w-full py-12 md:py-24 lg:py-32">
                <div className="container px-4 md:px-6">
                    <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
                    <Image
                        alt="About Image"
                        className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-first"
                        height="500"
                        src="/clark-tibbs-oqStl2L5oxI-unsplash.jpg"
                        width="500"
                    />
                    <div className="flex flex-col justify-center space-y-4">
                        <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Empowering Success</h2>
                        <p className="max-w-[600px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400">
                            We believe that success in the digital age should be within everyone reach. Our user-friendly interface eliminates the complexities of online business, enabling you to focus on what you do best while we handle the technicalities.
                        </p>
                        </div>
                    </div>
                    </div>
                </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5 mr-10 ml-10">
                    <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                        <Image
                        alt="Card Image"
                        className="w-full h-48 object-cover"
                        height="200"
                        src="/clark-tibbs-oqStl2L5oxI-unsplash.jpg"
                        width="200"
                        />
                        <div className="p-6">
                        <h3 className="text-xl font-bold">Empowering Success</h3>
                        <p className="text-zinc-500">We believe that success in the digital age should be within everyone reach. Our user-friendly interface eliminates the complexities of online business, enabling you to focus on what you do best while we handle the technicalities.</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                        <Image
                        alt="Card Image"
                        className="w-full h-48 object-cover"
                        height="200"
                        src="/clark-tibbs-oqStl2L5oxI-unsplash.jpg"
                        width="200"
                        />
                        <div className="p-6">
                        <h3 className="text-xl font-bold">Unleashing Creativity</h3>
                        <p className="text-zinc-500">Whether you are an established business looking to expand online or an individual with a unique idea, our platform provides the tools to unleash your creativity. From customizable templates to advanced e-commerce solutions, you are equipped to create a distinctive online presence.</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                        <Image
                        alt="Card Image"
                        className="w-full h-48 object-cover"
                        height="200"
                        src="/clark-tibbs-oqStl2L5oxI-unsplash.jpg"
                        width="200"
                        />
                        <div className="p-6">
                        <h3 className="text-xl font-bold">Global Reach, Local Impact</h3>
                        <p className="text-zinc-500">Whether you are an established business looking to expand online or an individual with a unique idea, our platform provides the tools to unleash your creativity. From customizable templates to advanced e-commerce solutions, you are equipped to create a distinctive online presence.</p>
                        </div>
                    </div>
                </div>
                </section>
            </main>
        </>
    )
}

export default About