'use client';

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

interface ChatParamsContextType {
  appName: string | null;
  setAppName: (name: string | null) => void;
}

const ChatParamsContext = createContext<ChatParamsContextType | undefined>(undefined);

export function ChatParamsProvider({ children }: { children: React.ReactNode }) {
  const [appName, setAppNameState] = useState<string | null>(null);

  const setAppName = useCallback((name: string | null) => {
    setAppNameState(name);
  }, []);

  const value = useMemo(() => ({ appName, setAppName }), [appName, setAppName]);

  return (
    <ChatParamsContext.Provider value={value}>
      {children}
    </ChatParamsContext.Provider>
  );
}

export function useChatParams(): ChatParamsContextType {
  const ctx = useContext(ChatParamsContext);
  if (!ctx) {
    throw new Error('useChatParams must be used within a ChatParamsProvider');
  }
  return ctx;
}


