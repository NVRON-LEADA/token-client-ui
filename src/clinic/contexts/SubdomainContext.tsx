import React, { createContext, useContext, useMemo } from 'react';
import type { ReactNode } from 'react'; // ✅ Type-only import


interface SubdomainContextType {
  subdomain: string | null;
}

const SubdomainContext = createContext<SubdomainContextType | undefined>(undefined);

export const useSubdomain = (): SubdomainContextType => {
  const context = useContext(SubdomainContext);
  if (!context) {
    throw new Error('useSubdomain must be used within a SubdomainProvider');
  }
  return context;
};

interface SubdomainProviderProps {
  children: ReactNode;
}

export const SubdomainProvider: React.FC<SubdomainProviderProps> = ({ children }) => {
  const hostname = window.location.hostname;
  const parts = hostname.split('.');
  const subdomain = parts.length >= 3 ? parts[0] : null;

  const value = useMemo(() => ({ subdomain }), [subdomain]);

  return (
    <SubdomainContext.Provider value={value}>
      {children}
    </SubdomainContext.Provider>
  );
};
