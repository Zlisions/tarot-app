import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════
//  78 CARD TAROT DECK
// ═══════════════════════════════════════════════════════════
const TAROT_CARDS = [
  // ── Major Arcana (22) ─────────────────────────────────────
  { id:0,  name:"愚者",    nameEn:"The Fool",         symbol:"🌀", suit:"大阿卡纳", upright:"新开始、冒险、自由精神、天真无邪、跳入未知", reversed:"鲁莽冲动、缺乏计划、忽视风险、不成熟" },
  { id:1,  name:"魔术师",  nameEn:"The Magician",     symbol:"☿", suit:"大阿卡纳", upright:"意志力强、掌握资源、技艺精湛、全力以赴", reversed:"自我欺骗、才能浪费、操纵他人、虎头蛇尾" },
  { id:2,  name:"女祭司",  nameEn:"High Priestess",   symbol:"☾", suit:"大阿卡纳", upright:"内在直觉、隐藏知识、潜意识智慧、等待时机", reversed:"压制直觉、秘密曝光、判断混乱、表面功夫" },
  { id:3,  name:"女皇",    nameEn:"The Empress",      symbol:"♀", suit:"大阿卡纳", upright:"丰盛富足、母性滋养、自然创造、感官享受", reversed:"创造力受阻、过度依赖、控制欲强、忽视自我" },
  { id:4,  name:"皇帝",    nameEn:"The Emperor",      symbol:"♂", suit:"大阿卡纳", upright:"权威掌控、稳固结构、领导力、提供保护", reversed:"独裁专制、僵化固执、滥用权力、缺乏弹性" },
  { id:5,  name:"教皇",    nameEn:"The Hierophant",   symbol:"⛪", suit:"大阿卡纳", upright:"传统智慧、宗教信仰、精神导师、寻求认可", reversed:"叛逆传统、挑战权威、另辟蹊径、思想僵化" },
  { id:6,  name:"恋人",    nameEn:"The Lovers",       symbol:"♡", suit:"大阿卡纳", upright:"真爱连结、价值观对齐、重要抉择、灵魂共鸣", reversed:"关系失衡、价值观冲突、逃避选择、自我不和" },
  { id:7,  name:"战车",    nameEn:"The Chariot",      symbol:"⚔", suit:"大阿卡纳", upright:"意志胜利、坚定前行、掌控局面、克服障碍", reversed:"失去方向、内心冲突、失控蛮进、强行推进" },
  { id:8,  name:"力量",    nameEn:"Strength",         symbol:"∞", suit:"大阿卡纳", upright:"内在力量、温柔勇气、耐心影响、驯服本能", reversed:"自我怀疑、软弱退缩、恐惧压倒理性、失去信心" },
  { id:9,  name:"隐者",    nameEn:"The Hermit",       symbol:"🕯", suit:"大阿卡纳", upright:"独处反思、内在探索、寻找真相、引导他人", reversed:"过度孤立、拒绝帮助、迷失方向、逃避现实" },
  { id:10, name:"命运之轮",nameEn:"Wheel of Fortune", symbol:"☸", suit:"大阿卡纳", upright:"命运转折、好运来临、周期循环、接受变化", reversed:"厄运当头、抗拒改变、坏时机、无法掌控局势" },
  { id:11, name:"正义",    nameEn:"Justice",          symbol:"⚖", suit:"大阿卡纳", upright:"公平裁决、因果报应、真相显现、客观判断", reversed:"不公正待遇、逃避责任、欺骗掩盖、失衡偏颇" },
  { id:12, name:"倒吊人",  nameEn:"The Hanged Man",   symbol:"🔃", suit:"大阿卡纳", upright:"暂停等待、换个角度、自愿牺牲、放下执着", reversed:"拖延停滞、无谓牺牲、顽固不化、不肯放手" },
  { id:13, name:"死神",    nameEn:"Death",            symbol:"☠", suit:"大阿卡纳", upright:"重大转变、结束旧章、蜕变新生、不可逆的改变", reversed:"抗拒转变、死守过去、停滞腐朽、拒绝结束" },
  { id:14, name:"节制",    nameEn:"Temperance",       symbol:"✦", suit:"大阿卡纳", upright:"平衡调和、耐心等待、融合智慧、循序渐进", reversed:"极端失衡、缺乏节制、急功近利、内外矛盾" },
  { id:15, name:"恶魔",    nameEn:"The Devil",        symbol:"♅", suit:"大阿卡纳", upright:"物质束缚、阴暗面显现、执念上瘾、依附关系", reversed:"打破枷锁、觉醒自由、摆脱依附、重获掌控" },
  { id:16, name:"塔",      nameEn:"The Tower",        symbol:"⚡", suit:"大阿卡纳", upright:"突如其来的剧变、虚假崩塌、痛苦觉醒、强制清零", reversed:"避免灾难、延迟崩溃、内心动荡、小规模动乱" },
  { id:17, name:"星星",    nameEn:"The Star",         symbol:"✧", suit:"大阿卡纳", upright:"希望重燃、内心平静、疗愈更新、宇宙祝福", reversed:"绝望失望、信心崩塌、负面思想、封闭内心" },
  { id:18, name:"月亮",    nameEn:"The Moon",         symbol:"☽", suit:"大阿卡纳", upright:"深层直觉、潜意识浮现、幻象迷雾、恐惧梦境", reversed:"迷惑消散、恐惧释放、真相呈现、走出迷途" },
  { id:19, name:"太阳",    nameEn:"The Sun",          symbol:"☀", suit:"大阿卡纳", upright:"光明喜悦、活力成功、正向能量、真实自我绽放", reversed:"悲观消极、缺乏热情、过度天真、能量受阻" },
  { id:20, name:"审判",    nameEn:"Judgement",        symbol:"♆", suit:"大阿卡纳", upright:"觉醒呼唤、反思宽恕、人生转折点、终于放下", reversed:"自我批判、拒绝审视内心、错失觉醒机会" },
  { id:21, name:"世界",    nameEn:"The World",        symbol:"⊕", suit:"大阿卡纳", upright:"圆满完成、整合成就、宇宙连结、新旅程开端", reversed:"未竟之功、延迟完成、缺乏整合、接近终点却停步" },

  // ── 权杖（Wands）·火 ─────────────────────────────────────
  { id:22, name:"权杖王牌",nameEn:"Ace of Wands",     symbol:"🔥", suit:"权杖", upright:"激情点燃、新项目萌芽、创造力爆发、行动冲动", reversed:"创意受阻、延迟启动、缺乏方向、热情熄灭" },
  { id:23, name:"权杖二",  nameEn:"Two of Wands",     symbol:"🌐", suit:"权杖", upright:"规划未来、掌控全局、准备出发、充满抱负", reversed:"优柔寡断、计划落空、视野狭窄、惧怕改变" },
  { id:24, name:"权杖三",  nameEn:"Three of Wands",   symbol:"⛵", suit:"权杖", upright:"扩展视野、等待成果、海外机遇、信心前行", reversed:"延误受挫、计划出错、缺乏远见、回头路" },
  { id:25, name:"权杖四",  nameEn:"Four of Wands",    symbol:"🎊", suit:"权杖", upright:"庆祝丰收、家庭和谐、稳固根基、阶段完成", reversed:"家庭矛盾、庆祝被扰、根基不稳、临时性快乐" },
  { id:26, name:"权杖五",  nameEn:"Five of Wands",    symbol:"⚡", suit:"权杖", upright:"竞争角力、意见冲突、磨练成长、混乱中求突破", reversed:"避免冲突、压制矛盾、内耗消磨、竞争结束" },
  { id:27, name:"权杖六",  nameEn:"Six of Wands",     symbol:"🏆", suit:"权杖", upright:"公众认可、胜利凯旋、自信领导、成就获赏", reversed:"骄傲失败、得不到认可、自我怀疑、名声受损" },
  { id:28, name:"权杖七",  nameEn:"Seven of Wands",   symbol:"🛡", suit:"权杖", upright:"坚守立场、迎战挑战、顽强防御、不屈不挠", reversed:"被压垮、放弃防线、过度防御、疲于应战" },
  { id:29, name:"权杖八",  nameEn:"Eight of Wands",   symbol:"💫", suit:"权杖", upright:"快速推进、消息传递、旅行在即、事情加速", reversed:"延误受阻、消息混乱、节奏失调、慌乱仓促" },
  { id:30, name:"权杖九",  nameEn:"Nine of Wands",    symbol:"🔱", suit:"权杖", upright:"坚韧持守、伤痕中守护、快到终点、保持警觉", reversed:"精疲力竭、偏执多疑、放弃在即、伤口未愈" },
  { id:31, name:"权杖十",  nameEn:"Ten of Wands",     symbol:"⬛", suit:"权杖", upright:"重担压身、责任过载、全力冲刺终点、即将解脱", reversed:"无谓负担、不肯委托、崩溃边缘、卸下重担" },
  { id:32, name:"权杖侍从",nameEn:"Page of Wands",    symbol:"🌱", suit:"权杖", upright:"热情探索、好奇冒险、灵感涌现、年轻朝气", reversed:"急躁莽撞、三分钟热度、缺乏方向、消息混乱" },
  { id:33, name:"权杖骑士",nameEn:"Knight of Wands",  symbol:"🐎", suit:"权杖", upright:"充沛活力、大胆冲锋、魅力四射、行动果断", reversed:"冲动鲁莽、半途而废、脾气暴躁、方向混乱" },
  { id:34, name:"权杖皇后",nameEn:"Queen of Wands",   symbol:"🦁", suit:"权杖", upright:"自信独立、热情感召、魅力领导、勇敢表达", reversed:"嫉妒记仇、专横蛮横、自我中心、精力耗尽" },
  { id:35, name:"权杖国王",nameEn:"King of Wands",    symbol:"👑", suit:"权杖", upright:"远见领袖、激励他人、创业精神、果断有力", reversed:"专制傲慢、操纵冲动、眼高手低、权力滥用" },

  // ── 圣杯（Cups）·水 ──────────────────────────────────────
  { id:36, name:"圣杯王牌",nameEn:"Ace of Cups",      symbol:"🏺", suit:"圣杯", upright:"情感新生、深厚爱意、直觉开启、内心丰盈", reversed:"情感压抑、内心空洞、拒绝爱意、创伤未愈" },
  { id:37, name:"圣杯二",  nameEn:"Two of Cups",      symbol:"💞", suit:"圣杯", upright:"相互吸引、心灵契合、真挚伙伴、情感融合", reversed:"关系失衡、单方付出、误解隔阂、分手在即" },
  { id:38, name:"圣杯三",  nameEn:"Three of Cups",    symbol:"🥂", suit:"圣杯", upright:"友谊欢庆、社交圆满、共同庆祝、情感支持", reversed:"过度放纵、朋友间的背叛、聚会疏散、孤立感" },
  { id:39, name:"圣杯四",  nameEn:"Four of Cups",     symbol:"🌿", suit:"圣杯", upright:"内省冥想、对现状不满、错过机会、情感疲倦", reversed:"重新觉醒、接受新机会、走出冷漠、重燃热情" },
  { id:40, name:"圣杯五",  nameEn:"Five of Cups",     symbol:"😔", suit:"圣杯", upright:"悲伤失落、沉溺悲痛、只看损失、遗憾懊悔", reversed:"走出悲伤、接受失去、学会放手、看见希望" },
  { id:41, name:"圣杯六",  nameEn:"Six of Cups",      symbol:"🌸", suit:"圣杯", upright:"怀旧温情、童年记忆、纯真快乐、重逢故人", reversed:"过于怀旧、无法前进、沉溺过去、童年阴影" },
  { id:42, name:"圣杯七",  nameEn:"Seven of Cups",    symbol:"✨", suit:"圣杯", upright:"幻想迷思、选择太多、白日梦、欲望迷宫", reversed:"面对现实、清醒选择、排除幻觉、认清真相" },
  { id:43, name:"圣杯八",  nameEn:"Eight of Cups",    symbol:"🚶", suit:"圣杯", upright:"放弃已有、寻求更深意义、情感转折、离开舒适区", reversed:"放弃半途、逃避深度、留恋过去、回头犹豫" },
  { id:44, name:"圣杯九",  nameEn:"Nine of Cups",     symbol:"😊", suit:"圣杯", upright:"心愿达成、满足感爆棚、幸福临门、物质情感皆丰盈", reversed:"表面满足、内心空虚、自我放纵、愿望落空" },
  { id:45, name:"圣杯十",  nameEn:"Ten of Cups",      symbol:"🌈", suit:"圣杯", upright:"家庭和谐、情感圆满、幸福美满、爱的实现", reversed:"家庭矛盾、关系破裂、理想落空、表面和睦" },
  { id:46, name:"圣杯侍从",nameEn:"Page of Cups",     symbol:"🐠", suit:"圣杯", upright:"情感探索、创意直觉、温柔好奇、情感消息", reversed:"情绪化、不成熟、逃避现实、幻想过多" },
  { id:47, name:"圣杯骑士",nameEn:"Knight of Cups",   symbol:"🌊", suit:"圣杯", upright:"浪漫追求、情感使者、跟随内心、诗意理想主义", reversed:"情绪化、嫉妒不安、空洞承诺、逃避现实" },
  { id:48, name:"圣杯皇后",nameEn:"Queen of Cups",    symbol:"🌙", suit:"圣杯", upright:"情感智慧、同理共情、直觉强烈、温柔滋养", reversed:"情绪操控、依赖过强、不安全感、情感淹没" },
  { id:49, name:"圣杯国王",nameEn:"King of Cups",     symbol:"🌊", suit:"圣杯", upright:"情感成熟、智慧仁慈、温而有力、驾驭内心", reversed:"情绪压抑、冷漠操控、情感麻木、内心动荡" },

  // ── 宝剑（Swords）·风 ────────────────────────────────────
  { id:50, name:"宝剑王牌",nameEn:"Ace of Swords",    symbol:"🗡", suit:"宝剑", upright:"清晰突破、真相穿透、新想法、智慧锋芒", reversed:"混乱困惑、真相被压制、想法受阻、过度批判" },
  { id:51, name:"宝剑二",  nameEn:"Two of Swords",    symbol:"🙈", suit:"宝剑", upright:"僵局对峙、刻意回避、难以抉择、短暂的平衡", reversed:"真相显现、做出选择、打破僵局、混乱来临" },
  { id:52, name:"宝剑三",  nameEn:"Three of Swords",  symbol:"💔", suit:"宝剑", upright:"心碎悲痛、背叛伤害、失去的痛苦、必要的伤", reversed:"走出悲伤、宽恕疗愈、痛苦减轻、重新站起" },
  { id:53, name:"宝剑四",  nameEn:"Four of Swords",   symbol:"🛌", suit:"宝剑", upright:"休养恢复、暂时退出、冥想静心、保存力气", reversed:"精疲力竭、强撑支撑、重返战场、拒绝休息" },
  { id:54, name:"宝剑五",  nameEn:"Five of Swords",   symbol:"😤", suit:"宝剑", upright:"不光彩的胜利、冲突后的代价、自私获胜", reversed:"和解放下、承认失败、战后痊愈、空洞的胜利" },
  { id:55, name:"宝剑六",  nameEn:"Six of Swords",    symbol:"⛵", suit:"宝剑", upright:"离开困境、过渡转变、心理疗愈中、平静前行", reversed:"无处可逃、过渡受阻、旧伤重现、动荡中挣扎" },
  { id:56, name:"宝剑七",  nameEn:"Seven of Swords",  symbol:"🦊", suit:"宝剑", upright:"策略行动、单打独斗、有所隐瞒、聪明但不诚实", reversed:"良心归位、计划失败、坦白承认、摆脱欺骗" },
  { id:57, name:"宝剑八",  nameEn:"Eight of Swords",  symbol:"🔒", suit:"宝剑", upright:"自我囚禁、受困于思维、感到无助、恐惧限制行动", reversed:"解除束缚、重获自由、克服恐惧、破除心理枷锁" },
  { id:58, name:"宝剑九",  nameEn:"Nine of Swords",   symbol:"😰", suit:"宝剑", upright:"焦虑噩梦、深夜恐惧、过度忧虑、内心煎熬", reversed:"走出噩梦、寻求帮助、正视恐惧、焦虑减轻" },
  { id:59, name:"宝剑十",  nameEn:"Ten of Swords",    symbol:"🔚", suit:"宝剑", upright:"彻底结束、被击倒、最黑暗时刻、痛苦终结", reversed:"从谷底反弹、拒绝放弃、缓慢复原、不可避免的终结" },
  { id:60, name:"宝剑侍从",nameEn:"Page of Swords",   symbol:"💨", suit:"宝剑", upright:"好奇探索、警觉机敏、新想法、质疑一切", reversed:"口是心非、说话伤人、多管闲事、轻率鲁莽" },
  { id:61, name:"宝剑骑士",nameEn:"Knight of Swords", symbol:"🌪", suit:"宝剑", upright:"行动果断、直接冲锋、追求真相、思维敏锐", reversed:"冲动鲁莽、不顾后果、逞强好斗、偏激偏执" },
  { id:62, name:"宝剑皇后",nameEn:"Queen of Swords",  symbol:"❄", suit:"宝剑", upright:"独立清醒、直言不讳、智慧判断、不被情绪左右", reversed:"冷酷刻薄、以偏概全、苦涩尖锐、情感封闭" },
  { id:63, name:"宝剑国王",nameEn:"King of Swords",   symbol:"⚖", suit:"宝剑", upright:"理性权威、公正判断、智慧领导、原则清晰", reversed:"独裁冷酷、操控他人、滥用智识、偏执固执" },

  // ── 金币（Pentacles）·土 ─────────────────────────────────
  { id:64, name:"金币王牌",nameEn:"Ace of Pentacles",  symbol:"⬡", suit:"金币", upright:"物质新机、财富开端、繁荣种子、实际机遇", reversed:"错失良机、财富流失、不安全感、物质受阻" },
  { id:65, name:"金币二",  nameEn:"Two of Pentacles",  symbol:"🔄", suit:"金币", upright:"灵活应变、平衡多事、时间管理、游刃有余", reversed:"过度负担、失去平衡、管理混乱、手忙脚乱" },
  { id:66, name:"金币三",  nameEn:"Three of Pentacles",symbol:"🏗", suit:"金币", upright:"团队协作、技艺精进、工作认可、共同建造", reversed:"孤立作业、缺乏合作、技艺被忽视、目标不一" },
  { id:67, name:"金币四",  nameEn:"Four of Pentacles", symbol:"💰", suit:"金币", upright:"守财保全、稳固安全、掌控资源、守护边界", reversed:"吝啬囤积、物质执念、恐惧失去、放开掌控" },
  { id:68, name:"金币五",  nameEn:"Five of Pentacles", symbol:"❄", suit:"金币", upright:"物质匮乏、被孤立遗弃、经济困难、精神贫困", reversed:"走出困境、接受帮助、经济好转、找到支持" },
  { id:69, name:"金币六",  nameEn:"Six of Pentacles",  symbol:"🤲", suit:"金币", upright:"慷慨给予、善意分享、施与受的平衡、慈善回馈", reversed:"不平等施舍、附条件的帮助、欠债关系、自私吝啬" },
  { id:70, name:"金币七",  nameEn:"Seven of Pentacles",symbol:"🌱", suit:"金币", upright:"耐心等待收成、长期投资、评估成果、坚持付出", reversed:"急于求成、投资无回报、方向错误、放弃耕耘" },
  { id:71, name:"金币八",  nameEn:"Eight of Pentacles",symbol:"🔨", suit:"金币", upright:"专注精进、勤奋练习、工匠精神、持续学习", reversed:"浮躁急功、粗制滥造、缺乏专注、重复却无进步" },
  { id:72, name:"金币九",  nameEn:"Nine of Pentacles", symbol:"🍇", suit:"金币", upright:"独立自给、优雅富足、个人成就、享受自我", reversed:"过度依赖、财富受威胁、表面繁荣、自律不足" },
  { id:73, name:"金币十",  nameEn:"Ten of Pentacles",  symbol:"🏠", suit:"金币", upright:"家族传承、长久富裕、代际稳定、物质圆满", reversed:"家庭纷争、遗产纠纷、根基动摇、财富幻觉" },
  { id:74, name:"金币侍从",nameEn:"Page of Pentacles", symbol:"📚", suit:"金币", upright:"专注学习、新技能探索、实际梦想、踏实进步", reversed:"缺乏专注、好高骛远、学而不用、拖延不行动" },
  { id:75, name:"金币骑士",nameEn:"Knight of Pentacles",symbol:"🐂",suit:"金币", upright:"稳健可靠、有条不紊、忠诚负责、慢而扎实", reversed:"停滞不前、过度谨慎、墨守成规、无聊乏味" },
  { id:76, name:"金币皇后",nameEn:"Queen of Pentacles",symbol:"🌺", suit:"金币", upright:"实际温暖、物质滋养、照顾他人、家庭智慧", reversed:"过度保护、物质至上、工作与生活失衡、嫉妒心重" },
  { id:77, name:"金币国王",nameEn:"King of Pentacles", symbol:"🏔", suit:"金币", upright:"商业成就、物质丰盈、可靠支柱、稳健投资", reversed:"贪婪腐败、物质主义、固执守旧、金钱操控" },
];

