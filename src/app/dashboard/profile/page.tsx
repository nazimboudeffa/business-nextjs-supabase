import Header from '@/components/Header'
import Profile from './Profile'
import Social from './Social'
import SideNav from '@/components/SideNav'
import SideNavSticky from '@/components/SideNavSticky'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

async function Dashboard () {

  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/');
  }


  return (
    <>
      <Header session = { session } />
      <div className="grid h-screen min-h-screen w-full overflow-hidden md:grid-cols-[auto_1fr]">
          <SideNav />
          <div className="flex flex-col">
              <SideNavSticky />
              {!session ? (<div>You must be loggedin</div>) 
              : 
              (<div>
                <h2 className="text-xl mt-5 mb-5 ml-5">Profile</h2>
                <Profile />
                <Social />
               </div>
              )}                  
          </div>
      </div>
    </>
  )
}

export default Dashboard