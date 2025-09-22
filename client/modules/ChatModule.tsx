'use client';

import React from 'react';
import { createModule, ModuleComponent } from './core/BaseModule';
import { ModuleId } from '@/data/ai-employees';

interface ChatModuleProps {
  employee?: { id: string; name: string; hexColor: string };
  onModuleChange?: (id: string) => void;
}

const ChatModuleBase: React.FC<ChatModuleProps> = () => {
  return (
    <div className="p-4">
      Chat module (démo)
    </div>
  );
};

const ChatModule: ModuleComponent = createModule(ChatModuleBase, ModuleId.CHAT);
export default ChatModule;


