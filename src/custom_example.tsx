import { createCustomModel } from "@lightfish/create-model";
import { useState } from "react";

// models/themeModel.ts
const ThemeModel = createCustomModel(function(props: {
  defaultTheme: string,
  test?: 2,
}) {
  const [theme, setTheme] = useState(props.defaultTheme);

  return {
    theme,
    toggleTheme: () => {
      setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    }
  }
})

// App 使用
const defaultConfig = { defaultTheme: 'light' };
const App = () => (
  <ThemeModel.Provider value={defaultConfig}>
    <ThemedComponent />
  </ThemeModel.Provider>
);

// 统一引入ThemeModel，并使用 ThemeModel.useModel() 获取数据
function ThemedComponent() {
  const { theme, toggleTheme } = ThemeModel.useModel();
  return (
    <div style={{ background: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#000' : '#fff' }}>
      The current theme is {theme}.
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  )
}