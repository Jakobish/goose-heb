import { useState, useEffect } from 'react';

export interface Chat {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

/**
 * Hook for managing chat history and merging chats
 */
export const useChatHistory = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  
  // Load chats from storage on initial render
  useEffect(() => {
    // In a real implementation, this would load from localStorage, IndexedDB, or an API
    // For this example, we'll use mock data
    const mockChats: Chat[] = [
      {
        id: '1',
        title: 'First Chat',
        messages: [
          {
            id: '1-1',
            content: 'Hello, how can I help you?',
            role: 'assistant',
            timestamp: new Date(Date.now() - 86400000) // 1 day ago
          },
          {
            id: '1-2',
            content: 'I need help with my project',
            role: 'user',
            timestamp: new Date(Date.now() - 86300000)
          }
        ],
        createdAt: new Date(Date.now() - 86400000),
        updatedAt: new Date(Date.now() - 86300000)
      },
      {
        id: '2',
        title: 'Second Chat',
        messages: [
          {
            id: '2-1',
            content: 'What can I do for you today?',
            role: 'assistant',
            timestamp: new Date(Date.now() - 43200000) // 12 hours ago
          },
          {
            id: '2-2',
            content: 'I want to learn about React',
            role: 'user',
            timestamp: new Date(Date.now() - 43100000)
          }
        ],
        createdAt: new Date(Date.now() - 43200000),
        updatedAt: new Date(Date.now() - 43100000)
      }
    ];
    
    setChats(mockChats);
    // Initialize with the most recent chat
    setCurrentChat(mockChats[0]);
  }, []);
  
  // Create a new chat
  const createChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setChats(prevChats => [newChat, ...prevChats]);
    setCurrentChat(newChat);
    
    return newChat;
  };
  
  // Add a message to the current chat
  const addMessage = (content: string, role: 'user' | 'assistant') => {
    if (!currentChat) return;
    
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      role,
      timestamp: new Date()
    };
    
    const updatedChat = {
      ...currentChat,
      messages: [...currentChat.messages, newMessage],
      updatedAt: new Date()
    };
    
    setCurrentChat(updatedChat);
    setChats(prevChats => 
      prevChats.map(chat => 
        chat.id === updatedChat.id ? updatedChat : chat
      )
    );
  };
  
  // Switch to a different chat
  const switchChat = (chatId: string) => {
    const chat = chats.find(c => c.id === chatId);
    if (chat) {
      setCurrentChat(chat);
    }
  };
  
  // Add a previous chat to the current chat
  const addPreviousChatToCurrent = (previousChatId: string) => {
    if (!currentChat) return;
    
    const previousChat = chats.find(c => c.id === previousChatId);
    if (!previousChat) return;
    
    // Create a merged chat with messages from both chats
    const mergedChat = {
      ...currentChat,
      messages: [
        ...currentChat.messages,
        // Add a system message indicating the merge
        {
          id: `merge-${Date.now()}`,
          content: `--- Previous chat "${previousChat.title}" added ---`,
          role: 'assistant' as const,
          timestamp: new Date()
        },
        ...previousChat.messages
      ],
      updatedAt: new Date()
    };
    
    setCurrentChat(mergedChat);
    setChats(prevChats => 
      prevChats.map(chat => 
        chat.id === mergedChat.id ? mergedChat : chat
      )
    );
  };
  
  return {
    chats,
    currentChat,
    createChat,
    addMessage,
    switchChat,
    addPreviousChatToCurrent
  };
};

export default useChatHistory;
