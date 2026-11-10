# 语学伴 · 落地页

Vite + Vue 3 + vite-ssg 单页落地页：构建时预渲染成完整静态 HTML（SSG），客户端水合后由 Vue 接管交互。

## 常用命令

```bash
npm install        # 安装依赖
npm run dev        # 开发服务器（默认 http://localhost:5173/）
npm run build      # SSG 构建 → dist/
npm run preview    # 本地预览 dist/（默认 http://localhost:4173/）
npm run typecheck  # vue-tsc 类型检查
```

## 目录结构

```
index.html            # Vite 模板：SEO/OG 元信息、字体加载策略（CDN 兜底 + 内联子集）、noscript 兜底、JSON-LD
src/
  main.ts             # vite-ssg 入口：注册 v-reveal / v-spotlight / v-magnetic 指令，压回 html lang="zh-CN"
  App.vue             # 骨架：跳转链接、渡鸦渐变 defs、导航/页脚 + router-view
  pages/Landing.vue   # 落地页各板块组装
  components/         # SiteNav / HeroSection / AppMockup（自动播放的产品演示）/ ValueStrip / 各板块 / StageVisual / FlipCard / RavenLogo …
  composables/        # useRotator（首屏切换词轮播）
  directives/         # v-reveal（滚动入场）、v-spotlight（光标聚光）、v-magnetic（主按钮磁吸）
  styles/             # 按板块拆分的全局 CSS（保持原级联顺序：base → nav → hero → sections → showcase → footer → responsive → motion）
public/
  fonts/              # MiSans 自托管子集（4 个 woff2）+ CDN 全量分片兜底 CSS
  logo.svg / og.png   # 图标与社交分享图
```

## 部署

- `npm run build` 产物在 `dist/`，**全部资源引用都是相对路径**（`base: './'`）：
  伺服在根路径或任意子目录（index.html 与资源同目录）都能直接运行，不预设托管平台。
- 字体策略与原版一致：内联子集 `@font-face` 优先，CDN 分片异步兜底（`media="print"` 异步加载），
  4 个子集 woff2 有 preload。
- 无 JS 时由 noscript 样式兜底保证内容可见（reveal/轮播全部点亮）。
- `index.html` 里的 canonical / og:url 等绝对地址是页面元信息内容，按实际域名自行修改。
