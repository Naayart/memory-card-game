// components/ThemeSwitcher.jsx
import { useState, useEffect } from 'react';

function ThemeSwitcher({ onThemeChange, currentTheme }) {
  const [themeName, setThemeName] = useState('light');

  const themes = {
    light: {
      background: '#ffffff',
      card: '#FFB6C1',
      text: '#333333',
      stats: '#f0f0f0',
      button: '#4CAF50',
      header: '#333333'
    },
    dark: {
      background: '#1a1a1a',
      card: '#444444',
      text: '#ffffff',
      stats: '#2d2d2d',
      button: '#666666',
      header: '#ffffff'
    },
    ocean: {
      background: '#e3f2fd',
      card: '#4fc3f7',
      text: '#01579b',
      stats: '#b3e5fc',
      button: '#0288d1',
      header: '#01579b'
    }
  };

  // Detect current theme on mount
  useEffect(() => {
    if (currentTheme.background === '#ffffff') setThemeName('light');
    else if (currentTheme.background === '#1a1a1a') setThemeName('dark');
    else if (currentTheme.background === '#e3f2fd') setThemeName('ocean');
  }, []);

  const handleThemeChange = (e) => {
    const selected = e.target.value;
    setThemeName(selected);
    onThemeChange(themes[selected]);
  };

  return (
    <select
      value={themeName}
      onChange={handleThemeChange}
      style={{
        padding: '8px 15px',
        fontSize: '1em',
        borderRadius: '5px',
        cursor: 'pointer',
        backgroundColor: currentTheme.stats,
        color: currentTheme.text,
        border: `1px solid ${currentTheme.text}`,
        transition: 'all 0.3s ease'
      }}
    >
      <option value="light" style={{backgroundColor: '#fff', color: '#333'}}>☀️ Light</option>
      <option value="dark" style={{backgroundColor: '#333', color: '#fff'}}>🌙 Dark</option>
      <option value="ocean" style={{backgroundColor: '#e3f2fd', color: '#01579b'}}>🌊 Ocean</option>
    </select>
  );
}

export default ThemeSwitcher;