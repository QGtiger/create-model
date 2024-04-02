
import React, { createContext, useContext, useState } from 'react';

// 创建一个 Context 对象
const ThemeContext = createContext<{
  theme: string;
  toggleTheme: () => void;
}>({} as any);

// 创建一个提供主题的组件
const ThemeProvider = ({ children }: React.PropsWithChildren) => {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 使用 Context 的组件
const ThemedComponent = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  return (
    <div style={{ background: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#000' : '#fff' }}>
      The current theme is {theme}.
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

// 在应用中使用
const App = () => (
  <ThemeProvider>
    <ThemedComponent />
  </ThemeProvider>
);