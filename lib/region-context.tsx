"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type Region = 'AR' | 'US' | 'EU';

interface PricingData {
  region: Region;
  currency: string;
  currencySymbol: string;
  prices: {
    express: string;
    landing: string;
    professional: string;
    custom: string;
  };
  priceLabels: {
    express: string;
    landing: string;
    professional: string;
    custom: string;
  };
}

interface RegionContextType {
  region: Region;
  setRegion: (region: Region) => void;
  pricing: PricingData | null;
  isLoading: boolean;
}

const RegionContext = createContext<RegionContextType | undefined>(undefined);

const regionNames: Record<Region, string> = {
  AR: '🇦🇷 Argentina',
  US: '🌎 América',
  EU: '🇪🇺 Europa',
};

export { regionNames };

const defaultPricing: PricingData = {
  region: 'EU',
  currency: 'EUR',
  currencySymbol: '€',
  prices: {
    express: '199',
    landing: '550',
    professional: '1200',
    custom: '2500',
  },
  priceLabels: {
    express: '199€',
    landing: '550€',
    professional: '1.200€',
    custom: 'Desde 2.500€',
  },
};

const detectRegionFromBrowser = (): Region => {
  if (typeof window === 'undefined') return 'EU';
  
  const savedRegion = localStorage.getItem('userRegion') as Region | null;
  if (savedRegion && ['AR', 'US', 'EU'].includes(savedRegion)) {
    return savedRegion;
  }
  
  // Intentar detectar desde la zona horaria
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
  if (timezone.includes('Buenos_Aires') || timezone.includes('Argentina')) {
    return 'AR';
  } else if (timezone.includes('America/') && !timezone.includes('Argentina')) {
    return 'US';
  }
  
  return 'EU';
};

export function RegionProvider({ children }: { children: ReactNode }) {
  const [region, setRegionState] = useState<Region>('EU');
  const [pricing, setPricing] = useState<PricingData>(defaultPricing);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Detectar región inicial
  useEffect(() => {
    const detectedRegion = detectRegionFromBrowser();
    setRegionState(detectedRegion);
    setIsMounted(true);
  }, []);

  // Cargar precios cuando cambia la región
  useEffect(() => {
    const loadPricing = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/locales/pricing-${region.toLowerCase()}.json`);
        if (!res.ok) throw new Error('Failed to load pricing');
        const data = await res.json();
        setPricing(data);
      } catch (e) {
        console.error('Error loading pricing:', e);
        setPricing(defaultPricing);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (isMounted) {
      loadPricing();
    }
  }, [region, isMounted]);

  const handleSetRegion = (newRegion: Region) => {
    setRegionState(newRegion);
    if (typeof window !== 'undefined') {
      localStorage.setItem('userRegion', newRegion);
    }
  };

  return (
    <RegionContext.Provider value={{ region, setRegion: handleSetRegion, pricing, isLoading }}>
      {isMounted ? children : null}
    </RegionContext.Provider>
  );
}

export function useRegion() {
  const context = useContext(RegionContext);
  if (context === undefined) {
    throw new Error('useRegion must be used within a RegionProvider');
  }
  return context;
}
