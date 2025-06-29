'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, redirectTo?: string) => Promise<void>;
  signup: (email: string, password: string, redirectTo?: string) => Promise<void>;
  loginWithGoogle: (redirectTo?: string) => Promise<void>;
  logout: () => Promise<void>;
  redirectAfterLogin: string | null;
  clearRedirect: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [redirectAfterLogin, setRedirectAfterLogin] = useState<string | null>(
    () => typeof window !== 'undefined' ? localStorage.getItem('redirectAfterLogin') : null
  );
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);

      if (user && redirectAfterLogin) {
        router.push(redirectAfterLogin);
        localStorage.removeItem('redirectAfterLogin');
        setRedirectAfterLogin(null);
      }
    });

    return unsubscribe;
  }, [redirectAfterLogin, router]);

  const login = async (email: string, password: string, redirectTo?: string) => {
    if (redirectTo) {
      localStorage.setItem('redirectAfterLogin', redirectTo);
      setRedirectAfterLogin(redirectTo);
    }
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signup = async (email: string, password: string, redirectTo?: string) => {
    if (redirectTo) {
      localStorage.setItem('redirectAfterLogin', redirectTo);
      setRedirectAfterLogin(redirectTo);
    }
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = async (redirectTo?: string) => {
    if (redirectTo) {
      localStorage.setItem('redirectAfterLogin', redirectTo);
      setRedirectAfterLogin(redirectTo);
    }
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const logout = async () => {
    await signOut(auth);
    setRedirectAfterLogin(null);
    localStorage.removeItem('redirectAfterLogin');
  };

  const clearRedirect = () => {
    setRedirectAfterLogin(null);
    localStorage.removeItem('redirectAfterLogin');
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    signup,
    loginWithGoogle,
    logout,
    redirectAfterLogin,
    clearRedirect,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