// ═══════════════════════════════════════════════════════════
//  STATIC STAR POSITIONS
// ═══════════════════════════════════════════════════════════
const STARS = Array.from({ length: 130 }, (_, i) => ({
  id: i,
  x: (i * 137.508) % 100,
  y: (i * 97.31) % 100,
  size: 0.4 + (i % 6) * 0.4,
  opacity: 0.15 + (i % 8) * 0.1,
  duration: 2 + (i % 4),
  delay: i % 6,
}));

const Stars = () => (
  <div style={{ position:"fixed", top:0, left:0, right:0, bottom:0, overflow:"hidden", pointerEvents:"none", zIndex:0 }}>
    {STARS.map(s => (
      <div key={s.id} className="absolute rounded-full bg-white" style={{
        left: `${s.x}%`, top: `${s.y}%`,
        width: `${s.size}px`, height: `${s.size}px`,
        opacity: s.opacity,
        animation: `twinkle ${s.duration}s ease-in-out infinite`,
        animationDelay: `${s.delay}s`,
      }} />
    ))}
  </div>
);

// ═══════════════════════════════════════════════════════════
//  CARD COMPONENTS
// ═══════════════════════════════════════════════════════════
const CardFaceDown = ({ w = 68, h = 112, glowing = false }) => (
  <div style={{
    width: w, height: h, borderRadius: 9, flexShrink: 0,
    background: "linear-gradient(160deg,#1a0a2e 0%,#2d1b4e 50%,#150828 100%)",
    border: `1.5px solid rgba(212,175,55,${glowing ? 0.95 : 0.5})`,
    boxShadow: glowing
      ? "0 0 24px rgba(212,175,55,0.6), 0 6px 18px rgba(0,0,0,0.7)"
      : "0 3px 12px rgba(0,0,0,0.65)",
    position: "relative", overflow: "hidden",
    display: "flex", alignItems: "center", justifyContent: "center",
  }}>
    <div style={{ position:"absolute", inset:4, borderRadius:6, border:"1px solid rgba(212,175,55,0.18)" }} />
    <div style={{ fontSize:"1.2rem", filter:"drop-shadow(0 0 5px rgba(212,175,55,0.8))", color:"#d4af37" }}>✦</div>
    <div style={{ position:"absolute", top:4, left:5, fontSize:"0.4rem", color:"rgba(212,175,55,0.4)" }}>☽</div>
    <div style={{ position:"absolute", bottom:4, right:5, fontSize:"0.4rem", color:"rgba(212,175,55,0.4)" }}>☾</div>
    <div style={{ position:"absolute", top:4, right:5, fontSize:"0.38rem", color:"rgba(212,175,55,0.22)" }}>✧</div>
    <div style={{ position:"absolute", bottom:4, left:5, fontSize:"0.38rem", color:"rgba(212,175,55,0.22)" }}>✧</div>
  </div>
);

