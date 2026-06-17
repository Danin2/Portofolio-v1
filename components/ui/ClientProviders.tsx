'use client';

import { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import SmoothScrollProvider from './SmoothScrollProvider';
import { LanguageProvider } from '@/context/LanguageContext';

const CustomCursor = dynamic(() => import('./CustomCursor'), { ssr: false });
const PageLoader = dynamic(() => import('./PageLoader'), { ssr: false });

interface ClientProvidersProps {
  children: ReactNode;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <LanguageProvider>
      <SmoothScrollProvider>
        <PageLoader />
        <CustomCursor />
        {children}
      </SmoothScrollProvider>
    </LanguageProvider>
  );
}
