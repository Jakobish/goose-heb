import React from 'react';
import { useTranslation } from 'react-i18next';
import useChatHistory from '../hooks/useChatHistory';
import useWorkDirectories from '../hooks/useWorkDirectories';
import ChatInterface from './ChatInterface';
import DirectoryManager from './DirectoryManager';
import LanguageSwitcher from './LanguageSwitcher';

/**
 * MainApp component that integrates all features:
 * - Hebrew RTL support (via i18n)
 * - Microphone TTS (in ChatInput)
 * - Previous chat merging (in ChatInterface)
 * - Work directory management (in DirectoryManager)
 */
const MainApp: React.FC = () => {
  const { t } = useTranslation();
  const { 
    directories,
    addDirectory,
    removeDirectory
  } = useWorkDirectories();
  
  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center justify-between p-4 border-b border-border">
        <h1 className="text-xl font-bold">{t('app.title')}</h1>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
        </div>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-hidden">
          <ChatInterface />
        </main>
        
        <aside className="w-80 border-l border-border overflow-y-auto p-4">
          <DirectoryManager 
            directories={directories}
            onAddDirectory={addDirectory}
            onRemoveDirectory={removeDirectory}
          />
        </aside>
      </div>
    </div>
  );
};

export default MainApp;