const CardFront = ({ card, position, delay = 0 }) => {
  const labels = ["过去", "现在", "未来"];
  const labelBg = ["rgba(139,92,246,0.35)", "rgba(212,175,55,0.35)", "rgba(236,72,153,0.35)"];
  const isRev = card.isReversed === true;
  const keywords = isRev ? card.reversed : card.upright;
  const W = 100;
  return (
    <div style={{ width:W, display:"flex", flexDirection:"column", alignItems:"center", animation:`cardReveal 0.75s cubic-bezier(0.34,1.3,0.64,1) forwards`, animationDelay:`${delay}s`, opacity:0 }}>
      <div style={{ textAlign:"center", marginBottom:6, width:"100%" }}>
        <span style={{
          fontSize:"0.65rem", letterSpacing:"0.08em", padding:"2px 8px", borderRadius:9999,
          background:labelBg[position], color:"#d4af37",
          border:"1px solid rgba(212,175,55,0.3)", fontFamily:"'Cinzel',serif",
        }}>{labels[position]}</span>
      </div>
      <div style={{
        width:W, height:160, borderRadius:10,
        background:"linear-gradient(135deg,#1a0a2e 0%,#2d1b4e 40%,#1e0d35 100%)",
        border:"2px solid rgba(212,175,55,0.85)",
        boxShadow:"0 0 30px rgba(147,51,234,0.45), 0 6px 18px rgba(0,0,0,0.7)",
        display:"flex", flexDirection:"column", alignItems:"center",
        justifyContent:"center", position:"relative", overflow:"hidden", padding:8,
        transform: isRev ? "rotate(180deg)" : "none",
      }}>
        <div style={{ position:"absolute", inset:4, borderRadius:7, border:"1px solid rgba(212,175,55,0.15)", pointerEvents:"none" }} />
        <div style={{ fontSize:"2rem", filter:"drop-shadow(0 0 10px rgba(212,175,55,0.9))", marginBottom:5 }}>{card.symbol}</div>
        <div style={{ color:"#d4af37", fontFamily:"'Cinzel',serif", fontSize:"0.65rem", fontWeight:700, textAlign:"center", lineHeight:1.3, textShadow:"0 0 8px rgba(212,175,55,0.5)" }}>{card.name}</div>
        <div style={{ color:"rgba(212,175,55,0.5)", fontSize:"0.5rem", textAlign:"center", marginTop:2 }}>{card.nameEn}</div>
        <div style={{ position:"absolute", bottom:5, color:"rgba(212,175,55,0.3)", fontSize:"0.5rem" }}>{card.suit}</div>
      </div>
      <div style={{ marginTop:6, textAlign:"center", width:"100%" }}>
        <span style={{
          fontSize:"0.6rem", padding:"1px 7px", borderRadius:9999,
          background: isRev ? "rgba(236,72,153,0.18)" : "rgba(212,175,55,0.18)",
          color: isRev ? "#f472b6" : "#d4af37",
          border:`1px solid ${isRev ? "rgba(236,72,153,0.4)" : "rgba(212,175,55,0.4)"}`,
        }}>{isRev ? "逆位" : "正位"}</span>
      </div>
      <div style={{ marginTop:4, textAlign:"center", width:"100%" }}>
        <p style={{ color:"rgba(212,175,55,0.65)", fontSize:"0.58rem", lineHeight:1.5, margin:0 }}>{keywords}</p>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════
//  SHUFFLE PILE
// ═══════════════════════════════════════════════════════════
const ShufflePile = ({ step }) => {
  const cards = Array.from({ length: 8 }, (_, i) => {
    const s = (step * 17 + i * 11) % 100;
    return { x: Math.sin(s * 0.2) * 11, y: Math.cos(s * 0.15) * 8, r: Math.sin(s * 0.1) * 20 };
  });
  return (
    <div style={{ position:"relative", width:90, height:148, margin:"0 auto" }}>
      {cards.map((o, i) => (
        <div key={i} style={{
          position:"absolute", top:0, left:0,
          transform:`translate(${o.x}px,${o.y}px) rotate(${o.r}deg)`,
          transition:"transform 0.2s ease", zIndex:i,
        }}>
          <CardFaceDown w={90} h={148} />
        </div>
      ))}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════
//  FAN DECK  —  upward arc, transformOrigin bottom-center
// ═══════════════════════════════════════════════════════════
const FanDeck = ({ total, selectedIndices, onSelect, spread, deckCards }) => {
  const [hovered, setHovered] = useState(null);
  const [previewing, setPreviewing] = useState(null); // 两步确认：预览中的牌index
  const FAN = 68;
  const R   = 200;
  const CARD_W = 26;
  const CARD_H = 42;

  const getTransform = (i) => {
    const t   = total <= 1 ? 0.5 : i / (total - 1);
    const deg = -FAN / 2 + t * FAN;
    const picked  = selectedIndices.includes(i);
    const isHov   = hovered === i && !picked;
    const isPrev  = previewing === i && !picked;
    const lift = picked ? 70 : (isHov || isPrev) ? 38 : 0;
    return { deg, lift };
  };

  const getStyle = (i) => {
    const picked  = selectedIndices.includes(i);
    const isHov   = hovered === i && !picked;
    const isPrev  = previewing === i && !picked;
    const maxed   = selectedIndices.length >= 3 && !picked;
    const { deg, lift } = getTransform(i);

    let scale = 1, zIndex = i + 1, glow = "none", brightness = 1;
    if (picked)              { scale = 1.12; zIndex = total + 30; glow = "0 0 28px rgba(212,175,55,1), 0 0 55px rgba(212,175,55,0.5)"; }
    else if (isPrev)         { scale = 1.15; zIndex = total + 20; glow = "0 0 32px rgba(147,51,234,1), 0 0 55px rgba(212,175,55,0.6)"; }
    else if (isHov)          { scale = 1.09; zIndex = total + 15; glow = "0 0 24px rgba(147,51,234,0.9), 0 0 44px rgba(212,175,55,0.35)"; }
    else if (maxed)          { brightness = 0.38; }

    const pivotDist = R - lift;
    return {
      position: "absolute",
      left: "50%",
      bottom: 0,
      width: CARD_W,
      height: CARD_H,
      marginLeft: -CARD_W / 2,
      transform: `rotate(${deg}deg) scale(${scale})`,
      transformOrigin: `50% calc(100% + ${pivotDist}px)`,
      zIndex,
      cursor: picked || maxed ? "default" : "pointer",
      transition: spread
        ? `transform 0.6s cubic-bezier(0.34,1.1,0.64,1) ${i * 10}ms, filter 0.22s, opacity 0.5s ${i * 10}ms`
        : "transform 0.18s ease, filter 0.18s",
      filter: `brightness(${brightness})`,
      boxShadow: glow,
      borderRadius: 9,
      opacity: spread ? 1 : 0,
      userSelect: "none",
    };
  };

  const containerH = 190;

  const handleCardClick = (i) => {
    if (selectedIndices.includes(i) || selectedIndices.length >= 3) return;
    if (previewing === i) {
      // 第二次点击 = 确认选中
      onSelect(i);
      setPreviewing(null);
    } else {
      // 第一次点击 = 预览
      setPreviewing(i);
    }
  };

  const previewCard = previewing !== null && deckCards ? deckCards[previewing] : null;

  return (
    <div style={{ position:"relative", width:"100%", height:containerH, overflowX:"hidden", overflowY:"visible" }}>
      {/* 预览弹窗 — 底部浮层，只显示序号和引导语，不透露牌面 */}
      {previewing !== null && !selectedIndices.includes(previewing) && (
        <div style={{
          position:"fixed", bottom:0, left:0, right:0, zIndex:9999,
          background:"linear-gradient(to top, rgba(13,6,32,0.98) 0%, rgba(13,6,32,0.92) 100%)",
          borderTop:"1px solid rgba(212,175,55,0.3)",
          padding:"20px 24px 36px",
          textAlign:"center",
          backdropFilter:"blur(12px)",
          animation:"fadeInUp 0.2s ease-out",
        }}>
          <div style={{ color:"rgba(212,175,55,0.5)", fontSize:"0.7rem", fontFamily:"'Cinzel',serif", letterSpacing:"0.2em", marginBottom:8 }}>
            第 {selectedIndices.length + 1} 张命运之牌
          </div>
          <div style={{ color:"#d4af37", fontFamily:"'Crimson Pro',serif", fontSize:"1.05rem", marginBottom:20, fontStyle:"italic" }}>
            你感受到它的召唤了吗？
          </div>
          <div style={{ display:"flex", justifyContent:"center", gap:12 }}>
            <button onClick={() => { onSelect(previewing); setPreviewing(null); }} style={{
              padding:"12px 28px", borderRadius:9999,
              background:"linear-gradient(135deg,rgba(212,175,55,0.25),rgba(147,51,234,0.25))",
              border:"1px solid rgba(212,175,55,0.7)", color:"#d4af37",
              fontFamily:"'Cinzel',serif", fontSize:"0.78rem", cursor:"pointer",
              boxShadow:"0 0 18px rgba(212,175,55,0.25)",
            }}>✦ 命运已定</button>
            <button onClick={() => setPreviewing(null)} style={{
              padding:"12px 24px", borderRadius:9999,
              background:"transparent",
              border:"1px solid rgba(212,175,55,0.2)", color:"rgba(212,175,55,0.45)",
              fontFamily:"'Cinzel',serif", fontSize:"0.75rem", cursor:"pointer",
            }}>再感受一下</button>
          </div>
        </div>
      )}

      {Array.from({ length: total }, (_, i) => {
        const picked = selectedIndices.includes(i);
        const { deg } = getTransform(i);
        return (
          <div
            key={i}
            style={getStyle(i)}
            onClick={() => handleCardClick(i)}
            onMouseEnter={() => { if (!picked) setHovered(i); }}
            onMouseLeave={() => setHovered(null)}
          >
            <CardFaceDown w={CARD_W} h={CARD_H} glowing={picked || previewing === i} />
            {picked && (
              <>
                <div style={{
                  position:"absolute", inset:0, borderRadius:9,
                  border:"2px solid rgba(212,175,55,0.95)",
                  boxShadow:"inset 0 0 14px rgba(212,175,55,0.25)",
                  pointerEvents:"none",
                  animation:"selectedPulse 2s ease-in-out infinite",
                }} />
                <div style={{
                  position:"absolute", top:-11, left:"50%",
                  transform:`translateX(-50%) rotate(${-deg}deg)`,
                  width:18, height:18, borderRadius:"50%",
                  background:"linear-gradient(135deg,#d4af37,#f0d060)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:"0.55rem", fontWeight:"bold", color:"#1a0a2e",
                  boxShadow:"0 0 7px rgba(212,175,55,0.8)", pointerEvents:"none",
                }}>
                  {selectedIndices.indexOf(i) + 1}
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════
//  MAIN APP
// ═══════════════════════════════════════════════════════════
export default function TarotApp() {
  const [question, setQuestion]       = useState("");
  const [phase, setPhase]             = useState("input");
  const [deckCards, setDeckCards]     = useState([]);
  const [selectedIdx, setSelectedIdx] = useState([]);
  const [drawnCards, setDrawnCards]   = useState([]);
  const [spread, setSpread]           = useState(false);
  const [shuffleStep, setShuffleStep] = useState(0);
  const [reading, setReading]         = useState("");
  const [isLoadingReading, setIsLoadingReading] = useState(false);
  const [error, setError]             = useState("");
  const shuffleRef = useRef(null);

  // 选牌阶段锁住 body 滚动，其他阶段恢复
  useEffect(() => {
    if (phase === "picking") {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [phase]);

  const startShuffle = () => {
    if (!question.trim()) { setError("请先输入你的问题，让星象为你指引..."); return; }
    setError("");
    const deck = [...TAROT_CARDS].sort(() => Math.random() - 0.5).map(c => ({ ...c, isReversed: Math.random() > 0.5 }));
    setDeckCards(deck);
    setSelectedIdx([]);
    setSpread(false);
    setShuffleStep(0);
    setPhase("shuffling");
    let step = 0;
    shuffleRef.current = setInterval(() => {
      step++;
      setShuffleStep(step);
      if (step >= 9) {
        clearInterval(shuffleRef.current);
        setTimeout(() => { setSpread(true); setPhase("picking"); }, 280);
      }
    }, 200);
  };

  useEffect(() => () => clearInterval(shuffleRef.current), []);

  const handlePickCard = (idx) => {
    if (selectedIdx.includes(idx) || selectedIdx.length >= 3) return;
    const next = [...selectedIdx, idx];
    setSelectedIdx(next);
    if (next.length === 3) {
      setTimeout(() => { setDrawnCards(next.map(i => deckCards[i])); setPhase("reveal"); }, 950);
    }
  };

  const getReading = async () => {
    // 1. 防连点锁
    if (isLoadingReading) return;

    // 2. 环境变量读取（适配 Vercel）
    // 记得在 Vercel 后台设置的 Key 必须是：VITE_GEMINI_KEY
    const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_KEY;
    
    if (!GEMINI_API_KEY) {
      setReading("【系统错误】未检测到有效的 API Key。请确保在 Vercel 环境变量中配置了 VITE_GEMINI_KEY 并重新部署。");
      return;
    }

    // 2026年正式版配置
    const MODEL_ID = "gemini-2.5-flash"; 
    const API_URL = `https://generativelanguage.googleapis.com/v1/models/${MODEL_ID}:generateContent?key=${GEMINI_API_KEY}`;

    const posNames = ["过去（根源与背景）", "现在（当下核心）", "未来（走向与可能）"];
    const cardDesc = drawnCards.map((c, i) =>
      `第${i+1}张 - ${posNames[i]}：${c.name}（${c.suit}，${c.isReversed?"逆位":"正位"}）\n关键词：${c.isReversed ? c.reversed : c.upright}`
    ).join("\n\n");

    setIsLoadingReading(true);
    setPhase("reading");
    setReading("");

    try {
      // 3. 你的原版超强 Prompt（完整保留，绝不简略）
      const prompt = `你是一位睿智而温暖的塔罗牌占卜师，融合了东方玄学直觉与西方神秘学深度。

你的解读风格要求：
1. 语言保持神秘而诗意，但必须结合用户的具体问题，说"人话"，让人听得懂、有共鸣
2. 解读要深入具体，不能只罗列牌义关键词，要分析这张牌在这个问题背景下"真正在说什么"
3. 三张牌要形成叙事连贯的故事线：过去的根源如何影响了现在，现在的状态又指向怎样的未来
4. 每张牌的解读至少80字，整体解读不少于400字
5. 结合用户问题给出具体的、可执行的建议，而不是模糊的励志话
6. 如果牌面显示有挑战或困难，要坦诚说出来，但要给出转化的方向
7. 解读结构：
   - 开篇：简短点出三牌整体气场（30字内）
   - 【过去之牌】：深度解读（80-120字）
   - 【现在之牌】：深度解读（80-120字）
   - 【未来之牌】：深度解读（80-120字）
   - 【星辰寄语】：综合三牌，针对用户问题给出整合性的具体建议（100-150字）
8. 【格式强制要求】：禁止使用 Markdown 的加粗符号（即不要出现 ** 符号）。标题请统一使用中文方括号【】。
我的问题是：「${question}」

命运为我揭示了以下三张牌：

${cardDesc}

请结合我的问题和这三张牌，为我进行深入的解读。`;

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { 
            maxOutputTokens: 4000, // 💡 只有调到4000才能装下你这么高质量的长文解读
            temperature: 0.8,      // 保持灵性
            topP: 0.95
          }
        })
      });

      const data = await res.json();
      
      // 4. 报错排查逻辑
      if (res.status === 429) throw new Error("星辰正在休息（请求太快），请60秒后再试。");
      if (data.error) throw new Error(data.error.message);

      if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
        setReading(data.candidates[0].content.parts[0].text);
      } else {
        throw new Error("未能获取到解读内容，请尝试重新抽牌。");
      }
    } catch (err) {
      console.error("Gemini Error:", err);
      // 如果 Key 报错，这里会给出 Vercel 相关的友好提示
      setReading(`【启示中断】星辰的连结被迷雾干扰了：\n${err.message}`);
    } finally {
      setIsLoadingReading(false);
    }
  };

  const reset = () => {
    setPhase("input"); setQuestion(""); setDrawnCards([]);
    setDeckCards([]); setSelectedIdx([]); setSpread(false);
    setReading(""); setError(""); setShuffleStep(0);
  };

  return (
    <div style={{ minHeight:"100dvh", position:"relative", overflow:"hidden", overflowX:"hidden", maxWidth:"100vw", background:"radial-gradient(ellipse at 50% 0%,#1a0a3e 0%,#0d0620 40%,#050210 100%)" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Crimson+Pro:ital,wght@0,300;0,400;1,300&display=swap');
        @keyframes twinkle { 0%,100%{opacity:0.2;transform:scale(1)} 50%{opacity:1;transform:scale(1.3)} }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(26px)} to{opacity:1;transform:translateY(0)} }
        @keyframes glow { 0%,100%{box-shadow:0 0 18px rgba(147,51,234,0.4)} 50%{box-shadow:0 0 45px rgba(147,51,234,0.8),0 0 75px rgba(212,175,55,0.3)} }
        @keyframes cardReveal { from{opacity:0;transform:rotateY(80deg) scale(0.85)} to{opacity:1;transform:rotateY(0deg) scale(1)} }
        @keyframes selectedPulse { 0%,100%{box-shadow:inset 0 0 10px rgba(212,175,55,0.18);border-color:rgba(212,175,55,0.9)} 50%{box-shadow:inset 0 0 22px rgba(212,175,55,0.4);border-color:rgba(255,220,80,1)} }
        @keyframes cardFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
        .mystic-input { background:rgba(255,255,255,0.04); border:1px solid rgba(212,175,55,0.3); color:rgba(212,175,55,0.9); outline:none; transition:all 0.3s; font-family:'Crimson Pro',serif; font-size:1.1rem; }
        .mystic-input:focus { border-color:rgba(212,175,55,0.7); box-shadow:0 0 18px rgba(212,175,55,0.2),inset 0 0 8px rgba(212,175,55,0.05); }
        .mystic-input::placeholder { color:rgba(212,175,55,0.3); }
        * { box-sizing:border-box; }
        html { margin:0; padding:0; overflow:hidden; width:100%; height:100%; } body { margin:0; padding:0; overflow-x:hidden; overflow-y:auto; width:100%; position:relative; }
        textarea, input { -webkit-appearance:none; }
        .reading-text { font-family:'Crimson Pro',serif; font-size:1.05rem; line-height:2.1; color:rgba(220,200,255,0.88); white-space:pre-wrap; }
        ::-webkit-scrollbar{display:none} * { -ms-overflow-style:none; scrollbar-width:none; }
      `}</style>

      <Stars />
      {/* ambient orbs */}
      <div style={{ position:"fixed", pointerEvents:"none", top:"8%", left:"2%", width:320, height:320 }}>
        <div style={{ width:"100%", height:"100%", borderRadius:"50%", background:"radial-gradient(circle,rgba(147,51,234,0.13) 0%,transparent 70%)", filter:"blur(48px)" }} />
      </div>
      <div style={{ position:"fixed", pointerEvents:"none", bottom:"8%", right:0, width:280, height:280, overflow:"hidden" }}>
        <div style={{ width:"100%", height:"100%", borderRadius:"50%", background:"radial-gradient(circle,rgba(212,175,55,0.08) 0%,transparent 70%)", filter:"blur(60px)" }} />
      </div>

      <div style={{ position:"relative", zIndex:10, maxWidth:"460px", width:"100%", margin:"0 auto", padding:"20px 16px 16px", boxSizing:"border-box", ...((phase === "input" || phase === "shuffling") ? { minHeight:"100dvh", display:"flex", flexDirection:"column", justifyContent:"center" } : phase === "picking" ? { minHeight:"100dvh", display:"flex", flexDirection:"column", justifyContent:"flex-start", paddingTop:"8vh" } : {}) }}>

        {/* Header — always visible */}
        <div style={{ textAlign:"center", marginBottom:8, animation:"fadeInUp 1s ease-out forwards" }}>
          <div style={{ color:"rgba(212,175,55,0.5)", fontSize:"1rem", marginBottom:8 }}>✦ ✧ ✦</div>
          <h1 style={{ fontSize:"2.4rem", fontWeight:"bold", marginBottom:6,
            fontFamily:"'Cinzel',serif",
            background:"linear-gradient(135deg,#d4af37 0%,#f0d060 40%,#d4af37 60%,#b8860b 100%)",
            backgroundSize:"200% auto",
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
            animation:"shimmer 4s linear infinite", letterSpacing:"0.1em",
          }}>塔罗占卜</h1>
          <p style={{ color:"rgba(212,175,55,0.4)", fontFamily:"'Crimson Pro',serif", fontSize:"0.9rem", letterSpacing:"0.22em" }}>
            ARCANA DIVINATION · 78 CARDS
          </p>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:12, marginTop:10 }}>
            <div style={{ height:1, width:80, background:"linear-gradient(to right,transparent,rgba(212,175,55,0.45))" }} />
            <div style={{ color:"rgba(212,175,55,0.3)", fontSize:"0.6rem" }}>☽ ✦ ☾</div>
            <div style={{ height:1, width:80, background:"linear-gradient(to left,transparent,rgba(212,175,55,0.45))" }} />
          </div>
        </div>

        {/* ── INPUT ─────────────────────────────────────── */}
        {phase === "input" && (
          <div style={{ animation:"fadeInUp 0.8s ease-out 0.3s forwards", opacity:0 }}>
            <div style={{ borderRadius:16, padding:22, marginBottom:18, background:"rgba(255,255,255,0.025)", border:"1px solid rgba(212,175,55,0.2)", backdropFilter:"blur(10px)" }}>
              <label style={{ display:"block", fontSize:"0.82rem", marginBottom:12, textAlign:"center", letterSpacing:"0.14em", color:"rgba(212,175,55,0.6)", fontFamily:"'Cinzel',serif" }}>
                在星辰见证下，说出你心中的问题
              </label>
              <textarea className="mystic-input" style={{ width:"100%", borderRadius:12, padding:13, resize:"none", boxSizing:"border-box" }} rows={4}
                placeholder="我想了解关于感情/事业/人生的..."
                value={question} onChange={e => setQuestion(e.target.value)}
                onFocus={e => setTimeout(() => e.target.scrollIntoView({ behavior:"smooth", block:"center" }), 300)}
              />
              {error && <p style={{ textAlign:"center", marginTop:10, fontSize:"0.84rem", color:"rgba(236,72,153,0.8)", fontFamily:"'Crimson Pro',serif" }}>✦ {error} ✦</p>}
            </div>
            <div style={{ textAlign:"center" }}>
              <button onClick={startShuffle} style={{
                padding:"14px 52px", borderRadius:9999, letterSpacing:"0.2em",
                background:"linear-gradient(135deg,rgba(212,175,55,0.14) 0%,rgba(147,51,234,0.14) 100%)",
                border:"1px solid rgba(212,175,55,0.5)", color:"#d4af37",
                fontFamily:"'Cinzel',serif", fontSize:"0.85rem",
                animation:"glow 3s ease-in-out infinite", cursor:"pointer",
              }}>✦ 开始占卜 ✦</button>
            </div>
          </div>
        )}

        {/* ── SHUFFLING ─────────────────────────────────── */}
        {phase === "shuffling" && (
          <div style={{ textAlign:"center", animation:"fadeInUp 0.5s ease-out forwards" }}>
            <p style={{ color:"rgba(212,175,55,0.6)", fontFamily:"'Cinzel',serif", fontSize:"0.8rem", letterSpacing:"0.18em", marginBottom:48 }}>
              星辰正在排列，命运等待你的触碰……
            </p>
            <div style={{ display:"flex", justifyContent:"center", marginBottom:32 }}>
              <ShufflePile step={shuffleStep} />
            </div>
            <div style={{ display:"flex", justifyContent:"center", gap:7 }}>
              {Array.from({length:9},(_,i)=>(
                <div key={i} style={{
                  width:5, height:5, borderRadius:"50%",
                  background: i < shuffleStep ? "rgba(212,175,55,0.85)" : "rgba(212,175,55,0.18)",
                  transition:"background 0.18s, box-shadow 0.18s",
                  boxShadow: i < shuffleStep ? "0 0 6px rgba(212,175,55,0.6)" : "none",
                }}/>
              ))}
            </div>
          </div>
        )}

        {/* ── PICKING ───────────────────────────────────── */}
        {phase === "picking" && (
          <div style={{ animation:"fadeInUp 0.5s ease-out forwards" }}>
            {/* 文字提示 */}
            <div style={{ textAlign:"center", marginBottom:8 }}>
              <p style={{ color:"rgba(212,175,55,0.75)", fontFamily:"'Cinzel',serif", fontSize:"0.8rem", letterSpacing:"0.18em", margin:"0 0 5px 0" }}>
                从七十八张牌中，凭直觉选出{" "}
                <span style={{ color:"#d4af37", fontWeight:700 }}>{3 - selectedIdx.length}</span>{" "}张属于你的命运之牌
              </p>
              <p style={{ color:"rgba(212,175,55,0.32)", fontSize:"0.66rem", margin:0, fontFamily:"'Crimson Pro',serif", letterSpacing:"0.1em" }}>
                {selectedIdx.length === 0 && "悬停感受牌的能量 · 点击选择"}
                {selectedIdx.length === 1 && "✦ 第一张已定，继续选择"}
                {selectedIdx.length === 2 && "✦ 第二张已定，最后一张，慎重..."}
                {selectedIdx.length === 3 && "✦ 命运已定，正在揭示..."}
              </p>
            </div>
            {/* 牌组：fixed 固定在屏幕60%位置 */}
            <div style={{ position:"fixed", top:"50%", left:0, right:0, zIndex:30, pointerEvents:"none", transform:"translateY(-10%)" }}>
              <div style={{ pointerEvents:"auto" }}>
                <FanDeck
                  total={deckCards.length}
                  selectedIndices={selectedIdx}
                  onSelect={handlePickCard}
                  spread={spread}
                  deckCards={deckCards}
                />
              </div>
            </div>
          </div>
        )}

        {/* ── REVEAL ────────────────────────────────────── */}
        {phase === "reveal" && (
          <div>
            <p style={{ textAlign:"center", marginBottom:28, color:"rgba(212,175,55,0.6)", fontFamily:"'Cinzel',serif", fontSize:"0.8rem", letterSpacing:"0.18em", animation:"fadeInUp 0.5s ease-out forwards" }}>
              ✦ 命运三牌已揭示 ✦
            </p>
            <div style={{ display:"flex", justifyContent:"center", gap:10, flexWrap:"wrap", marginBottom:24 }}>
              {drawnCards.map((c,i) => <CardFront key={i} card={c} position={i} delay={i * 0.16} />)}
            </div>
            <div style={{ textAlign:"center", animation:"fadeInUp 0.6s ease-out 0.65s forwards", opacity:0 }}>
              <button onClick={getReading} disabled={isLoadingReading} style={{
                padding:"14px 52px", borderRadius:9999, letterSpacing:"0.2em",
                background:"linear-gradient(135deg,rgba(212,175,55,0.2) 0%,rgba(147,51,234,0.2) 100%)",
                border:"1px solid rgba(212,175,55,0.6)", color:"#d4af37",
                fontFamily:"'Cinzel',serif", fontSize:"0.85rem",
                animation:"glow 3s ease-in-out infinite",
                cursor: isLoadingReading ? "not-allowed" : "pointer",
                opacity: isLoadingReading ? 0.5 : 1,
              }}>✦ 解读天机 ✦</button>
            </div>
          </div>
        )}

        {/* ── READING ───────────────────────────────────── */}
        {phase === "reading" && (
          <div>
            <div style={{ display:"flex", justifyContent:"center", gap:10, flexWrap:"wrap", marginBottom:24 }}>
              {drawnCards.map((c,i) => <CardFront key={i} card={c} position={i} delay={0} />)}
            </div>
            <div style={{ borderRadius:16, padding:22, marginBottom:22,
              background:"rgba(255,255,255,0.025)", border:"1px solid rgba(147,51,234,0.3)",
              backdropFilter:"blur(10px)", animation:"fadeInUp 0.8s ease-out forwards",
              boxShadow:"0 0 40px rgba(147,51,234,0.1)",
            }}>
              <div style={{ textAlign:"center", marginBottom:20 }}>
                <span style={{ color:"rgba(212,175,55,0.6)", fontFamily:"'Cinzel',serif", fontSize:"0.72rem", letterSpacing:"0.25em" }}>✦ 星辰解读 ✦</span>
              </div>
              {isLoadingReading ? (
                <div style={{ textAlign:"center", padding:"36px 0" }}>
                  <div style={{ fontSize:"1.8rem", color:"rgba(212,175,55,0.8)", animation:"cardFloat 2s ease-in-out infinite", marginBottom:14 }}>✦</div>
                  <p style={{ color:"rgba(212,175,55,0.45)", fontFamily:"'Crimson Pro',serif", letterSpacing:"0.1em" }}>正在与星辰沟通，解读命运密语...</p>
                </div>
              ) : (
                <div className="reading-text">{reading}</div>
              )}
            </div>
            {!isLoadingReading && reading && (
              <div style={{ textAlign:"center", animation:"fadeInUp 0.8s ease-out 0.4s forwards", opacity:0 }}>
                <button onClick={reset} style={{
                  padding:"12px 40px", borderRadius:9999, letterSpacing:"0.15em",
                  background:"rgba(255,255,255,0.03)", border:"1px solid rgba(212,175,55,0.28)",
                  color:"rgba(212,175,55,0.55)", fontFamily:"'Cinzel',serif", fontSize:"0.78rem", cursor:"pointer",
                }}>重新占卜</button>
              </div>
            )}
          </div>
        )}

        <div style={{
          textAlign:"center",
          ...(phase === "picking"
            ? { position:"fixed", bottom:16, left:0, right:0, zIndex:20 }
            : { marginTop:40 })
        }}>
          <p style={{ color:"rgba(212,175,55,0.16)", fontSize:"0.62rem", letterSpacing:"0.22em", fontFamily:"'Cinzel',serif" }}>
            ☽ TAROT IS FOR ENTERTAINMENT · TRUST YOUR OWN WISDOM ☾
          </p>
        </div>
      </div>
    </div>
  );
}