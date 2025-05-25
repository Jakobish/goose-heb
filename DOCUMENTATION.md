# Goose Repository Enhancement Documentation

## Overview
This document provides comprehensive documentation for the enhancements made to the Goose repository. Four major features have been implemented:

1. Hebrew RTL (Right-to-Left) support
2. Microphone feature for Text-to-Speech (TTS)
3. Option to add a previous chat to the current chat
4. Option to add/remove work directories without creating a new chat session

## Dependencies Added

The following dependencies were added to the project:

```
react-i18next: For internationalization and RTL support
i18next: Core i18next library
i18next-browser-languagedetector: For automatic language detection
```

These can be installed via npm:

```bash
npm install react-i18next i18next i18next-browser-languagedetector
```

## Feature Implementation Details

### 1. Hebrew RTL Support

#### Files Created/Modified:
- `/src/i18n/i18n.ts`: Main i18n configuration
- `/src/i18n/locales/en.json`: English translations
- `/src/i18n/locales/he.json`: Hebrew translations
- `/src/i18n/RTLProvider.tsx`: Component to handle RTL/LTR direction changes
- `/src/styles/rtl.css`: RTL-specific styles
- `/src/styles/main.css`: Updated to import RTL styles
- `/src/App.tsx`: Updated to use RTLProvider
- `/src/main.tsx`: Updated to import i18n configuration
- `/src/components/LanguageSwitcher.tsx`: Component for switching languages

#### Implementation Details:
- Added i18n infrastructure with support for English and Hebrew
- Created RTLProvider to dynamically change document direction based on language
- Added RTL-specific CSS for proper text alignment and UI mirroring
- Integrated language switching functionality
- Ensured all UI components respect RTL direction when Hebrew is selected

### 2. Microphone Text-to-Speech Feature

#### Files Created/Modified:
- `/src/hooks/useTTS.ts`: Hook for Text-to-Speech functionality
- `/src/components/MicrophoneButton.tsx`: UI component for the microphone button
- `/src/components/ChatInput.tsx`: Chat input with integrated microphone button

#### Implementation Details:
- Implemented Web Speech API integration for cross-browser compatibility
- Created a reusable hook (useTTS) for TTS functionality
- Added language-aware voice selection based on current i18n language
- Implemented play/stop functionality with appropriate UI feedback
- Integrated the microphone button into the chat input interface

### 3. Previous Chat Integration

#### Files Created/Modified:
- `/src/hooks/useChatHistory.ts`: Hook for managing chat history and merging
- `/src/components/ChatSelector.tsx`: UI for selecting previous chats
- `/src/components/ChatInterface.tsx`: Main chat interface with merge functionality

#### Implementation Details:
- Created a chat history management system with mock data
- Implemented functionality to merge previous chats into the current chat
- Added a dropdown UI for selecting previous chats to merge
- Ensured clear visual indication when chats are merged
- Maintained chat context and continuity during merges

### 4. Work Directory Management

#### Files Created/Modified:
- `/src/hooks/useWorkDirectories.ts`: Hook for managing work directories
- `/src/components/DirectoryManager.tsx`: UI for adding/removing directories
- `/src/components/MainApp.tsx`: Main application component integrating all features

#### Implementation Details:
- Implemented directory management with add/remove functionality
- Created a user-friendly interface for directory operations
- Ensured directory changes don't interrupt the current chat session
- Added validation to prevent duplicate directories
- Integrated directory management into the main application layout

## Integration

All features have been integrated into a cohesive application structure:

- `MainApp.tsx` serves as the container component that brings together all features
- RTL support affects the entire application UI
- The microphone button is integrated into the chat input
- Chat selection is available in the chat interface header
- Directory management is accessible in the sidebar

## Testing

A dedicated test page (`TestPage.tsx`) has been created to facilitate testing of all new features. It provides step-by-step instructions for verifying each feature's functionality.

## Usage Instructions

### Hebrew RTL Support
- Use the language switcher in the header to toggle between English and Hebrew
- The UI will automatically adjust direction and text alignment based on the selected language

### Microphone TTS Feature
- Type text in the chat input
- Click the microphone button to hear the text spoken
- Click again to stop the speech
- The voice will automatically adapt to the selected language

### Previous Chat Integration
- Use the "Add Previous Chat" dropdown in the chat interface header
- Select a previous chat to merge into the current conversation
- A system message will indicate where the merged chat begins

### Work Directory Management
- Use the directory manager in the sidebar
- Click "Add Directory" to show the form
- Enter a directory path and optional display name
- Click "Add Directory" to add it to the list
- Click the trash icon to remove a directory

## Future Considerations

- Persistence: Currently using mock data; should be connected to actual storage
- Voice selection: Add UI for manually selecting preferred voices
- Chat export/import: Consider adding functionality to export and import chat history
- Directory browsing: Add ability to browse and select directories visually
