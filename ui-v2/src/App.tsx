import React, { Suspense } from 'react';
import { Outlet } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import SuspenseLoader from './components/SuspenseLoader';
import RTLProvider from './i18n/RTLProvider';

const App: React.FC = (): React.ReactElement => {
  const { t } = useTranslation();
  
  return (
    <RTLProvider>
      <div className="">
        <div className="titlebar-drag-region" />
        <div className="h-10 w-full" />
        <div className="">
          <div className="">
            <Suspense fallback={<SuspenseLoader />}>
              <Outlet />
            </Suspense>
          </div>
        </div>
      </div>
    </RTLProvider>
  );
};

export default App;
