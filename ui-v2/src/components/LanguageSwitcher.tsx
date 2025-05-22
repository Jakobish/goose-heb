import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * LanguageSwitcher component for changing the application language
 * Provides a dropdown to select between supported languages
 */
const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  
  const changeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const language = event.target.value;
    i18n.changeLanguage(language);
  };
  
  return (
    <select 
      onChange={changeLanguage} 
      value={i18n.language}
      className="bg-background border border-border rounded p-1 text-sm"
    >
      <option value="en">English</option>
      <option value="he">עברית</option>
    </select>
  );
};

export default LanguageSwitcher;
