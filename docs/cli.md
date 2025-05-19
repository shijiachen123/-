# 前端自定义脚手架笔记

## 一、脚手架功能目标

- 快速初始化项目结构，减少手动创建项目文件的重复劳动。
- 支持用户选择不同的框架（如 Vue、React），根据选择生成相应的项目模板。
- 自动安装依赖并配置开发环境，省去手动执行命令的麻烦。
- 提供常见开发工具的配置文件模板，如 ESLint、Prettier 和 Babel。
- 支持扩展功能，例如通过命令快速生成组件或 API 文件。

## 二、目录结构设计

```
project-scaffold/
├── bin/                      # 脚手架入口文件目录
│   └── entry.js              # 执行index.js和webpack.config.js
├── templates/                # 项目模板存储目录
│   ├── vue-template/         # Vue 项目模板
│   └── react-template/       # React 项目模板
├── utils/                    # 工具函数目录
│   ├── copyFiles.js          # 文件拷贝工具函数
│   └── inquirerPrompts.js    # 命令行交互工具函数
├── scripts/                  # 核心脚本逻辑目录
│   ├── initProject.js        # 初始化项目的主要逻辑
│   ├── installDependencies.js # 自动安装依赖的脚本
│   └── configureFiles.js     # 配置文件处理逻辑（可选）
├── package.json              # 脚手架的 npm 配置文件
└── README.md                 # 使用说明文档
└── index.js                  # 负责处理命令行输入的脚本
```

## 三、详细文件路径和功能说明

### 1. bin/entry

模块复用的优势：
- 通过 require，可以在多个文件中复用公共逻辑，而不是重复代码。
- 动态加载：可以根据需要在运行时加载模块，而不是在文件编译时硬编码所有依赖项。
- 结构化项目：将项目拆分为不同的模块文件，使用 require 管理依赖关系，有助于代码维护和组织。

```javascript
#! /usr/bin/env node
require("../index.js") // 引入了commander库帮助解析命令行输入
require("../webpack.config.js") // webpack打包
const { Command } = require('commander'); // 引入 commander 库，帮助解析命令行输入例如creact来进行解辅助
// 创建一个命令行工具实例
const Inquirer = require('inquirer'); // 引入 inquirer 库，帮助创建交互式命令行界面
const figlet = require('figlet'); // 引入 figlet 库，帮助创建 ASCII 字符艺术字体
const initProject = require('./scripts/initProject'); // 引入项目初始化逻辑
const program = new Command();
program
    .version('1.0.0') // 设置脚手架的版本号
    .description('Custom Frontend Project Scaffold') // 添加脚手架的描述
    .command('create <project-name>') // 定义 init 命令，支持可选的项目名称参数
    .description('Initialize a new project') // 添加 init 命令的描述
    .option("-f, --force", "Overwrite existing project") // 添加 --force 选项，用于强制覆盖现有项目
    .action((projectName) => {
        // 定义 init 命令的执行逻辑
        // initProject(projectName);
        initProject(projectName);
    });

    // 选项
// new Inquirer.prompt([
//     {
//         name: "sjc",
//         type: "checkbox",
//         message: "请选择你喜欢的编程语言",
//         choices: [
//             {
//                 name: "JavaScript",
//                 value: "js",
//                 checked: true
//             },
//             {
//                 name: "Python",
//                 value: "python"
//             },
//         ]
//     }
// ]).then((answers) => {
//     console.log(answers);
// })

console.log(
    "\r\n" + // 回车换行
    /*
    参数 'sjc'：
        这是需要转化为 ASCII 艺术字的文本。
    第二个参数 { ... }：
        用于配置生成艺术字的样式。具体含义如下：
        font: 'Ghost'：
        指定使用 Ghost 字体样式，figlet 提供了多种字体，你可以替换为其他字体（如 Standard、Slant 等）。
        horizontalLayout: 'default'：
        控制艺术字的水平布局，默认值为 'default'，也可以是 'fitted'（紧凑）或 'full'（扩展）。
        verticalLayout: 'default'：
        控制艺术字的垂直布局，同样可以是 'fitted' 或 'full'。
        width: 80：
        指定生成艺术字的最大宽度。超出宽度时会自动换行。
        whitespaceBreak: true：
        允许在空白处换行以适应宽度。
    c. console.log(...)
    将生成的 ASCII 艺术字输出到控制台。
    */
    figlet.textSync('sjc', {
        font: 'Ghost', 
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true
    })
)

program.parse(process.argv); // 解析命令行参
```

