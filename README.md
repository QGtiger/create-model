# create-model

简单的一个状态管理工具。

本质上还是使用了 react的 createContext 的能力。 

createContext 会 return Provider 和 Customer。 或者使用 useContext 去做消费。

优点： React 的 `createContext` 和 `useContext` 钩子一起使用时，可以很方便地在组件树中传递数据，无需手动在每个层级上逐个传递 `props`。

## 原生使用范例如下

### 示例: 主题切换

这个例子展示了如何使用 `createContext` 和 `useContext` 来实现一个简单的主题切换功能。

```tsx
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
```

### 改造

从使用上，是在 context上 抽离出 model 这一层， 维护model 就好了，还可以在model 中添加额外的逻辑操作。 后续统一都是使用 Model.Provider 和 Model.useModel

```tsx
import { createCustomModel } from "@lightfish/create-model";
import { useState } from "react";

// models/themeModel.ts
const ThemeModel = createCustomModel(function(props: {
  defaultTheme: string
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
```