"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { AuthUser } from "@supabase/supabase-js";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getRooms } from "../severActions/server-queries";

type SupabaseUserContextType = {
  user: AuthUser | null;
  error: string | null;
  rooms: Rooms[] | [];
};

const SupabaseUserContext = createContext<SupabaseUserContextType>({
  user: null,
  error: null,
  rooms: [],
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
  const [rooms, setRooms] = useState<Rooms[] | []>([]);
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
        const { data, error } = await getRooms(user.id);
        if (error) {
          setError(error);
          return;
        }
        setRooms(data);
      }
      if (error) {
        setError(error.message);
        return;
      }
    };
    getUser();
  }, [supabase]);

  return (
    <SupabaseUserContext.Provider value={{ user, error, rooms }}>
      {children}
    </SupabaseUserContext.Provider>
  );
}
