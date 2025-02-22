// 生成一个简单的 SVG logo
export const logoSvg = `
<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="64" height="64" rx="12" fill="#1F2937"/>
  <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#FFFFFF" font-size="24" font-family="Arial">AI</text>
</svg>
`

// 转换为 base64 数据 URL
const svgBase64 = btoa(logoSvg)
export const logoUrl = `data:image/svg+xml;base64,${svgBase64}` 