import { useState, useEffect } from 'react';

export interface WorkDirectory {
  id: string;
  path: string;
  name: string;
  addedAt: Date;
}

/**
 * Hook for managing work directories
 */
export const useWorkDirectories = () => {
  const [directories, setDirectories] = useState<WorkDirectory[]>([]);
  
  // Load directories from storage on initial render
  useEffect(() => {
    // In a real implementation, this would load from localStorage, IndexedDB, or an API
    // For this example, we'll use mock data
    const mockDirectories: WorkDirectory[] = [
      {
        id: '1',
        path: '/home/user/projects/project1',
        name: 'Project 1',
        addedAt: new Date(Date.now() - 86400000) // 1 day ago
      },
      {
        id: '2',
        path: '/home/user/projects/project2',
        name: 'Project 2',
        addedAt: new Date(Date.now() - 43200000) // 12 hours ago
      }
    ];
    
    setDirectories(mockDirectories);
  }, []);
  
  // Add a new directory
  const addDirectory = (path: string, name: string = '') => {
    // Check if directory already exists
    const exists = directories.some(dir => dir.path === path);
    if (exists) return false;
    
    // Use the last part of the path as name if not provided
    const directoryName = name || path.split('/').pop() || 'New Directory';
    
    const newDirectory: WorkDirectory = {
      id: Date.now().toString(),
      path,
      name: directoryName,
      addedAt: new Date()
    };
    
    setDirectories(prevDirs => [...prevDirs, newDirectory]);
    return true;
  };
  
  // Remove a directory
  const removeDirectory = (id: string) => {
    setDirectories(prevDirs => prevDirs.filter(dir => dir.id !== id));
  };
  
  // Update a directory
  const updateDirectory = (id: string, updates: Partial<Omit<WorkDirectory, 'id' | 'addedAt'>>) => {
    setDirectories(prevDirs => 
      prevDirs.map(dir => 
        dir.id === id ? { ...dir, ...updates } : dir
      )
    );
  };
  
  return {
    directories,
    addDirectory,
    removeDirectory,
    updateDirectory
  };
};

export default useWorkDirectories;
