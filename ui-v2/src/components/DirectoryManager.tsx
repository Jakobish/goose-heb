import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { WorkDirectory } from '../hooks/useWorkDirectories';

interface DirectoryManagerProps {
  directories: WorkDirectory[];
  onAddDirectory: (path: string, name: string) => boolean;
  onRemoveDirectory: (id: string) => void;
}

/**
 * DirectoryManager component for adding and removing work directories
 */
const DirectoryManager: React.FC<DirectoryManagerProps> = ({
  directories,
  onAddDirectory,
  onRemoveDirectory
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [newPath, setNewPath] = useState('');
  const [newName, setNewName] = useState('');
  const [error, setError] = useState('');

  const handleAddDirectory = () => {
    if (!newPath) {
      setError('Directory path is required');
      return;
    }

    const success = onAddDirectory(newPath, newName);
    if (success) {
      setNewPath('');
      setNewName('');
      setError('');
    } else {
      setError('Directory already exists');
    }
  };

  return (
    <div className="border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">{t('settings.workDirectories')}</h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-2 text-sm rounded-md border border-border hover:bg-accent transition-colors"
        >
          {isOpen ? 'Hide Form' : t('settings.addDirectory')}
        </button>
      </div>

      {isOpen && (
        <div className="mb-4 p-4 border border-border rounded-lg">
          <div className="mb-3">
            <label htmlFor="directory-path" className="block text-sm font-medium mb-1">
              Directory Path
            </label>
            <input
              id="directory-path"
              type="text"
              value={newPath}
              onChange={(e) => setNewPath(e.target.value)}
              placeholder="/path/to/directory"
              className="w-full p-2 border border-border rounded-md"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="directory-name" className="block text-sm font-medium mb-1">
              Display Name (Optional)
            </label>
            <input
              id="directory-name"
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="My Project"
              className="w-full p-2 border border-border rounded-md"
            />
          </div>
          {error && <p className="text-destructive text-sm mb-3">{error}</p>}
          <button
            onClick={handleAddDirectory}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
          >
            {t('settings.addDirectory')}
          </button>
        </div>
      )}

      <div className="space-y-2">
        {directories.length === 0 ? (
          <p className="text-muted-foreground text-sm">No work directories added</p>
        ) : (
          directories.map((dir) => (
            <div
              key={dir.id}
              className="flex items-center justify-between p-3 border border-border rounded-md"
            >
              <div>
                <div className="font-medium">{dir.name}</div>
                <div className="text-sm text-muted-foreground">{dir.path}</div>
              </div>
              <button
                onClick={() => onRemoveDirectory(dir.id)}
                className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                aria-label={t('settings.removeDirectory')}
                title={t('settings.removeDirectory')}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DirectoryManager;
