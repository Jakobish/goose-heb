# Goose Repository Enhancement Documentation

## Overview

This document provides comprehensive documentation for the enhancements made to the Goose repository. The following features have been implemented:

1. Hebrew RTL (Right-to-Left) support
2. Speech features: Speech-to-Text (STT) with microphone and Text-to-Speech (TTS) with speaker
3. Option to add previous chats to the current chat
4. Option to add/remove work directories without creating a new chat session

## Dependencies Added

The following dependencies have been added to the project:

```json
{
  "dependencies": {
    "react-i18next": "^12.2.0",
    "i18next": "^22.4.10",
    "i18next-browser-languagedetector": "^7.0.1"
  }
}
```

## Feature Documentation

### 1. Hebrew RTL Support

#### Implementation Details

- Added internationalization framework using react-i18next
- Created translation files for English and Hebrew
- Implemented RTL support for Hebrew language
- Added language switcher component

#### Key Files

- `/src/i18n/i18n.ts`: Configuration for i18next
- `/src/i18n/locales/en.json`: English translations
- `/src/i18n/locales/he.json`: Hebrew translations
- `/src/i18n/RTLProvider.tsx`: Component to handle RTL direction
- `/src/styles/rtl.css`: CSS for RTL support
- `/src/components/LanguageSwitcher.tsx`: UI for switching languages

#### Usage

The language can be switched using the LanguageSwitcher component. When Hebrew is selected, the application automatically switches to RTL mode, affecting text direction and UI layout.

### 2. Speech Features

#### Implementation Details

- **Speech-to-Text (STT)**: Implemented using the Web Speech API's SpeechRecognition interface
- **Text-to-Speech (TTS)**: Implemented using the Web Speech API's SpeechSynthesis interface
- Created separate components for microphone (STT) and speaker (TTS) buttons
- Integrated both features into the chat interface

#### Key Files

- `/src/hooks/useSTT.ts`: Hook for Speech-to-Text functionality
- `/src/hooks/useTTS.ts`: Hook for Text-to-Speech functionality
- `/src/components/MicrophoneButton.tsx`: UI component for STT
- `/src/components/SpeakerButton.tsx`: UI component for TTS
- `/src/components/ChatInput.tsx`: Integration of speech features into chat input
- `/src/components/ChatMessage.tsx`: Integration of TTS for assistant messages

#### Usage

- **Speech-to-Text**: Click the microphone button in the chat input to start listening. Speak into your microphone, and your speech will be converted to text in the input field. Click again to stop listening.
- **Text-to-Speech**: Click the speaker button next to the chat input to have your message read aloud. Assistant messages also have speaker buttons to read their content.

### 3. Previous Chat Integration

#### Implementation Details

- Enhanced chat history management to support merging chats
- Added UI for selecting previous chats to add to the current chat
- Implemented visual indicators for merged chat content
- Added success notifications for user feedback

#### Key Files

- `/src/hooks/useChatHistory.ts`: Hook for chat history and merging functionality
- `/src/components/ChatSelector.tsx`: UI for selecting previous chats
- `/src/components/ChatInterface.tsx`: Integration of chat selection and display

#### Usage

Click the "Add Previous Chat" button in the chat interface to see a dropdown of available previous chats. Select a chat to add its messages to the current chat. A system message will indicate where the previous chat was merged, and a notification will confirm the action.

### 4. Work Directory Management

#### Implementation Details

- Created a directory management system that works without disrupting the current chat
- Implemented add/remove functionality with validation
- Added user notifications for successful actions
- Ensured the UI updates immediately to reflect changes

#### Key Files

- `/src/hooks/useWorkDirectories.ts`: Hook for directory management
- `/src/components/DirectoryManager.tsx`: UI for managing directories
- `/src/components/MainApp.tsx`: Integration of directory management

#### Usage

In the work directories section, click "Add Directory" to open a form. Enter a directory path and optional display name, then submit. The directory will be added without affecting the current chat. To remove a directory, click the trash icon next to it.

## Testing

Comprehensive tests have been implemented to ensure all features work correctly:

- `/src/test/FeatureIntegration.test.tsx`: Integration tests for all features
- `/src/test/SpeechFeatures.test.tsx`: Specific tests for STT and TTS functionality
- `/src/test/ChatSelector.test.tsx`: Tests for previous chat integration

## Browser Compatibility

The speech features use the Web Speech API, which has varying levels of support across browsers:

- Chrome/Edge: Full support for both STT and TTS
- Firefox: Good support for TTS, limited support for STT
- Safari: Good support for TTS, limited support for STT

For best results, use Chrome or Edge.

## Future Considerations

1. **Offline Support**: Consider adding offline support for speech features using downloadable models
2. **Additional Languages**: Extend RTL support to other RTL languages like Arabic
3. **Voice Selection**: Add UI for selecting different voices for TTS
4. **Improved STT Accuracy**: Implement custom language models for better speech recognition

## Troubleshooting

### Speech Features Not Working

1. Ensure your browser supports the Web Speech API
2. Check that microphone permissions are granted
3. Try using Chrome or Edge for best compatibility
4. Ensure you're in a quiet environment for better STT accuracy

### RTL Display Issues

1. Clear browser cache and reload
2. Ensure the RTL CSS is properly loaded
3. Check for any CSS conflicts in developer tools

## Conclusion

These enhancements significantly improve the usability and accessibility of the Goose application. The implementation follows best practices for React development and ensures a seamless user experience across different languages and interaction methods.