### 2. templates/

这个目录存储不同框架的项目模板，用户可以通过命令选择需要的模板进行复制。

#### Vue 模板目录：

```
vue-template/
├── src/                     # 存放项目源码
│   ├── App.vue              # Vue 项目的主组件
│   ├── main.js              # Vue 项目的入口文件
│   └── components/          # 存放通用组件
│       └── HelloWorld.vue   # 示例组件
├── public/                  # 存放静态文件
│   └── index.html           # HTML 模板文件
└── package.json             # Vue 项目的依赖配置文件
```

#### React 模板目录：

```
react-template/
├── src/                     # 存放项目源码
│   ├── App.jsx              # React 项目的主组件
│   ├── index.jsx            # React 项目的入口文件
│   └── components/          # 存放通用组件
│       └── HelloWorld.jsx   # 示例组件
├── public/                  # 存放静态文件
│   └── index.html           # HTML 模板文件
└── package.json             # React 项目的依赖配置文件
```

### 3. utils/copyFiles.js

提供文件拷贝功能，用于将模板文件复制到目标目录。

```javascript
const fs = require('fs-extra'); // 引入 fs-extra，提供文件操作功能
const path = require('path');   // Node.js 内置模块，用于处理文件路径

// 定义文件拷贝函数
function copyFiles(templatePath, targetPath) {
  fs.copySync(templatePath, targetPath, { overwrite: true }); // 递归复制文件，覆盖已存在文件
}

module.exports = copyFiles; // 导出函数，供其他文件使用
```

### 4. utils/inquirerPrompts.js

用于与用户进行交互式问答，收集用户的输入。

```javascript
const inquirer = require('inquirer'); // 引入 inquirer 库，处理命令行交互

// 定义交互函数
async function getProjectDetails() {
  return await inquirer.prompt([
    {
      type: 'list', // 问题类型：列表
      name: 'framework', // 存储用户选择的属性名
      message: 'Which framework do you want to use?', // 提示用户选择框架
      choices: ['Vue', 'React'], // 提供的选项
    },
  ]);
}

module.exports = getProjectDetails; // 导出函数，供其他文件使用
```

### 5. scripts/initProject.js

初始化项目的核心逻辑，包括模板复制和依赖安装。

```javascript
const path = require('path'); // 处理路径
const copyFiles = require('../utils/copyFiles'); // 引入文件拷贝工具
const getProjectDetails = require('../utils/inquirerPrompts'); // 引入交互工具
const { execSync } = require('child_process'); // 用于执行终端命令

// 定义项目初始化函数
async function initProject(projectName) {
  // 通过交互工具获取用户的框架选择
  const { framework } = await getProjectDetails();

  // 定义模板路径和目标路径
  const templatePath = path.resolve(__dirname, `../templates/${framework.toLowerCase()}-template`);
  const targetPath = path.resolve(process.cwd(), projectName || 'new-project');

  console.log(`Creating project in ${targetPath}...`); // 提示用户创建项目中
  copyFiles(templatePath, targetPath); // 拷贝模板到目标目录

  console.log('Installing dependencies...'); // 提示用户安装依赖
  execSync('npm install', { cwd: targetPath, stdio: 'inherit' }); // 在目标目录中安装依赖

  console.log('Project setup complete!'); // 提示用户项目创建完成
}

module.exports = initProject; // 导出函数
```

### 6. package.json

配置脚手架的 npm 信息。

```json
{
  "name": "project-scaffold", // 脚手架名称
  "version": "1.0.0", // 脚手架版本
  "description": "Custom frontend project scaffold", // 脚手架描述
  "main": "bin/cli.js", // 脚手架入口文件
  "bin": {
    "scaffold": "./bin/cli.js" // 配置全局命令名
  },
  "dependencies": {
    "commander": "^10.0.0", // 命令行解析库
    "inquirer": "^9.0.0", // 交互式工具库
    "fs-extra": "^11.0.0" // 文件操作工具库
  }
}
```

## 四、实际操作流程

### 全局安装脚手架：

```bash
npm install -g .
```

注意：在脚手架目录下执行此命令。

### 初始化项目：

```bash
scaffold init my-project
```

my-project 是项目名称，用户可根据提示选择框架。

### 进入项目目录并运行：

```bash
cd my-project
npm run dev
```
