# MiSans 字体

## 现状

| 文件 | 作用 |
| --- | --- |
| `sub-400.woff2` `sub-650.woff2` `sub-700.woff2` `sub-900.woff2` | **自托管子集**（各 ~52KB）。页面全部字形打包在内，`index.html` 里 `#misans-subset` 内联 `@font-face` + `unicode-range` 引用。首屏字体请求 = 4 个同源请求，CDN 零请求。 |
| `misans.css` | 官方分片（224 条 `@font-face`，4 字重 × 56 片，走 npmmirror）。以 `media="print" onload` **异步**加载，只为子集没覆盖的新增字形兜底。 |

字重映射：400=Regular，650=Semibold（页面 600 也落到它），700=Bold，900=Heavy（页面 800 也落到它）。
`▸`(U+25B8) `✅`(U+2705) 等 emoji 不在 MiSans 字库里，`unicode-range` 已排除，走系统字体。

## 重建（文案改动后定期执行）

```bash
# 1) 提取页面字符集（node，含 ASCII 安全网）
node -e "
const fs=require('fs');
let h=fs.readFileSync('index.html','utf8')
  .replace(/<script[\s\S]*?<\/script>/gi,' ')
  .replace(/<style[\s\S]*?<\/style>/gi,' ')
  .replace(/<!--[\s\S]*?-->/g,' ');
const set=new Set();
for (const ch of h.replace(/<[^>]+>/g,' ')) if (!/\s/.test(ch)) set.add(ch);
for (let c=0x20;c<=0x7e;c++) set.add(String.fromCodePoint(c));
for (const ch of '，。、：；！？——…·「」『』（）《》“”‘’—×✓▸→') set.add(ch);
fs.writeFileSync('/tmp/glyphs.txt',[...set].sort().join(''));
"

# 2) 官方完整字体（TrueType）：https://hyperos.mi.com/font 下载 MiSans.zip，解压出 ttf/

# 3) 裁剪（python + fonttools+brotli：python3 -m venv /tmp/fv && pip install fonttools brotli）
for pair in "Regular:400" "Semibold:650" "Bold:700" "Heavy:900"; do
  n=${pair%%:*}; w=${pair##*:}
  pyftsubset "MiSans/ttf/MiSans-$n.ttf" --text-file=/tmp/glyphs.txt --flavor=woff2 \
    --output-file="fonts/sub-$w.woff2" \
    --layout-features='kern,liga,ccmp,locl,mark,mkmk' --notdef-outline --recalc-bounds
done

# 4) 用字体实际拥有的码点刷新 #misans-subset 的 unicode-range
#    （▸ ✅ emoji 等缺失码点要排除，否则会改变系统兜底行为）
```

## 注意

- `@font-face` 的 `unicode-range` 重叠时**后声明者胜**：`#misans-subset` 必须保持在
  `fonts/misans.css` 的 `<link>` 之后，否则会退回 CDN 分片加载。
- 子集只保证**当前页面文案**；新增文案里的生僻字会走 CDN 兜底（多一个请求而已，不会豆腐块）。
