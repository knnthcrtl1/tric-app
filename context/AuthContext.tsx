import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../configs/supabaseConfig';
import { Session } from '@supabase/supabase-js';

type AuthContextType = {
  session: Session | null;
  user: any;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      checkUserRole(session?.user?.id);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      checkUserRole(session?.user?.id);
    });
  }, []);

  const checkUserRole = async (userId: string | undefined) => {
    if (!userId) return;
    
    const { data, error } = await supabase
      .from('users')
      .select('role')
      .eq('id', userId)
      .single();

    if (data && !error) {
      setIsAdmin(data.role === 'admin');
    }
  };

  const signIn = async (email: string, password: string) => {
    console.log('email =>', email);
    const response = await supabase.auth.signInWithPassword({ email, password });

    console.log('error =>', response);
    // if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return (
    <AuthContext.Provider value={{ session, user, signIn, signOut, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}