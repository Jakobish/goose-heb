import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n/i18n';
import ChatSelector from '../components/ChatSelector';
import { Chat } from '../hooks/useChatHistory';

describe('ChatSelector Component Tests', () => {
  const mockChats: Chat[] = [
    {
      id: '1',
      title: 'Current Chat',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      title: 'Previous Chat 1',
      messages: [
        {
          id: '2-1',
          content: 'Hello from previous chat 1',
          role: 'assistant',
          timestamp: new Date()
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '3',
      title: 'Previous Chat 2',
      messages: [
        {
          id: '3-1',
          content: 'Hello from previous chat 2',
          role: 'assistant',
          timestamp: new Date()
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  test('ChatSelector renders correctly with available chats', () => {
    const handleSelectChat = jest.fn().mockReturnValue('Successfully added chat');
    
    render(
      <I18nextProvider i18n={i18n}>
        <ChatSelector 
          chats={mockChats} 
          currentChatId="1" 
          onSelectChat={handleSelectChat} 
        />
      </I18nextProvider>
    );
    
    // Check if the button is rendered
    const button = screen.getByText('Add Previous Chat');
    expect(button).toBeInTheDocument();
    
    // Open dropdown
    fireEvent.click(button);
    
    // Check if previous chats are listed
    expect(screen.getByText('Previous Chat 1')).toBeInTheDocument();
    expect(screen.getByText('Previous Chat 2')).toBeInTheDocument();
    
    // Select a chat
    fireEvent.click(screen.getByText('Previous Chat 1'));
    
    // Check if the callback was called with the correct ID
    expect(handleSelectChat).toHaveBeenCalledWith('2');
    
    // Check if notification appears
    expect(screen.getByText('Successfully added chat')).toBeInTheDocument();
  });

  test('ChatSelector does not render when no other chats are available', () => {
    const handleSelectChat = jest.fn();
    
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <ChatSelector 
          chats={[mockChats[0]]} 
          currentChatId="1" 
          onSelectChat={handleSelectChat} 
        />
      </I18nextProvider>
    );
    
    // Component should not render anything
    expect(container.firstChild).toBeNull();
  });

  test('ChatSelector shows message count for each chat', () => {
    const handleSelectChat = jest.fn();
    
    render(
      <I18nextProvider i18n={i18n}>
        <ChatSelector 
          chats={mockChats} 
          currentChatId="1" 
          onSelectChat={handleSelectChat} 
        />
      </I18nextProvider>
    );
    
    // Open dropdown
    fireEvent.click(screen.getByText('Add Previous Chat'));
    
    // Check if message counts are displayed
    expect(screen.getByText('1 messages')).toBeInTheDocument();
  });
});
