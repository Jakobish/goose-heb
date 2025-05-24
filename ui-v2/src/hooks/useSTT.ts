import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Hook for Speech-to-Text functionality
 * Uses the Web Speech API's SpeechRecognition interface
 */
export const useSTT = () => {
  const { i18n } = useTranslation();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  // Initialize speech recognition
  useEffect(() => {
    // Browser compatibility check
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      console.error('Speech recognition not supported in this browser');
      return;
    }
    
    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.continuous = false;
    recognitionInstance.interimResults = false;
    
    // Set language based on current i18n language
    recognitionInstance.lang = i18n.language;
    
    // Event handlers
    recognitionInstance.onstart = () => {
      setIsListening(true);
    };
    
    recognitionInstance.onresult = (event) => {
      const result = event.results[0][0].transcript;
      setTranscript(result);
      setIsListening(false);
    };
    
    recognitionInstance.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };
    
    recognitionInstance.onend = () => {
      setIsListening(false);
    };
    
    setRecognition(recognitionInstance);
    
    // Cleanup
    return () => {
      if (recognitionInstance) {
        recognitionInstance.abort();
      }
    };
  }, [i18n.language]);

  // Update language when i18n language changes
  useEffect(() => {
    if (recognition) {
      recognition.lang = i18n.language;
    }
  }, [i18n.language, recognition]);

  // Start listening
  const startListening = () => {
    if (!recognition) return;
    
    // Clear previous transcript
    setTranscript('');
    
    try {
      recognition.start();
    } catch (error) {
      console.error('Speech recognition error:', error);
    }
  };

  // Stop listening
  const stopListening = () => {
    if (!recognition) return;
    
    try {
      recognition.stop();
    } catch (error) {
      console.error('Speech recognition error:', error);
    }
  };

  return {
    startListening,
    stopListening,
    isListening,
    transcript,
    resetTranscript: () => setTranscript('')
  };
};

export default useSTT;
