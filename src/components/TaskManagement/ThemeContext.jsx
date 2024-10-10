import { createContext, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
        setIsDarkMode((prevMode) => !prevMode);

        // Toggle root class for theme (light or dark)
        const rootElement = document.documentElement;
        if (isDarkMode) {
            rootElement.classList.remove('dark-theme');
            rootElement.classList.add('light-theme');
        } else {
            rootElement.classList.remove('light-theme');
            rootElement.classList.add('dark-theme');
        }
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
