import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Chat } from '../hooks/useChatHistory';

interface ChatSelectorProps {
  chats: Chat[];
  currentChatId: string;
  onSelectChat: (chatId: string) => void;
}

/**
 * ChatSelector component for selecting previous chats to add to current chat
 */
const ChatSelector: React.FC<ChatSelectorProps> = ({ 
  chats, 
  currentChatId, 
  onSelectChat 
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  
  // Filter out the current chat from the selection list
  const selectableChats = chats.filter(chat => chat.id !== currentChatId);
  
  if (selectableChats.length === 0) {
    return null; // Don't render if there are no other chats to select
  }
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm rounded-md border border-border hover:bg-accent transition-colors"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {t('chat.addPreviousChat')}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className={`transition-transform ${isOpen ? 'rotate-180' : ''} rtl-mirror`}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute z-10 mt-1 w-56 rounded-md shadow-lg bg-popover border border-border">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {selectableChats.map(chat => (
              <button
                key={chat.id}
                onClick={() => {
                  onSelectChat(chat.id);
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm hover:bg-accent transition-colors"
                role="menuitem"
              >
                <div className="font-medium truncate">{chat.title}</div>
                <div className="text-xs text-muted-foreground truncate">
                  {new Date(chat.updatedAt).toLocaleString()}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatSelector;
