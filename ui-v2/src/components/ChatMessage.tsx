import React from 'react';
import { useTranslation } from 'react-i18next';
import SpeakerButton from './SpeakerButton';

interface ChatMessageProps {
  content: string;
  role: 'user' | 'assistant' | 'system';
  timestamp: Date;
}

/**
 * ChatMessage component with integrated TTS functionality
 * Displays a chat message with a speaker button for text-to-speech
 */
const ChatMessage: React.FC<ChatMessageProps> = ({ 
  content, 
  role, 
  timestamp 
}) => {
  const isUser = role === 'user';
  const isSystem = role === 'system';
  
  // System messages have a special style
  if (isSystem) {
    return (
      <div className="my-4 text-center">
        <div className="inline-block px-3 py-1 bg-muted-foreground/20 rounded-md text-sm">
          {content}
        </div>
      </div>
    );
  }
  
  return (
    <div 
      className={`mb-4 p-3 rounded-lg max-w-3/4 flex ${
        isUser 
          ? 'ml-auto bg-primary text-primary-foreground' 
          : 'bg-muted'
      }`}
    >
      <div className="flex-1">
        {content}
        <div className="text-xs mt-1 opacity-70">
          {new Date(timestamp).toLocaleTimeString()}
        </div>
      </div>
      
      {/* Only show speaker button for assistant messages */}
      {!isUser && (
        <div className="ml-2 self-start">
          <SpeakerButton text={content} className="text-sm" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
