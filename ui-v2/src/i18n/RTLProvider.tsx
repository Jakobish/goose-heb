import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * RTLProvider component to handle RTL/LTR direction changes based on language
 */
export const RTLProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();
  
  useEffect(() => {
    // Set the dir attribute on the html element based on the current language
    const dir = i18n.dir();
    document.documentElement.dir = dir;
    document.documentElement.lang = i18n.language;
    
    // Add RTL-specific class to body if needed
    if (dir === 'rtl') {
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }
  }, [i18n.language]);
  
  return <>{children}</>;
};

export default RTLProvider;
