import Header from "@/components/Header"
import { Ideas } from "./Ideas"
import { fontHeading } from "@/lib/fonts"

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function ShareIdeas() {

    const supabase = createServerComponentClient({ cookies });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    const { data: { user } } = await supabase.auth.getUser()
    const {
        data: ideas,
    } = await supabase.from('ideas').select().match({ user_id: user?.id });

    return (
        <>
            <Header session = { session } />
            <header className="mt-10 flex flex-col items-center gap-10 text-center">
            <div className="flex max-w-[980px] flex-col gap-2">
                <h1
                    className={`text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl ${fontHeading.variable}`}
                >
                    Share your announcements
                </h1>
                <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
                    Start by typing some text that describe your business.
                </p>
            </div>
            </header>
            <section className="flex flex-col gap-10 mt-10 items-center">
                {!session ? (<div>You must be loggedin</div>) : (<Ideas serverIdeas={ideas ?? []} />)}
            </section>
        </>
    )
}