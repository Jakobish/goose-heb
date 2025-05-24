import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useSTT from '../hooks/useSTT';

interface MicrophoneButtonProps {
  onTranscriptReady: (text: string) => void;
  className?: string;
}

/**
 * MicrophoneButton component for Speech-to-Text functionality
 * Provides a button that listens to speech and converts it to text
 */
const MicrophoneButton: React.FC<MicrophoneButtonProps> = ({ 
  onTranscriptReady, 
  className = '' 
}) => {
  const { t } = useTranslation();
  const { startListening, stopListening, isListening, transcript, resetTranscript } = useSTT();
  
  // When transcript is ready, pass it to the parent component
  useEffect(() => {
    if (transcript && !isListening) {
      onTranscriptReady(transcript);
      resetTranscript();
    }
  }, [transcript, isListening, onTranscriptReady, resetTranscript]);
  
  const handleClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };
  
  return (
    <button
      onClick={handleClick}
      className={`flex items-center justify-center p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${isListening ? 'text-red-500' : ''} ${className}`}
      aria-label={isListening ? t('stt.stop') : t('stt.start')}
      title={isListening ? t('stt.stop') : t('stt.start')}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rtl-mirror">
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" x2="12" y1="19" y2="22" />
      </svg>
    </button>
  );
};

export default MicrophoneButton;
