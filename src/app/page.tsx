import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import Welcome from '@/components/Welcome'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Problem from '@/components/Problem';
import Features from '@/components/Features';

async function Home () {

  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return (
      <>
      <Header session = { session } />
      <main className="min-h-screen flex flex-col justify-between">
        <Hero />
        <Problem />
        <Features />
      </main>
      <Footer />
      </>
    )
  }

  return (
    <>
    <Header session = { session } />
    <main className="min-h-screen flex flex-col">
      <Welcome />
    </main>
    <Footer />
    </>
  )
}

export default Home