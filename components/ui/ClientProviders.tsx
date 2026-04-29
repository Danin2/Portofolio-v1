'use client';

import { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import SmoothScrollProvider from './SmoothScrollProvider';

// Dynamically import client-only components to avoid SSR issues
const CustomCursor = dynamic(() => import('./CustomCursor'), { ssr: false });
const PageLoader = dynamic(() => import('./PageLoader'), { ssr: false });

interface ClientProvidersProps {
  children: ReactNode;
}

/**
 * ClientProviders — bundles all client-side global UI:
 *   1. SmoothScrollProvider (Lenis)
 *   2. PageLoader (intro animation)
 *   3. CustomCursor (premium cursor)
 *
 * Used in the root layout so all pages benefit automatically.
 */
export default function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <SmoothScrollProvider>
      <PageLoader />
      <CustomCursor />
      {children}
    </SmoothScrollProvider>
  );
}
