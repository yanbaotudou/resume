# 胡力文 - 单页个人简历网站

基于 `React + Vite + TypeScript + TailwindCSS` 的静态前端项目，支持响应式布局、暗色模式切换、技能筛选项目、联系方式一键复制与项目详情展开。

## 技术栈

- React 18
- Vite 5
- TypeScript 5
- TailwindCSS 3

## 本地开发

```bash
npm install
npm run dev
```

默认访问：`http://localhost:5173`

## 构建与预览

```bash
npm run build
npm run preview
```

## Vercel 部署（推荐）

1. 将仓库推送到 GitHub。
2. 打开 Vercel，点击 `Add New -> Project`。
3. 选择该 GitHub 仓库并导入。
4. Framework Preset 选择 `Vite`（通常会自动识别）。
5. Build Command 使用 `npm run build`，Output Directory 使用 `dist`。
6. 点击 `Deploy`，构建成功后会生成可访问链接。

后续推送到 GitHub 默认会触发自动构建并更新线上站点。

## GitHub Pages 备用部署

项目已包含工作流：`.github/workflows/deploy-gh-pages.yml`。

### 步骤

1. 推送代码到 GitHub 仓库（建议默认分支为 `main`）。
2. 在仓库 `Settings -> Pages` 中将 Source 设置为 `GitHub Actions`。
3. 确保默认分支有该工作流文件，触发 `push` 后会自动部署。
4. 部署地址通常为：`https://<你的用户名>.github.io/<仓库名>/`。

### 关于 Vite base 配置

- `vite.config.ts` 使用 `VITE_BASE_PATH` 变量控制 `base`：
  - 默认：`/`
  - GitHub Pages：`/${仓库名}/`
- 工作流中会自动注入 `VITE_BASE_PATH=/${{ github.event.repository.name }}/`，无需手动改代码。

如需本地模拟 GitHub Pages 路径，可执行：

```bash
VITE_BASE_PATH=/你的仓库名/ npm run build
```
