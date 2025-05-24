import React from 'react';
import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n/i18n';
import DirectoryManager from '../components/DirectoryManager';

describe('DirectoryManager Component Tests', () => {
  const mockDirectories = [
    {
      id: '1',
      path: '/test/path1',
      name: 'Test Directory 1',
      addedAt: new Date()
    },
    {
      id: '2',
      path: '/test/path2',
      name: 'Test Directory 2',
      addedAt: new Date()
    }
  ];

  test('DirectoryManager renders correctly with directories', () => {
    const handleAddDirectory = jest.fn().mockReturnValue(true);
    const handleRemoveDirectory = jest.fn();
    
    render(
      <I18nextProvider i18n={i18n}>
        <DirectoryManager 
          directories={mockDirectories}
          onAddDirectory={handleAddDirectory}
          onRemoveDirectory={handleRemoveDirectory}
        />
      </I18nextProvider>
    );
    
    // Check if the component renders correctly
    expect(screen.getByText('Work Directories')).toBeInTheDocument();
    expect(screen.getByText('Add Directory')).toBeInTheDocument();
    
    // Check if directories are displayed
    expect(screen.getByText('Test Directory 1')).toBeInTheDocument();
    expect(screen.getByText('Test Directory 2')).toBeInTheDocument();
    expect(screen.getByText('/test/path1')).toBeInTheDocument();
    expect(screen.getByText('/test/path2')).toBeInTheDocument();
  });

  test('DirectoryManager shows empty state when no directories', () => {
    const handleAddDirectory = jest.fn();
    const handleRemoveDirectory = jest.fn();
    
    render(
      <I18nextProvider i18n={i18n}>
        <DirectoryManager 
          directories={[]}
          onAddDirectory={handleAddDirectory}
          onRemoveDirectory={handleRemoveDirectory}
        />
      </I18nextProvider>
    );
    
    // Check if empty state message is displayed
    expect(screen.getByText('No work directories added')).toBeInTheDocument();
  });

  test('DirectoryManager form validation works', () => {
    const handleAddDirectory = jest.fn().mockReturnValue(false);
    const handleRemoveDirectory = jest.fn();
    
    render(
      <I18nextProvider i18n={i18n}>
        <DirectoryManager 
          directories={mockDirectories}
          onAddDirectory={handleAddDirectory}
          onRemoveDirectory={handleRemoveDirectory}
        />
      </I18nextProvider>
    );
    
    // Open the form
    const addButton = screen.getByText('Add Directory');
    addButton.click();
    
    // Submit without path (should show error)
    const submitButton = screen.getAllByText('Add Directory')[1];
    submitButton.click();
    
    // Check if error message is displayed
    expect(screen.getByText('Directory path is required')).toBeInTheDocument();
  });
});
