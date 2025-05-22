import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * TestPage component for testing all implemented features
 * This component provides a way to test and verify all the new features
 */
const TestPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  
  const testFeatures = [
    {
      name: 'Hebrew RTL Support',
      description: 'Tests the RTL support for Hebrew language',
      instructions: [
        'Use the language switcher to change to Hebrew',
        'Verify text alignment changes to right-to-left',
        'Verify UI elements are properly mirrored',
        'Switch back to English and verify LTR layout'
      ]
    },
    {
      name: 'Microphone TTS Feature',
      description: 'Tests the Text-to-Speech functionality',
      instructions: [
        'Type some text in the chat input',
        'Click the microphone button to hear the text spoken',
        'Click again to stop the speech',
        'Try with different languages to test language detection'
      ]
    },
    {
      name: 'Previous Chat Integration',
      description: 'Tests adding a previous chat to the current chat',
      instructions: [
        'Create multiple chat sessions with different content',
        'Use the "Add Previous Chat" dropdown to select a previous chat',
        'Verify the previous chat messages are added to the current chat',
        'Check that the merge indicator is displayed correctly'
      ]
    },
    {
      name: 'Work Directory Management',
      description: 'Tests adding and removing work directories without creating a new chat',
      instructions: [
        'Add a new work directory using the directory manager',
        'Verify the directory appears in the list',
        'Remove a directory and verify it is removed from the list',
        'Verify that chat session continues uninterrupted during these operations'
      ]
    }
  ];
  
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Feature Testing Page</h1>
      
      <div className="mb-8">
        <p className="text-muted-foreground mb-4">
          This page provides instructions for testing all the newly implemented features.
          Follow the steps for each feature to verify functionality.
        </p>
      </div>
      
      <div className="space-y-6">
        {testFeatures.map((feature, index) => (
          <div key={index} className="border border-border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">{feature.name}</h2>
            <p className="text-muted-foreground mb-4">{feature.description}</p>
            
            <h3 className="font-medium mb-2">Test Instructions:</h3>
            <ol className="list-decimal list-inside space-y-1 pl-4">
              {feature.instructions.map((instruction, i) => (
                <li key={i} className="text-sm">{instruction}</li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestPage;
