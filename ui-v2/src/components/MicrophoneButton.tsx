import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useTTS from '../hooks/useTTS';

interface MicrophoneButtonProps {
  text: string;
  className?: string;
}

/**
 * MicrophoneButton component for Text-to-Speech functionality
 * Provides a button that reads text aloud when clicked
 */
const MicrophoneButton: React.FC<MicrophoneButtonProps> = ({ text, className = '' }) => {
  const { t } = useTranslation();
  const { speak, stop, speaking } = useTTS();
  
  const handleClick = () => {
    if (speaking) {
      stop();
    } else {
      speak(text);
    }
  };
  
  return (
    <button
      onClick={handleClick}
      className={`flex items-center justify-center p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${className}`}
      aria-label={speaking ? t('tts.stop') : t('tts.start')}
      title={speaking ? t('tts.stop') : t('tts.start')}
    >
      {speaking ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rtl-mirror">
          <rect x="6" y="4" width="4" height="16" />
          <rect x="14" y="4" width="4" height="16" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rtl-mirror">
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" x2="12" y1="19" y2="22" />
        </svg>
      )}
    </button>
  );
};

export default MicrophoneButton;
