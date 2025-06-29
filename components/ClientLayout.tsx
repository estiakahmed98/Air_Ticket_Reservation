'use client';

import React from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from '@/components/ui/sonner';
import Header from './Header';
import Footer from './Footer';

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <Header />
      <main>{children}</main>
      <Footer />
      <Toaster />
    </AuthProvider>
  );
};

export default ClientLayout;
