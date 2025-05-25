import React from 'react';
import { render, screen } from '@testing-library/react';
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
        messages: [],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    currentChat: {
      id: '1',
      title: 'Test Chat',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    addMessage: jest.fn(),
    addPreviousChatToCurrent: jest.fn()
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
    addDirectory: jest.fn(),
    removeDirectory: jest.fn()
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

describe('MainApp Integration', () => {
  beforeEach(() => {
    render(
      <I18nextProvider i18n={i18n}>
        <MainApp />
      </I18nextProvider>
    );
  });

  test('renders main application components', () => {
    // Check for app title
    expect(screen.getByText('Goose')).toBeInTheDocument();
    
    // Check for language switcher
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    
    // Check for directory management
    expect(screen.getByText('Work Directories')).toBeInTheDocument();
    
    // Check for chat interface
    expect(screen.getByText('Test Chat')).toBeInTheDocument();
  });

  test('validates RTL support', () => {
    // Initial direction should be LTR
    expect(document.documentElement.dir).toBe('ltr');
    
    // Change language to Hebrew
    const languageSwitcher = screen.getByRole('combobox');
    fireEvent.change(languageSwitcher, { target: { value: 'he' } });
    
    // Direction should change to RTL
    expect(document.documentElement.dir).toBe('rtl');
    expect(document.documentElement.lang).toBe('he');
    
    // UI text should be in Hebrew
    expect(screen.getByText('גוס')).toBeInTheDocument();
  });

  test('validates directory management', () => {
    // Directory should be displayed
    expect(screen.getByText('Test Directory')).toBeInTheDocument();
    expect(screen.getByText('/test/path')).toBeInTheDocument();
    
    // Add directory button should be present
    expect(screen.getByText('Add Directory')).toBeInTheDocument();
  });
});
