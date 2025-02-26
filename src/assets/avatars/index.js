// 预设角色头像
// 使用SVG格式的线稿头像，方便定制颜色和减小体积

// 男性成年人头像
const maleSvg = `<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="70" r="40" stroke="#333" stroke-width="2" fill="none"/>
  <path d="M60 140C60 117.909 77.9086 100 100 100C122.091 100 140 117.909 140 140V160H60V140Z" stroke="#333" stroke-width="2" fill="none"/>
  <path d="M80 70C85 60 90 55 100 55C110 55 115 60 120 70" stroke="#333" stroke-width="2" fill="none"/>
  <ellipse cx="85" cy="65" rx="2" ry="3" fill="#333"/>
  <ellipse cx="115" cy="65" rx="2" ry="3" fill="#333"/>
</svg>`;

// 女性成年人头像
const femaleSvg = `<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="70" r="40" stroke="#333" stroke-width="2" fill="none"/>
  <path d="M80 160V140C80 128.954 88.9543 120 100 120C111.046 120 120 128.954 120 140V160H80Z" stroke="#333" stroke-width="2" fill="none"/>
  <path d="M60 100L80 160" stroke="#333" stroke-width="2" fill="none"/>
  <path d="M140 100L120 160" stroke="#333" stroke-width="2" fill="none"/>
  <path d="M80 70C85 60 90 55 100 55C110 55 115 60 120 70" stroke="#333" stroke-width="2" fill="none"/>
  <ellipse cx="85" cy="65" rx="2" ry="3" fill="#333"/>
  <ellipse cx="115" cy="65" rx="2" ry="3" fill="#333"/>
</svg>`;

// 老年人头像
const elderSvg = `<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="70" r="40" stroke="#333" stroke-width="2" fill="none"/>
  <path d="M60 140C60 117.909 77.9086 100 100 100C122.091 100 140 117.909 140 140V160H60V140Z" stroke="#333" stroke-width="2" fill="none"/>
  <path d="M80 70C85 60 90 55 100 55C110 55 115 60 120 70" stroke="#333" stroke-width="2" fill="none"/>
  <ellipse cx="85" cy="65" rx="2" ry="3" fill="#333"/>
  <ellipse cx="115" cy="65" rx="2" ry="3" fill="#333"/>
  <path d="M70 40C80 30 120 30 130 40" stroke="#333" stroke-width="2" fill="none"/>
  <path d="M85 90C95 95 105 95 115 90" stroke="#333" stroke-width="2" fill="none"/>
</svg>`;

// 儿童头像
const childSvg = `<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="80" r="35" stroke="#333" stroke-width="2" fill="none"/>
  <path d="M75 145V130C75 121.716 81.7157 115 90 115H110C118.284 115 125 121.716 125 130V145H75Z" stroke="#333" stroke-width="2" fill="none"/>
  <path d="M85 80C90 72 95 70 100 70C105 70 110 72 115 80" stroke="#333" stroke-width="2" fill="none"/>
  <ellipse cx="88" cy="75" rx="2" ry="2.5" fill="#333"/>
  <ellipse cx="112" cy="75" rx="2" ry="2.5" fill="#333"/>
</svg>`;

// 预设头像列表
export const defaultAvatars = [
  { id: 'male', name: '成年男性', svg: maleSvg },
  { id: 'female', name: '成年女性', svg: femaleSvg },
  { id: 'elder', name: '老年人', svg: elderSvg },
  { id: 'child', name: '儿童', svg: childSvg }
];

// 默认头像ID (成年男性)
export const defaultAvatarId = defaultAvatars[0].id; 