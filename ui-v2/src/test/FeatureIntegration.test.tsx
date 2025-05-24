import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n/i18n';
import MainApp from '../components/MainApp';

// Mock the hooks
jest.mock('../hooks/useChatHistory', () => ({
  __esModule: true,
  default: () => ({
    chats: [
      {
        id: '1',
        title: 'Test Chat',
        messages: [
          {
            id: '1-1',
            content: 'Hello, how can I help you?',
            role: 'assistant',
            timestamp: new Date()
          }
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        title: 'Previous Chat',
        messages: [
          {
            id: '2-1',
            content: 'This is from a previous chat',
            role: 'assistant',
            timestamp: new Date()
          }
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    currentChat: {
      id: '1',
      title: 'Test Chat',
      messages: [
        {
          id: '1-1',
          content: 'Hello, how can I help you?',
          role: 'assistant',
          timestamp: new Date()
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    addMessage: jest.fn(),
    addPreviousChatToCurrent: jest.fn().mockReturnValue('Successfully added chat'),
    switchChat: jest.fn()
  })
}));

jest.mock('../hooks/useWorkDirectories', () => ({
  __esModule: true,
  default: () => ({
    directories: [
      {
        id: '1',
        path: '/test/path',
        name: 'Test Directory',
        addedAt: new Date()
      }
    ],
    addDirectory: jest.fn().mockReturnValue(true),
    removeDirectory: jest.fn()
  })
}));

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

describe('Feature Integration Tests', () => {
  beforeEach(() => {
    render(
      <I18nextProvider i18n={i18n}>
        <MainApp />
      </I18nextProvider>
    );
  });

  test('Hebrew RTL Support', async () => {
    // Find language switcher
    const languageSwitcher = screen.getByRole('combobox');
    expect(languageSwitcher).toBeInTheDocument();
    
    // Change to Hebrew
    fireEvent.change(languageSwitcher, { target: { value: 'he' } });
    
    // Verify RTL direction is applied
    await waitFor(() => {
      expect(document.documentElement.dir).toBe('rtl');
      expect(document.documentElement.lang).toBe('he');
    });
    
    // Verify Hebrew text is displayed
    expect(screen.getByText('הגדרות')).toBeInTheDocument();
    
    // Change back to English
    fireEvent.change(languageSwitcher, { target: { value: 'en' } });
    
    // Verify LTR direction is restored
    await waitFor(() => {
      expect(document.documentElement.dir).toBe('ltr');
      expect(document.documentElement.lang).toBe('en');
    });
  });

  test('Speech Features', () => {
    // Find microphone button (STT)
    const microphoneButton = screen.getByTitle('Start Listening');
    expect(microphoneButton).toBeInTheDocument();
    
    // Find speaker button (TTS)
    const speakerButton = screen.getByTitle('Read Text Aloud');
    expect(speakerButton).toBeInTheDocument();
    
    // Test microphone button click
    fireEvent.click(microphoneButton);
    const useSTT = require('../hooks/useSTT').default;
    expect(useSTT().startListening).toHaveBeenCalled();
    
    // Test speaker button click
    fireEvent.click(speakerButton);
    const useTTS = require('../hooks/useTTS').default;
    expect(useTTS().speak).toHaveBeenCalled();
  });

  test('Previous Chat Integration', () => {
    // Find add previous chat button
    const addChatButton = screen.getByText('Add Previous Chat');
    expect(addChatButton).toBeInTheDocument();
    
    // Open dropdown
    fireEvent.click(addChatButton);
    
    // Find and select previous chat
    const previousChatOption = screen.getByText('Previous Chat');
    expect(previousChatOption).toBeInTheDocument();
    
    // Click on previous chat option
    fireEvent.click(previousChatOption);
    
    // Verify chat was added
    const useChatHistory = require('../hooks/useChatHistory').default;
    expect(useChatHistory().addPreviousChatToCurrent).toHaveBeenCalled();
  });

  test('Work Directory Management', () => {
    // Find work directories section
    const workDirectoriesHeading = screen.getByText('Work Directories');
    expect(workDirectoriesHeading).toBeInTheDocument();
    
    // Find add directory button
    const addDirectoryButton = screen.getByText('Add Directory');
    expect(addDirectoryButton).toBeInTheDocument();
    
    // Find existing directory
    const testDirectory = screen.getByText('Test Directory');
    expect(testDirectory).toBeInTheDocument();
    
    // Open add directory form
    fireEvent.click(addDirectoryButton);
    
    // Find and fill path input
    const pathInput = screen.getByPlaceholderText('/path/to/directory');
    fireEvent.change(pathInput, { target: { value: '/new/test/path' } });
    
    // Find and fill name input
    const nameInput = screen.getByPlaceholderText('My Project');
    fireEvent.change(nameInput, { target: { value: 'New Test Project' } });
    
    // Submit form
    const submitButton = screen.getAllByText('Add Directory')[1];
    fireEvent.click(submitButton);
    
    // Verify directory was added
    const useWorkDirectories = require('../hooks/useWorkDirectories').default;
    expect(useWorkDirectories().addDirectory).toHaveBeenCalledWith('/new/test/path', 'New Test Project');
  });
});
