import React from 'react';

import { RouterProvider } from '@tanstack/react-router';
import ReactDOM from 'react-dom/client';

import { router } from './routeTree';
import './i18n/i18n'; // Import i18n configuration

import './styles/main.css';

// Initialize the router
await router.load();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
