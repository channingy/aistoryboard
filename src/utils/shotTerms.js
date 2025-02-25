// 景别选项
export const framingOptions = [
  { label: '极远景', value: 'extreme_long', description: '极端遥远的景观，人物如微小点状，强调环境与人的对比' },
  { label: '远景', value: 'long', description: '广阔环境为主，人物高度不足画面1/4，用于背景交代' },
  { label: '大全景', value: 'full', description: '完整展示主体与环境，常用于环境介绍' },
  { label: '全景', value: 'medium_full', description: '人物全身或场景全貌，清晰呈现动作与环境关系' },
  { label: '小全景', value: 'cowboy', description: '人物"顶天立地"，缩小环境占比，保留全身' },
  { label: '中景', value: 'medium', description: '膝盖以上取景，兼顾动作与表情，叙事性强' },
  { label: '中近景', value: 'medium_close', description: '腰部至头部，强化表情与上半身动作' },
  { label: '近景', value: 'close', description: '胸部以上，突出面部细节与情感' },
  { label: '特写', value: 'big_close', description: '肩部以上或物体局部，强调关键细节' },
  { label: '大特写', value: 'extreme_close', description: '聚焦五官或物体微小局部，视觉冲击力强' }
]

// 镜头运动选项
export const cameraMovementOptions = [
  { label: '推镜头', value: 'dolly_in', description: '摄影机物理前移或变焦放大主体' },
  { label: '拉镜头', value: 'dolly_out', description: '摄影机物理后移或变焦缩小画面' },
  { label: '摇镜头', value: 'pan', description: '水平轴固定，机身左右/上下旋转扫描空间' },
  { label: '移镜头', value: 'tracking', description: '摄影机沿轨道或手持横向移动' },
  { label: '升降镜头', value: 'crane', description: '垂直方向运动' },
  { label: '跟镜头', value: 'follow', description: '追踪主体运动轨迹' },
  { label: '甩镜头', value: 'whip_pan', description: '快速摇动镜头造成模糊效果' },
  { label: '悬空镜头', value: 'aerial', description: '空中拍摄' },
  { label: '固定镜头', value: 'fixed', description: '摄影机位置无物理运动' }
]

// 拍摄角度选项
export const cameraAngleOptions = [
  { label: '平角', value: 'eye_level', description: '摄影机与主体视线高度平行' },
  { label: '仰角', value: 'low_angle', description: '摄影机低于主体视线向上拍摄' },
  { label: '俯角', value: 'high_angle', description: '摄影机高于主体视线向下拍摄' },
  { label: '正面角度', value: 'front', description: '摄影机正对主体拍摄' },
  { label: '侧面角度', value: 'profile', description: '摄影机与主体呈90度夹角' },
  { label: '斜面角度', value: 'three_quarter', description: '摄影机与主体呈45度夹角' },
  { label: '鸟瞰视角', value: 'birds_eye', description: '摄影机垂直于地面向下拍摄' },
  { label: '过肩视角', value: 'over_the_shoulder', description: '摄影机透过前景人物肩部拍摄对话对象' }
]

// 影调选项
export const toneOptions = [
  { label: '高调', value: 'high_key', description: '画面亮区占比>70%' },
  { label: '中间调', value: 'mid_key', description: '亮/暗区占比40-60%' },
  { label: '低调', value: 'low_key', description: '暗区占比>70%' }
]

// 对比度选项
export const contrastOptions = [
  { label: '高对比', value: 'high_contrast', description: '光比≥3000:1' },
  { label: '低对比', value: 'low_contrast', description: '光比≤800:1' },
  { label: '平光', value: 'plain', description: '无主次光比' }
]

// 色温选项
export const colorTempOptions = [
  { label: '冷色温', value: 'cool', description: '色温范围6500K-8000K' },
  { label: '暖色温', value: 'warm', description: '色温标准3200K' }
] 