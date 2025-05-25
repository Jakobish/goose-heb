import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * TTSService - A service for Text-to-Speech functionality
 * Uses the Web Speech API for cross-browser compatibility
 */
export const useTTS = () => {
  const { t, i18n } = useTranslation();
  const [speaking, setSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

  // Initialize voices when component mounts
  useEffect(() => {
    const synth = window.speechSynthesis;
    
    // Function to load and set available voices
    const loadVoices = () => {
      const availableVoices = synth.getVoices();
      setVoices(availableVoices);
      
      // Try to find a voice that matches the current language
      const langCode = i18n.language.substring(0, 2).toLowerCase();
      const matchingVoice = availableVoices.find(
        voice => voice.lang.toLowerCase().startsWith(langCode)
      );
      
      if (matchingVoice) {
        setSelectedVoice(matchingVoice);
      } else if (availableVoices.length > 0) {
        setSelectedVoice(availableVoices[0]);
      }
    };

    // Load voices immediately if available
    loadVoices();
    
    // Chrome loads voices asynchronously, so we need this event listener
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = loadVoices;
    }
    
    // Cleanup function
    return () => {
      synth.cancel();
      if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = null;
      }
    };
  }, [i18n.language]);

  // Function to speak text
  const speak = (text: string) => {
    const synth = window.speechSynthesis;
    
    // Cancel any ongoing speech
    synth.cancel();
    
    if (!text) return;
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    
    // Set language based on current i18n language
    utterance.lang = i18n.language;
    
    // Events to track speaking state
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    
    synth.speak(utterance);
    setSpeaking(true);
  };

  // Function to stop speaking
  const stop = () => {
    const synth = window.speechSynthesis;
    synth.cancel();
    setSpeaking(false);
  };

  // Function to change the selected voice
  const changeVoice = (voice: SpeechSynthesisVoice) => {
    setSelectedVoice(voice);
  };

  return {
    speak,
    stop,
    speaking,
    voices,
    selectedVoice,
    changeVoice
  };
};

export default useTTS;
