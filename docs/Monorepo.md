# 使用 Monorepo 和 Workspace 实现自定义组件库从0-1

## 一、项目背景与目标

作为前端工程师，开发一个可复用的自定义组件库可以显著提升开发效率和代码一致性。本笔记详细记录如何使用 Monorepo 和 Workspace 架构，从零开始搭建一个现代化的组件库，涵盖项目初始化、组件开发、打包、测试和发布等全流程。

目标：
- 搭建一个基于 Monorepo 的组件库项目，使用 pnpm 管理 Workspace。
- 实现一个简单的 React 组件库，支持 TypeScript、Storybook 预览和单元测试。
- 配置打包工具和发布流程，确保组件库易于集成和维护。

## 二、Monorepo 和 Workspace 简介

### 1. 什么是 Monorepo？
Monorepo（Monolithic Repository）是一个单一仓库管理多个项目的开发模式。与传统的 Multi-repo 不同，Monorepo 将多个相关包（如组件库、示例项目、工具函数等）放在同一个仓库中，统一管理依赖、构建和发布。

**优点**：
- 统一依赖版本管理，减少版本冲突。
- 便于代码共享和复用。
- 简化 CI/CD 配置和跨包协作。

**缺点**：
- 仓库体积可能较大。
- 初期配置稍复杂。

### 2. 什么是 Workspace？
Workspace 是包管理工具（如 pnpm、Yarn、npm）提供的功能，用于在 Monorepo 中管理多个子包。它允许在单一仓库中定义多个 package，并通过配置文件（如 `pnpm-workspace.yaml`）管理它们之间的依赖关系。

**pnpm Workspace 的特点**：
- 高效的依赖管理，节省磁盘空间。
- 支持跨包的本地链接，开发时无需发布即可测试。
- 提供 `filter` 命令，方便针对特定包执行任务。

## 三、项目初始化

### 1. 技术选型
- **包管理工具**：pnpm（高效、轻量，支持 Workspace）。
- **组件库框架**：React + TypeScript。
- **构建工具**：Vite（开发和打包）+ Rollup（生成组件库产物）。
- **文档与预览**：Storybook。
- **测试工具**：Vitest + Testing Library。
- **代码规范**：ESLint + Prettier。
- **版本控制**：Git。

### 2. 初始化 Monorepo 项目

#### 步骤 1：创建项目目录
```bash
mkdir my-component-lib
cd my-component-lib
git init
```

#### 步骤 2：初始化 pnpm 和 Workspace
```bash
pnpm init
```

创建 `pnpm-workspace.yaml` 文件：
```yaml
packages:
  - 'packages/*'
```

这表示所有子包都位于 `packages/` 目录下。

#### 步骤 3：创建 Monorepo 目录结构
```bash
mkdir packages
mkdir packages/components
mkdir packages/docs
mkdir packages/example
```

目录结构说明：
- `packages/components`：核心组件库代码。
- `packages/docs`：Storybook 文档站点。
- `packages/example`：示例项目，用于测试组件库。

### 3. 配置根目录文件

#### `.gitignore`
```gitignore
node_modules
dist
coverage
.storybook
```

#### `package.json`
```json
{
  "name": "my-component-lib",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "pnpm -r dev",
    "build": "pnpm -r build",
    "test": "pnpm -r test",
    "lint": "pnpm -r lint"
  },
  "devDependencies": {
    "eslint": "^8.57.0",
    "prettier": "^3.3.3",
    "typescript": "^5.5.4"
  }
}
```

#### ESLint 和 Prettier 配置
创建 `.eslintrc.js`：
```javascript
module.exports = {
  env: { browser: true, es2021: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error'
  }
};
```

创建 `.prettierrc`：
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80
}
```

## 四、开发组件库（packages/components）

### 1. 初始化组件库包
在 `packages/components` 目录下运行：
```bash
pnpm init
```

修改 `package.json`：
```json
{
  "name": "@my-lib/components",
  "version": "0.1.0",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "files": ["dist"],
  "scripts": {
    "dev": "vite",
    "build": "rollup -c",
    "test": "vitest run",
    "lint": "eslint src --ext .ts,.tsx"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@rollup/plugin-commonjs": "^26.0.1",
    "@rollup/plugin-node-resolve": "^15.2.3",
    "@rollup/plugin-typescript": "^11.1.6",
    "@testing-library/react": "^16.0.1",
    "@types/react": "^18.3.3",
    "rollup": "^4.21.0",
    "rollup-plugin-dts": "^6.1.1",
    "tslib": "^2.6.3",
    "vite": "^5.4.2",
    "vitest": "^2.0.5"
  }
}
```

### 2. 配置 TypeScript
创建 `tsconfig.json`：
```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "jsx": "react-jsx",
    "declaration": true,
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

