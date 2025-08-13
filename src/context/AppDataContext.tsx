'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { defaultSettings, AppSettings } from '@/lib/data';

interface AppDataContextType {
  settings: AppSettings;
  setSettings: (value: AppSettings | ((val: AppSettings) => AppSettings)) => void;
  resetSettings: () => void;
  isInitialized: boolean;
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export const AppDataProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings, isInitialized] = useLocalStorage<AppSettings>(
    'seva-kendra-settings',
    defaultSettings
  );

  const resetSettings = () => {
    setSettings(defaultSettings);
    // Optional: force reload to ensure all components reset correctly
    if (typeof window !== 'undefined') {
       window.location.reload();
    }
  };

  const value = {
    settings,
    setSettings,
    resetSettings,
    isInitialized,
  };

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
};

export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (context === undefined) {
    throw new Error('useAppData must be used within an AppDataProvider');
  }
  return context;
};
