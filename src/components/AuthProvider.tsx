'use client';

import { createContext, useEffect, ReactNode } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

type authContextType = {
    accessToken: string | null;
};

const authContextDefaultValues: authContextType = {
    accessToken: null,
};

export const AuthContext = createContext<authContextType>(authContextDefaultValues);

type Props = {
    accessToken: string | null;
    children: ReactNode;
};

const AuthProvider = ({ accessToken, children } : Props) => {
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription: authListener },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.access_token !== accessToken) {
        router.refresh();
      }
    });

    return () => {
      authListener?.unsubscribe();
    };
  }, [accessToken, supabase, router]);

  return children;
};

export default AuthProvider;