### 3. 创建第一个组件
在 `packages/components/src` 下创建 `Button.tsx`：
```tsx
import React from 'react';
import './Button.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary'
}) => {
  return (
    <button className={`button button--${variant}`} onClick={onClick}>
      {children}
    </button>
  );
};
```

创建 `Button.css`：
```css
.button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button--primary {
  background-color: #007bff;
  color: white;
}

.button--secondary {
  background-color: #6c757d;
  color: white;
}
```

导出组件，在 `src/index.ts` 中：
```ts
export * from './Button';
```

### 4. 配置 Rollup 打包
创建 `packages/components/rollup.config.js`：
```javascript
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import dts from 'rollup-plugin-dts';

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
        sourcemap: true
      },
      {
        file: 'dist/index.esm.js',
        format: 'esm',
        sourcemap: true
      }
    ],
    plugins: [resolve(), commonjs(), typescript()],
    external: ['react', 'react-dom']
  },
  {
    input: 'src/index.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [dts()]
  }
];
```

### 5. 配置 Vitest 测试
创建 `packages/components/vitest.config.ts`：
```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts'
  }
});
```

创建 `src/setupTests.ts`：
```ts
import '@testing-library/jest-dom';
```

创建 `src/Button.test.tsx`：
```tsx
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

## 五、搭建 Storybook（packages/docs）

### 1. 初始化 Storybook
在 `packages/docs` 运行：
```bash
pnpm init
npx storybook init
```

修改 `package.json`：
```json
{
  "name": "@my-lib/docs",
  "version": "0.1.0",
  "scripts": {
    "dev": "storybook dev -p 6006",
    "build": "storybook build"
  },
  "dependencies": {
    "@my-lib/components": "workspace:*"
  }
}
```

### 2. 编写 Story
在 `packages/docs/stories` 下创建 `Button.stories.tsx`：
```tsx
import { Button } from '@my-lib/components';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary']
    }
  }
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary'
  }
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary'
  }
};
```

## 六、搭建示例项目（packages/example）

### 1. 初始化 Vite 项目
在 `packages/example` 运行：
```bash
pnpm create vite . --template react-ts
```

修改 `package.json`：
```json
{
  "name": "@my-lib/example",
  "version": "0.1.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@my-lib/components": "workspace:*"
  }
}
```

### 2. 使用组件
修改 `src/App.tsx`：
```tsx
import { Button } from '@my-lib/components';

function App() {
  return (
    <div>
      <Button variant="primary">Primary Button</Button>
      <Button variant="secondary">Secondary Button</Button>
    </div>
  );
}

export default App;
```

## 七、发布组件库

### 1. 配置发布脚本
在 `packages/components/package.json` 中添加：
```json
{
  "scripts": {
    "publish": "pnpm build && npm publish"
  }
}
```

### 2. 设置 npm 发布
确保根目录有 `.npmrc` 文件：
```
registry=https://registry.npmjs.org/
```

登录 npm：
```bash
npm login
```

发布：
```bash
cd packages/components
pnpm publish
```

## 八、总结与优化建议

### 总结
- 通过 Monorepo 和 pnpm Workspace，我们搭建了一个结构清晰的组件库项目。
- 集成了 React、TypeScript、Storybook、Vitest 等现代工具，覆盖开发、测试和文档需求。
- 示例项目和发布流程确保了组件库的可用性和可维护性。

### 优化建议
- **CSS 方案**：考虑使用 Tailwind CSS 或 CSS-in-JS（如- **组件丰富性**：扩展更多组件（如 Modal、Input），并支持主题定制。
- **CI/CD**：配置 GitHub Actions 实现自动化测试和发布。
- **性能优化**：使用 Tree Shaking 和按需加载减少打包体积。