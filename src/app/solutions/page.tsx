import Header from "@/components/Header"
import Link from "next/link"
import { XCircle, CheckCircle2 } from 'lucide-react';
import { fontHeading } from "@/lib/fonts"

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const Services = async function () {

    const supabase = createServerComponentClient({ cookies });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    const allServices = [
        {
            id: "0",
            name: "Anouncements",
            description:
                "Share business announcements and get partners.",
            icon: <CheckCircle2 />,
            color: "green",
            link: "/solutions/announcements",
        },
        {
            id: "1",
            name: "SEO",
            description:
                "Manage your sites.",
            icon: <CheckCircle2 />,
            color: "green",
            link: "/solutions/seo",
        },
        {
            id: "2",
            name: "Marketing",
            description:
                "Create marketing campaings.",
            icon: <XCircle />,
            color: "red",
            link: "/",
        },
        {
            id: "3",
            name: "Crypto",
            description:
                "Manage your cryptos.",
            icon: <XCircle />,
            color: "red",
            link: "/",
        },
        {
            id: "4",
            name: "Trading",
            description:
                "Manage your trading.",
            icon: <XCircle />,
            color: "red",
            link: "/",
        },
        {
            id: "5",
            name: "Affiliation",
            description:
                "Create affiliation campaings.",
            icon: <XCircle />,
            color: "red",
            link: "/",
        },
        {
            id: "6",
            name: "Influence",
            description:
                "Find your next influencer.",
            icon: <XCircle />,
            color: "red",
            link: "/",
        },
        {
            id: "7",
            name: "Jobs",
            description:
                "Post or find your next job.",
            icon: <XCircle />,
            color: "red",
            link: "/",
        },
        {
            id: "8",
            name: "Networking",
            description:
                "Meet awesome people and build your team.",
            icon: <XCircle />,
            color: "red",
            link: "/",
        },
        {
            id: "9",
            name: "Mailing",
            description:
                "Create mailing campaigns.",
            icon: <XCircle />,
            color: "red",
            link: "/",
        },
    ]
    
    return (
        <>
        <Header session = { session } />
        <header className="mt-10 flex flex-col items-center gap-10 text-center">
            <h1
                className={`text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl ${fontHeading.variable}`}
            >
                What we offer
            </h1>
            <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
                We provide services, tools and features to help you grow your business.
            </p>
        </header>
        <section className="flex flex-col items-center gap-10">
        <div className="ml-5 mr-5 mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
            {allServices.map((service) => (
                <div
                    key={service.id}
                    className="p-5 shadow rounded-[12px] dark:shadow-slate-900"
                >
                    <Link
                        href={service.link}
                        className="flex flex-row items-center gap-2 text-2xl font-bold tracking-tight"
                    >
                        <span className={`text-${service.color}-500 dark:text-${service.color}-700`}>
                            {service.icon}
                        </span>
                        <div className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100">
                            {service.name}
                        </div>
                    </Link>
                    <p className="ml-8 mt-2 text-muted-foreground">
                        {service.description}
                    </p>
                </div>
            ))}
        </div>
        </section>
        </>
    )
}

export default Services