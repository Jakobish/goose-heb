import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n/i18n';
import ChatInput from '../components/ChatInput';
import MicrophoneButton from '../components/MicrophoneButton';
import SpeakerButton from '../components/SpeakerButton';

// Mock the hooks
jest.mock('../hooks/useSTT', () => ({
  __esModule: true,
  default: () => ({
    startListening: jest.fn(),
    stopListening: jest.fn(),
    isListening: false,
    transcript: '',
    resetTranscript: jest.fn()
  })
}));

jest.mock('../hooks/useTTS', () => ({
  __esModule: true,
  default: () => ({
    speak: jest.fn(),
    stop: jest.fn(),
    speaking: false,
    voices: [],
    selectedVoice: null,
    changeVoice: jest.fn()
  })
}));

describe('Speech Feature Tests', () => {
  test('MicrophoneButton for STT renders correctly', () => {
    const handleTranscript = jest.fn();
    
    render(
      <I18nextProvider i18n={i18n}>
        <MicrophoneButton onTranscriptReady={handleTranscript} />
      </I18nextProvider>
    );
    
    const micButton = screen.getByRole('button');
    expect(micButton).toBeInTheDocument();
    
    // Test click behavior
    fireEvent.click(micButton);
    const useSTT = require('../hooks/useSTT').default;
    expect(useSTT().startListening).toHaveBeenCalled();
  });
  
  test('SpeakerButton for TTS renders correctly', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <SpeakerButton text="Test text for TTS" />
      </I18nextProvider>
    );
    
    const speakerButton = screen.getByRole('button');
    expect(speakerButton).toBeInTheDocument();
    
    // Test click behavior
    fireEvent.click(speakerButton);
    const useTTS = require('../hooks/useTTS').default;
    expect(useTTS().speak).toHaveBeenCalledWith("Test text for TTS");
  });
  
  test('ChatInput integrates both STT and TTS correctly', () => {
    const handleSendMessage = jest.fn();
    
    render(
      <I18nextProvider i18n={i18n}>
        <ChatInput onSendMessage={handleSendMessage} />
      </I18nextProvider>
    );
    
    // Find the textarea
    const textarea = screen.getByPlaceholderText('Type your message here...');
    expect(textarea).toBeInTheDocument();
    
    // Find both microphone and speaker buttons
    const micButton = screen.getByTitle('Start Listening');
    const speakerButton = screen.getByTitle('Read Text Aloud');
    
    expect(micButton).toBeInTheDocument();
    expect(speakerButton).toBeInTheDocument();
    
    // Test typing in textarea
    fireEvent.change(textarea, { target: { value: 'Hello world' } });
    
    // Test send button
    const sendButton = screen.getByText('Send');
    fireEvent.click(sendButton);
    
    expect(handleSendMessage).toHaveBeenCalledWith('Hello world');
  });
  
  test('Speech features respect language changes', () => {
    // Change language to Hebrew
    i18n.changeLanguage('he');
    
    render(
      <I18nextProvider i18n={i18n}>
        <MicrophoneButton onTranscriptReady={jest.fn()} />
        <SpeakerButton text="Test text" />
      </I18nextProvider>
    );
    
    // Verify Hebrew tooltips
    const micButton = screen.getByTitle('התחל להקשיב');
    const speakerButton = screen.getByTitle('הקרא טקסט');
    
    expect(micButton).toBeInTheDocument();
    expect(speakerButton).toBeInTheDocument();
    
    // Reset language for other tests
    i18n.changeLanguage('en');
  });
});
