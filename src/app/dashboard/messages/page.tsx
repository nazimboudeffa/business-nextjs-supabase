import Header from "@/components/Header"
import { Messages } from "./Messages"
import SideNav from "@/components/SideNav"
import SideNavSticky from "@/components/SideNavSticky"

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function AllMessages() {

    const supabase = createServerComponentClient({ cookies });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    return (
        <>
            <Header session = { session } />
            <div className="grid h-screen min-h-screen w-full overflow-hidden md:grid-cols-[auto_1fr]">
                <SideNav />
                <div className="flex flex-col">
                    <SideNavSticky />
                    {!session ? (<div>You must be loggedin</div>) : (<Messages />)}                  
                </div>
            </div>
        </>
    )
}