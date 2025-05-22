import React from 'react';
import { useTranslation } from 'react-i18next';
import useChatHistory from '../hooks/useChatHistory';
import ChatInput from './ChatInput';
import ChatSelector from './ChatSelector';

/**
 * ChatInterface component that integrates chat history, input, and previous chat selection
 */
const ChatInterface: React.FC = () => {
  const { t } = useTranslation();
  const { 
    chats, 
    currentChat, 
    addMessage, 
    addPreviousChatToCurrent 
  } = useChatHistory();
  
  const handleSendMessage = (message: string) => {
    // Add user message
    addMessage(message, 'user');
    
    // Simulate assistant response (in a real app, this would call an API)
    setTimeout(() => {
      addMessage('This is a simulated response from the assistant.', 'assistant');
    }, 1000);
  };
  
  if (!currentChat) {
    return <div className="p-4">Loading chat...</div>;
  }
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h1 className="text-lg font-medium">{currentChat.title}</h1>
        <ChatSelector 
          chats={chats} 
          currentChatId={currentChat.id} 
          onSelectChat={addPreviousChatToCurrent} 
        />
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        {currentChat.messages.map(message => (
          <div 
            key={message.id} 
            className={`mb-4 p-3 rounded-lg max-w-3/4 ${
              message.role === 'user' 
                ? 'ml-auto bg-primary text-primary-foreground' 
                : 'bg-muted'
            }`}
          >
            {message.content}
          </div>
        ))}
      </div>
      
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatInterface;
