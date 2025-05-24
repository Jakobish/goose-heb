import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MicrophoneButton from './MicrophoneButton';
import SpeakerButton from './SpeakerButton';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  placeholder?: string;
}

/**
 * ChatInput component with integrated microphone STT and speaker TTS buttons
 * Provides a text input field and send button for chat messages
 */
const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  placeholder 
}) => {
  const { t } = useTranslation();
  const [message, setMessage] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };
  
  const handleSpeechResult = (transcript: string) => {
    setMessage((prev) => prev + (prev ? ' ' : '') + transcript);
  };
  
  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-2 p-2 border-t border-border">
      <div className="relative flex-1">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={placeholder || t('chat.placeholder')}
          className="w-full p-3 pr-20 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
          rows={1}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
        <div className="absolute right-2 bottom-2 flex space-x-1">
          <MicrophoneButton onTranscriptReady={handleSpeechResult} className="text-muted-foreground" />
          <SpeakerButton text={message} className="text-muted-foreground" />
        </div>
      </div>
      <button 
        type="submit" 
        className="p-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
        disabled={!message.trim()}
      >
        {t('chat.send')}
      </button>
    </form>
  );
};

export default ChatInput;
