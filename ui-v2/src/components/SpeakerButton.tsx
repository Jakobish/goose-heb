import React from 'react';
import { useTranslation } from 'react-i18next';
import useTTS from '../hooks/useTTS';

interface SpeakerButtonProps {
  text: string;
  className?: string;
}

/**
 * SpeakerButton component for Text-to-Speech functionality
 * Provides a button that reads text aloud when clicked
 */
const SpeakerButton: React.FC<SpeakerButtonProps> = ({ 
  text, 
  className = '' 
}) => {
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
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      )}
    </button>
  );
};

export default SpeakerButton;
