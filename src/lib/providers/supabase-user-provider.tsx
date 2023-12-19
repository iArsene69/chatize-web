"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { AuthUser } from "@supabase/supabase-js";
import React, { createContext, useContext, useEffect, useState } from "react";

type SupabaseUserContextType = {
  user: AuthUser | null;
  error: string | null;
};

const SupabaseUserContext = createContext<SupabaseUserContextType>({
  user: null,
  error: null,
});

export const useSupabaseUser = () => {
  return useContext(SupabaseUserContext);
};

type SupabaseUserProviderProps = {
  children: React.ReactNode;
};

export function SupabaseUserProvider({ children }: SupabaseUserProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getUser = async () => {
      setError(null);
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      }
      if (error) {
        setError(error.message);
      }
    };
    getUser();
  }, [supabase]);

  return (
    <SupabaseUserContext.Provider value={{ user, error }}>
      {children}
    </SupabaseUserContext.Provider>
  );
}
