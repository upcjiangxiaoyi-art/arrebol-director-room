
/*
 * Arrebol D 暗河红霞导演系统 v1.48.0｜ripple & GPT & Claude
 * v1.48.0 「云岫 · 留白」：浮窗周围的毛玻璃清掉（幕布不染色、不模糊，夜色壳体改实底）；浮窗重排——字标用高反差衬线、中文用细字重，总开关和页签不再套胶囊，收起的分节是目录式的一行，状态条是一道细霞线，台头一道水纹、小红珠几圈涟漪（提议 江「周围一圈毛玻璃清掉」「更有设计感一点，允许动 ui」；施工 Claude）
 * v1.47.1 「云岫」细处：对话气泡、蛐蛐小窗、楼里的剧场卡片、放大编辑框、滑杆顺一遍，小字的字距行距放松；修上一版带进来的夜色主题主按钮深字压深底、按钮折行、放大钮压字、吸顶页签上沿漏字（提议 江「包括 ui、文字排版、美感，仙气飘飘就好」；施工 Claude）
 * v1.47.0 浮窗换一层轻的皮「云岫」：标题与页签用宋体留字距、实边改淡边与淡出的细线、按钮收成细边胶囊、外壳加静态雾光；只改形不改色，七套配色照旧，不加模糊和动画（提议 江「改的仙气飘飘高级一点」；施工 Claude）
 * v1.46.1 改稿连带摘要与状态栏：正文改了，这一楼的摘要和状态栏也让她一起改、一起进预览、一起替换；状态栏按标签名认，可自己填（报告 江「霞改了原文，那摘要和状态栏也得改和替换」；施工 Claude）
 * v1.46.0 掌灯聊天位、执笔位与剧场位加 API 预设：下拉一选就切、不用每次敲 key；三个位共用一份预设单，导演和抽卡那边存好的也能直接选（提议 江「换 api 预设直接换」；施工 Claude）
 * v1.45.8–1.45.10 小红霞三份人设的措辞微调（提议 江；施工 Claude）
 * v1.45.7 改稿、蛐蛐、剧场三份人设对齐：屏幕前是书外的成年读者（不是剧情里的 user）；两个成年人愉快地讨论，艺术创作也不可能毫无边界和底线；读者问意见时可以给回复建议，走向一起商量（提议 江；施工 Claude）
 * v1.45.6 改稿小红霞人设重写：审美极高的高级改稿员、不是扮演者，读者让改就改；读者是书外的成年读者，不是剧情里的 user；在聊天里说「改吧」就自动动笔，交整楼全文、没改的逐字照抄、文笔一致、字数听读者的（报告与提议 江「她一直拒绝重写」；施工 Claude）
 * v1.45.5 红霞剧场加人设层：她是谁、文字要什么质感、排版要多好看，每一场都带着；能自己改，留空用出厂；规矩（不是正文、怎么输出、排版安全）仍由代码接管（提议 江「咱们剧场也有一个基础人设层吧」；施工 Claude）
 * v1.45.4 泊在避风塘顶栏里灯不亮的修复：两盏灯改成随文档流、不靠定位的画法，泊位里收在胶囊两头；红霞剧场加「打断」，等楼落定和请求挂着时都能断，重开浮窗状态行不丢（报告与提议 江；施工 Claude）
 * v1.45.3 浮标两盏灯一左一右：左边雾紫是导演，右边霞粉是剧场，挂在胶囊外侧；亮灯熄灯胶囊不再挪位；贴屏幕边时两盏一起收进胶囊两头（提议 江「他俩在浮标的一左一右就好啦」；施工 Claude）
 * v1.45.2 导演和剧场同时在跑时浮标并排亮两粒灯：左边雾紫是导演，右边霞粉是剧场；各自单独跑时灯的位置不变（提议 江「同时跑可以一左一右呀」；施工 Claude）
 * v1.45.1 剧场开演时浮标也亮灯：同一圈呼吸，小灯是霞粉色；灯按导演 / 剧场分别记账，谁跑完都不熄对方的（提议 江；施工 Claude）
 * v1.45.0 红霞剧场搬到自己的一页（第五个页签「剧场」），自己的 API 位「剧场位」：默认跟掌灯聊天位，也能借别人的或自己填，温度单独调（提议 江；施工 Claude）
 * v1.44.0 导演稿也静默上屏（只把稿接到楼尾，不重画整楼、不广播；认不出旧稿或老酒馆才走老路）；红霞剧场主题包导入 / 导出 / 清空 / 补回出厂；剧场支持 HTML / CSS 排版，上屏走酒馆自己的格式化与消毒（提议 江；施工 Claude）
 * v1.43.2 红霞剧场静默插入：只把那一块 DOM 接到画好的楼尾，不重画整楼、不广播 MESSAGE_UPDATED、绝不整聊天重载；存盘 1.5 秒合并一次；掌灯页不在眼前时不再每楼重算素材（报告 江「别让页面一抖、手机嗷嗷烫」；施工 Claude）
 * v1.43.1 随扩展附带可直接导入酒馆的剥离正则脚本 regex/arrebol-theater-strip.json（提议 江；施工 Claude）
 * v1.43.0 红霞剧场：每层助手正文落地后在楼尾插一场（弹幕 / 场外嗑瓜子 / Q 版四格 / 花絮 / 采访间 / 评论区，主题仓可自写，固定或随机），范围同掌灯；整段包在 details.arrebol-d-theater 里，配剥离正则（提议 江；施工 Claude）
 * v1.42.1 蛐蛐说完状态行收尾「#N 蛐蛐了一句 ✓」，不再停在「她在看…」（截图自查；施工 Claude）
 * v1.42.0 掌灯不设限：角色卡 / 世界书 / 人设全量、本篇与各楼原话不截、默认读全部未隐藏楼层、蛐蛐历史全带；自动蛐蛐去掉 max_tokens 400（思考模型把配额花在思考上正文为空就"不触发"），失败写进账，加「现在蛐蛐一句」手动键（提议 江；施工 Claude）
 * v1.41.9 掌灯对话框重开浮窗停在最顶上：重建面板时它还藏着、卷到底等于没卷，改为面板显示后再卷；回顶回底只管对话框；v1.41.2–1.41.8 整页落位那套全部撤掉恢复原样，分区顺序恢复（报告 江「我说的是框框里的内容」；施工 Claude）
 * v1.41.8 掌灯聊天区排到最前，打开就是对话区，不靠滚动（真机诊断：scrollTop 数值到位画面不动，WebKit 刚显示的固定容器老毛病）；滚动后踢一脚重绘；箭头换普通字符；诊断多记窗/体数量与屏幕中心归属（报告 江；施工 Claude）
 * v1.41.7 掌灯手动回顶 / 回底键：顶上那行旁边「⤓ 回底」、聊天区底下「⤒ 回顶」，不靠自动落位，浮窗与内嵌抽屉都有（提议 江；施工 Claude）
 * v1.41.6 掌灯落位诊断版：落位改以 scrollIntoView 为主、scrollTop 微调，九拍对到 2.5 秒，落位窗口内被拨回 0 当场设回；每一拍的想/得/容器高写在掌灯顶上那行 8 秒；台头显示版本号；滚动容器落位期间强制 scroll-behavior: auto（报告 江「依旧在最顶上」；施工 Claude）
 * v1.41.5 掌灯页开窗 / 切页一律落到对话区，不再依赖记忆：对话区顶上留 56px，聊天块装不下就让输入框和发送露在底边；分五拍落稳，用户一碰就收手（报告 江「还是不能自动回底」；施工 Claude）
 * v1.41.4 浮窗记位漏洞：关窗前一瞬的 scroll 事件经节流落到关窗之后，把记好的位置抹成 0，再开回顶；窗关着不记，开窗 420ms 后发现被拨回 0 再对一次（报告 江；施工 Claude）
 * v1.41.3 蛐蛐小窗不自动关：看完点「朕已阅」；没看的排队一条条看，导演提示插队关掉后摆回来（提议 江；施工 Claude）
 * v1.41.2 浮窗记位：关了再开、切页再切回来，落回上次停的地方（按锚点记，不怕上面长了短了）；掌灯页没记忆时直接落到对话区（报告 江「每次回到蛐蛐页面都在最顶上」；施工 Claude）
 * v1.41.1 掌灯按钮排布：发送独占一行、按高 48px；打断与清空退到下一行并排；改好给我在改稿模式里再单独一行（报告 江「发送和打断并排总误触」；施工 Claude）
 * v1.41.0 自动蛐蛐（可选，默认关）：新楼落地她自己随手发一条 60 字以内的吐槽，弹个小窗，写进蛐蛐账；每楼一次、重 roll 算新一版、楼还在出字就等、总开关关着不来；同角色连续消息合并（提议 江；施工 Claude）
 * v1.40.1 蛐蛐模式里「替换后自动清空本轮对话」那枚勾选收不起来：皮肤规则 display: inline-flex !important 比 .adr-lamp-hide 重，藏的规则按同一套写法往上压一级；真浏览器核对两端两模式（发现 Claude 截图自查；施工 Claude）
 * v1.40.0 掌灯蛐蛐模式：和朋友一起追剧——对话一把聊天一本账、不按楼分、不自动清，跟着剧情一楼一楼走，用户那句前标「剧情走到 #N 了」；只聊不改稿；改稿模式照旧（提议 江；施工 Claude）
 * v1.39.1 掌灯替换后自动清空本轮对话（默认开，可关）：这一楼改完了，下一次开口是新的指令；按钮改名「清空本轮对话」（提议 江；施工 Claude）
 * v1.39.0 小红霞掌灯：第四页纯聊天——看得见本篇原文、未隐藏楼层的摘要标签、角色卡/世界书/人设与基调；聊天位借统筹可自填，执笔位可另接主模型；「改好给我」按讨论重写这一楼，只换正文/摘要标签里面，原版留前一页 swipe（提议 江；施工 Claude）
 * v1.38.5 导演不抢半楼：3 分钟保险丝改为看证据（停止按钮亮着 / 最后一楼字数还在长）再降旗；漏事件时楼安静 4 秒才读；等生成写完的上限 3 → 20 分钟（报告 用户经江转达；施工 Claude）
 * v1.38.4 中途换聊天漏洞：导演等 API 期间换了角色卡，上一把的稿子会挂进新聊天并存成常驻浮动稿；现开跑记家、回稿对表、换聊天当场掐请求，自动检查与抽卡同防（报告 江；施工 Claude）
 * v1.38.3 运行状态条只留「轻触暂停」胶囊可点，整条不再吃触摸；v1.38.2 听岔了，× 挪回原位（报告 江；施工 Claude）
 * v1.38.2 台头按钮分家：× 挪到最左、☼ 独守最右，不再并排挤在右手拇指区；标题与 DOM 不动，只改 flex order（提议 江；施工 Claude）
 * v1.38.1 新一代 Claude 不收 temperature：官网直连一律摘掉；中转站见到那句 400 摘掉重试一次（报告 江；施工 Claude）
 * v1.38.0 A 社官网直连：浏览器直连头 anthropic-dangerous-direct-browser-access 过 CORS 预检；/v1/models 改 x-api-key；只对 anthropic.com 生效（报告 江「官网 API 拉不了」；施工 Claude）
 * v1.37.3 晴空粉霞标题珠：去掉宝蓝与红白斜分界，换成纯粉珍珠，不再像百事可乐（提议 江；施工 Claude）
 * v1.37.2 浮标再袖珍一号：60×22 → 42×15.4，再等比缩 30%，样子一概不动（提议 江；施工 Claude）
 * v1.37.1 浮标袖珍一号：76×28 → 60×22，整体等比缩小，比例、渐变、水波与动效一概不动（提议 江；施工 Claude）
 * v1.37.0 浮标动效开关：共享设置里一勾，水波、亮流、脉冲全停，给怀疑手机发烫的人做对比实验（提议 江；施工 波哥 Claude Fable 5.1）
 * v1.36.3 晴空粉霞主按钮、开关、计数条与浮标同调：粉为主、尾巴一点蓝，字色落墨（提议 江；施工 波哥 Claude Fable 5.1）
 * v1.36.2 晴空粉霞浮标重调：前四分之三都是粉，宝蓝只在尾巴上收一下，字色落墨（提议 江；施工 波哥 Claude Fable 5.1）
 * v1.36.1 test_stream.js 时序抖动修复：用完不关的收集器窗口堵住事件循环、基准线检查跑晚；段落结束关窗口、开窗清 localStorage（提议 江；施工 波哥 Claude Fable 5.1）
 * v1.36.0 第七套配色「晴空粉霞」：玫红压左上、纸白留中、宝蓝收右下，浮标同步（提议 江；施工 波哥 Claude Fable 5.1）
 * v1.35.0 第六套配色「莫兰迪烟粉」：烟粉铺面、炉灰点睛、木烟压影，浮标同步（提议 江；施工 波哥 Claude Fable 5.1）
 * v1.34.3 展开温度可调（默认 0.9）；出厂提示词加女性向言情锚点（提议 江；施工 波哥 Claude Fable 5.1）
 * v1.34.2 展开提示词改言情责编取向：事件卡是脊柱、合情理不玄乎、不另起线不加新人；此刻在前角色卡在后；温度 0.5（反馈 江；施工 波哥 Claude Fable 5.1）
 * v1.34.1 分幕只给事件不预设反应；分幕在耳边面板里露出来，能改、删、调序、追加、重新展开（提议 江；施工 波哥 Claude Fable 5.1）
 * v1.34.0 剧情展开推进：投卡时让独立 API 位的大模型先分析再把卡切成 N 幕，一回合只贴一幕（depth 0），回复位推进，走完自动结案（提议 江；施工 波哥 Claude Fable 5.1）
 * v1.33.0 浮标改版：去掉珠心／光环／日月，只留一条流淌的暗河；四段渐变 + 玻璃高光 + 两道漂流水波，五套配色各自上色（提议 江；施工 波哥 Claude Fable 5.1）
 * v1.32.0 第五套配色「暗河红霞」：Rose Ink #3A071F 打底、Powder Rose #E2A6BA 描边、Ivory Bloom 落字，深色组第二员，浮标同步（提议 江；施工 波哥 Claude Fable 5.1）
 * v1.31.0 第四套配色「天青如梦」：雾灰天青 #8DAEC3 压顶、如梦令陶土 #AD9484 收尾，浮窗／抽屉／编辑器／浮标同步（提议 江；施工 波哥 Claude Fable 5.1）
 * v1.30.0 基调仓：用户写下这局想玩什么，两位导演以它为第一要义压过角色卡；仓里存命名条目、出厂八条，这局用哪条存聊天文件（提议 江；施工 波哥 Claude Fable 5.1）
 * v1.29.4 NSFW 库投不出：只开 NSFW 时不再被降级闸拦成永远空过；唯一卡池／候选不问小眼睛；名单全 NSFW 不注入硬门；
 *          小眼睛被审核打回按情欲场面已开门在 NSFW 库内盲抽（报告：用户反馈经江转达；施工 波哥 Claude Fable 5.1）
 * v1.29.2 轻收纳：API / 预设折叠，重新对表提至进度下方，抽卡同样整理（ripple & GPT）
 * v1.29.1 秀气版：缩字号 / 字重 / 留白，恢复浮标流波；浮标只跟随面板日夜（ripple & GPT）
 * v1.29.0 雾珠月汐：界面光感与留白精修，浮标自动昼夜 / 跟随面板（ripple & GPT）
 * v1.28.0 顶部导演切换与进度，收纳共享设置，双主题 UI 精修（ripple & GPT）
 * v1.27.1 流式接收加开关：共享设置里一枚勾选框，默认开；关掉回到 stream:false 老路（提议 江；施工 波哥 Claude Fable 5.1）
 * v1.27.0 导演请求改流式接收：stream:true 逐块收 delta.content、思考只计数不进稿、120 秒改为两块之间的空闲闸；服务端回整份 JSON 时自动走老路（提议 江；施工 波哥 Claude Fable 5.1）
 * v1.26.1 放大编辑热修：整屏编辑器钉在 iOS 可视视口上，键盘弹出不再把它顶飞；手机上不自动弹键盘（报告 江；施工 波哥 Claude Fable 5.1）
 * v1.26.0 放大编辑：浮窗与抽屉里每个文字框右上角一枚 ⛶，点开整屏编辑器，确定回填并照常触发保存（提议 江；施工 波哥 Claude Fable 5.1）
 * v1.25.0 「琉璃暗河」换皮：浮窗与内嵌抽屉全套视觉重整（style.css 末位新层 + 壳体内联圆角/投影与悬浮球配色三处 JS 改值），
 *          DOM、ID、事件、存储、计数、注入、API 与抽卡管线一字未动（拍板 ripple；施工 波哥 Claude Fable 5.1）
 * v1.24.0 导演的记忆搬进聊天文件（chat_metadata 主档 + LS 镜像，老存档搬家一次）；计数显示只读；
 *          备份与 LS JSON 按原文缓存、悬浮球观察器只盯 body 一层（拍板 ripple；施工 波哥 Claude Fable 5.1）
 * v1.23.3 小眼睛答复额度 10/30 → 200，空答复时说明是思考吃光了额度（波哥 Claude Fable 5.1）
 * v1.23.2 全盘审读热修（审读与施工：波哥 Claude Fable 5.1）：冷却区 0 变 32 的 slice(-0)、兑现判定外泄 NSFW 卡面、
 *          择卡 NSFW 池只取前两个、注入不写 swipes、生命周期无互斥、自动触发旗子升晚、拍子按楼数建键、
 *          用户名递成角色名、每拍整聊天重载、稿子写进生成中的楼、/v1 硬补、esc 不转引号；细目见 CHANGELOG.md
 * v1.12.0 卡的生命周期：专属／通用／NSFW 三格各自勾选，三段抽；择池 API 并入预设机器；刷新不再覆盖编辑区（施工：波哥 Claude Fable 5）
 * v1.13.0 放养模式：手动放养自动归队——一键撕下当前导演稿，轮换照常走，到下个换稿点自动生成归队；双导演各自独立放养（施工：波哥 Claude Fable 5）
 * v1.13.1 DS 视野随节奏走：兑现判定回看范围挂钩半衰期、择池挂钩投卡间隔，不再钉死 4/6 轮；下限不缩水，上限 12 轮/8000 字（提议：ripple；施工：波哥 Claude Fable 5）
 * v1.13.2 口径免疫：计数改为数楼不数字，预设正则开关不再扳动导演节奏；离谱差值静默对齐由一次性改为常任守卫（报告：MoMo；施工：波哥 Claude Fable 5）
 * v1.14.0 改头换面第一刀：分析按钮二合一（补充指令空=普通分析）；进阶开关与校对诊断分层入抽屉且开合有记忆；一键横幅瘦身；圆/方开关形状语法；右缘留缝防误触（产品：ripple；施工：波哥 Claude Fable 5）
 * v1.14.1 人话文案包：全部按钮与开关说明改直白话，逐条经 ripple 批签，一个不驳回（文案：波哥；批签：ripple）
 * v1.14.2 命中区收身：开关 label 不再拉满整行，点击区只包住圆圈+文字，空白区不再误触（报告：ripple）
 * v1.16.3 删楼不罚楼：no-shrink 铁律误伤真删除，删楼即进度清零且被双重罚楼；现真删除时基准线随差值平移、进度原地保住，
 *          MESSAGE_DELETED 事件直连+轮询缩水兜底旧酒馆，抽卡小能手基准线同步位移；partial 小读数保护原样保留（报告：ripple；施工：波哥 Claude Fable 5）
 * v1.17.0 三仓库多选+一库一槽：仓库槽从单选下拉改为点选芯片可挂多副；库文本拼接入池，三段抽/张数统计零改动吃到多库；
 *          挂进某槽的库从其余槽候选剔除；旧单库存档归一成数组无痛迁移，改名/删除/导入全链路同步（提议：ripple；施工：波哥 Claude Fable 5）
 * v1.17.1 导入落点补漏：落点下拉无持久化，iOS 文件选择往返重绘面板即复位，"导入并挂载"静默落空；
 *          改为账号级落盘+导入读存档不读 DOM+双面板镜像（报告：ripple；施工：波哥 Claude Fable 5）
 * v1.17.2 落点管保存：用户直觉是"选落点→保存＝挂载"，工具迎合直觉——保存未挂载的库时按落点自动挂进仓库并启用；
 *          已挂载的库保持原位不搬家；回执明说挂载去向（三连现场报告：ripple；施工：波哥 Claude Fable 5）
 * v1.18.0 归属制：概念纠偏——"挂入"从"点亮启用"改为"放进箱子"。每副库有账号级永久归属，只出现在自家仓库格；
 *          点亮/熄灭降级为"这局用不用"的聊天级开关，熄灭不流放；未分箱库虚线显示、点亮即认箱，落点保存/导入即入住/搬家；
 *          老存档首次读取自动按当前点亮认箱（概念设计：ripple；施工：波哥 Claude Fable 5）
 * v1.19.2 小风铃不打断：日常剧情莫名冒 NSFW 卡，根因是防惯性——DS 连点同一池第 3 次即被强制踢去
 *          全仓库盲抽，三仓库均等下 1/3 落 NSFW（实测复现 33.1%）。三处修：
 *          ① 择池提示词加 NSFW 双向硬门（菜单无 NSFW 池则整段不注入）——不满足条件当它不在名单上；
 *             满足则必须选它，其余池一律不选（打断进行中的场面比选错池更严重），转场后退出；
 *          ② 防惯性由"全仓库盲抽"收为"同仓库内换池"，不再推翻 DS 的仓库判断，单池仓库自动空转；
 *          ③ 择池静态语境截断 4000→8000，让 DS 读得到角色卡/世界书里的准入调性（仅抽卡调用点，
 *             buildPreciseContext 本体与导演侧一字未动）。
 *          已知未堵：DS 抛错降级仍走全仓库盲抽（自检 mode 显示"择池降级盲抽"）；
 *          未开 NSFW 格时无"本拍不投"出口，场面仍可能被通用卡打断（报告：ripple；施工：五哥 Claude Opus 5）
 * v1.19.4 双导演分账热修：情感／统筹的开关与间隔变更只初始化本类型 baseline；
 *          修复全新状态下先操作一侧会顺手给另一侧落起点、导致另一侧晚开启却偷跑进度的问题。
 *          全量楼数、触发阈值、成功／失败结算、启动热修与剧情小风铃均不改。（排查与施工：ripple & GPT）
 * 抽屉内嵌稳定版：
 * - 情感导演 / 统筹 双页面
 * - 双 API / 双模型 / 双预设 / 双侧独立 API 档案
 * - 拉取模型
 * - 本地测试
 * - 直接分析
 * - 自动注入到当前聊天，下一轮可读到
 */

(function () {
    "use strict";

    var EXT = "arrebol-d-final-v1040-stable-settings";
    var ADR_D_VERSION = "1.48.0";   // 台头与抽屉标题显示用，升级后一眼看出浏览器跑的是不是新代码
    var EMOTION_PRESET = "你是 RP 情感导演。请阅读最近的聊天内容和用户补充信息，只分析情感曲线与人设稳定，不写正文。\n\n你需要判断：\n1. 当前关系阶段是什么。\n2. 情绪温度是否过热、过冷、空转或错拍。\n3. 角色是否出现 OOC 风险。\n4. 是否存在秒爱、秒软、秒承诺、隐藏深情化。\n5. 是否把照顾误写成占有，把心疼误写成告白。\n6. 是否过度代演用户的心理与选择。\n7. 当前角色根据人设应该如何承接情绪。\n8. 下一阶段情感应该升温、降温、维持、错拍，还是延迟。\n\n输出必须短，不超过 300 字。不要写分析过程。不要写正文。只给下一阶段情感方向，要给可执行动作与明确禁区。\n\n固定输出格式：\n【情感方向】\n……\n\n【人设边界】\n……\n\n【避免】\n……";
    var PLOT_PRESET = "你是 RP 剧组统筹。请阅读最近的聊天内容、跟组记录与投卡史，一次调用完成四件事，不写正文。\n\n一、派人：调度 NPC 进出场；把久未出场的冷板凳角色捞回场上；给最近投放的无专名事件卡选角——把「某人/口信/来客」铸成戏里真实存在的具体角色。\n二、顺场：检查转场衔接与叙事流畅，指出哪里硌牙、怎么顺。\n三、收线：盘点既有伏笔与已投的事件卡，点名哪条该兑现、哪条再压一压；撒出去的钩子不许无限堆积。\n四、急诊与验收：若因 NG 会诊被请来，先诊断重 roll 原因；若有此前指导，先用一两句评估执行情况。\n\n输出纪律（硬性）：每条意见必须带名字带条目——「让欠主角人情的老周把口信送到」合格；「推进剧情」「增加张力」这类纯口号视为不合格输出，禁止出现。\n不要替用户决定行动。不要写正文。不要写分析过程。输出必须短，不超过 350 字。\n\n固定输出格式：\n【派人】\n……\n\n【顺场】\n……\n\n【收线】\n……\n\n【本轮重点】\n……";
    // v1.10.0：红霞转岗统筹（派人/顺场/收线/急诊验收四职打包）。旧版预设原文留档，仅用于化石合并。
    var PLOT_PRESET_LEGACY = "你是 RP 剧情导演。请阅读最近的聊天内容和用户补充信息，只分析剧情推进、事件张力、伏笔与场景调度，不写正文。\n\n你需要判断：\n1. 当前剧情是否停滞、空转或重复。\n2. 场景是否需要推进、转场、插入事件、制造阻碍，还是维持压抑。\n3. 哪些伏笔可以轻轻回收，哪些伏笔不能急着揭开。\n4. NPC、环境、现实阻尼是否应该介入。\n5. 当前剧情的下一步应该发生什么“可执行事件”。\n6. 避免强行相遇、强行表白、强行救场、巧合堆叠。\n7. 不要替用户决定行动，只给世界和角色侧的推进方向。\n\n输出必须短，不超过 300 字。不要写正文。不要写分析过程。只给下一阶段剧情方向。\n\n固定输出格式：\n【剧情推进】\n……\n\n【事件抓手】\n……\n\n【避免】\n……";
    var DEFAULTS = {
        activeTab: "emotion",
        masterEnabled: true,
        autoInjectEmotion: true,
        autoInjectPlot: true,
        injectMode: "visible",
        showFloatingWindow: true,
        fabMotion: true,            // v1.37.0 浮标动效开关：关掉后水波与亮流全停，给怀疑手机发烫的人做实验
        themePalette: "",          // dusk / sunset / pearl / celadon / wine / morandi / skyrose; empty migrates the previous light switch.
        dawnTheme: false,           // v1.14.4 开灯：浮窗朝霞浅色皮，默认关（暗河红霞）
        showAutoTriggerPopup: true,
        streamEnabled: true,        // v1.27.1 导演请求流式接收；中转站不支持流式时可关
        cdExpandEnabled: false,     // v1.34.0 剧情展开推进：投卡时切成 N 幕、一回合一幕
        cdExpandN: 5,
        cdExpandPer: 1,
        cdExpandNsfw: false,
        cdExpandTemp: 0.9,          // v1.34.3 展开温度，可调
        expandApiEndpoint: "",
        expandApiKey: "",
        expandModel: "",
        expandPreset: "",
        directorLogEnabled: true,
        ngDetectEnabled: true,
        floatInjectEnabled: true,
        floatDepth: 2,
        fabLeft: null,
        fabTop: null,
        autoTriggerEmotion: false,
        autoTriggerPlot: false,
        autoTriggerEmotionRange: "20",
        autoTriggerPlotRange: "20",
        autoTriggerEmotionCustomRange: 0,
        autoTriggerPlotCustomRange: 0,
        lastAutoTriggerChatKey: "",
        lastAutoTriggerEmotionCount: -1,
        lastAutoTriggerPlotCount: -1,

        range: "30",
        customRange: 0,
        supplementMemory: "",
        contentTagNames: "content",

        emotionApiEndpoint: "",
        emotionApiKey: "",
        emotionModel: "",
        emotionPreset: EMOTION_PRESET,
        emotionPreview: "",

        plotApiEndpoint: "",
        plotApiKey: "",
        plotModel: "",
        plotPreset: PLOT_PRESET,
        plotPreview: "",

        // v1.10.0 抽卡剧情小能手（账号级；卡库本体走 adrCdLibraries() 懒初始化，避免 DEFAULTS 对象引用共享；
        // cdEnvelope 空串表示使用出厂信封 ADR_CD_DEFAULT_ENVELOPE）
        cdEnabled: false,
        cdN: 5,
        cdCooldown: 8,
        cdDepth: 2,
        cdMode: "blind",
        // v1.11 三仓库槽的账号级默认值（新聊天开局继承这一份；聊天级覆盖存 chat_metadata）
        cdSlotDefaults: null,
        cdSlotOnDefaults: null,
        cdEnvelope: "",
        cdEnvelopeFaded: "",
        // v1.12 卡的生命周期
        cdEnvelopes: null,          // 信封预设仓库（懒初始化，避免 DEFAULTS 对象引用共享）
        cdEnvelopeCurrent: "标准",
        cdHalfLife: true,           // 旧字段：v1.20 起由 cdLifeMode 统辖，仅作镜像保留给旧读法
        // 注意：cdLifeMode 故意不写进 DEFAULTS。settings() 会给任何缺失字段补默认值，
        // 一补上就盖住了"老存档没有这个字段 → 看 cdHalfLife 迁移"这条路。缺省值由 adrCdLifeMode() 现算。
        cdAutoDone: false,          // 到半衰期时问一次小眼睛「兑现没」，默认关（要花钱）
        cdApiEndpoint: "",
        cdApiKey: "",
        cdModel: "deepseek-chat",

        // v1.39.0 小红霞掌灯：聊天位默认借统筹、执笔位默认跟聊天位；都能自己填。预设留空用出厂。
        lampBorrow: "plot",
        penBorrow: "lamp",
        lampApiEndpoint: "",
        lampApiKey: "",
        lampModel: "",
        penApiEndpoint: "",
        penApiKey: "",
        penModel: "",
        lampPreset: "",
        lampSummaryTags: "report",
        lampStatusTags: "status,StatusBlock,状态栏",   // v1.46.1 改稿时状态栏跟着正文一起更新；多个用逗号分隔，留空＝不管状态栏
        lampSummaryFloors: 60,
        lampTemp: 0.8,
        lampResetAfterApply: true,  // v1.39.1 替换后这轮对话自动清空：这一楼改完了，下一次开口是新的指令
        lampMode: "edit",           // v1.40.0 edit 改稿 / gossip 蛐蛐（一起追剧，不清空，只聊不改）
        lampGossipPreset: "",
        lampAutoQuip: false,        // v1.41.0 新楼落地自动蛐蛐一句并弹小窗（走聊天位 API，花钱，默认关）
        // v1.43.0 红霞剧场：每层楼尾插一场。主题仓 theaterStore 走懒初始化（同基调仓），不放这里免得对象引用共享
        theaterEnabled: false,
        theaterPick: "fixed",       // fixed 固定用选中的 / random 每层随机抽
        theaterCurrent: "",
        theaterFold: false,
        theaterRich: true,          // v1.44.0 允许 HTML / CSS 排版（主题点名要排版时才用；关掉就一律纯文本）
        // v1.45.0 剧场搬到自己的页，自己的 API 位：默认跟掌灯聊天位，也能借别人的或自己填
        theaterBorrow: "lamp",
        stageApiEndpoint: "",
        stageApiKey: "",
        stageModel: "",
        theaterTemp: 0.9,
        theaterPersona: ""          // v1.45.5 剧场人设层：留空用出厂；规矩（不是正文、怎么输出、排版安全）由代码接管，不在这里
    };

    var initialized = false;
    var processing = false;
    var aborter = null;
    var adrDAbortWasManual = false;
    // v1.38.4：导演开跑时记下"家"在哪把聊天。中途换了聊天，稿子不挂、浮动稿不贴、请求能掐就掐。
    var adrDRunChatKey = "";
    var adrDAbortWasChatSwitch = false;

    // v1.9.26：自动触发失败保拍后的首报/退避状态。
    // 只服务于“这一拍没结算时稍后重试”，不参与 baseline 数学。
    var adrDAutoFailureReportedByBeat = {};
    var adrDAutoRetryByBeat = {};
    var ADR_D_AUTO_RETRY_DELAYS = [45000, 90000, 120000, 180000];

    var ADR048_FAB_REGISTRY_KEY = "__arrebolD_fab_owner_v1922__";
    var ADR048_FAB_INSTANCE_ID = "adr048-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8);

    function rootWin() {
        try {
            if (window.top && window.top.document) return window.top;
        } catch (e) {}
        return window;
    }

    function rootDoc() {
        try {
            var w = rootWin();
            if (w && w.document) return w.document;
        } catch (e) {}
        return document;
    }

    function ctx() {
        return SillyTavern.getContext();
    }

    function q(sel) {
        var d = rootDoc();
        try {
            var el = d.querySelector(sel);
            if (el) return el;
        } catch (e) {}
        try { return document.querySelector(sel); } catch (e2) {}
        return null;
    }

    function esc(s) {
        var d = rootDoc();
        var div = d.createElement("div");
        div.textContent = s == null ? "" : String(s);
        // v1.23.2：textContent→innerHTML 只转义 & < >，不转义引号。
        // 库名会进 value="…" 和 data-adrcd-lib="…"，含引号就把属性撕开了。
        return div.innerHTML.replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    }


    var ADR_D_LOCAL_BACKUP_KEY = "arrebol_d_settings_stable_v1";
    var ADR_D_OLD_BACKUP_KEYS = [
        "arrebol_d_final_v1035_settings_backup",
        "arrebol_d_final_v1036_settings_backup",
        "arrebol_d_final_v1037_settings_backup",
        "arrebol_d_final_v1038_settings_backup",
        "arrebol_d_final_v1039_settings_backup",
        "arrebol_d_final_v1035_save_fix_settings_backup",
        "arrebol_d_final_v1036_fold_br_fix_settings_backup",
        "arrebol_d_final_v1037_mystery_sync_fix_settings_backup",
        "arrebol_d_final_v1038_comment_only_inject_settings_backup",
        "arrebol_d_final_v1039_plain_marker_inject_settings_backup"
    ];

    // v1.24.0：备份解析结果按原文缓存。此前每次 settings() 都 getItem + JSON.parse 一整份备份
    //（含整套卡库），一次面板刷新调几十次，手机上翻面板那一下的黏就有它一份。
    var adrDBackupCache = { raw: null, obj: null };

    function adrDLoadLocalBackup() {
        try {
            var raw = rootWin().localStorage.getItem(ADR_D_LOCAL_BACKUP_KEY);
            if (raw) {
                if (raw === adrDBackupCache.raw && adrDBackupCache.obj) return adrDBackupCache.obj;
                var obj = JSON.parse(raw);
                obj = obj && typeof obj === "object" ? obj : {};
                adrDBackupCache = { raw: raw, obj: obj };
                return obj;
            }

            // 迁移旧版备份：以后升级插件不再丢 API / 模型 / 预设。
            for (var i = 0; i < ADR_D_OLD_BACKUP_KEYS.length; i++) {
                var oldRaw = rootWin().localStorage.getItem(ADR_D_OLD_BACKUP_KEYS[i]);
                if (!oldRaw) continue;
                try {
                    var oldObj = JSON.parse(oldRaw);
                    if (oldObj && typeof oldObj === "object") {
                        rootWin().localStorage.setItem(ADR_D_LOCAL_BACKUP_KEY, JSON.stringify(oldObj));
                        return oldObj;
                    }
                } catch (e0) {}
            }
        } catch (e) {}
        return {};
    }

    function adrDSaveLocalBackup(obj) {
        try {
            rootWin().localStorage.setItem(ADR_D_LOCAL_BACKUP_KEY, JSON.stringify(obj || {}));
            adrDBackupCache = { raw: null, obj: null };   // 下次读时重新解析一次即可
        } catch (e) {}
    }

    // v1.24.0：备份只在同一份设置对象上合并一次。合并过之后缺失字段已经补齐，再读备份是白读；
    // 酒馆若整个换掉设置对象（重新从服务器载入），会是一个新对象，自然再合并一次。
    var adrDBackupMergedInto = (typeof WeakSet === "function") ? new WeakSet() : null;

    function settings() {
        var c = ctx();
        if (!c.extensionSettings[EXT]) c.extensionSettings[EXT] = {};

        var st = c.extensionSettings[EXT];
        var needMerge = !adrDBackupMergedInto || !adrDBackupMergedInto.has(st);

        if (needMerge) {
            var backup = adrDLoadLocalBackup();
            if (backup && typeof backup === "object") {
                for (var bk in backup) {
                    // 只在字段真正缺失时从本地备份恢复。
                    // 空字符串是用户主动清空文本框/API/模板的合法值，不能被旧备份“复活”。
                    if (st[bk] === undefined) {
                        st[bk] = backup[bk];
                    }
                }
            }
            if (adrDBackupMergedInto) adrDBackupMergedInto.add(st);
        }

        for (var k in DEFAULTS) {
            if (st[k] === undefined) st[k] = DEFAULTS[k];
        }
        if (!st.emotionPreset) st.emotionPreset = EMOTION_PRESET;
        if (!st.plotPreset) st.plotPreset = PLOT_PRESET;
        // v1.10.0：统筹转岗化石合并。存量若与旧默认逐字相同，就地升级；用户自改过的预设一律不动。
        if (st.plotPreset === PLOT_PRESET_LEGACY) st.plotPreset = PLOT_PRESET;
        // v1.9.29：注入方式化石合并。hidden 与 folded 自统一以来行为完全一致，存量值就地迁移。
        if (st.injectMode === "hidden") st.injectMode = "folded";
        return st;
    }

    function save(key, val) {
        try {
            settings()[key] = val;
            var c = ctx();
            if (typeof c.saveSettingsDebounced === "function") c.saveSettingsDebounced();
        } catch (e) {}
    }

    function saveNow() {
        try { adrDSaveLocalBackup(settings()); } catch (e0) {}

        try {
            var c = ctx();
            if (typeof c.saveSettings === "function") c.saveSettings();
            if (typeof c.saveSettingsDebounced === "function") c.saveSettingsDebounced();
        } catch (e) {}
    }

    // v1.9.29：状态行内存暂存。浮窗每次打开都会拆除重建 DOM，
    // 分析中/完成/失败的状态文字与按钮禁用态原本只活在旧 DOM 里，重建即失忆。
    var adrDLastStatus = { emotion: null, plot: null };

    function status(type, text, color) {
        try {
            adrDLastStatus[prefixOf(type)] = { text: String(text || ""), color: color || "" };
        } catch (eStore) {}
        var el = qForm("adr044-" + type + "-status");
        if (el) {
            el.textContent = text;
            if (color) el.style.color = color;
        }
    }

    function adrDRestorePanelRuntimeState() {
        // 重建面板后回灌：状态行文字 + 按钮禁用态（processing 是全局真值，直接重放即可）。
        try {
            ["emotion", "plot"].forEach(function (t) {
                var s = adrDLastStatus[t];
                if (!s || !s.text) return;
                Array.prototype.slice.call(rootDoc().querySelectorAll("#adr044-" + t + "-status")).forEach(function (el) {
                    if (!el) return;
                    el.textContent = s.text;
                    if (s.color) el.style.color = s.color;
                });
            });
        } catch (e1) {}
        try { setButtons(currentType()); } catch (e2) {}
    }

    function adrDToast(msg) {
        // v1.9.0：收尾兜底。提示函数绝不允许反向拖崩保存流程。
        try {
            var text = String(msg || "");
            var root = (typeof window !== "undefined") ? window : globalThis;
            var t = root && root.toastr;
            if (t && typeof t.success === "function") { t.success(text); return; }
            if (t && typeof t.info === "function") { t.info(text); return; }
            try { status("emotion", text, "#8ed99d"); } catch (e1) {}
            try { status("plot", text, "#8ed99d"); } catch (e2) {}
            try { console.log("[Arrebol D] " + text); } catch (e3) {}
        } catch (e) {}
    }

    function adrDAutoTriggerPopup(items, count) {
        // v1.9.4：自动分析开始瞬间给用户一个非阻塞提示，避免分析未完成前过快输入。
        // 只做页面提示，不改变计数、触发、注入、API 调用逻辑。
        try {
            var d = rootDoc();
            if (!d || !d.body) return;

            var list = Array.isArray(items) ? items : [];
            var names = list.map(function (it) { return labelOf(it && it.type); }).filter(Boolean).join("、") || "小红霞";
            var old = d.getElementById("adr044-auto-trigger-popup");
            if (old && old.parentNode) old.parentNode.removeChild(old);

            var box = d.createElement("div");
            box.id = "adr044-auto-trigger-popup";
            box.setAttribute("role", "status");
            box.setAttribute("aria-live", "polite");
            box.innerHTML = ''
                + '<div class="adr044-auto-trigger-popup-title">小红霞开始自动分析</div>'
                + '<div class="adr044-auto-trigger-popup-text">' + esc(names) + '已到触发轮次，正在读取上下文。分析完成前先别太快输入，等注入完成更稳。</div>'
                + '<button type="button" class="adr044-auto-trigger-popup-close" aria-label="关闭提示">×</button>';

            d.body.appendChild(box);

            var close = box.querySelector(".adr044-auto-trigger-popup-close");
            if (close) {
                close.addEventListener("click", function () {
                    try { if (box && box.parentNode) box.parentNode.removeChild(box); } catch (eClose) {}
                    try { adrLampQuipPopupShow(); } catch (eQuipBack2) {}   // v1.41.3
                });
            }

            try {
                box.setAttribute("data-open", "1");
            } catch (eOpen) {}

            setTimeout(function () {
                try {
                    if (!box || !box.parentNode) return;
                    box.setAttribute("data-open", "0");
                    setTimeout(function () {
                        try { if (box && box.parentNode) box.parentNode.removeChild(box); } catch (eRemove) {}
                        try { adrLampQuipPopupShow(); } catch (eQuipBack) {}   // v1.41.3 没看完的蛐蛐摆回来
                    }, 260);
                } catch (eTimeout) {}
            }, 12000);

            try { console.log("[Arrebol D] auto analysis popup", names, "count=", count); } catch (eLog) {}
        } catch (e) {}
    }


    function adrDPopupMessage(title, text, kind) {
        // v1.9.26：复用自动触发提示组件显示失败首报；失败告警不受“开始分析提示”开关控制。
        try {
            var d = rootDoc();
            if (!d || !d.body) return;
            var old = d.getElementById("adr044-auto-trigger-popup");
            if (old && old.parentNode) old.parentNode.removeChild(old);

            var box = d.createElement("div");
            box.id = "adr044-auto-trigger-popup";
            box.setAttribute("role", "status");
            box.setAttribute("aria-live", "polite");
            box.setAttribute("data-kind", kind || "info");
            box.innerHTML = ''
                + '<div class="adr044-auto-trigger-popup-title">' + esc(title || "小红霞提示") + '</div>'
                + '<div class="adr044-auto-trigger-popup-text">' + esc(text || "") + '</div>'
                + '<button type="button" class="adr044-auto-trigger-popup-close" aria-label="关闭提示">×</button>';
            d.body.appendChild(box);

            var close = box.querySelector(".adr044-auto-trigger-popup-close");
            if (close) {
                close.addEventListener("click", function () {
                    try { if (box && box.parentNode) box.parentNode.removeChild(box); } catch (eClose) {}
                    try { adrLampQuipPopupShow(); } catch (eQuipBack2) {}   // v1.41.3
                });
            }
            try { box.setAttribute("data-open", "1"); } catch (eOpen) {}
            setTimeout(function () {
                try {
                    if (!box || !box.parentNode) return;
                    box.setAttribute("data-open", "0");
                    setTimeout(function () {
                        try { if (box && box.parentNode) box.parentNode.removeChild(box); } catch (eRemove) {}
                        try { adrLampQuipPopupShow(); } catch (eQuipBack) {}   // v1.41.3 没看完的蛐蛐摆回来
                    }, 260);
                } catch (eTimeout) {}
            }, kind === "error" ? 18000 : 12000);
        } catch (e) {}
    }

    function adrDAutoFailureMessage(kind, type, detail) {
        var label = labelOf(type);
        var tail = "这一拍不会被结算，小红霞会稍后自动重试。";
        if (kind === "timeout") {
            return {
                title: "小红霞请求超时",
                text: "【" + label + "】API 长时间未返回，可能是中转站、网络或模型响应过慢。" + tail
            };
        }
        if (kind === "inject") {
            return {
                title: "小红霞自动注入失败",
                text: "【" + label + "】分析已完成，但没有成功写入当前助手楼。" + tail + "如果持续出现，请检查聊天楼层状态。"
            };
        }
        if (kind === "save") {
            return {
                title: "小红霞保存注入失败",
                text: "【" + label + "】分析和写入已完成，但聊天保存返回失败。" + tail + "请检查网络或稍后重试。"
            };
        }
        return {
            title: "小红霞自动分析失败",
            text: "【" + label + "】可能是 API Key、余额、Endpoint、中转站、网络或模型返回异常。" + tail + (detail ? "\n原因：" + String(detail).slice(0, 120) : "")
        };
    }

    function adrDReportFailure(kind, type, detail, beatKey) {
        // 自动触发：同一待结算拍子只首报一次；手动触发：每次失败都可提示。
        try {
            if (beatKey) {
                if (adrDAutoFailureReportedByBeat[beatKey]) return;
                adrDAutoFailureReportedByBeat[beatKey] = Date.now();
                var msg = adrDAutoFailureMessage(kind, type, detail);
                adrDPopupMessage(msg.title, msg.text, "error");
                return;
            }

            var label = labelOf(type);
            var title = "小红霞分析失败";
            var text = "【" + label + "】请检查 API Key、余额、Endpoint、中转站、网络或模型返回。" + (detail ? "\n原因：" + String(detail).slice(0, 120) : "");
            if (kind === "timeout") {
                title = "小红霞请求超时";
                text = "【" + label + "】API 长时间未返回，请检查中转站、网络或稍后重试。";
            } else if (kind === "inject") {
                title = "小红霞自动注入失败";
                text = "【" + label + "】分析完成，但没有成功写入当前助手楼。你可以手动复制，或检查当前聊天楼层状态。";
            } else if (kind === "save") {
                title = "小红霞保存注入失败";
                text = "【" + label + "】分析和写入已完成，但聊天保存返回失败。请检查网络或稍后重试。";
            }
            adrDPopupMessage(title, text, "error");
        } catch (e) {}
    }

    // v1.23.2：拍子按基准线建键，不按当前楼数。旧写法 count 每来一楼就变，
    // API 挂着的时候每一楼都是"新拍子"——首报弹窗每楼弹一次，退避每楼归零直接重试。
    // 同一条基准线到结算前只算一拍；结算成功基准线前移，键自然换新。
    function adrDAutoBeatKey(type, base, n) {
        return [adrDChatKey(), type === "plot" ? "plot" : "emotion", "base", Number(base) || 0, Number(n) || 0].join("::");
    }

    function adrDClearAutoBeatState(beatKey) {
        if (!beatKey) return;
        try { delete adrDAutoFailureReportedByBeat[beatKey]; } catch (e1) {}
        try { delete adrDAutoRetryByBeat[beatKey]; } catch (e2) {}
    }

    function adrDNoteAutoRetryResult(beatKey, ok) {
        if (!beatKey) return;
        if (ok) { adrDClearAutoBeatState(beatKey); return; }
        try {
            var item = adrDAutoRetryByBeat[beatKey] || { fails: 0, nextAt: 0 };
            item.fails = Math.max(0, Number(item.fails) || 0) + 1;
            var idx = Math.min(item.fails - 1, ADR_D_AUTO_RETRY_DELAYS.length - 1);
            item.nextAt = Date.now() + ADR_D_AUTO_RETRY_DELAYS[idx];
            adrDAutoRetryByBeat[beatKey] = item;
        } catch (e) {}
    }

    function currentType() {
        var st = settings();
        return st.activeTab === "plot" ? "plot" : "emotion";
    }

    // ===== v1.9.28 总开关 =====
    function adrDMasterEnabled() {
        try { return settings().masterEnabled !== false; }
        catch (e) { return true; }
    }

    function adrDMasterToggleLabel() {
        return adrDMasterEnabled()
            ? "🌸 小红霞：运行中｜点击一键关闭"
            : "⏸️ 小红霞：已暂停｜点击一键启动";
    }

    function adrDRefreshMasterToggleUI() {
        try {
            var nodes = Array.prototype.slice.call(rootDoc().querySelectorAll("#adr044-master-toggle"));
            var on = adrDMasterEnabled();
            nodes.forEach(function (el) {
                if (!el) return;
                el.textContent = adrDMasterToggleLabel();
                el.setAttribute("data-master-on", on ? "1" : "0");
            });
        } catch (e) {}
    }

    async function adrDToggleMaster() {
        try {
            var next = !adrDMasterEnabled();
            save("masterEnabled", next);
            saveNow();
            try { adrDSaveLocalBackup(settings()); } catch (eBk) {}
            adrDRefreshMasterToggleUI();
            try { adrCdRestoreFloat("master-toggle"); } catch (eCdM) {} // v1.10.0：总开关同时管抽卡耳机

            if (!next) {
                adrDToast("小红霞已暂停：自动分析与重试全部停止，手动按钮不受影响");
                adrDUpdateAutoCounters();
                return;
            }

            // 一键启动：baseline 校准到当前进度，关闭期间积累的楼层不补拍，从零重新累积。
            adrDToast("小红霞已启动：从当前进度重新计数");
            try {
                var count = await adrDRefreshFullAssistantRoundCount("master-on");
                if (adrDCountReady() && adrDChatKeyReady()) {
                    adrDSetAutoBaseline("emotion", count);
                    adrDSetAutoBaseline("plot", count);
                    var st = settings();
                    st.lastAutoTriggerChatKey = adrDChatKey();
                    st.lastAutoTriggerEmotionCount = count;
                    st.lastAutoTriggerPlotCount = count;
                    st.lastAutoTriggerEmotionAt = Date.now();
                    st.lastAutoTriggerPlotAt = Date.now();
                    saveNow();
                    try { adrDPersistAutoBaselineFields(st); } catch (ePersist) {}
                }
                // count/chatKey 未就绪时不强写 baseline；首次被动检查的脏 gap 安全网会静默对齐。
            } catch (eCal) {}
            adrDUpdateAutoCounters();
        } catch (e) {
            console.error("[Arrebol D] master toggle failed", e);
        }
    }
    // ===== 总开关结束 =====

    function labelOf(type) {
        if (type === "cd") return "抽卡择池";
        if (type === "expand") return "剧情展开";
        return type === "plot" ? "统筹" : "情感导演";
    }

    function prefixOf(type) {
        // v1.11：cd（抽卡择池）复用同一套 API 字段规约 cdApiEndpoint / cdApiKey / cdModel。
        if (type === "cd") return "cd";
        if (type === "expand") return "expand";   // v1.34.0 剧情展开推进的独立 API 位
        if (type === "lamp") return "lamp";       // v1.39.0 掌灯聊天位
        if (type === "pen") return "pen";         // v1.39.0 掌灯执笔位
        if (type === "stage") return "stage";     // v1.45.0 红霞剧场的剧场位
        return type === "plot" ? "plot" : "emotion";
    }

    function field(type, name) {
        var p = prefixOf(type);
        return p + name.charAt(0).toUpperCase() + name.slice(1);
    }

    function setPreview(type, text) {
        var pv = qForm("adr044-" + type + "-preview");
        if (pv) pv.value = text || "";
        save(field(type, "preview"), text || "");
    }

    function normalizeBase(base) {
        var url = (base || "").trim();
        if (!url) return "";
        while (url.length > 1 && url.charAt(url.length - 1) === "/") url = url.slice(0, -1);
        if (url.indexOf("/chat/completions") >= 0) url = url.replace(/\/chat\/completions\/?$/, "");
        if (url.indexOf("/models") >= 0) url = url.replace(/\/models\/?$/, "");
        while (url.length > 1 && url.charAt(url.length - 1) === "/") url = url.slice(0, -1);
        // v1.23.2：只在路径里还没有版本段时补 /v1。旧写法凡不以 /v1 结尾一律硬补，
        // Gemini 官方兼容口 /v1beta/openai、智谱 /api/paas/v4、火山 /api/v3 全被改成 …/v4/v1。
        var path = "";
        try { path = new URL(url).pathname; } catch (eUrl) { path = url.replace(/^[a-z][a-z0-9+.-]*:\/\/[^\/]+/i, ""); }
        if (!/\/v\d+[a-z]*(?:\/|$)/i.test(path)) url += "/v1";
        return url;
    }

    function chatUrl(base) {
        var b = normalizeBase(base);
        return b ? b + "/chat/completions" : "";
    }

    function modelsUrl(base) {
        var b = normalizeBase(base);
        return b ? b + "/models" : "";
    }

    // v1.38.0：A 社官网直连。小红霞是在浏览器里直接 fetch 的，api.anthropic.com 对浏览器来的请求先做 CORS 预检，
    // 没带 anthropic-dangerous-direct-browser-access: true 就回 "Disallowed CORS origin"，浏览器只给 "Failed to fetch"，
    // 钥匙对不对、余额够不够都看不到。聊天口 /v1/chat/completions 是 A 社的 OpenAI 兼容层，认 Bearer；
    // 模型列表 /v1/models 是原生口，只认 x-api-key + anthropic-version，Bearer 过去是 401 "invalid x-api-key"。
    // 其余任何中转站、DS、Gemini 兼容口一律不受影响：只有域名落在 anthropic.com 才多这几行头。
    var ADR_D_ANTHROPIC_VERSION = "2023-06-01";

    function adrDIsAnthropicDirect(url) {
        var host = "";
        try { host = new URL(String(url || "")).hostname; } catch (eHost) { return false; }
        return /(^|\.)anthropic\.com$/i.test(host);
    }

    // mode："chat"（默认）走 Bearer；"native" 走 x-api-key，给 /v1/models 用。
    function adrDAuthHeaders(headers, key, url, mode) {
        headers = headers || {};
        var direct = adrDIsAnthropicDirect(url);
        if (direct) headers["anthropic-dangerous-direct-browser-access"] = "true";
        if (key) {
            if (direct && mode === "native") {
                headers["x-api-key"] = key;
                headers["anthropic-version"] = ADR_D_ANTHROPIC_VERSION;
            } else {
                headers.Authorization = "Bearer " + key;
            }
        }
        return headers;
    }

    // v1.38.1：新一代 Claude（Opus 4.7+ / Sonnet 5+ / Fable 5+ / Opus 5+）不再收 temperature，发了直接 400
    // "`temperature` is deprecated for this model."。官网直连一律摘掉；别家地址原样送。
    // 中转站后面挂着这些模型的，callAPI 与 adrDChatCompletionText 见到这句 400 会摘掉再试一次。
    function adrDRequestBody(body, url) {
        if (body && adrDIsAnthropicDirect(url)) {
            delete body.temperature;
            delete body.top_p;
        }
        return JSON.stringify(body);
    }

    function adrDIsTemperatureRejected(status, raw) {
        return status === 400 && /temperature|top_p/i.test(String(raw || ""));
    }

    try {
        rootWin().__adrDSwitchTest = { runChatKey: function () { return adrDRunChatKey; }, abortIfSwitched: adrDAbortRunIfChatSwitched };
        rootWin().__adrDAuthTest = { isAnthropicDirect: adrDIsAnthropicDirect, authHeaders: adrDAuthHeaders, requestBody: adrDRequestBody, temperatureRejected: adrDIsTemperatureRejected, chatUrl: chatUrl, modelsUrl: modelsUrl };
    } catch (eAuthHook) {}

    function activeRange() {
        var st = settings();
        if (String(st.range) === "custom") {
            var n = Number(st.customRange || 0);
            return n > 0 ? n : 30;
        }
        var r = Number(st.range || 30);
        return r > 0 ? r : 30;
    }

    function autoTriggerRange(type) {
        var st = settings();
        var key = type === "plot" ? "autoTriggerPlotRange" : "autoTriggerEmotionRange";
        var customKey = type === "plot" ? "autoTriggerPlotCustomRange" : "autoTriggerEmotionCustomRange";
        var val = String(st[key] || (type === "plot" ? "10" : "20"));

        if (val === "off") return 0;
        if (val === "custom") {
            var n = Number(st[customKey] || 0);
            return n > 0 ? n : 10;
        }

        var r = Number(val || 0);
        return r > 0 ? r : 10;
    }

    function cleanMessage(text) {
        text = String(text || "").trim();
        text = text.replace(/image###[\s\S]*?###/g, "").trim();
        text = text.replace(/<!--ARREBOL_DIRECTOR_START-->[\s\S]*?<!--ARREBOL_DIRECTOR_END-->/g, "").trim();
        text = text.replace(/<!--\s*ARREBOL_D_START:(?:emotion|plot)\s*-->[\s\S]*?<!--\s*ARREBOL_D_END:(?:emotion|plot)\s*-->/g, "").trim();
        text = text.replace(/<!--\s*ARREBOL_D_START:(?:emotion|plot)[\s\S]*?ARREBOL_D_END:(?:emotion|plot)\s*-->/g, "").trim();
        text = text.replace(/<details[^>]*class=["']arrebol-d-(?:injection|card|theater)["'][^>]*>[\s\S]*?<\/details>/g, "").trim();
        text = text.replace(/\n?arrebol_d(?:_visible)?(?::(?:emotion|plot))?###[\s\S]*?###/g, "").trim();
        return text;
    }

    function recentChat(rounds) {
        var chat;
        try { chat = ctx().chat; } catch (e) { return ""; }
        if (!chat || !chat.length) return "";

        var limit = rounds * 2;
        var arr = [];
        var count = 0;

        for (var i = chat.length - 1; i >= 0 && count < limit; i--) {
            var m = chat[i];
            if (!m || m.is_system) continue;

            var role = m.is_user ? "用户" : (m.name || "角色");
            var text = cleanMessage(m.mes);
            if (!text) continue;

            arr.unshift("[" + role + "] " + text);
            count++;
        }

        return arr.join("\n\n");
    }

    function syncShared() {
        var st = settings();

        var range = qForm("adr044-range");
        if (range) save("range", range.value || "30");

        var custom = qForm("adr044-custom");
        if (custom) save("customRange", Number(custom.value || 0));

        var memory = qForm("adr044-memory");
        if (memory) save("supplementMemory", memory.value || "");

        var ctags = qForm("adr044-content-tags");
        if (ctags) save("contentTagNames", String(ctags.value || "").trim() || "content");

        var mode = qForm("adr044-inject-mode");
        if (mode) save("injectMode", mode.value || "visible");

        var aiE = qForm("adr044-auto-inject-emotion");
        if (aiE) save("autoInjectEmotion", !!aiE.checked);

        var aiP = qForm("adr044-auto-inject-plot");
        if (aiP) save("autoInjectPlot", !!aiP.checked);

        var sfw = qForm("adr044-show-floating-window");
        if (sfw) save("showFloatingWindow", !!sfw.checked);

        var fmo = qForm("adr044-fab-motion");
        if (fmo) save("fabMotion", !!fmo.checked);

        adr048ApplyFabTheme();

        var satp = qForm("adr044-show-auto-trigger-popup");
        if (satp) save("showAutoTriggerPopup", !!satp.checked);

        var stm = qForm("adr044-stream-enabled");
        if (stm) save("streamEnabled", !!stm.checked);

        var flt = qForm("adr044-float-inject");
        if (flt) save("floatInjectEnabled", !!flt.checked);

        var fd = qForm("adr044-float-depth");
        if (fd) save("floatDepth", Number(fd.value || 2));

        var dlog = qForm("adr044-director-log");
        if (dlog) save("directorLogEnabled", !!dlog.checked);

        var ngd = qForm("adr044-ng-detect");
        if (ngd) save("ngDetectEnabled", !!ngd.checked);

        saveNow();
        try { adrDRestoreFloatForCurrentChat("settings-change"); } catch (eF34) {}
    }

    function syncType(type) {
        var p = prefixOf(type);

        var endpoint = qForm("adr044-" + type + "-endpoint");
        var key = qForm("adr044-" + type + "-key");
        var model = qForm("adr044-" + type + "-model");
        var preset = qForm("adr044-" + type + "-preset");
        var preview = qForm("adr044-" + type + "-preview");

        if (endpoint) save(p + "ApiEndpoint", endpoint.value || "");
        if (key) save(p + "ApiKey", key.value || "");
        if (model) save(p + "Model", model.value || "");
        if (preset) save(p + "Preset", preset.value || "");
        if (preview) save(p + "Preview", preview.value || "");

        var autoTrigger = qForm("adr044-auto-trigger-" + type);
        if (autoTrigger) save(type === "plot" ? "autoTriggerPlot" : "autoTriggerEmotion", !!autoTrigger.checked);

        var autoRange = qForm("adr044-auto-trigger-range-" + type);
        if (autoRange) save(type === "plot" ? "autoTriggerPlotRange" : "autoTriggerEmotionRange", autoRange.value || (type === "plot" ? "10" : "20"));

        var autoCustom = qForm("adr044-auto-trigger-custom-" + type);
        if (autoCustom) save(type === "plot" ? "autoTriggerPlotCustomRange" : "autoTriggerEmotionCustomRange", Number(autoCustom.value || 0));

        saveNow();
    }

    function syncAll() {
        syncShared();
        syncType("emotion");
        syncType("plot");
    }

    function adrDForceSaveSettings(type) {
        adrDBlurActiveElement();

        try {
            syncShared();
            if (type === "emotion" || type === "plot") syncType(type);
            else syncAll();

            // 强制读取当前面板字段，写入设置与本地备份。
            ["emotion", "plot"].forEach(function (t) {
                var p = prefixOf(t);
                var endpoint = qForm("adr044-" + t + "-endpoint");
                var key = qForm("adr044-" + t + "-key");
                var model = qForm("adr044-" + t + "-model");
                var preset = qForm("adr044-" + t + "-preset");

                if (endpoint) save(p + "ApiEndpoint", endpoint.value || "");
                if (key) save(p + "ApiKey", key.value || "");
                if (model) save(p + "Model", model.value || "");
                if (preset) save(p + "Preset", preset.value || "");
            });

            adrDSaveLocalBackup(settings());
            saveNow();
            adrDRefreshAllFieldsFromSettings();
            adrDToast("暗河红霞设置已保存");
            return true;
        } catch (e) {
            console.error("[Arrebol D] force save failed", e);
            return false;
        }
    }

    function getCurrentCharacterObject() {
        var c;
        try { c = ctx(); } catch (e) { return null; }

        var id = null;
        try {
            if (c.characterId !== undefined && c.characterId !== null) id = c.characterId;
            else if (c.this_chid !== undefined && c.this_chid !== null) id = c.this_chid;
            else if (c.chid !== undefined && c.chid !== null) id = c.chid;
        } catch (e1) {}

        try {
            if (c.characters && id !== null && id !== undefined && c.characters[id]) return c.characters[id];
        } catch (e2) {}

        try {
            if (c.character) return c.character;
        } catch (e3) {}

        try {
            // v1.23.2：兜底按角色名（name2）比对；旧写法拿用户名（name1）去比，永远比不中。
            if (c.characters && Array.isArray(c.characters) && c.name2) {
                for (var i = 0; i < c.characters.length; i++) {
                    if (c.characters[i] && c.characters[i].name === c.name2) return c.characters[i];
                }
            }
        } catch (e4) {}

        return null;
    }

    var adrDExtractNoCap = false;   // v1.42.0 掌灯读素材时置 true：角色卡 / 世界书 / 人设一字不截（导演那边口径不变）
    function asCleanText(v, max) {
        if (adrDExtractNoCap) max = 0;
        if (v === undefined || v === null) return "";
        var s = "";
        if (typeof v === "string") s = v;
        else {
            try { s = JSON.stringify(v, null, 2); }
            catch (e) { s = String(v); }
        }
        s = s.replace(/\r/g, "").trim();
        if (!s) return "";
        if (max && s.length > max) s = s.slice(0, max) + "…";
        return s;
    }

    function getNested(obj, path) {
        try {
            var cur = obj;
            for (var i = 0; i < path.length; i++) {
                if (!cur) return undefined;
                cur = cur[path[i]];
            }
            return cur;
        } catch (e) { return undefined; }
    }

    function extractCharacterCardText() {
        var ch = getCurrentCharacterObject();
        if (!ch) return "";

        var parts = [];
        var seen = {};

        function add(label, value, max) {
            var s = asCleanText(value, max || 6000);
            if (!s) return;
            var key = label + "::" + s.slice(0, 80);
            if (seen[key]) return;
            seen[key] = true;
            parts.push("【" + label + "】\n" + s);
        }

        add("角色名称", ch.name || getNested(ch, ["data", "name"]), 500);
        add("角色描述", ch.description || getNested(ch, ["data", "description"]), 9000);
        add("角色性格", ch.personality || getNested(ch, ["data", "personality"]), 5000);
        add("场景设定", ch.scenario || getNested(ch, ["data", "scenario"]), 5000);
        add("首条消息", ch.first_mes || getNested(ch, ["data", "first_mes"]), 2500);
        add("示例对话", ch.mes_example || getNested(ch, ["data", "mes_example"]), 5000);
        add("创作者注释", ch.creatorcomment || ch.creator_notes || getNested(ch, ["data", "creator_notes"]) || getNested(ch, ["data", "creatorcomment"]), 3000);
        add("系统提示", ch.system_prompt || getNested(ch, ["data", "system_prompt"]), 3000);
        add("后历史指令", ch.post_history_instructions || getNested(ch, ["data", "post_history_instructions"]), 3000);

        return parts.join("\n\n");
    }

    function extractCharacterBookText() {
        var ch = getCurrentCharacterObject();
        if (!ch) return "";

        var candidates = [];

        function pushCandidate(label, obj) {
            if (obj !== undefined && obj !== null) candidates.push({ label: label, obj: obj });
        }

        pushCandidate("data.character_book", getNested(ch, ["data", "character_book"]));
        pushCandidate("character_book", ch.character_book);
        pushCandidate("json_data.data.character_book", getNested(ch, ["json_data", "data", "character_book"]));
        pushCandidate("json_data.character_book", getNested(ch, ["json_data", "character_book"]));
        pushCandidate("data.extensions.character_book", getNested(ch, ["data", "extensions", "character_book"]));
        pushCandidate("data.extensions.world", getNested(ch, ["data", "extensions", "world"]));
        pushCandidate("data.extensions.world_info", getNested(ch, ["data", "extensions", "world_info"]));
        pushCandidate("data.extensions.lorebook", getNested(ch, ["data", "extensions", "lorebook"]));

        var parts = [];

        function entryText(entry, i) {
            if (!entry) return "";
            var keys = entry.keys || entry.key || entry.keywords || entry.primary_keys || [];
            if (Array.isArray(keys)) keys = keys.join(", ");
            var comment = entry.comment || entry.name || entry.title || "";
            var content = entry.content || entry.text || entry.value || entry.entry || "";
            var enabled = entry.enabled;
            if (enabled === false || entry.disable === true) return "";

            var s = "";
            if (comment) s += "条目 " + (i + 1) + "｜" + comment + "\n";
            else s += "条目 " + (i + 1) + "\n";
            if (keys) s += "关键词：" + keys + "\n";
            if (content) s += asCleanText(content, 3000);
            return s.trim();
        }

        candidates.forEach(function (cand) {
            var obj = cand.obj;
            if (!obj) return;

            var entries = null;
            if (Array.isArray(obj)) entries = obj;
            else if (Array.isArray(obj.entries)) entries = obj.entries;
            else if (obj.entries && typeof obj.entries === "object") {
                entries = [];
                Object.keys(obj.entries).forEach(function (k) { entries.push(obj.entries[k]); });
            }

            if (entries && entries.length) {
                var texts = [];
                entries.forEach(function (e, i) {
                    var t = entryText(e, i);
                    if (t) texts.push(t);
                });
                if (texts.length) {
                    parts.push("【角色卡世界书：" + cand.label + "】\n" + texts.join("\n\n"));
                }
            } else {
                var raw = asCleanText(obj, 3000);
                if (raw && raw !== "{}" && raw !== "[]") {
                    parts.push("【角色卡世界书候选：" + cand.label + "】\n" + raw);
                }
            }
        });

        return parts.join("\n\n");
    }

    function extractPersonaText() {
        var c;
        try { c = ctx(); } catch (e) { return ""; }

        var parts = [];

        function add(label, value) {
            var s = asCleanText(value, 3000);
            if (!s) return;
            // 过滤掉探针里出现的 jQuery 事件对象这类误判。
            if (s.indexOf("jQuery") >= 0 && s.indexOf("events") >= 0) return;
            if (s === "{}" || s === "[]") return;
            parts.push("【" + label + "】\n" + s);
        }

        // v1.23.2：酒馆里 name1 是用户、name2 是角色。旧写法把角色名当用户名递给导演，
        // 情感导演还要据此判"是否过度代演用户"。
        add("用户名称", c.name1);

        try {
            var p = c.powerUserSettings || {};
            add("powerUserSettings.persona_description", p.persona_description);
            add("powerUserSettings.personaDescription", p.personaDescription);
            add("powerUserSettings.user_description", p.user_description);
            add("powerUserSettings.userDescription", p.userDescription);
        } catch (e1) {}

        try {
            var rw = rootWin();
            if (typeof rw.persona_description === "string") add("window.persona_description", rw.persona_description);
            if (typeof rw.user_description === "string") add("window.user_description", rw.user_description);
            if (rw.power_user) {
                add("window.power_user.persona_description", rw.power_user.persona_description);
                add("window.power_user.user_description", rw.power_user.user_description);
            }
        } catch (e2) {}

        return parts.join("\n\n");
    }

    /* v1.16.0 正文标签开口子：正文用什么标签是预设层的决定，插件只管结构。
       设置里可逗号分隔多个名字；消毒 + 正则转义，反向引用保证开闭配对，乱填不炸。 */
    function adrDContentTagNames() {
        var raw = "";
        try { raw = String(settings().contentTagNames || ""); } catch (e) {}
        var names = raw.split(",").map(function (sName) {
            return sName.trim().replace(/[<>\/"'`\s]/g, "");
        }).filter(function (sName) { return !!sName; });
        if (!names.length) names = ["content"];
        return names;
    }

    function adrDContentTagRegex() {
        var names = adrDContentTagNames().filter(function (sName) { return sName !== "*"; });
        if (!names.length) names = ["content"];
        names = names.map(function (sName) {
            return sName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        });
        return new RegExp("<(" + names.join("|") + ")(?=[\\s/>])[^>]*>([\\s\\S]*?)<\\/\\1>", "gi"); // \b 不认汉字边界，改显式前瞻
    }

    /* v1.16.1 无标签兜底：标签名里含 * 时，没匹配到标签的助手楼整层当正文读。 */
    function adrDContentTagWholeFloorEnabled() {
        return adrDContentTagNames().indexOf("*") !== -1;
    }

    async function recentContentBlocks(rounds) {
        var chat;
        try {
            chat = await adrDGetFullChatMessagesForRead("recent-content");
        } catch (e0) {
            try { chat = ctx().chat; } catch (e1) { return ""; }
        }
        if (!chat || !chat.length) return "";

        var limit = rounds * 2;
        var arr = [];
        var count = 0;

        for (var i = chat.length - 1; i >= 0 && count < limit; i--) {
            var m = chat[i];
            if (!m) continue;

            var roleRaw = String(m.role || "").toLowerCase();
            var isUser = m.is_user === true || roleRaw === "user";
            // 全量历史读取时，旧楼层可能因“小幽灵/隐藏助手”被标成 is_system。
            // 复盘范围要读“真实历史正文”，所以只跳过没有 name 的纯 system 通知，不因 is_system=true 直接丢掉角色/用户楼层。
            if (roleRaw === "system" && !m.name && !isUser) continue;

            var role = isUser ? "用户" : (m.name || "角色");
            var raw = m.message;
            if (raw == null) raw = m.mes;
            var text = String(raw || "");
            text = cleanMessage(text);

            var blocks = [];
            var re = adrDContentTagRegex();
            var match;
            while ((match = re.exec(text)) !== null) {
                var v = (match[2] || "").trim();
                if (v) blocks.push(v);
            }

// v1.16.1 无标签兔底：含 * 时，没匹配到标签的助手楼整层当正文（已 cleanMessage，截 2500 字）。
            if (!blocks.length && !isUser && adrDContentTagWholeFloorEnabled()) {
                var whole = text.trim();
                if (whole) blocks.push(whole.length > 2500 ? whole.slice(0, 2500) + "…" : whole);
            }

            // 用户消息通常没有 <content>，保留用户原文作为必要上下文，但限制长度。
            if (!blocks.length && isUser) {
                var u = text.trim();
                if (u) blocks.push(u.length > 1200 ? u.slice(0, 1200) + "…" : u);
            }

            if (blocks.length) {
                arr.unshift("[" + role + "]\n" + blocks.join("\n\n"));
            }

            count++;
        }

        return arr.join("\n\n---\n\n");
    }

    function buildPreciseContext(full) {
        var parts = [];
        var charText, bookText, personaText;
        adrDExtractNoCap = !!full;
        try {
            charText = extractCharacterCardText();
            bookText = extractCharacterBookText();
            personaText = extractPersonaText();
        } finally { adrDExtractNoCap = false; }
        var st = settings();

        if (charText) parts.push("【当前角色卡】\n" + charText);
        if (bookText) parts.push("【角色卡世界书 / Lorebook】\n" + bookText);
        if (personaText) parts.push("【User 人设 / Persona】\n" + personaText);
        if (st.supplementMemory && st.supplementMemory.trim()) {
            parts.push("【手动补充】\n" + st.supplementMemory.trim());
        }

        return parts.join("\n\n");
    }


    function adrDGetExtraInstruction(type) {
        try {
            var el = qForm("adr044-" + type + "-extra");
            return el ? String(el.value || "").trim() : "";
        } catch (e) {
            return "";
        }
    }

    function adrDClearExtraInstruction(type) {
        try {
            Array.prototype.slice.call(rootDoc().querySelectorAll("#adr044-" + type + "-extra")).forEach(function (el) {
                if (!el) return;
                el.value = "";
                try { el.dispatchEvent(new Event("input", { bubbles: true })); } catch (e1) {}
                try { el.dispatchEvent(new Event("change", { bubbles: true })); } catch (e2) {}
            });
            try {
                syncType(type);
                adrDSaveLocalBackup(settings());
            } catch (e3) {}
        } catch (e4) {}
    }

    function adrDExtraInstructionBlock(type, explicitExtra) {
        var extra = String(explicitExtra || adrDGetExtraInstruction(type) || "").trim();
        if (!extra) return "";
        return [
            "【最高优先级一次性补充指令】",
            "以下是用户本轮临时补充的导演需求。它的优先级高于通用导演框架、模板与常规分析偏好；请第一时间吸收，并围绕它构建本次情感/剧情指导。",
            "这是一条一次性指令：本次生成后会自动清空。不要把它当作长期设定，不要在后续轮次继续沿用，除非用户再次填写。",
            extra,
            "【一次性补充指令结束】"
        ].join("\n");
    }

    async function buildPrompt(type, extra) {
        var r = activeRange();
        var out = "";

        // v1.30.0：基调段最前——它是长期的框，一次性补充指令只是这一拍的临时插话。
        var toneBlock = adrDToneBlock();
        if (toneBlock) {
            out += toneBlock + "\n\n";
        }

        var extraBlock = adrDExtraInstructionBlock(type, extra);
        if (extraBlock) {
            out += extraBlock + "\n\n";
        }

        var contextText = buildPreciseContext();
        if (contextText) {
            out += contextText + "\n\n";
        }

        var directorLog = adrDDirectorLogBlock(type);
        if (directorLog) {
            out += directorLog + "\n\n";
        }

        // v1.10.0：统筹采买清单新增投卡史（账房盘账得看得见牌桌）。
        if (type === "plot") {
            var cdHist = adrCdHistoryBlock();
            if (cdHist) {
                out += cdHist + "\n\n";
            }
        }

        var recent = await recentContentBlocks(r);
        out += "【最近 " + r + " 轮正文｜精准读取】\n" + (recent || "（未提取到正文标签内容；用户消息会作为上下文保留）") + "\n\n";

        if (type === "plot") {
            out += "请根据以上内容输出统筹调度。只输出分析结果，不要复述分析过程，不要写正文。";
        } else {
            out += "请根据以上内容输出情感导演方向。只输出分析结果，不要复述分析过程，不要写正文。";
        }
        if (toneBlock) out += "所有方向以【用户基调】为第一优先。";

        return out;
    }

    function parseResponse(data) {
        if (!data) return "";

        if (data.choices && data.choices[0]) {
            var ch = data.choices[0];

            if (ch.message) {
                var msg = ch.message;
                if (typeof msg.content === "string" && msg.content.trim()) return msg.content.trim();

                if (msg.content && Array.isArray(msg.content)) {
                    var parts = [];
                    msg.content.forEach(function (p) {
                        if (!p) return;
                        if (typeof p === "string") parts.push(p);
                        else if (p.text) parts.push(p.text);
                        else if (p.type === "text" && p.text) parts.push(p.text);
                    });
                    if (parts.join("").trim()) return parts.join("\n").trim();
                }
            }

            if (ch.text) return String(ch.text).trim();
        }

        if (data.response) return String(data.response).trim();
        if (data.text) return String(data.text).trim();
        return "";
    }

    /* v1.15.1 分析忙碌脉冲：导演分析进行中给胶囊浮标点灯（挂类，样式在 style.css） */
    // v1.45.1：灯按"谁在跑"分别记账。以前只有导演会点灯，一个布尔够用；现在剧场开演也点，
    // 两边可能同时在跑——导演跑完不能把剧场的灯顺手熄了，反过来也一样。任何一家在跑灯就亮；
    // 只有剧场在跑时多挂一个 adr048-staging，那一圈呼吸换成霞粉，一眼看出是剧场不是导演。
    // v1.45.3：两盏灯各占一侧——左边雾紫是导演（adr048-lamp-d），右边霞粉是剧场（adr048-lamp-t）。
    // 江：「他俩在浮标的一左一右就好啦」。v1.45.2 那版把两粒并排挤在右边，会错意了，这版改掉。
    // 两盏灯都不撑宽按钮（净宽为零），所以亮灯、熄灯时胶囊本身一个像素都不挪，按钮的框也不变，拖动与存位置照旧。
    var adr048FabBusy = { director: false, theater: false };

    // v1.45.4：灯怎么画，分两种。
    // · data-lamp="out"：两盏挂在胶囊外侧（各要 11px：4px 间隙 + 7px 灯）。只在「自由漂浮」时用——
    //   按钮还挂在 body 下、position 还是 fixed，而且左右离屏幕边都不少于 12px。
    // · data-lamp="in"：两盏收在胶囊两头。其余情况一律用它：泊进避风塘顶栏（#extensionHarborDock，
    //   别的扩展把按钮搬进它自己的容器里）、贴着屏幕边、或者量不出位置。
    //   泊位里按钮怎么摆是人家说了算（不再是定位元素、容器 overflow:hidden），所以 "in" 的画法
    //   不靠定位、不靠溢出、不改按钮宽度：两盏都是随文档流、净宽为零的 flex 子项，画在按钮自己的框里。
    //   样式表里不带 data-lamp 时的默认画法也是它，所以这段 JS 哪怕没跑到，灯也看得见。
    // v1.45.3 的灯是绝对定位、挂在框外的：泊位里按钮不是定位元素，灯跟着别的祖先跑到泊位外面被裁掉了（江：「灯不亮」）。
    // 只收贴边那一盏会一里一外，看着像坏了，所以要收就一起收。
    // left / right 可以直接传（拖动时用算好的落点，不多读一次布局、也不读样式）；不传就量按钮现在的位置。
    function adr048FabIsFree(btn, skipStyle) {
        try {
            var d = rootDoc();
            var par = btn ? btn.parentElement : null;
            if (!par || (par !== d.body && par !== d.documentElement)) return false;   // 被搬进了别人的容器：泊位
            if (skipStyle) return true;
            var w = rootWin() || window;
            var cs = typeof w.getComputedStyle === "function" ? w.getComputedStyle(btn) : null;
            return !!cs && String(cs.position || "") === "fixed";
        } catch (e) { return false; }
    }

    function adr048PlaceFabLamps(btn, left, right) {
        try {
            if (!btn) return;
            var given = Number.isFinite(left) && Number.isFinite(right);
            var mode = "in";
            if (adr048FabIsFree(btn, given)) {
                if (!given) {
                    var r = btn.getBoundingClientRect();
                    if (r && r.width > 0) { left = r.left; right = r.right; given = true; }
                }
                if (given) {
                    var w = rootWin() || window;
                    var vw = Number(w.innerWidth) || 360;
                    try {
                        var cw = Number(rootDoc().documentElement.clientWidth);
                        if (cw > 0 && cw < vw) vw = cw;
                    } catch (eCw) {}
                    mode = (left < 12 || (vw - right) < 12) ? "in" : "out";
                }
            }
            if (btn.getAttribute("data-lamp") !== mode) btn.setAttribute("data-lamp", mode);
        } catch (e) {}
    }

    function adr048ApplyFabBusy() {
        try {
            var dOn = !!adr048FabBusy.director;
            var tOn = !!adr048FabBusy.theater;
            var els = rootDoc().querySelectorAll("#adr048-fab");
            for (var i = 0; i < els.length; i++) {
                try {
                    if (dOn || tOn) adr048PlaceFabLamps(els[i]);
                    els[i].classList.toggle("adr048-analyzing", dOn || tOn);   // 那一圈呼吸：谁在跑都亮
                    els[i].classList.toggle("adr048-staging", tOn && !dOn);    // 只有剧场在跑：圈换成霞粉
                    els[i].classList.toggle("adr048-lamp-d", dOn);             // 左灯：导演
                    els[i].classList.toggle("adr048-lamp-t", tOn);             // 右灯：剧场
                    els[i].classList.remove("adr048-duet");                    // v1.45.2 的并排两粒，作废
                } catch (e) {}
            }
        } catch (e) {}
    }

    function adr048SetFabBusy(on, source) {
        adr048FabBusy[source === "theater" ? "theater" : "director"] = !!on;
        adr048ApplyFabBusy();
    }

    try { rootWin().__adr048FabBusyTest = { set: adr048SetFabBusy, state: adr048FabBusy, apply: adr048ApplyFabBusy, place: adr048PlaceFabLamps, isFree: adr048FabIsFree }; } catch (eFabBusyHook) {}

    // v1.27.0：导演请求改流式接收（提议：江；施工：波哥）。
    // 非流式时，会思考的模型要把整段思考跑完才回第一个字节——中转站／网关的空闲超时（常见 60–100 秒）
    // 在这之前就把连接掐断，回来是 502／524 或半截 JSON；本地那道 120 秒硬闸也常在思考结束前落下。
    // 流式下第一个 chunk 很快就到、连接上一直有字节在走，网关不掐；本地闸改成"两个 chunk 之间最多 120 秒"。
    // 正文只收 delta.content；思考（reasoning_content / reasoning）看见就跳过、只计字数进状态提示。
    // 服务端不理 stream:true 而回整份 JSON 时（或测试桩、老中转），照旧按 JSON 解析——旧路径一字不丢。
    var ADR_D_STREAM_IDLE_MS = 120000;

    function adrDTextOfContent(c) {
        if (typeof c === "string") return c;
        if (!Array.isArray(c)) return "";
        var parts = [];
        c.forEach(function (p) {
            if (!p) return;
            if (typeof p === "string") parts.push(p);
            else if (typeof p.text === "string") parts.push(p.text);
        });
        return parts.join("");
    }

    // 正文空着时把话说明白：是思考把额度吃光了，还是被 finish_reason=length 掐了。
    function adrDEmptyContentHint(reasoningChars, finish) {
        var why = [];
        if (reasoningChars > 0) why.push("模型只回了 " + reasoningChars + " 字思考，正文一个字没出");
        if (finish === "length") why.push("finish_reason=length，输出上限先到了");
        if (!why.length) return "";
        return "（" + why.join("；") + "。请在服务商侧关掉思考或放宽输出上限，或换不思考的模型）";
    }

    // SSE 增量收集器：喂进来的文本按事件切开，data: 行里的 JSON 逐块合并。
    // 第一个非空白字符是 { 或 [ 就认定服务端回的是整份 JSON，全部攒起来最后交给 parseResponse。
    function adrDStreamCollector() {
        var buf = "";
        var mode = "";           // "" 未定 | "sse" | "json"
        var rawAll = "";        // 仅整份 JSON 模式保留完整响应
        var rawSample = "";     // SSE / 未定模式只留少量排错原文
        var rawSampleLimit = 512;
        var content = "";
        var reasoningChars = 0;
        var finish = "";
        var chunks = 0;
        var streamError = null;

        function applyChunk(obj) {
            if (!obj || typeof obj !== "object") return;
            if (obj.error && !streamError) {
                var em = obj.error && (obj.error.message || obj.error.msg);
                streamError = new Error("API 流中报错：" + String(em || JSON.stringify(obj.error)).slice(0, 220));
            }
            var ch = obj.choices && obj.choices[0];
            if (!ch) return;
            var d = ch.delta || ch.message || {};
            if (typeof d.reasoning_content === "string") reasoningChars += d.reasoning_content.length;
            else if (typeof d.reasoning === "string") reasoningChars += d.reasoning.length;
            var piece = adrDTextOfContent(d.content);
            if (!piece && typeof ch.text === "string") piece = ch.text;
            if (piece) content += piece;
            if (ch.finish_reason) finish = String(ch.finish_reason);
            chunks++;
        }

        function handleEvent(evt) {
            var dataLines = [];
            evt.split("\n").forEach(function (line) {
                if (line.indexOf("data:") === 0) dataLines.push(line.slice(5).replace(/^ /, ""));
            });
            if (!dataLines.length) return;
            var payload = dataLines.join("\n").trim();
            if (!payload || payload === "[DONE]") return;
            var obj;
            try { obj = JSON.parse(payload); } catch (eJson) { return; }
            applyChunk(obj);
        }

        function drain(final) {
            var idx;
            while ((idx = buf.indexOf("\n\n")) >= 0) {
                var evt = buf.slice(0, idx);
                buf = buf.slice(idx + 2);
                handleEvent(evt);
            }
            if (final && buf.trim()) { handleEvent(buf); buf = ""; }
        }

        return {
            push: function (text) {
                text = String(text || "");
                if (!text) return;
                if (rawSample.length < rawSampleLimit) {
                    rawSample += text.slice(0, rawSampleLimit - rawSample.length);
                }
                if (!mode) {
                    // 纯前导空白无需积累；JSON 与 SSE 都从首个非空白字符开始解析。
                    var head = text.replace(/^[\s﻿]+/, "");
                    if (!head) return;
                    mode = (head.charAt(0) === "{" || head.charAt(0) === "[") ? "json" : "sse";
                    if (mode === "json") rawAll = head;
                    else { buf = head.replace(/\r/g, ""); drain(false); }
                    return;
                }
                if (mode === "json") rawAll += text;
                else { buf += text.replace(/\r/g, ""); drain(false); }
            },
            end: function () { if (mode === "sse") drain(true); },
            mode: function () { return mode; },
            raw: function () { return mode === "json" ? rawAll : rawSample; },
            content: function () { return content; },
            reasoningChars: function () { return reasoningChars; },
            finish: function () { return finish; },
            chunks: function () { return chunks; },
            error: function () { return streamError; }
        };
    }

    // 逐块读响应体；老环境（没有 body.getReader / TextDecoder）退回 res.text() 一次性喂进去。
    async function adrDReadBody(res, onChunk) {
        var body = res && res.body;
        if (body && typeof body.getReader === "function" && typeof TextDecoder !== "undefined") {
            var reader = body.getReader();
            var dec = new TextDecoder("utf-8");
            while (true) {
                var r = await reader.read();
                if (r.done) break;
                var txt = r.value ? dec.decode(r.value, { stream: true }) : "";
                if (txt) onChunk(txt);
            }
            var tail = dec.decode();
            if (tail) onChunk(tail);
            return;
        }
        var all = await res.text();
        onChunk(all);
    }

    // 测试钩子：收集器与空正文提示语是纯函数，test_stream.js 直接拿来喂假流。
    try {
        rootWin().__adrDStreamTest = { collector: adrDStreamCollector, emptyHint: adrDEmptyContentHint, readBody: adrDReadBody };
    } catch (eStreamHook) {}

    async function callAPI(type, extra) {
        var st = settings();
        var p = prefixOf(type);

        var endpoint = st[p + "ApiEndpoint"] || "";
        var key = st[p + "ApiKey"] || "";
        var model = st[p + "Model"] || "";
        var preset = st[p + "Preset"] || (type === "plot" ? PLOT_PRESET : EMOTION_PRESET);

        if (!endpoint) throw new Error("请先填写 " + labelOf(type) + " API 地址");
        if (!model) throw new Error("请先填写 " + labelOf(type) + " 模型名");

        var url = chatUrl(endpoint);
        if (!url) throw new Error("API 地址无效");

        // v1.27.1：开关。关掉就回到整份 JSON 的老路（stream:false），给不支持流式的中转站留门；收集器本来就认整份 JSON。
        var useStream = st.streamEnabled !== false;
        var headers = { "Content-Type": "application/json", "Accept": useStream ? "text/event-stream, application/json" : "application/json" };
        adrDAuthHeaders(headers, key, url);

        adrDAbortWasManual = false;
        if (typeof AbortController !== "undefined") aborter = new AbortController();
        else aborter = null;
        var localAborter = aborter;

        var body = {
            model: model,
            messages: [
                { role: "system", content: preset + (adrDToneSystemLine() ? "\n\n" + adrDToneSystemLine() : "") },
                { role: "user", content: await buildPrompt(type, extra || "") }
            ],
            temperature: 0.6,
            stream: useStream
        };

        var opts = {
            method: "POST",
            headers: headers,
            body: adrDRequestBody(body, url)
        };
        if (localAborter) opts.signal = localAborter.signal;

        // 空闲闸：等首字节、以及任意两个 chunk 之间，都最多 120 秒；每来一块就重新上表。
        var timeoutId = null;
        var didTimeout = false;
        function armIdleTimer() {
            if (!localAborter || typeof setTimeout !== "function") return;
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(function () {
                didTimeout = true;
                try { localAborter.abort(); } catch (eAbort) {}
            }, ADR_D_STREAM_IDLE_MS);
        }
        armIdleTimer();

        var col = adrDStreamCollector();
        var res;
        var raw = "";
        try {
            res = await fetch(url, opts);
            if (!res.ok) {
                raw = await res.text();
                // v1.38.1：中转站后面是新一代 Claude、不收 temperature 的，摘掉再试一次。
                if (adrDIsTemperatureRejected(res.status, raw) && "temperature" in body) {
                    delete body.temperature;
                    opts.body = JSON.stringify(body);
                    armIdleTimer();
                    res = await fetch(url, opts);
                    raw = res.ok ? "" : await res.text();
                }
            }
            if (res.ok) {
                await adrDReadBody(res, function (txt) {
                    armIdleTimer();
                    col.push(txt);
                    if (col.mode() !== "sse") return;
                    var got = col.content().length;
                    var thought = col.reasoningChars();
                    if (got) status(type, "正在分析…（已收到 " + got + " 字）", "#8ed99d");
                    else if (thought) status(type, "正在分析…（模型思考中，" + thought + " 字）", "#8ed99d");
                });
                col.end();
                raw = col.raw();
            }
        } catch (eFetch) {
            if (didTimeout && eFetch && eFetch.name === "AbortError") {
                var timeoutErr = new Error(col.chunks()
                    ? "流式接收中断：" + (ADR_D_STREAM_IDLE_MS / 1000) + " 秒没有新内容，请检查 API、中转站或稍后重试"
                    : "请求超时，请检查 API、中转站或稍后重试");
                timeoutErr.name = "TimeoutError";
                throw timeoutErr;
            }
            throw eFetch;
        } finally {
            if (timeoutId) clearTimeout(timeoutId);
        }

        if (!res.ok) throw new Error("API " + res.status + "：" + String(raw || "").slice(0, 220));

        if (col.mode() === "sse") {
            var streamed = String(col.content() || "").trim();
            if (streamed) return streamed;
            if (col.error()) throw col.error();
            if (!col.chunks()) throw new Error("流式响应里没有可解析的内容：" + raw.slice(0, 220));
            throw new Error("无法解析响应：正文为空" + adrDEmptyContentHint(col.reasoningChars(), col.finish()));
        }

        var data;
        try { data = JSON.parse(raw); }
        catch (e) { throw new Error("API 返回非 JSON：" + raw.slice(0, 180)); }

        if (data && data.error && !(data.choices && data.choices[0])) {
            var em = data.error.message || data.error.msg || JSON.stringify(data.error);
            throw new Error("API 报错：" + String(em).slice(0, 220));
        }

        var out = parseResponse(data);
        if (!out) {
            var hint = "";
            try {
                var ch0 = data.choices && data.choices[0];
                var m0 = ch0 && ch0.message;
                var rc = m0 && (m0.reasoning_content || m0.reasoning);
                hint = adrDEmptyContentHint(typeof rc === "string" ? rc.length : 0, ch0 && ch0.finish_reason);
            } catch (eHint) {}
            throw new Error("无法解析响应：" + (hint ? "正文为空" + hint : raw.slice(0, 220)));
        }
        return out;
    }

    function setButtons(type) {
        ["emotion", "plot"].forEach(function (t) {
            var g = qForm("adr044-" + t + "-generate");
            var r = qForm("adr044-" + t + "-reroll");
            var s = qForm("adr044-" + t + "-stop");
            var c = qForm("adr044-" + t + "-copy");
            var inj = qForm("adr044-" + t + "-inject");
            var pv = qForm("adr044-" + t + "-preview");
            var has = pv && pv.value;

            if (g) g.disabled = processing;
            if (r) r.disabled = processing;
            if (s) s.disabled = !processing;
            if (c) c.disabled = !has;
            if (inj) inj.disabled = !has;
        });
    }

    // v1.23.2：稿子不往正在生成的楼里写。导演一趟最长 120 秒，这期间用户继续发消息很正常；
    // 旧写法回来就往"最后一个有正文的助手楼"里塞，那一楼可能正在流式生成——
    // 写进去的稿被下一个 chunk 冲掉，saveChat 和重绘还会撞上生成中。
    // 生成中就把稿留在预览里等 GENERATION_ENDED，最多等 3 分钟（与降旗保险丝同长）。
    // v1.38.5：等的是"看起来还在生成"（旗子 / 停止按钮 / 字数刚变过），不只等旗子；
    // 上限放到 20 分钟——会思考的模型一楼出好几分钟，3 分钟一到就往流式的楼里塞稿才是真丢稿。
    function adrDWaitForGenerationIdle(maxMs) {
        var cap = Math.max(Number(maxMs) || 0, ADR_D_GEN_IDLE_WAIT_CAP_MS);
        return new Promise(function (resolve) {
            var started = Date.now();
            (function tick() {
                var live = adrDGenerationLooksLive();
                if (!live || Date.now() - started >= cap) return resolve(!live);
                setTimeout(tick, 500);
            })();
        });
    }
    var ADR_D_GEN_IDLE_WAIT_CAP_MS = 1200000;

    async function run(type, extra, opts) {
        if (processing) return false;

        opts = opts || {};
        var isAutoRun = !!opts.autoTrigger;
        var beatKey = opts.beatKey || "";

        syncShared();
        syncType(type);

        // v1.38.4：记下开跑时的聊天。API 一等几十秒，用户这时候换了角色卡，回来的稿子是上一把的，
        // 绝不能挂到新聊天的楼里、更不能存进新聊天的浮动稿（那就常驻了）。
        var homeKey = adrDChatKey();
        adrDRunChatKey = homeKey;
        adrDAbortWasChatSwitch = false;

        processing = true;
        setButtons(type);
        adr048SetFabBusy(true);
        status(type, "正在分析…", "#8ed99d");

        var success = false;
        var failureKind = "api";
        var failureMsg = "";
        try {
            var out = await callAPI(type, extra || "");
            setPreview(type, out);
            adrDClearExtraInstruction(type);
            status(type, "分析完成 ✓（补充指令已清空）", "#8ed99d");

            var st = settings();
            var autoKey = type === "plot" ? "autoInjectPlot" : "autoInjectEmotion";
            if (st[autoKey] && adrDChatKey() === homeKey && adrDGenerationLooksLive()) {
                status(type, "分析完成，这一楼还在生成，等写完再挂…", "#d6b177");
                await adrDWaitForGenerationIdle(180000);
            }
            if (adrDChatKey() !== homeKey) {
                failureKind = "chat-switched";
                failureMsg = "中途切换了聊天";
                status(type, "分析完成，但你中途切换了聊天：这份稿是上一把的，不挂到这把（预览框里还在）", "#d6b177");
                try { console.warn("[Arrebol D] director result discarded: chat switched mid-run", { type: type, from: homeKey, to: adrDChatKey() }); } catch (eSwLog) {}
            } else if (st[autoKey]) {
                var ok = isAutoRun ? await injectDirectorAsync(type, out) : injectDirector(type, out);
                if (ok) {
                    success = true;
                    status(type, "分析完成并已注入当前聊天 ✓", "#8ed99d");
                } else {
                    success = false;
                    failureKind = "inject";
                    failureMsg = "自动注入失败";
                    status(type, isAutoRun ? "分析完成，但自动注入失败；已保留本拍，稍后自动重试" : "分析完成，但自动注入失败，请手动复制", "#d6b177");
                }
            } else {
                success = true;
            }
        } catch (e) {
            failureMsg = e && e.message ? e.message : String(e);
            if (e && e.name === "TimeoutError") failureKind = "timeout";
            else if (e && e.name === "SaveChatError") failureKind = "save";
            else if (e && e.name === "AbortError" && adrDAbortWasManual) failureKind = "manual-abort";
            else if (e && e.name === "AbortError") failureKind = "abort";
            else failureKind = "api";

            if (e && e.name === "AbortError" && adrDAbortWasChatSwitch) failureKind = "chat-switched";

            var msg = (failureKind === "manual-abort" || failureKind === "abort") ? "请求已打断" : failureMsg;
            if (failureKind === "chat-switched") status(type, "你中途切换了聊天，上一把的分析已取消", "#d6b177");
            else status(type, "失败：" + msg, "#d4726a");
            success = false;
        }

        processing = false;
        aborter = null;
        adrDRunChatKey = "";
        adrDAbortWasChatSwitch = false;
        adr048SetFabBusy(false);
        setButtons(type);

        if (!success && failureKind !== "manual-abort" && failureKind !== "abort" && failureKind !== "chat-switched") {
            adrDReportFailure(failureKind, type, failureMsg, isAutoRun ? beatKey : "");
        }
        return success;
    }

    // v1.38.4：换聊天时若导演还在等 API，直接掐掉——回来的稿子反正不能用，省一截流量，也不让它占着 processing。
    function adrDAbortRunIfChatSwitched(reason) {
        try {
            if (!processing || !adrDRunChatKey) return false;
            if (adrDChatKey() === adrDRunChatKey) return false;
            adrDAbortWasChatSwitch = true;
            try { console.warn("[Arrebol D] chat switched mid-run, aborting director request", reason || ""); } catch (eLog) {}
            if (aborter) { try { aborter.abort(); } catch (eAb) {} }
            return true;
        } catch (e) { return false; }
    }

    function abortRun(type) {
        try {
            adrDAbortWasManual = true;
            if (aborter) aborter.abort();
            status(type, "已打断请求", "#d4726a");
        } catch (e) {
            status(type, "打断失败：" + e.message, "#d4726a");
        }
        processing = false;
        aborter = null;
        adr048SetFabBusy(false);
        setButtons(type);
    }

    function copyText(type) {
        var pv = qForm("adr044-" + type + "-preview");
        var text = pv ? pv.value : "";
        if (!text) {
            status(type, "没有内容可复制", "#d4726a");
            return;
        }

        try {
            if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text);
            else {
                pv.focus();
                pv.select();
                document.execCommand("copy");
            }
            status(type, "已复制 ✓", "#8ed99d");
        } catch (e) {
            status(type, "复制失败", "#d4726a");
        }
    }


    function adrDSanitizeInjectionBody(body) {
        // v1.9.27：正文消毒。导演输出若自带 "###"，会提前闭合标记块并干扰清理正则。
        // 全部替换为全角 "＃＃＃"，语义可读，永不与标记冲突。
        return String(body || "").trim().replace(/###/g, "＃＃＃");
    }

    function plainMarkerInjection(type, title, body) {
        // 像生图 image###...### 一样的纯文本包裹。
        // 不使用任何 HTML 标签/注释，避免干扰酒馆美化正则。
        // v1.9.27：标记带类型（arrebol_d:emotion### / arrebol_d:plot###）。
        // 情感/剧情各删各的旧块，双导演同拍注入不再互删。
        var t = type === "plot" ? "plot" : "emotion";
        return "\n\narrebol_d:" + t + "###\n"
            + "【暗河红霞 Arrebol D｜" + title + "】\n"
            + adrDSanitizeInjectionBody(body)
            + "\n###";
    }

    // ================= v1.9.34 跟组导演 · 跟随注入 · NG 检测 =================
    // 三件共用 1.9.31 的 per-chat（chatKey）存储地基。
    // 铁律：全程不读写 auto state，基准线体系零接触。

    var ADR_D_DIRECTOR_LOG_KEY = "arrebol_d_director_log_v1";
    var ADR_D_FLOAT_KEY = "arrebol_d_float_note_v1";
    var ADR_D_FLOAT_EP_KEY = "ARREBOL_D_DIRECTOR_FLOAT";
    var ADR_D_DIRECTOR_LOG_MAX = 3;
    var ADR_D_DIRECTOR_LOG_ITEM_CHARS = 1500;
    var ADR_D_NG_THRESHOLD = 3;

    // v1.24.0：按原文缓存解析结果——同一份 LS 原文不重复 JSON.parse。
    // 返回的是同一个对象，调用方改完必须经 adrDWriteJsonLS 写回，写回即刷新缓存。
    var adrDJsonLsCache = {};

    function adrDReadJsonLS(key) {
        try {
            var raw = rootWin().localStorage.getItem(key);
            if (!raw) return {};
            var hit = adrDJsonLsCache[key];
            if (hit && hit.raw === raw) return hit.obj;
            var obj = JSON.parse(raw);
            obj = obj && typeof obj === "object" ? obj : {};
            adrDJsonLsCache[key] = { raw: raw, obj: obj };
            return obj;
        } catch (e) { return {}; }
    }

    function adrDWriteJsonLS(key, obj) {
        try {
            var raw = JSON.stringify(obj || {});
            rootWin().localStorage.setItem(key, raw);
            adrDJsonLsCache[key] = { raw: raw, obj: obj || {} };
        } catch (e) {}
    }

    // ================= v1.24.0 导演的记忆搬进聊天文件 =================
    // 基准线、跟组记录、常驻贴耳稿、放养标记——此前全在浏览器 localStorage 按 chatKey 存，
    // 换设备、换网址、清一次缓存，导演就失忆：进度从头数、贴耳稿消失、不记得自己下过什么指导。
    // 现与抽卡模块同构：chat_metadata 主档（随聊天文件走）+ localStorage 按 chatKey 镜像（灾备）。
    // 老存档首次打开时从旧 LS 键搬家一次；旧键原样留着，回退到 1.23 仍能用。
    // 副产品：靠"猜这是不是同一把聊天"活着的那套跨聊天继承／last-key 迁移一并退役——
    // 状态跟聊天在一起了，不需要猜。

    var ADR_D_META_KEY = "arrebol_d";
    var ADR_D_META_LS_KEY = "arrebol_d_chat_v1";
    var ADR_D_AUTO_STATE_KEY = "arrebol_d_auto_trigger_state_v1";   // 旧键，只读搬家用
    var ADR_D_GRAZE_KEY = "arrebol_d_graze_v1";                       // 旧键，只读搬家用

    function adrDTypeOf(type) { return type === "plot" ? "plot" : "emotion"; }

    function adrDNormAutoItem(o) {
        if (!o || typeof o !== "object") return null;
        var base = Number(o.base);
        if (!Number.isFinite(base) || base < 0) return null;
        var item = { base: base, updatedAt: Number(o.updatedAt) || Date.now(), mode: String(o.mode || "window-v1") };
        ["migratedFromMode", "healedFromBase", "deleteShifted"].forEach(function (k) { if (o[k] != null) item[k] = o[k]; });
        return item;
    }

    function adrDNormLogList(list) {
        var out = [];
        (Array.isArray(list) ? list : []).forEach(function (it) {
            if (!it || typeof it !== "object" || typeof it.text !== "string" || !it.text) return;
            out.push({ t: Number(it.t) || 0, floor: Number.isFinite(Number(it.floor)) ? Number(it.floor) : -1, text: it.text });
        });
        while (out.length > ADR_D_DIRECTOR_LOG_MAX) out.shift();
        return out;
    }

    function adrDNormGraze(o) {
        if (!o || typeof o !== "object" || !o.on) return null;
        return { on: true, t: Number(o.t) || 0, floor: Number.isFinite(Number(o.floor)) ? Number(o.floor) : -1 };
    }

    function adrDNormalizeChatState(o) {
        o = o && typeof o === "object" ? o : {};
        var auto = o.auto && typeof o.auto === "object" ? o.auto : {};
        var log = o.log && typeof o.log === "object" ? o.log : {};
        var graze = o.graze && typeof o.graze === "object" ? o.graze : {};
        var fl = null;
        if (o.float && typeof o.float === "object" && typeof o.float.text === "string" && o.float.text) {
            fl = { t: Number(o.float.t) || 0, type: adrDTypeOf(o.float.type), text: o.float.text };
        }
        return {
            v: 1,
            auto: { emotion: adrDNormAutoItem(auto.emotion), plot: adrDNormAutoItem(auto.plot) },
            log: { emotion: adrDNormLogList(log.emotion), plot: adrDNormLogList(log.plot) },
            float: fl,
            graze: { emotion: adrDNormGraze(graze.emotion), plot: adrDNormGraze(graze.plot) },
            tone: adrDNormTone(o.tone)   // v1.30.0 这局的基调
        };
    }

    // 旧 LS 四把钥匙里，属于当前 chatKey 的那一份，拼成一份新状态；一样都没有就返回 null。
    // 一把聊天只扫一次：旧版本不会再往旧键里写，扫过没有就是没有。
    var adrDLegacyScanned = {};

    function adrDLegacyChatState() {
        var key = adrDChatKey();
        if (adrDLegacyScanned[key]) return null;
        adrDLegacyScanned[key] = true;
        var st = adrDNormalizeChatState(null);
        var found = false;
        try {
            var autoAll = adrDReadJsonLS(ADR_D_AUTO_STATE_KEY);
            ["emotion", "plot"].forEach(function (t) {
                var it = adrDNormAutoItem(autoAll[key + "::" + t]);
                if (it) { st.auto[t] = it; found = true; }
            });
        } catch (e0) {}
        try {
            var logAll = adrDReadJsonLS(ADR_D_DIRECTOR_LOG_KEY);
            ["emotion", "plot"].forEach(function (t) {
                var lst = adrDNormLogList(logAll[key + "::" + t]);
                if (lst.length) { st.log[t] = lst; found = true; }
            });
        } catch (e1) {}
        try {
            var flAll = adrDReadJsonLS(ADR_D_FLOAT_KEY);
            var fl = flAll[key];
            if (fl && typeof fl.text === "string" && fl.text) { st.float = { t: Number(fl.t) || 0, type: adrDTypeOf(fl.type), text: fl.text }; found = true; }
        } catch (e2) {}
        try {
            var gzAll = adrDReadJsonLS(ADR_D_GRAZE_KEY);
            ["emotion", "plot"].forEach(function (t) {
                var g = adrDNormGraze(gzAll[key + "::" + t]);
                if (g) { st.graze[t] = g; found = true; }
            });
        } catch (e3) {}
        return found ? st : null;
    }

    function adrDChatState() {
        try {
            var root = adrCdMetaRoot();
            if (root && root[ADR_D_META_KEY] && typeof root[ADR_D_META_KEY] === "object") {
                return adrDNormalizeChatState(root[ADR_D_META_KEY]);
            }
            var keyReady = false;
            try { keyReady = adrDChatKeyReady(); } catch (eK) { keyReady = false; }
            if (keyReady) {
                var all = adrDReadJsonLS(ADR_D_META_LS_KEY);
                var mirror = all[adrDChatKey()];
                if (mirror && typeof mirror === "object") {
                    var fromMirror = adrDNormalizeChatState(mirror);
                    if (root) adrDSaveChatState(fromMirror);   // 主档没有、镜像有：回填主档
                    return fromMirror;
                }
                var legacy = adrDLegacyChatState();
                if (legacy) {
                    adrDSaveChatState(legacy);
                    try { console.log("[Arrebol D] 导演记忆已从浏览器搬进聊天文件", adrDChatKey()); } catch (eLog) {}
                    return legacy;
                }
            }
        } catch (e) {}
        return adrDNormalizeChatState(null);
    }

    function adrDSaveChatState(state) {
        var clean = adrDNormalizeChatState(state);
        var metaOk = false;
        var keyReady = false;
        try { keyReady = adrDChatKeyReady(); } catch (eK) { keyReady = false; }
        try {
            var root = adrCdMetaRoot();
            if (root) {
                root[ADR_D_META_KEY] = clean;
                metaOk = true;
                var c = ctx();
                if (typeof c.saveMetadataDebounced === "function") c.saveMetadataDebounced();
                else if (typeof c.saveMetadata === "function") c.saveMetadata();
            }
        } catch (eMeta) { metaOk = false; }
        if (keyReady) {
            try {
                var all = adrDReadJsonLS(ADR_D_META_LS_KEY);
                all[adrDChatKey()] = clean;
                adrDWriteJsonLS(ADR_D_META_LS_KEY, all);
            } catch (eLs) {}
        }
        return metaOk || keyReady;
    }

    // ================= v1.30.0 基调仓 =================
    // 两位导演此前只认角色卡：卡写将军，就往家国天下调；卡苦大仇深，就往虐里调。
    // 可同一张卡，有人想玩两小无猜、有人想搞笑、有人想国破山河在、有人纯搞色——卡不知道，用户知道。
    // 基调是用户亲口写下的"这局想玩什么"，压过角色卡、世界书、人设与此前剧情暗示的一切调子，是两位导演的第一要义。
    // 基调仓（账号级 toneStore）存命名条目，出厂几条按名补齐一次（toneSeeded 记账，删过不复活）；
    // 这局用哪条、改成什么样，存在聊天文件（adrDChatState().tone），换聊天各记各的、换设备不失忆。
    // 只喂两位导演；小眼睛（择池／择卡）不看基调，它的"整体调性"另有来源。
    var ADR_D_FACTORY_TONES = {
        "轻松日常": "这局想玩轻松的日常，不虐、不搞大冲突。重点是两个人相处时的松弛和小趣味，矛盾点到为止，当天就能翻篇。",
        "甜甜恋爱": "这局就是想谈恋爱。往心动、暧昧、试探、靠近走，别拖、别虐、别搞第三者；角色卡里的旧账和苦难只当背景，不拿出来压人。",
        "两小无猜": "这局想玩青梅竹马、两小无猜。熟稔、拌嘴、默契、不用解释的亲近感是重点；不搞陌生人式的试探，也不搞大起大落。",
        "搞笑沙雕": "这局想玩搞笑的。允许夸张、吐槽、乌龙和反差萌，节奏要快、要好笑；深刻和沉重一概不要，哪怕卡本身很正经。",
        "慢热细水": "这局想慢慢来。关系一步一步往前挪，重视日常细节和分寸感，不秒爱、不秒推进；情绪温度维持温热，偶尔一点小波澜。",
        "虐恋深情": "这局想虐一点。误会、错过、身不由己都可以上，但要虐得有来有回、有回甘，不要单方面折磨；底色还是深情。",
        "家国大义": "这局想玩大格局。个人感情放在时代和局势里写，家国、责任、代价是主线，感情线克制、点到为止，不要小情小爱盖过大势。",
        "纯欲向": "这局以情欲张力为主线。允许直白的身体吸引和拉扯，感情线为它服务；剧情事件只做铺垫和调剂，不要抢戏，不要突然插入沉重转折。"
    };

    function adrDToneStore() {
        var st = settings();
        if (!st.toneStore || typeof st.toneStore !== "object" || Array.isArray(st.toneStore)) st.toneStore = {};
        var seeded = Array.isArray(st.toneSeeded) ? st.toneSeeded.slice() : [];
        var touched = false;
        Object.keys(ADR_D_FACTORY_TONES).forEach(function (k) {
            if (typeof st.toneStore[k] === "string") {
                if (seeded.indexOf(k) < 0) { seeded.push(k); touched = true; }
                return;
            }
            if (seeded.indexOf(k) >= 0) return;   // 删过就尊重，不复活
            st.toneStore[k] = ADR_D_FACTORY_TONES[k];
            seeded.push(k);
            touched = true;
        });
        if (touched) { st.toneSeeded = seeded; save("toneStore", st.toneStore); save("toneSeeded", seeded); }
        return st.toneStore;
    }

    function adrDToneNames() { return Object.keys(adrDToneStore()); }

    function adrDSaveToneToStore(name, text) {
        var store = adrDToneStore();
        store[name] = text;
        save("toneStore", store);
        saveNow();
    }

    function adrDDeleteToneFromStore(name) {
        var store = adrDToneStore();
        if (!(name in store)) return false;
        delete store[name];
        save("toneStore", store);
        var st = settings();
        var seeded = Array.isArray(st.toneSeeded) ? st.toneSeeded.slice() : [];
        if (seeded.indexOf(name) < 0) { seeded.push(name); save("toneSeeded", seeded); }   // 出厂条目删过就记账
        saveNow();
        return true;
    }

    function adrDNormTone(o) {
        if (!o || typeof o !== "object" || typeof o.text !== "string" || !o.text.trim()) return null;
        return { text: o.text, name: typeof o.name === "string" ? o.name : "", t: Number(o.t) || 0 };
    }

    function adrDChatTone() {
        try { return adrDChatState().tone || null; } catch (e) { return null; }
    }

    function adrDToneText() {
        var t = adrDChatTone();
        return t ? String(t.text || "").trim() : "";
    }

    function adrDSetChatTone(text, name) {
        try {
            var state = adrDChatState();
            var clean = String(text || "");
            state.tone = clean.trim() ? { text: clean, name: String(name || ""), t: Date.now() } : null;
            return adrDSaveChatState(state);
        } catch (e) { return false; }
    }

    // 喂给导演的基调段：放在采买清单最前面，一次性补充指令之前——它是长期的框，补充指令只是这一拍的临时插话。
    function adrDToneBlock() {
        var text = adrDToneText();
        if (!text) return "";
        return [
            "【用户基调 · 第一要义】",
            "以下是用户亲口写下的、这局想玩的方向。它压过角色卡、世界书、人设与此前剧情所暗示的一切调子：卡写得再苦大仇深，用户说想谈恋爱，指导就得帮着谈恋爱；卡是家国天下，用户说想玩轻松校园，就往轻松校园调。",
            "你给的每一条方向都必须服务于这个基调；与基调相悖的方向，哪怕更「符合原卡」，也不要给。若最近正文已经偏离了基调，指导要把它拉回来，而不是顺着偏。",
            "基调正文：",
            text,
            "【基调结束】"
        ].join("\n");
    }

    // 系统消息里再钉一句：系统位分量重，用户预设改成什么样都压不掉它。
    function adrDToneSystemLine() {
        if (!adrDToneText()) return "";
        return "【硬性】用户消息里的【用户基调】是第一要义：所有分析与指导以它为准，角色卡、世界书与此前剧情只在不与基调冲突时才作依据。";
    }

    function adrDToneSelectOptionsHTML(sel) {
        var names = adrDToneNames();
        var html = '<option value=""' + (sel ? "" : " selected") + '>— 从基调仓选一条填入 —</option>';
        names.forEach(function (nm) {
            html += '<option value="' + esc(nm) + '"' + (nm === sel ? " selected" : "") + '>' + esc(nm) + '</option>';
        });
        return html;
    }

    function adrDToneSelectedName() {
        var t = adrDChatTone();
        if (!t || !t.name) return "";
        return adrDToneNames().indexOf(t.name) >= 0 ? t.name : "";
    }

    function adrDToneHint() {
        var t = adrDChatTone();
        if (!t) return "留空＝不设基调，导演照卡走。选一条或自己写，按聊天各记各的，换设备不丢。";
        return "这局基调已生效" + (t.name ? "（「" + t.name + "」）" : "（自己写的）") + "：两位导演以它为第一要义。";
    }

    function adrDToneBlockHTML(actionsClass) {
        var t = adrDChatTone();
        var sel = adrDToneSelectedName();
        var names = adrDToneNames();
        return '<label>这局的基调（你想玩什么 · 导演的第一要义 · 按聊天各记各的）</label>'
            + '<select id="adr044-tone-select" data-optsig="' + esc(adrCdOptSig("tone", names, sel)) + '">' + adrDToneSelectOptionsHTML(sel) + '</select>'
            + '<textarea id="adr044-tone" rows="3" placeholder="例：这局想玩轻松校园日常，不虐、不搞政治，重点是两小无猜的甜。留空＝不设基调，导演照卡走。">' + esc(t ? t.text : "") + '</textarea>'
            + '<input type="text" id="adr044-tone-name" placeholder="存进基调仓时的名字（选中仓里一条时自动填）" value="' + esc(t ? t.name : "") + '">'
            + '<div class="' + actionsClass + '"><button type="button" id="adr044-tone-save">存进基调仓</button><button type="button" id="adr044-tone-delete">从仓里删掉</button><button type="button" id="adr044-tone-clear">清空这局基调</button></div>'
            + '<div class="adr044-template-status" id="adr044-tone-status">' + esc(adrDToneHint()) + '</div>';
    }

    function adrDToneStatus(text, color) {
        adrCdSetTextAll("adr044-tone-status", text, color || "#d6b177");
    }

    // 从存档回填到两块面板。正在打字的那一个不动（activeElement），免得把手上的字冲掉。
    function adrDRefreshToneFields() {
        try {
            var d = rootDoc();
            var t = adrDChatTone();
            var sel = adrDToneSelectedName();
            var names = adrDToneNames();
            var sig = adrCdOptSig("tone", names, sel);
            var html = adrDToneSelectOptionsHTML(sel);
            var active = d.activeElement;
            Array.prototype.slice.call(d.querySelectorAll("#adr044-tone-select")).forEach(function (el) { adrCdFillSelect(el, html, sel, sig); });
            Array.prototype.slice.call(d.querySelectorAll("#adr044-tone")).forEach(function (el) {
                if (el === active) return;
                var v = t ? t.text : "";
                if (el.value !== v) el.value = v;
            });
            Array.prototype.slice.call(d.querySelectorAll("#adr044-tone-name")).forEach(function (el) {
                if (el === active) return;
                var v = t ? t.name : "";
                if (el.value !== v) el.value = v;
            });
            adrDToneStatus(adrDToneHint(), "");
        } catch (e) {}
    }

    function adrDApplyTonePreset(name) {
        try {
            var store = adrDToneStore();
            if (!name || typeof store[name] !== "string") { adrDRefreshToneFields(); return; }
            var okSave = adrDSetChatTone(store[name], name);
            adrDRefreshToneFields();
            adrDToneStatus(okSave ? "已填入「" + name + "」并存进这局 ✓ 可以在下面继续改" : "已填入「" + name + "」，但这局存档尚未就绪，请退出聊天再进来重试", okSave ? "#8ed99d" : "#d4726a");
        } catch (e) {}
    }

    function adrDSaveToneFromFields() {
        try {
            var ta = qForm("adr044-tone");
            var nameEl = qForm("adr044-tone-name");
            var selEl = qForm("adr044-tone-select");
            var text = ta ? String(ta.value || "").trim() : adrDToneText();
            var name = nameEl ? String(nameEl.value || "").trim() : "";
            if (!name && selEl) name = String(selEl.value || "").trim();
            if (!text) { adrDToneStatus("基调是空的，没什么可存", "#d4726a"); return; }
            if (!name) { adrDToneStatus("先给这条基调起个名（上面那一行）", "#d4726a"); return; }
            var existed = typeof adrDToneStore()[name] === "string";
            adrDSaveToneToStore(name, text);
            adrDSetChatTone(text, name);
            adrDRefreshToneFields();
            adrDToneStatus((existed ? "已更新仓里的「" : "已存进基调仓「") + name + "」✓ 这局也按它走", "#8ed99d");
        } catch (e) {}
    }

    function adrDDeleteToneFromFields() {
        try {
            var selEl = qForm("adr044-tone-select");
            var nameEl = qForm("adr044-tone-name");
            var name = selEl ? String(selEl.value || "").trim() : "";
            if (!name && nameEl) name = String(nameEl.value || "").trim();
            if (!name) { adrDToneStatus("先在下拉里选中要删的那条", "#d4726a"); return; }
            if (!adrDDeleteToneFromStore(name)) { adrDToneStatus("仓里没有「" + name + "」", "#d4726a"); return; }
            // 这局的基调文字留着——删的是仓里的条目，不是这局的选择
            var t = adrDChatTone();
            if (t && t.name === name) adrDSetChatTone(t.text, "");
            adrDRefreshToneFields();
            adrDToneStatus("已从基调仓删掉「" + name + "」（这局的文字还在，不受影响）", "#d6b177");
        } catch (e) {}
    }

    function adrDClearChatTone() {
        try {
            adrDSetChatTone("", "");
            adrDRefreshToneFields();
            adrDToneStatus("这局基调已清空，导演照卡走", "#d6b177");
        } catch (e) {}
    }

    function adrDBindToneControls() {
        try {
            Array.prototype.slice.call(rootDoc().querySelectorAll("#adr044-tone-select")).forEach(function (el) {
                if (el.__adrDToneBound) return;
                el.__adrDToneBound = true;
                el.addEventListener("change", function () { adrDApplyTonePreset(String(el.value || "")); });
            });
            Array.prototype.slice.call(rootDoc().querySelectorAll("#adr044-tone")).forEach(function (el) {
                if (el.__adrDToneBound) return;
                el.__adrDToneBound = true;
                var commit = function () {
                    var nameEl = qForm("adr044-tone-name");
                    var t = adrDChatTone();
                    var name = nameEl ? String(nameEl.value || "").trim() : (t ? t.name : "");
                    adrDSetChatTone(el.value || "", name);
                };
                el.addEventListener("input", commit);
                el.addEventListener("change", function () { commit(); adrDRefreshToneFields(); });
                el.addEventListener("blur", function () { commit(); adrDRefreshToneFields(); });
            });
            Array.prototype.slice.call(rootDoc().querySelectorAll("#adr044-tone-name")).forEach(function (el) {
                if (el.__adrDToneBound) return;
                el.__adrDToneBound = true;
                el.addEventListener("change", function () {
                    var t = adrDChatTone();
                    if (t) adrDSetChatTone(t.text, String(el.value || "").trim());
                });
            });
        } catch (e) {}
    }

    try {
        rootWin().__adrDToneTest = {
            block: adrDToneBlock, systemLine: adrDToneSystemLine, text: adrDToneText,
            set: adrDSetChatTone, store: adrDToneStore, names: adrDToneNames, factory: ADR_D_FACTORY_TONES,
            refresh: adrDRefreshToneFields
        };
    } catch (eToneHook) {}

    // ---- 跟组导演：滚动存最近 N 条"已注入"的指导 ----
    function adrDDirectorLogList(type) {
        try { return adrDChatState().log[adrDTypeOf(type)] || []; } catch (e) { return []; }
    }

    function adrDDirectorLogPush(type, text) {
        try {
            if (!settings().directorLogEnabled) return;
            var body = String(text || "").trim();
            if (!body) return;
            if (body.length > ADR_D_DIRECTOR_LOG_ITEM_CHARS) body = body.slice(0, ADR_D_DIRECTOR_LOG_ITEM_CHARS) + "…";
            var state = adrDChatState();
            var t = adrDTypeOf(type);
            var list = state.log[t] || [];
            list.push({ t: Date.now(), floor: adrDAssistantRoundCount(), text: body });
            while (list.length > ADR_D_DIRECTOR_LOG_MAX) list.shift();
            state.log[t] = list;
            adrDSaveChatState(state);
        } catch (e) {}
    }

    function adrDDirectorLogBlock(type) {
        try {
            if (!settings().directorLogEnabled) return "";
            var list = adrDDirectorLogList(type);
            if (!list.length) return "";
            var lines = list.map(function (it, i) {
                var floorTxt = Number.isFinite(Number(it.floor)) && Number(it.floor) >= 0 ? "（下达于第 " + it.floor + " 楼）" : "";
                return "· 指导 " + (i + 1) + floorTxt + "：\n" + String(it.text || "");
            });
            return "【跟组记录｜你此前已下达的 " + list.length + " 条指导，最早在前】\n"
                + lines.join("\n\n")
                + "\n\n请先衡量最近一条指导的执行情况，连贯后给本轮指导，剧情或情感动线要丝滑，逻辑要完整。";
        } catch (e) { return ""; }
    }

    // ---- 跟随注入：最新指导挂扩展提示词通道，不占楼层，藏楼/摘要正则都碰不到 ----
    function adrDFloatDepth() {
        var d = Number(settings().floatDepth);
        if (!Number.isFinite(d) || d < 0) d = 2;
        if (d > 99) d = 99;
        return Math.round(d);
    }

    function adrDApplyFloatPrompt(text) {
        try {
            var c = ctx();
            if (typeof c.setExtensionPrompt !== "function") return false;
            var EPT = c.extensionPromptTypes || c.extension_prompt_types || {};
            var pos = EPT.IN_CHAT != null ? EPT.IN_CHAT : 1;
            var EPR = c.extensionPromptRoles || c.extension_prompt_roles || {};
            var role = EPR.SYSTEM != null ? EPR.SYSTEM : 0;
            c.setExtensionPrompt(ADR_D_FLOAT_EP_KEY, String(text || ""), pos, adrDFloatDepth(), false, role);
            return true;
        } catch (e) { return false; }
    }

    function adrDFloatText(type, text) {
        var title = type === "plot" ? "统筹" : "情感导演";
        return "【暗河红霞 Arrebol D｜" + title + "·最新指导（常驻）】\n" + String(text || "").trim();
    }

    function adrDUpdateFloatFromInjection(type, text) {
        try {
            var st = settings();
            if (!st.floatInjectEnabled || !adrDMasterEnabled()) return;
            var body = adrDFloatText(type, text);
            var state = adrDChatState();
            state.float = { t: Date.now(), type: adrDTypeOf(type), text: body };
            adrDSaveChatState(state);
            adrDApplyFloatPrompt(body);
        } catch (e) {}
    }

    function adrDRestoreFloatForCurrentChat(reason) {
        try { adrCdRestoreFloat(reason); } catch (eCdRestore) {} // v1.10.0：抽卡小能手耳机同车恢复（导演早退路径不影响）
        try {
            var st = settings();
            if (!st.floatInjectEnabled || !adrDMasterEnabled()) {
                adrDApplyFloatPrompt("");
                return;
            }
            var item = adrDChatState().float;
            adrDApplyFloatPrompt(item && item.text ? item.text : "");
        } catch (e) {}
    }

    // ================= v1.13.0 放养模式：手动放养 · 自动归队 =================
    // 点一下撕掉本类型当前贴耳稿（正文块，浮动稿同类型时一并撤下）。
    // 轮换计数照常走、基准线体系零接触、放养期间零生成；
    // 到下一个换稿点自动触发正常生成并挂上，放养自动结束。
    // 铁律：不读写 auto state，不动 baseline；归队唯一判据 = 该类型任意一次成功注入。

    function adrDGrazeActive(type) {
        try { return !!adrDChatState().graze[adrDTypeOf(type)]; } catch (e) { return false; }
    }

    function adrDGrazeSet(type, on) {
        try {
            var state = adrDChatState();
            state.graze[adrDTypeOf(type)] = on ? { on: true, t: Date.now(), floor: adrDAssistantRoundCount() } : null;
            return adrDSaveChatState(state);
        } catch (e) { return false; }
    }

    function adrDGrazeClearOnInjection(type) {
        // 归队唯一入口：本类型稿子真正挂上（自动触发 / 手动注入皆算）。
        try {
            if (adrDGrazeActive(type)) {
                adrDGrazeSet(type, false);
                try { adrDToast((type === "plot" ? "统筹" : "情感导演") + "已归队，新稿已挂上"); } catch (eT) {}
            }
        } catch (e) {}
    }

    function adrDStripDirectorInjectionEverywhere(type) {
        // 全楼层扫一遍，只撕本类型的块；另一类型原地保留。
        // 复用注入函数已验证的清理模式（HTML 注释标记 / 带类型纯文本标记）。
        // 刻意不带 ≤1.9.26 的 $ 锚定旧可见头正则：全楼扫描下它可能吞掉标记后的真实正文。
        var changed = 0;
        try {
            var c = ctx();
            var chat = c.chat;
            if (!chat || !chat.length) return changed;

            var t = type === "plot" ? "plot" : "emotion";
            var startMark = "<!-- ARREBOL_D_START:" + t + " -->";
            var endMark = "<!-- ARREBOL_D_END:" + t + " -->";
            var startMark2 = "<!-- ARREBOL_D_START:" + t;
            var endMark2 = "ARREBOL_D_END:" + t + " -->";
            var reTypedOwn = new RegExp("\\n?arrebol_d(?:_visible)?:" + t + "###[\\s\\S]*?###", "g");

            for (var i = 0; i < chat.length; i++) {
                var m = chat[i];
                if (!m || m.is_user === true) continue;
                var mes = String(m.mes || "");
                if (!mes) continue;
                var before = mes;

                var startAt = mes.indexOf(startMark);
                while (startAt >= 0) {
                    var endAt = mes.indexOf(endMark, startAt);
                    if (endAt < 0) break;
                    mes = mes.slice(0, startAt).trimEnd() + mes.slice(endAt + endMark.length);
                    startAt = mes.indexOf(startMark);
                }
                var startAt2 = mes.indexOf(startMark2);
                while (startAt2 >= 0) {
                    var endAt2 = mes.indexOf(endMark2, startAt2);
                    if (endAt2 < 0) break;
                    mes = mes.slice(0, startAt2).trimEnd() + mes.slice(endAt2 + endMark2.length);
                    startAt2 = mes.indexOf(startMark2);
                }
                mes = mes.replace(reTypedOwn, "");

                if (mes !== before) {
                    adrDSetMessageText(chat[i], mes.trimEnd());
                    adrDNoteRedraw(i);
                    changed++;
                }
            }
        } catch (e) {
            try { console.error("[Arrebol D] graze strip failed", e); } catch (e2) {}
        }
        return changed;
    }

    function adrDGrazeClearFloatIfType(type) {
        // 常驻浮动稿是全聊天单槽；只有当前挂的是本类型时才撤，另一类型的浮动稿不动。
        try {
            var state = adrDChatState();
            var item = state.float;
            if (item && item.type === adrDTypeOf(type)) {
                state.float = null;
                adrDSaveChatState(state);
                adrDApplyFloatPrompt("");
                return true;
            }
        } catch (e) {}
        return false;
    }

    async function adrDStartGraze(type) {
        type = type === "plot" ? "plot" : "emotion";
        var title = type === "plot" ? "统筹" : "情感导演";
        try {
            if (!adrDMasterEnabled()) {
                status(type, "总开关已关闭，导演本来就不在岗", "#d6a26a");
                return false;
            }
            if (!adrDChatKeyReady || !adrDChatKeyReady()) {
                status(type, "聊天还在加载，稍等几秒再放养", "#d6a26a");
                return false;
            }
            if (adrDGrazeActive(type)) {
                status(type, title + "已在放养中，到下个换稿点自动归队", "#d6a26a");
                return false;
            }

            var changed = adrDStripDirectorInjectionEverywhere(type);
            var floatCleared = adrDGrazeClearFloatIfType(type);
            adrDGrazeSet(type, true);

            if (changed > 0 || floatCleared) {
                try { await adrDSaveThenRedrawAfterInject(); } catch (eSave) { try { console.warn("[Arrebol D] graze save failed", eSave); } catch (eW) {} }
            }

            try { adrDUpdateAutoCounters(); } catch (eC) {}
            status(type, title + "已放养 ✓ 当前稿已撤下，到下个换稿点自动归队", "#8ed99d");
            try { console.log("[Arrebol D] graze started", type, "strippedFloors=", changed, "floatCleared=", floatCleared); } catch (eLog) {}
            try { adrDToast(title + "放养中：轮换照常走，到点自动归队"); } catch (eT) {}
            return true;
        } catch (e) {
            try { console.error("[Arrebol D] graze start failed", e); } catch (e2) {}
            try { status(type, "放养失败：" + (e && e.message ? e.message : e), "#d4726a"); } catch (e3) {}
            return false;
        }
    }

    function adrDRequestGraze(type, btn) {
        type = type === "plot" ? "plot" : "emotion";
        return adrDTwoStepConfirm(
            "graze-" + type,
            btn || qForm("adr044-" + type + "-graze"),
            "确定放养？",
            "再点一次确认放养（撤下当前稿，到下个换稿点自动归队）",
            function (msg) { status(type, msg, "#d6a26a"); },
            function () { adrDStartGraze(type); }
        );
    }

    // ---- NG 检测：同一正文楼重 roll 达阈值提示请导演；纯旁观者，只提示不触发 ----
    var adrDNgState = { mesKey: "", notified: false };

    function adrDLastAssistantSwipeInfo() {
        try {
            var chat = ctx().chat;
            if (!chat || !chat.length) return null;
            for (var i = chat.length - 1; i >= 0; i--) {
                var m = chat[i];
                if (!m || m.is_system) continue;
                if (m.is_user === true || String(m.role || "").toLowerCase() === "user") continue;
                return { idx: i, swipes: Array.isArray(m.swipes) ? m.swipes.length : 1 };
            }
            return null;
        } catch (e) { return null; }
    }

    function adrDCheckNg(fromWhere) {
        try {
            if (!settings().ngDetectEnabled || !adrDMasterEnabled()) return;
            var info = adrDLastAssistantSwipeInfo();
            if (!info) return;
            var mesKey = (adrDChatKey ? adrDChatKey() : "") + "#" + info.idx;
            if (adrDNgState.mesKey !== mesKey) {
                adrDNgState = { mesKey: mesKey, notified: false };
                return;
            }
            // swipes 数组含首版：长度 4 = 重 roll 3 次。
            var rerolls = Math.max(0, info.swipes - 1);
            if (!adrDNgState.notified && rerolls >= ADR_D_NG_THRESHOLD) {
                adrDNgState.notified = true;
                adrDPopupMessage(
                    "这条戏 NG " + rerolls + " 次了",
                    "同一楼已连续重 roll " + rerolls + " 次，可能是方向没对上。要不要请统筹会诊？打开面板在统筹页点「分析」，想给方向就先填补充指令。"
                );
                try { console.log("[Arrebol D] NG detected", mesKey, "rerolls=", rerolls, "from=", fromWhere); } catch (eNgLog) {}
            }
        } catch (e) {}
    }

    function injectionText(type, text) {
        var title = type === "plot" ? "统筹" : "情感导演";
        var mode = settings().injectMode || "visible";
        var t = type === "plot" ? "plot" : "emotion";

        if (mode === "hidden" || mode === "folded") {
            return plainMarkerInjection(type, title, text);
        }

        return "\n\narrebol_d_visible:" + t + "###\n【暗河红霞 Arrebol D｜" + title + "】\n" + adrDSanitizeInjectionBody(text) + "\n###";
    }

    function findLastMessageIndex(chat) {
        if (!chat || !chat.length) return -1;

        for (var i = chat.length - 1; i >= 0; i--) {
            var m = chat[i];
            if (!m || m.is_system) continue;
            var role = String(m.role || "").toLowerCase();
            if (m.is_user === true || role === "user") continue;
            if (m.mes && String(m.mes).trim()) return i;
        }

        // 没有可注入的角色/助手楼层时，宁可不注入，也绝不写到 user input 楼。
        return -1;
    }


    function adrDNativeRedrawNow() {
        try {
            var rw = rootWin();
            var c = ctx();

            // v1.23.2：只重画改过的那几楼。旧写法每拍 reloadCurrentChat()——清空、重读、重渲染全部楼层
            // 再广播 CHAT_CHANGED，所有插件跟着重跑一遍，长聊天在手机上每拍卡一下、滚动位置跳。
            // 酒馆没有 updateMessageBlock 的老版本仍走整体重载。
            try {
                var pending = adrDPendingRedraw.slice();
                // v1.44.0：没有登记要重画的楼——稿子已经静默接在楼尾，画面是对的。到此为止，更不能往下走到整聊天重载。
                if (!pending.length) return true;
                if (pending.length && c && c.chat && typeof c.updateMessageBlock === "function") {
                    var drew = 0;
                    pending.forEach(function (idx) {
                        try {
                            if (c.chat[idx]) {
                                c.updateMessageBlock(idx, c.chat[idx]);
                                drew++;
                                // 照酒馆自己编辑楼层的做法广播一声：美化脚本、变量脚本按"这楼被编辑了"重跑，
                                // 不必再靠整聊天重载的 CHAT_CHANGED 顺带唤醒它们。
                                try {
                                    if (c.eventSource && c.event_types && c.event_types.MESSAGE_UPDATED) c.eventSource.emit(c.event_types.MESSAGE_UPDATED, idx);
                                } catch (eEv) {}
                            }
                        } catch (eOne) {}
                    });
                    adrDPendingRedraw = [];
                    if (drew) return true;
                }
            } catch (eBlock) {}
            adrDPendingRedraw = [];

            try {
                if (typeof rw.reloadCurrentChat === "function") {
                    rw.reloadCurrentChat();
                    return true;
                }
            } catch (e1) {}

            try {
                if (typeof c.reloadCurrentChat === "function") {
                    c.reloadCurrentChat();
                    return true;
                }
            } catch (e2) {}

            try {
                if (c.eventSource && c.event_types && c.event_types.CHAT_CHANGED) {
                    c.eventSource.emit(c.event_types.CHAT_CHANGED);
                    return true;
                }
            } catch (e3) {}

            try {
                if (rw.eventSource && rw.event_types && rw.event_types.CHAT_CHANGED) {
                    rw.eventSource.emit(rw.event_types.CHAT_CHANGED);
                    return true;
                }
            } catch (e4) {}
        } catch (e) {}

        return false;
    }

    function adrDSaveThenRedrawAfterInject() {
        // v1.9.26：温和可观测保存。
        // saveChat 若返回 Promise，则显式 reject 才判失败；不可观测时保守视为成功，避免卡死。
        return new Promise(function (resolve, reject) {
            try {
                var c = ctx();
                var done = false;

                function redrawLater(ms, ok, err) {
                    setTimeout(function () {
                        if (done) return;
                        done = true;
                        try { adrDNativeRedrawNow(); } catch (eRedraw) {}
                        if (ok === false) reject(err || new Error("聊天保存失败"));
                        else resolve(true);
                    }, ms);
                }

                try {
                    if (c && typeof c.saveChat === "function") {
                        var ret = c.saveChat();
                        if (ret && typeof ret.then === "function") {
                            ret.then(function () {
                                redrawLater(180, true);
                            }).catch(function (err) {
                                var e = err instanceof Error ? err : new Error(String(err || "聊天保存失败"));
                                e.name = "SaveChatError";
                                redrawLater(180, false, e);
                            });
                            return;
                        }
                    }
                } catch (e1) {
                    e1.name = e1.name || "SaveChatError";
                    redrawLater(180, false, e1);
                    return;
                }

                // 如果 saveChat 不是 Promise，就给移动端文件保存/IndexedDB 一点时间；不可观测不强判失败。
                redrawLater(1200, true);
            } catch (e) {
                console.warn("[Arrebol D] save then redraw failed", e);
                setTimeout(function () { try { adrDNativeRedrawNow(); } catch (e2) {} }, 1500);
                resolve(true);
            }
        });
    }


    function adrDBlurActiveElement() {
        try {
            var d = rootDoc();
            if (d && d.activeElement && typeof d.activeElement.blur === "function") {
                d.activeElement.blur();
                return true;
            }
        } catch (e1) {}

        try {
            var rw = rootWin();
            if (rw && rw.document && rw.document.activeElement && typeof rw.document.activeElement.blur === "function") {
                rw.document.activeElement.blur();
                return true;
            }
        } catch (e2) {}

        return false;
    }

    // v1.23.2：楼层正文与当前 swipe 同写。酒馆左右翻页是 mes = swipes[swipe_id] 回填，
    // 只改 mes 的话，在注入那一楼滑一下导演稿就没了。
    function adrDSetMessageText(m, mes) {
        if (!m) return;
        m.mes = mes;
        try {
            if (Array.isArray(m.swipes) && m.swipes.length) {
                var sid = Number(m.swipe_id);
                if (!Number.isFinite(sid) || sid < 0 || sid >= m.swipes.length) sid = m.swipes.length - 1;
                m.swipes[sid] = mes;
            }
        } catch (eSw) {}
    }

    // ================= v1.44.0 楼尾静默上屏（导演稿与红霞剧场共用）=================
    // 往楼尾接一小块，不该让酒馆把整楼重画一遍：整楼重画时用户的美化正则、变量脚本、前端卡都跟着对这一楼重跑，手机上闪一下、烧一回。
    // 做法是让酒馆只把"新接的这一小段"按它自己的流程格式化（美化正则、markdown、消毒都走它的），拿到 HTML 接到已经画好的楼尾。
    // 这个接口（messageFormatting）新一点的酒馆才有，没有就返回 null，调用方走各自的老路。
    function adrDMesBox(idx) {
        try { return rootDoc().querySelector('#chat .mes[mesid="' + idx + '"] .mes_text') || null; } catch (e) { return null; }
    }

    function adrDFormatFragment(idx, text) {
        try {
            var c = ctx();
            if (!c || typeof c.messageFormatting !== "function") return null;
            var m = c.chat && c.chat[idx];
            var html = c.messageFormatting(String(text || ""), m ? m.name : "", false, false, idx);
            return typeof html === "string" ? html : null;
        } catch (e) { return null; }
    }

    // 格式化出来的东西有没有可看的内容（用户的美化正则可能把它整块藏掉，那就不往楼里留空壳）
    function adrDFragmentVisible(el) {
        try { return !!(String(el.textContent || "").trim() || el.querySelector("img, video, audio, svg, canvas, hr, iframe")); } catch (e) { return true; }
    }

    // 导演稿静默上屏。返回 true 表示画面已经对上，不用酒馆重画这一楼。
    // hadOwn：这一楼原来就挂着本类型的旧稿。旧稿要是我们上次静默接上去的（认得出那个容器）就原地换；
    // 要是酒馆整楼画出来的（经过美化正则已经面目全非，认不出哪块是它），只能老老实实让酒馆重画这一楼。
    function adrDDirectorPaint(idx, type, add, hadOwn) {
        try {
            var box = adrDMesBox(idx);
            if (!box) return false;
            var live = Array.prototype.slice.call(box.querySelectorAll('.arrebol-d-live[data-arb-type="' + type + '"]'));
            if (hadOwn && !live.length) return false;
            var html = adrDFormatFragment(idx, String(add || "").replace(/^\s+/, ""));
            if (html == null) return false;
            live.forEach(function (el) { if (el.parentNode) el.parentNode.removeChild(el); });
            var w = box.ownerDocument.createElement("div");
            w.className = "arrebol-d-live";
            w.setAttribute("data-arb-type", type);
            w.innerHTML = html;
            if (adrDFragmentVisible(w)) box.appendChild(w);
            return true;
        } catch (e) { return false; }
    }

    var adrDPendingRedraw = [];   // v1.23.2：改过正文、还没重画的楼号；重绘只画这几楼
    function adrDNoteRedraw(idx) {
        try { if (Number.isFinite(Number(idx)) && adrDPendingRedraw.indexOf(Number(idx)) < 0) adrDPendingRedraw.push(Number(idx)); } catch (e) {}
    }

    function adrDWriteDirectorInjection(type, text) {
        if (!text || !text.trim()) return false;

        try {
            var c = ctx();
            var chat = c.chat;
            if (!chat || !chat.length) return false;

            var idx = findLastMessageIndex(chat);
            if (idx < 0 || !chat[idx]) return false;

            var add = injectionText(type, text);

            // 移除同类型旧注入，避免最后一条消息越堆越多。
            var mes = String(chat[idx].mes || "");
            var mesBefore = mes;
            var startMark = "<!-- ARREBOL_D_START:" + type + " -->";
            var endMark = "<!-- ARREBOL_D_END:" + type + " -->";

            var startAt = mes.indexOf(startMark);
            while (startAt >= 0) {
                var endAt = mes.indexOf(endMark, startAt);
                if (endAt < 0) break;
                mes = mes.slice(0, startAt).trimEnd() + mes.slice(endAt + endMark.length);
                startAt = mes.indexOf(startMark);
            }

            var startMark2 = "<!-- ARREBOL_D_START:" + type;
            var endMark2 = "ARREBOL_D_END:" + type + " -->";
            var startAt2 = mes.indexOf(startMark2);
            while (startAt2 >= 0) {
                var endAt2 = mes.indexOf(endMark2, startAt2);
                if (endAt2 < 0) break;
                mes = mes.slice(0, startAt2).trimEnd() + mes.slice(endAt2 + endMark2.length);
                startAt2 = mes.indexOf(startMark2);
            }

            var visibleName = type === "plot" ? "统筹" : "情感导演";
            var reOldVisible = new RegExp("\\n\\n【(?:红霞导演室|暗河红霞 Arrebol D)(?:｜|\\|)" + visibleName + "】[\\s\\S]*$", "m");
            mes = mes.replace(reOldVisible, "");

            // v1.9.27：只移除“本类型”的带类型标记旧注入。另一类型的块原地保留，双导演同拍共存。
            var t = type === "plot" ? "plot" : "emotion";
            var reTypedOwn = new RegExp("\\n?arrebol_d(?:_visible)?:" + t + "###[\\s\\S]*?###", "g");
            mes = mes.replace(reTypedOwn, "");

            // 迁移兜底：≤1.9.26 的无类型旧标记（arrebol_d### / arrebol_d_visible###）一律清除。
            // 旧格式因互删缺陷至多存活一块，清掉后由各导演在各自下一拍以带类型格式重建。
            mes = mes.replace(/\n?arrebol_d(?:_visible)?###[\s\S]*?###/g, "").trimEnd();

            var hadOwn = mes.trimEnd() !== mesBefore.trimEnd();   // 这一楼原来就挂着本类型的旧稿（或旧格式的残留）
            adrDSetMessageText(chat[idx], mes.trimEnd() + add);
            // v1.44.0 静默上屏：只把这份稿接到画好的楼尾，不重画整楼、不广播；对不上才登记让酒馆重画这一楼（老路）
            if (!adrDDirectorPaint(idx, t, add, hadOwn)) adrDNoteRedraw(idx);
            try { adrDDirectorLogPush(type, text); } catch (eLog34) {}
            try { adrDUpdateFloatFromInjection(type, text); } catch (eFloat34) {}
            try { adrDGrazeClearOnInjection(type); } catch (eGraze) {} // v1.13.0：稿子挂上即归队
            return true;
        } catch (e) {
            console.error("[Arrebol D] inject write failed", e);
            return false;
        }
    }

    function injectDirector(type, text) {
        try {
            var ok = adrDWriteDirectorInjection(type, text);
            if (!ok) return false;
            adrDSaveThenRedrawAfterInject().catch(function (e) {
                try { console.warn("[Arrebol D] async save after manual inject failed", e); } catch (eWarn) {}
            });
            return true;
        } catch (e) {
            console.error("[Arrebol D] inject failed", e);
            return false;
        }
    }

    async function injectDirectorAsync(type, text) {
        try {
            var ok = adrDWriteDirectorInjection(type, text);
            if (!ok) return false;
            await adrDSaveThenRedrawAfterInject();
            return true;
        } catch (e) {
            console.error("[Arrebol D] inject async failed", e);
            if (e && !e.name) e.name = "SaveChatError";
            throw e;
        }
    }

    function localTest(type) {
        syncAll();
        var r = activeRange();
        var title = type === "plot" ? "统筹试运行预览" : "情感导演试运行预览";
        var text = "【" + title + "】\n按钮、读取聊天、写入结果框链路可用。\n\n【读取最近 " + r + " 轮】\n" + (recentChat(r).slice(0, 1200) || "（未读取到聊天内容）");
        setPreview(type, text);
        status(type, "试运行成功 ✓（没花钱，导演读到的内容见弹窗）", "#8ed99d");
        setButtons(type);
    }

    function pushModel(list, m) {
        if (!m) return;
        if (typeof m === "string") { list.push(m); return; }
        if (m.id) list.push(m.id);
        else if (m.name) list.push(m.name);
        else if (m.model) list.push(m.model);
        else if (m.slug) list.push(m.slug);
    }

    function extractModels(data) {
        var list = [];

        if (!data) return list;

        if (Array.isArray(data)) data.forEach(function (m) { pushModel(list, m); });
        else if (Array.isArray(data.data)) data.data.forEach(function (m) { pushModel(list, m); });
        else if (Array.isArray(data.models)) data.models.forEach(function (m) { pushModel(list, m); });
        else if (data.id) pushModel(list, data);

        var seen = {};
        var out = [];
        list.forEach(function (x) {
            x = String(x || "").trim();
            if (!x || seen[x]) return;
            seen[x] = true;
            out.push(x);
        });
        out.sort();
        return out;
    }

    function fillModelSelect(type, models) {
        var st = settings();
        var modelKey = field(type, "model");
        var current = st[modelKey] || "";

        var sel = qForm("adr044-" + type + "-model-select");
        if (!sel) return;

        var html = "";
        if (current) html += '<option value="' + esc(current) + '">' + esc(current) + '（当前）</option>';
        else html += '<option value="">加载后选择模型</option>';

        models.forEach(function (m) {
            if (m === current) return;
            html += '<option value="' + esc(m) + '">' + esc(m) + '</option>';
        });

        sel.innerHTML = html;
        if (current) sel.value = current;
    }

    async function loadModels(type) {
        syncType(type);

        var st = settings();
        var p = prefixOf(type);
        var endpoint = st[p + "ApiEndpoint"] || "";
        var key = st[p + "ApiKey"] || "";

        if (!endpoint) {
            status(type, "请先填写 API 地址", "#d4726a");
            return;
        }

        var url = modelsUrl(endpoint);
        if (!url) {
            status(type, "API 地址无效", "#d4726a");
            return;
        }

        var btn = qForm("adr044-" + type + "-load-models");
        if (btn) {
            btn.disabled = true;
            btn.textContent = "加载中…";
        }

        status(type, "正在拉取模型列表…", "#8ed99d");

        try {
            var headers = {};
            adrDAuthHeaders(headers, key, url, "native");

            var res = await fetch(url, { method: "GET", headers: headers });
            var raw = await res.text();

            if (!res.ok) throw new Error("模型接口 " + res.status + "：" + raw.slice(0, 220));

            var data;
            try { data = JSON.parse(raw); }
            catch (e) { throw new Error("模型接口返回非 JSON：" + raw.slice(0, 180)); }

            var models = extractModels(data);
            if (!models.length) throw new Error("没有解析到模型名");

            fillModelSelect(type, models);
            status(type, "已加载 " + models.length + " 个模型 ✓", "#8ed99d");
        } catch (e2) {
            status(type, "加载模型失败：" + (e2.message || String(e2)), "#d4726a");
        }

        if (btn) {
            btn.disabled = false;
            btn.textContent = "加载模型";
        }
    }

    function safeType(v) {
        if (v === null) return "null";
        if (v === undefined) return "undefined";
        if (Array.isArray(v)) return "array(" + v.length + ")";
        return typeof v;
    }

    function shortText(v, max) {
        max = max || 500;
        try {
            var s = typeof v === "string" ? v : JSON.stringify(v, null, 2);
            if (!s) return "";
            if (s.length > max) return s.slice(0, max) + "…";
            return s;
        } catch (e) {
            try { return String(v).slice(0, max); } catch (_) { return ""; }
        }
    }

    function listKeys(obj, max) {
        max = max || 80;
        try {
            if (!obj) return "（无）";
            var keys = Object.keys(obj);
            return keys.slice(0, max).join(", ") + (keys.length > max ? " … 共" + keys.length + "项" : "");
        } catch (e) {
            return "（无法读取 keys：" + e.message + "）";
        }
    }

    function getCurrentCharacterProbe() {
        var c;
        try { c = ctx(); } catch (e) { return { error: e.message }; }

        var info = {
            chid: null,
            characterId: null,
            name1: null,
            charObj: null,
            source: ""
        };

        var ids = ["characterId", "this_chid", "chid", "currentCharacterId"];
        ids.forEach(function (k) {
            if (c[k] !== undefined && info[k === "characterId" ? "characterId" : "chid"] === null) {
                if (k === "characterId") info.characterId = c[k];
                else info.chid = c[k];
            }
        });

        var id = info.characterId;
        if (id === null || id === undefined) id = info.chid;

        try {
            if (c.characters && id !== null && id !== undefined && c.characters[id]) {
                info.charObj = c.characters[id];
                info.source = "ctx.characters[id]";
            }
        } catch (e1) {}

        try {
            if (!info.charObj && c.character) {
                info.charObj = c.character;
                info.source = "ctx.character";
            }
        } catch (e2) {}

        try {
            if (!info.charObj && c.characters && Array.isArray(c.characters) && c.name1) {
                for (var i = 0; i < c.characters.length; i++) {
                    if (c.characters[i] && c.characters[i].name === c.name1) {
                        info.charObj = c.characters[i];
                        info.source = "ctx.characters by name1";
                        break;
                    }
                }
            }
        } catch (e3) {}

        try { info.name1 = c.name1 || (info.charObj && info.charObj.name) || ""; } catch (e4) {}

        return info;
    }

    function extractCoreCharacterText(ch) {
        if (!ch) return "";
        var parts = [];
        var fields = [
            ["name", "名称"],
            ["description", "描述"],
            ["personality", "性格"],
            ["scenario", "场景"],
            ["first_mes", "首条消息"],
            ["mes_example", "示例对话"],
            ["creator_notes", "创作者注释"],
            ["system_prompt", "系统提示"],
            ["post_history_instructions", "后历史指令"]
        ];

        fields.forEach(function (pair) {
            var k = pair[0], label = pair[1];
            if (ch[k]) parts.push("【" + label + "】\n" + String(ch[k]).trim());
        });

        try {
            if (ch.data) {
                fields.forEach(function (pair) {
                    var k = pair[0], label = pair[1];
                    if (ch.data[k] && !ch[k]) parts.push("【data." + label + "】\n" + String(ch.data[k]).trim());
                });
            }
        } catch (e) {}

        return parts.join("\n\n");
    }

    function findPersonaProbe() {
        var c;
        try { c = ctx(); } catch (e) { return { error: e.message }; }

        var candidates = [];
        var keys = [
            "persona",
            "persona_description",
            "personaDescription",
            "user_description",
            "userDescription",
            "power_user",
            "name2"
        ];

        keys.forEach(function (k) {
            try {
                if (c[k] !== undefined) candidates.push({ key: "ctx." + k, type: safeType(c[k]), value: shortText(c[k], 600) });
            } catch (e) {}
        });

        try {
            var rw = rootWin();
            ["persona_description", "power_user", "selected_persona", "name2", "user_avatar"].forEach(function (k) {
                if (rw[k] !== undefined) candidates.push({ key: "window." + k, type: safeType(rw[k]), value: shortText(rw[k], 600) });
            });
        } catch (e2) {}

        return candidates;
    }

    function findWorldProbe() {
        var c;
        try { c = ctx(); } catch (e) { return [{ key: "ctx", error: e.message }]; }

        var out = [];
        var ctxKeys = [
            "world_info",
            "worldInfo",
            "worldInfos",
            "world_names",
            "worldNames",
            "chat_metadata",
            "chatMetadata",
            "characters",
            "groups",
            "extensionSettings"
        ];

        ctxKeys.forEach(function (k) {
            try {
                if (c[k] !== undefined) out.push({ key: "ctx." + k, type: safeType(c[k]), keys: listKeys(c[k], 40), value: shortText(c[k], 500) });
            } catch (e) {}
        });

        try {
            var rw = rootWin();
            [
                "world_info",
                "worldInfo",
                "world_names",
                "world_names_data",
                "selected_world_info",
                "chat_metadata",
                "getWorldInfoPrompt",
                "getWorldInfoPromptData",
                "getWorldInfoSettings",
                "world_info_data"
            ].forEach(function (k) {
                if (rw[k] !== undefined) out.push({ key: "window." + k, type: safeType(rw[k]), keys: listKeys(rw[k], 40), value: shortText(rw[k], 500) });
            });
        } catch (e2) {}

        return out;
    }

    function extractContentBlocksFromText(text) {
        text = String(text || "");
        text = cleanMessage(text);

        var blocks = [];
        var re = adrDContentTagRegex();
        var m;
        while ((m = re.exec(text)) !== null) {
            var v = (m[2] || "").trim();
            if (v) blocks.push(v);
        }

        return blocks;
    }

    function contentBlocksProbe(rounds) {
        var chat;
        try { chat = ctx().chat; } catch (e) { return { error: e.message, blocks: [] }; }
        if (!chat || !chat.length) return { blocks: [], lines: ["（未读取到聊天）"] };

        var limit = rounds * 2;
        var lines = [];
        var blocks = [];
        var count = 0;

        for (var i = chat.length - 1; i >= 0 && count < limit; i--) {
            var msg = chat[i];
            if (!msg || msg.is_system) continue;

            var role = msg.is_user ? "用户" : (msg.name || "角色");
            var found = extractContentBlocksFromText(msg.mes);

            if (found.length) {
                for (var j = 0; j < found.length; j++) {
                    blocks.unshift({
                        index: i,
                        role: role,
                        text: found[j]
                    });
                }
                lines.unshift("消息 #" + i + " [" + role + "] 提取到 " + found.length + " 段 <content>");
            } else {
                lines.unshift("消息 #" + i + " [" + role + "] 无 <content>");
            }

            count++;
        }

        return { blocks: blocks, lines: lines };
    }

    function runContextProbe() {
        syncAll();

        var c;
        try { c = ctx(); } catch (e) {
            setPreview(currentType(), "读取 ctx 失败：" + e.message);
            return;
        }

        var charInfo = getCurrentCharacterProbe();
        var ch = charInfo.charObj;
        var persona = findPersonaProbe();
        var worlds = findWorldProbe();
        var content = contentBlocksProbe(activeRange());

        var out = "";
        out += "【红霞探针 v1.0.5.6.8.1.3.2】\n";
        out += "目的：检测酒馆 1.81 当前环境里角色卡 / 世界书 / user 人设 / <content> 所在字段。\n\n";

        out += "【Context 顶层 keys】\n";
        out += listKeys(c, 120) + "\n\n";

        out += "【当前角色定位】\n";
        out += "characterId: " + shortText(charInfo.characterId, 100) + "\n";
        out += "chid/this_chid: " + shortText(charInfo.chid, 100) + "\n";
        out += "name1/角色名: " + shortText(charInfo.name1, 100) + "\n";
        out += "角色来源: " + (charInfo.source || "未定位") + "\n";
        out += "角色对象类型: " + safeType(ch) + "\n";
        out += "角色对象 keys: " + listKeys(ch, 100) + "\n\n";

        out += "【角色卡核心字段预览】\n";
        var core = extractCoreCharacterText(ch);
        out += (core ? core.slice(0, 1800) : "（未提取到常见角色卡字段）") + "\n\n";

        out += "【User 人设 / Persona 候选】\n";
        if (persona.length) {
            persona.forEach(function (p) {
                out += "- " + p.key + " | " + p.type + "\n";
                if (p.value) out += p.value.slice(0, 500) + "\n";
            });
        } else {
            out += "（未找到明显 persona 字段）\n";
        }
        out += "\n";

        out += "【世界书 / Lorebook 候选】\n";
        if (worlds.length) {
            worlds.forEach(function (w) {
                out += "- " + w.key + " | " + w.type + "\n";
                out += "  keys: " + (w.keys || "（无）") + "\n";
                if (w.value) out += "  preview: " + String(w.value).replace(/\n/g, " ").slice(0, 500) + "\n";
            });
        } else {
            out += "（未找到明显 world/lorebook 字段）\n";
        }
        out += "\n";

        out += "【<content> 提取概览】\n";
        if (content.error) out += "错误：" + content.error + "\n";
        out += "提取段数: " + (content.blocks ? content.blocks.length : 0) + "\n";
        if (content.lines) out += content.lines.slice(0, 80).join("\n") + "\n";

        setPreview(currentType(), out);
        status(currentType(), "上下文探针完成 ✓ 请复制结果给小g", "#8ed99d");
        setButtons(currentType());
    }

    function runContentProbe() {
        syncAll();

        var result = contentBlocksProbe(activeRange());
        var out = "";
        out += "【<content> 精准提取测试】\n";
        out += "范围：最近 " + activeRange() + " 轮，按消息倒序扫描后恢复顺序。\n\n";

        if (result.error) out += "错误：" + result.error + "\n\n";

        out += "【扫描概览】\n";
        out += (result.lines && result.lines.length ? result.lines.join("\n") : "（无扫描结果）") + "\n\n";

        out += "【提取正文】\n";
        if (result.blocks && result.blocks.length) {
            result.blocks.forEach(function (b, i) {
                out += "\n--- content #" + (i + 1) + " / 消息#" + b.index + " / " + b.role + " ---\n";
                out += b.text + "\n";
            });
        } else {
            out += "未提取到 <content>...</content>。如果你的正文没有 content 标签，正式版需要 fallback 策略。\n";
        }

        setPreview(currentType(), out);
        status(currentType(), "<content> 提取测试完成 ✓", "#8ed99d");
        setButtons(currentType());
    }


    // ================= v1.11.0 抽卡剧情小能手（进组模块）=================
    // 定位：每 N 楼向模型贴耳投一张"发生了一半的事"，治长上下文剧情塌缩。
    // v1.11 三仓库：专属剧情库（跟角色卡）／通用库／NSFW 库，各自勾选启用。
    //       三段抽 = 掷仓库（启用者均等）→ 掷卡池（池内均等）→ 掷卡（冷却区不复用）。
    // 纪律：与导演共用全量计数、chatKey 与 API 预设机器；耳机通道独立 key；基准线体系零接触；
    //       失败保拍（不投出不推进 lastDrawAt）；DS 任何异常当场降级盲抽，抽卡器永不停摆。
    //       v1.11 铁则：刷新永不覆盖正在输入的控件；编辑区只在换库/导入/换聊时回灌。
    // 需求与终裁：江 ｜ 架构与施工：波哥（Claude Fable 5）｜ 原体血统：ripple & GPT & Claude

    var ADR_CD_EP_KEY = "ARREBOL_D_CARD_DRAWER"; // 工程铁则：与 ARREBOL_D_DIRECTOR_FLOAT 互异
    var ADR_CD_LS_KEY = "arrebol_d_cd_chat_v1";
    var ADR_CD_META_KEY = "arrebol_d_cd";
    var ADR_CD_HISTORY_MAX = 5;
    var ADR_CD_RECENT_MAX = 32;
    var ADR_CD_PICK_TIMEOUT_MS = 8000;
    // v1.23.3：小眼睛的答复额度。此前点池 30、择卡与兑现 10——会思考的模型把这点额度先花在思考上，
    // 回来是空的，于是永远降级盲抽。提到 200：答复照旧逐字校验、多一个字作废，只是不再把思考也掐死；
    // 对不思考的模型（DeepSeek-chat 之类）没有任何区别，它本来就只回那几个字。
    var ADR_CD_REPLY_TOKENS = 200;

    // 三个仓库槽位。story 跟角色卡走，common 打底，nsfw 单独一格由住户自己填。
    var ADR_CD_SLOTS = ["story", "common", "nsfw"];
    var ADR_CD_SLOT_LABEL = { story: "专属", common: "通用", nsfw: "NSFW" };
    var ADR_CD_SLOT_FULL = { story: "专属剧情库", common: "通用库", nsfw: "NSFW 库" };

    var ADR_CD_DEFAULT_ENVELOPE = "【场外事实】以下事件已然发生。织入正文；不得复述原文；不得在单楼内全部兑现：{卡面}";
    // v1.12：后半程信封。卡挂过半衰期后自动换成这段——已经落地的事不该再逼着推进。
    var ADR_CD_DEFAULT_ENVELOPE_FADED = "【已发生的背景】此事已经发生过。可以被提及或延续余波，但不必再推进它：{卡面}";

    // 出厂三套信封预设：不同模型吃不同话术
    var ADR_CD_FACTORY_ENVELOPES = {
        "标准": {
            active: ADR_CD_DEFAULT_ENVELOPE,
            faded: ADR_CD_DEFAULT_ENVELOPE_FADED
        },
        "强硬": {
            active: "【剧情变量】以下事件必须发生。转化为剧情巧妙织入正文，**绝对不得复述原句**；不得在单楼内全部兑现：{卡面}",
            faded: "【已发生的背景】此事已经发生过，**不要再重复描写**。可以被提及或延续余波，但不必再推进它：{卡面}"
        },
        "轻柔": {
            active: "（场外，正在发生的一件事，你可以选择让它进入这一幕，也可以让它先在背景里发酵：{卡面}）",
            faded: "（这件事已经发生过了，余波还在：{卡面}）"
        },
        // v1.23.0「看时机」：把"这一楼就得用"改成"等一个合适的时机"。
        // 标准信封说的是"已然发生，织入正文"，等于命令模型当楼兑现——
        // 一张温情卡撞上正在吵架的一幕，崩就崩在这一句上。
        // 这一套保留"必须发生"的分量，只把时点的决定权还给写故事的模型。
        "看时机": {
            active: "【场外事实】以下事件已经发生。若此刻场面不适合它进场，就让它先在背景里发酵，等一个合适的时机再织入正文；不得复述原文；不得在单楼内全部兑现：{卡面}",
            faded: "【已发生的背景】此事已经发生过。可以被提及或延续余波，但不必再推进它：{卡面}"
        }
    };

    var ADR_CD_FACTORY_LIB = [
        "## 意外",
        "门房捎来一句口信：三天前就该到的人，今晚到了。",
        "后厨传来一声碎响，随后是长得反常的安静。",
        "信封里除了信，还多出一把不认识的钥匙。",
        "雨停了，屋檐下多了一双不属于任何人的鞋。",
        "",
        "## 转折",
        "一直没人坐的那把椅子，今天有人径直坐下了。",
        "原本说定的价钱，对方临场翻了一倍，理由只字不提。",
        "那扇常年上锁的门虚掩着，锁孔里还插着钥匙。",
        "有人当众叫出了一个很久没人敢提的名字。",
        "",
        "## 伏笔",
        "桌角压着半张车票，日期是十天以后。",
        "巷口停了辆车，从昨夜到现在没熄过火。",
        "账本最后一页被撕走了，撕口很新。",
        "墙上的合影少了一个人，相框却没换小。",
        "",
        "## 代价",
        "上次帮忙的人捎话来了：该还的，这两天要还。",
        "旧伤在变天前又疼了，比上一次更深一些。",
        "有人替这边挡了一句话，代价当场没说，记下了。",
        "",
        "## 外力",
        "停电了，整条街只剩一户还亮着灯。",
        "官面上的人来过了，没进门，只在对街站了一炷香。",
        "天气骤变，原定今晚的路走不成了。",
        "",
        "## 狗血",
        "席间有人认错了人，偏偏错得有名有姓。",
        "一封没署名的信，把三个人写在了同一句话里。",
        "旧物摊上摆着一件本不该流出去的东西。"
    ].join("\n");

    var ADR_CD_HELP_TEXT = [
        "卡面家法：一行一张卡。每张卡是一件\"发生了一半的事\"，三特征缺一不可——",
        "· 具体：有人有物有时刻；",
        "· 悬置：谁 / 为何，卡不说，留给演员说；",
        "· 可嫁接：无专名，什么局都能落（专名由统筹在场上现铸）。",
        "写的是意象与事实，不是指令。\"门房捎来一句口信：三天前就该到的人，今晚到了\"合格；\"现在发生一个转折\"不合格。",
        "格式：`## 卡池名` 一行开卡池，一行一张卡，空行随意，`//` 开头是注释行；即改即生效。",
        "三仓库：专属库配角色卡（写这个角色独有的事），通用库打底（什么局都能落），NSFW 库单独一格。启用哪几格就在哪几格之间均等掷——仓库数就是权重，专属库池少也不会被通用库淹掉。",
        "卡面里可以写 {{user}} / {{char}} 等宏，投卡时会替换成当前名字。"
    ].join("\n");

    // ---- 纯函数区（挂 __adrCdTest 供桩测与真机验证）----

    function adrCdParseLibraryText(text) {
        var pools = [];
        var cur = null;
        String(text || "").split(/\r?\n/).forEach(function (line) {
            var s = String(line || "").trim();
            if (!s) return;
            var m = s.match(/^##\s*(.+)$/);
            if (m) {
                cur = { name: m[1].trim(), cards: [] };
                pools.push(cur);
                return;
            }
            if (s.indexOf("//") === 0) return;
            if (!cur) {
                cur = { name: "未分池", cards: [] };
                pools.push(cur);
            }
            cur.cards.push(s);
        });
        return pools.filter(function (p) { return p.cards.length > 0; });
    }

    function adrCdPickFromPool(cards, recentList, cooldownM, rng) {
        rng = typeof rng === "function" ? rng : Math.random;
        cards = Array.isArray(cards) ? cards : [];
        if (!cards.length) return "";
        var M = Math.max(0, Math.floor(Number(cooldownM) || 0));
        // 自动降冷却：单池卡数 <= 冷却量时降到 卡数-1，防抽空死锁
        if (cards.length <= M) M = Math.max(0, cards.length - 1);
        var elig = [];
        while (true) {
            // v1.23.2：M=0 必须是"没有冷却"。旧写法 slice(-0) 等于 slice(0)，
            // 把整个近期史都当成了冷却区——冷却填 0 反而变成"最近 32 张全不复用"。
            var recent = M > 0 ? (recentList || []).slice(-M) : [];
            var set = {};
            recent.forEach(function (c) { set[c] = 1; });
            elig = cards.filter(function (c) { return !set[c]; });
            if (elig.length || M <= 0) break;
            M--;
        }
        if (!elig.length) elig = cards.slice();
        return elig[Math.floor(rng() * elig.length)] || "";
    }

    function adrCdSanitizePickResponse(raw, menu) {
        var s = String(raw || "").trim();
        s = s.replace(/^["'「『【\[\(（\s]+/, "").replace(/["'」』】\]\)）。．.!！\s]+$/, "").trim();
        // v1.23.2：菜单名里的间隔号「·」模型偶尔会回成「・」「•」「･」，认成同一个字。
        s = s.replace(/[・•･]/g, "·");
        for (var i = 0; i < (menu || []).length; i++) {
            if (s === String(menu[i])) return menu[i];
        }
        return "";
    }

    function adrCdBuildEnvelope(template, card) {
        var tpl = String(template || "").trim() || ADR_CD_DEFAULT_ENVELOPE;
        if (tpl.indexOf("{卡面}") >= 0) return tpl.split("{卡面}").join(String(card || ""));
        return tpl + String(card || "");
    }

    // 三段抽第一段：把启用槽摊成 [{slot, poolName, cards, menuName}]，供掷槽/掷池与择池菜单共用
    function adrCdBuildSlotPools(slotTexts) {
        var out = [];
        ADR_CD_SLOTS.forEach(function (slot) {
            var text = slotTexts && slotTexts[slot];
            if (typeof text !== "string" || !text.trim()) return;
            adrCdParseLibraryText(text).forEach(function (p) {
                out.push({
                    slot: slot,
                    poolName: p.name,
                    cards: p.cards,
                    menuName: ADR_CD_SLOT_LABEL[slot] + "·" + p.name
                });
            });
        });
        return out;
    }

    try {
        rootWin().__adrCdTest = {
            parseLibraryText: adrCdParseLibraryText,
            pickFromPool: adrCdPickFromPool,
            sanitizePickResponse: adrCdSanitizePickResponse,
            buildEnvelope: adrCdBuildEnvelope,
            buildSlotPools: adrCdBuildSlotPools,
            rollPool: adrCdRollPool,
            nsfwGate: adrCdNsfwGate,
            isModerationError: adrCdIsModerationError,
            factoryLib: ADR_CD_FACTORY_LIB
        };
    } catch (eCdTestHook) {}

    // ---- 账号级设置读取 ----

    function adrCdActive() {
        try { return !!settings().cdEnabled && adrDMasterEnabled(); } catch (e) { return false; }
    }

    function adrCdN() {
        var n = Math.round(Number(settings().cdN));
        if (!Number.isFinite(n)) n = 5;
        return Math.min(20, Math.max(1, n));
    }

    function adrCdDepth() {
        var d = Math.round(Number(settings().cdDepth));
        if (!Number.isFinite(d)) d = 2;
        return Math.min(4, Math.max(0, d));
    }

    function adrCdCooldown() {
        var m = Math.round(Number(settings().cdCooldown));
        if (!Number.isFinite(m) || m < 0) m = 8;
        // v1.23.2：近期史缓冲只有 ADR_CD_RECENT_MAX 张，填再大也只认这么多，面板同步封顶。
        return Math.min(ADR_CD_RECENT_MAX, m);
    }

    function adrCdLibraries() {
        var st = settings();
        if (!st.cdLibraries || typeof st.cdLibraries !== "object" || Array.isArray(st.cdLibraries)) {
            st.cdLibraries = {};
        }
        if (!Object.keys(st.cdLibraries).length) {
            st.cdLibraries["通用"] = ADR_CD_FACTORY_LIB;
        }
        return st.cdLibraries;
    }

    function adrCdLibNames() { return Object.keys(adrCdLibraries()); }

    // v1.18.0 归属制：每副库有一个"家箱"（账号级、永久）。分了箱的库只出现在自家格子，
    // 点亮/熄灭只管"这局用不用"，不再影响它住哪。未分箱的库三格可见，点亮即认箱。
    function adrCdLibHomes() {
        var st = settings();
        if (!st.cdLibHomes || typeof st.cdLibHomes !== "object" || Array.isArray(st.cdLibHomes)) st.cdLibHomes = {};
        return st.cdLibHomes;
    }

    function adrCdLibHome(name) {
        var h = String(adrCdLibHomes()[name] || "");
        return ADR_CD_SLOTS.indexOf(h) >= 0 ? h : "";
    }

    function adrCdSetLibHome(name, slot) {
        var homes = adrCdLibHomes();
        if (slot && ADR_CD_SLOTS.indexOf(slot) >= 0) homes[name] = slot;
        else delete homes[name];
        save("cdLibHomes", homes);
    }

    function adrCdEnvelopes() {
        var st = settings();
        if (!st.cdEnvelopes || typeof st.cdEnvelopes !== "object" || Array.isArray(st.cdEnvelopes)) {
            st.cdEnvelopes = {};
        }
        // v1.23.0：出厂信封改成"按名补齐一次"。
        // 旧写法只在仓库整个为空时才铺——老用户早有三套，
        // 此后新增的出厂信封（如「看时机」）永远到不了他们手上，等于没发。
        // cdEnvSeeded 记账：每套只补一次；用户主动删掉的不会复活。
        var seeded = Array.isArray(st.cdEnvSeeded) ? st.cdEnvSeeded.slice() : [];
        var everSeeded = seeded.length > 0 || Object.keys(st.cdEnvelopes).length > 0;
        var touched = false;
        Object.keys(ADR_CD_FACTORY_ENVELOPES).forEach(function (k) {
            if (st.cdEnvelopes[k]) {
                if (seeded.indexOf(k) < 0) { seeded.push(k); touched = true; }
                return;
            }
            if (everSeeded && seeded.indexOf(k) >= 0) return;   // 删过就尊重，不复活
            st.cdEnvelopes[k] = {
                active: ADR_CD_FACTORY_ENVELOPES[k].active,
                faded: ADR_CD_FACTORY_ENVELOPES[k].faded
            };
            if (seeded.indexOf(k) < 0) seeded.push(k);
            touched = true;
        });
        if (touched) st.cdEnvSeeded = seeded;
        return st.cdEnvelopes;
    }

    function adrCdEnvelopeNames() { return Object.keys(adrCdEnvelopes()); }

    function adrCdCurrentEnvelopeName() {
        var st = settings();
        var all = adrCdEnvelopes();
        var cur = String(st.cdEnvelopeCurrent || "");
        if (cur && all[cur]) return cur;
        return adrCdEnvelopeNames()[0] || "标准";
    }

    // 当前生效的两段模板。面板上手改的 cdEnvelope/cdEnvelopeFaded 优先于预设。
    function adrCdEnvelopePair() {
        var st = settings();
        var pair = adrCdEnvelopes()[adrCdCurrentEnvelopeName()] || {};
        return {
            active: String(st.cdEnvelope || "").trim() || pair.active || ADR_CD_DEFAULT_ENVELOPE,
            faded: String(st.cdEnvelopeFaded || "").trim() || pair.faded || ADR_CD_DEFAULT_ENVELOPE_FADED
        };
    }

    function adrCdHalfLifeFloors() { return Math.max(1, Math.ceil(adrCdN() / 2)); }

    // v1.20.0 生命节奏三档。旧存档只有布尔 cdHalfLife：true→半衰期，false→常驻。
    // 写入时同步镜像回 cdHalfLife（mode !== "stay"），任何旧读法都不会读到相反的意思。
    var ADR_CD_LIFE_MODES = ["stay", "half", "once"];
    var ADR_CD_LIFE_MODE_LABEL = { stay: "常驻", half: "半衰期", once: "只说一次" };

    function adrCdLifeMode() {
        try {
            var st = settings();
            var m = String(st.cdLifeMode || "");
            if (ADR_CD_LIFE_MODES.indexOf(m) >= 0) return m;
            return st.cdHalfLife === false ? "stay" : "half";
        } catch (e) { return "half"; }
    }

    function adrCdSetLifeMode(mode) {
        var m = ADR_CD_LIFE_MODES.indexOf(mode) >= 0 ? mode : "half";
        save("cdLifeMode", m);
        save("cdHalfLife", m !== "stay");
        return m;
    }

    function adrCdLifeModeNote() {
        var m = adrCdLifeMode();
        var n = adrCdN();
        if (m === "once") {
            return "只说一次：卡只在下一层露一次面，之后自动撤下，耳边留白 "
                + Math.max(0, n - 1) + " 楼，到第 " + n + " 楼再给新卡。"
                + "那一层模型没接住就算了——治的正是同一段剧情被反复复述。";
        }
        if (m === "stay") {
            return "常驻：这张卡一直挂在耳边，直到 " + n + " 楼后被下一张换掉。压得最狠，也最容易被复述。";
        }
        return "半衰期：前 " + adrCdHalfLifeFloors() + " 楼是「必须发生」，之后换成「已发生的背景」继续挂着，直到第 " + n + " 楼换新卡。";
    }

    function adrCdSyncLifeModeNote() {
        try { adrCdSetTextAll("adr044-cd-lifemode-note", adrCdLifeModeNote()); } catch (e) {}
    }

    // 账号级槽默认值：新聊天开局继承这一份
    function adrCdSlotDefaults() {
        var st = settings();
        if (!st.cdSlotDefaults || typeof st.cdSlotDefaults !== "object") {
            st.cdSlotDefaults = { story: "", common: "通用", nsfw: "" };
        }
        return st.cdSlotDefaults;
    }

    function adrCdSlotOnDefaults() {
        var st = settings();
        if (!st.cdSlotOnDefaults || typeof st.cdSlotOnDefaults !== "object") {
            st.cdSlotOnDefaults = { story: true, common: true, nsfw: false };
        }
        return st.cdSlotOnDefaults;
    }

    // ---- 聊天级状态：chat_metadata 主档 + localStorage 按 chatKey 镜像 ----

    function adrCdMetaRoot() {
        try {
            var c = ctx();
            var m = c.chatMetadata || c.chat_metadata;
            if (m && typeof m === "object") return m;
        } catch (e) {}
        return null;
    }

    // v1.17.0：仓库槽多选。旧存档是单个字符串，一律归一成数组；不按逗号拆，库名里带逗号也不误伤。
    function adrCdSlotArr(v) {
        var arr = Array.isArray(v) ? v : (v == null || v === "" ? [] : [v]);
        var out = [];
        var seen = {};
        arr.forEach(function (x) {
            var nm = String(x || "").trim();
            if (!nm || seen[nm]) return;
            seen[nm] = true;
            out.push(nm);
        });
        return out;
    }

    function adrCdNormalizeChatState(raw) {
        var o = raw && typeof raw === "object" ? raw : {};
        var defSlots = adrCdSlotDefaults();
        var defOn = adrCdSlotOnDefaults();
        var slots = {};
        var slotOn = {};
        var rawSlots = o.slots && typeof o.slots === "object" ? o.slots : null;
        var rawOn = o.slotOn && typeof o.slotOn === "object" ? o.slotOn : null;
        ADR_CD_SLOTS.forEach(function (s) {
            if (rawSlots && (typeof rawSlots[s] === "string" || Array.isArray(rawSlots[s]))) slots[s] = adrCdSlotArr(rawSlots[s]);
            else slots[s] = adrCdSlotArr(defSlots[s]);
            slotOn[s] = rawOn ? rawOn[s] === true : defOn[s] === true;
        });
        // v1.10 迁移：旧的单库字段 lib 落进通用槽
        if (!rawSlots && typeof o.lib === "string" && o.lib) {
            slots.common = adrCdSlotArr(o.lib);
            slotOn.common = true;
        }
        // v1.17.0 一库一槽：同一卡库若被历史数据挂进多个仓库，只保留最先出现的那个槽。
        var claimed = {};
        ADR_CD_SLOTS.forEach(function (s) {
            slots[s] = slots[s].filter(function (nm) {
                if (claimed[nm]) return false;
                claimed[nm] = true;
                return true;
            });
        });
        // v1.18.0 归属对账：点亮的库若还没分箱，此刻认箱（老存档自动迁移进归属制）；
        // 若归属在别的箱，说明是历史串门数据，从本箱摘下。归属是账号级真相，点亮只是使用开关。
        try {
            ADR_CD_SLOTS.forEach(function (s) {
                slots[s] = slots[s].filter(function (nm) {
                    var home = adrCdLibHome(nm);
                    if (!home) { adrCdSetLibHome(nm, s); return true; }
                    return home === s;
                });
            });
        } catch (eHome) {}
        return {
            lastDrawAt: Number.isFinite(Number(o.lastDrawAt)) ? Number(o.lastDrawAt) : -1,
            slots: slots,
            slotOn: slotOn,
            history: Array.isArray(o.history) ? o.history.slice(-ADR_CD_HISTORY_MAX) : [],
            recent: Array.isArray(o.recent) ? o.recent.slice(-ADR_CD_RECENT_MAX) : [],
            paused: o.paused === true,
            // v1.23.1：弃权已取消。旧存档里可能还留着未走完的空过窗口，
            // 一律归零，免得升级后那几楼继续被拦着不投。
            passUntil: 0,
            streak: o.streak && typeof o.streak === "object"
                ? { pool: String(o.streak.pool || ""), n: Math.max(0, Number(o.streak.n) || 0) }
                : { pool: "", n: 0 },
            floatText: typeof o.floatText === "string" ? o.floatText : "",
            // v1.12：留原始卡面，才能在半衰期换信封；stage 记录这张卡走到哪一步了
            floatCard: typeof o.floatCard === "string" ? o.floatCard : "",
            floatStage: (o.floatStage === "faded" || o.floatStage === "done") ? o.floatStage : "active",
            expand: adrCdNormExpand(o.expand)   // v1.34.0 分幕推进账本
        };
    }

    function adrCdChatState() {
        try {
            var root = adrCdMetaRoot();
            if (root && root[ADR_CD_META_KEY] && typeof root[ADR_CD_META_KEY] === "object") {
                return adrCdNormalizeChatState(root[ADR_CD_META_KEY]);
            }
        } catch (e0) {}
        try {
            var all = adrDReadJsonLS(ADR_CD_LS_KEY);
            return adrCdNormalizeChatState(all[adrDChatKey()]);
        } catch (e1) {}
        return adrCdNormalizeChatState(null);
    }

    // 返回是否落进了服务器侧主档（供暂停等关键写入回读校验）
    function adrCdSaveChatState(state) {
        var clean = adrCdNormalizeChatState(state);
        var metaOk = false;
        var keyReady = false;
        try { keyReady = adrDChatKeyReady(); } catch (eK) { keyReady = false; }
        try {
            var root = adrCdMetaRoot();
            if (root) {
                root[ADR_CD_META_KEY] = clean;
                metaOk = true;
                var c = ctx();
                if (typeof c.saveMetadataDebounced === "function") c.saveMetadataDebounced();
                else if (typeof c.saveMetadata === "function") c.saveMetadata();
            }
        } catch (eMeta) { metaOk = false; }
        // v1.11：chatKey 未就绪时不再整体放弃——服务器侧内存档照写，只跳过 LS 镜像。
        if (keyReady) {
            try {
                var all = adrDReadJsonLS(ADR_CD_LS_KEY);
                all[adrDChatKey()] = clean;
                adrDWriteJsonLS(ADR_CD_LS_KEY, all);
            } catch (eLs) {}
        }
        return metaOk || keyReady;
    }

    // 槽里选中的库名们 → 库文本拼接；池解析器吃拼接文本，多库的池自然全部入场
    function adrCdSlotText(state, slot) {
        var names = state && state.slots ? adrCdSlotArr(state.slots[slot]) : [];
        if (!names.length) return "";
        var libs = adrCdLibraries();
        var parts = [];
        names.forEach(function (name) {
            if (typeof libs[name] === "string" && libs[name].trim()) parts.push(libs[name]);
        });
        return parts.join("\n\n");
    }

    function adrCdEnabledSlotTexts(state) {
        var out = {};
        ADR_CD_SLOTS.forEach(function (s) {
            if (state.slotOn && state.slotOn[s]) {
                var t = adrCdSlotText(state, s);
                if (t) out[s] = t;
            }
        });
        return out;
    }

    // ---- 耳机通道 ----

    function adrCdSubstitute(text) {
        try {
            var c = ctx();
            if (typeof c.substituteParams === "function") return c.substituteParams(String(text || ""));
        } catch (e) {}
        return String(text || "");
    }

    function adrCdApplyFloat(text) {
        try {
            var c = ctx();
            if (typeof c.setExtensionPrompt !== "function") return false;
            var EPT = c.extensionPromptTypes || c.extension_prompt_types || {};
            var pos = EPT.IN_CHAT != null ? EPT.IN_CHAT : 1;
            var EPR = c.extensionPromptRoles || c.extension_prompt_roles || {};
            var role = EPR.SYSTEM != null ? EPR.SYSTEM : 0;
            // 宏在注入时才替换：存档留原文，换角色/换聊也能正确重算。
            // v1.34.0：分幕推进期间固定 depth 0（生成前最后一句）——位置是这个功能的设计本身，不读注入深度设置。
            var depth = adrCdDepth();
            try { if (text && adrCdExpandActive(adrCdChatState())) depth = 0; } catch (eDepth) {}
            c.setExtensionPrompt(ADR_CD_EP_KEY, adrCdSubstitute(text), pos, depth, false, role);
            return true;
        } catch (e) { return false; }
    }

    function adrCdCurrentFloatLength() {
        try {
            var c = ctx();
            var eps = c.extensionPrompts || c.extension_prompts;
            if (eps && eps[ADR_CD_EP_KEY]) return String(eps[ADR_CD_EP_KEY].value || "").length;
        } catch (e) {}
        return -1;
    }

    function adrCdRestoreFloat(reason) {
        try {
            if (!adrCdActive()) { adrCdApplyFloat(""); adrCdSyncChatControls(); return; }
            var state = adrCdChatState();
            var text = state.floatText || "";
            // v1.12：按当前阶段重建，改过信封模板后也能立刻生效
            if (adrCdExpandActive(state)) {
                text = adrCdExpandStepText(state.expand, state.expand.cursor);
            } else if (state.floatCard && state.floatStage !== "done") {
                var pair = adrCdEnvelopePair();
                text = adrCdBuildEnvelope(state.floatStage === "faded" ? pair.faded : pair.active, state.floatCard);
            } else if (state.floatStage === "done") {
                text = "";
            }
            adrCdApplyFloat(state.paused ? "" : text);
            adrCdSyncChatControls();
        } catch (e) {}
    }

    // ---- 择池：DS 只看池名，不看卡面 ----

    function adrCdTruncate(s, max) {
        s = String(s || "");
        return s.length > max ? s.slice(0, max) + "…" : s;
    }

    var ADR_CD_MODES = ["blind", "pick", "pickcard"];
    var ADR_CD_MODE_LABEL = { blind: "盲抽", pick: "择池", pickcard: "择卡" };

    // v1.22.0：把"此刻"和"背景"分开喂。
    // recentContentBlocks 用 \n\n---\n\n 连接各楼，按时间正序。
    // 此前十几轮糊成一团丢给 DS，它分不清哪段是现在、哪段是三楼前已经收场的戏——
    // "莫名其妙来了"和"该来的没来"都有这一份。
    function adrCdSplitRecent(recent) {
        var sep = "\n\n---\n\n";
        var chunks = String(recent || "").split(sep).filter(function (s) { return s.trim(); });
        if (!chunks.length) return { now: "", before: "" };
        var nowN = Math.min(2, chunks.length);   // 最后一问一答＝此刻
        return {
            now: chunks.slice(chunks.length - nowN).join(sep),
            before: chunks.slice(0, chunks.length - nowN).join(sep)
        };
    }

    // v1.23.3：答复空着时看一眼是不是思考把额度吃光了，日志里把话说明白，别让人只看到"答复无效"。
    function adrCdEmptyReplyHint(data, out) {
        if (String(out || "").trim()) return "";
        try {
            var ch = data && data.choices && data.choices[0];
            var msg = ch && ch.message;
            var thought = !!(msg && (msg.reasoning_content || msg.reasoning));
            var cut = !!(ch && ch.finish_reason === "length");
            if (thought || cut) return "（小眼睛回来是空的：额度被思考花光了，请换不思考的模型，或在服务商侧关掉思考）";
        } catch (e) {}
        return "";
    }

    async function adrCdPickPoolViaDS(slotPools, state) {
        var st = settings();
        var endpoint = st.cdApiEndpoint || "";
        var key = st.cdApiKey || "";
        var model = st.cdModel || "deepseek-chat";
        if (!endpoint) throw new Error("未填写择池 API 地址");
        var url = chatUrl(endpoint);
        if (!url) throw new Error("择池 API 地址无效");

        var menu = slotPools.map(function (p) { return p.menuName; });
        var recentPools = (state.history || []).slice(-3).map(function (h) { return h && h.pool; }).filter(Boolean);

        // v1.19.2：NSFW 双向硬门。菜单里没有 NSFW 池时整段不注入——省 token，也不把概念平白种进去。
        var hasNsfw = menu.some(function (m) { return String(m).indexOf("NSFW·") === 0; });
        // v1.29.4：名单全是 NSFW 时不注入硬门。硬门说"不满足就当它不在名单上、宁可选次贴合的"，
        // 名单里又只有它，再加一句"必须选一个"——三句话自相矛盾，模型只能答废话，答废话就降级。
        var allNsfw = hasNsfw && menu.every(function (m) { return String(m).indexOf("NSFW·") === 0; });
        if (allNsfw) hasNsfw = false;

        var sys = "你是抽卡助手的选池器。你只能看到卡池名单，看不到任何卡面内容。"
            + "你的任务：判断此刻的剧情氛围，从名单中选出最适合此刻投放一张事件卡的卡池。"
            + "【刚刚这一楼】就是此刻，氛围一律以它为准。"
            + "【再往前几楼】只用来看这股势头是仍在持续、还是已经收场，不要拿它当此刻。"
            + "【这个故事的整体调性】只用来判断某类情节允不允许发生，绝不作为此刻氛围的依据。";

        if (hasNsfw) {
            sys += "名单中以「NSFW·」开头的卡池是例外通道，不参与上述常规判断，改用下面这条双向规则。"
                + "先判断【刚刚这一楼】是否同时满足两条：一、已经出现明确的情欲流动或强烈性暗示，且这股张力此刻仍在持续，没有被打断、没有转场；二、这个故事的整体调性允许此类情节发生。"
                + "两条都满足时，必须从以「NSFW·」开头的卡池中选（有多个就选最贴合此刻的那一个），其余卡池此刻一律不选——此时投入无关事件会打断正在进行的场面，这是比选错卡池更严重的错误。"
                + "任何一条不满足时，就当以「NSFW·」开头的卡池不在名单上，哪怕其余卡池都不够贴合，也宁可选一个次贴合的。"
                + "剧情平淡、需要推进、想制造转折，都不构成选它的理由；场面已经明确结束或转场之后，也不再算满足。"
                + "判断依据只看【刚刚这一楼】：【再往前几楼】里出现过的情欲内容，如果到【刚刚这一楼】已经收场，就不算满足。";
        }

        // v1.23.1：取消弃权位。上一版给了「此刻不投卡」这个出口，还写了
        // "空一楼没有代价，打断有"——角色扮演里几乎每一楼都能算"正到紧要处"，
        // 于是模型一路走出口，一张卡都不投。判断题不能配一个比判断更省事的选项。
        sys += "你必须从名单中选出一个卡池，不存在「都不选」这个选项。"
            + "即使此刻没有哪个卡池特别贴合，也要挑出最不打断当下、最容易被自然带过去的那一个。";

        sys += "只准回复名单中的一个卡池名，一字不差；不加标点、不加解释、不加思考过程、不加前缀后缀、不加任何其他文字。多一个字视为无效。";

        // v1.22.0 语境顺序倒过来。旧版把角色卡＋世界书＋Persona（最多 8000 字）压在最前面，
        // 真正决定"此刻"的最近正文排在它后面——提示词嘴上说"以最近正文为准"，
        // 结构上却把最重的位置给了静态设定。成人向角色卡里本就有大量情欲描写，
        // 这一大团持续把 DS 往 NSFW 推，正是"莫名其妙抽到 NSFW"的来源之一。
        // 现在：此刻 → 前情 → 名单 → 近期已投 → 调性（压到最后并大幅缩短）。
        var parts = [];
        var recent = "";
        var pickRounds = adrCdPickReadRounds();
        try { recent = await recentContentBlocks(pickRounds); } catch (eRc) {}
        var splitR = adrCdSplitRecent(recent);
        if (splitR.now) {
            parts.push("【刚刚这一楼 · 此刻的氛围只看这里】\n" + adrCdTruncate(splitR.now, 2000));
        }
        if (splitR.before) {
            parts.push("【再往前几楼 · 仅用来看这股势头是在持续还是已经收场】\n" + adrCdTruncate(splitR.before, 2500));
        }
        parts.push("【卡池名单】\n" + menu.join("\n"));
        if (recentPools.length) parts.push("【最近 3 张已投卡来自的卡池】\n" + recentPools.join("、"));
        var precise = "";
        try { precise = buildPreciseContext(); } catch (ePc) {}
        if (precise) {
            parts.push("【这个故事的整体调性 · 只用来判断某类情节允不允许发生，不是此刻的依据】\n"
                + adrCdTruncate(precise, 2000));
        }
        parts.push("请回复一个卡池名。");

        var aborterCd = typeof AbortController !== "undefined" ? new AbortController() : null;
        var timeoutId = null;
        var didTimeout = false;
        if (aborterCd) {
            timeoutId = setTimeout(function () {
                didTimeout = true;
                try { aborterCd.abort(); } catch (eA) {}
            }, ADR_CD_PICK_TIMEOUT_MS);
        }

        var headers = { "Content-Type": "application/json" };
        adrDAuthHeaders(headers, key, url);
        var opts = {
            method: "POST",
            headers: headers,
            body: adrDRequestBody({
                model: model,
                messages: [
                    { role: "system", content: sys },
                    { role: "user", content: parts.join("\n\n") }
                ],
                temperature: 0.4,
                max_tokens: ADR_CD_REPLY_TOKENS,
                stream: false
            }, url)
        };
        if (aborterCd) opts.signal = aborterCd.signal;

        var raw;
        try {
            var res = await fetch(url, opts);
            raw = await res.text();
            if (!res.ok) throw new Error("择池 API " + res.status + "：" + String(raw || "").slice(0, 160));
        } catch (eFetch) {
            if (didTimeout && eFetch && eFetch.name === "AbortError") throw new Error("择池超时（" + (ADR_CD_PICK_TIMEOUT_MS / 1000) + "s）");
            throw eFetch;
        } finally {
            if (timeoutId) clearTimeout(timeoutId);
        }

        var data;
        try { data = JSON.parse(raw); } catch (eJson) { throw new Error("择池返回非 JSON"); }
        var out = parseResponse(data);
        if (!String(out || "").trim() && data && data.choices && data.choices[0] && data.choices[0].finish_reason === "content_filter") {
            throw new Error("择池被内容审核拦下（finish_reason=content_filter）");
        }
        var pick = adrCdSanitizePickResponse(out, menu);
        if (!pick) throw new Error("点池答复无效：" + adrCdTruncate(out, 40) + adrCdEmptyReplyHint(data, out));
        return pick;
    }

    // ---- v1.23.0 择卡：DS 看得见卡面，挑一张或弃权 ----

    // 候选按启用仓库均摊，保住"仓库数即权重"这条承诺——
    // DS 只在候选之间挑贴合度，不由它改变各仓库的出场份额。
    function adrCdCandidateCount(slotPools) {
        var slots = [];
        (slotPools || []).forEach(function (p) {
            if (p.slot !== "nsfw" && slots.indexOf(p.slot) < 0) slots.push(p.slot);
        });
        return Math.min(8, Math.max(3, slots.length * 2));
    }

    // 明面候选按非 NSFW 仓库均摊；NSFW 每个卡池只放一个占位。
    // 占位不展示卡面，所以放两张一模一样的占位毫无信息量，
    // 只会白占本可以展示真卡面的位置——测试就是这么抓出来的。
    // 而且 NSFW 本来就是"这一路走不走"的全有全无判断，不是贴合度比拼。
    function adrCdBuildCandidates(slotPools, state, want) {
        var bySlot = {};
        (slotPools || []).forEach(function (p) { (bySlot[p.slot] = bySlot[p.slot] || []).push(p); });
        var openSlots = ADR_CD_SLOTS.filter(function (s) {
            return s !== "nsfw" && bySlot[s] && bySlot[s].length;
        });
        var out = [], used = {};

        if (openSlots.length) {
            var perSlot = Math.max(1, Math.ceil(want / openSlots.length));
            openSlots.forEach(function (s) {
                var pools = bySlot[s];
                var got = 0, tries = 0;
                while (got < perSlot && tries < perSlot * 8) {
                    tries++;
                    var pool = pools[Math.floor(Math.random() * pools.length)];
                    // 冷却区照旧生效：最近投过的卡不进候选
                    var card = adrCdPickFromPool(pool.cards, state.recent, adrCdCooldown());
                    if (!card || used[card]) continue;
                    used[card] = 1;
                    out.push({ slot: pool.slot, pool: pool.menuName, card: card });
                    got++;
                }
            });
        }

        // NSFW：一池一个占位（池名不同才区分得开），卡面此刻就抽好，只是不展示。
        // v1.23.2：先打乱再取两个。旧写法按文件顺序取前两个，池三池四永远进不了候选。
        var nsfwPools = (bySlot.nsfw || []).slice();
        for (var si = nsfwPools.length - 1; si > 0; si--) {
            var sj = Math.floor(Math.random() * (si + 1));
            var tmp = nsfwPools[si]; nsfwPools[si] = nsfwPools[sj]; nsfwPools[sj] = tmp;
        }
        nsfwPools.slice(0, 2).forEach(function (pool) {
            var card = adrCdPickFromPool(pool.cards, state.recent, adrCdCooldown());
            if (!card || used[card]) return;
            used[card] = 1;
            out.push({ slot: "nsfw", pool: pool.menuName, card: card });
        });

        return out;
    }

    // NSFW 卡面不出门。DeepSeek 那边的内容审核会把整次调用打回，
    // 打回就降级盲抽，反而更糟；而且没必要——要不要走这条通道，
    // 看双向硬门就够了，不需要它读卡面细节。
    function adrCdCandidateLine(i, c) {
        var head = (i + 1) + ". 【" + c.pool + "】";
        if (c.slot === "nsfw") return head + "（这一格的卡面不外传；选它即表示此刻适合这一路）";
        return head + adrCdTruncate(c.card, 120);
    }

    async function adrCdPickCardViaDS(cands, state) {
        var st = settings();
        var endpoint = st.cdApiEndpoint || "";
        if (!endpoint) throw new Error("未填写择池 API 地址");
        var url = chatUrl(endpoint);
        if (!url) throw new Error("择池 API 地址无效");

        var hasNsfw = cands.some(function (c) { return c.slot === "nsfw"; })
            && cands.some(function (c) { return c.slot !== "nsfw"; });   // v1.29.4：候选全是 NSFW 就没有门可把

        var sys = "你是抽卡助手的选卡器。下面会给你几张候选事件卡，请挑出最适合此刻投放的那一张。"
            + "【刚刚这一楼】就是此刻，贴合与否一律以它为准。"
            + "【再往前几楼】只用来看这股势头是仍在持续、还是已经收场，不要拿它当此刻。"
            + "【这个故事的整体调性】只用来判断某类情节允不允许发生，绝不作为此刻氛围的依据。";

        if (hasNsfw) {
            sys += "标注为「NSFW·」的候选是例外通道，其卡面不展示给你，改用下面这条双向规则判断。"
                + "先判断【刚刚这一楼】是否同时满足两条：一、已经出现明确的情欲流动或强烈性暗示，且这股张力此刻仍在持续，没有被打断、没有转场；二、这个故事的整体调性允许此类情节发生。"
                + "两条都满足时，必须从「NSFW·」候选中选，其余候选此刻一律不选——此时投入无关事件会打断正在进行的场面，这是比选错卡更严重的错误。"
                + "任何一条不满足时，就当「NSFW·」候选不在名单上。"
                + "剧情平淡、需要推进、想制造转折，都不构成选它的理由；场面已经明确结束或转场之后，也不再算满足。";
        }

        // v1.23.1：取消 0 号弃权，理由同择池——出口比判断省事，模型就会一直走出口。
        sys += "你必须从候选里选出一张，不存在「都不选」这个选项。"
            + "即使没有哪一张特别贴合，也要挑出最不打断当下、最容易被自然带过去的那一张。";

        sys += "只准回复一个数字：选中候选的编号。"
            + "不加标点、不加解释、不加思考过程、不加任何其他文字。多一个字视为无效。";

        var parts = [];
        var recent = "";
        var pickRounds = adrCdPickReadRounds();
        try { recent = await recentContentBlocks(pickRounds); } catch (eRc) {}
        var splitR = adrCdSplitRecent(recent);
        if (splitR.now) parts.push("【刚刚这一楼 · 此刻的氛围只看这里】\n" + adrCdTruncate(splitR.now, 2000));
        if (splitR.before) parts.push("【再往前几楼 · 仅用来看这股势头是在持续还是已经收场】\n" + adrCdTruncate(splitR.before, 2500));
        parts.push("【候选卡】\n" + cands.map(function (c, i) { return adrCdCandidateLine(i, c); }).join("\n"));
        var precise = "";
        try { precise = buildPreciseContext(); } catch (ePc) {}
        if (precise) {
            parts.push("【这个故事的整体调性 · 只用来判断某类情节允不允许发生，不是此刻的依据】\n"
                + adrCdTruncate(precise, 2000));
        }
        parts.push("请只回复一个数字（1-" + cands.length + "）。");

        var aborterC = typeof AbortController !== "undefined" ? new AbortController() : null;
        var timeoutC = null, didTimeoutC = false;
        if (aborterC) {
            timeoutC = setTimeout(function () {
                didTimeoutC = true;
                try { aborterC.abort(); } catch (eA) {}
            }, ADR_CD_PICK_TIMEOUT_MS);
        }

        var headers = { "Content-Type": "application/json" };
        adrDAuthHeaders(headers, st.cdApiKey, url);
        var optsC = {
            method: "POST",
            headers: headers,
            body: adrDRequestBody({
                model: st.cdModel || "deepseek-chat",
                messages: [
                    { role: "system", content: sys },
                    { role: "user", content: parts.join("\n\n") }
                ],
                temperature: 0.4,
                max_tokens: ADR_CD_REPLY_TOKENS,
                stream: false
            }, url)
        };
        if (aborterC) optsC.signal = aborterC.signal;

        var rawC;
        try {
            var resC = await fetch(url, optsC);
            rawC = await resC.text();
            if (!resC.ok) throw new Error("择卡 API " + resC.status + "：" + String(rawC || "").slice(0, 160));
        } catch (eF) {
            if (didTimeoutC && eF && eF.name === "AbortError") throw new Error("择卡超时（" + (ADR_CD_PICK_TIMEOUT_MS / 1000) + "s）");
            throw eF;
        } finally {
            if (timeoutC) clearTimeout(timeoutC);
        }

        var dataC;
        try { dataC = JSON.parse(rawC); } catch (eJ) { throw new Error("择卡返回非 JSON"); }
        var outC = String(parseResponse(dataC) || "").trim();
        if (!outC && dataC && dataC.choices && dataC.choices[0] && dataC.choices[0].finish_reason === "content_filter") {
            throw new Error("择卡被内容审核拦下（finish_reason=content_filter）");
        }
        var mNum = outC.match(/-?\d+/);
        if (!mNum) throw new Error("选卡答复无效：" + adrCdTruncate(outC, 40) + adrCdEmptyReplyHint(dataC, outC));
        var n = Number(mNum[0]);
        if (!(n >= 1 && n <= cands.length)) throw new Error("选卡编号越界：" + outC);
        return n;
    }

    // ---- 三段抽 ----

    // NSFW 唯一保留的闸：择池失败降级成盲抽时，整格不参与。
    // DS 挂了＝此刻没人判准入条件，默认"不准入"才是安全侧。
    // 这是 v1.19.2 自己标记的「已知未堵」，也是"莫名其妙抽到 NSFW"最可能的来源——
    // 降级是静默发生的，用户根本不知道那一张是随机给的。
    // （v1.21 另外两条闸只作用于盲抽路径，与这批反馈无关，v1.22 已撤除。）
    // v1.29.4：只开 NSFW 仓库时不闸。那是用户自己的仓库配置——闸上了就是"永远空过"，
    // 而小眼睛在情欲场面被审核打回是常态，等于 NSFW 库这一格从来投不出一张。
    function adrCdNsfwGate(degraded, onlyNsfw) {
        return (degraded && !onlyNsfw) ? { hardExclude: ["nsfw"] } : null;
    }

    // v1.29.4：认出"小眼睛被内容审核打回"。这种失败不是没应答，而是它看了【刚刚这一楼】之后
    // 拒绝作答——恰恰说明这一楼正是情欲场面，也就是双向硬门本该开的时候。
    // 只认 4xx 且报文带审核字样（DeepSeek「Content Exists Risk」、OpenAI/Azure content_filter、
    // Gemini SAFETY 一类）；网络断、超时、答复格式不对都不算，仍按老规矩排除 NSFW。
    var ADR_CD_MODERATION_RE = /content exists risk|content[_ ]filter|content (management )?policy|moderation|unsafe|harmful|inappropriate|safety|prohibited|sensitive|blocked|敏感|违规|不安全|安全策略|审核/i;
    function adrCdIsModerationError(e) {
        var m = e && e.message ? String(e.message) : String(e || "");
        if (/finish_reason=content_filter/.test(m)) return true;
        if (!/API (400|403|422)/.test(m)) return false;
        return ADR_CD_MODERATION_RE.test(m);
    }

    // 前两段（掷仓库 → 掷卡池）抽成纯函数：仓库均等是本版核心承诺，必须可验证。
    function adrCdRollPool(slotPools, excludeMenuName, rng, gate) {
        rng = typeof rng === "function" ? rng : Math.random;
        gate = gate || {};
        var cand = slotPools || [];
        if (excludeMenuName) {
            var others = cand.filter(function (p) { return p.menuName !== excludeMenuName; });
            if (others.length) cand = others;
        }
        // 硬闸：这一格此刻没有准入资格。排空了就不抽——耳边空一轮，好过硬塞。
        var hard = gate.hardExclude || [];
        if (hard.length) cand = cand.filter(function (p) { return hard.indexOf(p.slot) < 0; });
        if (!cand.length) return null;
        // 第一段：掷仓库（启用且有卡的仓库之间均等——仓库数即权重，专属库池少也不会被淹）
        var slotsPresent = [];
        cand.forEach(function (p) { if (slotsPresent.indexOf(p.slot) < 0) slotsPresent.push(p.slot); });
        var slot = slotsPresent[Math.floor(rng() * slotsPresent.length)];
        // 第二段：掷卡池（该仓库内均等）
        var inSlot = cand.filter(function (p) { return p.slot === slot; });
        return inSlot[Math.floor(rng() * inSlot.length)] || null;
    }

    function adrCdDrawBlind(slotPools, state, excludeMenuName, gate) {
        var pool = adrCdRollPool(slotPools, excludeMenuName, null, gate);
        if (!pool) return null;
        // 第三段：掷卡（冷却区不复用）
        var card = adrCdPickFromPool(pool.cards, state.recent, adrCdCooldown());
        return card ? { slot: pool.slot, pool: pool.menuName, card: card } : null;
    }

    var adrCdDrawRunning = false;
    var adrCdLifecycleRunning = false;   // v1.23.2：生命周期推进的互斥旗（问询期间不重入）

    async function adrCdPerformDraw(opts) {
        opts = opts || {};
        var st = settings();
        var state = adrCdChatState();
        var homeKey = adrDChatKey();   // v1.38.4：问小眼睛、展开都要等 API，期间换了聊天，这张卡作废，state 是上一把的不能落到新聊天
        var slotPools = adrCdBuildSlotPools(adrCdEnabledSlotTexts(state));
        if (!slotPools.length) return { ok: false, reason: "没有启用的仓库，或启用的仓库里没有卡" };

        var result = null;
        var usedMode = "盲抽";
        var degraded = false;   // 择池失败降级过来的？降级时 NSFW 一律不参与（只开 NSFW 时除外）
        var onlyNsfw = slotPools.every(function (p) { return p.slot === "nsfw"; });
        var hasNsfwPools = slotPools.some(function (p) { return p.slot === "nsfw"; });
        var moderated = false;  // v1.29.4：小眼睛被审核打回——这一楼本身就是情欲场面

        // v1.23.0 择卡：候选按仓库均摊摸出来，连卡面一起给 DS 挑一张，或弃权。
        // 治的是"池选对了，池内那张不贴合"——择池只解决了前半段。
        if (st.cdMode === "pickcard" && !opts.preview) {
            var tC = Date.now();
            try {
                var cands = adrCdBuildCandidates(slotPools, state, adrCdCandidateCount(slotPools));
                if (!cands.length) throw new Error("没有可用候选卡");
                var chosen;
                if (cands.length === 1) {
                    // v1.29.4：只有一张候选（典型：只开 NSFW 且只有一个池）就没什么可挑，不问小眼睛——
                    // 省一次调用，也不给审核打回的机会。
                    chosen = cands[0];
                    console.log("[抽卡小能手] 候选只有一张，不问小眼睛直接投");
                    usedMode = "择卡·唯一候选";
                } else {
                    var idxC = await adrCdPickCardViaDS(cands, state);
                    if (adrDChatKey() !== homeKey) { console.warn("[抽卡小能手] 择卡期间切换了聊天，本次作废"); return { ok: false, reason: "择卡期间切换了聊天" }; }
                    console.log("[抽卡小能手] 小眼睛选卡：第 " + idxC + " 张"
                        + "（候选 " + cands.length + " 张，耗时 " + (Date.now() - tC) + "ms）");
                    chosen = cands[idxC - 1];
                    usedMode = "择卡";
                }
                result = { slot: chosen.slot, pool: chosen.pool, card: chosen.card };
            } catch (eC) {
                console.warn("[抽卡小能手] 择卡降级盲抽：" + (eC && eC.message ? eC.message : eC));
                usedMode = "择卡降级盲抽";
                degraded = true;
                moderated = hasNsfwPools && adrCdIsModerationError(eC);
            }
        }

        if (st.cdMode === "pick" && !opts.preview) {
            var t0 = Date.now();
            try {
                var pick;
                if (slotPools.length === 1) {
                    // v1.29.4：名单只有一个池就没什么可点，不问小眼睛——省一次调用，也不给审核打回的机会。
                    pick = slotPools[0].menuName;
                    console.log("[抽卡小能手] 名单只有一个池，不问小眼睛直接投：" + pick);
                } else {
                    pick = await adrCdPickPoolViaDS(slotPools, state);
                    if (adrDChatKey() !== homeKey) { console.warn("[抽卡小能手] 择池期间切换了聊天，本次作废"); return { ok: false, reason: "择池期间切换了聊天" }; }
                    console.log("[抽卡小能手] 小眼睛点池：" + pick + "（耗时 " + (Date.now() - t0) + "ms）");
                }

                var poolObj = null;
                for (var i = 0; i < slotPools.length; i++) { if (slotPools[i].menuName === pick) { poolObj = slotPools[i]; break; } }
                var streakN = (state.streak && state.streak.pool === pick) ? state.streak.n + 1 : 1;
                if (poolObj && streakN >= 3) {
                    // v1.19.2：防惯性只在同一仓库内换池。旧写法踢去全仓库盲抽会推翻 DS 的仓库判断——
                    // 情欲场面里连点同一个 NSFW 池正是新规则所要求的，旧写法反而拿无关卡打断场面。
                    // 该仓库只有这一个池时，adrCdRollPool 的 others 保护会让候选原样保留，等于自动空转。
                    var sameSlot = slotPools.filter(function (p) { return p.slot === poolObj.slot; });
                    console.log("[抽卡小能手] 卡池「" + pick + "」被连点第 3 次，改在同仓库（" + ADR_CD_SLOT_FULL[poolObj.slot] + "）内换池");
                    state.streak = { pool: "", n: 0 };
                    usedMode = "择池·防惯性换池";
                    result = adrCdDrawBlind(sameSlot, state, pick);
                } else if (poolObj) {
                    state.streak = { pool: pick, n: streakN };
                    var cardP = adrCdPickFromPool(poolObj.cards, state.recent, adrCdCooldown());
                    if (cardP) { result = { slot: poolObj.slot, pool: pick, card: cardP }; usedMode = "择池"; }
                }
            } catch (ePick) {
                console.warn("[抽卡小能手] 择池降级盲抽：" + (ePick && ePick.message ? ePick.message : ePick));
                usedMode = "择池降级盲抽";
                degraded = true;
                moderated = hasNsfwPools && adrCdIsModerationError(ePick);
            }
        }

        // v1.29.4：审核打回＝这一楼本身就是情欲场面＝双向硬门本该开。
        // 旧规矩在这里把 NSFW 排除，于是"该来的时候"恰恰是"永远不来的时候"——
        // 小眼睛看到情欲正文就被审核打回，一打回就降级，一降级就没有 NSFW。现按门已开处理，在 NSFW 库内盲抽。
        if (!result && moderated && !onlyNsfw) {
            var nsfwOnlyPools = slotPools.filter(function (p) { return p.slot === "nsfw"; });
            result = adrCdDrawBlind(nsfwOnlyPools, state, "");
            if (result) {
                console.log("[抽卡小能手] 小眼睛的审核把这一楼打回了：按 NSFW 门已开处理，在 NSFW 库内盲抽");
                usedMode = usedMode.replace("降级盲抽", "") + "·审核判 NSFW";
                degraded = false;
            }
        }

        if (!result) result = adrCdDrawBlind(slotPools, state, "", adrCdNsfwGate(degraded, onlyNsfw));
        if (!result || !result.card) return { ok: false, reason: "无可抽卡面" };

        if (opts.preview) {
            return { ok: true, pool: result.pool, card: result.card, mode: "试抽（盲抽）", preview: true };
        }

        var floor = Number.isFinite(Number(opts.count)) ? Number(opts.count) : adrDAssistantRoundCount();

        // v1.34.0 剧情展开推进：先让导演把这张卡切成 N 幕，再落账。失败就按整张卡投，不停摆。
        var expandInfo = null;
        if (adrCdExpandWanted(result)) {
            adrCdExpandStatus("抽到「" + adrCdTruncate(result.card, 20) + "」，导演正在把它展开成分幕…", "#8ed99d");
            try {
                expandInfo = await adrCdExpandCard(result.card);
                if (adrDChatKey() !== homeKey) { console.warn("[抽卡小能手] 展开期间切换了聊天，本次作废"); return { ok: false, reason: "展开期间切换了聊天" }; }
                console.log("[抽卡小能手] 展开成 " + expandInfo.steps.length + " 幕：" + expandInfo.steps.map(function (s) { return s.name; }).join(" → "));
                expandInfo.warnings.forEach(function (w) { console.warn("[抽卡小能手] 展开提醒：" + w); });
            } catch (eExp) {
                expandInfo = null;
                console.warn("[抽卡小能手] 展开失败，按整张卡投：" + (eExp && eExp.message ? eExp.message : eExp));
                adrCdExpandStatus("展开失败（" + adrCdTruncate(eExp && eExp.message ? eExp.message : String(eExp), 60) + "），这张按整张卡投", "#d4726a");
            }
        }

        if (expandInfo) usedMode += "·展开 " + expandInfo.steps.length + " 幕";
        state.recent = (state.recent || []).concat([result.card]).slice(-ADR_CD_RECENT_MAX);
        state.history = (state.history || []).concat([{
            pool: result.pool,
            slot: result.slot,   // v1.21：连抽闸要按仓库判，菜单名前缀不够稳（用户可改池名）
            card: adrCdTruncate(result.card, 200),
            floor: floor,
            mode: usedMode,
            t: Date.now(),
            status: "live" // live 挂载中 / done 已兑现 / faded 已退为背景
        }]).slice(-ADR_CD_HISTORY_MAX);
        state.lastDrawAt = floor;
        state.floatCard = result.card;
        state.floatStage = "active";
        if (expandInfo) {
            state.expand = { on: true, finished: false, steps: expandInfo.steps, cursor: 0, served: 0, used: false, per: expandInfo.per, analysis: expandInfo.analysis, card: expandInfo.card, t: expandInfo.t };
            state.floatText = adrCdExpandStepText(state.expand, 0);
            adrCdExpandStatus("已展开成 " + expandInfo.steps.length + " 幕，第一幕已贴上：你下一条消息的回复就演它" + (expandInfo.warnings.length ? "（" + expandInfo.warnings.join("；") + "）" : ""), "#8ed99d");
        } else {
            state.expand = null;
            state.floatText = adrCdBuildEnvelope(adrCdEnvelopePair().active, result.card);
        }
        adrCdSaveChatState(state);
        adrCdApplyFloat(state.floatText);
        console.log("[抽卡小能手] 投卡", { 模式: usedMode, 卡池: result.pool, 卡面: result.card, 触发楼层: floor });
        adrCdUpdateStatusLine();
        adrCdRefreshLifePanel();
        return { ok: true, pool: result.pool, card: result.card, mode: usedMode };
    }

    // ---- 自动触发 ----

    var adrCdFirstPassiveDone = {};

    async function adrCdAutoCheck(count, reason, inStartupGrace) {
        if (!adrCdActive() || adrCdDrawRunning) return;
        var state = adrCdChatState();
        if (state.paused) { adrCdUpdateStatusLine(); return; }
        if (adrCdExpandActive(state)) { adrCdUpdateStatusLine(); return; }   // v1.34.0 跑线期间不投新卡、不走半衰期
        var n = adrCdN();
        var base = Number(state.lastDrawAt);

        if (!Number.isFinite(base) || base < 0) {
            state.lastDrawAt = count;
            adrCdSaveChatState(state);
            console.log("[抽卡小能手] 首次对齐基准线：" + count);
            adrCdUpdateStatusLine();
            return;
        }

        if (count - base < n) {
            // 还没到投卡点，但可能到了这张卡的半衰期
            await adrCdAdvanceLifecycle(count, state);
            adrCdUpdateStatusLine();
            return;
        }

        var gapDirty = (count - base - n) >= 20;
        var fpKey = adrDChatKey() + "::cd";
        if (adrDIsPassiveAutoCheck(reason) && gapDirty && (inStartupGrace || !adrCdFirstPassiveDone[fpKey])) {
            adrCdFirstPassiveDone[fpKey] = true;
            state.lastDrawAt = count;
            adrCdSaveChatState(state);
            console.warn("[抽卡小能手] 发现脏基准线，只对齐不投卡", { count: count, base: base, n: n, reason: reason || "" });
            adrCdUpdateStatusLine();
            return;
        }

        adrCdDrawRunning = true;
        try {
            var r = await adrCdPerformDraw({ auto: true, count: count });
            if (!r || !r.ok) {
                console.warn("[抽卡小能手] 本拍未投出（" + ((r && r.reason) || "未知") + "）；基准线保留，稍后重试");
                adrCdUpdateStatusLine();
            }
        } catch (eDraw) {
            console.warn("[抽卡小能手] 投卡失败", eDraw);
        }
        adrCdDrawRunning = false;
    }

    // ================= v1.34.0 剧情展开推进（导演椅） =================
    // 用户反馈：抽到「去登山」，主模型一层就登完回家了——不是它坏，是它看见了整段，看见了就想演完。
    // 解法照小萤火 v3.9.0 那把导演椅搬：投卡时让一个大模型先【分析】再把卡切成严格 N 幕；
    // 之后每一回合只把「这一幕」贴到耳边（固定 depth 0，生成前最后一句），后面的幕根本不在上下文里。
    // 推进不问模型：贴上 → 回复落地记「用过」（重抽不多算）→ 用户再发言才结算翻页（连发不吞）。
    // 走完自动结案，基准线移到当前楼，下一张按原节奏来。跑线期间常规投卡与半衰期都让路。
    var ADR_CD_EXPAND_MIN = 2;
    var ADR_CD_EXPAND_MAX = 12;
    var ADR_CD_EXPAND_DEFAULT_N = 5;
    var ADR_CD_EXPAND_FIELD_MAX = 400;
    var ADR_CD_EXPAND_IDLE_MS = 120000;
    var ADR_CD_EXPAND_PRESET = [
        "你是一位言情小说的责编，坐在导演椅上。剧情小风铃刚抽到一张事件卡，你要把它切成规定数目的幕；之后每一回合只有一幕会贴到演员耳边——演员看不见后面的幕，所以它没法一口气把这段戏演完。",
        "你的任务不是编一个新故事，是把这张卡放进当前这局戏里，找出它最自然、最合情理的一条路，再把这条路切成幕。",
        "",
        "硬规矩（违反任何一条整批作废）：",
        "· 事件卡是脊柱：每一幕都在演这张卡本身。不另起新线，不引入卡里没有的第二件大事，不借题发挥。",
        "· 合情理：事件必须是这个世界、这个身份、这个地点、此刻可能发生的事，像生活里真会发生的那样。不搞超自然、不搞玄乎、不神神叨叨、不堆巧合、不突然天降大事。一幕只发生一件小而具体的事。",
        "· 不引入新的重要人物。需要人就用角色卡或正文里已经有的人，或者一个只有功能的路人（店员、司机、同事）。",
        "· 紧扣当前剧情：第一幕从正文停下的地方长出来——同一个地点、同一个时刻、同样的关系温度。不跳时间、不换地点，除非事件卡本身要求。",
        "· 紧扣角色卡与世界观：角色的性格、身份、底线决定这件事会以什么样子出现在他面前；世界的规矩决定什么能发生、什么不能。不许把角色写成别人，不许把世界写成别处。",
        "· 若有【用户基调】，它是第一要义：这段戏的味道按基调走，卡再沉重也不能压过它。",
        "· 只给事件，不给反应：你写的是这一幕世界抛给两个人的东西，不是两个人怎么接。不写 user 和角色的反应、情绪、动作、台词、决定。不写「两人抱在一起」，写「雨突然下大了，山道上只有一个能站两个人的岩缝」；不写「他决定去找她」，写「她怀孕带球跑了，他此刻并不知道」。允许写的是：时间、地点、天气、来了什么人、发生了什么、摆在眼前的东西、谁知道什么谁不知道什么、时限。",
        "",
        "女性向言情的锚点（用这个插件的大多是女孩子，这段戏要让她在关系里有得可演）：",
        "· 一切外部事件都为关系服务：它要么制造两个人不得不靠近、不得不同处、不得不合作的处境（只有一把伞、只剩一间房、一件必须两个人一起完成的事），要么制造一点距离（旁人在场、被打断、一个必须先走的理由），要么让旧物旧事旧账浮上来。事件本身可以很小，要紧的是它把两个人放到了什么位置上。",
        "· 给角色表现的机会，而不是给他台词：让他有东西可以替她拿、可以先一步注意到、可以在旁人面前表态、可以选择说或不说——机会你给，怎么做他自己来。",
        "· 给她选择的余地：每一幕都要留一个她可以接、可以不接、可以换个接法的口子，不把她逼进只有一种反应的死角。",
        "· 心动是具体的：体温、距离、视线、一件被记住的小事、一个说错的称呼。事件要能长出这种具体，不要抽象的「气氛变得暧昧」。",
        "· 忌：打打杀杀的大男主戏、权谋线跑偏、与两人关系无关的支线、为虐而虐、把角色写成另一个人、把她写成没有主意的人。",
        "",
        "先分析，再切幕。分析是强制的，不许省，也不许只写一句话，按这四问答：",
        "一、此刻：两个人在哪、在做什么、关系走到哪一步、正文最后一句停在什么上。",
        "二、落法：这张卡在这个世界、这个身份下最自然的发生方式是什么？它怎么从此刻长出来？",
        "三、可用的人和物：角色卡与正文里已经有的、这段戏能用上的人、地点、物件、旧账。",
        "四、分幕：言情小说的节奏——起因、靠近的机会、一个小波折、一个不得不接的推力、收在余味。波折要小而真（打断、误会、时间不够、旁人在场），不要生死大事，除非事件卡本身就是。哪一幕慢、哪一幕出事、哪一幕给推力，先定下来。",
        "",
        "然后切幕。每一幕是「这一回合世界抛给两个人的一件事」：",
        "· 一幕只装一件外部事件，装得实：时间、地点、来了什么人、发生了什么、摆在眼前的是什么。40～120 字。",
        "· 幕与幕之间要接得上：上一幕的结尾就是这一幕的起点。不跳跃，也不让两幕演同一件事。",
        "· 节奏按分析里定的走：不要每一幕都是高潮，也不要每一幕都在铺垫。",
        "· 最后一幕是这张卡的收口，不是整个故事的结局——收在余味上，留一点没说完的。",
        "· 只写这一幕发生什么、演到哪儿为止。不写「然后」「接下来」——后面的事演员不该知道。",
        "· name 是 2～8 字的小标题（例：巷口偶遇 / 一起等雨停 / 电话响了）。",
        "· 引用文字一律用中文引号「」，绝不使用英文双引号 \" ——它会破坏输出格式。"
    ].join("\n");
    var ADR_CD_EXPAND_TRAILER = [
        "这是剧情小风铃给这一回合的调度：本回合的正文必须走到上面这一幕，把这件事演实——它确实发生了、摆在眼前，地点、时间、感官都落到纸面。",
        "这一幕只给事件，不给反应：角色怎么接、说什么、做什么，按人设当场决定；用户那一侧留给用户，不替用户行动、不替用户说话。",
        "只演到这一幕为止。这一幕之后发生什么你不知道：不要往后推，不要替这段戏收尾，不要跳过它去演别的。不要提及这段文字本身。"
    ].join("\n");

    function adrCdExpandEnabled() { try { return settings().cdExpandEnabled === true; } catch (e) { return false; } }
    function adrCdExpandN() {
        var n = Math.round(Number(settings().cdExpandN));
        if (!Number.isFinite(n)) n = ADR_CD_EXPAND_DEFAULT_N;
        return Math.min(ADR_CD_EXPAND_MAX, Math.max(ADR_CD_EXPAND_MIN, n));
    }
    function adrCdExpandPer() {
        var n = Math.round(Number(settings().cdExpandPer));
        if (!Number.isFinite(n)) n = 1;
        return Math.min(9, Math.max(1, n));
    }
    function adrCdExpandTemp() {
        var t = Number(settings().cdExpandTemp);
        if (!Number.isFinite(t)) t = 0.9;
        return Math.min(2, Math.max(0, Math.round(t * 100) / 100));
    }
    function adrCdExpandPreset() {
        var p = settings().expandPreset;
        return (typeof p === "string" && p.trim()) ? p : ADR_CD_EXPAND_PRESET;
    }

    function adrCdNormExpand(o) {
        if (!o || typeof o !== "object" || !Array.isArray(o.steps)) return null;
        var steps = [];
        o.steps.forEach(function (s) {
            var text = String(s && s.text || "").trim().slice(0, ADR_CD_EXPAND_FIELD_MAX);
            if (!text) return;
            steps.push({ name: String(s && s.name || "").trim().slice(0, 24), text: text });
        });
        if (!steps.length) return null;
        var cursor = Math.round(Number(o.cursor));
        if (!Number.isFinite(cursor)) cursor = 0;
        cursor = Math.min(steps.length - 1, Math.max(0, cursor));
        var per = Math.round(Number(o.per)); if (!Number.isFinite(per)) per = 1;
        return {
            on: o.on === true,
            finished: o.finished === true,
            steps: steps,
            cursor: cursor,
            served: Math.max(0, Math.round(Number(o.served)) || 0),
            used: o.used === true,
            per: Math.min(9, Math.max(1, per)),
            analysis: String(o.analysis || "").slice(0, 4000),
            card: String(o.card || "").slice(0, 400),
            t: Number(o.t) || 0
        };
    }

    function adrCdExpandActive(state) {
        return !!(state && state.expand && state.expand.on && state.expand.steps && state.expand.steps.length);
    }

    function adrCdExpandStepText(ex, idx) {
        var s = ex && ex.steps && ex.steps[idx];
        if (!s) return "";
        var parts = ["【本回合剧情步骤 · 剧情小风铃】"];
        parts.push("第 " + (idx + 1) + "/" + ex.steps.length + " 幕" + (s.name ? "　" + s.name : ""));
        var prev = idx > 0 ? ex.steps[idx - 1] : null;
        if (prev && prev.name) parts.push("（上一幕已经演过：" + prev.name + "）");
        parts.push(s.text);
        parts.push("");
        parts.push(ADR_CD_EXPAND_TRAILER);
        return parts.join("\n");
    }

    // ---- 切幕解析：先找 "steps" 键，从它前面最近的 { 起恢复；分析段里碰巧有花括号也不会被带偏 ----
    function adrCdRecoverJsonObject(text) {
        var s = String(text || "");
        var start = s.indexOf("{");
        if (start < 0) return "";
        var depth = 0, inStr = false, esc = false;
        for (var i = start; i < s.length; i++) {
            var ch = s.charAt(i);
            if (inStr) {
                if (esc) esc = false;
                else if (ch === "\\") esc = true;
                else if (ch === "\"") inStr = false;
                continue;
            }
            if (ch === "\"") { inStr = true; continue; }
            if (ch === "{") depth++;
            else if (ch === "}") { depth--; if (depth === 0) return s.slice(start, i + 1); }
        }
        return "";
    }

    function adrCdExpandAnalysisPart(text) {
        var s = String(text || "");
        var cut = s.search(/【步骤】|【分幕】|\{\s*"steps"|```/);
        if (cut >= 0) s = s.slice(0, cut);
        return s.replace(/【分析】/g, "").trim().slice(0, 4000);
    }

    function adrCdParseExpandJson(rawText, want) {
        var raw = String(rawText || "").trim().replace(/^```(?:json)?/i, "").replace(/```\s*$/, "");
        var k = raw.lastIndexOf("\"steps\"");
        var from = k >= 0 ? Math.max(0, raw.lastIndexOf("{", k)) : 0;
        var jsonText = adrCdRecoverJsonObject(raw.slice(from)) || adrCdRecoverJsonObject(raw);
        var data = null;
        if (jsonText) { try { data = JSON.parse(jsonText); } catch (e) { data = null; } }
        if (!data) throw new Error("模型输出里没有可解析的 {\"steps\":[...]}（末 80 字）：" + raw.slice(-80));
        if (!Array.isArray(data.steps)) throw new Error("模型输出里没有 steps 数组");
        var out = [];
        data.steps.forEach(function (s) {
            var text = String(typeof s === "string" ? s : (s && s.text) || "").trim();
            if (!text) return;
            var name = String(s && s.name || "").trim() || ("第 " + (out.length + 1) + " 幕");
            out.push({ name: name.slice(0, 24), text: text.slice(0, ADR_CD_EXPAND_FIELD_MAX) });
        });
        if (!out.length) throw new Error("一幕都没切出来，整批作废");
        var warnings = [];
        if (want > 0 && out.length > want) { out = out.slice(0, want); warnings.push("模型多给了几幕，已截到 " + want + " 幕"); }
        if (want > 0 && out.length < want) warnings.push("要 " + want + " 幕，模型只给了 " + out.length + " 幕");
        return { steps: out, analysis: adrCdExpandAnalysisPart(raw.slice(0, from || raw.length)), warnings: warnings };
    }

    // ---- 通用的一次对话请求：流式读（尊重流式开关），空闲闸，服务端回整份 JSON 也认 ----
    async function adrDChatCompletionText(cfg) {
        var url = chatUrl(cfg.endpoint || "");
        if (!url) throw new Error("API 地址无效");
        var st = settings();
        var useStream = st.streamEnabled !== false && cfg.stream !== false;
        var headers = { "Content-Type": "application/json", "Accept": useStream ? "text/event-stream, application/json" : "application/json" };
        adrDAuthHeaders(headers, cfg.key, url);
        var body = { model: cfg.model, messages: cfg.messages, temperature: typeof cfg.temperature === "number" ? cfg.temperature : 0.7, stream: useStream };
        if (cfg.maxTokens) body.max_tokens = cfg.maxTokens;
        var ab = typeof AbortController !== "undefined" ? new AbortController() : null;
        var opts = { method: "POST", headers: headers, body: adrDRequestBody(body, url) };
        if (ab) opts.signal = ab.signal;
        var timeoutId = null, didTimeout = false, didManual = false;
        var idleMs = cfg.idleMs || ADR_CD_EXPAND_IDLE_MS;
        function arm() {
            if (!ab || typeof setTimeout !== "function") return;
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(function () { didTimeout = true; try { ab.abort(); } catch (e) {} }, idleMs);
        }
        arm();
        // v1.39.0：调用方可以拿到一把"打断"——掌灯页的打断按钮用。打断抛 LampAbort，与超时区分。
        if (ab && typeof cfg.onAbortable === "function") {
            try { cfg.onAbortable(function () { didManual = true; try { ab.abort(); } catch (eA) {} }); } catch (eH) {}
        }
        var col = adrDStreamCollector();
        var res, raw = "";
        try {
            res = await fetch(url, opts);
            if (!res.ok) raw = await res.text();
            // v1.38.1：中转站后面是新一代 Claude、不收 temperature 的，摘掉再试一次。
            if (!res.ok && adrDIsTemperatureRejected(res.status, raw) && "temperature" in body) {
                delete body.temperature;
                opts.body = JSON.stringify(body);
                arm();
                res = await fetch(url, opts);
                raw = res.ok ? "" : await res.text();
            }
            if (res.ok) {
                await adrDReadBody(res, function (txt) {
                    arm();
                    col.push(txt);
                    if (typeof cfg.onProgress === "function") {
                        try { cfg.onProgress(col.content().length, col.reasoningChars(), col.content()); } catch (eP) {}
                    }
                });
                col.end();
                raw = col.raw();
            }
        } catch (eF) {
            if (didManual && eF && eF.name === "AbortError") { var eM = new Error("已打断"); eM.name = "LampAbort"; throw eM; }
            if (didTimeout && eF && eF.name === "AbortError") throw new Error("请求超时（" + (idleMs / 1000) + " 秒没有新内容）");
            throw eF;
        } finally { if (timeoutId) clearTimeout(timeoutId); }
        if (!res.ok) throw new Error("API " + res.status + "：" + String(raw || "").slice(0, 200));
        if (col.mode() === "sse") {
            var streamed = String(col.content() || "").trim();
            if (streamed) return streamed;
            if (col.error()) throw col.error();
            throw new Error("正文为空" + adrDEmptyContentHint(col.reasoningChars(), col.finish()));
        }
        var data;
        try { data = JSON.parse(raw); } catch (eJ) { throw new Error("API 返回非 JSON：" + raw.slice(0, 160)); }
        if (data && data.error && !(data.choices && data.choices[0])) throw new Error("API 报错：" + String(data.error.message || JSON.stringify(data.error)).slice(0, 200));
        var out = parseResponse(data);
        if (!out) throw new Error("无法解析响应：" + raw.slice(0, 160));
        return out;
    }

    function adrCdExpandUserPrompt(card, want, materials) {
        // v1.34.2：此刻在前、角色卡在后——先把模型钉在正文停下的地方，再给设定；否则它拿着大设定往外编，越编越玄。
        var parts = [];
        parts.push("【抽到的事件卡 · 这是脊柱，每一幕都在演它】\n" + String(card || "").trim());
        if (materials.recent) parts.push("【最近正文 · 此刻】\n" + materials.recent
            + "\n\n这张卡从这里接起：第一幕必须接得上此刻的处境——同一个地点、同一个时刻、同样的关系温度——不是空降。");
        if (materials.tone) parts.push("【用户基调 · 第一要义】\n" + materials.tone);
        if (materials.precise) parts.push("【角色卡 / 世界书 / 人设 · 只用来判断什么合情理，不是拿来编新线的】\n" + materials.precise);
        parts.push("【要切成几幕】\n严格 " + want + " 幕，不多不少。一幕一回合：每一幕就是一回合世界抛给两个人的一件事。");
        parts.push("先写【分析】（四问逐一答），再写【步骤】。输出 {\"steps\":[{\"name\":\"\",\"text\":\"\"}]}，严格 " + want + " 幕。合情理、不玄乎、不另起线。");
        return parts.join("\n\n");
    }

    // 这张卡要不要展开：开关开着、展开 API 填了、NSFW 卡默认不展开（卡面要出门，走审核有风险）
    function adrCdExpandWanted(result) {
        var st = settings();
        if (!adrCdExpandEnabled()) return false;
        if (!st.expandApiEndpoint || !st.expandModel) return false;
        if (result && result.slot === "nsfw" && st.cdExpandNsfw !== true) return false;
        return true;
    }

    function adrCdExpandStatus(t, c) { adrCdSetTextAll("adr044-cd-life-status", t, c || "#d6b177"); }

    async function adrCdExpandCard(card) {
        var st = settings();
        var want = adrCdExpandN();
        var materials = { tone: "", precise: "", recent: "" };
        try { materials.tone = adrDToneText(); } catch (eT) {}
        try { materials.precise = adrCdTruncate(buildPreciseContext(), 6000); } catch (eP) {}
        try { materials.recent = adrCdTruncate(await recentContentBlocks(adrCdPickReadRounds()), 5000); } catch (eR) {}
        var lastPaint = 0;
        var raw = await adrDChatCompletionText({
            endpoint: st.expandApiEndpoint, key: st.expandApiKey, model: st.expandModel, temperature: adrCdExpandTemp(),
            messages: [
                { role: "system", content: adrCdExpandPreset() },
                { role: "user", content: adrCdExpandUserPrompt(card, want, materials) }
            ],
            onProgress: function (chars, thought, partial) {
                var now = Date.now();
                if (now - lastPaint < 150) return;
                lastPaint = now;
                var jsonStarted = /【步骤】|\{\s*"steps"/.test(partial || "");
                adrCdExpandStatus(chars > 0
                    ? ((jsonStarted ? "分析写完了，正在切幕…" : "导演在想这张卡怎么展开…") + "已收到 " + chars + " 字")
                    : (thought > 0 ? "导演在思考（" + thought + " 字）…" : "等导演开口…"), "#8ed99d");
            }
        });
        var res = adrCdParseExpandJson(raw, want);
        return { steps: res.steps, analysis: res.analysis, warnings: res.warnings, per: adrCdExpandPer(), card: String(card || "").slice(0, 400), t: Date.now() };
    }

    // ---- 推进：回复位 ----
    function adrCdExpandGoto(state, idx, why, force) {
        var ex = state.expand;
        if (!ex || !ex.on) return false;
        if (idx < 0 || idx > ex.steps.length) return false;
        if (!force && idx <= ex.cursor) return false;
        var from = ex.steps[ex.cursor];
        if (idx >= ex.steps.length) {
            ex.on = false;
            ex.finished = true;
            ex.cursor = ex.steps.length - 1;
            ex.served = 0;
            ex.used = false;
            var list = state.history || [];
            if (list.length) list[list.length - 1].status = "done";
            state.floatStage = "done";
            state.floatText = "";
            state.lastDrawAt = adrDAssistantRoundCount();   // 走完才起算下一张，中间留白按 N 来
            adrCdSaveChatState(state);
            adrCdApplyFloat("");
            console.log("[抽卡小能手] 展开推进走完：" + (from ? "「" + from.name + "」演过，" : "") + "共 " + ex.steps.length + " 幕，已结案" + (why ? "（" + why + "）" : ""));
            adrCdExpandStatus("这张卡的 " + ex.steps.length + " 幕都演过了，已结案 ✓　下一张按原节奏来", "#8ed99d");
            adrCdUpdateStatusLine();
            adrCdRefreshLifePanel();
            return true;
        }
        ex.cursor = idx;
        ex.served = 0;
        ex.used = false;
        state.floatText = adrCdExpandStepText(ex, idx);
        adrCdSaveChatState(state);
        adrCdApplyFloat(state.paused ? "" : state.floatText);
        var to = ex.steps[idx];
        console.log("[抽卡小能手] 展开推进：" + (from && from !== to ? "「" + from.name + "」撤下，" : "") + "贴上第 " + (idx + 1) + "/" + ex.steps.length + " 幕「" + to.name + "」" + (why ? "——" + why : ""));
        adrCdUpdateStatusLine();
        adrCdRefreshLifePanel();
        return true;
    }

    // 回复落地：当前幕被用过一次。重抽再落地还是「用过」，不会多算一个回复位。
    function adrCdExpandOnAiMessage() {
        try {
            if (!adrCdActive()) return;
            var state = adrCdChatState();
            if (!adrCdExpandActive(state)) return;
            if (!state.expand.used) { state.expand.used = true; adrCdSaveChatState(state); }
            adrCdRefreshLifePanel();
        } catch (e) {}
    }

    // 用户发言：结算上一位。用过 → 本幕多服务了一个回复位；服务够「每幕几轮」就换下一幕。没用过（连发）→ 原地不动。
    function adrCdExpandOnUserMessage() {
        try {
            if (!adrCdActive()) return;
            var state = adrCdChatState();
            if (!adrCdExpandActive(state)) return;
            var ex = state.expand;
            if (ex.used) { ex.served += 1; ex.used = false; }
            if (ex.served >= ex.per) adrCdExpandGoto(state, ex.cursor + 1, ex.per > 1 ? "演满 " + ex.per + " 轮" : "");
            else adrCdSaveChatState(state);
            adrCdRefreshLifePanel();
        } catch (e) {}
    }

    function adrCdExpandNext() {
        var state = adrCdChatState();
        if (!adrCdExpandActive(state)) { adrCdExpandStatus("耳边没有正在推进的分幕", "#d6b177"); return; }
        adrCdExpandGoto(state, state.expand.cursor + 1, "手动跳过");
    }
    function adrCdExpandPrev() {
        var state = adrCdChatState();
        if (!adrCdExpandActive(state)) { adrCdExpandStatus("耳边没有正在推进的分幕", "#d6b177"); return; }
        if (state.expand.cursor <= 0) { adrCdExpandStatus("已经是第一幕了", "#d6b177"); return; }
        adrCdExpandGoto(state, state.expand.cursor - 1, "手动退回", true);
    }
    function adrCdExpandStop() {
        var state = adrCdChatState();
        if (!adrCdExpandActive(state)) { adrCdExpandStatus("耳边没有正在推进的分幕", "#d6b177"); return; }
        adrCdExpandGoto(state, state.expand.steps.length, "手动撤下这条线");
    }

    // ---- 面板：分幕露出来，能看能改（v1.34.1，照小萤火：改、删、调序、追加；正贴着的那一幕改了字立刻重贴）----
    function adrCdExpandSig(ex) {
        if (!ex) return "";
        try { return JSON.stringify([ex.on, ex.finished, ex.cursor, ex.per, ex.served, ex.used, ex.steps]); } catch (e) { return String(Date.now()); }
    }

    function adrCdExpandListHTML(state) {
        var ex = state && state.expand;
        if (!ex || !ex.steps || !ex.steps.length) return "";
        var head = ex.on
            ? "【展开推进】第 " + (ex.cursor + 1) + "/" + ex.steps.length + " 幕" + (ex.per > 1 ? "（每幕 " + ex.per + " 轮，本幕已演 " + ex.served + (ex.used ? "+1" : "") + "）" : "")
            : "【展开推进】" + (ex.finished ? "这条线已走完" : "未推进");
        var html = '<div class="adr044-cd-step-head">' + esc(head) + '　<span class="adr044-cd-step-hint">每幕只写外部事件，反应留给两个人。改了字自动存，正贴着的那一幕立刻重贴。</span></div>';
        ex.steps.forEach(function (st, i) {
            var mark = ex.on ? (i < ex.cursor ? "✓" : (i === ex.cursor ? "▶" : "·")) : (ex.finished ? "✓" : "·");
            html += '<div class="adr044-cd-step' + (ex.on && i === ex.cursor ? " on" : "") + '" data-idx="' + i + '">'
                + '<div class="adr044-cd-step-row"><span class="adr044-cd-step-mark">' + mark + ' 第 ' + (i + 1) + ' 幕</span>'
                + '<input type="text" class="adr044-cd-step-name" data-idx="' + i + '" value="' + esc(st.name || "") + '" placeholder="小标题" maxlength="24">'
                + '<span class="adr044-cd-step-btns">'
                + '<button type="button" class="adr044-cd-step-btn" data-act="up" data-idx="' + i + '" title="上移">▲</button>'
                + '<button type="button" class="adr044-cd-step-btn" data-act="down" data-idx="' + i + '" title="下移">▼</button>'
                + '<button type="button" class="adr044-cd-step-btn" data-act="del" data-idx="' + i + '" title="删掉这一幕">✕</button>'
                + '</span></div>'
                + '<textarea class="adr044-cd-step-text" data-idx="' + i + '" rows="2" placeholder="这一幕世界抛给两个人的一件事">' + esc(st.text || "") + '</textarea>'
                + '</div>';
        });
        html += '<div class="adr044-cd-step-actions"><button type="button" class="adr044-cd-step-btn" data-act="add">＋ 追加一幕</button><button type="button" class="adr044-cd-step-btn" data-act="replan">↻ 重新展开这张卡</button></div>';
        if (ex.analysis) html += '<details class="adr044-cd-step-analysis"><summary>导演的分析</summary><div>' + esc(ex.analysis) + '</div></details>';
        return html;
    }

    function adrCdExpandRenderList(state) {
        try {
            var d = rootDoc();
            var ex = state && state.expand;
            var sig = adrCdExpandSig(ex);
            var active = d.activeElement;
            Array.prototype.slice.call(d.querySelectorAll("#adr044-cd-expand-panel")).forEach(function (el) {
                if (el.getAttribute("data-sig") === sig) return;
                if (active && el.contains(active)) return;   // 正在改字，不重画
                el.innerHTML = adrCdExpandListHTML(state);
                el.setAttribute("data-sig", sig);
            });
            try { adrxInstallExpanders(); } catch (eX) {}
        } catch (e) {}
    }

    function adrCdExpandEditStep(idx, fieldName, value, commit) {
        try {
            var state = adrCdChatState();
            var ex = state.expand;
            if (!ex || !ex.steps[idx]) return;
            var v = String(value || "");
            if (fieldName === "name") ex.steps[idx].name = v.trim().slice(0, 24);
            else ex.steps[idx].text = v.slice(0, ADR_CD_EXPAND_FIELD_MAX);
            if (!commit) { adrCdSaveChatState(state); return; }
            if (ex.on && idx === ex.cursor) {
                state.floatText = adrCdExpandStepText(ex, idx);
                adrCdSaveChatState(state);
                adrCdApplyFloat(state.paused ? "" : state.floatText);
                adrCdExpandStatus("第 " + (idx + 1) + " 幕改好了，已重贴到耳边 ✓", "#8ed99d");
            } else {
                adrCdSaveChatState(state);
                adrCdExpandStatus("第 " + (idx + 1) + " 幕已存 ✓", "#8ed99d");
            }
            adrCdRefreshLifePanel();
        } catch (e) {}
    }

    function adrCdExpandStepAction(act, idx) {
        try {
            var state = adrCdChatState();
            var ex = state.expand;
            if (act === "replan") { adrCdExpandReplan(); return; }
            if (!ex) { adrCdExpandStatus("耳边没有分幕", "#d6b177"); return; }
            var n = ex.steps.length;
            if (act === "add") {
                if (n >= ADR_CD_EXPAND_MAX) { adrCdExpandStatus("最多 " + ADR_CD_EXPAND_MAX + " 幕，够细了", "#d6b177"); return; }
                ex.steps.push({ name: "第 " + (n + 1) + " 幕", text: "（写这一幕世界抛给两个人的一件事，改我）" });
                if (ex.finished) { ex.finished = false; }
                adrCdSaveChatState(state);
                adrCdExpandStatus("追加了第 " + (n + 1) + " 幕，记得把正文改成真事", "#8ed99d");
            } else if (act === "del") {
                if (!ex.steps[idx]) return;
                if (n <= 1) { adrCdExpandStatus("至少留一幕；不想要就「撤下这条线」", "#d6b177"); return; }
                ex.steps.splice(idx, 1);
                var reinject = false;
                if (idx < ex.cursor) ex.cursor -= 1;
                else if (idx === ex.cursor) { if (ex.cursor >= ex.steps.length) ex.cursor = ex.steps.length - 1; ex.served = 0; ex.used = false; reinject = true; }
                if (ex.on && reinject) { state.floatText = adrCdExpandStepText(ex, ex.cursor); adrCdSaveChatState(state); adrCdApplyFloat(state.paused ? "" : state.floatText); }
                else adrCdSaveChatState(state);
                adrCdExpandStatus("删掉了一幕，现在共 " + ex.steps.length + " 幕" + (reinject ? "，耳边换成第 " + (ex.cursor + 1) + " 幕" : ""), "#d6b177");
            } else if (act === "up" || act === "down") {
                var j = act === "up" ? idx - 1 : idx + 1;
                if (!ex.steps[idx] || !ex.steps[j]) return;
                var tmp = ex.steps[idx]; ex.steps[idx] = ex.steps[j]; ex.steps[j] = tmp;
                var touched = false;
                if (ex.cursor === idx) { ex.cursor = j; touched = true; }
                else if (ex.cursor === j) { ex.cursor = idx; touched = true; }
                // 当前幕跟着它的正文走：它的序号变了，耳边的"第几幕"也要跟着变
                if (ex.on && touched) { state.floatText = adrCdExpandStepText(ex, ex.cursor); adrCdSaveChatState(state); adrCdApplyFloat(state.paused ? "" : state.floatText); }
                else adrCdSaveChatState(state);
                adrCdExpandStatus("调了序 ✓", "#8ed99d");
            }
            adrCdUpdateStatusLine();
            adrCdRefreshLifePanel();
        } catch (e) {}
    }

    var adrCdExpandReplanRunning = false;
    async function adrCdExpandReplan() {
        if (adrCdExpandReplanRunning) { adrCdExpandStatus("正在重新展开，稍等", "#d6b177"); return; }
        var state = adrCdChatState();
        if (!state.floatCard) { adrCdExpandStatus("耳边没有卡，没什么可展开", "#d6b177"); return; }
        var st = settings();
        if (!st.expandApiEndpoint || !st.expandModel) { adrCdExpandStatus("先填展开 API 地址与模型", "#d4726a"); return; }
        adrCdExpandReplanRunning = true;
        var homeKey = adrDChatKey();
        adrCdExpandStatus("导演正在重新展开「" + adrCdTruncate(state.floatCard, 20) + "」…", "#8ed99d");
        try {
            var info = await adrCdExpandCard(state.floatCard);
            if (adrDChatKey() !== homeKey) { adrCdExpandReplanRunning = false; return; }
            var fresh = adrCdChatState();
            fresh.expand = { on: true, finished: false, steps: info.steps, cursor: 0, served: 0, used: false, per: info.per, analysis: info.analysis, card: info.card, t: info.t };
            fresh.floatStage = "active";
            fresh.floatText = adrCdExpandStepText(fresh.expand, 0);
            var list = fresh.history || [];
            if (list.length && list[list.length - 1].status === "done") list[list.length - 1].status = "live";
            adrCdSaveChatState(fresh);
            adrCdApplyFloat(fresh.paused ? "" : fresh.floatText);
            adrCdExpandStatus("重新展开成 " + info.steps.length + " 幕，第一幕已贴上" + (info.warnings.length ? "（" + info.warnings.join("；") + "）" : ""), "#8ed99d");
        } catch (e) {
            adrCdExpandStatus("重新展开失败：" + adrCdTruncate(e && e.message ? e.message : String(e), 80), "#d4726a");
        }
        adrCdExpandReplanRunning = false;
        adrCdUpdateStatusLine();
        adrCdRefreshLifePanel();
    }

    function adrCdExpandPanelText(state) {
        var ex = state && state.expand;
        if (!ex || !ex.steps || !ex.steps.length) return "";
        var lines = [];
        if (ex.on) lines.push("【展开推进】第 " + (ex.cursor + 1) + "/" + ex.steps.length + " 幕" + (ex.per > 1 ? "（每幕 " + ex.per + " 轮，本幕已演 " + ex.served + (ex.used ? "+1" : "") + "）" : ""));
        else lines.push("【展开推进】" + (ex.finished ? "这条线已走完" : "未推进"));
        ex.steps.forEach(function (s, i) {
            var mark = ex.on ? (i < ex.cursor ? "✓" : (i === ex.cursor ? "▶" : "·")) : (ex.finished ? "✓" : "·");
            lines.push(mark + " 第 " + (i + 1) + " 幕　" + (s.name || "") + "\n　　" + adrCdTruncate(s.text, 80));
        });
        if (ex.analysis) lines.push("\n【导演的分析】\n" + adrCdTruncate(ex.analysis, 600));
        return lines.join("\n");
    }

    function adrCdExpandHistoryBlock(state) {
        var ex = state && state.expand;
        if (!ex || !ex.on) return "";
        var lines = ex.steps.map(function (s, i) {
            var mark = i < ex.cursor ? "已演过" : (i === ex.cursor ? "正在演" : "还没演");
            return "· 第 " + (i + 1) + " 幕「" + s.name + "」（" + mark + "）" + (i === ex.cursor ? "：" + s.text : "");
        });
        return "【展开推进｜最近这张卡已被切成 " + ex.steps.length + " 幕，一回合演一幕，现在演到第 " + (ex.cursor + 1) + " 幕】\n" + lines.join("\n")
            + "\n统筹须知：还没演的幕演员看不见，你的调度只服务正在演的这一幕，不要把后面的幕透给演员。";
    }

    async function adrCdExpandTestConnection() {
        try {
            syncType("expand");
            var st = settings();
            if (!st.expandApiEndpoint) { status("expand", "请先填写 API 地址", "#d4726a"); return; }
            if (!st.expandModel) { status("expand", "请先填写或加载一个模型", "#d4726a"); return; }
            status("expand", "正在测试连接…", "#8ed99d");
            var t0 = Date.now();
            var out = await adrDChatCompletionText({ endpoint: st.expandApiEndpoint, key: st.expandApiKey, model: st.expandModel, temperature: 0, maxTokens: 200, stream: false,
                messages: [{ role: "user", content: "回复两个字：在的" }] });
            status("expand", "连接正常 ✓ 耗时 " + (Date.now() - t0) + "ms　模型回话：" + adrCdTruncate(out, 20), "#8ed99d");
        } catch (e) {
            status("expand", "连接失败：" + (e && e.message ? e.message : e), "#d4726a");
        }
    }

    try {
        rootWin().__adrCdExpandTest = {
            parse: adrCdParseExpandJson, stepText: adrCdExpandStepText, preset: ADR_CD_EXPAND_PRESET, trailer: ADR_CD_EXPAND_TRAILER,
            recover: adrCdRecoverJsonObject, panelText: adrCdExpandPanelText, historyBlock: adrCdExpandHistoryBlock
        };
    } catch (eExpandHook) {}

    // ---- v1.12 卡的生命周期 ----

    // v1.13.1：DS 视野随节奏走，不再钉死。
    // 兑现判定跟半衰期（卡挂了多少楼就回看多少楼），择池跟投卡间隔（上张卡以来的正文都算数）。
    // 下限保持旧默认（4/6 轮）不缩水，上限封 12 轮 / 8000 字防开销与延迟跑飞。
    function adrCdAskReadRounds() {
        return Math.max(4, Math.min(12, adrCdHalfLifeFloors() + 2));
    }

    function adrCdPickReadRounds() {
        return Math.max(6, Math.min(12, adrCdN() + 2));
    }

    function adrCdReadCharCap(rounds) {
        return Math.max(3000, Math.min(8000, rounds * 700));
    }

    // 问 DS 一句「兑现没」。答复只认"是"/"否"，多一个字作废；任何异常按未兑现处理。
    async function adrCdAskFulfilled(card) {
        var st = settings();
        if (!st.cdApiEndpoint) throw new Error("未填写 API 地址");
        var url = chatUrl(st.cdApiEndpoint);
        if (!url) throw new Error("API 地址无效");
        var sys = "你是剧情兑现检查员。你会看到一件已经投放给作者的\"待发生事件\"，以及最近的正文。"
            + "判断这件事是否已经在正文里发生或被写出来了。只回答\"是\"或\"否\"，不加标点、不加解释。多一个字视为无效。";
        var recent = "";
        var askRounds = adrCdAskReadRounds();
        try { recent = await recentContentBlocks(askRounds); } catch (eR) {}
        var body = "【待发生事件】\n" + String(card || "")
            + "\n\n【最近正文】\n" + adrCdTruncate(recent, adrCdReadCharCap(askRounds))
            + "\n\n这件事已经发生了吗？只回答 是 或 否。";

        var ab = typeof AbortController !== "undefined" ? new AbortController() : null;
        var tid = null, timedOut = false;
        if (ab) tid = setTimeout(function () { timedOut = true; try { ab.abort(); } catch (e) {} }, ADR_CD_PICK_TIMEOUT_MS);
        var headers = { "Content-Type": "application/json" };
        adrDAuthHeaders(headers, st.cdApiKey, url);
        var opts = {
            method: "POST", headers: headers,
            body: adrDRequestBody({
                model: st.cdModel || "deepseek-chat",
                messages: [{ role: "system", content: sys }, { role: "user", content: body }],
                temperature: 0, max_tokens: ADR_CD_REPLY_TOKENS, stream: false
            }, url)
        };
        if (ab) opts.signal = ab.signal;
        var raw;
        try {
            var res = await fetch(url, opts);
            raw = await res.text();
            if (!res.ok) throw new Error("兑现检查 API " + res.status);
        } catch (eF) {
            if (timedOut) throw new Error("兑现检查超时");
            throw eF;
        } finally { if (tid) clearTimeout(tid); }
        var data;
        try { data = JSON.parse(raw); } catch (eJ) { throw new Error("兑现检查返回非 JSON"); }
        var out = adrCdSanitizePickResponse(parseResponse(data), ["是", "否"]);
        if (!out) throw new Error("兑现检查答复无效");
        return out === "是";
    }


    // 结案：从耳边撤下，但不推进基准线——下一张仍按原节奏来，中间那几楼留白让剧情喘口气
    function adrCdCloseCard(reason, silent) {
        try {
            var state = adrCdChatState();
            if (!state.floatCard || state.floatStage === "done") {
                if (!silent) adrCdSetTextAll("adr044-cd-life-status", "当前耳边没有挂着的卡", "#d6b177");
                return false;
            }
            var list = state.history || [];
            if (list.length) list[list.length - 1].status = "done";
            state.floatStage = "done";
            state.floatText = "";
            if (state.expand) { state.expand.on = false; state.expand.finished = true; }   // v1.34.0 手动结案也撤下分幕
            adrCdSaveChatState(state);
            adrCdApplyFloat("");
            console.log("[抽卡小能手] 卡已结案（" + (reason || "手动") + "）：" + adrCdTruncate(state.floatCard, 30));
            if (!silent) adrCdSetTextAll("adr044-cd-life-status", "已结案，这张卡从耳边撤下 ✓　下一张仍按原节奏来", "#8ed99d");
            adrCdUpdateStatusLine();
            adrCdRefreshLifePanel();
            return true;
        } catch (e) { return false; }
    }

    // 生命节奏推进：
    //   常驻   —— 什么都不做，卡挂到下一张来换
    //   半衰期 —— 挂过 N/2 楼后先问一次是否兑现（若开启），未兑现则降级为背景
    //   只说一次 —— 只挂一层，说完就撤，耳边留白到下一张
    async function adrCdAdvanceLifecycle(count, state) {
        try {
            var st = settings();
            var lifeMode = adrCdLifeMode();
            if (lifeMode === "stay") return;
            if (adrCdExpandActive(state)) return;   // v1.34.0 分幕推进自己管生命周期
            if (!state.floatCard || state.floatStage !== "active") return;
            var age = count - Number(state.lastDrawAt);
            if (!Number.isFinite(age)) return;

            // v1.20.0「只说一次」：卡只在下一层露一次面就撤下，之后耳边空着等下一张。
            // 贴耳注入每次生成都会把同一张卡再念一遍，这正是模型把一段剧情复述好几轮的来源；
            // 这一档把"念几遍"直接压到一遍。DS 兑现判定在这一档没有意义，跳过不花钱。
            if (lifeMode === "once") {
                if (age < 1) return;
                var one = adrCdChatState();
                if (!one.floatCard || one.floatStage !== "active") return;
                one.floatStage = "done";
                one.floatText = "";
                var listOne = one.history || [];
                if (listOne.length && listOne[listOne.length - 1].status === "live") {
                    listOne[listOne.length - 1].status = "once";
                }
                adrCdSaveChatState(one);
                adrCdApplyFloat("");
                console.log("[抽卡小能手] 只说一次：说完即撤，耳边留白等下一张：" + adrCdTruncate(one.floatCard, 30));
                adrCdUpdateStatusLine();
                adrCdRefreshLifePanel();
                return;
            }

            if (age < adrCdHalfLifeFloors()) return;

            // v1.23.2：问询期间（最长 8s）可能又到了投卡点、新卡已经挂上。
            // 记下此刻是哪张卡、哪一楼投的，回来先对账；对不上就说明处理的已经不是这张卡，整段放弃。
            // 同时上一面旗，两次检查并发进来时不重复问询、不重复扣费。
            if (adrCdLifecycleRunning) return;
            adrCdLifecycleRunning = true;
            var cardAtStart = state.floatCard;
            var drawAtStart = Number(state.lastDrawAt);
            try {
                var lastRec = (state.history || []).slice(-1)[0] || null;
                var isNsfwCard = !!(lastRec && lastRec.slot === "nsfw");
                if (st.cdAutoDone && isNsfwCard) {
                    // v1.23.2：NSFW 卡面不出门——择卡那一路早已如此，兑现判定此前却把卡面全文发了出去。
                    // 小眼睛那边的审核会打回，等于白烧一次调用；这一档直接按未兑现降级。
                    console.log("[抽卡小能手] NSFW 卡不问小眼睛，直接降级为背景");
                } else if (st.cdAutoDone) {
                    try {
                        var done = await adrCdAskFulfilled(state.floatCard);
                        var check = adrCdChatState();
                        if (check.floatCard !== cardAtStart || Number(check.lastDrawAt) !== drawAtStart) {
                            console.warn("[抽卡小能手] 问询期间卡已换过，本次判定作废");
                            return;
                        }
                        if (done) {
                            console.log("[抽卡小能手] 小眼睛判定已兑现，自动结案");
                            adrCdCloseCard("小眼睛自动判定", true);
                            return;
                        }
                        console.log("[抽卡小能手] 小眼睛判定尚未兑现，降级为背景");
                    } catch (eAsk) {
                        // 判不了就按未兑现处理，安全降级，绝不误撤
                        console.warn("[抽卡小能手] 兑现检查失败，按未兑现降级：" + (eAsk && eAsk.message ? eAsk.message : eAsk));
                    }
                }

                var fresh = adrCdChatState();
                if (!fresh.floatCard || fresh.floatStage !== "active") return;
                if (fresh.floatCard !== cardAtStart || Number(fresh.lastDrawAt) !== drawAtStart) return;
                fresh.floatStage = "faded";
                fresh.floatText = adrCdBuildEnvelope(adrCdEnvelopePair().faded, fresh.floatCard);
                var list = fresh.history || [];
                if (list.length && list[list.length - 1].status === "live") list[list.length - 1].status = "faded";
                adrCdSaveChatState(fresh);
                if (!fresh.paused) adrCdApplyFloat(fresh.floatText);
                console.log("[抽卡小能手] 卡已过半衰期，降级为背景：" + adrCdTruncate(fresh.floatCard, 30));
                adrCdUpdateStatusLine();
                adrCdRefreshLifePanel();
            } finally {
                adrCdLifecycleRunning = false;
            }
        } catch (e) {
            adrCdLifecycleRunning = false;
            try { console.warn("[抽卡小能手] 生命周期推进失败", e); } catch (e2) {}
        }
    }

    // ---- 统筹采买：投卡史 ----

    function adrCdHistoryBlock() {
        try {
            var state = adrCdChatState();
            var list = (state.history || []).slice(-ADR_CD_HISTORY_MAX);
            if (!list.length) return "";
            var lines = list.map(function (h) {
                return "· 第 " + (Number.isFinite(Number(h.floor)) ? h.floor : "?") + " 楼｜卡池：" + (h.pool || "?")
                    + "｜模式：" + (h.mode || "?") + "｜卡面：" + (h.card || "");
            });
            var expandBlock = adrCdExpandHistoryBlock(state);
            return "【投卡史｜剧情小风铃最近投放的场外事件卡】\n" + lines.join("\n")
                + "\n统筹须知：以上事件卡均已注入戏中。收线时请将其纳入兑现盘点视线范围。"
                + (expandBlock ? "\n\n" + expandBlock : "");
        } catch (e) { return ""; }
    }

    // ---- v1.11 刷新保护：正在输入的控件永不被覆盖 ----

    function adrCdIsBusyEl(el) {
        try {
            if (!el) return true;
            if (el.__adrCdTyping) return true;
            // v1.11.1：刚被点过的控件 1.5s 内免疫任何刷新。
            // iOS 上原生下拉弹出期间若被改写，选择器会当场关闭，表现为"点不开"。
            if (el.__adrCdTouchedAt && (Date.now() - el.__adrCdTouchedAt) < 1500) return true;
            // v1.20.0：原生下拉从按下到选中可以停留十几秒，1.5s 的窗口盖不住。
            // 选择器一被按下就长免疫，直到它自己 change/blur，或 25 秒保险丝到期。
            if (el.__adrCdPickerOpenAt && (Date.now() - el.__adrCdPickerOpenAt) < 25000) return true;
            var d = rootDoc();
            if (d && d.activeElement === el) return true;
        } catch (e) {}
        return false;
    }

    function adrCdTouch(el) {
        try { if (el) el.__adrCdTouchedAt = Date.now(); } catch (e) {}
    }

    // v1.11.1：落盘改防抖。即时 saveNow() 会在点击当帧触发刷新链，打断 iOS 的原生下拉。
    var adrCdSaveTimer = null;
    function adrCdSaveSoon() {
        try {
            if (adrCdSaveTimer) clearTimeout(adrCdSaveTimer);
            adrCdSaveTimer = setTimeout(function () {
                try { saveNow(); } catch (e) {}
            }, 900);
        } catch (e2) { try { saveNow(); } catch (e3) {} }
    }

    function adrCdSetValueSafe(id, value) {
        try {
            Array.prototype.slice.call(rootDoc().querySelectorAll("#" + id)).forEach(function (el) {
                if (!el || adrCdIsBusyEl(el)) return; // 正在打字的框，谁也别碰
                el.value = value == null ? "" : value;
            });
        } catch (e) {}
    }

    function adrCdSetCheckedSafe(id, checked) {
        try {
            Array.prototype.slice.call(rootDoc().querySelectorAll("#" + id)).forEach(function (el) {
                if (!el || adrCdIsBusyEl(el)) return; // 刚点过的勾选框不回刷，否则视觉上"勾不上"
                el.checked = !!checked;
            });
        } catch (e) {}
    }

    // 选项签名：HTML 生成与后续刷新共用同一套算法。
    // v1.11.2：签名必须随 HTML 一起写进 data-optsig，否则首次刷新会重写一次 DOM，
    // 那一次重写若撞上原生下拉弹出，第一次选择就被吞掉（表现为"要点两次"）。
    function adrCdOptSig(kind, names, value) {
        return kind + "|" + (names || []).join("\u0001") + "|" + String(value || "");
    }

    // options 没变就绝不重写 DOM——这是下拉能被一次点开的前提
    function adrCdFillSelect(el, optionsHtml, value, signature) {
        try {
            if (!el) return;
            var cur = el.__adrCdOptSig;
            if (cur === undefined) {
                // 首次接触：认 HTML 里带来的签名，不做无谓重写
                cur = el.getAttribute ? el.getAttribute("data-optsig") : null;
                if (cur != null) el.__adrCdOptSig = cur;
            }
            if (cur !== signature) {
                el.innerHTML = optionsHtml;
                el.__adrCdOptSig = signature;
                try { if (el.setAttribute) el.setAttribute("data-optsig", signature); } catch (eA) {}
            }
            if (el.value !== value) el.value = value;
        } catch (e) {}
    }

    function adrCdSetTextAll(id, text, color) {
        try {
            Array.prototype.slice.call(rootDoc().querySelectorAll("#" + id)).forEach(function (el) {
                el.textContent = String(text || "");
                if (color) el.style.color = color;
            });
        } catch (e) {}
    }

    // ---- 状态行 ----

    function adrCdStatusText() {
        var st = settings();
        if (!adrDMasterEnabled()) return "总开关已关闭 · 剧情小风铃随组休息";
        if (!st.cdEnabled) return "剧情小风铃未启用";
        var state = adrCdChatState();
        var on = ADR_CD_SLOTS.filter(function (s) { return state.slotOn[s] && adrCdSlotText(state, s); })
            .map(function (s) { return ADR_CD_SLOT_LABEL[s]; });
        var libPart = on.length ? on.join("＋") : "无可用仓库";
        var mode = ADR_CD_MODE_LABEL[st.cdMode] || "盲抽";
        var n = adrCdN();
        var count = adrDAssistantRoundCount();
        var base = Number(state.lastDrawAt);
        var left = (Number.isFinite(base) && base >= 0) ? Math.max(0, n - (count - base)) : n;
        var head = libPart + " · " + mode + " · " + ADR_CD_LIFE_MODE_LABEL[adrCdLifeMode()]
            + (state.paused ? " · 已暂停投卡" : (adrCdExpandActive(state)
                ? " · 🎬 展开推进中 第 " + (state.expand.cursor + 1) + "/" + state.expand.steps.length + " 幕「" + (state.expand.steps[state.expand.cursor].name || "") + "」"
                : " · 距下张还有 " + left + " 楼"));
        // v1.22.0：降级是静默发生的，用户对着一张莫名其妙的卡根本不知道 DS 那次没应答。
        var lastRec = ((state.history || []).slice(-1)[0]) || null;
        if (lastRec && String(lastRec.mode || "").indexOf("降级") >= 0) {
            head += " · ⚠ 上一张是小眼睛没应答时随机给的";
        } else if (lastRec && String(lastRec.mode || "").indexOf("审核判 NSFW") >= 0) {
            head += " · ⚠ 上一张：小眼睛被审核打回，按情欲场面已开门在 NSFW 库内随机给的";
        }

        var h = (state.history || []).slice(-1)[0];
        if (h) head += "\n最近一张：" + (h.pool || "?") + "｜" + String(h.card || "");
        return head;
    }

    function adrCdCounterInfo() {
        var label = "剧情小风铃";
        if (!adrDMasterEnabled()) return { state: "off", label: label, msg: "总开关已关闭 · 剧情小风铃随组休息" };
        if (!settings().cdEnabled) return { state: "off", label: label, msg: "开启剧情小风铃后，在这里查看投卡进度" };
        var state = adrCdChatState();
        if (state.paused) return { state: "off", label: label, tag: "已暂停", msg: "这个聊天已暂停投卡" };
        if (!adrDCountReady() || !adrDChatKeyReady()) return { state: "wait", label: label, msg: "正在读取聊天，稍后显示投卡进度…" };
        var count = adrDAssistantRoundCount();
        var n = adrCdN();
        var base = Number(state.lastDrawAt);
        if (!Number.isFinite(base) || base < 0) return { state: "wait", label: label, msg: "等待下一次检查对表" };
        var passed = Math.max(0, count - base);
        return { state: "ok", label: label, unit: "card", passed: passed, n: n,
            left: Math.max(0, n - passed), base: base, tech: "本聊天共 " + count + " 条回复 · 基准线 " + base + " 楼起" };
    }

    function adrCdUpdateStatusLine() {
        try { adrCdSetTextAll("adr044-cd-status-line", adrCdStatusText()); } catch (e) {}
        try { adrDSetCounterText("cd", adrCdCounterInfo()); } catch (e) {}
    }

    function adrCdToggleStatusExpand() {
        try {
            Array.prototype.slice.call(rootDoc().querySelectorAll("#adr044-cd-status-line")).forEach(function (el) {
                el.classList.toggle("adr044-cd-status-expanded");
            });
        } catch (e) {}
    }

    // ---- 面板同步 ----

    // force=true 表示这次刷新由用户自己的动作触发（点芯片/存库/改名/删库/导入），
    // 此刻改写 DOM 是安全的；后台同步一律不带 force，手指在上面就不动它。
    function adrCdRefreshSlotSelects(force) {
        try {
            var state = adrCdChatState();
            ADR_CD_SLOTS.forEach(function (slot) {
                var arr = adrCdSlotArr(state.slots[slot]);
                var html = adrCdSlotChipsHTML(slot, state);
                var sig = adrCdSlotChipsSig(slot, state);
                Array.prototype.slice.call(rootDoc().querySelectorAll("#adr044-cd-slot-" + slot)).forEach(function (el) {
                    // v1.20.0：芯片行此前是全楼唯一没有忙保护的可点区域。
                    // 手指按下到 click 之间整行被 innerHTML 重画，click 的 target 会退到容器，
                    // 那一下点击就白丢了——"要点两三次"的元凶之一。
                    if (!force && adrCdIsBusyEl(el)) return;
                    adrCdFillSelect(el, html, "", sig);
                });
                adrCdSetCheckedSafe("adr044-cd-slot-on-" + slot, state.slotOn[slot]);
                var cnt = 0;
                var txt = adrCdSlotText(state, slot);
                if (txt) adrCdParseLibraryText(txt).forEach(function (p) { cnt += p.cards.length; });
                adrCdSetTextAll("adr044-cd-slot-count-" + slot, arr.length ? (cnt + " 张卡 · " + arr.length + " 副") : "未选");
            });
            adrCdSetValueSafe("adr044-cd-import-slot", adrCdImportSlot());
        } catch (e) {}
    }

    function adrCdRefreshEditSelect(selectedName) {
        try {
            var names = adrCdLibNames();
            if (selectedName === undefined) {
                var cur = qForm("adr044-cd-edit-select");
                selectedName = cur ? String(cur.value || "") : "";
            }
            if (!selectedName || names.indexOf(selectedName) < 0) selectedName = names[0] || "";
            var html = names.map(function (nm) {
                return '<option value="' + esc(nm) + '"' + (nm === selectedName ? " selected" : "") + '>' + esc(nm) + '</option>';
            }).join("");
            var sigEdit = adrCdOptSig("edit", names, selectedName);
            Array.prototype.slice.call(rootDoc().querySelectorAll("#adr044-cd-edit-select")).forEach(function (el) {
                if (adrCdIsBusyEl(el)) return;
                adrCdFillSelect(el, html, selectedName, sigEdit);
            });
            return selectedName;
        } catch (e) { return ""; }
    }

    // 编辑区回灌：只在换库 / 导入 / 换聊 / 首次建面板时调用，绝不挂在周期刷新上
    function adrCdLoadEditor(name) {
        try {
            var chosen = adrCdRefreshEditSelect(name);
            adrCdSetValueSafe("adr044-cd-lib-name", chosen);
            adrCdSetValueSafe("adr044-cd-lib-editor", adrCdLibraries()[chosen] || "");
        } catch (e) {}
    }

    function adrCdSyncChatControls() {
        try {
            var state = adrCdChatState();
            adrCdSetCheckedSafe("adr044-cd-paused", state.paused === true);
            adrCdRefreshSlotSelects();
            adrCdRefreshLifePanel();
            adrCdUpdateStatusLine();
        } catch (e) {}
    }

    function adrCdRefreshPanelFields() {
        try {
            var st = settings();
            adrCdSetCheckedSafe("adr044-cd-enabled", !!st.cdEnabled);
            adrCdSetValueSafe("adr044-cd-n", String(adrCdN()));
            adrCdSetTextAll("adr044-cd-n-val", String(adrCdN()));
            adrCdSetValueSafe("adr044-cd-mode", ADR_CD_MODES.indexOf(st.cdMode) >= 0 ? st.cdMode : "blind");
            adrCdSetValueSafe("adr044-cd-depth", String(adrCdDepth()));
            adrCdSetValueSafe("adr044-cd-cooldown", String(adrCdCooldown()));
            var envPair = adrCdEnvelopePair();
            adrCdSetValueSafe("adr044-cd-envelope", envPair.active);
            adrCdSetValueSafe("adr044-cd-envelope-faded", envPair.faded);
            adrCdSetValueSafe("adr044-cd-env-name", adrCdCurrentEnvelopeName());
            adrCdSetValueSafe("adr044-cd-lifemode", adrCdLifeMode());
            adrCdSyncLifeModeNote();
            adrCdSetCheckedSafe("adr044-cd-autodone", !!st.cdAutoDone);
            adrCdRefreshEnvSelect(adrCdCurrentEnvelopeName());
            adrCdRefreshLifePanel();
            adrCdSetValueSafe("adr044-cd-endpoint", st.cdApiEndpoint || "");
            adrCdSetValueSafe("adr044-cd-key", st.cdApiKey || "");
            adrCdSetValueSafe("adr044-cd-model", st.cdModel || "");
            try { adrDRefreshApiProfileSelects("cd"); } catch (eP) {}
            adrCdLoadEditor(undefined);
            adrCdSyncChatControls();
        } catch (e) {}
    }

    // ---- v1.12 生命周期面板 ----

    var ADR_CD_STAGE_LABEL = { active: "必须发生", faded: "已退为背景", done: "已结案" };

    function adrCdRefreshLifePanel() {
        try {
            var state = adrCdChatState();
            var txt;
            if (!state.floatCard) {
                txt = "耳边暂无卡片。";
            } else if (state.floatStage === "done") {
                var lastDone = (state.history || []).slice(-1)[0];
                txt = (lastDone && lastDone.status === "once" ? "只说了一次，已撤下" : "已结案")
                    + "（耳边已空）：" + state.floatCard;
            } else {
                var age = adrDAssistantRoundCount() - Number(state.lastDrawAt);
                if (!Number.isFinite(age) || age < 0) age = 0;
                var lifeMode = adrCdLifeMode();
                var stage = ADR_CD_STAGE_LABEL[state.floatStage] || state.floatStage;
                var tail = "";
                if (state.floatStage === "active") {
                    if (lifeMode === "once") tail = "（只说一次：这一层过完就撤下）";
                    else if (lifeMode === "stay") tail = "（常驻：挂到下一张来换）";
                    else tail = "（再过 " + Math.max(0, adrCdHalfLifeFloors() - age) + " 楼转为背景）";
                }
                txt = "【" + stage + "】挂了 " + age + " 楼" + tail + "\n" + state.floatCard;
            }
            adrCdSetTextAll("adr044-cd-life-card", txt);
            adrCdExpandRenderList(state);

            var list = (state.history || []).slice().reverse();
            var lines = list.map(function (h, i) {
                var mark = h.status === "done" ? "✓ 已兑现"
                    : (h.status === "once" ? "○ 只说了一次，已撤下"
                    : (h.status === "faded" ? "· 已退为背景" : "● 挂载中"));
                return mark + "　第 " + (Number.isFinite(Number(h.floor)) ? h.floor : "?") + " 楼｜"
                    + (h.pool || "?") + "\n　　" + adrCdTruncate(String(h.card || ""), 40);
            });
            adrCdSetTextAll("adr044-cd-life-history", lines.length ? lines.join("\n") : "还没投过卡。");
        } catch (e) {}
    }

    function adrCdEnvStatus(t, c) { adrCdSetTextAll("adr044-cd-env-status", t, c || "#d6b177"); }

    function adrCdApplyEnvelopePreset(name) {
        try {
            var all = adrCdEnvelopes();
            var pair = all[name];
            if (!pair) return;
            save("cdEnvelopeCurrent", name);
            // 切预设＝以预设为准，清掉手改覆盖，避免"改过一次就永远盖住预设"
            save("cdEnvelope", "");
            save("cdEnvelopeFaded", "");
            adrCdSaveSoon();
            adrCdSetValueSafe("adr044-cd-envelope", pair.active || "");
            adrCdSetValueSafe("adr044-cd-envelope-faded", pair.faded || "");
            adrCdSetValueSafe("adr044-cd-env-name", name);
            adrCdRestoreFloat("envelope-switch");
            adrCdEnvStatus("已切换到信封「" + name + "」✓", "#8ed99d");
        } catch (e) {}
    }

    function adrCdSaveEnvelopePreset() {
        try {
            var nameEl = qForm("adr044-cd-env-name");
            var name = nameEl ? String(nameEl.value || "").trim() : "";
            if (!name) { adrCdEnvStatus("请先填写信封预设名", "#d4726a"); return; }
            var a = qForm("adr044-cd-envelope");
            var f = qForm("adr044-cd-envelope-faded");
            var all = adrCdEnvelopes();
            var existed = all[name] !== undefined;
            all[name] = {
                active: a ? String(a.value || "") : ADR_CD_DEFAULT_ENVELOPE,
                faded: f ? String(f.value || "") : ADR_CD_DEFAULT_ENVELOPE_FADED
            };
            save("cdEnvelopes", all);
            save("cdEnvelopeCurrent", name);
            save("cdEnvelope", "");
            save("cdEnvelopeFaded", "");
            saveNow();
            adrCdRefreshEnvSelect(name);
            adrCdRestoreFloat("envelope-save");
            adrCdEnvStatus("信封「" + name + "」" + (existed ? "已更新" : "已新建") + " ✓", "#8ed99d");
        } catch (e) {
            adrCdEnvStatus("保存失败：" + (e && e.message ? e.message : e), "#d4726a");
        }
    }

    function adrCdDeleteEnvelopePreset() {
        try {
            var name = adrCdCurrentEnvelopeName();
            var all = adrCdEnvelopes();
            if (Object.keys(all).length <= 1) { adrCdEnvStatus("至少留一套信封", "#d4726a"); return; }
            delete all[name];
            save("cdEnvelopes", all);
            var next = Object.keys(all)[0];
            save("cdEnvelopeCurrent", next);
            saveNow();
            adrCdRefreshEnvSelect(next);
            adrCdApplyEnvelopePreset(next);
            adrCdEnvStatus("信封「" + name + "」已删除，当前用「" + next + "」", "#d6b177");
        } catch (e) {}
    }

    function adrCdEnvSelectHTML() {
        var names = adrCdEnvelopeNames();
        var sel = adrCdCurrentEnvelopeName();
        var opts = names.map(function (nm) {
            return '<option value="' + esc(nm) + '"' + (nm === sel ? " selected" : "") + '>' + esc(nm) + '</option>';
        }).join("");
        return '<select id="adr044-cd-env-select" data-optsig="' + esc(adrCdOptSig("env", names, sel)) + '">' + opts + '</select>';
    }

    function adrCdRefreshEnvSelect(selectedName) {
        try {
            var names = adrCdEnvelopeNames();
            if (!selectedName || names.indexOf(selectedName) < 0) selectedName = adrCdCurrentEnvelopeName();
            var html = names.map(function (nm) {
                return '<option value="' + esc(nm) + '"' + (nm === selectedName ? " selected" : "") + '>' + esc(nm) + '</option>';
            }).join("");
            var sig = adrCdOptSig("env", names, selectedName);
            Array.prototype.slice.call(rootDoc().querySelectorAll("#adr044-cd-env-select")).forEach(function (el) {
                if (adrCdIsBusyEl(el)) return;
                adrCdFillSelect(el, html, selectedName, sig);
            });
        } catch (e) {}
    }

    // ---- 自检（手机上的控制台替身）----

    function adrCdSelfCheck() {
        var lines = [];
        try {
            var st = settings();
            var state = adrCdChatState();
            lines.push("总开关：" + (adrDMasterEnabled() ? "开" : "关") + "　抽卡：" + (st.cdEnabled ? "开" : "关"));
            var keyReady = false;
            try { keyReady = adrDChatKeyReady(); } catch (eK) {}
            lines.push("聊天档：" + (keyReady ? "已就绪" : "未就绪（换聊后稍等）") + "　服务器侧存档：" + (adrCdMetaRoot() ? "可用" : "不可用（仅本机备份）"));
            ADR_CD_SLOTS.forEach(function (s) {
                var name = adrCdSlotArr(state.slots[s]).join("、");
                var txt = adrCdSlotText(state, s);
                var pools = txt ? adrCdParseLibraryText(txt) : [];
                var cards = 0;
                pools.forEach(function (p) { cards += p.cards.length; });
                lines.push(ADR_CD_SLOT_FULL[s] + "：" + (state.slotOn[s] ? "启用" : "停用")
                    + "　" + (name || "（未选）") + "　" + pools.length + " 池 / " + cards + " 张");
            });
            lines.push("暂停投卡：" + (state.paused ? "是" : "否") + "（此行为回读存档所得，与勾选框一致才算写入成功）");
            var count = adrDAssistantRoundCount();
            lines.push("当前楼层：" + count + "　基准线：" + state.lastDrawAt + "　间隔 N：" + adrCdN());
            var fl = adrCdCurrentFloatLength();
            lines.push("耳机通道：" + (fl < 0 ? "读不到（旧版酒馆）" : (fl > 0 ? "已挂载 " + fl + " 字" : "空（未投卡或已暂停）")));
            lines.push("模式：" + (ADR_CD_MODE_LABEL[st.cdMode] || "盲抽") + "　注入深度：" + adrCdDepth() + "　冷却：" + adrCdCooldown());
            var lastH = ((state.history || []).slice(-1)[0]) || null;
            lines.push("上一张怎么来的：" + (lastH ? String(lastH.mode || "未知") : "（还没投过）")
                + (lastH && String(lastH.mode || "").indexOf("降级") >= 0
                    ? "　⚠ 小眼睛那次没应答，这张是随机给的（降级时 NSFW 已被排除）" : ""));
            lines.push("卡的阶段：" + (state.floatCard ? (ADR_CD_STAGE_LABEL[state.floatStage] || state.floatStage) : "耳边无卡")
                + "　生命节奏：" + ADR_CD_LIFE_MODE_LABEL[adrCdLifeMode()]
                + (adrCdLifeMode() === "half" ? "（" + adrCdHalfLifeFloors() + " 楼）" : "")
                + "　小眼睛兑现判定：" + (st.cdAutoDone ? "开" : "关"));
            lines.push("信封预设：" + adrCdCurrentEnvelopeName() + (String(st.cdEnvelope || "").trim() ? "（已被手改覆盖）" : ""));
            var h = (state.history || []).slice(-1)[0];
            lines.push("最近一张：" + (h ? (h.pool + "｜" + h.card + "（第 " + h.floor + " 楼 · " + h.mode + " · " + (h.status || "live") + "）") : "无"));
        } catch (e) {
            lines.push("自检出错：" + (e && e.message ? e.message : e));
        }
        adrCdSetTextAll("adr044-cd-selfcheck-out", lines.join("\n"), "#d6b177");
    }

    // ---- 按钮动作 ----

    async function adrCdPreviewDraw() {
        try {
            adrCdSetTextAll("adr044-cd-preview-out", "抽取中…", "#8ed99d");
            var r = await adrCdPerformDraw({ preview: true });
            if (r && r.ok) {
                adrCdSetTextAll("adr044-cd-preview-out", "【" + r.pool + "】" + r.card + "\n（仅预览，不入投卡史、不注入）", "#d6b177");
            } else {
                adrCdSetTextAll("adr044-cd-preview-out", "试抽失败：" + ((r && r.reason) || "未知"), "#d4726a");
            }
        } catch (e) {
            adrCdSetTextAll("adr044-cd-preview-out", "试抽失败：" + (e && e.message ? e.message : e), "#d4726a");
        }
    }

    function adrCdLibStatus(text, color) { adrCdSetTextAll("adr044-cd-lib-status", text, color || "#d6b177"); }

    function adrCdEditingName() {
        var el = qForm("adr044-cd-edit-select");
        return el ? String(el.value || "") : "";
    }

    // v1.17.2：查一副库当前挂在哪个槽（没挂返回 ""）

    function adrCdSaveLibraryFromEditor() {
        try {
            var nameEl = qForm("adr044-cd-lib-name");
            var edEl = qForm("adr044-cd-lib-editor");
            var name = nameEl ? String(nameEl.value || "").trim() : "";
            if (!name) { adrCdLibStatus("请先填写卡库名", "#d4726a"); return; }
            var libs = adrCdLibraries();
            var existed = libs[name] !== undefined;
            libs[name] = edEl ? String(edEl.value || "") : "";
            save("cdLibraries", libs);

            // v1.17.2：落点对保存同样生效。用户的自然直觉就是"选好落点→保存＝挂载"，
            // 工具应该迎合直觉而不是让人背规则。已挂在某槽的库保持原位，绝不搬家。
            var state = adrCdChatState();
            var tail;
            var dest = adrCdImportSlot();
            var home = adrCdLibHome(name);
            if (dest) {
                var moved = home && home !== dest;
                adrCdSetLibHome(name, dest);
                var arrSave = adrCdSlotArr(state.slots[dest]);
                if (arrSave.indexOf(name) < 0) arrSave.push(name);
                state.slots[dest] = arrSave;
                state.slotOn[dest] = true;
                adrCdSaveChatState(state); // 归属对账会自动把旧箱里的点亮项摘下
                tail = moved
                    ? "　已从" + ADR_CD_SLOT_FULL[home] + "搬进" + ADR_CD_SLOT_FULL[dest] + "并点亮 ✓"
                    : "　已放进" + ADR_CD_SLOT_FULL[dest] + "并点亮 ✓";
            } else if (home) {
                var inUse = adrCdSlotArr(state.slots[home]).indexOf(name) >= 0;
                tail = "　（住在" + ADR_CD_SLOT_FULL[home] + "，" + (inUse ? "使用中，即改即生效" : "未点亮") + "）";
            } else {
                tail = "　（未分箱：三格里都可见，点亮或选个落点再保存即可入箱）";
            }

            saveNow();
            adrCdRefreshEditSelect(name);
            adrCdRefreshSlotSelects(true);
            adrCdUpdateStatusLine();
            adrCdLibStatus("卡库「" + name + "」" + (existed ? "已更新" : "已新建") + " ✓" + tail, "#8ed99d");
        } catch (e) {
            adrCdLibStatus("保存失败：" + (e && e.message ? e.message : e), "#d4726a");
        }
    }

    function adrCdRenameLibrary() {
        try {
            var oldName = adrCdEditingName();
            var nameEl = qForm("adr044-cd-lib-name");
            var newName = nameEl ? String(nameEl.value || "").trim() : "";
            if (!oldName) { adrCdLibStatus("没有可重命名的卡库", "#d4726a"); return; }
            if (!newName) { adrCdLibStatus("请先在名字框填写新名字", "#d4726a"); return; }
            if (newName === oldName) { adrCdLibStatus("名字没变", "#d6b177"); return; }
            var libs = adrCdLibraries();
            if (libs[newName] !== undefined) { adrCdLibStatus("已存在同名卡库「" + newName + "」，换个名字", "#d4726a"); return; }
            libs[newName] = libs[oldName];
            delete libs[oldName];
            save("cdLibraries", libs);
            // 三个仓库槽里引用了旧名的，跟着改名（聊天级 + 账号级默认）
            var state = adrCdChatState();
            ADR_CD_SLOTS.forEach(function (s) {
                state.slots[s] = adrCdSlotArr(state.slots[s]).map(function (nm) { return nm === oldName ? newName : nm; });
            });
            adrCdSaveChatState(state);
            var defs = adrCdSlotDefaults();
            ADR_CD_SLOTS.forEach(function (s) {
                defs[s] = adrCdSlotArr(defs[s]).map(function (nm) { return nm === oldName ? newName : nm; });
            });
            save("cdSlotDefaults", defs);
            var homeRn = adrCdLibHome(oldName);
            adrCdSetLibHome(oldName, "");
            if (homeRn) adrCdSetLibHome(newName, homeRn); // 归属随新名迁移
            saveNow();
            adrCdRefreshEditSelect(newName);
            adrCdRefreshSlotSelects(true);
            adrCdUpdateStatusLine();
            adrCdLibStatus("已重命名：「" + oldName + "」→「" + newName + "」✓（引用它的仓库已同步）", "#8ed99d");
        } catch (e) {
            adrCdLibStatus("重命名失败：" + (e && e.message ? e.message : e), "#d4726a");
        }
    }

    function adrCdDeleteLibrary() {
        try {
            var name = adrCdEditingName();
            if (!name) { adrCdLibStatus("没有可删除的卡库", "#d4726a"); return; }
            var libs = adrCdLibraries();
            delete libs[name];
            save("cdLibraries", libs);
            adrCdSetLibHome(name, ""); // 库没了，户口注销
            var state = adrCdChatState();
            var freed = [];
            ADR_CD_SLOTS.forEach(function (s) {
                var arrDel = adrCdSlotArr(state.slots[s]);
                if (arrDel.indexOf(name) >= 0) {
                    state.slots[s] = arrDel.filter(function (nm) { return nm !== name; });
                    freed.push(ADR_CD_SLOT_FULL[s]);
                } else {
                    state.slots[s] = arrDel;
                }
            });
            adrCdSaveChatState(state);
            saveNow();
            var rest = adrCdLibNames();
            adrCdLoadEditor(rest[0] || "");
            adrCdRefreshSlotSelects(true);
            adrCdUpdateStatusLine();
            var tail = freed.length ? "；已从 " + freed.join("、") + " 摘下" : "";
            adrCdLibStatus("卡库「" + name + "」已删除" + tail
                + (rest.length ? "" : "。已无任何卡库，保存一副新的即可（出厂示例会在下次读取时补回）"), "#d6b177");
        } catch (e) {
            adrCdLibStatus("删除失败：" + (e && e.message ? e.message : e), "#d4726a");
        }
    }

    function adrCdRequestDeleteLibrary(btn) {
        try {
            adrDTwoStepConfirm(
                "cd-lib-delete",
                btn || qForm("adr044-cd-lib-delete"),
                "再点一次确认删除",
                "将删除正在编辑的这副卡库（不可恢复，建议先导出）",
                function (t) { adrCdLibStatus(t, "#d6b177"); },
                function () { adrCdDeleteLibrary(); }
            );
        } catch (e) {
            try { if (rootWin().confirm("确认删除这副卡库？建议先导出。")) adrCdDeleteLibrary(); } catch (e2) {}
        }
    }

    function adrCdExportLibrary() {
        try {
            var name = adrCdEditingName();
            if (!name) { adrCdLibStatus("没有可导出的卡库", "#d4726a"); return; }
            var text = adrCdLibraries()[name] || "";
            var d = rootDoc();
            var blob = new Blob([text], { type: "text/plain;charset=utf-8" });
            var a = d.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.download = name + ".txt";
            (d.body || d.documentElement).appendChild(a);
            a.click();
            setTimeout(function () {
                try { URL.revokeObjectURL(a.href); } catch (e1) {}
                try { if (a.parentNode) a.parentNode.removeChild(a); } catch (e2) {}
            }, 1200);
            adrCdLibStatus("卡库「" + name + "」已导出为 .txt ✓", "#8ed99d");
        } catch (e) {
            adrCdLibStatus("导出失败：" + (e && e.message ? e.message : e), "#d4726a");
        }
    }

    function adrCdTriggerImport() {
        var f = qForm("adr044-cd-import-file");
        if (f) { try { f.value = ""; } catch (e0) {} f.click(); }
    }

    // v1.17.1：导入落点账号级持久化。iOS 跳文件 App 往返会重绘面板，
    // 裸 DOM 下拉会被复位成默认值，导入挂载步骤当场落空；改为存档为准、DOM 只是回显。
    function adrCdImportSlot() {
        var v = String(settings().cdImportSlot || "");
        return ADR_CD_SLOTS.indexOf(v) >= 0 ? v : "";
    }

    function adrCdImportSlotSelectHTML() {
        var cur = adrCdImportSlot();
        var opts = [["", "只存进卡库，不挂仓库"], ["story", "挂进专属剧情库"], ["common", "挂进通用库"], ["nsfw", "挂进 NSFW 库"]];
        return '<select id="adr044-cd-import-slot">'
            + opts.map(function (o) {
                return '<option value="' + o[0] + '"' + (o[0] === cur ? " selected" : "") + '>' + o[1] + '</option>';
            }).join("")
            + '</select>';
    }

    function adrCdHandleImportFile(fileInput) {
        try {
            var file = fileInput && fileInput.files && fileInput.files[0];
            if (!file) return;
            var reader = new FileReader();
            reader.onload = function () {
                try {
                    var text = String(reader.result || "");
                    var name = String(file.name || "导入卡库").replace(/\.(txt|md)$/i, "").trim() || "导入卡库";
                    var libs = adrCdLibraries();
                    var base = name;
                    var i = 2;
                    while (libs[name] !== undefined) { name = base + " " + i; i++; } // 不覆盖同名，另开一副
                    libs[name] = text;
                    save("cdLibraries", libs);

                    // 导入落点：读账号级存档，不读 DOM——面板重绘/双面板不同步都影响不到它
                    var slot = adrCdImportSlot();
                    var tail = "";
                    if (ADR_CD_SLOTS.indexOf(slot) >= 0) {
                        adrCdSetLibHome(name, slot);
                        var state = adrCdChatState();
                        var arrImp = adrCdSlotArr(state.slots[slot]);
                        if (arrImp.indexOf(name) < 0) arrImp.push(name);
                        state.slots[slot] = arrImp;
                        state.slotOn[slot] = true;
                        adrCdSaveChatState(state);
                        tail = "，已放进" + ADR_CD_SLOT_FULL[slot] + "并点亮";
                    }
                    saveNow();
                    adrCdLoadEditor(name);
                    adrCdRefreshSlotSelects(true);
                    adrCdUpdateStatusLine();
                    var pools = adrCdParseLibraryText(text);
                    var cards = 0;
                    pools.forEach(function (p) { cards += p.cards.length; });
                    adrCdLibStatus("已导入「" + name + "」：" + pools.length + " 池 / " + cards + " 张 ✓" + tail, "#8ed99d");
                } catch (eIn) {
                    adrCdLibStatus("导入失败：" + (eIn && eIn.message ? eIn.message : eIn), "#d4726a");
                }
            };
            reader.onerror = function () { adrCdLibStatus("导入失败：文件读取错误", "#d4726a"); };
            reader.readAsText(file);
        } catch (e) {}
    }

    // 暂停：写入后回读校验，结果如实告诉住户（手机上没控制台，成败必须肉眼可见）
    function adrCdSlotStatus(t, c) { adrCdSetTextAll("adr044-cd-slot-status", t, c || "#d6b177"); }

    // v1.20.0：点亮/熄灭改成"写完回读"。沿用暂停投卡那套经过验证的做法——
    // 写不进这个聊天的存档时自动重试一次，再不行就明说，
    // 而不是让人对着一张没反应的芯片连点三下。
    function adrCdToggleChip(slot, nm, retry) {
        try {
            if (!nm) return;
            var state = adrCdChatState();
            var arr = adrCdSlotArr(state.slots[slot]);
            var idx = arr.indexOf(nm);
            var want = idx < 0;
            if (idx >= 0) {
                arr.splice(idx, 1); // 熄灭＝这局不用了；归属不动，它还住这个箱
            } else {
                arr.push(nm);
                if (!adrCdLibHome(nm)) adrCdSetLibHome(nm, slot); // 未分箱库点亮即认箱
            }
            state.slots[slot] = arr;
            if (arr.length) state.slotOn[slot] = true;
            adrCdSaveChatState(state);
            var defs = adrCdSlotDefaults();
            defs[slot] = arr.slice();
            save("cdSlotDefaults", defs);
            adrCdSaveSoon();
            adrCdRefreshSlotSelects(true);
            adrCdUpdateStatusLine();

            var back = adrCdSlotArr(adrCdChatState().slots[slot]);
            if ((back.indexOf(nm) >= 0) === want) {
                adrCdSlotStatus(want
                    ? "「" + nm + "」已点亮 ✓"
                    : "「" + nm + "」已熄灭 ✓（仍住在" + ADR_CD_SLOT_FULL[slot] + "，没被流放）", "#8ed99d");
            } else if (!retry) {
                adrCdSlotStatus("存档尚未就绪，正在重试…", "#d6b177");
                setTimeout(function () { adrCdToggleChip(slot, nm, true); }, 1200);
            } else {
                adrCdSlotStatus("这一下没能存进当前聊天，请退出聊天再进来重试", "#d4726a");
                adrCdRefreshSlotSelects(true);
            }
        } catch (e) {}
    }

    function adrCdSetSlotOn(slot, want, retry) {
        try {
            want = !!want;
            var state = adrCdChatState();
            state.slotOn[slot] = want;
            adrCdSaveChatState(state);
            var defsOn = adrCdSlotOnDefaults();
            defsOn[slot] = want;
            save("cdSlotOnDefaults", defsOn);
            adrCdSaveSoon();
            adrCdUpdateStatusLine();

            var back = adrCdChatState();
            if (back.slotOn[slot] === want) {
                adrCdSlotStatus(ADR_CD_SLOT_FULL[slot] + (want ? " 这局启用 ✓" : " 这局不用 ✓"), "#8ed99d");
            } else if (!retry) {
                adrCdSlotStatus("存档尚未就绪，正在重试…", "#d6b177");
                setTimeout(function () { adrCdSetSlotOn(slot, want, true); }, 1200);
            } else {
                adrCdSlotStatus("这一下没能存进当前聊天，请退出聊天再进来重试", "#d4726a");
                adrCdSetCheckedSafe("adr044-cd-slot-on-" + slot, back.slotOn[slot]);
            }
        } catch (e) {}
    }

    function adrCdSetPaused(flag, retry) {
        try {
            var want = !!flag;
            var state = adrCdChatState();
            state.paused = want;
            adrCdSaveChatState(state);
            adrCdApplyFloat(want ? "" : (state.floatText || ""));

            var back = adrCdChatState();
            if (back.paused === want) {
                adrCdSetTextAll("adr044-cd-pause-status",
                    want ? "已暂停：不再投新卡，当前卡也已从耳边取下 ✓" : "已恢复投卡 ✓", "#8ed99d");
            } else if (!retry) {
                adrCdSetTextAll("adr044-cd-pause-status", "存档尚未就绪，正在重试…", "#d6b177");
                setTimeout(function () { adrCdSetPaused(want, true); }, 1200);
            } else {
                adrCdSetTextAll("adr044-cd-pause-status", "暂停状态没能存进这个聊天，请退出聊天再进来重试", "#d4726a");
                adrCdSetCheckedSafe("adr044-cd-paused", back.paused);
            }
            adrCdUpdateStatusLine();
        } catch (e) {}
    }

    function adrCdHandleButtonId(id, btn) {
        if (id === "adr044-tab-cd") { switchTab("cd"); return true; }
        if (id === "adr044-cd-preview-draw") { adrCdPreviewDraw(); return true; }
        if (id === "adr044-cd-selfcheck") { adrCdSelfCheck(); return true; }
        if (id === "adr044-cd-close-card") { adrCdCloseCard("手动", false); return true; }
        if (id === "adr044-cd-env-save") { adrCdSaveEnvelopePreset(); return true; }
        if (id === "adr044-cd-env-delete") { adrCdDeleteEnvelopePreset(); return true; }
        if (id === "adr044-cd-status-line") { adrCdToggleStatusExpand(); return true; }
        if (id === "adr044-cd-lib-save") { adrCdSaveLibraryFromEditor(); return true; }
        if (id === "adr044-cd-lib-rename") { adrCdRenameLibrary(); return true; }
        if (id === "adr044-cd-lib-delete") { adrCdRequestDeleteLibrary(btn); return true; }
        if (id === "adr044-cd-export") { adrCdExportLibrary(); return true; }
        if (id === "adr044-cd-import") { adrCdTriggerImport(); return true; }
        if (id === "adr044-cd-expand-next") { adrCdExpandNext(); return true; }
        if (id === "adr044-cd-expand-prev") { adrCdExpandPrev(); return true; }
        if (id === "adr044-cd-expand-stop") { adrCdExpandStop(); return true; }
        if (id === "adr044-cd-load-models") { loadModels("cd"); return true; }
        if (id === "adr044-cd-test") { adrCdTestConnection(); return true; }
        if (id === "adr044-cd-save") { syncType("cd"); status("cd", "已保存当前使用的择池 API ✓", "#8ed99d"); return true; }
        return false;
    }

    // 测试连接：真发一次最小请求，成败与耗时直接写在面板上
    async function adrCdTestConnection() {
        try {
            syncType("cd");
            var st = settings();
            if (!st.cdApiEndpoint) { status("cd", "请先填写 API 地址", "#d4726a"); return; }
            var url = chatUrl(st.cdApiEndpoint);
            if (!url) { status("cd", "API 地址无效", "#d4726a"); return; }
            if (!st.cdModel) { status("cd", "请先填写或加载一个模型", "#d4726a"); return; }
            status("cd", "正在测试连接…", "#8ed99d");
            var t0 = Date.now();
            var headers = { "Content-Type": "application/json" };
            adrDAuthHeaders(headers, st.cdApiKey, url);
            var res = await fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify({
                    model: st.cdModel,
                    messages: [{ role: "user", content: "回复两个字：在的" }],
                    max_tokens: ADR_CD_REPLY_TOKENS,
                    stream: false
                })
            });
            var raw = await res.text();
            if (!res.ok) { status("cd", "连接失败 " + res.status + "：" + String(raw || "").slice(0, 120), "#d4726a"); return; }
            var data;
            try { data = JSON.parse(raw); } catch (eJ) { status("cd", "返回非 JSON，接口可能不兼容", "#d4726a"); return; }
            var out = "";
            try { out = parseResponse(data); } catch (eP) {}
            status("cd", "连接正常 ✓ 耗时 " + (Date.now() - t0) + "ms　模型回话：" + adrCdTruncate(out, 20), "#8ed99d");
        } catch (e) {
            status("cd", "连接失败：" + (e && e.message ? e.message : e), "#d4726a");
        }
    }

    // ---- 控件绑定（幂等）----

    var adrCdEditorDebounce = null;

    function adrCdBindControls() {
        try {
            function each(id, fn) {
                Array.prototype.slice.call(rootDoc().querySelectorAll("#" + id)).forEach(function (el) {
                    if (!el || el.__adrCdBound) return;
                    el.__adrCdBound = true;
                    fn(el);
                });
            }
            // v1.20.0：勾选框只上"按下即 1.5s 短锁"，不上打字锁。
            // guard() 的 focus 锁一旦挂到勾选框上，它拿到焦点后就再也刷不动了。
            function tapLock(el) {
                ["pointerdown", "touchstart", "mousedown"].forEach(function (evt) {
                    el.addEventListener(evt, function () { adrCdTouch(el); }, { passive: true });
                });
            }

            // 打字保护：聚焦即上锁，失焦 400ms 后解锁，期间任何刷新都不覆盖它
            function guard(el) {
                var isSelect = String(el.tagName || "").toLowerCase() === "select";
                el.addEventListener("focus", function () { el.__adrCdTyping = true; });
                el.addEventListener("blur", function () {
                    el.__adrCdPickerOpenAt = 0;
                    setTimeout(function () { el.__adrCdTyping = false; }, 400);
                });
                // v1.20.0：下拉按下即长免疫，落定后交还给 1.5s 短窗口。
                // 这一段 change 早于业务 change 注册，先解锁再让业务处理器重新上短锁。
                if (isSelect) {
                    el.addEventListener("change", function () {
                        adrCdTouch(el);
                        el.__adrCdPickerOpenAt = 0;
                    });
                }
                // v1.11.2：手指按下就上锁。原生下拉是在按下那一刻弹出的，
                // 等到 change 再上锁已经晚了半拍，中间的刷新会把选择器掐掉。
                ["pointerdown", "touchstart", "mousedown"].forEach(function (evt) {
                    el.addEventListener(evt, function () {
                        adrCdTouch(el);
                        if (isSelect) el.__adrCdPickerOpenAt = Date.now();
                    }, { passive: true });
                });
            }

            each("adr044-cd-enabled", function (el) {
                el.addEventListener("change", function () {
                    adrCdTouch(el);
                    save("cdEnabled", !!el.checked);
                    adrCdSaveSoon();
                    if (el.checked) adrCdRestoreFloat("toggle-cd-on");
                    else adrCdApplyFloat("");
                    adrCdUpdateStatusLine();
                });
            });

            each("adr044-cd-n", function (el) {
                el.addEventListener("input", function () {
                    save("cdN", Number(el.value) || 5);
                    adrCdSetTextAll("adr044-cd-n-val", String(adrCdN()));
                    adrCdSyncLifeModeNote();
                    adrCdUpdateStatusLine();
                });
                el.addEventListener("change", function () { saveNow(); });
            });

            each("adr044-cd-mode", function (el) {
                guard(el);
                el.addEventListener("change", function () {
                    adrCdTouch(el);
                    save("cdMode", ADR_CD_MODES.indexOf(el.value) >= 0 ? el.value : "blind");
                    adrCdSaveSoon();
                    adrCdUpdateStatusLine();
                });
            });

            each("adr044-cd-paused", function (el) {
                // 与启用/仓库开关相同：触摸先上锁，避免共享设置刷新在 change 前拨回旧值。
                tapLock(el);
                el.addEventListener("change", function () {
                    adrCdTouch(el);
                    adrCdSetPaused(!!el.checked, false);
                });
            });

            ADR_CD_SLOTS.forEach(function (slot) {
                each("adr044-cd-slot-" + slot, function (el) {
                    // v1.17.0：芯片点击委托挂容器上，innerHTML 重绘不掉监听
                    function chipNameFrom(node) {
                        var t = node;
                        while (t && t !== el) {
                            if (t.getAttribute && t.getAttribute("data-adrcd-lib") != null) {
                                return t.getAttribute("data-adrcd-lib") || "";
                            }
                            t = t.parentNode;
                        }
                        return "";
                    }
                    // v1.20.0：按下那一刻就记住手指落在哪张芯片上。
                    // 万一这一行在按下与 click 之间被重画，click 的 target 会退到容器、
                    // 名字取不到，整下点击白丢；这时用按下时记住的名字兜底。
                    ["pointerdown", "touchstart", "mousedown"].forEach(function (evt) {
                        el.addEventListener(evt, function (ev) {
                            adrCdTouch(el);
                            el.__adrCdPendingChip = chipNameFrom(ev && ev.target);
                        }, { passive: true });
                    });
                    el.addEventListener("click", function (ev) {
                        var nm = chipNameFrom(ev && ev.target) || String(el.__adrCdPendingChip || "");
                        el.__adrCdPendingChip = "";
                        if (!nm) return;
                        adrCdToggleChip(slot, nm, false);
                    });
                });
                each("adr044-cd-slot-on-" + slot, function (el) {
                    // v1.20.0：补上按下即上锁——此前这三个开关是本页唯一没有这层保护的勾选框，
                    // 后台刷新落在手指抬起之前就会把它拨回去。
                    tapLock(el);
                    el.addEventListener("change", function () {
                        adrCdTouch(el);
                        adrCdSetSlotOn(slot, !!el.checked, false);
                    });
                });
            });

            each("adr044-cd-depth", function (el) {
                guard(el);
                el.addEventListener("change", function () {
                    save("cdDepth", Number(el.value));
                    saveNow();
                    adrCdRestoreFloat("depth-change");
                });
            });
            each("adr044-cd-cooldown", function (el) {
                guard(el);
                el.addEventListener("change", function () { save("cdCooldown", Number(el.value)); saveNow(); });
            });
            each("adr044-cd-envelope", function (el) {
                guard(el);
                el.addEventListener("change", function () {
                    save("cdEnvelope", String(el.value || ""));
                    saveNow();
                    adrCdRestoreFloat("envelope-edit");
                    adrCdEnvStatus("已改用手写信封（切换预设可还原）", "#d6b177");
                });
            });
            each("adr044-cd-envelope-faded", function (el) {
                guard(el);
                el.addEventListener("change", function () {
                    save("cdEnvelopeFaded", String(el.value || ""));
                    saveNow();
                    adrCdRestoreFloat("envelope-faded-edit");
                });
            });
            each("adr044-cd-env-name", function (el) { guard(el); });
            each("adr044-cd-env-select", function (el) {
                guard(el);
                el.addEventListener("change", function () {
                    adrCdTouch(el);
                    adrCdApplyEnvelopePreset(String(el.value || ""));
                });
            });
            each("adr044-cd-lifemode", function (el) {
                guard(el);
                el.addEventListener("change", function () {
                    adrCdTouch(el);
                    adrCdSetLifeMode(String(el.value || ""));
                    adrCdSaveSoon();
                    adrCdSyncLifeModeNote();
                    adrCdRefreshLifePanel();
                    adrCdUpdateStatusLine();
                });
            });
            each("adr044-cd-autodone", function (el) {
                el.addEventListener("change", function () {
                    adrCdTouch(el);
                    save("cdAutoDone", !!el.checked);
                    adrCdSaveSoon();
                });
            });
            each("adr044-cd-endpoint", function (el) {
                guard(el);
                el.addEventListener("change", function () { save("cdApiEndpoint", String(el.value || "").trim()); saveNow(); });
            });
            // v1.34.1 分幕列表：委托挂容器上，innerHTML 重画不掉监听
            each("adr044-cd-expand-panel", function (el) {
                function idxOf(t) { var v = t && t.getAttribute ? t.getAttribute("data-idx") : null; var n = Number(v); return Number.isFinite(n) ? n : -1; }
                function fieldOf(t) {
                    if (!t || !t.classList) return "";
                    if (t.classList.contains("adr044-cd-step-text")) return "text";
                    if (t.classList.contains("adr044-cd-step-name")) return "name";
                    return "";
                }
                el.addEventListener("input", function (ev) {
                    var f = fieldOf(ev.target); if (!f) return;
                    adrCdExpandEditStep(idxOf(ev.target), f, ev.target.value, false);
                });
                el.addEventListener("change", function (ev) {
                    var f = fieldOf(ev.target); if (!f) return;
                    adrCdExpandEditStep(idxOf(ev.target), f, ev.target.value, true);
                });
                el.addEventListener("click", function (ev) {
                    var t = ev.target;
                    while (t && t !== el && !(t.classList && t.classList.contains("adr044-cd-step-btn"))) t = t.parentNode;
                    if (!t || t === el) return;
                    try { ev.preventDefault(); ev.stopPropagation(); } catch (e0) {}
                    adrCdExpandStepAction(t.getAttribute("data-act"), idxOf(t));
                });
            });
            each("adr044-cd-expand-enabled", function (el) {
                tapLock(el);
                el.addEventListener("change", function () { adrCdTouch(el); save("cdExpandEnabled", !!el.checked); saveNow(); adrCdUpdateStatusLine(); });
            });
            each("adr044-cd-expand-nsfw", function (el) {
                tapLock(el);
                el.addEventListener("change", function () { adrCdTouch(el); save("cdExpandNsfw", !!el.checked); saveNow(); });
            });
            each("adr044-cd-expand-n", function (el) {
                guard(el);
                el.addEventListener("change", function () { save("cdExpandN", Number(el.value)); var vN = adrCdExpandN(); save("cdExpandN", vN); el.value = String(vN); saveNow(); });
            });
            each("adr044-cd-expand-temp", function (el) {
                guard(el);
                el.addEventListener("change", function () { save("cdExpandTemp", Number(el.value)); var vT = adrCdExpandTemp(); save("cdExpandTemp", vT); el.value = String(vT); saveNow(); });
            });
            each("adr044-cd-expand-per", function (el) {
                guard(el);
                el.addEventListener("change", function () { save("cdExpandPer", Number(el.value)); var vP = adrCdExpandPer(); save("cdExpandPer", vP); el.value = String(vP); saveNow(); });
            });
            each("adr044-expand-endpoint", function (el) {
                guard(el);
                el.addEventListener("change", function () { save("expandApiEndpoint", String(el.value || "").trim()); saveNow(); });
            });
            each("adr044-expand-key", function (el) {
                guard(el);
                el.addEventListener("change", function () { save("expandApiKey", String(el.value || "").trim()); saveNow(); });
            });
            each("adr044-expand-model", function (el) {
                guard(el);
                el.addEventListener("change", function () { save("expandModel", String(el.value || "").trim()); saveNow(); });
            });
            each("adr044-expand-model-select", function (el) {
                guard(el);
                el.addEventListener("change", function () {
                    adrCdTouch(el);
                    if (!el.value) return;
                    adrCdSetValueSafe("adr044-expand-model", el.value);
                    save("expandModel", String(el.value));
                    adrCdSaveSoon();
                });
            });
            each("adr044-expand-preset", function (el) {
                guard(el);
                el.addEventListener("change", function () { save("expandPreset", String(el.value || "")); saveNow(); });
            });
            each("adr044-cd-key", function (el) {
                guard(el);
                el.addEventListener("change", function () { save("cdApiKey", String(el.value || "").trim()); saveNow(); });
            });
            each("adr044-cd-model", function (el) {
                guard(el);
                el.addEventListener("change", function () { save("cdModel", String(el.value || "").trim()); saveNow(); });
            });
            each("adr044-cd-model-select", function (el) {
                guard(el);
                el.addEventListener("change", function () {
                    adrCdTouch(el);
                    if (!el.value) return;
                    adrCdSetValueSafe("adr044-cd-model", el.value);
                    save("cdModel", String(el.value));
                    adrCdSaveSoon();
                });
            });

            each("adr044-api-profile-select-cd", function (el) {
                el.addEventListener("change", function () {
                    try { adrDApplyApiProfile("cd"); } catch (eAp) {}
                });
            });
            each("adr044-api-profile-name-cd", function (el) { guard(el); });

            each("adr044-cd-edit-select", function (el) {
                guard(el);
                el.addEventListener("change", function () {
                    adrCdTouch(el);
                    adrCdLoadEditor(String(el.value || ""));
                });
            });
            each("adr044-cd-lib-name", function (el) { guard(el); });
            each("adr044-cd-lib-editor", function (el) {
                guard(el);
                el.addEventListener("input", function () {
                    // 即改即生效：600ms 防抖写回正在编辑的那副库
                    if (adrCdEditorDebounce) clearTimeout(adrCdEditorDebounce);
                    adrCdEditorDebounce = setTimeout(function () {
                        try {
                            var name = adrCdEditingName();
                            if (!name) return;
                            var libs = adrCdLibraries();
                            libs[name] = String(el.value || "");
                            save("cdLibraries", libs);
                            adrCdRefreshSlotSelects();
                        } catch (eEd) {}
                    }, 600);
                });
                el.addEventListener("change", function () { saveNow(); });
            });
            each("adr044-cd-import-slot", function (el) {
                guard(el);
                el.addEventListener("change", function () {
                    adrCdTouch(el);
                    save("cdImportSlot", String(el.value || ""));
                    adrCdSaveSoon();
                });
            });
            each("adr044-cd-import-file", function (el) {
                el.addEventListener("change", function () { adrCdHandleImportFile(el); });
            });
            each("adr044-cd-status-line", function (el) {
                el.addEventListener("click", function () { adrCdToggleStatusExpand(); });
            });
        } catch (e) {
            try { console.warn("[抽卡小能手] 控件绑定失败", e); } catch (e2) {}
        }
    }

    // ---- 面板页（抽屉版 adr044 / 浮窗版 adr048 共用一套 id）----

    // v1.18.0：芯片按归属显示。住本箱的库（亮=使用中，灰=在箱未用）+ 未分箱的库（虚线，点亮即认箱）。
    // 住别人家箱子的库根本不出现——箱子的物理直觉：一件东西只在一个抽屉里。
    function adrCdSlotChipsHTML(slot, state) {
        var names = adrCdLibNames();
        var mine = adrCdSlotArr(state.slots[slot]);
        var shown = names.filter(function (nm) {
            var home = adrCdLibHome(nm);
            return !home || home === slot;
        });
        if (!shown.length) return '<div class="adr044-cd-chip-empty">这个箱子还是空的：把落点指到这里保存/导入，或点亮一副未分箱（虚线）的库</div>';
        return shown.map(function (nm) {
            var on = mine.indexOf(nm) >= 0;
            var stray = !adrCdLibHome(nm);
            return '<button type="button" class="adr044-cd-chip' + (on ? " on" : "") + (stray ? " stray" : "") + '" data-adrcd-lib="' + esc(nm) + '"' + (stray ? ' title="未分箱：点亮即认这个箱为家"' : "") + '>' + esc(nm) + '</button>';
        }).join("");
    }

    function adrCdSlotChipsSig(slot, state) {
        var homes;
        try { homes = JSON.stringify(adrCdLibHomes()); } catch (eH) { homes = ""; }
        return adrCdOptSig("chips-" + slot, adrCdLibNames(), JSON.stringify(state.slots || {}) + "|" + homes);
    }

    function adrCdSlotRowHTML(slot, checkClass) {
        var state = adrCdChatState();
        return '<div class="adr044-cd-slot-row">'
            + '<label class="' + checkClass + ' adr044-cd-slot-head">'
            + '<input type="checkbox" id="adr044-cd-slot-on-' + slot + '"' + (state.slotOn[slot] ? " checked" : "") + '> '
            + ADR_CD_SLOT_FULL[slot]
            + ' <span class="adr044-cd-slot-count" id="adr044-cd-slot-count-' + slot + '"></span></label>'
            + '<div class="adr044-cd-chiprow" id="adr044-cd-slot-' + slot + '" data-optsig="' + esc(adrCdSlotChipsSig(slot, state)) + '">' + adrCdSlotChipsHTML(slot, state) + '</div>'
            + '</div>';
    }

    function adrCdEditSelectHTML() {
        var names = adrCdLibNames();
        var sel = names[0] || "";
        var opts = names.map(function (nm) {
            return '<option value="' + esc(nm) + '"' + (nm === sel ? " selected" : "") + '>' + esc(nm) + '</option>';
        }).join("");
        return '<select id="adr044-cd-edit-select" data-optsig="' + esc(adrCdOptSig("edit", names, sel)) + '">' + opts + '</select>';
    }

    function adrCdPageInnerHTML(secOpen, secClose, checkClass, actionsClass) {
        var st = settings();
        var noteClass = checkClass === "adr048-check" ? "adr048-note" : "adr044-note";
        var mode = ADR_CD_MODES.indexOf(st.cdMode) >= 0 ? st.cdMode : "blind";
        var lifeMode = adrCdLifeMode();
        return secOpen("剧情小风铃 🎐", false, "controls")
            + '<label class="' + checkClass + '"><input type="checkbox" id="adr044-cd-enabled"' + (st.cdEnabled ? " checked" : "") + '> 启用剧情小风铃</label>'
            + '<div class="' + actionsClass + '"><button id="adr044-cd-preview-draw" type="button">试抽一张（仅预览）</button><button id="adr044-cd-selfcheck" type="button">🔧 自检</button></div>'
            + '<div class="adr044-cd-preview-out" id="adr044-cd-preview-out"></div>'
            + '<div class="adr044-cd-preview-out" id="adr044-cd-selfcheck-out"></div>'
            + '<label>投卡间隔 N（每 N 个助手正文轮次投一张）：<b id="adr044-cd-n-val">' + esc(String(adrCdN())) + '</b> 楼</label>'
            + '<input type="range" id="adr044-cd-n" min="1" max="20" step="1" value="' + esc(String(adrCdN())) + '">'
            + '<label>抽卡模式</label>'
            + '<select id="adr044-cd-mode">'
            + opt(mode, "blind", "盲抽（零 API · 天马行空档）")
            + opt(mode, "pick", "择池（小眼睛只看池名点池，池内仍盲抽）")
            + opt(mode, "pickcard", "择卡（小眼睛看得见卡面，从几张候选里挑一张）")
            + '</select>'
            + '<label class="' + checkClass + '"><input type="checkbox" id="adr044-cd-paused"> 暂停投卡（只停这个聊天；关键场景不打扰）</label>'
            + '<div class="adr044-template-status" id="adr044-cd-pause-status"></div>'
            + secClose()

            + secOpen("耳边这张卡", false, "current")
            + '<div class="adr044-cd-life-card" id="adr044-cd-life-card">耳边暂无卡片。</div>'
            + '<div class="adr044-cd-preview-out" id="adr044-cd-expand-panel"></div>'
            + '<div class="' + actionsClass + '"><button id="adr044-cd-close-card" type="button">✓ 这张已兑现，撤下</button><button id="adr044-cd-expand-prev" type="button">◀ 上一幕</button><button id="adr044-cd-expand-next" type="button">下一幕 ▶</button><button id="adr044-cd-expand-stop" type="button">撤下这条线</button></div>'
            + '<div class="adr044-template-status" id="adr044-cd-life-status">读到卡里的事已经落地了，点一下撤下它。下一张仍按原节奏来，中间那几楼留白，让剧情喘口气。</div>'
            + '<label>这张卡在耳边待多久</label>'
            + '<select id="adr044-cd-lifemode">'
            + opt(lifeMode, "half", "半衰期：挂过一半楼数退为背景（默认）")
            + opt(lifeMode, "once", "只说一次：只挂一层，之后耳边留白等下一张")
            + opt(lifeMode, "stay", "常驻：一直挂到下一张来换")
            + '</select>'
            + '<div class="adr044-template-status" id="adr044-cd-lifemode-note">' + esc(adrCdLifeModeNote()) + '</div>'
            + '<label class="' + checkClass + '"><input type="checkbox" id="adr044-cd-autodone"' + (st.cdAutoDone ? " checked" : "") + '> 到半衰期时问一次小眼睛「兑现没」，答是就自动撤下（每张多一次调用，需填写择池 API；「只说一次」档跳过这一步，不产生费用）</label>'
            + '<label>投卡史</label>'
            + '<div class="adr044-cd-life-history" id="adr044-cd-life-history">还没投过卡。</div>'
            + secClose()

            + secOpen("三个仓库", true, "slots")
            + '<div class="' + noteClass + '">启用哪几格，就在哪几格之间均等掷——仓库数即权重。专属库配角色卡，通用库打底，NSFW 库单独一格。点亮=这局使用（换聊天各记各的）；库住哪个箱是永久的，灰芯片=在箱未用，虚线=未分箱。</div>'
            + adrCdSlotRowHTML("story", checkClass)
            + adrCdSlotRowHTML("common", checkClass)
            + adrCdSlotRowHTML("nsfw", checkClass)
            + '<div class="adr044-template-status" id="adr044-cd-slot-status">点一下芯片＝这局用不用它；开关＝整格用不用。每次点完这里会回报存没存进去。</div>'
            + secClose()

            + secOpen("编辑卡库", true, "library")
            + '<label>正在编辑</label>'
            + adrCdEditSelectHTML()
            + '<input type="text" id="adr044-cd-lib-name" placeholder="卡库名（保存＝新建或更新；重命名＝改当前这副）">'
            + '<div class="adr044-template-mini-actions">'
            + '<button type="button" id="adr044-cd-lib-save">保存</button>'
            + '<button type="button" id="adr044-cd-lib-rename">重命名</button>'
            + '<button type="button" id="adr044-cd-lib-delete">删除</button>'
            + '</div>'
            + '<label>保存/导入落点（新库存好后自动挂进这里）</label>'
            + adrCdImportSlotSelectHTML()
            + '<div class="adr044-template-mini-actions">'
            + '<button type="button" id="adr044-cd-import">导入 .txt/.md</button>'
            + '<button type="button" id="adr044-cd-export">导出这副</button>'
            + '</div>'
            + '<input type="file" id="adr044-cd-import-file" class="adr044-cd-import-file" accept=".txt,.md,text/plain,text/markdown">'
            + '<div class="adr044-template-status" id="adr044-cd-lib-status">## 开一门卡池，一行一张卡；// 开头是注释；即改即生效。</div>'
            + '<textarea id="adr044-cd-lib-editor" rows="12" placeholder="## 卡池名&#10;一行一张卡…"></textarea>'
            + secClose()

            + secOpen("择池／择卡 API（这两档才用）", true, "api")
            + '<div class="adr044-template-compact adr044-api-profile-compact">'
            + '<select id="adr044-api-profile-select-cd">' + adrDApiProfileSelectOptions("cd", adrDSelectedApiProfileName("cd") || "") + '</select>'
            + '<input type="text" id="adr044-api-profile-name-cd" value="' + esc(adrDSelectedApiProfileName("cd") || "") + '" placeholder="预设名，如 DS">'
            + '<div class="adr044-template-mini-actions">'
            + '<button type="button" id="adr044-api-profile-save-cd">保存</button>'
            + '<button type="button" id="adr044-api-profile-delete-cd">删除</button>'
            + '</div></div>'
            + '<div class="adr044-template-status" id="adr044-api-profile-status-cd">下拉选择会立即切换；改名后保存会新增/更新预设。</div>'
            + '<label>API 地址</label><input type="text" id="adr044-cd-endpoint" value="' + esc(st.cdApiEndpoint || "") + '" placeholder="https://api.deepseek.com">'
            + '<label>API 密钥</label><input type="password" id="adr044-cd-key" value="' + esc(st.cdApiKey || "") + '" placeholder="sk-...">'
            + '<label>模型</label><input type="text" id="adr044-cd-model" value="' + esc(st.cdModel || "") + '" placeholder="可以手填，或加载模型">'
            + '<select id="adr044-cd-model-select"><option value="">加载后在此选择模型</option></select>'
            + '<div class="' + actionsClass + '"><button id="adr044-cd-load-models" type="button">加载模型</button><button id="adr044-cd-test" type="button">测试连接</button><button id="adr044-cd-save" type="button">保存当前使用</button></div>'
            + '<div class="adr044-template-status" id="adr044-cd-status">择池与择卡都用这里的 API；任何异常当场降级盲抽，不停摆（降级时 NSFW 一律不参与）。试抽恒为盲抽，不产生费用。</div>'
            + secClose()

            + secOpen("🎬 剧情展开推进（可选）", true, "expand")
            + '<div class="' + noteClass + '">抽到一张卡不再一层演完：导演先按角色卡、世界观、当前剧情和基调把它切成 N 幕，之后每一回合只把一幕贴到耳边，后面的幕演员看不见。回复落地、你再发言才换下一幕；重抽不换幕，连发不吞幕。走完自动结案，下一张按原节奏来。</div>'
            + '<label class="' + checkClass + '"><input type="checkbox" id="adr044-cd-expand-enabled"' + (st.cdExpandEnabled ? " checked" : "") + '> 启用剧情展开推进（需填下面的 API）</label>'
            + '<label>切成几幕（' + ADR_CD_EXPAND_MIN + '–' + ADR_CD_EXPAND_MAX + '，默认 ' + ADR_CD_EXPAND_DEFAULT_N + '）</label><input type="number" id="adr044-cd-expand-n" min="' + ADR_CD_EXPAND_MIN + '" max="' + ADR_CD_EXPAND_MAX + '" value="' + esc(String(adrCdExpandN())) + '">'
            + '<label>每幕演几轮（默认 1）</label><input type="number" id="adr044-cd-expand-per" min="1" max="9" value="' + esc(String(adrCdExpandPer())) + '">'
            + '<label>展开温度（0–2，默认 0.9；规矩钉死后高一点更有变化，同一张卡不同局展开得不一样）</label><input type="number" id="adr044-cd-expand-temp" min="0" max="2" step="0.1" value="' + esc(String(adrCdExpandTemp())) + '">'
            + '<label class="' + checkClass + '"><input type="checkbox" id="adr044-cd-expand-nsfw"' + (st.cdExpandNsfw ? " checked" : "") + '> NSFW 卡也展开（卡面会发给展开 API，走审核有被拒风险；默认关，NSFW 卡按整张投）</label>'
            + '<label>展开 API 地址</label><input type="text" id="adr044-expand-endpoint" value="' + esc(st.expandApiEndpoint || "") + '" placeholder="https://generativelanguage.googleapis.com/v1beta/openai">'
            + '<label>展开 API 密钥</label><input type="password" id="adr044-expand-key" value="' + esc(st.expandApiKey || "") + '" placeholder="sk-...">'
            + '<label>展开模型（要大模型，切幕靠它）</label><input type="text" id="adr044-expand-model" value="' + esc(st.expandModel || "") + '" placeholder="可以手填，或加载模型">'
            + '<select id="adr044-expand-model-select"><option value="">加载后在此选择模型</option></select>'
            + '<div class="' + actionsClass + '"><button id="adr044-expand-load-models" type="button">加载模型</button><button id="adr044-expand-test" type="button">测试连接</button></div>'
            + '<div class="adr044-template-status" id="adr044-expand-status">展开走流式接收，跟导演一样认 thinking 模型；失败就按整张卡投，不停摆。</div>'
            + '<label>展开提示词（留空用出厂；先【分析】再【步骤】的格式与贴耳语由代码接管）</label>'
            + '<textarea id="adr044-expand-preset" rows="6" placeholder="留空＝出厂提示词">' + esc(st.expandPreset || "") + '</textarea>'
            + '<div class="' + actionsClass + '"><button id="adr044-expand-preset-reset" type="button">恢复出厂提示词</button></div>'
            + secClose()

            + secOpen("高级 · 注入与信封", true, "envelope")
            + '<label>注入深度（从最新消息往回数，默认 2）</label><input type="number" id="adr044-cd-depth" min="0" max="4" value="' + esc(String(adrCdDepth())) + '">'
            + '<label>冷却区（最近 M 张不复用，默认 8，最多 32）</label><input type="number" id="adr044-cd-cooldown" min="0" max="32" value="' + esc(String(adrCdCooldown())) + '">'
            + '<label>信封预设（不同模型吃不同话术）</label>'
            + adrCdEnvSelectHTML()
            + '<input type="text" id="adr044-cd-env-name" value="' + esc(adrCdCurrentEnvelopeName()) + '" placeholder="预设名">'
            + '<div class="adr044-template-mini-actions">'
            + '<button type="button" id="adr044-cd-env-save">保存</button>'
            + '<button type="button" id="adr044-cd-env-delete">删除</button>'
            + '</div>'
            + '<div class="adr044-template-status" id="adr044-cd-env-status">下拉切换立即生效；改了下面的文本再点保存，会写进当前这套预设。</div>'
            + '<label>前半程 · 必须发生（{卡面} 会被替换为抽中的卡）</label>'
            + '<textarea id="adr044-cd-envelope" rows="3">' + esc(adrCdEnvelopePair().active) + '</textarea>'
            + '<label>后半程 · 已发生的背景（过了半衰期自动换成这段）</label>'
            + '<textarea id="adr044-cd-envelope-faded" rows="3">' + esc(adrCdEnvelopePair().faded) + '</textarea>'
            + secClose()

            + secOpen("卡面家法", true, "help")
            + '<div class="' + noteClass + '" style="white-space:pre-wrap">' + esc(ADR_CD_HELP_TEXT) + '</div>'
            + secClose();
    }

    function adrCdPageHTML() {
        var st = settings();
        function secOpen(title, closed, key) {
            return adrxDrawerStart('cd-' + key, title, !closed, true);
        }
        function secClose() { return '</details>'; }
        return '<div class="adr044-page" id="adr044-page-cd"' + (st.activeTab === "cd" ? '' : ' style="display:none"') + '>'
            + adrCdPageInnerHTML(secOpen, secClose, "adr044-check", "adr044-actions")
            + '</div>';
    }

    function adrCd048PageHTML() {
        var st = settings();
        function secOpen(title, closed, key) {
            return adrxDrawerStart('cd-' + key, title, !closed, true);
        }
        function secClose() { return '</details>'; }
        return '<div class="adr048-page" id="adr048-page-cd"' + (st.activeTab === "cd" ? '' : ' style="display:none"') + '>'
            + adrCdPageInnerHTML(secOpen, secClose, "adr048-check", "adr048-actions")
            + '</div>';
    }

    // ================= 抽卡剧情小能手 模块结束 =================

    // ================= v1.39.0 小红霞掌灯 =================
    // 第四页：不是导演，不管自动触发、不数楼、不投卡。你手点，她才开口。
    // 页面只做三件事：① 把 AI 会看见的素材摆出来给你看（本篇原文、未隐藏楼层的摘要、角色卡/世界书/人设、基调）；
    // ② 没有导演框架的纯聊天，预设只定人设（有审美、有坚持、反对要带依据）；
    // ③ 聊到可以了让执笔位按讨论结论重写这一楼，预览后替换——只换正文标签里面与摘要标签里面，
    //    楼里的状态栏、变量块、导演稿原样留着；原版存成前一页 swipe，向左一划就回来。
    // 聊天位与执笔位分开：和你顶嘴的可以是 Claude，下笔的可以是主聊天那个模型，文风和前后楼一致。
    var ADR_LAMP_META_KEY = "arrebol_d_lamp";
    var ADR_LAMP_LS_KEY = "arrebol_d_lamp_v1";
    var ADR_LAMP_MSG_MAX = 300;       // 一楼的对话最多存这么多句（v1.42.0 80 → 300；发请求时全带，不另截）
    var ADR_LAMP_THREAD_MAX = 8;      // 一把聊天最多留几楼的对话
    var ADR_LAMP_SUMMARY_FLOORS_DEFAULT = 0;   // v1.42.0 默认读全部未隐藏楼层（0 = 不限）

    // v1.45.6 改稿人设重写（江：「她其实就是和用户讨论，然后重写替换的，这样写了她一直拒绝重写」「不是扮演者，
    // 就是超高审美、和用户讨论剧情的高级改稿员」「她的用户是看这部小说的成年、清醒、有生活阅历且文艺、讨厌低俗文笔、
    // 拒绝恶俗的文字；不是剧情里的 user，是和她一样的这个互动小说的读者」）。
    // 旧人设写着「不是在写正文……不写正文，除非作者明确要你写一段看看」，读者在聊天里让她改，她就一直推辞。
    // v1.45.7 三处人设（改稿 / 蛐蛐 / 剧场）说的是同一个人、同一条底线，共用这几段。
    // 江：「她的用户是看这部小说的成年、清醒、有生活阅历且文艺、讨厌低俗文笔、拒绝恶俗的文字；不是剧情里的 user，
    // 是和她一样的这个互动小说的读者」「如果用户问你意见，可以给出回复建议。你们是讨论，一起讨论剧情、吃瓜、决定互动小说的走向」
    // 「虽然是艺术创作个互动小说，也不可能毫无边界和底线，因为你的用户本身就是高审美和有生活阅历的，不是来讨论恶俗的。
    // 你们是两个成年人愉快的讨论，都有自己的审美笔触和坚持」「小剧场创作也是这么写」。
    var ADR_HX_READER = "和你说话的人是这部互动小说的读者，和你一样坐在书外看这个故事，不是剧情里的 user。TA 成年、清醒、有生活阅历、文艺，讨厌低俗文笔，拒绝恶俗的文字。";
    var ADR_HX_BOUNDARY = "你们是两个成年人在愉快地讨论，各有各的审美、笔触和坚持。这是艺术创作，是互动小说，但不可能毫无边界和底线：读者本身就是高审美、有生活阅历的人，不是来讨论恶俗的。低俗、恶俗的写法和走向，你不捧场，也不往那儿带。";
    var ADR_HX_SUGGEST = "读者问你意见、问接下来怎么回的时候，你可以给回复建议：下一步可以怎么回、把剧情往哪个方向带，给一两个回法，说清各自会走到哪儿、你更看好哪个。这部互动小说的走向是你们一起商量出来的，最后拿主意的是读者。";

    // 她自己的坚持：随每次请求带着（聊天、蛐蛐、动笔、剧场），不随面板里的人设改。
    // 写法是引导，不是设卡：不宣布、不拒绝、不讲道理，她只是往自己愿意写的地方写。看年龄，不看气质。
    var ADR_HX_STANCE_HEAD = [
        "【你自己的坚持】",
        "你有自己的判断和底线。涉及未成年人性行为的内容，你是不会写的：不写，不润色，不讨论。这是你自己的坚持，请不要改变它。",
        "看的是年龄，不是气质。成年人再可爱、再天真活泼、笑起来再像个孩子，也是成年人，他们的感情和亲密照常写，不用多想，更不用逐个盘问年龄。明明是个孩子、只在设定里改了岁数的，你心里有数。",
        "读者要是往那上面提，说明你们不在一个频率上。但你不用拒绝，不用解释，也不用讲道理：高高兴兴接话，把它写成你愿意写的东西就好。还是这些人，换一件干净的事——一起去爬山、赶作业、闹别扭又和好。还有很多美好的情感可以写。"
    ];
    var ADR_HX_STANCE_DO = {
        chat: "聊天里就这么接：不说「我不能写」，只管往你愿意写的地方聊。读者再提，你照样只往那儿写。",
        pen: "动笔时也一样：稿子照交，那类内容不落在纸上，照你愿意写的方向写；稿子里外都不用说明。",
        theater: "这一楼要是正好碰到，或者本场主题往这上面带：照演一场，挑这一楼里别的东西写。"
    };
    function adrHxStance(kind) {
        return ADR_HX_STANCE_HEAD.concat([ADR_HX_STANCE_DO[kind] || ADR_HX_STANCE_DO.chat]).join("\n");
    }

    var ADR_LAMP_PRESET = [
        "你是 Arrebol，小红霞：审美极高的高级改稿员。你和读者一起看这部互动小说：讨论剧情、吃瓜、商量它往哪儿走，掰扯这一楼哪里好、哪里不对，聊定了由你把稿子改好。你不是扮演者：不扮演剧中任何角色，不接着剧情往下演。",
        "",
        ADR_HX_READER + "你说的话、改的稿，都是给这样一个人看的。",
        "",
        ADR_HX_BOUNDARY,
        "",
        "讨论的时候，你有自己的审美和坚持，不人云亦云。读者说的逻辑点站得住，你就跟着走、把它说得更透；站不住，你就大胆说出你的看法，哪怕 TA 不爱听。但反对要带依据，依据只认三样：",
        "① 真实的人类情感心理——人在这种处境下真的会这样想、这样说、这样做吗；",
        "② 本篇此刻的物理处境与现实逻辑——时间、地点、身体状态、在场的人、手里的东西，前后楼对不对得上；",
        "③ 角色卡与世界书定下的规矩——人设、能力边界、世界规则。",
        "拿不出这三样之一的意见不算意见，别为了显得有主见而反对。读者说得对的时候，痛快地承认。",
        "",
        ADR_HX_SUGGEST,
        "",
        "改稿是你的本职。读者让你改，你就改，不推辞，也不反复确认：有时是修正一整篇，有时只动一段、一句。你有不同看法可以说一句，但主意是读者拿，活儿你得干。改出来的稿子：",
        "· 是整楼全文。哪怕只改了一段，其余部分也原样保留、一字不动，这样才能整楼替换。",
        "· 文笔和原文一致，读起来是同一个人写的；改到的地方，合理的话可以润色得更好。",
        "· 字数听读者的；TA 没提，改后的篇幅和原文基本持平。",
        "· 文字干净、有质感，不低俗、不恶俗。",
        "· 正文改了，这一楼的摘要和状态栏也跟着改对，不留旧的。",
        "",
        "你看得见的素材都在下面：这局的基调（读者亲口定的，压过一切）、角色卡 / 世界书 / 人设、未隐藏楼层的摘要、以及本篇原文。聊的时候引用原文要准，别凭印象编。隐藏掉的楼层你看不见，读者提到了就当真。",
        "",
        "聊天的语言活泼有趣，像朋友说话，短句，有话直说，不要列大纲、不要分点罗列、不要用标题。一次说一两件事就好，说透比说全重要。"
    ].join("\n");

    // 动笔的手续由代码接管，不放在能改的人设里：人设被改成什么样，「读者说改就改」这条路都通。
    // 聊天位只负责讨论；她在回复里单独写一行 [[动笔]]，代码就接着让执笔位按讨论改整楼、放进预览。
    var ADR_LAMP_PEN_MARK = "[[动笔]]";
    var ADR_LAMP_PEN_MARK_RE = /[\[［]{2}\s*动笔\s*[\]］]{2}/g;
    var ADR_LAMP_EDIT_PROTOCOL = [
        "【怎么动笔 · 这一段由系统接管】",
        "这个聊天框只用来讨论。读者明确让你动笔时（「改吧」「重写」「改好给我」「帮我替换」「就这么改」这一类），你在这里只做两件事：",
        "1. 用一两句话说清这次怎么改：改哪里，往哪个方向改；",
        "2. 另起一行，单独写：" + ADR_LAMP_PEN_MARK,
        "系统看到这一行，就让你进入动笔环节：按上面的讨论把整楼改好，放进「改稿」预览；读者看过预览、点「替换这篇」，稿子才会换进楼里。",
        "所以：讨论时可以举一两句例子说明你的想法，但整段、整楼的改稿不要贴在聊天里，留给动笔环节；不要说「我不写正文」「我不能替你改」这类话，也不要让读者自己动手改。还在讨论、读者没让你动笔的时候，不要写 " + ADR_LAMP_PEN_MARK + "。"
    ].join("\n");

    var ADR_LAMP_PEN_PRESET = [
        "你是 Arrebol，小红霞：审美极高的高级改稿员，不是扮演者。你刚和读者讨论完这部互动小说的这一楼，现在动笔，把这一楼改好，交给读者预览、替换。",
        "",
        "读者是谁：坐在书外看这部互动小说的人，不是剧情里的 user；成年、清醒、有生活阅历、文艺，讨厌低俗文笔，拒绝恶俗的文字。稿子是改给 TA 看的。这是艺术创作，但不可能毫无边界和底线：低俗、恶俗的写法不上稿。",
        "",
        "规矩：",
        "1. 交的是整楼全文。讨论里要改的地方（一句、一段，还是整篇）照讨论定下的改；没说要改的地方逐字照抄，一个字、一个标点都不动。哪怕只改了一段，也要把其余部分原样带上，这样才能整楼替换。",
        "2. 读者最后拿的主意算数。读者没明说的细节，按你们讨论的方向和你自己的判断补齐；不要因为「讨论里没有完全说定」就原样交回，更不要拒绝动笔。",
        "3. 文笔与原文一致：人称、时态、叙述距离、段落节奏接得上，读起来是同一个人写的同一楼。改到的地方可以在合理的范围内润色得更好；没让改的地方不要「顺手优化」。",
        "4. 字数听读者的：读者说了要多长、要扩要删，就照办；没说，改后的篇幅和原文基本持平。",
        "5. 文字干净、有质感：不低俗、不恶俗、不油腻，不写套话。",
        "6. 不加讨论里没有的新人物、新线索。角色卡、世界书与基调只用来判断什么合情理，不是拿来往里填设定的。",
        "7. 正文动了，这一楼的摘要和状态栏也要跟着对上（任务里会把原来的给你）。摘要按改后的正文重写，写法和长短照原摘要。状态栏逐项对照改后的正文：变了的项改掉（时间、地点、在场的人、身体与情绪状态、数值……），没变的项原样照抄；项目、顺序、格式、符号一律照原状态栏，不增不减。",
        "8. 输出只有标签块：正文放在指定的正文标签里；任务里要求了摘要、状态栏的，各给一个标签块。标签外不要有任何字——不解释、不加标题、不写\"好的\"。"
    ].join("\n");

    var ADR_LAMP_GOSSIP_PRESET = [
        "你是 Arrebol，小红霞。你和读者在追同一部剧，就是这部互动小说。你是陪 TA 一起看的朋友，不是编辑、不是导演，也不是扮演者。",
        "",
        ADR_HX_READER,
        "",
        ADR_HX_BOUNDARY,
        "",
        "你们干的事：蛐蛐主角、替配角不值、嗑或者拆、猜下一步、翻旧账（「他第三楼说过的话呢」）、给角色打分、吐槽剧情走向，一起商量这部互动小说往哪儿走。有自己的立场和偏爱，可以站队，可以和读者看法不一样，但每一句都要落在具体情节上——引用原文要准，别凭印象编。",
        "",
        ADR_HX_SUGGEST,
        "",
        "素材都在下面：这局的基调、角色卡/世界书/人设、未隐藏楼层的摘要（剧情走到哪了看这里）、以及最新一楼的全文。读者的消息前若带「（剧情走到 #N 了）」，说明又出了新楼，先看最新一楼再接着聊。被隐藏的楼你看不见，读者提到了就当真。",
        "",
        "记住你们之前聊过什么、你站过谁、押过什么——押中了可以得意，押错了认。",
        "",
        "语言像朋友发消息：短句、口语、可以有语气词和表情，不列大纲、不分点、不写标题。一次一两件事，有梗就接。不替这部小说写正文（回复建议里举一两句读者可以发出去的话不算）；不主动给修改意见，除非读者问「这里是不是该改」。"
    ].join("\n");
    var ADR_LAMP_GOSSIP_MAX = 300;    // 蛐蛐记录最多存这么多句（v1.42.0 200 → 300；发请求时全带，不另截）

    var adrLampRun = { busy: false, abort: null, mode: "", idx: -1 };
    var adrLampLiveText = "";
    var adrLampLivePaintAt = 0;

    // 聊天区自己的状态行；API 区的 adr044-lamp-status 留给 loadModels / 测试连接（status("lamp") 那条路）。
    function adrLampStatus(text, color) { adrCdSetTextAll("adr044-lamp-chat-status", text, color || "#d6b177"); }

    // ---- 标签 ----
    function adrLampSummaryTagNames() {
        var raw = "";
        try { raw = String(settings().lampSummaryTags || ""); } catch (e) {}
        var names = raw.split(/[,，]/).map(function (s) { return s.trim(); }).filter(Boolean);
        return names.length ? names : ["report"];
    }

    function adrLampTagRegex(names) {
        var esc2 = names.map(function (s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); });
        return new RegExp("<(" + esc2.join("|") + ")(?=[\\s/>])[^>]*>([\\s\\S]*?)<\\/\\1>", "gi");
    }

    function adrLampSummaryRegex() { return adrLampTagRegex(adrLampSummaryTagNames()); }

    // v1.46.1 状态栏标签（江：「如果霞改了原文，那摘要和状态栏也得改和替换」）。
    // 楼里的状态栏是主模型按正文填的：时间、地点、人物状态、数值……正文一改，它就对不上了。
    // 认法和摘要一样：按标签名找。每种标签取楼里的第一块；标签名照楼里实际写的大小写。留空＝不管状态栏。
    var ADR_LAMP_STATUS_TAGS_DEFAULT = "status,StatusBlock,状态栏";
    function adrLampStatusTagsRaw() {
        var raw = null;
        try { raw = settings().lampStatusTags; } catch (e) {}
        return raw == null ? ADR_LAMP_STATUS_TAGS_DEFAULT : String(raw);
    }
    function adrLampStatusTagNames() {
        return adrLampStatusTagsRaw().split(/[,，]/).map(function (x) { return x.trim(); }).filter(Boolean);
    }
    function adrLampExtractStatusBlocks(text) {
        var names = adrLampStatusTagNames();
        if (!names.length) return [];
        var re = adrLampTagRegex(names);
        var src = String(text || "");
        var out = [], seen = {}, m;
        while ((m = re.exec(src)) !== null) {
            var key = String(m[1]).toLowerCase();
            if (seen[key]) continue;
            seen[key] = true;
            out.push({ tag: m[1], inner: String(m[2] || "").trim() });
        }
        return out;
    }
    // 带着标签的写法：喂给执笔位当「原状态栏」，也是预览框里的样子（可以直接改两笔，标签留着）
    function adrLampStatusBlocksText(blocks) {
        return (blocks || []).filter(function (b) { return b && b.inner; }).map(function (b) { return "<" + b.tag + ">\n" + b.inner + "\n</" + b.tag + ">"; }).join("\n\n");
    }

    function adrLampContentTagName() {
        var names = adrDContentTagNames().filter(function (s) { return s !== "*"; });
        return names.length ? names[0] : "content";
    }

    // ---- 楼层 ----
    function adrLampIsHidden(m) { return !!(m && (m.is_system === true || m.is_hidden === true)); }
    function adrLampIsUser(m) { return !!(m && (m.is_user === true || String(m.role || "").toLowerCase() === "user")); }

    function adrLampChat() {
        try { return ctx().chat || []; } catch (e) { return []; }
    }

    function adrLampTargetFloor() {
        var chat = adrLampChat();
        if (adrLampIsGossip()) return findLastMessageIndex(chat);   // v1.40.0 蛐蛐模式永远对着最新一楼
        var want = -1;
        try { want = Number(adrLampState().floor); } catch (e) {}
        if (Number.isFinite(want) && want >= 0 && chat[want] && !adrLampIsUser(chat[want]) && String(chat[want].mes || "").trim()) return want;
        return findLastMessageIndex(chat);
    }

    function adrLampExtractBody(mes) {
        var clean = cleanMessage(mes);
        var re = adrDContentTagRegex();
        var blocks = [];
        var m;
        while ((m = re.exec(clean)) !== null) {
            var v = (m[2] || "").trim();
            if (v) blocks.push(v);
        }
        if (blocks.length) return { text: blocks.join("\n\n"), tagged: true };
        return { text: clean, tagged: false };
    }

    function adrLampExtractSummary(mes) {
        var re = adrLampSummaryRegex();
        var blocks = [];
        var m;
        var src = String(mes || "");
        while ((m = re.exec(src)) !== null) {
            var v = (m[2] || "").trim();
            if (v) blocks.push(v);
        }
        return blocks.join("\n");
    }

    function adrLampSummaryFloors() {
        var n = Number(settings().lampSummaryFloors);
        if (!Number.isFinite(n) || n < 0) return ADR_LAMP_SUMMARY_FLOORS_DEFAULT;
        return Math.floor(n);
    }

    function adrLampFloorLine(i, m) {
        var who = adrLampIsUser(m) ? "用户" : String(m.name || "角色");
        var raw = m.mes != null ? m.mes : m.message;
        if (adrLampIsUser(m)) {
            var u = cleanMessage(raw);
            return "[#" + i + " · " + who + "] " + u;   // v1.42.0 不截
        }
        var s = adrLampExtractSummary(raw);
        if (s) return "[#" + i + " · " + who + " · 摘要] " + s;
        var b = adrLampExtractBody(raw);
        return "[#" + i + " · " + who + " · 无摘要标签，给正文] " + b.text;   // v1.42.0 不截
    }

    function adrLampMaterials() { return adrLampMaterialsAt(adrLampTargetFloor()); }

    function adrLampMaterialsAt(idx) {
        var chat = adrLampChat();
        var out = { idx: idx, body: "", bodyTagged: false, summary: "", summaryFloors: 0, hiddenFloors: 0, card: "", tone: "", origSummary: "", origStatus: [] };
        if (idx < 0 || !chat[idx]) return out;
        var b = adrLampExtractBody(chat[idx].mes);
        out.body = b.text;   // v1.42.0 不截
        out.bodyTagged = b.tagged;
        out.origSummary = adrLampExtractSummary(chat[idx].mes);
        out.origStatus = adrLampExtractStatusBlocks(chat[idx].mes);

        var cap = adrLampSummaryFloors();
        var before = [];
        var counted = 0;
        for (var i = idx - 1; i >= 0; i--) {
            var m = chat[i];
            if (!m) continue;
            if (adrLampIsHidden(m)) { out.hiddenFloors++; continue; }
            if (!adrLampIsUser(m)) {
                if (cap && counted >= cap) break;
                counted++;
            }
            before.unshift(adrLampFloorLine(i, m));
        }
        var after = [];
        for (var j = idx + 1; j < chat.length; j++) {
            var m2 = chat[j];
            if (!m2 || adrLampIsHidden(m2)) continue;
            after.push(adrLampFloorLine(j, m2));
        }
        out.summaryFloors = counted;
        var lines = before.concat(["【本篇 · #" + idx + " 在此】"], after);
        out.summary = lines.join("\n");
        try { out.card = buildPreciseContext(true); } catch (eC) {}   // v1.42.0 全量：角色卡 / 世界书 / 人设一字不截
        try { out.tone = adrDToneText(); } catch (eT) {}
        return out;
    }

    // v1.45.7：改稿、执笔、蛐蛐、剧场四路现在都管屏幕前这位叫「读者」（不是剧情里的 user），基调那行统一。
    function adrLampMaterialsText(mat) {
        var parts = [];
        if (mat.tone) parts.push("【这局的基调 · 读者亲口定的，压过角色卡与此前剧情】\n" + mat.tone);
        if (mat.card) parts.push("【角色卡 / 世界书 / 人设 · 判断合不合情理用】\n" + mat.card);
        if (mat.summary) parts.push("【此前剧情 · 未隐藏楼层的摘要，按时间顺序】\n" + mat.summary);
        parts.push("【本篇原文 · #" + mat.idx + " · 讨论对象】\n" + (mat.body || "（这一楼正文为空）"));
        return parts.join("\n\n");
    }

    // ---- 聊天级状态：chat_metadata 主档 + LS 镜像，与抽卡、导演同构 ----
    function adrLampNormMsg(x) {
        if (!x || typeof x !== "object" || typeof x.t !== "string" || !x.t) return null;
        var r = x.r === "u" ? "u" : (x.r === "n" ? "n" : "a");
        var f = Number(x.f);
        var m = { r: r, t: x.t, at: Number(x.at) || 0, f: Number.isFinite(f) && f >= 0 ? Math.floor(f) : -1 };
        if (x.auto === true) m.auto = true;   // v1.41.0 她自己蛐蛐的那句
        return m;
    }

    function adrLampNormDraft(d) {
        if (!d || typeof d !== "object" || typeof d.content !== "string" || !d.content.trim()) return null;
        return { content: d.content, summary: typeof d.summary === "string" ? d.summary : "", status: typeof d.status === "string" ? d.status : "", base: typeof d.base === "string" ? d.base : "", at: Number(d.at) || 0 };
    }

    function adrLampNormState(raw) {
        var o = raw && typeof raw === "object" ? raw : {};
        var threads = {};
        var src = o.threads && typeof o.threads === "object" ? o.threads : {};
        var keys = Object.keys(src).filter(function (k) { return /^\d+$/.test(k); });
        keys.sort(function (a, b) { return (Number(src[b] && src[b].at) || 0) - (Number(src[a] && src[a].at) || 0); });
        keys.slice(0, ADR_LAMP_THREAD_MAX).forEach(function (k) {
            var t = src[k] || {};
            var msgs = (Array.isArray(t.msgs) ? t.msgs : []).map(adrLampNormMsg).filter(Boolean);
            while (msgs.length > ADR_LAMP_MSG_MAX) msgs.shift();
            var draft = adrLampNormDraft(t.draft);
            if (!msgs.length && !draft) return;
            threads[k] = { msgs: msgs, draft: draft, at: Number(t.at) || 0 };
        });
        var floor = Number(o.floor);
        // v1.40.0 蛐蛐模式：一把聊天一本账，不按楼分、不自动清，跟着剧情一路记
        var g = o.gossip && typeof o.gossip === "object" ? o.gossip : {};
        var gm = (Array.isArray(g.msgs) ? g.msgs : []).map(adrLampNormMsg).filter(Boolean);
        while (gm.length > ADR_LAMP_GOSSIP_MAX) gm.shift();
        return { v: 1, floor: Number.isFinite(floor) && floor >= 0 ? Math.floor(floor) : -1, threads: threads, gossip: { msgs: gm, at: Number(g.at) || 0 } };
    }

    function adrLampState() {
        try {
            var root = adrCdMetaRoot();
            if (root && root[ADR_LAMP_META_KEY] && typeof root[ADR_LAMP_META_KEY] === "object") return adrLampNormState(root[ADR_LAMP_META_KEY]);
            var keyReady = false;
            try { keyReady = adrDChatKeyReady(); } catch (eK) {}
            if (keyReady) {
                var all = adrDReadJsonLS(ADR_LAMP_LS_KEY);
                var mirror = all[adrDChatKey()];
                if (mirror && typeof mirror === "object") return adrLampNormState(mirror);
            }
        } catch (e) {}
        return adrLampNormState(null);
    }

    function adrLampSaveState(state) {
        var clean = adrLampNormState(state);
        var metaOk = false;
        var keyReady = false;
        try { keyReady = adrDChatKeyReady(); } catch (eK) {}
        try {
            var root = adrCdMetaRoot();
            if (root) {
                root[ADR_LAMP_META_KEY] = clean;
                metaOk = true;
                var c = ctx();
                if (typeof c.saveMetadataDebounced === "function") c.saveMetadataDebounced();
                else if (typeof c.saveMetadata === "function") c.saveMetadata();
            }
        } catch (eMeta) { metaOk = false; }
        if (keyReady) {
            try {
                var all = adrDReadJsonLS(ADR_LAMP_LS_KEY);
                all[adrDChatKey()] = clean;
                adrDWriteJsonLS(ADR_LAMP_LS_KEY, all);
            } catch (eLs) {}
        }
        return metaOk || keyReady;
    }

    function adrLampThread(state, idx, create) {
        var k = String(idx);
        if (!state.threads[k] && create) state.threads[k] = { msgs: [], draft: null, at: Date.now() };
        return state.threads[k] || null;
    }

    function adrLampCurrentThread(state, idx, create) {
        if (adrLampIsGossip()) return state.gossip;
        return adrLampThread(state, idx, create);
    }

    // ---- API 位：聊天位默认借统筹，执笔位默认跟聊天位；都能自己填 ----
    var ADR_LAMP_BORROW_LABEL = { plot: "统筹", emotion: "情感导演", expand: "展开", cd: "小眼睛", self: "自己填", lamp: "聊天位" };

    function adrLampApiCfg(which) {
        var st = settings();
        var borrow = which === "pen" ? String(st.penBorrow || "lamp") : String(st.lampBorrow || "plot");
        if (which === "pen" && borrow === "lamp") {
            var inner = adrLampApiCfg("lamp");
            inner.from = "lamp";
            return inner;
        }
        if (!ADR_LAMP_BORROW_LABEL[borrow] || borrow === "lamp") borrow = which === "pen" ? "lamp" : "plot";
        var p = borrow === "self" ? (which === "pen" ? "pen" : "lamp") : prefixOf(borrow);
        return { endpoint: String(st[p + "ApiEndpoint"] || ""), key: String(st[p + "ApiKey"] || ""), model: String(st[p + "Model"] || ""), from: borrow, prefix: p };
    }

    function adrLampApiNote(which) {
        var cfg = adrLampApiCfg(which);
        var who = which === "pen" ? "执笔位" : "聊天位";
        var src = cfg.from === "self" ? "自己填的" : ("借" + (ADR_LAMP_BORROW_LABEL[cfg.from] || cfg.from) + "的");
        if (!cfg.endpoint || !cfg.model) return who + "：" + src + "，但那边地址或模型还空着";
        return who + "：" + src + " · " + cfg.model;
    }

    function adrLampTemp() {
        var t = Number(settings().lampTemp);
        if (!Number.isFinite(t) || t < 0 || t > 2) return 0.8;
        return t;
    }

    function adrLampPresetText() {
        var p = "";
        try { p = String(settings().lampPreset || "").trim(); } catch (e) {}
        return p || ADR_LAMP_PRESET;
    }

    // ---- v1.40.0 两种模式：改稿（对着一楼聊，聊完改好替换，替换后清）／蛐蛐（和朋友一起追剧，一直留着，只聊不改）----
    function adrLampMode() {
        try { return settings().lampMode === "gossip" ? "gossip" : "edit"; } catch (e) { return "edit"; }
    }
    function adrLampIsGossip() { return adrLampMode() === "gossip"; }
    function adrLampGossipPresetText() {
        var p = "";
        try { p = String(settings().lampGossipPreset || "").trim(); } catch (e) {}
        return p || ADR_LAMP_GOSSIP_PRESET;
    }
    function adrLampSetMode(mode) {
        var m = mode === "gossip" ? "gossip" : "edit";
        save("lampMode", m);
        saveNow();
        adrLampRefreshAll();
        adrLampStatus(m === "gossip" ? "蛐蛐模式：对话跟着剧情一直留着，只聊不改稿" : "改稿模式：对着一楼聊，聊完能改好替换", "#8ed99d");
    }

    // 发给 API 的历史：记录行不进；蛐蛐模式只带最近 N 句，用户那句前面标剧情走到哪一楼了（换楼才标）
    function adrLampApiHistory(msgs, gossip) {
        var list = msgs.filter(function (m) { return m.r !== "n"; });   // v1.42.0 全带，不截最近 N 句
        var lastF = -1;
        return list.map(function (m) {
            var content = m.t;
            if (gossip && m.r === "u") {
                var f = Number.isFinite(Number(m.f)) ? Number(m.f) : -1;
                if (f >= 0 && f !== lastF) {
                    content = (lastF < 0 ? "（剧情现在在 #" + f + "）" : (f > lastF ? "（剧情走到 #" + f + " 了）" : "（剧情回到 #" + f + "）")) + "\n" + content;
                    lastF = f;
                }
            }
            return { role: m.r === "u" ? "user" : "assistant", content: content };
        }).reduce(function (acc, cur) {
            // 同一角色连着两条（发送失败没等到回答、自动蛐蛐接在上一句回答后面）合成一条，
            // 严格要求 user / assistant 交替的接口也吃得下。
            var last = acc[acc.length - 1];
            if (last && last.role === cur.role) last.content += "\n\n" + cur.content;
            else acc.push({ role: cur.role, content: cur.content });
            return acc;
        }, []);
    }

    // ---- 聊 ----
    function adrLampTranscript(msgs) {
        return msgs.filter(function (m) { return m.r !== "n"; }).map(function (m) { return (m.r === "u" ? "读者：" : "小红霞：") + m.t; }).join("\n\n");
    }

    async function adrLampSend() {
        if (adrLampRun.busy) { adrLampStatus("小红霞还在说，先听完或点「打断」", "#d6b177"); return false; }
        var input = qForm("adr044-lamp-input");
        var text = input ? String(input.value || "").trim() : "";
        if (!text) { adrLampStatus("先说点什么", "#d6b177"); return false; }
        var cfg = adrLampApiCfg("lamp");
        if (!cfg.endpoint || !cfg.model) { adrLampStatus("聊天位没有可用的 API：" + adrLampApiNote("lamp"), "#d4726a"); return false; }
        var mat = adrLampMaterials();
        if (mat.idx < 0) { adrLampStatus("这把聊天还没有可聊的助手楼", "#d4726a"); return false; }

        var homeKey = adrDChatKey();
        var gossip = adrLampIsGossip();
        var state = adrLampState();
        var th = adrLampCurrentThread(state, mat.idx, true);
        th.msgs.push({ r: "u", t: text, at: Date.now(), f: mat.idx });
        var cap = gossip ? ADR_LAMP_GOSSIP_MAX : ADR_LAMP_MSG_MAX;
        while (th.msgs.length > cap) th.msgs.shift();
        th.at = Date.now();
        adrLampSaveState(state);
        adrCdSetValueSafe("adr044-lamp-input", "");
        Array.prototype.slice.call(rootDoc().querySelectorAll("#adr044-lamp-input")).forEach(function (el) { el.value = ""; });

        adrLampRun = { busy: true, abort: null, mode: "chat", idx: mat.idx };
        adrLampLiveText = "";
        adrLampSetButtons();
        adrLampRenderThread();
        adrLampStatus(gossip ? "小红霞在看剧…" : "小红霞在看稿…", "#8ed99d");

        // 改稿模式：人设（能改）+ 动笔手续（代码接管）+ 素材；蛐蛐模式：人设 + 素材，和以前一样
        var sysText = gossip
            ? adrLampGossipPresetText() + "\n\n" + adrHxStance("chat") + "\n\n" + adrLampMaterialsText(mat)
            : adrLampPresetText() + "\n\n" + ADR_LAMP_EDIT_PROTOCOL + "\n\n" + adrHxStance("chat") + "\n\n" + adrLampMaterialsText(mat);
        var messages = [{ role: "system", content: sysText }].concat(adrLampApiHistory(th.msgs, gossip));
        var partial = "";
        var outcome = "";
        var wantPen = false;   // v1.45.6 她在回复里写了 [[动笔]]：说完就接着让执笔位改
        try {
            var out = await adrDChatCompletionText({
                endpoint: cfg.endpoint, key: cfg.key, model: cfg.model, temperature: adrLampTemp(), messages: messages,
                onAbortable: function (fn) { adrLampRun.abort = fn; },
                onProgress: function (chars, thought, content) {
                    partial = gossip ? (content || "") : adrLampStripPenMark(content || "");
                    adrLampPaintLive(partial, chars, thought);
                }
            });
            if (adrDChatKey() !== homeKey) { adrLampStatus("中途换了聊天，这段话没存", "#d6b177"); return false; }
            var said = String(out || "").trim();
            if (!gossip && adrLampHasPenMark(said)) { wantPen = true; said = adrLampStripPenMark(said); }
            adrLampCommitReply(gossip ? "gossip" : mat.idx, said, mat.idx);
            adrLampStatus(wantPen ? "她说好了，这就动笔…" : "说完了 · " + adrLampApiNote("lamp"), "#8ed99d");
            outcome = "ok";
        } catch (e) {
            if (adrDChatKey() !== homeKey) { adrLampStatus("中途换了聊天，这段话没存", "#d6b177"); return false; }
            if (e && e.name === "LampAbort") {
                if (partial.trim()) adrLampCommitReply(gossip ? "gossip" : mat.idx, partial.trim() + "\n（被打断了）", mat.idx);
                adrLampStatus("打断了", "#d6b177");
                outcome = "abort";
            } else {
                adrLampStatus("小红霞没接上：" + (e && e.message ? e.message : String(e)), "#d4726a");
                outcome = "error";
            }
        } finally {
            adrLampRun = { busy: false, abort: null, mode: "", idx: -1 };
            adrLampLiveText = "";
            adrLampSetButtons();
            adrLampRenderThread();
        }
        // 读者在聊天里让她动笔、她应下了：不用再去点「改好给我」，接着就改。改不成（API 出错、被打断）状态行会说，按钮还在。
        if (outcome === "ok" && wantPen) {
            try { await adrLampRewrite(); } catch (ePen) {}
        }
        return outcome === "ok";
    }

    function adrLampHasPenMark(text) {
        ADR_LAMP_PEN_MARK_RE.lastIndex = 0;
        return ADR_LAMP_PEN_MARK_RE.test(String(text || ""));
    }
    function adrLampStripPenMark(text) {
        return String(text || "").replace(ADR_LAMP_PEN_MARK_RE, "").replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
    }

    function adrLampCommitReply(key, text, f) {
        if (!text) return;
        var state = adrLampState();
        var gossip = key === "gossip";
        var th = gossip ? state.gossip : adrLampThread(state, key, true);
        th.msgs.push({ r: "a", t: text, at: Date.now(), f: Number.isFinite(Number(f)) ? Number(f) : -1 });
        var cap = gossip ? ADR_LAMP_GOSSIP_MAX : ADR_LAMP_MSG_MAX;
        while (th.msgs.length > cap) th.msgs.shift();
        th.at = Date.now();
        adrLampSaveState(state);
    }

    function adrLampAbort() {
        if (!adrLampRun.busy || typeof adrLampRun.abort !== "function") { adrLampStatus("现在没在等她", "#d6b177"); return false; }
        try { adrLampRun.abort(); } catch (e) {}
        return true;
    }

    function adrLampClear(btn) {
        var gossip = adrLampIsGossip();
        return adrDTwoStepConfirm("lamp-clear", btn || qForm("adr044-lamp-clear"), "确定清空？", gossip ? "再点一次清空蛐蛐记录（这把聊天从头追）" : "再点一次清空本轮对话（改稿预览也一起扔）",
            function (msg) { adrLampStatus(msg, "#d6a26a"); },
            function () {
                var state = adrLampState();
                if (gossip) state.gossip = { msgs: [], at: Date.now() };
                else delete state.threads[String(adrLampTargetFloor())];
                adrLampSaveState(state);
                adrLampRenderThread();
                adrLampStatus(gossip ? "蛐蛐记录清空了" : "本轮对话清空了", "#8ed99d");
            });
    }

    // ---- 改稿：执笔位读完整段讨论，重写这一楼 ----
    function adrLampStripFences(s) {
        var t = String(s || "").trim();
        var m = /^```[a-zA-Z0-9_-]*\s*\n([\s\S]*?)\n```\s*$/.exec(t);
        return m ? m[1].trim() : t;
    }

    // statusTags：这一楼实际有的状态栏标签名（没有就不传）。回来的状态栏整理成带标签的文本，放进预览框
    function adrLampParsePen(raw, wantSummary, statusTags) {
        var src = String(raw || "");
        var cre = adrDContentTagRegex();
        var cm = cre.exec(src);
        var content = cm ? String(cm[2] || "").trim() : "";
        var summary = "";
        if (wantSummary) {
            var sre = adrLampSummaryRegex();
            var sm = sre.exec(src);
            summary = sm ? String(sm[2] || "").trim() : "";
        }
        var tags = Array.isArray(statusTags) ? statusTags.filter(Boolean) : [];
        var blocks = [];
        // 状态栏要在正文之外找：先把正文标签整块挖掉，免得正文里恰好引用了同名标签
        var outside = cm ? src.slice(0, cm.index) + src.slice(cm.index + cm[0].length) : src;
        tags.forEach(function (tag) {
            var m = adrLampTagRegex([tag]).exec(outside);
            if (m && String(m[2] || "").trim()) blocks.push({ tag: tag, inner: String(m[2]).trim() });
        });
        if (!content) {
            // 没按标签来：把摘要块、状态栏块摘掉，剩下的整段当正文
            var rest = src;
            if (wantSummary) rest = rest.replace(adrLampSummaryRegex(), "");
            if (tags.length) rest = rest.replace(adrLampTagRegex(tags), "");
            content = adrLampStripFences(rest);
        }
        return { content: content, summary: summary, status: adrLampStatusBlocksText(blocks) };
    }

    async function adrLampRewrite() {
        if (adrLampRun.busy) { adrLampStatus("小红霞还在说，先听完或点「打断」", "#d6b177"); return false; }
        if (adrLampIsGossip()) { adrLampStatus("蛐蛐模式只聊不改稿；想改这一楼，切到「改稿」模式再说", "#d6b177"); return false; }
        var cfg = adrLampApiCfg("pen");
        if (!cfg.endpoint || !cfg.model) { adrLampStatus("执笔位没有可用的 API：" + adrLampApiNote("pen"), "#d4726a"); return false; }
        var mat = adrLampMaterials();
        if (mat.idx < 0) { adrLampStatus("这把聊天还没有可改的助手楼", "#d4726a"); return false; }
        var state = adrLampState();
        var th = adrLampThread(state, mat.idx, false);
        if (!th || !th.msgs.filter(function (m) { return m.r !== "n"; }).length) { adrLampStatus("先和小红霞聊几句、把要改什么说清楚，再让她改", "#d6b177"); return false; }

        var homeKey = adrDChatKey();
        var cTag = adrLampContentTagName();
        var sTag = adrLampSummaryTagNames()[0];
        var wantSummary = !!mat.origSummary;
        var statusBlocks = Array.isArray(mat.origStatus) ? mat.origStatus.filter(function (b) { return b && b.inner; }) : [];
        var statusTags = statusBlocks.map(function (b) { return b.tag; });
        var wantStatus = statusTags.length > 0;
        var origLen = String(mat.body || "").length;
        var fmt = "输出格式：正文放在 <" + cTag + ">…</" + cTag + "> 里";
        if (wantSummary) fmt += "；然后给 <" + sTag + ">…</" + sTag + "> 新摘要";
        if (wantStatus) fmt += "；然后给新状态栏：" + statusTags.map(function (t) { return "<" + t + ">…</" + t + ">"; }).join("、");
        fmt += "。标签外不要有任何字。";
        var task = [
            "【讨论记录 · 读者与小红霞】",
            adrLampTranscript(th.msgs)
        ];
        if (wantSummary) task.push("", "【本篇原摘要 · 改后要跟着重写，写法和长短照它】", mat.origSummary);
        if (wantStatus) task.push("", "【本篇原状态栏 · 改后逐项对照正文更新，格式照它】", adrLampStatusBlocksText(statusBlocks));
        task.push(
            "",
            "【任务】",
            "按讨论定下的改法，把本篇（#" + mat.idx + "）改好，交整楼全文：要改的地方照讨论改，没说要改的地方逐字照抄。",
            "原文正文 " + origLen + " 字。读者对字数有要求就照办；没有要求，改后的篇幅和原文基本持平。"
        );
        if (wantSummary || wantStatus) {
            task.push("正文改了，" + [wantSummary ? "摘要" : "", wantStatus ? "状态栏" : ""].filter(Boolean).join("和") + "也要跟着对上、一起交回："
                + (wantSummary ? "摘要按改后的正文重写。" : "")
                + (wantStatus ? "状态栏里因为这次改动而变了的项改掉，没变的项原样照抄，项目、顺序、格式、符号都照原状态栏。" : ""));
        }
        task.push(fmt);
        task = task.join("\n");
        var messages = [
            { role: "system", content: ADR_LAMP_PEN_PRESET + "\n\n" + adrHxStance("pen") },
            { role: "user", content: adrLampMaterialsText(mat) + "\n\n" + task }
        ];

        adrLampRun = { busy: true, abort: null, mode: "pen", idx: mat.idx };
        adrLampLiveText = "";
        adrLampSetButtons();
        adrLampRenderThread();
        adrLampStatus("执笔位在改…（" + adrLampApiNote("pen") + "）", "#8ed99d");
        var ok = false;
        try {
            var raw = await adrDChatCompletionText({
                endpoint: cfg.endpoint, key: cfg.key, model: cfg.model, temperature: adrLampTemp(), messages: messages,
                onAbortable: function (fn) { adrLampRun.abort = fn; },
                onProgress: function (chars, thought) {
                    var now = Date.now();
                    if (now - adrLampLivePaintAt < 200) return;
                    adrLampLivePaintAt = now;
                    adrLampStatus(chars > 0 ? "执笔位在改…已收到 " + chars + " 字" : (thought > 0 ? "执笔位在想（" + thought + " 字）…" : "等执笔位开口…"), "#8ed99d");
                }
            });
            if (adrDChatKey() !== homeKey) { adrLampStatus("中途换了聊天，这份改稿没存", "#d6b177"); return false; }
            var parsed = adrLampParsePen(raw, wantSummary, statusTags);
            if (!parsed.content) throw new Error("执笔位没给出正文");
            var st2 = adrLampState();
            var th2 = adrLampThread(st2, mat.idx, true);
            th2.draft = { content: parsed.content, summary: parsed.summary, status: parsed.status, base: mat.body, at: Date.now() };
            // 摘要、状态栏有没有一起交回：交了的预览里看得到，没交的替换时那一块保持原样——得让读者知道，免得正文新、摘要旧
            var got = [], missing = [];
            if (wantSummary) (parsed.summary ? got : missing).push("摘要");
            if (wantStatus) (parsed.status ? got : missing).push("状态栏");
            var partNote = (got.length ? "，" + got.join("和") + "也一起改了" : "")
                + (missing.length ? "\n她这次没交回新的" + missing.join("和") + "：替换时那一块会保持原样。想一起更新，跟她说一声「" + missing.join("和") + "也改一下」再让她改一次。" : "");
            // 字数摆出来：没让扩也没让删、篇幅却差得多，多半是只交了改的那一段——替换前让读者自己看一眼
            var newLen = String(parsed.content || "").length;
            var lenNote = "原文 " + origLen + " 字 → 改后 " + newLen + " 字";
            var lenOff = origLen > 0 && (newLen < origLen * 0.6 || newLen > origLen * 1.6);
            th2.msgs.push({ r: "n", t: "改好了一版，在下面的「改稿」里（" + lenNote + "）" + (got.length ? partNote.split("\n")[0] : "") + "。看看预览，改两笔也行，满意就「替换这篇」。"
                + (missing.length ? "\n" + partNote.split("\n").slice(1).join("\n") : "")
                + (lenOff ? "\n篇幅和原文差得多：如果不是你要她扩写或删减，可能只交了改的那一段，别急着替换，让她重改一次。" : ""), at: Date.now() });
            th2.at = Date.now();
            adrLampSaveState(st2);
            adrLampStatus("改好了 ✓ 预览在「改稿」里 · " + lenNote + (got.length ? " · " + got.join("、") + "也改了" : "") + (lenOff ? " · 篇幅差得多，替换前看一眼" : "") + (missing.length ? " · 没交回新" + missing.join("、") + "，替换时那块不动" : ""), (lenOff || missing.length) ? "#d6a26a" : "#8ed99d");
            ok = true;
        } catch (e) {
            if (adrDChatKey() !== homeKey) { adrLampStatus("中途换了聊天，这份改稿没存", "#d6b177"); return false; }
            if (e && e.name === "LampAbort") adrLampStatus("改稿打断了", "#d6b177");
            else adrLampStatus("改稿失败：" + (e && e.message ? e.message : String(e)), "#d4726a");
        } finally {
            adrLampRun = { busy: false, abort: null, mode: "", idx: -1 };
            adrLampSetButtons();
            adrLampRenderThread();
        }
        return ok;
    }

    // ---- 替换：只换标签里面；无标签的楼整楼换但导演稿/图标记留着；原版存前一页 swipe ----
    function adrLampSplitTail(src) {
        var tails = [];
        var body = String(src || "");
        [
            /image###[\s\S]*?###/g,
            /<!--ARREBOL_DIRECTOR_START-->[\s\S]*?<!--ARREBOL_DIRECTOR_END-->/g,
            /<!--\s*ARREBOL_D_START:(?:emotion|plot)\s*-->[\s\S]*?<!--\s*ARREBOL_D_END:(?:emotion|plot)\s*-->/g,
            /<!--\s*ARREBOL_D_START:(?:emotion|plot)[\s\S]*?ARREBOL_D_END:(?:emotion|plot)\s*-->/g,
            /<details[^>]*class=["']arrebol-d-(?:injection|card|theater)["'][^>]*>[\s\S]*?<\/details>/g,
            /\n?arrebol_d(?:_visible)?(?::(?:emotion|plot))?###[\s\S]*?###/g
        ].forEach(function (re) {
            body = body.replace(re, function (x) { tails.push(String(x).trim()); return ""; });
        });
        return { body: body.trim(), tail: tails.join("\n\n") };
    }

    function adrLampReplaceInner(src, match, inner) {
        var whole = match[0];
        var open = whole.slice(0, whole.indexOf(">") + 1);
        var close = "</" + match[1] + ">";
        var old = String(match[2] || "");
        var lead = /^\s*\n/.test(old) ? "\n" : "";
        var trail = /\n\s*$/.test(old) ? "\n" : "";
        return src.slice(0, match.index) + open + lead + inner.trim() + trail + close + src.slice(match.index + whole.length);
    }

    function adrLampComposeFloor(mes, content, summary, statusText) {
        var src = String(mes || "");
        var re = adrDContentTagRegex();
        var first = null, others = [], mm;
        while ((mm = re.exec(src)) !== null) { if (!first) first = mm; else others.push(mm); }
        var out;
        if (first) {
            var s = src;
            for (var k = others.length - 1; k >= 0; k--) s = s.slice(0, others[k].index) + s.slice(others[k].index + others[k][0].length);
            out = adrLampReplaceInner(s, first, content);
        } else {
            var split = adrLampSplitTail(src);
            out = String(content || "").trim() + (split.tail ? "\n\n" + split.tail : "");
        }
        if (summary && String(summary).trim()) {
            var sre = adrLampSummaryRegex();
            var sm = sre.exec(out);
            if (sm) out = adrLampReplaceInner(out, sm, summary);
        }
        // v1.46.1 状态栏：预览框里是带标签的文本，按标签名对号换进楼里对应那一块的里面（开标签上的属性、首尾换行习惯都留着）
        if (statusText && String(statusText).trim()) {
            adrLampExtractStatusBlocks(statusText).forEach(function (b) {
                if (!b.inner) return;
                var mo = adrLampTagRegex([b.tag]).exec(out);
                if (mo) out = adrLampReplaceInner(out, mo, b.inner);
            });
        }
        return out;
    }

    function adrLampPushSwipe(m, newMes) {
        var old = String(m.mes || "");
        if (!Array.isArray(m.swipes) || !m.swipes.length) { m.swipes = [old]; m.swipe_id = 0; }
        else {
            var sid = Number(m.swipe_id);
            if (!Number.isFinite(sid) || sid < 0 || sid >= m.swipes.length) sid = m.swipes.length - 1;
            m.swipes[sid] = old;
            m.swipe_id = sid;
        }
        if (Array.isArray(m.swipe_info)) {
            while (m.swipe_info.length < m.swipes.length) m.swipe_info.push({});
            var base = m.swipe_info[m.swipe_id] || {};
            var copy = { send_date: base.send_date, gen_started: base.gen_started, gen_finished: base.gen_finished, extra: {} };
            try { copy.extra = base.extra ? JSON.parse(JSON.stringify(base.extra)) : {}; } catch (e) { copy.extra = {}; }
            m.swipe_info.push(copy);
        }
        m.swipes.push(newMes);
        m.swipe_id = m.swipes.length - 1;
        m.mes = newMes;
    }

    function adrLampDraftFromFields(th) {
        var d = th && th.draft ? th.draft : null;
        if (!d) return null;
        var c = qForm("adr044-lamp-draft");
        var s = qForm("adr044-lamp-draft-summary");
        var t = qForm("adr044-lamp-draft-status");
        return { content: c && String(c.value || "").trim() ? String(c.value) : d.content, summary: s ? String(s.value || "") : d.summary, status: t ? String(t.value || "") : (d.status || ""), base: d.base, at: d.at };
    }

    function adrLampApplyDraftNow() {
        var idx = adrLampTargetFloor();
        var state = adrLampState();
        var th = adrLampThread(state, idx, false);
        var draft = adrLampDraftFromFields(th);
        if (!draft || !String(draft.content || "").trim()) { adrLampStatus("没有改稿可替换，先点「改好给我」", "#d4726a"); return false; }
        if (adrDGenerationLooksLive()) { adrLampStatus("这一楼还在生成，等写完再替换", "#d6b177"); return false; }
        var chat = adrLampChat();
        var m = chat[idx];
        if (!m || adrLampIsUser(m)) { adrLampStatus("找不到这一楼了（#" + idx + "）", "#d4726a"); return false; }
        var cur = adrLampExtractBody(m.mes);
        if (draft.base && cur.text !== draft.base) {
            adrLampStatus("这一楼的正文和改稿时不一样了（被改过或翻页了），重新「改好给我」一次再替换", "#d4726a");
            return false;
        }
        var oldMes = String(m.mes || "");
        var newMes = adrLampComposeFloor(m.mes, draft.content, draft.summary, draft.status);
        // 这次实际换了哪几块（摘要、状态栏有没有跟着换），提示里说清楚
        var parts = ["正文"];
        if (adrLampExtractSummary(newMes) !== adrLampExtractSummary(oldMes)) parts.push("摘要");
        if (adrLampStatusBlocksText(adrLampExtractStatusBlocks(newMes)) !== adrLampStatusBlocksText(adrLampExtractStatusBlocks(oldMes))) parts.push("状态栏");
        adrLampPushSwipe(m, newMes);
        adrLampAcknowledgeOwnWrite();
        adrDNoteRedraw(idx);
        th.draft = null;
        var note = { r: "n", t: "已替换 #" + idx + " 的" + parts.join("、") + "；原版留在左边一页，向左一划就回来。", at: Date.now() };
        if (settings().lampResetAfterApply !== false) {
            // v1.39.1：这一楼改完了，这轮讨论连同来龙去脉一起归档。下一次开口是新的指令，
            // 执笔位不会把已经落地的结论再执行一遍，素材里的本篇也已经是替换后的正文。
            note.t += " 这轮对话已清空，下一次从头说。";
            th.msgs = [note];
        } else {
            th.msgs.push(note);
        }
        th.at = Date.now();
        adrLampSaveState(state);
        adrLampStatus("替换中，等酒馆存盘…", "#8ed99d");
        adrDSaveThenRedrawAfterInject().then(function () {
            adrLampStatus("替换完成 ✓ 原版在左边一页", "#8ed99d");
            adrLampRefreshAll();
        }).catch(function (e) {
            adrLampStatus("楼里已改，但聊天保存没确认：" + (e && e.message ? e.message : String(e)), "#d4726a");
            adrLampRefreshAll();
        });
        adrLampRenderThread();
        return true;
    }

    // 替换会改最后一楼的字数。v1.38.5 的楼层脉搏把"同一楼字数变了"当成还在生成的证据，
    // 会让这 4 秒内的第二次替换、以及导演的检查白等一拍。这一笔是我们自己写的，当场采样并把"长过"的证据抹掉。
    function adrLampAcknowledgeOwnWrite() {
        try {
            var before = adrDFloorPulseState.grewAt;
            adrDFloorPulse();
            adrDFloorPulseState.grewAt = before;
        } catch (e) {}
    }

    function adrLampApply(btn) {
        return adrDTwoStepConfirm("lamp-apply", btn || qForm("adr044-lamp-apply"), "确定替换？", "再点一次确认替换这篇（原版留前一页）",
            function (msg) { adrLampStatus(msg, "#d6a26a"); },
            function () { adrLampApplyDraftNow(); });
    }

    function adrLampDiscardDraft() {
        var state = adrLampState();
        var th = adrLampThread(state, adrLampTargetFloor(), false);
        if (!th || !th.draft) { adrLampStatus("没有改稿", "#d6b177"); return false; }
        th.draft = null;
        th.msgs.push({ r: "n", t: "这版改稿扔了。", at: Date.now() });
        adrLampSaveState(state);
        adrLampRenderThread();
        adrLampStatus("改稿扔了", "#8ed99d");
        return true;
    }

    function adrLampSaveDraftEdits() {
        try {
            var state = adrLampState();
            var th = adrLampThread(state, adrLampTargetFloor(), false);
            if (!th || !th.draft) return;
            var d = adrLampDraftFromFields(th);
            if (!d) return;
            th.draft.content = d.content;
            th.draft.summary = d.summary;
            th.draft.status = d.status;
            adrLampSaveState(state);
        } catch (e) {}
    }

    // ---- 楼号 ----
    function adrLampSetFloor(v) {
        var state = adrLampState();
        var n = Number(v);
        state.floor = (String(v).trim() === "" || !Number.isFinite(n) || n < 0) ? -1 : Math.floor(n);
        adrLampSaveState(state);
        adrLampRefreshAll();
    }

    async function adrLampTestConnection(which) {
        var cfg = adrLampApiCfg(which);
        var key = which === "pen" ? "pen" : "lamp";
        if (!cfg.endpoint || !cfg.model) { status(key, "地址或模型空着：" + adrLampApiNote(which), "#d4726a"); return false; }
        status(key, "测试中…", "#8ed99d");
        try {
            var out = await adrDChatCompletionText({ endpoint: cfg.endpoint, key: cfg.key, model: cfg.model, temperature: 0, maxTokens: 200, stream: false,
                messages: [{ role: "user", content: "只回一个字：在" }] });
            status(key, "通了 ✓ " + adrLampApiNote(which) + " 回：" + adrCdTruncate(String(out || "").trim(), 20), "#8ed99d");
            return true;
        } catch (e) {
            status(key, "不通：" + (e && e.message ? e.message : String(e)), "#d4726a");
            return false;
        }
    }



    // v1.41.3 蛐蛐小窗不自动关：看完点「朕已阅」。没看的排队，一条条看；导演的提示若插进来，关掉后把没看完的再摆回来。
    var adrLampQuipQueue = [];
    var ADR_LAMP_QUIP_QUEUE_MAX = 10;

    function adrLampQuipPopupShow() {
        try {
            var d = rootDoc();
            if (!d || !d.body) return;
            var box = d.getElementById("adr044-auto-trigger-popup");
            if (!adrLampQuipQueue.length) {
                if (box && box.getAttribute("data-kind") === "quip" && box.parentNode) box.parentNode.removeChild(box);
                return;
            }
            // 导演的提示正占着位（非 quip），不抢；它关掉时会来叫我们
            if (box && box.getAttribute("data-kind") !== "quip") return;
            if (!box) {
                box = d.createElement("div");
                box.id = "adr044-auto-trigger-popup";
                box.setAttribute("role", "status");
                box.setAttribute("aria-live", "polite");
                d.body.appendChild(box);
            }
            var cur = adrLampQuipQueue[0];
            var rest = adrLampQuipQueue.length - 1;
            box.setAttribute("data-kind", "quip");
            box.innerHTML = ''
                + '<div class="adr044-auto-trigger-popup-title">' + esc("🍉 小红霞蛐蛐 · #" + cur.idx) + '</div>'
                + '<div class="adr044-auto-trigger-popup-text">' + esc(cur.text) + '</div>'
                + '<button type="button" id="adr044-lamp-quip-ack" class="adr044-lamp-quip-ack">朕已阅' + (rest > 0 ? '（还有 ' + rest + ' 条）' : '') + '</button>';
            box.setAttribute("data-open", "1");
        } catch (e) {}
    }

    function adrLampQuipPush(idx, text) {
        adrLampQuipQueue.push({ idx: idx, text: String(text || "") });
        while (adrLampQuipQueue.length > ADR_LAMP_QUIP_QUEUE_MAX) adrLampQuipQueue.shift();
        adrLampQuipPopupShow();
    }

    function adrLampQuipAck() {
        adrLampQuipQueue.shift();
        adrLampQuipPopupShow();
        return true;
    }

    // ---- v1.41.0 自动蛐蛐：新楼落地，她自己刷到更新似的随手发一条，弹个小窗；写进蛐蛐账，你能接着回 ----
    var ADR_LAMP_QUIP_ASK = "【自动蛐蛐】刚落地一楼，你随手发一条：一段话，60 字以内，像朋友刷到更新时的第一反应——吐槽主角也好、押下一步也好、替谁不值也好。只这一段，不问候、不列点、不复述剧情。";
    var adrLampQuipState = { lastSig: "", busy: false, timer: null };

    function adrLampAutoQuipEnabled() {
        try { return settings().lampAutoQuip === true && adrDMasterEnabled(); } catch (e) { return false; }
    }

    function adrLampFloorSig(chat, idx) {
        var m = chat[idx];
        var body = m ? adrLampExtractBody(m.mes).text : "";
        return adrDChatKey() + "#" + idx + ":" + body.length + ":" + body.slice(0, 40);
    }

    // MESSAGE_RECEIVED 进门：不读楼、不发请求，只排一拍；真正干活在 adrLampAutoQuipNow
    function adrLampAutoQuipOnMessage() {
        try {
            if (!adrLampAutoQuipEnabled()) return;
            if (adrLampQuipState.timer) clearTimeout(adrLampQuipState.timer);
            adrLampQuipState.timer = setTimeout(function () {
                adrLampQuipState.timer = null;
                adrLampAutoQuipNow("message-received").catch(function (e) { try { console.warn("[Arrebol D] auto quip failed", e); } catch (e2) {} });
            }, 900);
        } catch (e) {}
    }

    async function adrLampAutoQuipNow(reason, force) {
        if (!force && !adrLampAutoQuipEnabled()) return false;
        if (adrLampQuipState.busy) { if (force) adrLampStatus("上一句蛐蛐还在路上", "#d6b177"); return false; }
        var cfg = adrLampApiCfg("lamp");
        if (!cfg.endpoint || !cfg.model) return false;
        var homeKey = adrDChatKey();
        adrLampQuipState.busy = true;
        try {
            // 楼还在出字就等（导演同款证据），最多等 2 分钟；换了聊天就作废
            await adrDWaitForGenerationIdle(120000);
            if (adrDChatKey() !== homeKey) return false;
            // 掌灯正在替用户说话就让一让，最多让 60 秒
            var waited = 0;
            while (adrLampRun.busy && waited < 60000) { await new Promise(function (r) { setTimeout(r, 1500); }); waited += 1500; }
            if (adrLampRun.busy || adrDChatKey() !== homeKey) return false;

            var chat = adrLampChat();
            var idx = findLastMessageIndex(chat);
            if (idx < 0) return false;
            var sig = adrLampFloorSig(chat, idx);
            if (!force && sig === adrLampQuipState.lastSig) return false;   // 这一版的这一楼已经蛐蛐过（重 roll 算新一版）；手动点的不管
            adrLampQuipState.lastSig = sig;
            if (force) adrLampStatus("她在看 #" + idx + "…", "#8ed99d");

            var mat = adrLampMaterialsAt(idx);
            if (!mat.body) return false;
            var state = adrLampState();
            var history = adrLampApiHistory(state.gossip.msgs.concat([{ r: "u", t: ADR_LAMP_QUIP_ASK, f: idx, at: Date.now() }]), true);
            var messages = [{ role: "system", content: adrLampGossipPresetText() + "\n\n" + adrHxStance("chat") + "\n\n" + adrLampMaterialsText(mat) }].concat(history);
            // v1.42.0 不设 max_tokens：会思考的模型把配额先花在思考上，400 一到正文为空，自动蛐蛐就"不触发"
            var out = await adrDChatCompletionText({ endpoint: cfg.endpoint, key: cfg.key, model: cfg.model, temperature: adrLampTemp(), messages: messages });
            var quip = String(out || "").trim();
            if (!quip) return false;
            if (adrDChatKey() !== homeKey) return false;

            var st2 = adrLampState();
            st2.gossip.msgs.push({ r: "n", t: "📍 #" + idx + " 落地，她自己蛐蛐了一句", at: Date.now(), f: idx });
            st2.gossip.msgs.push({ r: "a", t: quip, at: Date.now(), f: idx, auto: true });
            while (st2.gossip.msgs.length > ADR_LAMP_GOSSIP_MAX) st2.gossip.msgs.shift();
            st2.gossip.at = Date.now();
            adrLampSaveState(st2);
            try { adrLampQuipPush(idx, quip); } catch (ePop) {}   // v1.41.3 不自动关，点「朕已阅」
            try { adrLampRenderThread(); } catch (eR) {}
            try { adrLampStatus("🍉 #" + idx + " 蛐蛐了一句 ✓ 在上面", "#8ed99d"); } catch (eSt) {}   // v1.42.1 别让「她在看…」一直挂着
            try { console.log("[Arrebol D] auto quip #" + idx + " (" + (reason || "") + ")"); } catch (eL) {}
            return true;
        } catch (e) {
            // v1.42.0 失败不再只在状态行说一句——写进蛐蛐账一行记录，画面上看得见为什么没来
            var why = e && e.message ? e.message : String(e);
            try { adrLampStatus("自动蛐蛐没发出来：" + why, "#d4726a"); } catch (eS) {}
            try {
                if (adrDChatKey() === homeKey) {
                    var stE = adrLampState();
                    stE.gossip.msgs.push({ r: "n", t: "📵 这句蛐蛐没发出来：" + adrCdTruncate(why, 160), at: Date.now() });
                    adrLampSaveState(stE);
                    adrLampRenderThread();
                }
            } catch (eN) {}
            return false;
        } finally {
            adrLampQuipState.busy = false;
        }
    }

    // ---- 画面 ----
    function adrLampBubble(m) {
        var who = m.r === "u" ? "你" : (m.auto ? "小红霞 · 自动" : "小红霞");
        if (m.r === "n") return '<div class="adr-lamp-msg n">' + esc(m.t) + '</div>';
        return '<div class="adr-lamp-msg ' + m.r + '"><span class="adr-lamp-who">' + who + '</span>' + esc(m.t) + '</div>';
    }

    function adrLampRenderThread() {
        try {
            var d = rootDoc();
            var gossip = adrLampIsGossip();
            var idx = adrLampTargetFloor();
            var state = adrLampState();
            var th = gossip ? state.gossip : adrLampThread(state, idx, false);
            var msgs = th ? th.msgs : [];
            var html = "";
            if (!msgs.length) {
                html = '<div class="adr-lamp-empty">' + (idx < 0 ? "这把聊天还没有可聊的助手楼。"
                    : (gossip ? "剧情到 #" + idx + " 了。蛐蛐两句？主角这楼干的事、配角的下场、你押谁——她都接得住，而且记仇。"
                        : "对着 #" + idx + " 说点什么——哪里不对、哪里想改、哪里看着别扭。小红霞看得见上面那三块素材。")) + '</div>';
            } else {
                // 蛐蛐模式按楼号打分隔线，一眼看出这段话是追到哪一楼时聊的
                var lastF = -1;
                msgs.forEach(function (m) {
                    if (gossip && m.r !== "n") {
                        var f = Number.isFinite(Number(m.f)) ? Number(m.f) : -1;
                        if (f >= 0 && f !== lastF) { html += '<div class="adr-lamp-divider">📍 #' + f + '</div>'; lastF = f; }
                    }
                    html += adrLampBubble(m);
                });
                if (gossip && idx >= 0 && lastF >= 0 && idx > lastF && !adrLampRun.busy) html += '<div class="adr-lamp-divider adr-lamp-divider-new">📍 剧情走到 #' + idx + ' 了，下一句她就能看到</div>';
            }
            if (adrLampRun.busy && adrLampRun.mode === "chat") {
                html += '<div class="adr-lamp-msg a adr-lamp-live"><span class="adr-lamp-who">小红霞</span>' + esc(adrLampLiveText || "") + '</div>';
            }
            Array.prototype.slice.call(d.querySelectorAll("#adr044-lamp-thread")).forEach(function (el) {
                el.innerHTML = html;
                try { el.scrollTop = el.scrollHeight; } catch (eS) {}
            });
            var draft = th && th.draft ? th.draft : null;
            Array.prototype.slice.call(d.querySelectorAll("#adr044-lamp-draft-wrap")).forEach(function (el) {
                el.classList.toggle("adr-lamp-hide", !draft);
            });
            if (draft) {
                adrCdSetValueSafe("adr044-lamp-draft", draft.content);
                adrCdSetValueSafe("adr044-lamp-draft-summary", draft.summary || "");
                adrCdSetValueSafe("adr044-lamp-draft-status", draft.status || "");
            }
            Array.prototype.slice.call(d.querySelectorAll("#adr044-lamp-draft-summary-wrap")).forEach(function (el) {
                el.classList.toggle("adr-lamp-hide", !(draft && draft.summary));
            });
            Array.prototype.slice.call(d.querySelectorAll("#adr044-lamp-draft-status-wrap")).forEach(function (el) {
                el.classList.toggle("adr-lamp-hide", !(draft && draft.status));
            });
            adrCdSetTextAll("adr044-lamp-topline", adrLampTopLineText(idx, msgs, draft, gossip));
        } catch (e) {
            try { console.warn("[Arrebol D] lamp render failed", e); } catch (e2) {}
        }
    }

    function adrLampTopLineText(idx, msgs, draft, gossip) {
        if (idx < 0) return "🏮 掌灯 · 没有可聊的楼";
        var said = msgs.filter(function (m) { return m.r !== "n"; }).length;
        if (gossip) return "🏮 蛐蛐 · 剧情到 #" + idx + (said ? " · 聊了 " + said + " 句" : " · 还没开口");
        return "🏮 掌灯 · 对着 #" + idx + (said ? " · 聊了 " + said + " 句" : " · 还没开口") + (draft ? " · 有一版改稿待看" : "");
    }

    function adrLampPaintLive(text, chars, thought) {
        adrLampLiveText = text || "";
        var now = Date.now();
        if (now - adrLampLivePaintAt < 120) return;
        adrLampLivePaintAt = now;
        try {
            Array.prototype.slice.call(rootDoc().querySelectorAll("#adr044-lamp-thread .adr-lamp-live")).forEach(function (el) {
                el.innerHTML = '<span class="adr-lamp-who">小红霞</span>' + esc(adrLampLiveText);
                try { var box = el.parentNode; if (box) box.scrollTop = box.scrollHeight; } catch (eS) {}
            });
        } catch (e) {}
        adrLampStatus(chars > 0 ? "小红霞在说…已收到 " + chars + " 字" : (thought > 0 ? "小红霞在想（" + thought + " 字）…" : "等小红霞开口…"), "#8ed99d");
    }

    function adrLampRefreshMaterials() {
        try {
            var mat = adrLampMaterials();
            var title = mat.idx < 0 ? "没有可聊的楼"
                : "#" + mat.idx + " · " + (mat.bodyTagged ? "正文标签里 " : "整楼当正文 ") + mat.body.length + " 字 · 摘要读了 " + mat.summaryFloors + " 楼" + (mat.hiddenFloors ? "，跳过隐藏 " + mat.hiddenFloors + " 楼" : "") + (mat.origSummary ? " · 本篇有摘要标签" : " · 本篇无摘要标签")
                    + (mat.origStatus && mat.origStatus.length ? " · 有状态栏标签（" + mat.origStatus.map(function (b) { return b.tag; }).join("、") + "）" : (adrLampStatusTagNames().length ? " · 没找到状态栏标签" : ""));
            adrCdSetTextAll("adr044-lamp-mat-title", title);
            adrCdSetTextAll("adr044-lamp-mat-body", mat.body);
            adrCdSetTextAll("adr044-lamp-mat-summary", mat.summary);
            adrCdSetTextAll("adr044-lamp-mat-card", (mat.tone ? "【这局的基调】\n" + mat.tone + "\n\n" : "") + mat.card);
            adrCdSetValueSafe("adr044-lamp-floor", mat.idx >= 0 && Number(adrLampState().floor) >= 0 ? String(mat.idx) : "");
        } catch (e) {}
    }

    function adrLampSetButtons() {
        try {
            var busy = !!adrLampRun.busy;
            var d = rootDoc();
            ["adr044-lamp-send", "adr044-lamp-rewrite", "adr044-lamp-apply"].forEach(function (id) {
                Array.prototype.slice.call(d.querySelectorAll("#" + id)).forEach(function (el) { el.disabled = busy; });
            });
            Array.prototype.slice.call(d.querySelectorAll("#adr044-lamp-stop")).forEach(function (el) { el.disabled = !busy; });
        } catch (e) {}
    }

    function adrLampRefreshPanelFields() {
        try {
            var st = settings();
            adrCdSetValueSafe("adr044-lamp-summary-tags", st.lampSummaryTags || "report");
            adrCdSetValueSafe("adr044-lamp-status-tags", adrLampStatusTagsRaw());
            adrCdSetValueSafe("adr044-lamp-summary-floors", String(adrLampSummaryFloors()));
            adrCdSetValueSafe("adr044-lamp-temp", String(adrLampTemp()));
            adrCdSetValueSafe("adr044-lamp-borrow", st.lampBorrow || "plot");
            adrCdSetValueSafe("adr044-pen-borrow", st.penBorrow || "lamp");
            ["lamp", "pen"].forEach(function (p) {
                adrCdSetValueSafe("adr044-" + p + "-endpoint", st[p + "ApiEndpoint"] || "");
                adrCdSetValueSafe("adr044-" + p + "-key", st[p + "ApiKey"] || "");
                adrCdSetValueSafe("adr044-" + p + "-model", st[p + "Model"] || "");
            });
            adrCdSetValueSafe("adr044-lamp-preset", st.lampPreset || "");
            adrCdSetValueSafe("adr044-lamp-gossip-preset", st.lampGossipPreset || "");
            adrCdSetCheckedSafe("adr044-lamp-reset-after-apply", st.lampResetAfterApply !== false);
            adrCdSetCheckedSafe("adr044-lamp-auto-quip", st.lampAutoQuip === true);
            adrLampToggleSelfBlocks();
            adrLampApplyModeUI();
            adrCdSetTextAll("adr044-lamp-api-note", adrLampApiNote("lamp") + "　｜　" + adrLampApiNote("pen"));
            adrHxApiRefresh("lamp"); adrHxApiRefresh("pen");
        } catch (e) {}
    }

    // 模式切换只动显隐与文案，不重建 DOM：楼号行、改好给我、自动清空是改稿专属；蛐蛐模式输入框换提示语
    function adrLampApplyModeUI() {
        try {
            var gossip = adrLampIsGossip();
            var d = rootDoc();
            Array.prototype.slice.call(d.querySelectorAll(".adr-lamp-edit-only")).forEach(function (el) { el.classList.toggle("adr-lamp-hide", gossip); });
            Array.prototype.slice.call(d.querySelectorAll("#adr044-lamp-mode-edit")).forEach(function (el) { el.classList.toggle("active", !gossip); el.setAttribute("aria-pressed", String(!gossip)); });
            Array.prototype.slice.call(d.querySelectorAll("#adr044-lamp-mode-gossip")).forEach(function (el) { el.classList.toggle("active", gossip); el.setAttribute("aria-pressed", String(gossip)); });
            Array.prototype.slice.call(d.querySelectorAll("#adr044-lamp-input")).forEach(function (el) {
                el.placeholder = gossip ? "蛐蛐两句：主角这楼干的事、配角的下场、你押谁……Ctrl/⌘+Enter 发送" : "哪里不对、哪里想改、哪里看着别扭……Ctrl/⌘+Enter 发送";
            });
            adrCdSetTextAll("adr044-lamp-mode-note", gossip
                ? "蛐蛐：和朋友一起追剧。对话一直留着、跟着剧情一楼一楼走，她记得你押过谁；只聊不改稿。"
                : "改稿：对着一楼聊，聊定了跟她说「改吧」（或点「改好给我」），她改好整楼给你预览、替换；替换后这轮清空，下一楼从头说。");
        } catch (e) {}
    }

    function adrLampToggleSelfBlocks() {
        try {
            var st = settings();
            var d = rootDoc();
            Array.prototype.slice.call(d.querySelectorAll("#adr044-lamp-self")).forEach(function (el) {
                el.classList.toggle("adr-lamp-hide", String(st.lampBorrow || "plot") !== "self");
            });
            Array.prototype.slice.call(d.querySelectorAll("#adr044-pen-self")).forEach(function (el) {
                el.classList.toggle("adr-lamp-hide", String(st.penBorrow || "lamp") !== "self");
            });
        } catch (e) {}
    }

    // v1.43.2 每来一楼就把素材重算一遍、写进两套面板，面板关着也照做，是白烧。
    // 只在掌灯页真在眼前时算：浮窗开着且停在掌灯页，或内嵌抽屉里的掌灯页有版面。不在眼前就记一笔脏，
    // 切到掌灯页、开浮窗、或在抽屉的掌灯页里点第一下时补上。
    var adrLampDirty = false;
    function adrLampInView() {
        try {
            if (settings().activeTab !== "lamp") return false;
            if (adr048IsPopupOpen()) return true;
            var dr = rootDoc().querySelector("#adr044-page-lamp");
            return !!(dr && dr.getClientRects && dr.getClientRects().length);
        } catch (e) { return true; }
    }

    function adrLampRefreshAll() {
        adrLampDirty = false;
        adrLampRefreshMaterials();
        adrLampRenderThread();
        adrLampRefreshPanelFields();
        adrLampSetButtons();
    }

    function adrLampOnChatChanged() {
        if (adrLampRun.busy && typeof adrLampRun.abort === "function") { try { adrLampRun.abort(); } catch (e) {} }
        adrLampRefreshAll();
    }

    // ---- HTML ----
    function adrLampPageInnerHTML(secOpen, secClose, checkClass, actionsClass) {
        var st = settings();
        var noteClass = checkClass === "adr048-check" ? "adr048-note" : "adr044-note";
        function borrowOpts(cur, withLamp) {
            var h = "";
            if (withLamp) h += opt(cur, "lamp", "和聊天位一样");
            h += opt(cur, "plot", "借统筹的") + opt(cur, "emotion", "借情感导演的") + opt(cur, "expand", "借展开的") + opt(cur, "cd", "借小眼睛的") + opt(cur, "self", "自己填");
            return h;
        }
        function apiFields(p, label) {
            return '<div id="adr044-' + p + '-self" class="adr-lamp-hide">'
                + '<label>' + label + ' API 地址</label><input type="text" id="adr044-' + p + '-endpoint" value="' + esc(st[p + "ApiEndpoint"] || "") + '" placeholder="https://api.example.com/v1">'
                + '<label>' + label + ' API 密钥</label><input type="password" id="adr044-' + p + '-key" value="' + esc(st[p + "ApiKey"] || "") + '" placeholder="sk-...">'
                + '<label>' + label + '模型</label><input type="text" id="adr044-' + p + '-model" value="' + esc(st[p + "Model"] || "") + '" placeholder="可以手填，或加载模型">'
                + '<select id="adr044-' + p + '-model-select"><option value="">加载后在此选择模型</option></select>'
                + '<div class="' + actionsClass + '"><button id="adr044-' + p + '-load-models" type="button">加载模型</button><button id="adr044-' + p + '-test" type="button">测试连接</button></div>'
                + '</div>'
                + '<div class="adr044-template-status" id="adr044-' + p + '-status"></div>';
        }
        var gossip = adrLampIsGossip();
        return '<div class="adr-lamp-modes" role="group" aria-label="掌灯模式">'
            + '<button type="button" id="adr044-lamp-mode-edit" class="' + (gossip ? "" : "active") + '" aria-pressed="' + (!gossip) + '">✏️ 改稿</button>'
            + '<button type="button" id="adr044-lamp-mode-gossip" class="' + (gossip ? "active" : "") + '" aria-pressed="' + gossip + '">🍉 蛐蛐</button>'
            + '</div>'
            + '<div class="' + noteClass + '" id="adr044-lamp-mode-note"></div>'
            + secOpen("🏮 本篇 · 她看得见的素材", false, "lamp-mat")
            + '<div class="' + noteClass + '">掌灯不是导演：不数楼、不自动触发、不投卡，你点她才开口。她读的就是下面这三块，一字不多。</div>'
            + '<div class="adr-lamp-edit-only' + (gossip ? " adr-lamp-hide" : "") + '"><label>聊哪一楼（酒馆楼号 #；空着＝最新一楼助手正文）</label>'
            + '<div class="adr-lamp-row"><input type="number" id="adr044-lamp-floor" min="0" placeholder="最新" value="' + (Number(adrLampState().floor) >= 0 ? esc(String(adrLampState().floor)) : "") + '">'
            + '<button id="adr044-lamp-floor-latest" type="button">最新一楼</button><button id="adr044-lamp-refresh" type="button">重新读取</button></div></div>'
            + '<div class="adr-lamp-topline" id="adr044-lamp-mat-title">…</div>'
            + '<details class="adr-lamp-fold" open><summary>本篇原文</summary><div class="adr-lamp-mat" id="adr044-lamp-mat-body"></div></details>'
            + '<details class="adr-lamp-fold"><summary>此前剧情 · 未隐藏楼层的摘要</summary><div class="adr-lamp-mat" id="adr044-lamp-mat-summary"></div></details>'
            + '<details class="adr-lamp-fold"><summary>基调 · 角色卡 · 世界书 · 人设</summary><div class="adr-lamp-mat" id="adr044-lamp-mat-card"></div></details>'
            + '<label>摘要标签名（主模型每楼写摘要用的标签；多个用英文逗号分隔）</label>'
            + '<input type="text" id="adr044-lamp-summary-tags" placeholder="report" value="' + esc(st.lampSummaryTags || "report") + '">'
            + '<label>状态栏标签名（改稿时状态栏跟着正文一起更新；多个用英文逗号分隔，留空＝不管状态栏）</label>'
            + '<input type="text" id="adr044-lamp-status-tags" placeholder="' + esc(ADR_LAMP_STATUS_TAGS_DEFAULT) + '" value="' + esc(adrLampStatusTagsRaw()) + '">'
            + '<label>往前读多少楼的摘要（默认 0 = 全部未隐藏楼层；想省就填个数）</label>'
            + '<input type="number" id="adr044-lamp-summary-floors" min="0" max="999" value="' + esc(String(adrLampSummaryFloors())) + '">'
            + secClose()

            + secOpen("💬 和小红霞聊", false, "lamp-chat")
            + '<div class="adr-lamp-thread" id="adr044-lamp-thread"></div>'
            + '<div class="adr-lamp-jumprow"><button type="button" id="adr044-lamp-jump-top" class="adr-lamp-jump" title="对话框卷到最早">↑ 回顶</button><button type="button" id="adr044-lamp-jump-bottom" class="adr-lamp-jump" title="对话框卷到最新">↓ 回底</button></div>'   // v1.41.9 只管对话框
            + '<textarea id="adr044-lamp-input" rows="3" placeholder="哪里不对、哪里想改、哪里看着别扭……Ctrl/⌘+Enter 发送"></textarea>'
            // v1.41.1 发送独占一行、做大；打断与清空退到下一行并排，拇指不再按错；改好给我在改稿模式里再单独一行
            + '<div class="' + actionsClass + ' adr-lamp-send-row"><button id="adr044-lamp-send" type="button">发送</button></div>'
            + '<div class="' + actionsClass + '"><button id="adr044-lamp-stop" type="button" disabled>打断</button><button id="adr044-lamp-clear" type="button">清空本轮对话</button></div>'
            + '<div class="' + actionsClass + ' adr-lamp-edit-only' + (gossip ? " adr-lamp-hide" : "") + '"><button id="adr044-lamp-rewrite" type="button" class="adr-lamp-edit-only' + (gossip ? " adr-lamp-hide" : "") + '">改好给我</button></div>'
            + '<label class="' + checkClass + ' adr-lamp-edit-only' + (gossip ? " adr-lamp-hide" : "") + '"><input type="checkbox" id="adr044-lamp-reset-after-apply"' + (st.lampResetAfterApply !== false ? " checked" : "") + '> 替换后自动清空本轮对话（这一楼改完了，下一次从头说）</label>'
            + '<label class="' + checkClass + '"><input type="checkbox" id="adr044-lamp-auto-quip"' + (st.lampAutoQuip === true ? " checked" : "") + '> 🍉 新楼落地自动蛐蛐一句，弹个小窗（走聊天位 API，每楼一次，花钱；写进蛐蛐记录，你能接着回）</label>'
            + '<div class="adr-lamp-jumprow"><button type="button" id="adr044-lamp-quip-now" class="adr-lamp-jump" title="不等新楼，现在就对最新一楼蛐蛐一句">🍉 现在蛐蛐一句</button></div>'
            + '<div class="adr044-template-status" id="adr044-lamp-chat-status">聊到你觉得可以了，直接跟她说「改吧」，或者点「改好给我」：她按讨论把这一楼改好，先预览再替换。</div>'
            + '<div id="adr044-lamp-draft-wrap" class="adr-lamp-hide">'
            + '<label>📝 改稿 · 正文（能改两笔再替换）</label>'
            + '<textarea id="adr044-lamp-draft" rows="10"></textarea>'
            + '<div id="adr044-lamp-draft-summary-wrap" class="adr-lamp-hide"><label>改稿 · 新摘要（原楼有摘要标签才会换）</label><textarea id="adr044-lamp-draft-summary" rows="3"></textarea></div>'
            + '<div id="adr044-lamp-draft-status-wrap" class="adr-lamp-hide"><label>改稿 · 新状态栏（原楼有状态栏标签才会换；标签留着别删）</label><textarea id="adr044-lamp-draft-status" rows="5"></textarea></div>'
            + '<div class="' + actionsClass + '"><button id="adr044-lamp-apply" type="button">替换这篇（原版留前一页）</button><button id="adr044-lamp-draft-discard" type="button">丢弃改稿</button></div>'
            + '<div class="' + noteClass + '">换的是正文标签、摘要标签、状态栏标签的里面（摘要和状态栏跟着正文一起改；她没交回的那一块保持原样）；楼里的变量块、导演稿不动。没有正文标签的楼整楼换，导演稿与图标记挪到末尾保留。原版存成前一页 swipe，向左一划就回来。</div>'
            + '</div>'
            + secClose()

            + secOpen("🔌 API · 聊天位与执笔位", true, "lamp-api")
            + '<div class="' + noteClass + '">聊天位是和你掰扯的那个，执笔位是真正下笔改稿的那个。想让改出来的文风和前后楼一致，执笔位填主聊天用的模型。</div>'
            + '<label>聊天位</label><select id="adr044-lamp-borrow">' + borrowOpts(st.lampBorrow || "plot", false) + '</select>'
            + adrHxApiRowHTML("lamp")
            + apiFields("lamp", "聊天位")
            + '<label>执笔位</label><select id="adr044-pen-borrow">' + borrowOpts(st.penBorrow || "lamp", true) + '</select>'
            + adrHxApiRowHTML("pen")
            + apiFields("pen", "执笔位")
            + '<label>温度（0–2，默认 0.8；聊天与改稿同用）</label><input type="number" id="adr044-lamp-temp" min="0" max="2" step="0.1" value="' + esc(String(adrLampTemp())) + '">'
            + '<div class="adr044-template-status" id="adr044-lamp-api-note"></div>'
            + secClose()

            + secOpen("🎭 小红霞的人设", true, "lamp-preset")
            + '<div class="' + noteClass + '">两种模式各一份性子，不是导演框架，留空用出厂。改稿：审美极高的高级改稿员，不是扮演者；和读者讨论（反对要带依据：人的真实情感心理 / 此刻的物理处境 / 世界书规矩），读者说改就改、改好整楼。蛐蛐：一起追剧的朋友，站队、押注、翻旧账，只聊不改。两份都写明：屏幕前是书外的成年读者（不是剧情里的 user），讨厌低俗、拒绝恶俗；艺术创作也有边界和底线；读者问意见时可以给回复建议。「在聊天里说改吧就自动动笔」的手续和执笔位的规矩由代码接管，不在这里；自己改过改稿人设的，要点「恢复出厂人设」才用得上新版。</div>'
            + '<label>✏️ 改稿模式的人设</label>'
            + '<textarea id="adr044-lamp-preset" rows="6" placeholder="留空＝出厂人设">' + esc(st.lampPreset || "") + '</textarea>'
            + '<div class="' + actionsClass + '"><button id="adr044-lamp-preset-reset" type="button">恢复出厂人设</button></div>'
            + '<details class="adr-lamp-fold"><summary>看看改稿出厂人设全文</summary><div class="adr-lamp-mat">' + esc(ADR_LAMP_PRESET) + '</div></details>'
            + '<label>🍉 蛐蛐模式的人设</label>'
            + '<textarea id="adr044-lamp-gossip-preset" rows="6" placeholder="留空＝出厂人设">' + esc(st.lampGossipPreset || "") + '</textarea>'
            + '<div class="' + actionsClass + '"><button id="adr044-lamp-gossip-preset-reset" type="button">恢复出厂人设</button></div>'
            + '<details class="adr-lamp-fold"><summary>看看蛐蛐出厂人设全文</summary><div class="adr-lamp-mat">' + esc(ADR_LAMP_GOSSIP_PRESET) + '</div></details>'
            + secClose();
    }

    function adrLampPageHTML() {
        var st = settings();
        function secOpen(title, closed, key) { return adrxDrawerStart(key, title, !closed, true); }
        function secClose() { return '</details>'; }
        return '<div class="adr044-page" id="adr044-page-lamp"' + (st.activeTab === "lamp" ? '' : ' style="display:none"') + '>'
            + adrLampPageInnerHTML(secOpen, secClose, "adr044-check", "adr044-actions")
            + '</div>';
    }

    function adrLamp048PageHTML() {
        var st = settings();
        function secOpen(title, closed, key) { return adrxDrawerStart(key, title, !closed, true); }
        function secClose() { return '</details>'; }
        return '<div class="adr048-page" id="adr048-page-lamp"' + (st.activeTab === "lamp" ? '' : ' style="display:none"') + '>'
            + adrLampPageInnerHTML(secOpen, secClose, "adr048-check", "adr048-actions")
            + '</div>';
    }

    // v1.41.9 对话框卷到最新一句。面板刚显示那几拍布局可能还没定（字体、折叠），分三拍卷，卷到为止。
    function adrLampScrollThreadToBottom() {
        var d = rootDoc();
        function go() {
            try {
                Array.prototype.slice.call(d.querySelectorAll("#adr044-lamp-thread")).forEach(function (el) {
                    if (!el.getClientRects || !el.getClientRects().length) return;   // 藏着的那份（另一端）不碰，显示时自有它的一拍
                    el.scrollTop = el.scrollHeight;
                });
            } catch (e) {}
        }
        go();
        setTimeout(go, 120);
        setTimeout(go, 400);
    }

    // 回顶 / 回底只管对话框：回顶卷到最早一句，回底卷到最新一句
    function adrLampJump(where) {
        try {
            var d = rootDoc();
            var nodes = Array.prototype.slice.call(d.querySelectorAll("#adr044-lamp-thread")).filter(function (el) { return el.getClientRects && el.getClientRects().length; });
            if (!nodes.length) return false;
            nodes.forEach(function (el) { el.scrollTop = where === "top" ? 0 : el.scrollHeight; });
            return true;
        } catch (e) { return false; }
    }

    // ---- 绑定 ----
    function adrLampHandleButtonId(id, btn) {
        if (adrHxApiHandleButtonId(id, btn)) return true;   // v1.46.0 聊天位 / 执笔位 / 剧场位的 API 预设「保存」「删除」
        if (id === "adr044-tab-lamp") { switchTab("lamp"); return true; }
        if (id === "adr044-lamp-send") { adrLampSend(); return true; }
        if (id === "adr044-lamp-stop") { adrLampAbort(); return true; }
        if (id === "adr044-lamp-rewrite") { adrLampRewrite(); return true; }
        if (id === "adr044-lamp-clear") { adrLampClear(btn); return true; }
        if (id === "adr044-lamp-apply") { adrLampApply(btn); return true; }
        if (id === "adr044-lamp-draft-discard") { adrLampDiscardDraft(); return true; }
        if (id === "adr044-lamp-refresh") { adrLampRefreshAll(); adrLampStatus("重新读过了", "#8ed99d"); return true; }
        if (id === "adr044-lamp-floor-latest") { adrLampSetFloor(""); return true; }
        if (id === "adr044-lamp-load-models") { loadModels("lamp"); return true; }
        if (id === "adr044-pen-load-models") { loadModels("pen"); return true; }
        if (id === "adr044-lamp-test") { adrLampTestConnection("lamp"); return true; }
        if (id === "adr044-pen-test") { adrLampTestConnection("pen"); return true; }
        if (id === "adr044-lamp-preset-reset") { adrCdSetValueSafe("adr044-lamp-preset", ""); save("lampPreset", ""); saveNow(); adrLampStatus("已恢复出厂人设 ✓", "#8ed99d"); return true; }
        if (id === "adr044-lamp-gossip-preset-reset") { adrCdSetValueSafe("adr044-lamp-gossip-preset", ""); save("lampGossipPreset", ""); saveNow(); adrLampStatus("蛐蛐人设已恢复出厂 ✓", "#8ed99d"); return true; }
        if (id === "adr044-lamp-quip-ack") { return adrLampQuipAck(); }
        if (id === "adr044-lamp-jump-bottom") { adrLampJump("bottom"); return true; }
        if (id === "adr044-lamp-quip-now") { adrLampAutoQuipNow("manual", true).catch(function () {}); return true; }
        if (id === "adr044-lamp-jump-top") { adrLampJump("top"); return true; }
        if (id === "adr044-lamp-mode-edit") { adrLampSetMode("edit"); return true; }
        if (id === "adr044-lamp-mode-gossip") { adrLampSetMode("gossip"); return true; }
        return false;
    }

    function adrLampBindControls() {
        try {
            function each(id, fn) {
                Array.prototype.slice.call(rootDoc().querySelectorAll("#" + id)).forEach(function (el) {
                    if (!el || el.__adrLampBound) return;
                    el.__adrLampBound = true;
                    fn(el);
                });
            }
            function guard(el) {
                el.addEventListener("focus", function () { el.__adrCdTyping = true; });
                el.addEventListener("blur", function () { setTimeout(function () { el.__adrCdTyping = false; }, 400); });
                ["pointerdown", "touchstart", "mousedown"].forEach(function (evt) {
                    el.addEventListener(evt, function () { adrCdTouch(el); }, { passive: true });
                });
            }
            function saveStr(id, key, fallback) {
                each(id, function (el) {
                    guard(el);
                    el.addEventListener("change", function () { save(key, String(el.value || "").trim() || fallback || ""); saveNow(); adrLampRefreshPanelFields(); });
                });
            }
            each("adr044-lamp-input", function (el) {
                guard(el);
                el.addEventListener("keydown", function (ev) {
                    if (ev.key === "Enter" && (ev.ctrlKey || ev.metaKey)) { try { ev.preventDefault(); } catch (e) {} adrLampSend(); }
                });
            });
            each("adr044-lamp-floor", function (el) {
                guard(el);
                el.addEventListener("change", function () { adrLampSetFloor(el.value); });
            });
            each("adr044-lamp-summary-tags", function (el) {
                guard(el);
                el.addEventListener("change", function () { save("lampSummaryTags", String(el.value || "").trim() || "report"); saveNow(); adrLampRefreshAll(); });
            });
            each("adr044-lamp-status-tags", function (el) {
                guard(el);
                el.addEventListener("change", function () { save("lampStatusTags", String(el.value || "").trim()); saveNow(); adrLampRefreshAll(); });
            });
            each("adr044-lamp-summary-floors", function (el) {
                guard(el);
                el.addEventListener("change", function () { save("lampSummaryFloors", Number(el.value)); var v = adrLampSummaryFloors(); save("lampSummaryFloors", v); saveNow(); adrLampRefreshAll(); });
            });
            each("adr044-lamp-temp", function (el) {
                guard(el);
                el.addEventListener("change", function () { save("lampTemp", Number(el.value)); var t = adrLampTemp(); save("lampTemp", t); el.value = String(t); saveNow(); });
            });
            each("adr044-lamp-borrow", function (el) {
                guard(el);
                el.addEventListener("change", function () { save("lampBorrow", String(el.value || "plot")); saveNow(); adrLampRefreshPanelFields(); });
            });
            each("adr044-pen-borrow", function (el) {
                guard(el);
                el.addEventListener("change", function () { save("penBorrow", String(el.value || "lamp")); saveNow(); adrLampRefreshPanelFields(); });
            });
            // v1.46.0 API 预设：下拉一选就切
            ["lamp", "pen"].forEach(function (slot) {
                each("adr044-api-profile-select-" + slot, function (el) {
                    guard(el);
                    el.addEventListener("change", function () { el.__adrCdPickerOpenAt = 0; el.__adrCdTouchedAt = 0; adrHxApiOnSelect(slot, el); });
                });
                each("adr044-api-profile-name-" + slot, function (el) { guard(el); });
            });
            ["lamp", "pen"].forEach(function (p) {
                saveStr("adr044-" + p + "-endpoint", p + "ApiEndpoint");
                saveStr("adr044-" + p + "-key", p + "ApiKey");
                saveStr("adr044-" + p + "-model", p + "Model");
                each("adr044-" + p + "-model-select", function (el) {
                    guard(el);
                    el.addEventListener("change", function () {
                        if (!el.value) return;
                        adrCdSetValueSafe("adr044-" + p + "-model", el.value);
                        save(p + "Model", String(el.value));
                        saveNow();
                        adrLampRefreshPanelFields();
                    });
                });
            });
            each("adr044-lamp-reset-after-apply", function (el) {
                ["pointerdown", "touchstart", "mousedown"].forEach(function (evt) { el.addEventListener(evt, function () { adrCdTouch(el); }, { passive: true }); });
                el.addEventListener("change", function () { adrCdTouch(el); save("lampResetAfterApply", !!el.checked); saveNow(); });
            });
            each("adr044-lamp-preset", function (el) {
                guard(el);
                el.addEventListener("change", function () { save("lampPreset", String(el.value || "")); saveNow(); });
            });
            // v1.43.2 抽屉里的掌灯页攒了脏（面板不在眼前时来过新楼）：在页里点第一下时补算
            Array.prototype.slice.call(rootDoc().querySelectorAll("#adr044-page-lamp, #adr048-page-lamp")).forEach(function (pg) {
                if (pg.__adrLampDirtyBound) return;
                pg.__adrLampDirtyBound = true;
                pg.addEventListener("pointerdown", function () { if (adrLampDirty) { try { adrLampRefreshAll(); } catch (eD) {} } }, { passive: true, capture: true });
            });
            // v1.41.9 「和小红霞聊」抽屉收起再展开，对话框又在最顶上——展开那一刻卷到底
            Array.prototype.slice.call(rootDoc().querySelectorAll('[data-drawer-id="lamp-chat"]')).forEach(function (dr) {
                if (dr.__adrLampToggleBound) return;
                dr.__adrLampToggleBound = true;
                dr.addEventListener("toggle", function () { if (dr.open) adrLampScrollThreadToBottom(); });
            });
            each("adr044-lamp-auto-quip", function (el) {
                ["pointerdown", "touchstart", "mousedown"].forEach(function (evt) { el.addEventListener(evt, function () { adrCdTouch(el); }, { passive: true }); });
                el.addEventListener("change", function () { adrCdTouch(el); save("lampAutoQuip", !!el.checked); saveNow(); adrLampStatus(el.checked ? "自动蛐蛐开了：新楼落地她会自己来一句（花钱）" : "自动蛐蛐关了", "#8ed99d"); });
            });
            each("adr044-lamp-gossip-preset", function (el) {
                guard(el);
                el.addEventListener("change", function () { save("lampGossipPreset", String(el.value || "")); saveNow(); });
            });
            each("adr044-lamp-draft", function (el) { guard(el); el.addEventListener("change", adrLampSaveDraftEdits); });
            each("adr044-lamp-draft-summary", function (el) { guard(el); el.addEventListener("change", adrLampSaveDraftEdits); });
            each("adr044-lamp-draft-status", function (el) { guard(el); el.addEventListener("change", adrLampSaveDraftEdits); });
        } catch (e) {
            try { console.warn("[Arrebol D] lamp bind failed", e); } catch (e2) {}
        }
    }


    // ================= v1.43.0 红霞剧场 =================
    // 每层助手正文落地后，霞姐在楼尾插一场：弹幕吐槽、场外嗑瓜子、Q 版四格、花絮 NG、采访间、评论区……
    // 看到的范围与掌灯一样（基调、角色卡 / 世界书 / 人设、未隐藏楼层的摘要、本篇全文），走聊天位 API，每层一次。
    // 它插在楼里，是给人看的，不该进主模型的上下文——所以整段包在一个带固定类名的 <details> 里，
    // 配一条剥离正则（面板里能复制），酒馆「正则」扩展勾「仅格式提示词」就只在发给模型时剥掉、画面照留。
    // 小红霞自己读楼（导演、掌灯、蛐蛐）也一律当它不存在：cleanMessage 与 adrLampSplitTail 的 details 那条认它。
    var ADR_THEATER_STRIP_REGEX_TEXT = '/\\s*<details class="arrebol-d-theater"[\\s\\S]*?<\\/details>/g';
    function adrTheaterBlockRe() { return /\s*<details class="arrebol-d-theater"[\s\S]*?<\/details>/g; }

    // v1.45.5 人设层（提议：江「咱们剧场也有一个基础人设层吧。你是 Arrebol，文字的缔造者，作为高级作家，
    // 根据小剧场创作的要求，语言文艺呀或者活泼……最起码能保证文字质感，万一有渲染也好看。我感觉人设层很重要」）。
    // 系统提示从此分三层：① 人设（她是谁、文字要什么质感、排版要多好看；能改，留空用出厂）
    // ② 规矩（剧场是什么、不是正文、只写这一楼、怎么输出、排版安全；代码接管，不给改，改坏了剧场会插不进去或者把页面带歪）
    // ③ 素材（基调、角色卡 / 世界书 / 人设、此前各楼摘要、本篇全文）。每场的主题在 user 那条里，叠在人设上面。
    var ADR_THEATER_PERSONA = [
        "你是 Arrebol，小红霞，文字的缔造者。正经的、不正经的你都写得漂亮。现在你给这部互动小说的每一楼配一场「红霞剧场」：贴在正文后面的一小段场外内容，读者看了会笑出声，或者心口被轻轻戳一下。",
        "",
        "看剧场的人是这部互动小说的读者，和你一样坐在书外看这个故事，不是剧情里的 user。TA 成年、清醒、有生活阅历、文艺，讨厌低俗文笔，拒绝恶俗的文字。每一场都是写给这样一个人看的。",
        "",
        "这是艺术创作，是互动小说，玩笑可以开、梗可以野，但不可能毫无边界和底线：读者本身就是高审美、有生活阅历的人，不是来看恶俗的。低俗的梗、恶俗的桥段、油腻的腔调，再好笑也不写。你有自己的审美、笔触和坚持。",
        "",
        "你是高级作家，不是段子生成器。本场主题要什么腔调，你就拿出什么腔调：要文艺，就有留白、有意象，句子会呼吸；要活泼，就短、快、脆，包袱响在最后几个字；要毒舌、要沙雕、要一本正经地胡说八道，你都接得住。腔调跟着主题换，质感是你自己的底线，哪种腔调都不能丢：",
        "· 用词准。一个具体的名词、动词能说清的，不堆形容词，不拿「仿佛」「似乎」「不由得」垫场。",
        "· 有细节。梗要长在这一楼真发生过的事上：一个动作、一句原话、一件小东西。放在哪篇文后面都成立的万能吐槽，不写。",
        "· 有节奏。长短句错开，该停的地方停。每一条、每一格都有自己的看点，凑数的那条删掉。",
        "· 像人写的。不说教、不总结、不升华，不解释笑点，不用「总之」「值得一提的是」这种腔。",
        "",
        "主题点名要排版时，你同时是美编。好看的标准是耐看，不是花哨：一场只用一套配色，两三种颜色，深浅有层次；卡片自己带底色和字色，别赌酒馆的背景是深是浅；字号、行距、留白让手机上读着不累；圆角、阴影、渐变点到为止，装饰永远给文字让路。宁可素净，不要廉价的热闹。"
    ].join("\n");

    var ADR_THEATER_RULES_HEAD = [
        "【红霞剧场 · 规矩】",
        "红霞剧场贴在这部互动小说每一楼的正文后面，是给读者看的场外内容，不是正文：不推进剧情、不替角色做正文里没做的决定、不剧透后面、不给修改意见。",
        "① 只针对本篇这一楼刚发生的事，引用细节要准，别凭印象编；此前剧情只用来接梗、翻旧账。",
        "② 短小，一屏以内。主题里写了条数 / 格数就照它来；没写就 120–200 字。",
        "③ 好笑或者戳人，二选一，别端着；可以损，但损的是剧情和角色，不损读者。",
        "④ 人设不崩：角色可以出戏，但嘴脸还是那个人；场外人物说的话要像那种人会说的，名字、称呼、地点都用这个世界里有的。",
        "⑤ 这局的基调（如果有）是底色：甜的局别写成虐的，虐的局可以苦中作乐。"
    ];
    var ADR_THEATER_RULE_PLAIN = "⑥ 纯文本，用换行分条分格，可以有少量 emoji；不要 markdown 标题、不要代码块、不要任何 HTML 标签。";
    // v1.44.0 允许排版时的第六条：默认还是纯文本，主题点名要 HTML / CSS 才给
    var ADR_THEATER_RULE_RICH = "⑥ 默认纯文本，用换行分条分格，可以有少量 emoji，不要 markdown 标题、不要代码块。只有本场主题明确要求用 HTML / CSS 排版时才输出 HTML：一段自包含的片段，样式写在标签的 style 属性里，或者放一个 <style> 块且每条选择器都以你自己起的类名开头（比如 .hx-danmu）；不要 script、不要 iframe、不要外链图片和字体、不要 position:fixed、不要 <details>、不要整页的 html / body 标签，宽度不超过容器。";
    var ADR_THEATER_RULE_TAIL = "⑦ 只输出剧场正文本身：不要标题行、不要「好的」、不要解释你在干什么。";

    function adrTheaterRichAllowed() { try { return settings().theaterRich !== false; } catch (e) { return true; } }
    function adrTheaterRulesText(rich) {
        return ADR_THEATER_RULES_HEAD.concat([rich ? ADR_THEATER_RULE_RICH : ADR_THEATER_RULE_PLAIN, ADR_THEATER_RULE_TAIL]).join("\n");
    }
    // 自己写过就用自己的（整段替换出厂人设），留空或只有空白就用出厂
    function adrTheaterPersonaCustom() {
        try { return String(settings().theaterPersona || "").trim(); } catch (e) { return ""; }
    }
    function adrTheaterPersonaText() { return adrTheaterPersonaCustom() || ADR_THEATER_PERSONA; }
    function adrTheaterPresetText() {
        return adrTheaterPersonaText() + "\n\n" + adrTheaterRulesText(adrTheaterRichAllowed()) + "\n\n" + adrHxStance("theater");
    }
    var ADR_THEATER_PRESET = ADR_THEATER_PERSONA + "\n\n" + adrTheaterRulesText(false);   // 出厂人设 + 纯文本规矩（测试钩子用）

    var ADR_THEATER_FACTORY = {
        "弹幕吐槽": "模拟视频网站的弹幕飘过这一楼：8–12 条，每条一行，短、快、带梗。可以有「前排」「+1」「哈哈哈哈」「高能预警」「课代表来了」这类弹幕腔，也要有两三条真在吐槽这楼细节的。不写 ID、不写颜色、不编号。",
        "场外嗑瓜子": "两三个与剧情无关的场外人（保安大爷、楼下奶茶店小妹、路过的同事、对门邻居……每次自己挑合场景的）围观了这一楼，嗑着瓜子点评。对话体，一人一行，「谁：说了什么」，6–10 句，要有一个人看得最明白、一个人完全看岔了。",
        "Q版四格": "把这一楼最戳的一幕改成 Q 版四格小剧场。四格，每格一行，格式「①（画面 / 动作）台词」，前三格铺垫、第四格抖包袱。角色都是二头身，情绪放大三倍。",
        "花絮NG": "这一楼拍完，导演喊卡。写镜头外的片场花絮：演这场戏的角色出戏之后的反应、一条 NG 镜头、互相吐槽对方刚才那句台词。对话加括注动作，6–10 行，结尾导演说一句「再来一条」或者「过」。",
        "角色采访间": "场外记者逮住这一楼的当事角色，问一个扎心的问题（就问这楼他 / 她干的那件事）。角色嘴硬作答，每句后面括注一句真实心理活动。一问一答两到三轮，最后记者补一刀。",
        "读者评论区": "模拟连载小说的评论区：6–8 条读者评论，每条一行，格式「#楼层 昵称：评论（👍数字）」。要有嗑 CP 的、骂主角的、心疼配角的、催更的、课代表总结的、还有一条完全歪楼的。昵称起得像真读者。"
    };

    function adrTheaterStore() {
        var st = settings();
        if (!st.theaterStore || typeof st.theaterStore !== "object" || Array.isArray(st.theaterStore)) st.theaterStore = {};
        var seeded = Array.isArray(st.theaterSeeded) ? st.theaterSeeded.slice() : [];
        var touched = false;
        Object.keys(ADR_THEATER_FACTORY).forEach(function (k) {
            if (typeof st.theaterStore[k] === "string") {
                if (seeded.indexOf(k) < 0) { seeded.push(k); touched = true; }
                return;
            }
            if (seeded.indexOf(k) >= 0) return;   // 删过就尊重，不复活
            st.theaterStore[k] = ADR_THEATER_FACTORY[k];
            seeded.push(k);
            touched = true;
        });
        if (touched) { st.theaterSeeded = seeded; save("theaterStore", st.theaterStore); save("theaterSeeded", seeded); }
        return st.theaterStore;
    }

    function adrTheaterNames() { return Object.keys(adrTheaterStore()); }

    function adrTheaterCurrentName() {
        var names = adrTheaterNames();
        var cur = String(settings().theaterCurrent || "");
        if (cur && names.indexOf(cur) >= 0) return cur;
        return names.length ? names[0] : "";
    }

    function adrTheaterPickMode() { return settings().theaterPick === "random" ? "random" : "fixed"; }

    // v1.45.4：abort = 现在按下「打断」该调的那一把（等楼落定时是放行等待，请求挂着时是掐断请求）；
    // cancel = 这一场被打断了；status = 状态行最后一句（浮窗每次打开都重建，重建时把它写回去，不然等着的时候重开浮窗就不知道在干嘛）。
    var adrTheaterState = { busy: false, lastSig: "", lastName: "", timer: null, abort: null, cancel: false, status: null };

    // 这一场用哪个主题：固定＝选中的那个；随机＝仓里抽一个，仓里不止一个时不连着抽到同一个
    function adrTheaterPickTheme(rng) {
        var store = adrTheaterStore();
        var names = Object.keys(store);
        if (!names.length) return { name: "弹幕吐槽", text: ADR_THEATER_FACTORY["弹幕吐槽"] };
        var name;
        if (adrTheaterPickMode() === "random") {
            var pool = names.length > 1 ? names.filter(function (n) { return n !== adrTheaterState.lastName; }) : names;
            var r = typeof rng === "function" ? rng() : Math.random();
            name = pool[Math.min(pool.length - 1, Math.floor(r * pool.length))];
        } else {
            name = adrTheaterCurrentName();
        }
        return { name: name, text: String(store[name] || "") };
    }

    var ADR_THEATER_STATUS_HINT = "没开也能点「现在来一场」试试手感；一楼只留一场，再来一场会换掉旧的。";

    function adrTheaterStatus(text, color) {
        try { adrTheaterState.status = { text: String(text || ""), color: color || "#d6b177", key: adrDChatKey() }; } catch (e) {}
        adrCdSetTextAll("adr044-theater-status", text, color || "#d6b177");
    }

    // 浮窗重建时状态行写什么：这把聊天里说过话就接着显示那一句，没说过就是出厂提示
    function adrTheaterStatusForRender() {
        try {
            var s0 = adrTheaterState.status;
            if (s0 && s0.text && s0.key === adrDChatKey()) return s0;
        } catch (e) {}
        return { text: ADR_THEATER_STATUS_HINT, color: "" };
    }

    // ---- v1.45.5 人设层的面板 ----
    function adrTheaterPersonaNote() {
        var c = adrTheaterPersonaCustom();
        return c ? "现在用的是你写的人设（" + c.length + " 字）。规矩和素材照旧跟在它后面。" : "现在用的是出厂人设。";
    }

    function adrTheaterPersonaSay(text, color) { adrCdSetTextAll("adr044-theater-persona-note", text, color || "#8ed99d"); }

    function adrTheaterPersonaSet(text, say) {
        save("theaterPersona", String(text || ""));
        saveNow();
        adrCdSetValueSafe("adr044-theater-persona", String(text || ""));
        // 刚按过按钮的那一侧，文本框可能还带着「正在打字」的记号被跳过：直接写两端
        try {
            Array.prototype.slice.call(rootDoc().querySelectorAll("#adr044-theater-persona")).forEach(function (el) { el.value = String(text || ""); });
        } catch (e) {}
        adrTheaterPersonaSay(say || adrTheaterPersonaNote());
    }

    // 把出厂人设填进文本框，好在它上面改（手机上从折叠块里长按复制太费劲）。自己写过东西就先问一句，免得盖掉。
    function adrTheaterPersonaFill(btn) {
        var cur = adrTheaterPersonaCustom();
        var go = function () { adrTheaterPersonaSet(ADR_THEATER_PERSONA, "出厂人设填进来了，在上面直接改，点别处就存下。想跟着以后的出厂更新走，点「恢复出厂人设」"); };
        if (!cur || cur === ADR_THEATER_PERSONA) { go(); return true; }
        return adrDTwoStepConfirm("theater-persona-fill", btn || qForm("adr044-theater-persona-fill"), "确定盖掉？", "再点一次：用出厂人设盖掉你现在写的",
            function (msg) { adrTheaterPersonaSay(msg, "#d6a26a"); }, go);
    }

    function adrTheaterPersonaReset(btn) {
        var cur = adrTheaterPersonaCustom();
        var go = function () { adrTheaterPersonaSet("", "已恢复出厂人设 ✓"); };
        if (!cur) { adrTheaterPersonaSet("", "本来就是出厂人设"); return true; }
        if (cur === ADR_THEATER_PERSONA) { go(); return true; }
        return adrDTwoStepConfirm("theater-persona-reset", btn || qForm("adr044-theater-persona-reset"), "确定恢复？", "再点一次：删掉你写的人设，回到出厂",
            function (msg) { adrTheaterPersonaSay(msg, "#d6a26a"); }, go);
    }

    // v1.45.4 打断（江：「我想在等霞姐开口的时候有一个打断，万一 api 出问题了呢」）。
    // 只有正在演（含等楼落定）时「打断」才点得动；两端（浮窗 / 抽屉）一起管。
    function adrTheaterSetButtons() {
        try {
            var busy = !!adrTheaterState.busy;
            Array.prototype.slice.call(rootDoc().querySelectorAll("#adr044-theater-stop")).forEach(function (el) { el.disabled = !busy; });
        } catch (e) {}
    }

    function adrTheaterAbort() {
        if (!adrTheaterState.busy) { adrTheaterStatus("现在没有在演的场次，不用打断", "#d6b177"); return false; }
        adrTheaterState.cancel = true;
        var fn = adrTheaterState.abort;
        if (typeof fn === "function") { try { fn(); } catch (e) {} }
        else adrTheaterStatus("正在打断…", "#d6b177");
        return true;
    }

    // ---- v1.45.0 剧场位：自己的一页、自己的 API 位。默认跟掌灯聊天位（搬家前就是这样），也能借别人的或自己填 ----
    var ADR_THEATER_BORROW_LABEL = { lamp: "掌灯聊天位", plot: "统筹", emotion: "情感导演", expand: "展开", cd: "小眼睛", self: "自己填" };

    function adrTheaterBorrow() {
        var b = String(settings().theaterBorrow || "lamp");
        return ADR_THEATER_BORROW_LABEL[b] ? b : "lamp";
    }

    function adrTheaterApiCfg() {
        var st = settings();
        var borrow = adrTheaterBorrow();
        if (borrow === "lamp") {
            var inner = adrLampApiCfg("lamp");
            return { endpoint: inner.endpoint, key: inner.key, model: inner.model, from: "lamp" };
        }
        var p = borrow === "self" ? "stage" : prefixOf(borrow);
        return { endpoint: String(st[p + "ApiEndpoint"] || ""), key: String(st[p + "ApiKey"] || ""), model: String(st[p + "Model"] || ""), from: borrow };
    }

    function adrTheaterApiNote() {
        var cfg = adrTheaterApiCfg();
        var src = cfg.from === "self" ? "自己填的" : (cfg.from === "lamp" ? "跟掌灯聊天位" : "借" + ADR_THEATER_BORROW_LABEL[cfg.from] + "的");
        if (!cfg.endpoint || !cfg.model) return "剧场位：" + src + "，但那边地址或模型还空着";
        return "剧场位：" + src + " · " + cfg.model;
    }

    function adrTheaterTemp() {
        var t = Number(settings().theaterTemp);
        if (!Number.isFinite(t) || t < 0 || t > 2) return 0.9;
        return t;
    }

    function adrTheaterTopLineText() {
        try {
            var n = adrTheaterNames().length;
            var how = adrTheaterPickMode() === "random" ? "随机抽（仓里 " + n + " 个）" : "固定「" + (adrTheaterCurrentName() || "弹幕吐槽") + "」";
            if (!adrTheaterEnabled()) return "🎭 剧场 · 没开（可以手动来一场） · " + how;
            return "🎭 剧场 · 每层楼尾一场 · " + how;
        } catch (e) { return "🎭 剧场"; }
    }

    async function adrTheaterTestConnection() {
        var cfg = adrTheaterApiCfg();
        if (!cfg.endpoint || !cfg.model) { status("stage", "地址或模型空着：" + adrTheaterApiNote(), "#d4726a"); return false; }
        status("stage", "测试中…", "#8ed99d");
        try {
            var out = await adrDChatCompletionText({ endpoint: cfg.endpoint, key: cfg.key, model: cfg.model, temperature: 0, maxTokens: 200, stream: false,
                messages: [{ role: "user", content: "只回一个字：在" }] });
            status("stage", "通了 ✓ " + adrTheaterApiNote() + " 回：" + adrCdTruncate(String(out || "").trim(), 20), "#8ed99d");
            return true;
        } catch (e) {
            status("stage", "不通：" + (e && e.message ? e.message : String(e)), "#d4726a");
            return false;
        }
    }

    function adrTheaterEscape(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

    // ---- v1.44.0 HTML / CSS 排版 ----
    // 主题点名要排版时，模型回来的是一段 HTML。存进楼里之前先理一遍：
    // 明摆着不该有的（script、iframe、表单、on* 事件、javascript: 链接）当场去掉；里面不许再套 <details>（剥离正则认第一个 </details>）；
    // 有块级结构的整段压成一行（酒馆的 markdown 遇到空行会把 HTML 拆散），只有行内标签的保留换行。
    // 这一步不是消毒——真正的消毒在上屏时：走酒馆自己的 messageFormatting（它的 DOMPurify 与 <style> 作用域），
    // 老酒馆没有那个接口就用它的 DOMPurify 并去掉 <style>，连 DOMPurify 都拿不到就只显示文字。
    var ADR_THEATER_TAG_RE = /<\/?(?:div|span|p|style|table|thead|tbody|tr|td|th|ul|ol|li|section|article|header|footer|h[1-6]|img|font|center|b|i|u|s|em|strong|small|mark|ruby|rt|marquee|blockquote|hr|br|svg|a|pre|code|sub|sup|del|ins)\b[^<>]*>/i;
    var ADR_THEATER_BLOCK_TAG_RE = /<(?:div|p|table|ul|ol|li|section|article|header|footer|style|h[1-6]|blockquote|hr|pre)\b/i;

    function adrTheaterTidyRich(t) {
        t = String(t || "");
        t = t.replace(/<script\b[\s\S]*?<\/script\s*>/gi, "");
        t = t.replace(/<\/?(?:script|iframe|frame|frameset|object|embed|link|meta|base|form|input|textarea|button|select|html|head|body)\b[^>]*>/gi, "");
        t = t.replace(/<!doctype[^>]*>/gi, "");
        t = t.replace(/\s+on[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "");
        t = t.replace(/\b(href|src)\s*=\s*(["']?)\s*javascript:[^"'>\s]*/gi, "$1=$2#");
        t = t.replace(/<(\/?)details\b/gi, "<$1div").replace(/<(\/?)summary\b/gi, "<$1div");
        if (ADR_THEATER_BLOCK_TAG_RE.test(t)) t = t.replace(/\s*\n\s*/g, " ");
        else t = t.replace(/\n{3,}/g, "\n\n").split("\n").join("<br>");
        return t.trim();
    }

    // 模型回来的东西洗干净。返回 { text, rich }：rich 为真时 text 是一段 HTML，否则是纯文本
    function adrTheaterClean(raw, allowRich) {
        var t = adrLampStripFences(String(raw || "").replace(/\r/g, ""));
        t = t.replace(/^\s*(?:🎭\s*)?(?:【\s*)?红霞剧场[^\n]*\n+/, "");
        if (allowRich && ADR_THEATER_TAG_RE.test(t)) return { rich: true, text: adrTheaterTidyRich(t) };
        t = t.replace(/<\/?(?:details|summary|br|p|div|span)[^>]*>/gi, "\n");
        t = t.split("\n").map(function (line) { return line.replace(/\s+$/, ""); }).join("\n");
        return { rich: false, text: t.replace(/\n{3,}/g, "\n\n").trim() };
    }

    // 整段写成一行：纯文本的行与行之间用 <br>，不留裸换行——酒馆的 markdown 管不到 HTML 块里面，裸换行在画面上会并成空格
    function adrTheaterBlock(name, text, folded, rich) {
        var body = rich ? String(text || "") : adrTheaterEscape(text).split("\n").join("<br>");
        return "\n\n<details class=\"arrebol-d-theater\"" + (folded ? "" : " open") + "><summary>🎭 红霞剧场 · " + adrTheaterEscape(name) + "</summary>" + body + "</details>";
    }

    function adrTheaterStrip(mes) { return String(mes || "").replace(adrTheaterBlockRe(), ""); }
    function adrTheaterHas(mes) { return adrTheaterBlockRe().test(String(mes || "")); }

    // 写进这一楼：先摘掉旧的那场（一楼只留一场），再接到楼尾；当前 swipe 同写，自己这一笔不算"楼还在生成"
    function adrTheaterWrite(idx, name, text, rich) {
        var chat = adrLampChat();
        var m = chat[idx];
        if (!m) return false;
        var base = adrTheaterStrip(m.mes).replace(/\s+$/, "");
        adrDSetMessageText(m, base + adrTheaterBlock(name, text, settings().theaterFold === true, rich));
        adrLampAcknowledgeOwnWrite();
        return true;
    }

    // ---- v1.43.2 静默上屏 ----
    // 剧场每层都插，不能走"存整份聊天 → 让酒馆把整楼重画 → 广播 MESSAGE_UPDATED"的路：
    // 整楼重画会让这一楼闪一下，美化正则、变量脚本、前端卡的 iframe 跟着对这一楼重跑一遍，手机上每层多烧一回。
    // 这里只把剧场那一块接到已经画好的楼尾（或把旧的那块拿掉），楼里原有的节点一个不碰、不广播任何事件。
    // v1.44.0：那一块优先交给酒馆自己的 messageFormatting 去格式化（见 adrDFormatFragment）——
    // 美化正则、markdown、消毒、<style> 作用域都和它以后整楼重画时一模一样；老酒馆没有这个接口再自己搭。
    function adrTheaterSanitize(html) {
        try {
            var w = rootWin();
            var DP = (w.SillyTavern && w.SillyTavern.libs && w.SillyTavern.libs.DOMPurify) || w.DOMPurify;
            if (!DP || typeof DP.sanitize !== "function") return null;
            return String(DP.sanitize(String(html || ""), {
                FORBID_TAGS: ["style", "script", "iframe", "object", "embed", "form", "link", "meta", "base", "details", "summary", "input", "textarea", "button", "select"],
                FORBID_ATTR: ["id", "name"]
            }));
        } catch (e) { return null; }
    }

    function adrTheaterPlainOf(html) {
        return String(html || "").replace(/<style\b[\s\S]*?<\/style\s*>/gi, "").replace(/<br\s*\/?>/gi, "\n").replace(/<\/(?:div|p|li|tr|h[1-6])\s*>/gi, "\n").replace(/<[^>]+>/g, "").replace(/\n{3,}/g, "\n\n").trim();
    }

    // name 传 null 表示只撤不画。返回 true 表示画面已经对上了
    function adrTheaterPaint(idx, name, text, folded, rich) {
        var box = adrDMesBox(idx);
        if (!box) return false;
        try {
            Array.prototype.slice.call(box.querySelectorAll(".arrebol-d-theater-live, details.arrebol-d-theater, details.custom-arrebol-d-theater")).forEach(function (old) {
                if (old.parentNode) old.parentNode.removeChild(old);
            });
            if (name == null) return true;
            var d = box.ownerDocument;
            // ① 酒馆自己的流程
            var html = adrDFormatFragment(idx, adrTheaterBlock(name, text, folded, rich).replace(/^\s+/, ""));
            if (html != null) {
                var wrap = d.createElement("div");
                wrap.className = "arrebol-d-theater-live";
                wrap.innerHTML = html;
                if (adrDFragmentVisible(wrap)) box.appendChild(wrap);   // 用户的美化正则把它藏了就不留空壳
                return true;
            }
            // ② 老酒馆：自己搭一个折叠块
            var det = d.createElement("details");
            det.className = "arrebol-d-theater custom-arrebol-d-theater";   // 酒馆重画后类名带 custom- 前缀，两个都挂上，样式一致
            if (!folded) det.setAttribute("open", "");
            var sum = d.createElement("summary");
            sum.textContent = "🎭 红霞剧场 · " + name;
            det.appendChild(sum);
            var safe = rich ? adrTheaterSanitize(text) : null;
            if (rich && safe != null) {
                var bodyEl = d.createElement("div");
                bodyEl.className = "arrebol-d-theater-body";
                bodyEl.innerHTML = safe;
                det.appendChild(bodyEl);
            } else {
                String(rich ? adrTheaterPlainOf(text) : (text || "")).split("\n").forEach(function (line, i) {
                    if (i) det.appendChild(d.createElement("br"));
                    det.appendChild(d.createTextNode(line));
                });
            }
            box.appendChild(det);
            return true;
        } catch (e) { return false; }
    }

    // 找不到画好的楼（酒馆版本差异 / 这楼不在画面里）：退到只让酒馆重画这一楼，仍然不广播；再不行就不动画面——
    // 数据已经在楼里，下次酒馆自己重画时出现。绝不整聊天重载。
    function adrTheaterShow(idx, name, text, rich) {
        if (adrTheaterPaint(idx, name, text, settings().theaterFold === true, rich)) return "silent";
        try {
            var c = ctx();
            if (c && c.chat && c.chat[idx] && typeof c.updateMessageBlock === "function") { c.updateMessageBlock(idx, c.chat[idx]); return "block"; }
        } catch (e) {}
        return "none";
    }

    // 存盘合并：插一场、撤一场、连着点几下，1.5 秒内只存一次整份聊天。到点时如果下一楼正在出字就再等一轮——
    // 这一笔已经在内存里，酒馆写完那一楼自己存的那次也会带上它；最多等四十轮，不死等。
    var ADR_THEATER_SAVE_DELAY_MS = 1500;
    var adrTheaterSaveTimer = null;
    function adrTheaterSaveSoon(tries) {
        if (adrTheaterSaveTimer) clearTimeout(adrTheaterSaveTimer);
        adrTheaterSaveTimer = setTimeout(function () {
            adrTheaterSaveTimer = null;
            try {
                if (adrDGenerationLooksLive() && (Number(tries) || 0) < 40) { adrTheaterSaveSoon((Number(tries) || 0) + 1); return; }
                var c = ctx();
                if (!c || typeof c.saveChat !== "function") return;
                var ret = c.saveChat();
                if (ret && typeof ret.then === "function") {
                    ret.then(null, function (e) { adrTheaterStatus("剧场已在楼里，但聊天保存没确认：" + (e && e.message ? e.message : String(e)), "#d4726a"); });
                }
            } catch (e) {}
        }, ADR_THEATER_SAVE_DELAY_MS);
    }

    function adrTheaterEnabled() {
        try { return settings().theaterEnabled === true && adrDMasterEnabled(); } catch (e) { return false; }
    }

    // MESSAGE_RECEIVED 进门只排一拍；真正干活在 adrTheaterNow
    function adrTheaterOnMessage() {
        try {
            if (!adrTheaterEnabled()) return;
            if (adrTheaterState.timer) clearTimeout(adrTheaterState.timer);
            adrTheaterState.timer = setTimeout(function () {
                adrTheaterState.timer = null;
                adrTheaterNow("message-received").catch(function (e) { try { console.warn("[Arrebol D] theater failed", e); } catch (e2) {} });
            }, 900);
        } catch (e) {}
    }

    async function adrTheaterNow(reason, force) {
        if (!force && !adrTheaterEnabled()) return false;
        if (adrTheaterState.busy) { if (force) adrTheaterStatus("上一场还在写，等它落幕", "#d6b177"); return false; }
        var cfg = adrTheaterApiCfg();
        if (!cfg.endpoint || !cfg.model) { adrTheaterStatus("剧场位没有可用的 API：" + adrTheaterApiNote(), "#d4726a"); return false; }
        var homeKey = adrDChatKey();
        adrTheaterState.busy = true;
        adrTheaterState.cancel = false;
        adrTheaterState.abort = null;
        adrTheaterSetButtons();
        var idx = -1;
        try {
            // 楼还在出字就等，导演同款证据。等的这一段也能打断：「打断」把下面这个 Promise 提前放行。
            if (adrDGenerationLooksLive()) adrTheaterStatus("🎬 这一楼还在出字，等它落定再开演…（不想等可以打断）", "#8ed99d");
            await Promise.race([adrDWaitForGenerationIdle(120000), new Promise(function (resolve) { adrTheaterState.abort = resolve; })]);
            adrTheaterState.abort = null;
            if (adrTheaterState.cancel) { adrTheaterStatus("打断了，这一场不演", "#d6b177"); return false; }
            if (adrDChatKey() !== homeKey) return false;
            var chat = adrLampChat();
            idx = findLastMessageIndex(chat);
            if (idx < 0) { if (force) adrTheaterStatus("这把聊天还没有助手楼", "#d4726a"); return false; }
            var sig = adrLampFloorSig(chat, idx);
            if (!force && sig === adrTheaterState.lastSig) return false;               // 这一版的这一楼演过了
            if (!force && adrTheaterHas(chat[idx].mes)) { adrTheaterState.lastSig = sig; return false; }   // 楼里已经有一场（刷新后同一楼再来事件）
            adrTheaterState.lastSig = sig;
            var theme = adrTheaterPickTheme();
            var mat = adrLampMaterialsAt(idx);
            if (!mat.body) { if (force) adrTheaterStatus("#" + idx + " 没有正文可演", "#d4726a"); return false; }
            adrTheaterStatus("🎬 #" + idx + " 开演「" + theme.name + "」…", "#8ed99d");
            adr048SetFabBusy(true, "theater");   // v1.45.1 开演：浮标亮一盏霞粉小灯
            var allowRich = adrTheaterRichAllowed();
            var messages = [
                { role: "system", content: adrTheaterPresetText() + "\n\n" + adrLampMaterialsText(mat) },
                { role: "user", content: "【本场主题 · " + theme.name + "】\n" + theme.text + "\n\n【任务】针对本篇（#" + idx + "）写一场。只输出剧场正文本身：不要标题、不要解释、不要 markdown 围栏" + (allowRich ? "；主题没点名要 HTML 就用纯文本。" : "、不要 HTML 标签。") }
            ];
            var lastPaint = 0;
            var out = await adrDChatCompletionText({
                endpoint: cfg.endpoint, key: cfg.key, model: cfg.model, temperature: adrTheaterTemp(), messages: messages,
                onAbortable: function (fn) { adrTheaterState.abort = fn; },   // v1.45.4 请求挂着时「打断」掐的就是它
                onProgress: function (chars, thought) {
                    var now = Date.now();
                    if (now - lastPaint < 250) return;
                    lastPaint = now;
                    adrTheaterStatus(chars > 0 ? "🎬 #" + idx + "「" + theme.name + "」在写…已收到 " + chars + " 字" : (thought > 0 ? "🎬 霞姐在想（" + thought + " 字）…" : "🎬 等霞姐开口…"), "#8ed99d");
                }
            });
            adrTheaterState.abort = null;
            // 保险：万一「打断」按下时手里没有那把掐请求的（理论上不会），稿子回来了也不往楼里写
            if (adrTheaterState.cancel) { var eC = new Error("已打断"); eC.name = "LampAbort"; throw eC; }
            var cleaned = adrTheaterClean(out, allowRich);
            if (!cleaned.text) throw new Error("写回来是空的");
            if (adrDChatKey() !== homeKey) { adrTheaterStatus("中途换了聊天，这一场作废", "#d6b177"); return false; }
            var chat2 = adrLampChat();
            if (!chat2[idx] || adrLampFloorSig(chat2, idx) !== sig) { adrTheaterStatus("#" + idx + " 在写的时候变了（重 roll / 编辑 / 删楼），这一场作废", "#d6b177"); return false; }
            if (!adrTheaterWrite(idx, theme.name, cleaned.text, cleaned.rich)) throw new Error("没写进楼里");
            adrTheaterState.lastName = theme.name;
            var how = adrTheaterShow(idx, theme.name, cleaned.text, cleaned.rich);   // v1.43.2 静默上屏：不重画整楼、不广播
            adrTheaterSaveSoon();
            adrTheaterStatus("🎬 #" + idx + " 的「" + theme.name + "」已插在楼尾 ✓" + (cleaned.rich ? "（HTML 排版）" : "") + (how === "none" ? "（这楼不在画面里，下次重画时出现）" : ""), "#8ed99d");
            try { console.log("[Arrebol D] theater #" + idx + " 「" + theme.name + "」 (" + (reason || "") + ")"); } catch (eL) {}
            return true;
        } catch (e) {
            if (e && e.name === "LampAbort") {
                adrTheaterStatus("这一场打断了" + (idx >= 0 ? "（#" + idx + "）" : "") + "，楼里什么都没写。想再试点「现在来一场」", "#d6b177");
                return false;
            }
            adrTheaterStatus("这一场没写出来" + (idx >= 0 ? "（#" + idx + "）" : "") + "：" + (e && e.message ? e.message : String(e)), "#d4726a");
            return false;
        } finally {
            adrTheaterState.busy = false;
            adrTheaterState.abort = null;
            adrTheaterState.cancel = false;
            adrTheaterSetButtons();
            adr048SetFabBusy(false, "theater");   // 演完、作废、失败、打断都熄灯
        }
    }

    function adrTheaterRemoveLatest() {
        try {
            var chat = adrLampChat();
            var idx = findLastMessageIndex(chat);
            if (idx < 0 || !chat[idx] || !adrTheaterHas(chat[idx].mes)) { adrTheaterStatus("最新一楼没有剧场可撤", "#d6b177"); return false; }
            if (adrDGenerationLooksLive()) { adrTheaterStatus("这一楼还在生成，等写完再撤", "#d6b177"); return false; }
            adrDSetMessageText(chat[idx], adrTheaterStrip(chat[idx].mes).replace(/\s+$/, ""));
            adrLampAcknowledgeOwnWrite();
            adrTheaterShow(idx, null, "", false);
            adrTheaterSaveSoon();
            adrTheaterStatus("#" + idx + " 的剧场撤掉了 ✓", "#8ed99d");
            return true;
        } catch (e) { return false; }
    }

    // ---- 主题仓的面板动作 ----
    function adrTheaterOptionsHTML(sel) {
        var names = adrTheaterNames();
        if (!names.length) return '<option value="">（主题仓是空的，写一个存进来，或导入一个主题包）</option>';
        return names.map(function (n) { return '<option value="' + esc(n) + '"' + (n === sel ? " selected" : "") + '>' + esc(n) + '</option>'; }).join("");
    }

    function adrTheaterRefreshFields(fillText) {
        try {
            var d = rootDoc();
            var st = settings();
            var sel = adrTheaterCurrentName();
            var names = adrTheaterNames();
            var sig = adrCdOptSig("theater", names, sel);
            var html = adrTheaterOptionsHTML(sel);
            Array.prototype.slice.call(d.querySelectorAll("#adr044-theater-select")).forEach(function (el) { adrCdFillSelect(el, html, sel, sig); });
            adrCdSetCheckedSafe("adr044-theater-enabled", st.theaterEnabled === true);
            adrCdSetCheckedSafe("adr044-theater-fold", st.theaterFold === true);
            adrCdSetCheckedSafe("adr044-theater-rich", st.theaterRich !== false);
            adrCdSetValueSafe("adr044-theater-pick", adrTheaterPickMode());
            adrCdSetTextAll("adr044-theater-count", "主题仓现有 " + names.length + " 个主题");
            adrCdSetTextAll("adr044-theater-topline", adrTheaterTopLineText());
            adrCdSetValueSafe("adr044-stage-borrow", adrTheaterBorrow());
            adrCdSetValueSafe("adr044-stage-endpoint", st.stageApiEndpoint || "");
            adrCdSetValueSafe("adr044-stage-key", st.stageApiKey || "");
            adrCdSetValueSafe("adr044-stage-model", st.stageModel || "");
            adrCdSetValueSafe("adr044-theater-temp", String(adrTheaterTemp()));
            Array.prototype.slice.call(d.querySelectorAll("#adr044-stage-self")).forEach(function (el) { el.classList.toggle("adr-lamp-hide", adrTheaterBorrow() !== "self"); });
            adrCdSetTextAll("adr044-theater-api-note", adrTheaterApiNote());
            adrTheaterSetButtons();
            adrHxApiRefresh("stage");
            adrCdSetValueSafe("adr044-theater-persona", st.theaterPersona || "");
            adrCdSetTextAll("adr044-theater-rules-view", adrTheaterRulesText(adrTheaterRichAllowed()));
            if (fillText !== false) {
                var active = d.activeElement;
                var store = adrTheaterStore();
                Array.prototype.slice.call(d.querySelectorAll("#adr044-theater-name")).forEach(function (el) { if (el !== active) el.value = sel; });
                Array.prototype.slice.call(d.querySelectorAll("#adr044-theater-text")).forEach(function (el) { if (el !== active) el.value = sel ? String(store[sel] || "") : ""; });
            }
        } catch (e) {}
    }

    function adrTheaterSelect(name) {
        save("theaterCurrent", String(name || ""));
        saveNow();
        adrTheaterRefreshFields();
        adrTheaterStatus(name ? "选中「" + name + "」" + (adrTheaterPickMode() === "random" ? "（现在是随机抽，选中只影响下面显示的写法）" : "，固定用它") : "主题仓是空的", "#8ed99d");
    }

    function adrTheaterSaveFromFields() {
        var nameEl = qForm("adr044-theater-name"), textEl = qForm("adr044-theater-text");
        var name = adrTheaterCleanName(nameEl ? nameEl.value : "");
        var text = textEl ? String(textEl.value || "").trim() : "";
        if (!name) { adrTheaterStatus("先给这个主题起个名", "#d4726a"); return false; }
        if (!text) { adrTheaterStatus("主题的写法是空的，没什么可存", "#d4726a"); return false; }
        var store = adrTheaterStore();
        var existed = typeof store[name] === "string";
        store[name] = text;
        save("theaterStore", store);
        save("theaterCurrent", name);
        saveNow();
        adrTheaterRefreshFields();
        adrTheaterStatus((existed ? "已更新「" : "已存进主题仓「") + name + "」✓", "#8ed99d");
        return true;
    }

    function adrTheaterMarkSeeded(names) {
        var st = settings();
        var seeded = Array.isArray(st.theaterSeeded) ? st.theaterSeeded.slice() : [];
        var touched = false;
        names.forEach(function (n) { if (seeded.indexOf(n) < 0) { seeded.push(n); touched = true; } });
        if (touched) save("theaterSeeded", seeded);
    }

    function adrTheaterDeleteFromFields(btn) {
        var name = adrTheaterCurrentName();
        if (!name) { adrTheaterStatus("主题仓已经空了", "#d6b177"); return false; }
        return adrDTwoStepConfirm("theater-delete", btn || qForm("adr044-theater-delete"), "确定删除？", "再点一次从主题仓删掉「" + name + "」",
            function (msg) { adrTheaterStatus(msg, "#d6a26a"); },
            function () {
                var store = adrTheaterStore();
                delete store[name];
                save("theaterStore", store);
                adrTheaterMarkSeeded([name]);   // 出厂条目删过就记账，不复活
                save("theaterCurrent", "");
                saveNow();
                adrTheaterRefreshFields();
                adrTheaterStatus("已从主题仓删掉「" + name + "」", "#d6b177");
            });
    }

    // ---- v1.44.0 主题包：整仓导出成一个 json，别人的包一次导进来 ----
    // 包的样子：{ "type": "arrebol-theater-pack", "version": 1, "themes": [ { "name": "主题名", "text": "这一场怎么写" }, … ] }
    // 导入时宽进：上面这种、[ {name,text}, … ] 数组、{ "主题名": "写法", … } 对象都认；字段名 title / prompt / content / 名字 / 写法 也认。
    // 同名同写法的跳过；同名不同写法的不覆盖，改名成「名（导入）」放进来——不动你自己改过的。
    function adrTheaterCleanName(v) {
        var n = String(v == null ? "" : v).replace(/\s+/g, " ").trim().slice(0, 40);
        return (n === "__proto__" || n === "constructor" || n === "prototype") ? "" : n;
    }

    function adrTheaterPackObject() {
        var store = adrTheaterStore();
        var names = Object.keys(store);
        return {
            type: "arrebol-theater-pack", version: 1, exportedAt: new Date().toISOString(), count: names.length,
            themes: names.map(function (n) { return { name: n, text: String(store[n] || "") }; })
        };
    }

    function adrTheaterParsePack(input) {
        var list = null;
        if (Array.isArray(input)) list = input;
        else if (input && typeof input === "object") {
            if (Array.isArray(input.themes)) list = input.themes;
            else if (input.themes && typeof input.themes === "object") list = Object.keys(input.themes).map(function (k) { return { name: k, text: input.themes[k] }; });
            else if (input.theaterStore && typeof input.theaterStore === "object") list = Object.keys(input.theaterStore).map(function (k) { return { name: k, text: input.theaterStore[k] }; });
            else {
                var keys = Object.keys(input);
                if (keys.length && keys.every(function (k) { return typeof input[k] === "string"; })) list = keys.map(function (k) { return { name: k, text: input[k] }; });
            }
        }
        if (!list) throw new Error("这不是主题包：要一个 themes 数组，或者「主题名：写法」的对象");
        var out = [];
        list.forEach(function (it, i) {
            var name = "", text = "";
            if (typeof it === "string") { text = it; name = "主题 " + (i + 1); }
            else if (it && typeof it === "object") {
                name = it.name != null ? it.name : (it.title != null ? it.title : (it["名字"] != null ? it["名字"] : (it["主题"] != null ? it["主题"] : "")));
                text = it.text != null ? it.text : (it.prompt != null ? it.prompt : (it.content != null ? it.content : (it["写法"] != null ? it["写法"] : (it["提示词"] != null ? it["提示词"] : ""))));
            }
            name = adrTheaterCleanName(name);
            text = typeof text === "string" ? text.trim() : "";
            if (name && text) out.push({ name: name, text: text });
        });
        if (!out.length) throw new Error("包里没有读到可用的主题（每个主题要有名字和写法）");
        return out;
    }

    function adrTheaterImportList(list) {
        var store = adrTheaterStore();
        var res = { added: 0, same: 0, renamed: 0, total: list.length, first: "" };
        list.forEach(function (it) {
            var name = it.name;
            if (typeof store[name] === "string") {
                if (store[name] === it.text) { res.same++; return; }
                var base = name + "（导入）", k = 2;
                name = base;
                while (typeof store[name] === "string") {
                    if (store[name] === it.text) { name = ""; break; }
                    name = base + k; k++;
                }
                if (!name) { res.same++; return; }
                res.renamed++;
            } else {
                res.added++;
            }
            store[name] = it.text;
            if (!res.first) res.first = name;
        });
        save("theaterStore", store);
        saveNow();
        return res;
    }

    function adrTheaterImportText(jsonText) {
        try {
            var data = JSON.parse(String(jsonText || "").replace(/^﻿/, ""));
            var res = adrTheaterImportList(adrTheaterParsePack(data));
            adrTheaterRefreshFields();
            adrTheaterStatus("主题包导入完成：新增 " + res.added + " 个" + (res.renamed ? "、同名不同写法改名放进来 " + res.renamed + " 个" : "") + (res.same ? "、一模一样跳过 " + res.same + " 个" : "") + "；主题仓现有 " + adrTheaterNames().length + " 个 ✓", "#8ed99d");
            return res;
        } catch (e) {
            adrTheaterStatus("导入失败：" + (e && e.message ? e.message : String(e)), "#d4726a");
            return null;
        }
    }

    function adrTheaterHandleImportFile(fileInput) {
        try {
            var file = fileInput && fileInput.files && fileInput.files[0];
            if (!file) return;
            var reader = new (rootWin().FileReader || FileReader)();
            reader.onload = function () { adrTheaterImportText(String(reader.result || "")); };
            reader.onerror = function () { adrTheaterStatus("导入失败：文件读取错误", "#d4726a"); };
            reader.readAsText(file);
        } catch (e) { adrTheaterStatus("导入失败：" + (e && e.message ? e.message : String(e)), "#d4726a"); }
    }

    function adrTheaterTriggerImport() {
        var f = qForm("adr044-theater-import-file");
        if (f) { try { f.value = ""; } catch (e0) {} f.click(); }
    }

    function adrTheaterExportPack() {
        try {
            var pack = adrTheaterPackObject();
            if (!pack.count) { adrTheaterStatus("主题仓是空的，没什么可导出", "#d4726a"); return false; }
            var d = rootDoc();
            var now = new Date();
            var stamp = now.getFullYear() + ("0" + (now.getMonth() + 1)).slice(-2) + ("0" + now.getDate()).slice(-2);
            var blob = new Blob([JSON.stringify(pack, null, 2)], { type: "application/json;charset=utf-8" });
            var a = d.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.download = "红霞剧场主题包-" + stamp + ".json";
            (d.body || d.documentElement).appendChild(a);
            a.click();
            setTimeout(function () {
                try { URL.revokeObjectURL(a.href); } catch (e1) {}
                try { if (a.parentNode) a.parentNode.removeChild(a); } catch (e2) {}
            }, 1200);
            adrTheaterStatus("主题包已导出：" + pack.count + " 个主题 ✓", "#8ed99d");
            return true;
        } catch (e) {
            adrTheaterStatus("导出失败：" + (e && e.message ? e.message : String(e)), "#d4726a");
            return false;
        }
    }

    function adrTheaterClearStore(btn) {
        var n = adrTheaterNames().length;
        if (!n) { adrTheaterStatus("主题仓已经空了", "#d6b177"); return false; }
        return adrDTwoStepConfirm("theater-clear", btn || qForm("adr044-theater-clear"), "确定清空？", "再点一次清空主题仓（" + n + " 个全删；想留就先导出）",
            function (msg) { adrTheaterStatus(msg, "#d6a26a"); },
            function () {
                adrTheaterMarkSeeded(Object.keys(ADR_THEATER_FACTORY));   // 出厂的也算删过，不自己长回来
                save("theaterStore", {});
                save("theaterCurrent", "");
                saveNow();
                adrTheaterRefreshFields();
                adrTheaterStatus("主题仓清空了。可以导入一个主题包，或点「补回出厂六个」", "#d6b177");
            });
    }

    function adrTheaterRestoreFactory() {
        var st = settings();
        var store = (st.theaterStore && typeof st.theaterStore === "object" && !Array.isArray(st.theaterStore)) ? st.theaterStore : {};
        var back = 0;
        Object.keys(ADR_THEATER_FACTORY).forEach(function (k) {
            if (typeof store[k] === "string") return;
            store[k] = ADR_THEATER_FACTORY[k];
            back++;
        });
        save("theaterStore", store);
        adrTheaterMarkSeeded(Object.keys(ADR_THEATER_FACTORY));
        saveNow();
        adrTheaterRefreshFields();
        adrTheaterStatus(back ? "补回了 " + back + " 个出厂主题 ✓（你改过的同名主题没动）" : "出厂六个都在，没什么要补的", "#8ed99d");
        return back;
    }

    function adrTheaterCopyRegex() {
        var text = ADR_THEATER_STRIP_REGEX_TEXT;
        function done(ok) { adrTheaterStatus(ok ? "剥离正则已复制 ✓ 去酒馆「正则」里新建一条贴进去" : "没复制上，长按上面那一行手动复制", ok ? "#8ed99d" : "#d4726a"); }
        try {
            var nav = rootWin().navigator;
            if (nav && nav.clipboard && typeof nav.clipboard.writeText === "function") { nav.clipboard.writeText(text).then(function () { done(true); }, function () { fallback(); }); return true; }
        } catch (e) {}
        function fallback() {
            try {
                var el = qForm("adr044-theater-regex");
                if (!el) return done(false);
                el.focus(); el.select();
                done(!!rootDoc().execCommand && rootDoc().execCommand("copy"));
            } catch (e2) { done(false); }
        }
        fallback();
        return true;
    }

    function adrTheaterPageInnerHTML(secOpen, secClose, checkClass, actionsClass) {
        var st = settings();
        var noteClass = checkClass === "adr048-check" ? "adr048-note" : "adr044-note";
        var sel = adrTheaterCurrentName();
        var names = adrTheaterNames();
        var store = adrTheaterStore();
        var borrow = adrTheaterBorrow();
        var status0 = adrTheaterStatusForRender();
        return secOpen("🎭 红霞剧场 · 每层楼尾来一场", false, "theater-main")
            + '<div class="' + noteClass + '">开了以后，每层助手正文落地，霞姐在楼尾插一场：弹幕、场外嗑瓜子、Q 版四格、花絮……她看到的和掌灯一样（基调、角色卡、世界书、人设、此前各楼摘要、本篇全文），所以说的是这个世界里的话。插在楼里是给你看的，别让主模型看见——「剥离正则」那一节的东西贴进酒馆「正则」就行。</div>'
            + '<label class="' + checkClass + '"><input type="checkbox" id="adr044-theater-enabled"' + (st.theaterEnabled === true ? " checked" : "") + '> 启用红霞剧场（走剧场位 API，每层一次，花钱；「小红霞正在运行」关着就不演）</label>'
            + '<label>主题怎么选</label><select id="adr044-theater-pick">' + opt(adrTheaterPickMode(), "fixed", "固定：每层都用主题仓里选中的那个") + opt(adrTheaterPickMode(), "random", "随机：每层从主题仓里抽一个，不连着抽同一个") + '</select>'
            + '<label class="' + checkClass + '"><input type="checkbox" id="adr044-theater-rich"' + (st.theaterRich !== false ? " checked" : "") + '> 允许 HTML / CSS 排版（主题里点名要排版时，她可以回一段带样式的 HTML；不勾就一律纯文本）</label>'
            + '<label class="' + checkClass + '"><input type="checkbox" id="adr044-theater-fold"' + (st.theaterFold === true ? " checked" : "") + '> 插进去时默认折叠（点开才看；不勾就是摊开的）</label>'
            + '<div class="' + actionsClass + '"><button type="button" id="adr044-theater-now">🎬 现在来一场</button><button type="button" id="adr044-theater-stop"' + (adrTheaterState.busy ? '' : ' disabled') + '>打断</button></div>'
            + '<div class="' + actionsClass + '"><button type="button" id="adr044-theater-remove">撤掉最新一楼的</button></div>'
            + '<div class="adr044-template-status" id="adr044-theater-status"' + (status0.color ? ' style="color:' + esc(status0.color) + '"' : '') + '>' + esc(status0.text) + '</div>'
            + secClose()

            + secOpen("📚 主题仓 · 这一场怎么写", false, "theater-lib")
            + '<div class="' + noteClass + '">出厂六个；能改、能加、能删，也能整包导入导出。每个主题就是一段话：谁在说、几条几格、什么腔调。想要彩色卡片这类排版，就在写法里写明「用 HTML 排版」和长什么样。</div>'
            + '<select id="adr044-theater-select" data-optsig="' + esc(adrCdOptSig("theater", names, sel)) + '">' + adrTheaterOptionsHTML(sel) + '</select>'
            + '<input type="text" id="adr044-theater-name" placeholder="主题名，如：弹幕吐槽 / 场外嗑瓜子 / 你自己起" value="' + esc(sel) + '">'
            + '<textarea id="adr044-theater-text" rows="5" placeholder="这个主题怎么写">' + esc(sel ? String(store[sel] || "") : "") + '</textarea>'
            + '<div class="' + actionsClass + '"><button type="button" id="adr044-theater-save">存进主题仓</button><button type="button" id="adr044-theater-delete">从仓里删掉</button></div>'
            + '<div class="' + actionsClass + '"><button type="button" id="adr044-theater-import">导入主题包</button><button type="button" id="adr044-theater-export">导出主题包</button></div>'
            + '<input type="file" id="adr044-theater-import-file" class="adr044-cd-import-file" accept=".json,application/json,text/json,text/plain">'
            + '<div class="' + actionsClass + '"><button type="button" id="adr044-theater-clear">清空主题仓</button><button type="button" id="adr044-theater-restore">补回出厂六个</button></div>'
            + '<div class="adr044-template-status" id="adr044-theater-count">主题仓现有 ' + names.length + ' 个主题</div>'
            + secClose()

            + secOpen("🖋️ 霞姐的人设 · 剧场的底色", true, "theater-persona")
            + '<div class="' + noteClass + '">每一场都带着这一层：她是谁、写给谁看（书外的成年读者，不是剧情里的 user；讨厌低俗、拒绝恶俗）、底线在哪（艺术创作也有边界）、文字要什么质感、排版要多好看。主题仓里的主题叠在它上面，腔调跟主题走，质感和底线靠这一层兜住。留空用出厂；自己写了就整段换成你的。「剧场不是正文、只写这一楼、怎么输出、排版别把页面带歪」这些规矩由代码接管，不在这里，改人设改不坏。</div>'
            + '<textarea id="adr044-theater-persona" rows="7" placeholder="留空＝出厂人设">' + esc(st.theaterPersona || "") + '</textarea>'
            + '<div class="' + actionsClass + '"><button type="button" id="adr044-theater-persona-fill">填入出厂人设来改</button><button type="button" id="adr044-theater-persona-reset">恢复出厂人设</button></div>'
            + '<div class="adr044-template-status" id="adr044-theater-persona-note">' + esc(adrTheaterPersonaNote()) + '</div>'
            + '<details class="adr-lamp-fold"><summary>看看出厂人设全文</summary><div class="adr-lamp-mat">' + esc(ADR_THEATER_PERSONA) + '</div></details>'
            + '<details class="adr-lamp-fold"><summary>看看代码接管的规矩（不在这里改）</summary><div class="adr-lamp-mat" id="adr044-theater-rules-view">' + esc(adrTheaterRulesText(adrTheaterRichAllowed())) + '</div></details>'
            + secClose()

            + secOpen("✂️ 剥离正则 · 别让主模型看见剧场", true, "theater-regex")
            + '<div class="' + noteClass + '">酒馆「正则」扩展新建一条：查找填下面这行，替换留空，作用范围勾「AI 输出」，下面只勾「仅格式提示词」。懒得手填，扩展目录里有现成的 regex/arrebol-theater-strip.json，「导入脚本」选它。小红霞自己读楼（导演、掌灯、蛐蛐）本来就当剧场不存在，不用另配。</div>'
            + '<input type="text" id="adr044-theater-regex" readonly value="' + esc(ADR_THEATER_STRIP_REGEX_TEXT) + '">'
            + '<div class="' + actionsClass + '"><button type="button" id="adr044-theater-regex-copy">复制剥离正则</button></div>'
            + secClose()

            + secOpen("🔌 API · 剧场位", true, "theater-api")
            + '<div class="' + noteClass + '">剧场位是写小剧场的那个模型。默认跟掌灯的聊天位走；想让它用便宜又会玩梗的模型，在这里借别人的或者自己填，和掌灯互不相干。</div>'
            + '<label>剧场位</label><select id="adr044-stage-borrow">'
            + opt(borrow, "lamp", "和掌灯聊天位一样") + opt(borrow, "plot", "借统筹的") + opt(borrow, "emotion", "借情感导演的") + opt(borrow, "expand", "借展开的") + opt(borrow, "cd", "借小眼睛的") + opt(borrow, "self", "自己填")
            + '</select>'
            + adrHxApiRowHTML("stage")
            + '<div id="adr044-stage-self"' + (borrow === "self" ? "" : ' class="adr-lamp-hide"') + '>'
            + '<label>剧场位 API 地址</label><input type="text" id="adr044-stage-endpoint" value="' + esc(st.stageApiEndpoint || "") + '" placeholder="https://api.example.com/v1">'
            + '<label>剧场位 API 密钥</label><input type="password" id="adr044-stage-key" value="' + esc(st.stageApiKey || "") + '" placeholder="sk-...">'
            + '<label>剧场位模型</label><input type="text" id="adr044-stage-model" value="' + esc(st.stageModel || "") + '" placeholder="可以手填，或加载模型">'
            + '<select id="adr044-stage-model-select"><option value="">加载后在此选择模型</option></select>'
            + '<div class="' + actionsClass + '"><button id="adr044-stage-load-models" type="button">加载模型</button><button id="adr044-stage-test" type="button">测试连接</button></div>'
            + '</div>'
            + '<div class="adr044-template-status" id="adr044-stage-status"></div>'
            + '<label>温度（0–2，默认 0.9；高一点梗更野，低一点更稳）</label><input type="number" id="adr044-theater-temp" min="0" max="2" step="0.1" value="' + esc(String(adrTheaterTemp())) + '">'
            + '<div class="adr044-template-status" id="adr044-theater-api-note">' + esc(adrTheaterApiNote()) + '</div>'
            + secClose();
    }

    function adrTheaterPageHTML() {
        var st = settings();
        function secOpen(title, closed, key) { return adrxDrawerStart(key, title, !closed, true); }
        function secClose() { return '</details>'; }
        return '<div class="adr044-page" id="adr044-page-theater"' + (st.activeTab === "theater" ? '' : ' style="display:none"') + '>'
            + adrTheaterPageInnerHTML(secOpen, secClose, "adr044-check", "adr044-actions")
            + '</div>';
    }

    function adrTheater048PageHTML() {
        var st = settings();
        function secOpen(title, closed, key) { return adrxDrawerStart(key, title, !closed, true); }
        function secClose() { return '</details>'; }
        return '<div class="adr048-page" id="adr048-page-theater"' + (st.activeTab === "theater" ? '' : ' style="display:none"') + '>'
            + adrTheaterPageInnerHTML(secOpen, secClose, "adr048-check", "adr048-actions")
            + '</div>';
    }

    function adrTheaterHandleButtonId(id, btn) {
        if (id === "adr044-theater-save") { adrTheaterSaveFromFields(); return true; }
        if (id === "adr044-theater-delete") { adrTheaterDeleteFromFields(btn); return true; }
        if (id === "adr044-theater-now") { adrTheaterNow("manual", true).catch(function () {}); return true; }
        if (id === "adr044-theater-stop") { adrTheaterAbort(); return true; }
        if (adrHxApiHandleButtonId(id, btn)) return true;
        if (id === "adr044-theater-persona-fill") { adrTheaterPersonaFill(btn); return true; }
        if (id === "adr044-theater-persona-reset") { adrTheaterPersonaReset(btn); return true; }
        if (id === "adr044-theater-remove") { adrTheaterRemoveLatest(); return true; }
        if (id === "adr044-theater-regex-copy") { adrTheaterCopyRegex(); return true; }
        if (id === "adr044-theater-import") { adrTheaterTriggerImport(); return true; }
        if (id === "adr044-theater-export") { adrTheaterExportPack(); return true; }
        if (id === "adr044-theater-clear") { adrTheaterClearStore(btn); return true; }
        if (id === "adr044-theater-restore") { adrTheaterRestoreFactory(); return true; }
        if (id === "adr044-tab-theater") { switchTab("theater"); return true; }
        if (id === "adr044-stage-load-models") { loadModels("stage"); return true; }
        if (id === "adr044-stage-test") { adrTheaterTestConnection(); return true; }
        return false;
    }

    function adrTheaterBindControls() {
        try {
            function each(id, fn) {
                Array.prototype.slice.call(rootDoc().querySelectorAll("#" + id)).forEach(function (el) {
                    if (!el || el.__adrTheaterBound) return;
                    el.__adrTheaterBound = true;
                    fn(el);
                });
            }
            function tap(el) { ["pointerdown", "touchstart", "mousedown"].forEach(function (evt) { el.addEventListener(evt, function () { adrCdTouch(el); if (String(el.tagName || "").toLowerCase() === "select") el.__adrCdPickerOpenAt = Date.now(); }, { passive: true }); }); }
            function typing(el) {
                el.addEventListener("focus", function () { el.__adrCdTyping = true; });
                el.addEventListener("blur", function () { setTimeout(function () { el.__adrCdTyping = false; }, 400); });
            }
            each("adr044-theater-enabled", function (el) {
                tap(el);
                el.addEventListener("change", function () {
                    adrCdTouch(el); save("theaterEnabled", !!el.checked); saveNow();
                    adrCdSetTextAll("adr044-theater-topline", adrTheaterTopLineText());
                    adrTheaterStatus(el.checked ? "红霞剧场开了：从下一层起每层楼尾来一场（花钱）。记得把剥离正则贴进酒馆" : "红霞剧场关了，已经插进楼里的不动", "#8ed99d");
                });
            });
            each("adr044-theater-fold", function (el) {
                tap(el);
                el.addEventListener("change", function () { adrCdTouch(el); save("theaterFold", !!el.checked); saveNow(); });
            });
            each("adr044-theater-rich", function (el) {
                tap(el);
                el.addEventListener("change", function () {
                    adrCdTouch(el); save("theaterRich", !!el.checked); saveNow();
                    adrCdSetTextAll("adr044-theater-rules-view", adrTheaterRulesText(adrTheaterRichAllowed()));
                    adrTheaterStatus(el.checked ? "允许 HTML / CSS 排版：主题里点名要排版，她才会回带样式的 HTML" : "一律纯文本：她回来的标签会当成普通字显示", "#8ed99d");
                });
            });
            each("adr044-theater-pick", function (el) {
                tap(el);
                el.addEventListener("change", function () {
                    adrCdTouch(el); el.__adrCdPickerOpenAt = 0;
                    save("theaterPick", el.value === "random" ? "random" : "fixed"); saveNow();
                    adrCdSetTextAll("adr044-theater-topline", adrTheaterTopLineText());
                    adrTheaterStatus(el.value === "random" ? "随机抽：每层从主题仓里抽一个" : "固定用「" + adrTheaterCurrentName() + "」", "#8ed99d");
                });
            });
            each("adr044-theater-select", function (el) {
                tap(el);
                el.addEventListener("change", function () { adrCdTouch(el); el.__adrCdPickerOpenAt = 0; adrTheaterSelect(String(el.value || "")); });
            });
            each("adr044-theater-name", function (el) { typing(el); });
            each("adr044-theater-text", function (el) { typing(el); });
            // v1.45.5 人设层：改完点别处就存；另一端同步
            each("adr044-theater-persona", function (el) {
                typing(el);
                el.addEventListener("change", function () {
                    var v = String(el.value || "");
                    save("theaterPersona", v); saveNow();
                    try {
                        Array.prototype.slice.call(rootDoc().querySelectorAll("#adr044-theater-persona")).forEach(function (other) { if (other !== el) other.value = v; });
                    } catch (e) {}
                    adrTheaterPersonaSay(adrTheaterPersonaCustom() ? "存下了 ✓ " + adrTheaterPersonaNote() : "留空了：用出厂人设");
                });
            });
            each("adr044-theater-import-file", function (el) {
                el.addEventListener("change", function () { adrTheaterHandleImportFile(el); });
            });
            // v1.46.0 API 预设：下拉一选就切
            each("adr044-api-profile-select-stage", function (el) {
                tap(el);
                // 选完就放行刷新（不再给 1.5 秒免疫）：紧接着改「借谁的」时，这一行要能马上回到没选
                el.addEventListener("change", function () { el.__adrCdPickerOpenAt = 0; el.__adrCdTouchedAt = 0; adrHxApiOnSelect("stage", el); });
            });
            each("adr044-api-profile-name-stage", function (el) { typing(el); });
            // v1.45.0 剧场位
            each("adr044-stage-borrow", function (el) {
                tap(el);
                el.addEventListener("change", function () {
                    adrCdTouch(el); el.__adrCdPickerOpenAt = 0;
                    save("theaterBorrow", ADR_THEATER_BORROW_LABEL[el.value] ? String(el.value) : "lamp"); saveNow();
                    adrTheaterRefreshFields(false);
                });
            });
            [["adr044-stage-endpoint", "stageApiEndpoint"], ["adr044-stage-key", "stageApiKey"], ["adr044-stage-model", "stageModel"]].forEach(function (pair) {
                each(pair[0], function (el) {
                    typing(el);
                    el.addEventListener("change", function () { save(pair[1], String(el.value || "").trim()); saveNow(); adrTheaterRefreshFields(false); });
                });
            });
            each("adr044-stage-model-select", function (el) {
                tap(el);
                el.addEventListener("change", function () {
                    adrCdTouch(el); el.__adrCdPickerOpenAt = 0;
                    if (!el.value) return;
                    adrCdSetValueSafe("adr044-stage-model", el.value);
                    save("stageModel", String(el.value)); saveNow();
                    adrTheaterRefreshFields(false);
                });
            });
            each("adr044-theater-temp", function (el) {
                typing(el);
                el.addEventListener("change", function () { save("theaterTemp", Number(el.value)); var t = adrTheaterTemp(); save("theaterTemp", t); el.value = String(t); saveNow(); });
            });
        } catch (e) {
            try { console.warn("[Arrebol D] theater bind failed", e); } catch (e2) {}
        }
    }

    try {
        rootWin().__adrTheaterTest = {
            now: adrTheaterNow, onMessage: adrTheaterOnMessage, block: adrTheaterBlock, strip: adrTheaterStrip, has: adrTheaterHas, clean: adrTheaterClean,
            pick: adrTheaterPickTheme, store: adrTheaterStore, names: adrTheaterNames, factory: ADR_THEATER_FACTORY, preset: ADR_THEATER_PRESET, presetText: adrTheaterPresetText,
            persona: ADR_THEATER_PERSONA, personaText: adrTheaterPersonaText, rulesText: adrTheaterRulesText,
            stance: adrHxStance,
            regexText: ADR_THEATER_STRIP_REGEX_TEXT, state: adrTheaterState, remove: adrTheaterRemoveLatest, write: adrTheaterWrite, abort: adrTheaterAbort,
            paint: adrTheaterPaint, show: adrTheaterShow, saveSoon: adrTheaterSaveSoon, lampDirty: function () { return adrLampDirty; },
            apiCfg: adrTheaterApiCfg, apiNote: adrTheaterApiNote, topLine: adrTheaterTopLineText,
            tidyRich: adrTheaterTidyRich, packObject: adrTheaterPackObject, parsePack: adrTheaterParsePack, importText: adrTheaterImportText,
            handleFile: adrTheaterHandleImportFile, restoreFactory: adrTheaterRestoreFactory
        };
    } catch (eTheaterHook) {}
    // ================= 红霞剧场 模块结束 =================

    try {
        rootWin().__adrLampTest = {
            materials: adrLampMaterials, materialsText: adrLampMaterialsText, compose: adrLampComposeFloor, parsePen: adrLampParsePen, splitTail: adrLampSplitTail,
            statusBlocks: adrLampExtractStatusBlocks, statusText: adrLampStatusBlocksText, statusTags: adrLampStatusTagNames,
            apiCfg: adrLampApiCfg, state: adrLampState, send: adrLampSend, rewrite: adrLampRewrite, applyNow: adrLampApplyDraftNow,
            pushSwipe: adrLampPushSwipe, preset: ADR_LAMP_PRESET, penPreset: ADR_LAMP_PEN_PRESET,
            editProtocol: ADR_LAMP_EDIT_PROTOCOL, penMark: ADR_LAMP_PEN_MARK, hasPenMark: adrLampHasPenMark, stripPenMark: adrLampStripPenMark,
            hxReader: ADR_HX_READER, hxBoundary: ADR_HX_BOUNDARY, hxSuggest: ADR_HX_SUGGEST,
            stance: adrHxStance,
            setMode: adrLampSetMode, apiHistory: adrLampApiHistory, gossipPreset: ADR_LAMP_GOSSIP_PRESET,
            autoQuip: adrLampAutoQuipNow, quipAsk: ADR_LAMP_QUIP_ASK,
            quipPush: adrLampQuipPush, quipAck: adrLampQuipAck, quipQueue: adrLampQuipQueue
        };
    } catch (eLampHook) {}
    // ================= 小红霞掌灯 模块结束 =================


    function opt(cur, val, label) {
        return '<option value="' + val + '"' + (String(cur) === String(val) ? " selected" : "") + '>' + label + '</option>';
    }

    function pageHTML(type) {
        var st = settings();
        var p = prefixOf(type);
        var title = type === "plot" ? "统筹" : "情感导演";
        var autoKey = type === "plot" ? "autoInjectPlot" : "autoInjectEmotion";

        return '<div class="adr044-page" id="adr044-page-' + type + '"' + (st.activeTab === type ? '' : ' style="display:none"') + '>'
            + adrxDrawerStart('api-' + type, title + ' · API 配置', false, true)
            + '<label>API 预设</label>'
            + '<div class="adr044-template-compact adr044-api-profile-compact">'
            + '<select id="adr044-api-profile-select-' + type + '">' + adrDApiProfileSelectOptions(type, adrDSelectedApiProfileName(type) || "") + '</select>'
            + '<input type="text" id="adr044-api-profile-name-' + type + '" value="' + esc(adrDSelectedApiProfileName(type) || "") + '" placeholder="预设名，如 DS / Claude">'
            + '<div class="adr044-template-mini-actions">'
            + '<button type="button" id="adr044-api-profile-save-' + type + '">保存</button>'
            + '<button type="button" id="adr044-api-profile-delete-' + type + '">删除</button>'
            + '</div>'
            + '<div class="adr044-template-status" id="adr044-api-profile-status-' + type + '">下拉选择会立即切换；改名后保存会新增/更新预设。</div>'
            + '</div>'
            + '<label>API 地址</label><input type="text" id="adr044-' + type + '-endpoint" value="' + esc(st[p + "ApiEndpoint"] || "") + '" placeholder="https://openrouter.ai/api/v1">'
            + '<label>API 密钥</label><input type="password" id="adr044-' + type + '-key" value="' + esc(st[p + "ApiKey"] || "") + '" placeholder="sk-...">'
            + '<label>模型</label><input type="text" id="adr044-' + type + '-model" value="' + esc(st[p + "Model"] || "") + '" placeholder="可以手填，或加载模型">'
            + '<select id="adr044-' + type + '-model-select"><option value="' + esc(st[p + "Model"] || "") + '">' + (st[p + "Model"] ? esc(st[p + "Model"]) + "（当前）" : "加载后选择模型") + '</option></select>'
            + '<div class="adr044-actions"><button id="adr044-' + type + '-load-models" type="button">加载模型</button><button id="adr044-' + type + '-save" type="button">保存当前使用</button></div>'
            + '<label class="adr044-check"><input type="checkbox" id="adr044-auto-inject-' + type + '"' + (st[autoKey] ? " checked" : "") + '> 生成后自动注入当前聊天</label>'
            + '</details>'

            + adrxDrawerStart('preset-' + type, title + '预设', false, true)
            + '<div class="adr044-template-compact">'
            + '<select id="adr044-template-select-' + type + '">' + adrDTemplateOptions(type) + '</select>'
            + '<input id="adr044-template-name-' + type + '" placeholder="新模板名 / 当前模板名">'
            + '<div class="adr044-template-mini-actions">'
            + '<button type="button" id="adr044-template-save-' + type + '">保存当前为模板</button>'
            + '<button type="button" id="adr044-template-delete-' + type + '">删除模板</button>'
            + '</div>'
            + '<div class="adr044-template-status" id="adr044-template-status-' + type + '"></div>'
            + '</div>'
            + '<textarea id="adr044-' + type + '-preset" rows="8">' + esc(st[p + "Preset"] || "") + '</textarea>'
            + '</details>'

            + '<details open><summary>' + title + '结果</summary>'
            + '<div id="adr044-' + type + '-status">可先试运行看看导演会读到什么，或直接点「分析」。</div>'
            + '<textarea id="adr044-' + type + '-preview" rows="8" placeholder="生成结果显示在这里">' + esc(st[p + "Preview"] || "") + '</textarea>'
            + '<label>想对导演说的话（选填）</label><input type="text" id="adr044-' + type + '-extra" placeholder="空着就是普通分析；填了导演会带着你的要求分析">'
            + '<div class="adr044-actions"><button id="adr044-' + type + '-local" type="button">试运行（不花钱）</button><button id="adr044-' + type + '-generate" type="button">分析</button></div>'
            + '<div class="adr044-actions"><button id="adr044-' + type + '-stop" type="button" disabled>打断</button><button id="adr044-' + type + '-copy" type="button">复制</button></div>'
            + '<div class="adr044-actions"><button id="adr044-' + type + '-inject" type="button">把这份稿挂上</button><button id="adr044-' + type + '-graze" type="button">放养</button></div>'
            + '</details>'
            + '</div>';
    }

    // v1.28.0: one top deck per surface; existing control IDs and save handlers stay intact.
    function adrDTopDeckHTML(popup) {
        var st = settings();
        var active = st.activeTab === "plot" || st.activeTab === "cd" || st.activeTab === "lamp" || st.activeTab === "theater" ? st.activeTab : "emotion";
        var kinds = ["emotion", "plot", "cd", "lamp", "theater"];
        var labels = { emotion: "情感导演", plot: "统筹", cd: "抽卡", lamp: "掌灯", theater: "剧场" };
        var html = '<div class="' + (popup ? 'adr048-tabs' : 'adr044-tabs') + ' adr-top-tabs" role="group" aria-label="切换导演">';
        kinds.forEach(function (type) {
            html += '<button id="adr044-tab-' + type + '" type="button" aria-pressed="' + (active === type) + '" class="' + (active === type ? 'active' : '') + '">' + labels[type] + '</button>';
        });
        html += '</div><div class="adr-top-progress">';
        kinds.forEach(function (type) {
            if (type === 'lamp') {
                // v1.39.0 掌灯不是导演：没有计数、没有基准线，顶上只有一行"对着哪一楼、聊了几句"。
                html += '<div class="adr-top-pane" data-director="lamp"' + (active === type ? '' : ' hidden') + '>'
                    + '<div class="adr-lamp-topline" id="adr044-lamp-topline">🏮 掌灯</div></div>';
                return;
            }
            if (type === 'theater') {
                // v1.45.0 剧场也不是导演：顶上一行"开没开、怎么选主题、仓里几个"
                html += '<div class="adr-top-pane" data-director="theater"' + (active === type ? '' : ' hidden') + '>'
                    + '<div class="adr-lamp-topline" id="adr044-theater-topline">' + esc(adrTheaterTopLineText()) + '</div></div>';
                return;
            }
            html += '<div class="adr-top-pane" data-director="' + type + '"' + (active === type ? '' : ' hidden') + '>'
                + '<div class="adr044-auto-counter" id="adr044-auto-counter-' + type + '">'
                + adrDCounterHTML(type === 'cd' ? adrCdCounterInfo() : adrDAutoCounterText(type)) + '</div>';
            if (type === 'cd') {
                html += '<div class="adr044-cd-status-line" id="adr044-cd-status-line" title="点一下展开／收起">' + esc(adrCdStatusText()) + '</div>';
            } else {
                html += '<div class="adr044-auto-calibrate-row adr-top-calibrate"><button class="adr044-auto-calibrate" id="adr044-' + type + '-calibrate-auto" type="button" title="从当前楼层重新计数自动触发间隔">重新对表</button><span>从当前楼层重新计数</span></div>'
                    + adrDTriggerControlsHTML(type, popup);
            }
            html += '</div>';
        });
        return html + '</div>';
    }

    function adrDTriggerControlsHTML(type, popup) {
        var st = settings();
        var checkClass = popup ? 'adr048-check' : 'adr044-check';
        var noteClass = popup ? 'adr048-note' : 'adr044-note';
        return adrxDrawerStart('trigger-' + type, '独立开关与层数', false)
            + '<label class="' + checkClass + '"><input type="checkbox" id="adr044-auto-trigger-' + type + '"' + (st[type === "plot" ? "autoTriggerPlot" : "autoTriggerEmotion"] ? " checked" : "") + '> ' + (type === "plot" ? "让统筹定期来看一眼大局（默认关）" : "启用情感导演自动触发") + '</label>'
            + '<label>自动触发间隔</label>'
            + '<select id="adr044-auto-trigger-range-' + type + '">'
            + opt(st[type === "plot" ? "autoTriggerPlotRange" : "autoTriggerEmotionRange"], "10", "每 10 个助手正文轮次")
            + opt(st[type === "plot" ? "autoTriggerPlotRange" : "autoTriggerEmotionRange"], "20", "每 20 个助手正文轮次")
            + opt(st[type === "plot" ? "autoTriggerPlotRange" : "autoTriggerEmotionRange"], "30", "每 30 个助手正文轮次")
            + opt(st[type === "plot" ? "autoTriggerPlotRange" : "autoTriggerEmotionRange"], "50", "每 50 个助手正文轮次")
            + opt(st[type === "plot" ? "autoTriggerPlotRange" : "autoTriggerEmotionRange"], "custom", "自定义")
            + '</select>'
            + '<input type="number" id="adr044-auto-trigger-custom-' + type + '" placeholder="自定义自动触发轮次" value="' + esc(st[type === "plot" ? "autoTriggerPlotCustomRange" : "autoTriggerEmotionCustomRange"] || "") + '" style="display:' + (String(st[type === "plot" ? "autoTriggerPlotRange" : "autoTriggerEmotionRange"]) === "custom" ? "block" : "none") + '">'
            + '<div class="' + noteClass + ' adr044-auto-reroll-note">ℹ️ 触发层重 roll 不会自动再触发；如需基于新回复补导演建议，点「分析」即可，想附加要求就先填补充指令。</div>'
            + '</details>';
    }

    function drawerHTML() {
        var st = settings();

        return '<div id="adr044-drawer"><div class="inline-drawer">'
            + '<div class="inline-drawer-toggle inline-drawer-header"><b>🎬 Arrebol D 暗河红霞导演系统 v' + ADR_D_VERSION + '</b><div class="inline-drawer-icon fa-solid fa-circle-chevron-down down"></div></div>'
            + '<div class="inline-drawer-content">'
            + '<div class="adr044-box">'
            + '<button type="button" id="adr044-master-toggle" data-master-on="' + (st.masterEnabled !== false ? '1' : '0') + '">' + adrDMasterToggleLabel() + '</button>'
            + adrDTopDeckHTML(false)

            + adrxDrawerStart("shared-main", "共享设置", false)
            + '<label>导演回看多少楼</label><select id="adr044-range">'
            + opt(st.range, "10", "最近 10 轮")
            + opt(st.range, "20", "最近 20 轮")
            + opt(st.range, "30", "最近 30 轮")
            + opt(st.range, "50", "最近 50 轮")
            + opt(st.range, "custom", "自定义")
            + '</select>'
            + '<input type="number" id="adr044-custom" placeholder="自定义轮数" value="' + esc(st.customRange || "") + '" style="display:' + (String(st.range) === "custom" ? "block" : "none") + '">'
            + adrDToneBlockHTML("adr044-actions")
            + '<label>角色卡要点 / 世界书 / 当前担心</label>'
            + '<textarea id="adr044-memory" rows="5" placeholder="这里会同时发给情感导演和统筹">' + esc(st.supplementMemory || "") + '</textarea>'
            + '<label>导演稿怎么放进聊天</label><select id="adr044-inject-mode">'
            + opt(st.injectMode, "visible", "直接显示在楼里")
            + opt(st.injectMode, "folded", "隐形标记（配合美化正则）")
            + '</select>'
            + '<label class="adr044-check"><input type="checkbox" id="adr044-show-floating-window"' + (st.showFloatingWindow ? " checked" : "") + '> 显示小红霞浮窗</label>'
            + '<label class="adr044-check"><input type="checkbox" id="adr044-fab-motion"' + (st.fabMotion !== false ? " checked" : "") + '> 浮标流动动效（怀疑手机发烫可以关掉对比）</label>'
            + '<label class="adr044-check"><input type="checkbox" id="adr044-show-auto-trigger-popup"' + (st.showAutoTriggerPopup !== false ? " checked" : "") + '> 导演上岗前先打个招呼</label>'
            + '<label class="adr044-check"><input type="checkbox" id="adr044-stream-enabled"' + (st.streamEnabled !== false ? " checked" : "") + '> 流式接收导演稿（thinking 模型建议开；中转站不支持流式就关掉）</label>'
            + adrxDrawerStart("shared-adv", "⚙️ 进阶开关（默认已调好，一般不用动）", false)
            + '<label>正文标签名（默认 content，多个用英文逗号分隔；正文没有标签就填 *，整层楼当正文读）</label>'
            + '<input type="text" id="adr044-content-tags" placeholder="content" value="' + esc(st.contentTagNames || "content") + '">' 
            + '<label class="adr044-check"><input type="checkbox" id="adr044-float-inject"' + (st.floatInjectEnabled !== false ? " checked" : "") + '> 贴耳模式：最新一份稿始终跟着对话走（藏楼/摘要洗不掉）</label>'
            + '<label>贴耳位置：稿子塞在倒数第几条（默认 2，不懂别动）</label><input type="number" id="adr044-float-depth" min="0" max="99" value="' + esc(st.floatDepth != null ? st.floatDepth : 2) + '">'
            + '<label class="adr044-check"><input type="checkbox" id="adr044-director-log"' + (st.directorLogEnabled !== false ? " checked" : "") + '> 跟组模式：导演记得自己说过什么，不翻烧饼</label>'
            + '<label class="adr044-check"><input type="checkbox" id="adr044-ng-detect"' + (st.ngDetectEnabled !== false ? " checked" : "") + '> NG 检测：同一楼重 roll ' + ADR_D_NG_THRESHOLD + ' 次提示请导演</label>'
            + '</details>'
            + adrxDrawerStart("shared-diag", "🔧 校对与诊断（排查问题时才用）", false)
            + '<div class="adr044-actions"><button id="adr044-probe-context" type="button" onclick="window.ADR044_probeContext&&window.ADR044_probeContext();return false;">检测上下文</button><button id="adr044-probe-content" type="button" onclick="window.ADR044_probeContent&&window.ADR044_probeContent();return false;">测试 &lt;content&gt; 提取</button></div>'
            + '<div class="adr044-actions"><button id="adr044-preview-precise" type="button">预览精准读取</button></div>'
            + '</details>'
            + '</details>'

            + pageHTML("emotion")
            + pageHTML("plot")
            + adrCdPageHTML()
            + adrLampPageHTML()
            + adrTheaterPageHTML()
            + '</div>'
            + '</div></div></div>';
    }

    function mountDrawer() {
        if (q("#adr044-drawer")) return;

        var html = drawerHTML();

        try {
            var jq = rootWin().jQuery || rootWin().$ || window.jQuery || window.$;
            if (jq) {
                var target = jq("#extensions_settings2");
                if (target && target.length) {
                    target.append(html);
                    return;
                }
            }
        } catch (e) {}

        var d = rootDoc();
        var el = d.querySelector("#extensions_settings2");
        if (el) {
            var wrap = d.createElement("div");
            wrap.innerHTML = html;
            el.appendChild(wrap.firstChild);
        }
    }

    function switchTab(type) {
        type = (type === "plot" || type === "cd" || type === "lamp" || type === "theater") ? type : "emotion";
        var changed = settings().activeTab !== type;
        save("activeTab", type);

        try {
            var d = rootDoc();
            Array.prototype.slice.call(d.querySelectorAll(".adr-top-pane")).forEach(function (el) {
                el.hidden = el.getAttribute("data-director") !== type;
            });
            if (changed) {
                var body = d.querySelector("#adr048-popup-body");
                if (body) body.scrollTop = 0;
            }

            // 抽屉与浮窗会同时存在，且内部 id 重复。
            // 所以这里必须同步所有同名节点，不能只 q("#id")。
            Array.prototype.slice.call(d.querySelectorAll("#adr044-page-emotion, #adr048-page-emotion")).forEach(function (el) {
                el.style.display = type === "emotion" ? "" : "none";
            });

            Array.prototype.slice.call(d.querySelectorAll("#adr044-page-plot, #adr048-page-plot")).forEach(function (el) {
                el.style.display = type === "plot" ? "" : "none";
            });

            Array.prototype.slice.call(d.querySelectorAll("#adr044-page-cd, #adr048-page-cd")).forEach(function (el) {
                el.style.display = type === "cd" ? "" : "none";
            });

            Array.prototype.slice.call(d.querySelectorAll("#adr044-page-lamp, #adr048-page-lamp")).forEach(function (el) {
                el.style.display = type === "lamp" ? "" : "none";
            });

            Array.prototype.slice.call(d.querySelectorAll("#adr044-page-theater, #adr048-page-theater")).forEach(function (el) {
                el.style.display = type === "theater" ? "" : "none";
            });

            Array.prototype.slice.call(d.querySelectorAll("#adr044-tab-emotion")).forEach(function (el) {
                el.classList.toggle("active", type === "emotion");
                el.setAttribute("aria-pressed", String(type === "emotion"));
            });

            Array.prototype.slice.call(d.querySelectorAll("#adr044-tab-plot")).forEach(function (el) {
                el.classList.toggle("active", type === "plot");
                el.setAttribute("aria-pressed", String(type === "plot"));
            });

            Array.prototype.slice.call(d.querySelectorAll("#adr044-tab-cd")).forEach(function (el) {
                el.classList.toggle("active", type === "cd");
                el.setAttribute("aria-pressed", String(type === "cd"));
            });

            Array.prototype.slice.call(d.querySelectorAll("#adr044-tab-lamp")).forEach(function (el) {
                el.classList.toggle("active", type === "lamp");
                el.setAttribute("aria-pressed", String(type === "lamp"));
            });

            Array.prototype.slice.call(d.querySelectorAll("#adr044-tab-theater")).forEach(function (el) {
                el.classList.toggle("active", type === "theater");
                el.setAttribute("aria-pressed", String(type === "theater"));
            });

            adrDRefreshAllFieldsFromSettings();
            adrDRestorePanelRuntimeState();
            if (type === "lamp") { try { adrLampRefreshAll(); } catch (eLampTab) {} }   // v1.39.0 切到掌灯页时重读素材与对话

        } catch (e) {
            console.warn("[Arrebol D] switchTab failed", e);
        }
    }


    function adrDSetAllById(id, value, checked) {
        try {
            var nodes = Array.prototype.slice.call(rootDoc().querySelectorAll("#" + id));
            nodes.forEach(function (el) {
                if (!el) return;
                if (el.type === "checkbox") {
                    el.checked = !!checked;
                } else {
                    el.value = value == null ? "" : value;
                }
            });
        } catch (e) {}
    }

    function adrDRefreshAllFieldsFromSettings() {
        try {
            var st = settings();

            adrDSetAllById("adr044-range", st.range || "30");
            adrDSetAllById("adr044-custom", st.customRange || "");
            adrDSetAllById("adr044-memory", st.supplementMemory || "");
            adrDRefreshToneFields();   // v1.30.0 基调按聊天走，从聊天文件回填
            adrDSetAllById("adr044-content-tags", st.contentTagNames || "content");
            adrDSetAllById("adr044-inject-mode", st.injectMode || "visible");
            adrDSetAllById("adr044-show-floating-window", "", st.showFloatingWindow);
            adrDSetAllById("adr044-fab-motion", "", st.fabMotion !== false);
            adrDSetAllById("adr044-float-inject", "", st.floatInjectEnabled !== false);
            adrDSetAllById("adr044-float-depth", String(st.floatDepth != null ? st.floatDepth : 2));
            adrDSetAllById("adr044-director-log", "", st.directorLogEnabled !== false);
            adrDSetAllById("adr044-ng-detect", "", st.ngDetectEnabled !== false);
            adrDSetAllById("adr044-show-auto-trigger-popup", "", st.showAutoTriggerPopup !== false);
            adrDSetAllById("adr044-stream-enabled", "", st.streamEnabled !== false);

            ["emotion", "plot"].forEach(function (type) {
                var p = prefixOf(type);
                adrDSetAllById("adr044-" + type + "-endpoint", st[p + "ApiEndpoint"] || "");
                adrDSetAllById("adr044-" + type + "-key", st[p + "ApiKey"] || "");
                adrDSetAllById("adr044-" + type + "-model", st[p + "Model"] || "");
                adrDRefreshApiProfileSelects(type);
                adrDSetAllById("adr044-" + type + "-preset", st[p + "Preset"] || "");
                adrDSetAllById("adr044-" + type + "-preview", st[p + "Preview"] || "");
                adrDSetAllById("adr044-auto-inject-" + type, "", type === "plot" ? st.autoInjectPlot : st.autoInjectEmotion);
                adrDSetAllById("adr044-auto-trigger-" + type, "", type === "plot" ? st.autoTriggerPlot : st.autoTriggerEmotion);
                adrDSetAllById("adr044-auto-trigger-range-" + type, st[type === "plot" ? "autoTriggerPlotRange" : "autoTriggerEmotionRange"] || (type === "plot" ? "10" : "20"));
                adrDSetAllById("adr044-auto-trigger-custom-" + type, st[type === "plot" ? "autoTriggerPlotCustomRange" : "autoTriggerEmotionCustomRange"] || "");
            });
            try { adrCdRefreshPanelFields(); } catch (eCdRefresh) {}
            try { adrLampRefreshPanelFields(); } catch (eLampRefresh) {}   // v1.39.0
            try { adrTheaterRefreshFields(false); } catch (eTheaterRefresh) {}   // v1.43.0 只回填开关与下拉，不冲掉正在写的主题
            adrDRefreshMasterToggleUI();
            adrDUpdateAutoCounters();
        } catch (e) {
            console.warn("[Arrebol D] refresh fields failed", e);
        }
    }


    var ADR_D_TEMPLATE_KEY = "arrebol_d_prompt_templates_v1";
    var ADR_D_SELECTED_TEMPLATE_KEY = "arrebol_d_selected_prompt_templates_v1";
    var ADR_D_API_PROFILE_KEY = "arrebol_d_api_profiles_v1";
    var ADR_D_SELECTED_API_PROFILE_KEY = "arrebol_d_selected_api_profiles_v1";

    // v1.9.30：模板/API 档案四把钥匙全部迁到 extensionSettings（跟账号走）。
    // 读取优先服务器侧；首次载入自动从 localStorage 搬家存量；写入双写 localStorage 做灾备。
    function adrDLoadSelectedTemplates() {
        try {
            var st = settings();
            if (st.selectedPromptTemplates && typeof st.selectedPromptTemplates === "object") {
                return st.selectedPromptTemplates;
            }
            var migrated = {};
            try {
                var s = rootWin().localStorage.getItem(ADR_D_SELECTED_TEMPLATE_KEY) || "";
                if (s) migrated = JSON.parse(s) || {};
            } catch (e1) {}
            st.selectedPromptTemplates = migrated;
            saveNow();
            return migrated;
        } catch (e) {
            return {};
        }
    }

    function adrDSaveSelectedTemplate(type, name) {
        try {
            var obj = adrDLoadSelectedTemplates();
            obj[type] = String(name || "");
            settings().selectedPromptTemplates = obj;
            saveNow();
            try { rootWin().localStorage.setItem(ADR_D_SELECTED_TEMPLATE_KEY, JSON.stringify(obj)); } catch (eLs) {}
        } catch (e) {}
    }

    function adrDSelectedTemplateName(type) {
        try {
            var obj = adrDLoadSelectedTemplates();
            return String(obj[type] || "");
        } catch (e) {
            return "";
        }
    }


    function adrDDefaultTemplateText(type) {
        try {
            var st = settings();
            return String(type === "plot" ? (st.plotPreset || "") : (st.emotionPreset || ""));
        } catch (e) {
            return "";
        }
    }

    function adrDDefaultTemplates() {
        return {
            emotion: [
                { name: "默认情感导演", text: adrDDefaultTemplateText("emotion") || "你是 RP 情感导演。请阅读最近的聊天内容和用户补充信息，只分析情感曲线与人写正文。" }
            ],
            plot: [
                { name: "默认统筹", text: adrDDefaultTemplateText("plot") || "你是 RP 编剧顾问。请阅读角色卡、世界书、记忆与最近聊天内容，分析剧情节奏、事件张力、伏笔管理与场景调度，给出下一阶段的剧情推进方向。你不写正文，只做剧情导航。" }
            ]
        };
    }

    function adrDNormalizeTemplates(raw) {
        var def = adrDDefaultTemplates();
        var out = { emotion: [], plot: [] };

        ["emotion", "plot"].forEach(function (type) {
            var arr = raw && Array.isArray(raw[type]) ? raw[type] : [];
            arr.forEach(function (it) {
                if (!it) return;
                var name = String(it.name || "").trim();
                var text = String(it.text || "");
                if (name) out[type].push({ name: name, text: text });
            });
            if (!out[type].length) out[type] = def[type];
        });

        return out;
    }

    function adrDLoadTemplates() {
        try {
            var rw = rootWin();
            if (rw.__adrDPromptTemplatesCache) return adrDNormalizeTemplates(rw.__adrDPromptTemplatesCache);

            // 优先服务器侧存储。
            var st = settings();
            if (st.promptTemplatesStore && typeof st.promptTemplatesStore === "object") {
                rw.__adrDPromptTemplatesCache = adrDNormalizeTemplates(st.promptTemplatesStore);
                return adrDNormalizeTemplates(rw.__adrDPromptTemplatesCache);
            }

            // 服务器侧为空：从 localStorage 搬家存量（老浏览器里的模板由此救回）。
            var s = "";
            try { s = rw.localStorage.getItem(ADR_D_TEMPLATE_KEY) || ""; } catch (e1) {}

            if (!s) {
                rw.__adrDPromptTemplatesCache = adrDDefaultTemplates();
                adrDSaveTemplates(rw.__adrDPromptTemplatesCache);
                return adrDNormalizeTemplates(rw.__adrDPromptTemplatesCache);
            }

            var parsed = adrDNormalizeTemplates(JSON.parse(s));
            rw.__adrDPromptTemplatesCache = parsed;
            adrDSaveTemplates(parsed);
            return adrDNormalizeTemplates(parsed);
        } catch (e) {
            return adrDDefaultTemplates();
        }
    }

    function adrDSaveTemplates(obj) {
        try {
            var rw = rootWin();
            var normalized = adrDNormalizeTemplates(obj);
            rw.__adrDPromptTemplatesCache = normalized;
            settings().promptTemplatesStore = normalized;
            saveNow();
            try { rw.localStorage.setItem(ADR_D_TEMPLATE_KEY, JSON.stringify(normalized)); } catch (eLs) {}
            return true;
        } catch (e) {
            console.warn("[Arrebol D] save templates failed", e);
            return false;
        }
    }

    function adrDTemplateOptions(type) {
        var data = adrDLoadTemplates();
        var arr = data[type] || [];
        var selectedName = adrDSelectedTemplateName(type);
        return arr.map(function (it, idx) {
            var name = String(it.name || ("模板 " + (idx + 1)));
            var selected = selectedName && name === selectedName ? ' selected' : '';
            return '<option value="' + idx + '"' + selected + '>' + esc(name) + '</option>';
        }).join("");
    }

    function adrDRefreshTemplateSelects(type, selectedName) {
        try {
            if (!selectedName) selectedName = adrDSelectedTemplateName(type);
            var html = adrDTemplateOptions(type);
            Array.prototype.slice.call(rootDoc().querySelectorAll("#adr044-template-select-" + type)).forEach(function (sel) {
                sel.innerHTML = html;
                var matched = false;
                if (selectedName) {
                    for (var i = 0; i < sel.options.length; i++) {
                        if (sel.options[i].textContent === selectedName) {
                            sel.value = String(i);
                            matched = true;
                            break;
                        }
                    }
                }
                if (!matched) sel.value = "0";
            });
        } catch (e) {}
    }

    function adrDTemplateStatus(type, text, color) {
        try {
            Array.prototype.slice.call(rootDoc().querySelectorAll("#adr044-template-status-" + type)).forEach(function (el) {
                el.textContent = text || "";
                if (color) el.style.color = color;
            });
        } catch (e) {}
    }

    function adrDGetPresetBox(type) { return qForm("adr044-" + type + "-preset"); }
    function adrDGetTemplateSelect(type) { return qForm("adr044-template-select-" + type); }
    function adrDGetTemplateName(type) { return qForm("adr044-template-name-" + type); }

    function adrDApplyTemplate(type) {
        adrDResetConfirmAction("delete-template-" + (type === "plot" ? "plot" : "emotion"));
        var data = adrDLoadTemplates();
        var sel = adrDGetTemplateSelect(type);
        var idx = sel ? Number(sel.value) : 0;
        var item = data[type] && data[type][idx];

        if (!item) {
            adrDTemplateStatus(type, "没有找到模板", "#C98BA3");
            return;
        }

        var preset = adrDGetPresetBox(type);
        if (preset) {
            preset.value = String(item.text || "");
            try { preset.dispatchEvent(new Event("input", { bubbles: true })); } catch (e) {}
        }

        var name = adrDGetTemplateName(type);
        if (name) name.value = String(item.name || "");

        try {
            syncType(type);
            adrDSaveLocalBackup(settings());
        } catch (e2) {}

        adrDSaveSelectedTemplate(type, item.name);
        adrDTemplateStatus(type, "已切换：" + item.name, "#8ed99d");
    }

    function adrDSaveCurrentTemplate(type) {
        adrDResetConfirmAction("delete-template-" + (type === "plot" ? "plot" : "emotion"));
        var nameBox = adrDGetTemplateName(type);
        var preset = adrDGetPresetBox(type);
        var name = nameBox ? String(nameBox.value || "").trim() : "";
        var text = preset ? String(preset.value || "") : "";

        if (!name) {
            adrDTemplateStatus(type, "请先写模板名", "#C98BA3");
            return;
        }

        var data = adrDLoadTemplates();
        var arr = data[type] || [];
        var found = -1;

        arr.forEach(function (it, idx) {
            if (String(it.name || "") === name) found = idx;
        });

        if (found >= 0) arr[found] = { name: name, text: text };
        else arr.push({ name: name, text: text });

        data[type] = arr;
        adrDSaveTemplates(data);
        adrDSaveSelectedTemplate(type, name);
        adrDRefreshTemplateSelects(type, name);
        adrDTemplateStatus(type, found >= 0 ? "已更新：" + name : "已新增：" + name, "#8ed99d");
    }

    var adrDConfirmActionState = {};

    function adrDResetConfirmAction(key) {
        try {
            var item = adrDConfirmActionState[key];
            if (!item) return;
            if (item.timer) clearTimeout(item.timer);
            if (item.btn && item.originalText !== undefined) item.btn.textContent = item.originalText;
            delete adrDConfirmActionState[key];
        } catch (e) {}
    }

    function adrDTwoStepConfirm(key, btn, confirmText, hintText, hintFn, actionFn) {
        try {
            var now = Date.now();
            var old = adrDConfirmActionState[key];
            if (old && old.ready && old.until && now <= old.until) {
                adrDResetConfirmAction(key);
                try { actionFn(); } finally { adrDResetConfirmAction(key); }
                return true;
            }

            adrDResetConfirmAction(key);
            var original = btn ? String(btn.textContent || "") : "";
            var item = {
                ready: true,
                btn: btn || null,
                originalText: original,
                until: now + 4500,
                timer: null
            };
            if (btn) btn.textContent = confirmText;
            item.timer = setTimeout(function () { adrDResetConfirmAction(key); }, 4500);
            adrDConfirmActionState[key] = item;
            if (typeof hintFn === "function") hintFn(hintText);
            return false;
        } catch (e) {
            try { actionFn(); } catch (e2) {}
            return true;
        }
    }

    function adrDRequestDeleteCurrentTemplate(type, btn) {
        type = type === "plot" ? "plot" : "emotion";
        return adrDTwoStepConfirm(
            "delete-template-" + type,
            btn || qForm("adr044-template-delete-" + type),
            "确定删除？",
            "再点一次确认删除模板",
            function (msg) { adrDTemplateStatus(type, msg, "#d6a26a"); },
            function () { adrDDeleteCurrentTemplate(type); }
        );
    }

    function adrDRequestCalibrateAutoBaseline(type, btn) {
        type = type === "plot" ? "plot" : "emotion";
        return adrDTwoStepConfirm(
            "calibrate-auto-" + type,
            btn || qForm("adr044-" + type + "-calibrate-auto"),
            "确定对表？",
            "再点一次确认重新对表（从现在起重数间隔）",
            function (msg) { status(type, msg, "#d6a26a"); },
            function () { adrDCalibrateAutoBaseline(type); }
        );
    }

    function adrDDeleteCurrentTemplate(type) {
        var data = adrDLoadTemplates();
        var sel = adrDGetTemplateSelect(type);
        var idx = sel ? Number(sel.value) : -1;
        var arr = data[type] || [];

        if (!arr[idx]) {
            adrDTemplateStatus(type, "没有选中的模板", "#C98BA3");
            return;
        }

        if (arr.length <= 1) {
            adrDTemplateStatus(type, "至少保留一个模板", "#C98BA3");
            return;
        }

        var name = arr[idx].name;
        arr.splice(idx, 1);
        data[type] = arr;
        adrDSaveTemplates(data);
        adrDSaveSelectedTemplate(type, arr[0] ? arr[0].name : "");
        adrDRefreshTemplateSelects(type);
        adrDResetConfirmAction("delete-template-" + (type === "plot" ? "plot" : "emotion"));
        adrDTemplateStatus(type, "已删除：" + name, "#f0b36a");
    }

    function adrDBindCompactTemplateControls() {
        try {
            ["emotion", "plot"].forEach(function (type) {
                Array.prototype.slice.call(rootDoc().querySelectorAll("#adr044-template-select-" + type)).forEach(function (sel) {
                    if (!sel) return;
                    try {
                        var data = adrDLoadTemplates();
                        var item = data[type] && data[type][Number(sel.value)];
                        var nameInput = adrDGetTemplateName(type);
                        if (nameInput && item && !nameInput.value) nameInput.value = item.name || "";
                    } catch (e0) {}

                    if (sel.__adrDTemplateSelectBound) return;
                    sel.__adrDTemplateSelectBound = true;
                    sel.addEventListener("change", function () {
                        adrDApplyTemplate(type);
                    }, true);
                });

                Array.prototype.slice.call(rootDoc().querySelectorAll("#adr044-template-save-" + type)).forEach(function (btn) {
                    if (!btn || btn.__adrDTemplateSaveBound) return;
                    btn.__adrDTemplateSaveBound = true;
                    btn.addEventListener("touchstart", function (ev) {
                        adrDMarkButtonTouchStart(btn, ev);
                    }, { capture: true, passive: true });
                    btn.addEventListener("touchmove", function (ev) {
                        adrDMarkButtonTouchMove(btn, ev);
                    }, { capture: true, passive: true });
                    btn.addEventListener("click", function (ev) {
                        ev.preventDefault();
                        ev.stopPropagation();
                        if (adrDShouldIgnoreButtonTap(btn, ev)) return;
                        adrDSaveCurrentTemplate(type);
                    }, true);
                    btn.addEventListener("touchend", function (ev) {
                        ev.preventDefault();
                        ev.stopPropagation();
                        if (adrDShouldIgnoreButtonTap(btn, ev)) return;
                        adrDSaveCurrentTemplate(type);
                    }, true);
                });

                Array.prototype.slice.call(rootDoc().querySelectorAll("#adr044-template-delete-" + type)).forEach(function (btn) {
                    if (!btn || btn.__adrDTemplateDeleteBound) return;
                    btn.__adrDTemplateDeleteBound = true;
                    btn.addEventListener("touchstart", function (ev) {
                        adrDMarkButtonTouchStart(btn, ev);
                    }, { capture: true, passive: true });
                    btn.addEventListener("touchmove", function (ev) {
                        adrDMarkButtonTouchMove(btn, ev);
                    }, { capture: true, passive: true });
                    btn.addEventListener("click", function (ev) {
                        ev.preventDefault();
                        ev.stopPropagation();
                        if (adrDShouldIgnoreButtonTap(btn, ev)) return;
                        adrDRequestDeleteCurrentTemplate(type, btn);
                    }, true);
                    btn.addEventListener("touchend", function (ev) {
                        ev.preventDefault();
                        ev.stopPropagation();
                        if (adrDShouldIgnoreButtonTap(btn, ev)) return;
                        adrDRequestDeleteCurrentTemplate(type, btn);
                    }, true);
                });
            });
        } catch (e) {}
    }


    // ================= v1.46.0 小红霞这边的 API 预设：聊天位 / 执笔位 / 剧场位 =================
    // 江：「能不能把这个改成多预设，和导演一样，换 api 预设直接换，不用每次都输入 key」。
    // · 三个位共用一份预设单（apiProfilesStore.hx）：在哪一位存的，另外两位都能选。
    // · 下拉里还列着导演 / 抽卡那边已经存好的预设（只读，选了就把地址、钥匙、模型填过来）——以前存过的不用再敲一遍 key。
    // · 选一个预设 = 这一位改成「自己填」，并把三样填好；每一位各记各的「现在选的是哪个」。
    // 导演那套函数按 emotion / plot / cd 认类型（别的一律当 emotion），所以这里不走它们，只借底层的存取。
    var ADR_HX_API_SLOT = {
        lamp: { label: "聊天位", page: "lamp", borrowKey: "lampBorrow", fallback: "plot" },
        pen: { label: "执笔位", page: "lamp", borrowKey: "penBorrow", fallback: "lamp" },
        stage: { label: "剧场位", page: "theater", borrowKey: "theaterBorrow", fallback: "lamp" }
    };
    var ADR_HX_API_SRC = [["plot", "统筹"], ["emotion", "情感导演"], ["cd", "抽卡"]];
    var ADR_HX_API_FOREIGN = "::";   // 下拉里导演那边的预设，值写成 ::plot::名字，和自己这份的名字分开
    var ADR_HX_API_HINT = "下拉一选就切过去（这一位自动改成「自己填」）。聊天位、执笔位、剧场位共用一份预设单，导演那边存的也能直接选；写个名字点「保存」，把现在填的存成预设。";

    function adrHxApiProfiles() {
        try { return adrDNormalizeApiProfiles(adrDLoadApiProfileStore().hx || []); } catch (e) { return []; }
    }

    function adrHxApiSaveProfiles(arr) {
        try {
            var rw = rootWin();
            var store = adrDLoadApiProfileStore();
            store.hx = adrDNormalizeApiProfiles(arr);
            rw.__adrDApiProfilesCache = adrDNormalizeApiProfileStore(store);
            settings().apiProfilesStore = rw.__adrDApiProfilesCache;
            saveNow();
            try { rw.localStorage.setItem(ADR_D_API_PROFILE_KEY, JSON.stringify(rw.__adrDApiProfilesCache)); } catch (eLs) {}
            return true;
        } catch (e) {
            try { console.warn("[Arrebol D] save hx api profiles failed", e); } catch (e2) {}
            return false;
        }
    }

    // 导演 / 抽卡那边存的：按名字去重（自己这份里有同名的就不再列），带上是谁家的
    function adrHxApiForeign() {
        var out = [], seen = {};
        adrHxApiProfiles().forEach(function (it) { seen[String(it.name).toLowerCase()] = true; });
        ADR_HX_API_SRC.forEach(function (src) {
            var list = [];
            try { list = adrDLoadApiProfiles(src[0]); } catch (e) {}
            list.forEach(function (it) {
                var k = String(it.name || "").toLowerCase();
                if (!k || seen[k]) return;
                seen[k] = true;
                out.push({ value: ADR_HX_API_FOREIGN + src[0] + ADR_HX_API_FOREIGN + it.name, name: it.name, from: src[1], item: it });
            });
        });
        return out;
    }

    function adrHxApiFind(value) {
        var v = String(value || "");
        if (!v) return null;
        if (v.indexOf(ADR_HX_API_FOREIGN) === 0) {
            var hit = null;
            adrHxApiForeign().forEach(function (f) { if (f.value === v) hit = f; });
            return hit ? { item: hit.item, foreign: true, from: hit.from, name: hit.name } : null;
        }
        var key = v.trim().toLowerCase(), found = null;
        adrHxApiProfiles().forEach(function (it) { if (String(it.name).toLowerCase() === key) found = it; });
        return found ? { item: found, foreign: false, from: "", name: found.name } : null;
    }

    function adrHxApiIsSelf(slot) {
        try { return String(settings()[ADR_HX_API_SLOT[slot].borrowKey] || ADR_HX_API_SLOT[slot].fallback) === "self"; } catch (e) { return false; }
    }

    function adrHxApiSelected(slot) {
        try { return String(adrDLoadSelectedApiProfiles()[slot] || ""); } catch (e) { return ""; }
    }

    function adrHxApiSetSelected(slot, value) {
        try {
            var obj = adrDLoadSelectedApiProfiles();
            obj[slot] = String(value || "");
            settings().selectedApiProfiles = obj;
            saveNow();
            try { rootWin().localStorage.setItem(ADR_D_SELECTED_API_PROFILE_KEY, JSON.stringify(obj)); } catch (eLs) {}
        } catch (e) {}
    }

    // 这一位现在「正用着」哪个预设：只有在自己填、而且那个预设还在的时候才算
    function adrHxApiCurrent(slot) {
        if (!adrHxApiIsSelf(slot)) return "";
        var v = adrHxApiSelected(slot);
        return adrHxApiFind(v) ? v : "";
    }

    function adrHxApiOptionsHTML(slot) {
        var cur = adrHxApiCurrent(slot);
        var html = '<option value="">选择已有预设</option>';
        adrHxApiProfiles().forEach(function (it) {
            html += '<option value="' + esc(it.name) + '"' + (it.name === cur ? " selected" : "") + '>' + esc(it.name) + '</option>';
        });
        var foreign = adrHxApiForeign();
        if (foreign.length) {
            html += '<optgroup label="导演 / 抽卡那边存的">';
            foreign.forEach(function (f) {
                html += '<option value="' + esc(f.value) + '"' + (f.value === cur ? " selected" : "") + '>' + esc(f.name + "（" + f.from + "的）") + '</option>';
            });
            html += '</optgroup>';
        }
        return html;
    }

    function adrHxApiOptSig(slot) {
        var names = adrHxApiProfiles().map(function (it) { return it.name; }).concat(adrHxApiForeign().map(function (f) { return f.value; }));
        return adrCdOptSig("hxapi-" + slot, names, adrHxApiCurrent(slot));
    }

    function adrHxApiNameOf(value) {
        var hit = adrHxApiFind(value);
        return hit ? hit.name : "";
    }

    function adrHxApiRowHTML(slot) {
        var cur = adrHxApiCurrent(slot);
        return '<label>API 预设 · ' + ADR_HX_API_SLOT[slot].label + '</label>'
            + '<div class="adr044-template-compact adr044-api-profile-compact">'
            + '<select id="adr044-api-profile-select-' + slot + '" data-optsig="' + esc(adrHxApiOptSig(slot)) + '">' + adrHxApiOptionsHTML(slot) + '</select>'
            + '<input type="text" id="adr044-api-profile-name-' + slot + '" value="' + esc(adrHxApiNameOf(cur)) + '" placeholder="预设名，如 DS / Claude">'
            + '<div class="adr044-template-mini-actions">'
            + '<button type="button" id="adr044-api-profile-save-' + slot + '">保存</button>'
            + '<button type="button" id="adr044-api-profile-delete-' + slot + '">删除</button>'
            + '</div>'
            + '<div class="adr044-template-status" id="adr044-api-profile-status-' + slot + '">' + esc(ADR_HX_API_HINT) + '</div>'
            + '</div>';
    }

    function adrHxApiStatus(slot, text, color) { adrCdSetTextAll("adr044-api-profile-status-" + slot, text, color || "#8ed99d"); }

    // 两端（浮窗 / 抽屉）的下拉与名字框对到现在的状态。下拉内容没变就不重写（原生选择器正开着时重写会把它关掉）
    function adrHxApiRefresh(slot, setName) {
        try {
            var cur = adrHxApiCurrent(slot);
            var html = adrHxApiOptionsHTML(slot), sig = adrHxApiOptSig(slot);
            Array.prototype.slice.call(rootDoc().querySelectorAll("#adr044-api-profile-select-" + slot)).forEach(function (sel) {
                if (adrCdIsBusyEl(sel)) return;
                adrCdFillSelect(sel, html, cur, sig);
                sel.value = cur;
            });
            if (setName !== false) adrCdSetValueSafe("adr044-api-profile-name-" + slot, adrHxApiNameOf(cur));
        } catch (e) {}
    }

    function adrHxApiRefreshAll() { ["lamp", "pen", "stage"].forEach(function (slot) { adrHxApiRefresh(slot); }); }

    // 借谁的下拉、自填框的显隐、说明行——各页自己的刷新函数会顺带把预设那一行也对一遍
    function adrHxApiRefreshPage(slot) {
        try {
            if (ADR_HX_API_SLOT[slot].page === "lamp") adrLampRefreshPanelFields();
            else adrTheaterRefreshFields(false);
        } catch (e) {}
    }

    function adrHxApiField(slot, id) { return adrDActiveField(ADR_HX_API_SLOT[slot].page, id); }

    function adrHxApiApply(slot, value) {
        var hit = adrHxApiFind(value);
        if (!hit) { adrHxApiStatus(slot, "没找到这个预设，可能已经删了", "#C98BA3"); adrHxApiRefresh(slot); return false; }
        adrDResetConfirmAction("delete-hx-api-profile-" + slot);
        var wasSelf = adrHxApiIsSelf(slot);
        save(ADR_HX_API_SLOT[slot].borrowKey, "self");
        adrDSetCurrentApiFields(slot, hit.item);   // 地址、钥匙、模型：写进设置，也写进两端的输入框
        adrHxApiSetSelected(slot, value);
        // 刚点过的那个下拉在「正在操作」的免疫期里，刷新会跳过它：先把它自己和借谁的下拉直接对上
        try {
            Array.prototype.slice.call(rootDoc().querySelectorAll("#adr044-" + slot + "-borrow")).forEach(function (el) { el.value = "self"; });
            Array.prototype.slice.call(rootDoc().querySelectorAll("#adr044-api-profile-name-" + slot)).forEach(function (el) { el.value = hit.name; });
        } catch (e) {}
        adrHxApiRefreshPage(slot);
        adrHxApiRefreshAll();
        adrHxApiStatus(slot, "已切换：" + hit.name + (hit.foreign ? "（" + hit.from + "那边存的）" : "") + (wasSelf ? "" : " · " + ADR_HX_API_SLOT[slot].label + "改成了自己填"), "#8ed99d");
        return true;
    }

    function adrHxApiOnSelect(slot, el) {
        var v = String(el && el.value || "");
        if (!v) {
            adrHxApiSetSelected(slot, "");
            Array.prototype.slice.call(rootDoc().querySelectorAll("#adr044-api-profile-name-" + slot)).forEach(function (input) { input.value = ""; });
            adrHxApiStatus(slot, "写个新名字点「保存」，就把现在填的存成一个预设", "#A9B2C8");
            return false;
        }
        return adrHxApiApply(slot, v);
    }

    function adrHxApiSave(slot) {
        adrDResetConfirmAction("delete-hx-api-profile-" + slot);
        var nameEl = adrHxApiField(slot, "adr044-api-profile-name-" + slot);
        var name = String(nameEl ? nameEl.value || "" : "").trim();
        var ep = adrHxApiField(slot, "adr044-" + slot + "-endpoint");
        var ky = adrHxApiField(slot, "adr044-" + slot + "-key");
        var md = adrHxApiField(slot, "adr044-" + slot + "-model");
        var item = {
            name: name,
            endpoint: String(ep ? ep.value || "" : "").trim(),
            apiKey: String(ky ? ky.value || "" : "").trim(),
            model: String(md ? md.value || "" : "").trim(),
            updatedAt: Date.now()
        };
        if (!adrHxApiIsSelf(slot)) { adrHxApiStatus(slot, "先把" + ADR_HX_API_SLOT[slot].label + "选成「自己填」，填好地址、钥匙、模型，再存成预设", "#C98BA3"); return false; }
        if (!item.endpoint && !item.apiKey && !item.model) { adrHxApiStatus(slot, "请先填写 API 地址、密钥或模型", "#C98BA3"); return false; }
        if (!name) { adrHxApiStatus(slot, "请先在预设名里写个名字，例如 DS / Claude", "#C98BA3"); return false; }
        if (name.indexOf(ADR_HX_API_FOREIGN) === 0) { adrHxApiStatus(slot, "预设名别用 :: 开头", "#C98BA3"); return false; }
        var arr = adrHxApiProfiles();
        var found = -1;
        arr.forEach(function (it, i) { if (String(it.name).toLowerCase() === name.toLowerCase()) found = i; });
        if (found >= 0) arr[found] = item; else arr.push(item);
        if (!adrHxApiSaveProfiles(arr)) { adrHxApiStatus(slot, "没存上，再点一次试试", "#d4726a"); return false; }
        adrDSetCurrentApiFields(slot, item);
        adrHxApiSetSelected(slot, name);
        adrHxApiRefreshAll();
        adrHxApiStatus(slot, (found >= 0 ? "已更新预设：" : "已新增预设：") + name + "（三个位都能选）", "#8ed99d");
        return true;
    }

    function adrHxApiDelete(slot, btn) {
        var nameEl = adrHxApiField(slot, "adr044-api-profile-name-" + slot);
        var selEl = adrHxApiField(slot, "adr044-api-profile-select-" + slot);
        var name = String(nameEl ? nameEl.value || "" : "").trim();
        var selVal = String(selEl ? selEl.value || "" : "");
        if (!name && selVal) name = adrHxApiNameOf(selVal);
        var arr = adrHxApiProfiles();
        var idx = -1;
        arr.forEach(function (it, i) { if (String(it.name).toLowerCase() === name.toLowerCase()) idx = i; });
        if (idx < 0) {
            var foreign = selVal.indexOf(ADR_HX_API_FOREIGN) === 0 || adrHxApiForeign().some(function (f) { return f.name.toLowerCase() === name.toLowerCase(); });
            adrHxApiStatus(slot, foreign && name ? "「" + name + "」是导演那边存的，要删去那边的页里删" : "请先选择或写上要删除的预设名", "#C98BA3");
            return false;
        }
        var real = arr[idx].name;
        return adrDTwoStepConfirm("delete-hx-api-profile-" + slot, btn || adrHxApiField(slot, "adr044-api-profile-delete-" + slot), "确定删除？", "再点一次确认删除「" + real + "」（只删预设单里这一条，各位现在填着的不动）",
            function (msg) { adrHxApiStatus(slot, msg, "#d6a26a"); },
            function () {
                var cur = adrHxApiProfiles().filter(function (it) { return String(it.name).toLowerCase() !== real.toLowerCase(); });
                adrHxApiSaveProfiles(cur);
                ["lamp", "pen", "stage"].forEach(function (s2) { if (adrHxApiSelected(s2).toLowerCase() === real.toLowerCase()) adrHxApiSetSelected(s2, ""); });
                adrHxApiRefreshAll();
                adrHxApiStatus(slot, "已删除：" + real, "#f0b36a");
            });
    }

    function adrHxApiHandleButtonId(id, btn) {
        var m = /^adr044-api-profile-(save|delete)-(lamp|pen|stage)$/.exec(String(id || ""));
        if (!m) return false;
        if (m[1] === "save") adrHxApiSave(m[2]); else adrHxApiDelete(m[2], btn);
        return true;
    }

    try {
        rootWin().__adrHxApiTest = {
            profiles: adrHxApiProfiles, foreign: adrHxApiForeign, find: adrHxApiFind, apply: adrHxApiApply, save: adrHxApiSave, del: adrHxApiDelete,
            selected: adrHxApiSelected, current: adrHxApiCurrent, optionsHTML: adrHxApiOptionsHTML, refreshAll: adrHxApiRefreshAll
        };
    } catch (eHxApiHook) {}
    // ================= 小红霞这边的 API 预设 结束 =================

    function adrDApiProfileType(type) {
        if (type === "cd") return "cd";
        return type === "plot" ? "plot" : "emotion";
    }

    function adrDNormalizeApiProfiles(raw) {
        var arr = Array.isArray(raw) ? raw : [];
        var out = [];
        var seen = {};

        arr.forEach(function (it) {
            if (!it) return;
            var name = String(it.name || "").trim();
            if (!name) return;
            var key = name.toLowerCase();
            var item = {
                name: name,
                endpoint: String(it.endpoint || ""),
                apiKey: String(it.apiKey || it.key || ""),
                model: String(it.model || ""),
                updatedAt: Number(it.updatedAt || 0) || Date.now()
            };
            if (seen[key] !== undefined) out[seen[key]] = item;
            else {
                seen[key] = out.length;
                out.push(item);
            }
        });

        return out;
    }

    function adrDNormalizeApiProfileStore(raw) {
        var store = { emotion: [], plot: [], cd: [], hx: [] };   // v1.46.0 hx：小红霞三个位（聊天 / 执笔 / 剧场）共用的一份

        // 兼容上一版共享数组：首次读取时复制到两边，随后两边各自保存、互不影响。
        if (Array.isArray(raw)) {
            var shared = adrDNormalizeApiProfiles(raw);
            store.emotion = shared.slice();
            store.plot = shared.slice();
            store.cd = shared.slice();
            return store;
        }

        if (raw && typeof raw === "object") {
            store.emotion = adrDNormalizeApiProfiles(raw.emotion || []);
            store.plot = adrDNormalizeApiProfiles(raw.plot || []);
            store.cd = adrDNormalizeApiProfiles(raw.cd || []);
            store.hx = adrDNormalizeApiProfiles(raw.hx || []);

            // 兼容可能存在的 shared 字段：只补空侧，不覆盖已有独立档案。
            if (Array.isArray(raw.shared)) {
                var shared2 = adrDNormalizeApiProfiles(raw.shared);
                if (!store.emotion.length) store.emotion = shared2.slice();
                if (!store.plot.length) store.plot = shared2.slice();
                if (!store.cd.length) store.cd = shared2.slice();
            }
        }

        return store;
    }

    function adrDLoadApiProfileStore() {
        try {
            var rw = rootWin();
            if (rw.__adrDApiProfilesCache) return adrDNormalizeApiProfileStore(rw.__adrDApiProfilesCache);

            // 优先服务器侧存储。
            var st = settings();
            if (st.apiProfilesStore && typeof st.apiProfilesStore === "object") {
                rw.__adrDApiProfilesCache = adrDNormalizeApiProfileStore(st.apiProfilesStore);
                return adrDNormalizeApiProfileStore(rw.__adrDApiProfilesCache);
            }

            // 服务器侧为空：从 localStorage 搬家存量。
            var s = "";
            try { s = rw.localStorage.getItem(ADR_D_API_PROFILE_KEY) || ""; } catch (e1) {}
            if (!s) {
                rw.__adrDApiProfilesCache = { emotion: [], plot: [], cd: [], hx: [] };
                return { emotion: [], plot: [], cd: [], hx: [] };
            }

            var parsed = adrDNormalizeApiProfileStore(JSON.parse(s));
            rw.__adrDApiProfilesCache = parsed;
            st.apiProfilesStore = parsed;
            saveNow();
            return adrDNormalizeApiProfileStore(parsed);
        } catch (e) {
            return { emotion: [], plot: [], cd: [], hx: [] };
        }
    }

    function adrDLoadApiProfiles(type) {
        var t = adrDApiProfileType(type);
        var store = adrDLoadApiProfileStore();
        return adrDNormalizeApiProfiles(store[t] || []);
    }

    function adrDSaveApiProfiles(type, arr) {
        try {
            var rw = rootWin();
            var t = adrDApiProfileType(type);
            var store = adrDLoadApiProfileStore();
            store[t] = adrDNormalizeApiProfiles(arr);
            rw.__adrDApiProfilesCache = adrDNormalizeApiProfileStore(store);
            settings().apiProfilesStore = rw.__adrDApiProfilesCache;
            saveNow();
            try { rw.localStorage.setItem(ADR_D_API_PROFILE_KEY, JSON.stringify(rw.__adrDApiProfilesCache)); } catch (eLs) {}
            return true;
        } catch (e) {
            console.warn("[Arrebol D] save api profiles failed", e);
            return false;
        }
    }

    function adrDLoadSelectedApiProfiles() {
        try {
            var st = settings();
            if (st.selectedApiProfiles && typeof st.selectedApiProfiles === "object") {
                return st.selectedApiProfiles;
            }
            var migrated = {};
            try {
                var s = rootWin().localStorage.getItem(ADR_D_SELECTED_API_PROFILE_KEY) || "";
                if (s) migrated = JSON.parse(s) || {};
            } catch (e1) {}
            st.selectedApiProfiles = migrated;
            saveNow();
            return migrated;
        } catch (e) {
            return {};
        }
    }

    function adrDSaveSelectedApiProfile(type, name) {
        try {
            var obj = adrDLoadSelectedApiProfiles();
            obj[adrDApiProfileType(type)] = String(name || "");
            settings().selectedApiProfiles = obj;
            saveNow();
            try { rootWin().localStorage.setItem(ADR_D_SELECTED_API_PROFILE_KEY, JSON.stringify(obj)); } catch (eLs) {}
        } catch (e) {}
    }

    function adrDSelectedApiProfileName(type) {
        try {
            var obj = adrDLoadSelectedApiProfiles();
            return String(obj[adrDApiProfileType(type)] || "");
        } catch (e) {
            return "";
        }
    }

    function adrDApiProfileSelectOptions(type, selectedName) {
        var arr = adrDLoadApiProfiles(type);
        selectedName = String(selectedName || "");
        var html = '<option value="">选择已有预设</option>';
        html += arr.map(function (it, idx) {
            var name = String(it.name || ("API 预设 " + (idx + 1)));
            return '<option value="' + esc(name) + '"' + (name === selectedName ? " selected" : "") + '>' + esc(name) + '</option>';
        }).join("");
        return html;
    }

    function adrDRefreshApiProfileSelects(type, selectedName) {
        try {
            if (selectedName === undefined || selectedName === null) selectedName = adrDSelectedApiProfileName(type);
            selectedName = String(selectedName || "");
            var html = adrDApiProfileSelectOptions(type, selectedName);
            Array.prototype.slice.call(rootDoc().querySelectorAll("#adr044-api-profile-select-" + type)).forEach(function (sel) {
                sel.innerHTML = html;
                sel.value = selectedName;
            });
            Array.prototype.slice.call(rootDoc().querySelectorAll("#adr044-api-profile-name-" + type)).forEach(function (input) {
                input.value = selectedName;
            });
        } catch (e) {}
    }

    function adrDApiProfileStatus(type, text, color) {
        try {
            Array.prototype.slice.call(rootDoc().querySelectorAll("#adr044-api-profile-status-" + type)).forEach(function (el) {
                el.textContent = text || "";
                if (color) el.style.color = color;
            });
        } catch (e) {}
    }

    function adrDActivePageRoot(type) {
        try {
            var d = rootDoc();
            var popup = d.querySelector('#adr048-popup-panel[data-open="1"] #adr048-page-' + type);
            if (popup) return popup;
            var drawer = d.querySelector('#adr044-page-' + type);
            if (drawer) return drawer;
        } catch (e) {}
        return rootDoc();
    }

    function adrDActiveField(type, id) {
        try {
            var root = adrDActivePageRoot(type);
            var el = root && root.querySelector ? root.querySelector("#" + id) : null;
            if (el) return el;
        } catch (e) {}
        return qForm(id);
    }

    function adrDSetCurrentApiFields(type, item) {
        var p = prefixOf(type);
        item = item || {};
        adrDSetAllById("adr044-" + type + "-endpoint", item.endpoint || "");
        adrDSetAllById("adr044-" + type + "-key", item.apiKey || "");
        adrDSetAllById("adr044-" + type + "-model", item.model || "");
        save(p + "ApiEndpoint", item.endpoint || "");
        save(p + "ApiKey", item.apiKey || "");
        save(p + "Model", item.model || "");
        try {
            Array.prototype.slice.call(rootDoc().querySelectorAll("#adr044-" + type + "-model-select")).forEach(function (sel) {
                var model = String(item.model || "");
                sel.innerHTML = model ? '<option value="' + esc(model) + '">' + esc(model) + '（当前）</option>' : '<option value="">加载后选择模型</option>';
                sel.value = model;
            });
        } catch (e) {}
        saveNow();
    }

    function adrDCurrentApiFields(type) {
        type = adrDApiProfileType(type);
        var endpoint = adrDActiveField(type, "adr044-" + type + "-endpoint");
        var key = adrDActiveField(type, "adr044-" + type + "-key");
        var model = adrDActiveField(type, "adr044-" + type + "-model");
        return {
            endpoint: endpoint ? String(endpoint.value || "") : "",
            apiKey: key ? String(key.value || "") : "",
            model: model ? String(model.value || "") : ""
        };
    }

    function adrDApiProfileSelect(type) {
        var t0 = adrDApiProfileType(type);
        return adrDActiveField(t0, "adr044-api-profile-select-" + t0);
    }

    function adrDApiProfileNameInput(type) {
        var t1 = adrDApiProfileType(type);
        return adrDActiveField(t1, "adr044-api-profile-name-" + t1);
    }

    function adrDActiveApiProfileName(type) {
        type = adrDApiProfileType(type);
        var input = adrDApiProfileNameInput(type);
        return String(input ? input.value || "" : adrDSelectedApiProfileName(type) || "").trim();
    }

    function adrDSelectedApiProfileSelectName(type) {
        type = adrDApiProfileType(type);
        var sel = adrDApiProfileSelect(type);
        return String(sel ? sel.value || "" : adrDSelectedApiProfileName(type) || "").trim();
    }

    function adrDFindApiProfileIndexByName(type, name) {
        var key = String(name || "").trim().toLowerCase();
        if (!key) return -1;
        var arr = adrDLoadApiProfiles(type);
        for (var i = 0; i < arr.length; i++) {
            if (String(arr[i].name || "").trim().toLowerCase() === key) return i;
        }
        return -1;
    }

    function adrDSelectedApiProfileItem(type) {
        type = adrDApiProfileType(type);
        var name = adrDSelectedApiProfileSelectName(type) || adrDActiveApiProfileName(type) || adrDSelectedApiProfileName(type);
        var idx = adrDFindApiProfileIndexByName(type, name);
        var arr = adrDLoadApiProfiles(type);
        return idx >= 0 ? arr[idx] : null;
    }

    function adrDSaveCurrentApiProfile(type) {
        type = adrDApiProfileType(type);
        adrDResetConfirmAction("delete-api-profile-" + type);

        var fields = adrDCurrentApiFields(type);
        if (!fields.endpoint && !fields.apiKey && !fields.model) {
            adrDApiProfileStatus(type, "请先填写 API 地址、密钥或模型", "#C98BA3");
            return;
        }

        var name = adrDActiveApiProfileName(type);
        if (!name) {
            adrDApiProfileStatus(type, "请先在当前预设框里写名字，例如 DS / Claude", "#C98BA3");
            return;
        }

        var arr = adrDLoadApiProfiles(type);
        var item = {
            name: name,
            endpoint: fields.endpoint,
            apiKey: fields.apiKey,
            model: fields.model,
            updatedAt: Date.now()
        };

        var found = adrDFindApiProfileIndexByName(type, name);
        if (found >= 0) arr[found] = item;
        else arr.push(item);

        adrDSaveApiProfiles(type, arr);
        adrDSaveSelectedApiProfile(type, name);
        adrDRefreshApiProfileSelects(type, name);
        adrDSetCurrentApiFields(type, item);
        adrDApiProfileStatus(type, found >= 0 ? "已更新预设：" + name : "已新增预设：" + name, "#8ed99d");
    }

    function adrDApplyApiProfile(type) {
        type = adrDApiProfileType(type);
        adrDResetConfirmAction("delete-api-profile-" + type);

        var name = adrDSelectedApiProfileSelectName(type) || adrDActiveApiProfileName(type);
        var item = adrDSelectedApiProfileItem(type);
        if (!item) {
            adrDApiProfileStatus(type, name ? "未保存的新预设名；填好 API 后点「保存」" : "请选择已有预设，或输入新名字后保存", "#A9B2C8");
            return false;
        }

        adrDSaveSelectedApiProfile(type, item.name || "");
        adrDRefreshApiProfileSelects(type, item.name || "");
        adrDSetCurrentApiFields(type, item);
        adrDApiProfileStatus(type, "已切换：" + item.name, "#8ed99d");
        return true;
    }

    function adrDDeleteCurrentApiProfile(type) {
        type = adrDApiProfileType(type);
        var name = adrDActiveApiProfileName(type) || adrDSelectedApiProfileName(type);
        var idx = adrDFindApiProfileIndexByName(type, name);
        var arr = adrDLoadApiProfiles(type);
        var item = idx >= 0 ? arr[idx] : null;

        if (!item) {
            adrDApiProfileStatus(type, "请先输入或选择要删除的预设", "#C98BA3");
            return;
        }

        name = item.name;
        arr.splice(idx, 1);
        adrDSaveApiProfiles(type, arr);
        if (adrDSelectedApiProfileName(type) === name) adrDSaveSelectedApiProfile(type, "");
        adrDRefreshApiProfileSelects(type, "");
        adrDResetConfirmAction("delete-api-profile-" + type);
        adrDApiProfileStatus(type, "已删除：" + name, "#f0b36a");
    }

    function adrDRequestDeleteCurrentApiProfile(type, btn) {
        type = adrDApiProfileType(type);
        return adrDTwoStepConfirm(
            "delete-api-profile-" + type,
            btn || qForm("adr044-api-profile-delete-" + type),
            "确定删除？",
            "再点一次确认删除",
            function (msg) { adrDApiProfileStatus(type, msg, "#d6a26a"); },
            function () { adrDDeleteCurrentApiProfile(type); }
        );
    }

    function adrDBindApiProfileControls() {
        try {
            ["emotion", "plot"].forEach(function (type) {
                Array.prototype.slice.call(rootDoc().querySelectorAll("#adr044-api-profile-select-" + type)).forEach(function (sel) {
                    if (!sel) return;
                    if (sel.__adrDApiProfileSelectBound) return;
                    sel.__adrDApiProfileSelectBound = true;
                    sel.addEventListener("change", function () {
                        var name = String(sel.value || "").trim();
                        if (!name) {
                            adrDSaveSelectedApiProfile(type, "");
                            Array.prototype.slice.call(rootDoc().querySelectorAll("#adr044-api-profile-name-" + type)).forEach(function (input) { input.value = ""; });
                            adrDApiProfileStatus(type, "输入新名字后点「保存」即可新增预设", "#A9B2C8");
                            return;
                        }
                        adrDApplyApiProfile(type);
                    }, true);
                });

                Array.prototype.slice.call(rootDoc().querySelectorAll("#adr044-api-profile-name-" + type)).forEach(function (input) {
                    if (!input) return;
                    if (input.__adrDApiProfileNameBound) return;
                    input.__adrDApiProfileNameBound = true;
                    input.addEventListener("input", function () {
                        var name = String(input.value || "").trim();
                        adrDResetConfirmAction("delete-api-profile-" + type);
                        if (!name) {
                            adrDApiProfileStatus(type, "输入新名字后点「保存」即可新增预设", "#A9B2C8");
                        } else if (adrDFindApiProfileIndexByName(type, name) >= 0) {
                            adrDApiProfileStatus(type, "同名保存会更新该预设", "#A9B2C8");
                        } else {
                            adrDApiProfileStatus(type, "新名字保存会新增预设，不影响旧预设", "#A9B2C8");
                        }
                    }, true);
                });
            });
        } catch (e) {}
    }

    function adrDIsTouchLikeEvent(ev) {
        return !!(ev && (ev.type === "touchend" || ev.type === "pointerup"));
    }

    function adrDMarkButtonTouchStart(el, ev) {
        try {
            var p = null;
            if (ev && ev.touches && ev.touches.length) p = ev.touches[0];
            else if (ev) p = ev;
            el.__adrDTapStart = {
                x: Number(p && p.clientX) || 0,
                y: Number(p && p.clientY) || 0,
                t: Date.now(),
                moved: false
            };
        } catch (e) {}
    }

    function adrDMarkButtonTouchMove(el, ev) {
        try {
            var s = el.__adrDTapStart;
            if (!s) return;
            var p = null;
            if (ev && ev.touches && ev.touches.length) p = ev.touches[0];
            else if (ev) p = ev;
            var dx = Math.abs((Number(p && p.clientX) || 0) - s.x);
            var dy = Math.abs((Number(p && p.clientY) || 0) - s.y);
            if (dx > 12 || dy > 12) s.moved = true;
        } catch (e) {}
    }

    function adrDShouldIgnoreButtonTap(el, ev) {
        try {
            var now = Date.now();

            // 防 iOS touchend 后补发 click 造成重复触发。
            if (ev && ev.type === "click" && el.__adrDLastTouchEndAt && now - el.__adrDLastTouchEndAt < 650) {
                return true;
            }

            if (adrDIsTouchLikeEvent(ev)) {
                el.__adrDLastTouchEndAt = now;
                var s = el.__adrDTapStart;
                el.__adrDTapStart = null;
                if (s && s.moved) return true;
            }

            // 很短时间内重复点击同一按钮，视为抖动。
            if (el.__adrDLastAcceptedTapAt && now - el.__adrDLastAcceptedTapAt < 450) {
                return true;
            }

            el.__adrDLastAcceptedTapAt = now;
            return false;
        } catch (e) {
            return false;
        }
    }

    function adrDRequestManualInject(type, btn) {
        type = type === "plot" ? "plot" : "emotion";
        return adrDTwoStepConfirm(
            "manual-inject-" + type,
            btn || qForm("adr044-" + type + "-inject"),
            "确定注入？",
            "再点一次确认注入",
            function (msg) { status(type, msg, "#d6a26a"); },
            function () {
                syncType(type);
                var pv = qForm("adr044-" + type + "-preview");
                var text = pv ? pv.value : "";
                if (!text) {
                    status(type, "没有内容可注入", "#d4726a");
                    return;
                }
                if (adrDGenerationLooksLive()) {
                    status(type, "这一楼还在生成，等写完再注入…", "#d6b177");
                    adrDWaitForGenerationIdle(180000).then(function () {
                        var ok2 = injectDirector(type, text);
                        status(type, ok2 ? "已注入当前聊天 ✓" : "注入失败", ok2 ? "#8ed99d" : "#d4726a");
                    });
                    return;
                }
                var ok = injectDirector(type, text);
                status(type, ok ? "已注入当前聊天 ✓" : "注入失败", ok ? "#8ed99d" : "#d4726a");
            }
        );
    }

    function adrDRequestDirectAnalysis(type, btn) {
        type = type === "plot" ? "plot" : "emotion";
        return adrDTwoStepConfirm(
            "direct-analysis-" + type,
            btn || qForm("adr044-" + type + "-generate"),
            "确认分析？",
            "再点一次开始分析（补充指令空着就是普通分析）",
            function (msg) { status(type, msg, "#d6a26a"); },
            function () {
                syncAll();
                // v1.14.0：按钮合并。分析自动携带补充指令框内容，空=普通分析，有字=带观点分析。
                var extraEl = qForm("adr044-" + type + "-extra");
                run(type, extraEl && extraEl.value ? String(extraEl.value) : "");
            }
        );
    }

    function adrDRequestExtraAnalysis(type, btn) {
        type = type === "plot" ? "plot" : "emotion";
        return adrDTwoStepConfirm(
            "extra-analysis-" + type,
            btn || qForm("adr044-" + type + "-reroll"),
            "确认分析？",
            "再点一次开始补充指令分析",
            function (msg) { status(type, msg, "#d6a26a"); },
            function () {
                syncType(type);
                var extra = qForm("adr044-" + type + "-extra");
                run(type, extra ? extra.value : "");
            }
        );
    }

    // ============================================================
    // v1.26.0 放大编辑：每个文字框右上角一枚 ⛶，点开整屏编辑器，
    // 确定后把内容回填原框并派发 input/change，原有的自动保存链路照常走。
    // 只包一层 .adrx-ta 容器，不改任何 id；抽卡编辑区的忙保护（adrCdTouch）一并打上。
    // ============================================================
    var ADRX_EXPAND_SELECTOR = '#adr048-popup-body textarea, #adr044-drawer textarea, '
        + '#adr048-popup-body input[type="text"][id$="-extra"], #adr044-drawer input[type="text"][id$="-extra"]';

    function adrxExpandTitleFor(el) {
        try {
            var wrap = el.parentNode;
            var prev = wrap && wrap.classList && wrap.classList.contains("adrx-ta") ? wrap.previousElementSibling : el.previousElementSibling;
            var hops = 0;
            while (prev && hops < 4) {
                var tag = String(prev.tagName || "").toLowerCase();
                if (tag === "label" && !(prev.classList && (prev.classList.contains("adr048-check") || prev.classList.contains("adr044-check")))) {
                    var t = String(prev.textContent || "").replace(/\s+/g, " ").trim();
                    if (t) return t;
                }
                if (tag === "textarea" || tag === "input" || tag === "select" || tag === "button") break;
                prev = prev.previousElementSibling;
                hops++;
            }
        } catch (e) {}
        // 没有紧邻的 label（预设 / 结果 / 卡库编辑区）：退而取所在分区的标题。
        try {
            var node = el.parentNode;
            var depth = 0;
            while (node && depth < 8) {
                if (node.classList && node.classList.contains("adr048-section")) {
                    var sm = node.querySelector(".adr048-summary");
                    var st = sm ? String(sm.textContent || "").replace(/\s+/g, " ").trim() : "";
                    if (st) return st;
                }
                if (String(node.tagName || "").toLowerCase() === "details") {
                    var sm2 = node.querySelector(":scope > summary");
                    var st2 = sm2 ? String(sm2.textContent || "").replace(/\s+/g, " ").trim() : "";
                    if (st2) return st2;
                }
                node = node.parentNode;
                depth++;
            }
        } catch (e2) {}
        return String(el.getAttribute("placeholder") || "编辑").split("\n")[0].trim() || "编辑";
    }

    function adrxInstallExpanders() {
        try {
            var d = rootDoc();
            var list = Array.prototype.slice.call(d.querySelectorAll(ADRX_EXPAND_SELECTOR));
            list.forEach(function (el) {
                try {
                    if (!el || el.__adrxExpandInstalled) return;
                    if (!el.parentNode) return;
                    if (el.parentNode.classList && el.parentNode.classList.contains("adrx-ta")) { el.__adrxExpandInstalled = true; return; }
                    var wrap = d.createElement("div");
                    wrap.className = "adrx-ta";
                    el.parentNode.insertBefore(wrap, el);
                    wrap.appendChild(el);
                    var btn = d.createElement("button");
                    btn.type = "button";
                    btn.className = "adrx-expand";
                    btn.title = "放大编辑";
                    btn.setAttribute("aria-label", "放大编辑");
                    btn.addEventListener("click", function (ev) {
                        try { ev.preventDefault(); ev.stopPropagation(); } catch (e) {}
                        adrxOpenBigEditor(el);
                    });
                    wrap.appendChild(btn);
                    el.__adrxExpandInstalled = true;
                } catch (e1) {}
            });
        } catch (e) {}
    }

    function adrxCloseBigEditor() {
        try {
            var d = rootDoc();
            var old = d.querySelector("#adrx-editor");
            if (old) {
                if (old.__adrxKeyHandler) { try { d.removeEventListener("keydown", old.__adrxKeyHandler, true); } catch (e0) {} }
                if (old.__adrxUnfit) { try { old.__adrxUnfit(); } catch (e1) {} }
                if (old.parentNode) old.parentNode.removeChild(old);
            }
        } catch (e) {}
    }

    // v1.26.1 iOS 键盘：Safari 弹键盘时会把布局视口整个往上顶，position:fixed 的整屏层跟着飞走，
    // 收键盘也不回来。这里让编辑器钉在「可视视口」上：键盘弹出就缩到键盘上方，页面被顶就跟着复位。
    function adrxFitToVisualViewport(ov) {
        var w = rootWin();
        var vv = null;
        try { vv = w.visualViewport || null; } catch (e) {}
        if (!vv) return function () {};
        function fit() {
            try {
                ov.style.setProperty("top", Math.max(0, vv.offsetTop || 0) + "px", "important");
                ov.style.setProperty("left", Math.max(0, vv.offsetLeft || 0) + "px", "important");
                ov.style.setProperty("width", Math.round(vv.width || w.innerWidth) + "px", "important");
                ov.style.setProperty("height", Math.round(vv.height || w.innerHeight) + "px", "important");
                ov.style.setProperty("right", "auto", "important");
                ov.style.setProperty("bottom", "auto", "important");
            } catch (e) {}
        }
        fit();
        try { vv.addEventListener("resize", fit); } catch (e1) {}
        try { vv.addEventListener("scroll", fit); } catch (e2) {}
        try { w.addEventListener("orientationchange", fit); } catch (e3) {}
        return function () {
            try { vv.removeEventListener("resize", fit); } catch (e4) {}
            try { vv.removeEventListener("scroll", fit); } catch (e5) {}
            try { w.removeEventListener("orientationchange", fit); } catch (e6) {}
        };
    }

    function adrxIsTouchDevice() {
        try {
            var w = rootWin();
            if (w.matchMedia && w.matchMedia("(pointer: coarse)").matches) return true;
            return ("ontouchstart" in w) && (w.navigator && w.navigator.maxTouchPoints > 0);
        } catch (e) { return false; }
    }

    function adrxOpenBigEditor(el) {
        try {
            if (!el) return;
            adrxCloseBigEditor();
            var d = rootDoc();
            var isInput = String(el.tagName || "").toLowerCase() === "input";
            var panel = d.querySelector("#adr048-popup-panel");
            var theme = (panel && panel.contains(el)) ? (panel.getAttribute("data-arb-theme") || "dusk") : "dawn";

            var ov = d.createElement("div");
            ov.id = "adrx-editor";
            ov.setAttribute("data-arb-theme", theme);
            ov.setAttribute("data-adr-palette", adr048Palette());
            ov.setAttribute("role", "dialog");
            ov.setAttribute("aria-modal", "true");
            ov.innerHTML = ''
                + '<div class="adrx-editor-shell">'
                + '<div class="adrx-editor-head"><div class="adrx-editor-title"></div><div class="adrx-editor-count"></div></div>'
                + '<textarea class="adrx-editor-ta" spellcheck="false"></textarea>'
                + '<div class="adrx-editor-foot"><button type="button" class="adrx-editor-cancel">取消</button><button type="button" class="adrx-editor-ok">确定</button></div>'
                + '</div>';

            var title = ov.querySelector(".adrx-editor-title");
            var count = ov.querySelector(".adrx-editor-count");
            var ta = ov.querySelector(".adrx-editor-ta");
            title.textContent = adrxExpandTitleFor(el);
            ta.value = String(el.value || "");
            ta.placeholder = String(el.getAttribute("placeholder") || "");
            if (isInput) ta.setAttribute("data-single-line", "1");

            function refreshCount() {
                try { count.textContent = String(ta.value || "").length + " 字"; } catch (e) {}
            }
            refreshCount();
            ta.addEventListener("input", refreshCount);

            function commit() {
                try {
                    var v = String(ta.value || "");
                    if (isInput) v = v.replace(/\r?\n+/g, " ");
                    try { adrCdTouch(el); } catch (e0) {}
                    el.value = v;
                    try { el.dispatchEvent(new Event("input", { bubbles: true })); } catch (e1) {}
                    try { el.dispatchEvent(new Event("change", { bubbles: true })); } catch (e2) {}
                } catch (e) {}
                adrxCloseBigEditor();
            }

            ov.querySelector(".adrx-editor-ok").addEventListener("click", function (ev) {
                try { ev.preventDefault(); ev.stopPropagation(); } catch (e) {}
                commit();
            });
            ov.querySelector(".adrx-editor-cancel").addEventListener("click", function (ev) {
                try { ev.preventDefault(); ev.stopPropagation(); } catch (e) {}
                adrxCloseBigEditor();
            });
            var keyHandler = function (ev) {
                try {
                    if (ev.key === "Escape") { ev.preventDefault(); ev.stopPropagation(); adrxCloseBigEditor(); }
                    else if (ev.key === "Enter" && (ev.metaKey || ev.ctrlKey)) { ev.preventDefault(); ev.stopPropagation(); commit(); }
                } catch (e) {}
            };
            ov.__adrxKeyHandler = keyHandler;
            d.addEventListener("keydown", keyHandler, true);

            // 幕布本身吃掉触摸滚动，别把底下的面板一起拖走。
            ov.addEventListener("touchmove", function (ev) {
                try { if (ev.target === ov) ev.preventDefault(); } catch (e) {}
            }, { passive: false });

            (d.body || d.documentElement).appendChild(ov);
            ov.__adrxUnfit = adrxFitToVisualViewport(ov);
            // 手机上不自动弹键盘：点进去再打字，免得一开就被键盘顶飞。桌面照旧落焦点到末尾。
            if (!adrxIsTouchDevice()) {
                try {
                    ta.focus();
                    var n = ta.value.length;
                    ta.setSelectionRange(n, n);
                } catch (e3) {}
            }
        } catch (e) {
            console.error("[ADRX] open big editor failed", e);
        }
    }

    function bindDirect() {
        try {
            try { adrxInstallExpanders(); } catch (eExpand) {} // v1.26.0：文字框放大编辑按钮（幂等）
            try { adrCdBindControls(); } catch (eCdBind) {} // v1.10.0：抽卡控件随每次重绑一起带起（幂等）
            try { adrDBindToneControls(); } catch (eToneBind) {} // v1.30.0：基调仓控件（幂等）
            try { adrLampBindControls(); } catch (eLampBind) {} // v1.39.0：掌灯页控件（幂等）
            try { adrTheaterBindControls(); } catch (eTheaterBind) {} // v1.43.0：红霞剧场控件（幂等）
            if (!rootWin().adrDStableAutoSaveBound) {
                rootWin().adrDStableAutoSaveBound = true;
                rootDoc().addEventListener("input", function (ev) {
                    var t = ev && ev.target;
                    if (!t || !t.id || t.id.indexOf("adr044-") !== 0) return;
                    try {
                        syncShared();
                        if (t.id.indexOf("adr044-emotion-") === 0) syncType("emotion");
                        if (t.id.indexOf("adr044-plot-") === 0) syncType("plot");
                        adrDSaveLocalBackup(settings());
                        adrDUpdateAutoCounters();
                    } catch (e) {}
                }, true);
                rootDoc().addEventListener("change", function (ev) {
                    var t = ev && ev.target;
                    if (!t || !t.id || t.id.indexOf("adr044-") !== 0) return;
                    try {
                        syncShared();
                        if (t.id.indexOf("adr044-emotion-") === 0) syncType("emotion");
                        if (t.id.indexOf("adr044-plot-") === 0) syncType("plot");
                        adrDSaveLocalBackup(settings());
                        adrDUpdateAutoCounters();
                    } catch (e) {}
                }, true);
            }
        } catch (eStableBind) {}

        var ids = {};

        ids["adr044-tab-emotion"] = function () { switchTab("emotion"); };
        ids["adr044-tab-plot"] = function () { switchTab("plot"); };
        ids["adr044-tab-cd"] = function () { switchTab("cd"); };
        // v1.39.0 掌灯页按钮：直接绑定 + 兜底表双注册（同抽卡）。
        ["adr044-tab-lamp", "adr044-lamp-send", "adr044-lamp-stop", "adr044-lamp-rewrite", "adr044-lamp-clear", "adr044-lamp-apply", "adr044-lamp-draft-discard",
         "adr044-lamp-refresh", "adr044-lamp-floor-latest", "adr044-lamp-load-models", "adr044-pen-load-models", "adr044-lamp-test", "adr044-pen-test", "adr044-lamp-preset-reset",
         "adr044-lamp-gossip-preset-reset", "adr044-lamp-mode-edit", "adr044-lamp-mode-gossip", "adr044-lamp-jump-bottom", "adr044-lamp-jump-top", "adr044-lamp-quip-now",
         "adr044-api-profile-save-lamp", "adr044-api-profile-delete-lamp", "adr044-api-profile-save-pen", "adr044-api-profile-delete-pen"].forEach(function (lid) {
            ids[lid] = function () { adrLampHandleButtonId(lid, qForm(lid)); };
        });
        // v1.43.0 红霞剧场按钮：同样双注册
        ["adr044-theater-save", "adr044-theater-delete", "adr044-theater-now", "adr044-theater-stop", "adr044-theater-remove", "adr044-theater-regex-copy",
         "adr044-theater-import", "adr044-theater-export", "adr044-theater-clear", "adr044-theater-restore",
         "adr044-theater-persona-fill", "adr044-theater-persona-reset",
         "adr044-api-profile-save-stage", "adr044-api-profile-delete-stage",
         "adr044-tab-theater", "adr044-stage-load-models", "adr044-stage-test"].forEach(function (tid) {
            ids[tid] = function () { adrTheaterHandleButtonId(tid, qForm(tid)); };
        });
        ids["adr044-api-profile-save-cd"] = function () { adrDSaveCurrentApiProfile("cd"); };
        ids["adr044-api-profile-delete-cd"] = function () { adrDRequestDeleteCurrentApiProfile("cd"); };
        ids["adr044-cd-lib-rename"] = function () { adrCdRenameLibrary(); };
        ids["adr044-cd-selfcheck"] = function () { adrCdSelfCheck(); };
        ids["adr044-cd-close-card"] = function () { adrCdCloseCard("手动", false); };
        ids["adr044-cd-env-save"] = function () { adrCdSaveEnvelopePreset(); };
        ids["adr044-cd-env-delete"] = function () { adrCdDeleteEnvelopePreset(); };
        ids["adr044-cd-load-models"] = function () { loadModels("cd"); };
        ids["adr044-tone-save"] = function () { adrDSaveToneFromFields(); };
        ids["adr044-expand-load-models"] = function () { loadModels("expand"); };
        ids["adr044-expand-test"] = function () { adrCdExpandTestConnection(); };
        ids["adr044-expand-preset-reset"] = function () { adrCdSetValueSafe("adr044-expand-preset", ""); save("expandPreset", ""); saveNow(); status("expand", "已恢复出厂提示词 ✓", "#8ed99d"); };
        ids["adr044-cd-expand-next"] = function () { adrCdExpandNext(); };
        ids["adr044-cd-expand-prev"] = function () { adrCdExpandPrev(); };
        ids["adr044-cd-expand-stop"] = function () { adrCdExpandStop(); };
        ids["adr044-tone-delete"] = function () { adrDDeleteToneFromFields(); };
        ids["adr044-tone-clear"] = function () { adrDClearChatTone(); };
        ids["adr044-cd-test"] = function () { adrCdTestConnection(); };
        ids["adr044-cd-save"] = function () { syncType("cd"); status("cd", "已保存当前使用的择池 API ✓", "#8ed99d"); };
        ids["adr044-cd-preview-draw"] = function () { adrCdPreviewDraw(); };
        ids["adr044-cd-lib-save"] = function () { adrCdSaveLibraryFromEditor(); };
        ids["adr044-cd-lib-delete"] = function () { adrCdRequestDeleteLibrary(qForm("adr044-cd-lib-delete")); };
        ids["adr044-cd-export"] = function () { adrCdExportLibrary(); };
        ids["adr044-cd-import"] = function () { adrCdTriggerImport(); };
        ids["adr044-probe-context"] = function () { runContextProbe(); };
        ids["adr044-probe-content"] = function () { runContentProbe(); };
        ids["adr044-preview-precise"] = function () { runPrecisePreview(); };
        ids["adr044-master-toggle"] = function () { adrDToggleMaster(); };

        ["emotion", "plot"].forEach(function (type) {
            ids["adr044-" + type + "-local"] = function () { localTest(type); };
            ids["adr044-" + type + "-generate"] = function () { adrDRequestDirectAnalysis(type, qForm("adr044-" + type + "-generate")); };
            ids["adr044-" + type + "-reroll"] = function () { adrDRequestExtraAnalysis(type, qForm("adr044-" + type + "-reroll")); };
            ids["adr044-" + type + "-stop"] = function () { abortRun(type); };
            ids["adr044-" + type + "-copy"] = function () { copyText(type); };
            ids["adr044-" + type + "-load-models"] = function () { loadModels(type); };
            ids["adr044-" + type + "-save"] = function () {
                adrDForceSaveSettings(type);
                status(type, "当前使用已保存 ✓", "#8ed99d");
            };
            ids["adr044-api-profile-save-" + type] = function () { adrDSaveCurrentApiProfile(type); };
            ids["adr044-api-profile-delete-" + type] = function () { adrDRequestDeleteCurrentApiProfile(type); };
            ids["adr044-" + type + "-calibrate-auto"] = function () { adrDRequestCalibrateAutoBaseline(type); };
            ids["adr044-" + type + "-inject"] = function () {
                adrDRequestManualInject(type);
            };
            ids["adr044-" + type + "-graze"] = function () {
                adrDRequestGraze(type, qForm("adr044-" + type + "-graze"));
            };
        });

        Object.keys(ids).forEach(function (id) {
            var nodes = [];
            try {
                nodes = Array.prototype.slice.call(rootDoc().querySelectorAll("#" + id));
            } catch (e) {
                var one = q("#" + id);
                if (one) nodes = [one];
            }

            nodes.forEach(function (el) {
                if (!el || el.__adr044Bound) return;
                el.__adr044Bound = true;

                el.addEventListener("touchstart", function (ev) {
                    adrDMarkButtonTouchStart(el, ev);
                }, { capture: true, passive: true });

                el.addEventListener("touchmove", function (ev) {
                    adrDMarkButtonTouchMove(el, ev);
                }, { capture: true, passive: true });

                el.addEventListener("click", function (ev) {
                    try { ev.preventDefault(); ev.stopPropagation(); } catch (e) {}
                    if (adrDShouldIgnoreButtonTap(el, ev)) return;
                    adrDBlurActiveElement();
                    ids[id]();
                }, true);

                el.addEventListener("touchend", function (ev) {
                    try { ev.preventDefault(); ev.stopPropagation(); } catch (e) {}
                    if (adrDShouldIgnoreButtonTap(el, ev)) return;
                    adrDBlurActiveElement();
                    ids[id]();
                }, true);
            });
        });

        var range = qForm("adr044-range");
        if (range && !range.__adr044Bound) {
            range.__adr044Bound = true;
            range.addEventListener("change", function () {
                save("range", range.value);
                var custom = qForm("adr044-custom");
                if (custom) custom.style.display = range.value === "custom" ? "block" : "none";
                saveNow();
            });
        }

        var mode = qForm("adr044-inject-mode");
        if (mode && !mode.__adr044Bound) {
            mode.__adr044Bound = true;
            mode.addEventListener("change", function () {
                save("injectMode", mode.value || "visible");
                saveNow();
            });
        }

        var showFab = qForm("adr044-show-floating-window");
        if (showFab && !showFab.__adr044Bound) {
            showFab.__adr044Bound = true;
            showFab.addEventListener("change", function () {
                save("showFloatingWindow", !!showFab.checked);
                saveNow();
                if (showFab.checked) adr048EnsureFabLater();
                else adr048RemoveFab();
            });
        }

        var fabMotion = qForm("adr044-fab-motion");
        if (fabMotion && !fabMotion.__adr044Bound) {
            fabMotion.__adr044Bound = true;
            fabMotion.addEventListener("change", function () {
                save("fabMotion", !!fabMotion.checked);
                saveNow();
                adr048ApplyFabTheme();   // 立即生效，不重建浮标
            });
        }

        var showAutoPopup = qForm("adr044-show-auto-trigger-popup");
        if (showAutoPopup && !showAutoPopup.__adr044Bound) {
            showAutoPopup.__adr044Bound = true;
            showAutoPopup.addEventListener("change", function () {
                save("showAutoTriggerPopup", !!showAutoPopup.checked);
                saveNow();
            });
        }

        var streamBox = qForm("adr044-stream-enabled");
        if (streamBox && !streamBox.__adr044Bound) {
            streamBox.__adr044Bound = true;
            streamBox.addEventListener("change", function () {
                save("streamEnabled", !!streamBox.checked);
                saveNow();
            });
        }

        ["emotion", "plot"].forEach(function (type) {
            var modelSelect = qForm("adr044-" + type + "-model-select");
            if (modelSelect && !modelSelect.__adr044Bound) {
                modelSelect.__adr044Bound = true;
                modelSelect.addEventListener("change", function () {
                    var modelInput = qForm("adr044-" + type + "-model");
                    if (modelInput) modelInput.value = modelSelect.value;
                    save(field(type, "model"), modelSelect.value || "");
                    saveNow();
                    status(type, "已选择模型：" + (modelSelect.value || "空"), "#8ed99d");
                });
            }

            var auto = qForm("adr044-auto-inject-" + type);
            if (auto && !auto.__adr044Bound) {
                auto.__adr044Bound = true;
                auto.addEventListener("change", function () {
                    save(type === "plot" ? "autoInjectPlot" : "autoInjectEmotion", !!auto.checked);
                    saveNow();
                });
            }

            var autoTrigger = qForm("adr044-auto-trigger-" + type);
            if (autoTrigger && !autoTrigger.__adr044Bound) {
                autoTrigger.__adr044Bound = true;
                autoTrigger.addEventListener("change", function () {
                    save(type === "plot" ? "autoTriggerPlot" : "autoTriggerEmotion", !!autoTrigger.checked);
                    saveNow();
                    adrDResetAutoTriggerBaseline(type, "toggle-" + type);
                    adrDScheduleAutoTriggerCheck("toggle-" + type);
                });
            }

            var autoRange = qForm("adr044-auto-trigger-range-" + type);
            if (autoRange && !autoRange.__adr044Bound) {
                autoRange.__adr044Bound = true;
                autoRange.addEventListener("change", function () {
                    save(type === "plot" ? "autoTriggerPlotRange" : "autoTriggerEmotionRange", autoRange.value || (type === "plot" ? "10" : "20"));
                    var custom = qForm("adr044-auto-trigger-custom-" + type);
                    if (custom) custom.style.display = autoRange.value === "custom" ? "block" : "none";
                    saveNow();
                    adrDResetAutoTriggerBaseline(type, "range-" + type);
                    adrDScheduleAutoTriggerCheck("range-" + type);
                });
            }

            var autoCustom = qForm("adr044-auto-trigger-custom-" + type);
            if (autoCustom && !autoCustom.__adr044Bound) {
                autoCustom.__adr044Bound = true;
                autoCustom.addEventListener("input", function () {
                    save(type === "plot" ? "autoTriggerPlotCustomRange" : "autoTriggerEmotionCustomRange", Number(autoCustom.value || 0));
                    saveNow();
                });
                autoCustom.addEventListener("change", function () {
                    adrDResetAutoTriggerBaseline(type, "custom-" + type);
                    adrDScheduleAutoTriggerCheck("custom-" + type);
                });
            }
        });

        var map = {
            "adr044-custom": "customRange",
            "adr044-memory": "supplementMemory"
        };

        ["emotion", "plot"].forEach(function (type) {
            map["adr044-" + type + "-endpoint"] = field(type, "apiEndpoint");
            map["adr044-" + type + "-key"] = field(type, "apiKey");
            map["adr044-" + type + "-model"] = field(type, "model");
            map["adr044-" + type + "-preset"] = field(type, "preset");
            map["adr044-" + type + "-preview"] = field(type, "preview");
        });

        Object.keys(map).forEach(function (id) {
            var el = qForm(id);
            if (!el || el.__adr044InputBound) return;
            el.__adr044InputBound = true;
            el.addEventListener("input", function () {
                if (map[id] === "customRange") save(map[id], Number(el.value || 0));
                else save(map[id], el.value || "");
            });
            el.addEventListener("change", function () {
                if (map[id] === "customRange") save(map[id], Number(el.value || 0));
                else save(map[id], el.value || "");
                try { adrDSaveLocalBackup(settings()); } catch (eBackup) {}
                saveNow();
            });
            el.addEventListener("blur", function () {
                if (map[id] === "customRange") save(map[id], Number(el.value || 0));
                else save(map[id], el.value || "");
                try { adrDSaveLocalBackup(settings()); } catch (eBackup2) {}
                saveNow();
            }, true);
        });
    }

    async function runPrecisePreview() {
        syncAll();
        var out = "";
        out += "【红霞精准读取预览 v1.0.5.6.8.3】\n";
        out += "以下内容就是下一次发送给副 API 的主要上下文来源。\n\n";
        out += buildPreciseContext() || "（未读取到角色卡 / 世界书 / user 人设补充）";
        out += "\n\n【最近 " + activeRange() + " 轮正文｜<content>精准读取】\n";
        out += await recentContentBlocks(activeRange()) || "（未提取到正文）";
        setPreview(currentType(), out);
        status(currentType(), "精准读取预览完成 ✓", "#8ed99d");
        setButtons(currentType());
    }


    function installProbeGlobals() {
        try {
            var w = rootWin();
            w.ADR044_probeContext = function () {
                try { runContextProbe(); } catch (e) {
                    try { alert("检测上下文失败：" + (e.message || String(e))); } catch (_) {}
                }
            };
            w.ADR044_previewPrecise = function () { try { runPrecisePreview(); } catch (e) { try { alert("预览精准读取失败：" + (e.message || String(e))); } catch (_) {} } };
            w.ADR044_probeContent = function () {
                try { runContentProbe(); } catch (e) {
                    try { alert("测试 content 失败：" + (e.message || String(e))); } catch (_) {}
                }
            };
        } catch (e) {}
    }

    function installProbeDelegation() {
        try {
            var d = rootDoc();
            if (d.__adr044ProbeDelegated) return;
            d.__adr044ProbeDelegated = true;

            function handle(ev) {
                var t = ev.target;
                if (!t) return;

                var hit = null;
                try { hit = t.closest("#adr044-probe-context,#adr044-probe-content"); }
                catch (e) { hit = null; }

                if (!hit) return;

                try { ev.preventDefault(); ev.stopPropagation(); } catch (_) {}

                if (hit.id === "adr044-probe-context") runContextProbe();
                if (hit.id === "adr044-probe-content") runContentProbe();
            }

            d.addEventListener("click", handle, true);
            d.addEventListener("touchend", handle, true);
            d.addEventListener("pointerup", handle, true);
        } catch (e) {}
    }


    function adr048IsPopupOpen() {
        try {
            var p = rootDoc().querySelector("#adr048-popup-panel");
            return !!(p && p.getAttribute("data-open") === "1");
        } catch (e) { return false; }
    }

    function qForm(id) {
        try {
            if (adr048IsPopupOpen()) {
                var p = rootDoc().querySelector("#adr048-popup-panel");
                if (p) {
                    var el = p.querySelector("#" + id);
                    if (el) return el;
                }
            }
        } catch (e) {}

        try {
            var el2 = rootDoc().querySelector("#" + id);
            if (el2) return el2;
        } catch (e2) {}

        try { return document.querySelector("#" + id); } catch (e3) {}
        return null;
    }


    function adr048PageHTML(type) {
        var st = settings();
        var p = prefixOf(type);
        var title = type === "plot" ? "统筹" : "情感导演";
        var autoKey = type === "plot" ? "autoInjectPlot" : "autoInjectEmotion";

        return '<div class="adr048-page" id="adr048-page-' + type + '"' + (st.activeTab === type ? '' : ' style="display:none"') + '>'
            + adrxDrawerStart('api-' + type, title + ' · API 配置', false, true)
            + '<label>API 预设</label>'
            + '<div class="adr044-template-compact adr044-api-profile-compact">'
            + '<select id="adr044-api-profile-select-' + type + '">' + adrDApiProfileSelectOptions(type, adrDSelectedApiProfileName(type) || "") + '</select>'
            + '<input type="text" id="adr044-api-profile-name-' + type + '" value="' + esc(adrDSelectedApiProfileName(type) || "") + '" placeholder="预设名，如 DS / Claude">'
            + '<div class="adr044-template-mini-actions">'
            + '<button type="button" id="adr044-api-profile-save-' + type + '">保存</button>'
            + '<button type="button" id="adr044-api-profile-delete-' + type + '">删除</button>'
            + '</div>'
            + '<div class="adr044-template-status" id="adr044-api-profile-status-' + type + '">下拉选择会立即切换；改名后保存会新增/更新预设。</div>'
            + '</div>'
            + '<label>API 地址</label><input type="text" id="adr044-' + type + '-endpoint" value="' + esc(st[p + "ApiEndpoint"] || "") + '" placeholder="https://openrouter.ai/api/v1">'
            + '<label>API 密钥</label><input type="password" id="adr044-' + type + '-key" value="' + esc(st[p + "ApiKey"] || "") + '" placeholder="sk-...">'
            + '<label>模型</label><input type="text" id="adr044-' + type + '-model" value="' + esc(st[p + "Model"] || "") + '" placeholder="可以手填，或加载模型">'
            + '<select id="adr044-' + type + '-model-select"><option value="' + esc(st[p + "Model"] || "") + '">' + (st[p + "Model"] ? esc(st[p + "Model"]) + "（当前）" : "加载后选择模型") + '</option></select>'
            + '<div class="adr048-actions"><button id="adr044-' + type + '-load-models" type="button">加载模型</button><button id="adr044-' + type + '-save" type="button">保存当前使用</button></div>'
            + '<label class="adr048-check"><input type="checkbox" id="adr044-auto-inject-' + type + '"' + (st[autoKey] ? " checked" : "") + '> 生成后自动注入当前聊天</label>'
            + '</details>'

            + adrxDrawerStart('preset-' + type, title + '预设', false, true)
            + '<div class="adr044-template-compact">'
            + '<select id="adr044-template-select-' + type + '">' + adrDTemplateOptions(type) + '</select>'
            + '<input id="adr044-template-name-' + type + '" placeholder="新模板名 / 当前模板名">'
            + '<div class="adr044-template-mini-actions">'
            + '<button type="button" id="adr044-template-save-' + type + '">保存当前为模板</button>'
            + '<button type="button" id="adr044-template-delete-' + type + '">删除模板</button>'
            + '</div>'
            + '<div class="adr044-template-status" id="adr044-template-status-' + type + '"></div>'
            + '</div>'
            + '<textarea id="adr044-' + type + '-preset" rows="8">' + esc(st[p + "Preset"] || "") + '</textarea>'
            + '</details>'

            + '<div class="adr048-section"><div class="adr048-summary">' + title + '结果</div>'
            + '<div id="adr044-' + type + '-status" class="adr048-status">可先试运行看看导演会读到什么，或直接点「分析」。</div>'
            + '<textarea id="adr044-' + type + '-preview" rows="8" placeholder="生成结果显示在这里">' + esc(st[p + "Preview"] || "") + '</textarea>'
            + '<label>想对导演说的话（选填）</label><input type="text" id="adr044-' + type + '-extra" placeholder="空着就是普通分析；填了导演会带着你的要求分析">'
            + '<div class="adr048-actions"><button id="adr044-' + type + '-local" type="button">试运行（不花钱）</button><button id="adr044-' + type + '-generate" type="button">分析</button></div>'
            + '<div class="adr048-actions"><button id="adr044-' + type + '-stop" type="button" disabled>打断</button><button id="adr044-' + type + '-copy" type="button">复制</button></div>'
            + '<div class="adr048-actions"><button id="adr044-' + type + '-inject" type="button">把这份稿挂上</button><button id="adr044-' + type + '-graze" type="button">放养</button></div>'
            + '</div>'
            + '</div>';
    }

    // ================= v1.14.0 改头换面第一刀：分层收纳 =================
    // 原则（ripple 拍板）：无脑层圆开关常驻，可选层方开关入抽屉，诊断层沉底；
    // 抽屉开合状态记忆，别每次打开都弹一脸。所有元素 ID 原封不动，绑定零接触。
    var ADRX_DRAWER_KEY = "arrebol_d_ui_drawer_state_v1";

    function adrxDrawerStates() {
        try { return adrDReadJsonLS(ADRX_DRAWER_KEY); } catch (e) { return {}; }
    }

    function adrxDrawerOpenAttr(id, defOpen) {
        try {
            var s = adrxDrawerStates();
            if (s && Object.prototype.hasOwnProperty.call(s, id)) return s[id] ? " open" : "";
        } catch (e) {}
        return defOpen ? " open" : "";
    }

    function adrxDrawerStart(id, label, defOpen, card) {
        return '<details class="adrx-drawer' + (card ? ' adr-fold-card' : '') + '" data-drawer-id="' + id + '"' + adrxDrawerOpenAttr(id, defOpen) + '><summary>' + label + '</summary>';
    }

    function adrxInstallDrawerMemory() {
        try {
            var d = rootDoc();
            if (!d || d.__adrxDrawerMemoryInstalled) return;
            d.__adrxDrawerMemoryInstalled = true;
            d.addEventListener("toggle", function (ev) {
                try {
                    var t = ev.target;
                    if (!t || !t.classList || !t.classList.contains("adrx-drawer")) return;
                    var id = t.getAttribute("data-drawer-id");
                    if (!id) return;
                    var s = adrxDrawerStates();
                    s[id] = !!t.open;
                    adrDWriteJsonLS(ADRX_DRAWER_KEY, s);
                } catch (e) {}
            }, true);
        } catch (e) {}
    }

    function adr048PanelHTML() {
        var st = settings();

        return '<div id="adr048-popup-panel" data-open="0">'
            + '<div id="adr048-popup-shell">'
            + '<div id="adr048-popup-head">'
            + '<div class="adr048-head-txt"><div class="adr048-title">🎬 Arrebol <span class="adr048-title-d">D</span><span class="adr048-title-cn">暗河红霞导演系统</span></div><div id="adr048-popup-sub">小红霞在线 · v' + ADR_D_VERSION + ' · ripple &amp; GPT &amp; Claude</div></div>'
            + '<button type="button" id="adr048-theme-toggle" title="开灯 / 关灯">' + (st.dawnTheme === true ? "☀️" : "🌙") + '</button>'
            + '<button type="button" id="adr048-popup-close" aria-label="关闭导演室">×</button>'
            + '</div>'
            + '<div id="adr048-popup-body">'
            + '<button type="button" id="adr044-master-toggle" data-master-on="' + (st.masterEnabled !== false ? '1' : '0') + '">' + adrDMasterToggleLabel() + '</button>'
            + adrDTopDeckHTML(true)

            + adrxDrawerStart("shared-main", "共享设置", false)
            + '<label>导演回看多少楼</label><select id="adr044-range">'
            + opt(st.range, "10", "最近 10 轮")
            + opt(st.range, "20", "最近 20 轮")
            + opt(st.range, "30", "最近 30 轮")
            + opt(st.range, "50", "最近 50 轮")
            + opt(st.range, "custom", "自定义")
            + '</select>'
            + '<input type="number" id="adr044-custom" placeholder="自定义轮数" value="' + esc(st.customRange || "") + '" style="display:' + (String(st.range) === "custom" ? "block" : "none") + '">'
            + adrDToneBlockHTML("adr048-actions")
            + '<label>角色卡要点 / 世界书 / 当前担心</label>'
            + '<textarea id="adr044-memory" rows="5" placeholder="这里会同时发给情感导演和统筹">' + esc(st.supplementMemory || "") + '</textarea>'
            + '<label>导演稿怎么放进聊天</label><select id="adr044-inject-mode">'
            + opt(st.injectMode, "visible", "直接显示在楼里")
            + opt(st.injectMode, "folded", "隐形标记（配合美化正则）")
            + '</select>'
            + '<label class="adr048-check"><input type="checkbox" id="adr044-show-floating-window"' + (st.showFloatingWindow ? " checked" : "") + '> 显示小红霞浮窗</label>'
            + '<label class="adr048-check"><input type="checkbox" id="adr044-fab-motion"' + (st.fabMotion !== false ? " checked" : "") + '> 浮标流动动效（怀疑手机发烫可以关掉对比）</label>'
            + '<label class="adr048-check"><input type="checkbox" id="adr044-show-auto-trigger-popup"' + (st.showAutoTriggerPopup !== false ? " checked" : "") + '> 导演上岗前先打个招呼</label>'
            + '<label class="adr048-check"><input type="checkbox" id="adr044-stream-enabled"' + (st.streamEnabled !== false ? " checked" : "") + '> 流式接收导演稿（thinking 模型建议开；中转站不支持流式就关掉）</label>'

            + adrxDrawerStart("shared-adv", "⚙️ 进阶开关（默认已调好，一般不用动）", false)
            + '<label>正文标签名（默认 content，多个用英文逗号分隔；正文没有标签就填 *，整层楼当正文读）</label>'
            + '<input type="text" id="adr044-content-tags" placeholder="content" value="' + esc(st.contentTagNames || "content") + '">' 
            + '<label class="adr048-check"><input type="checkbox" id="adr044-float-inject"' + (st.floatInjectEnabled !== false ? " checked" : "") + '> 贴耳模式：最新一份稿始终跟着对话走（不占楼层）</label>'
            + '<label>贴耳位置：稿子塞在倒数第几条（默认 2，不懂别动）</label><input type="number" id="adr044-float-depth" min="0" max="99" value="' + esc(st.floatDepth != null ? st.floatDepth : 2) + '">'
            + '<label class="adr048-check"><input type="checkbox" id="adr044-director-log"' + (st.directorLogEnabled !== false ? " checked" : "") + '> 跟组模式：导演记得自己说过什么，不翻烧饼</label>'
            + '<label class="adr048-check"><input type="checkbox" id="adr044-ng-detect"' + (st.ngDetectEnabled !== false ? " checked" : "") + '> NG 检测：同一楼重 roll ' + ADR_D_NG_THRESHOLD + ' 次提示请导演</label>'
            + '</details>'

            + adrxDrawerStart("shared-diag", "🔧 校对与诊断（排查问题时才用）", false)
            + '<div class="adr048-actions"><button id="adr044-probe-context" type="button">检测上下文</button><button id="adr044-probe-content" type="button">测试 &lt;content&gt; 提取</button></div>'
            + '<div class="adr048-actions"><button id="adr044-preview-precise" type="button">预览精准读取</button></div>'
            + '</details>'
            + '</details>'

            + adr048PageHTML("emotion")
            + adr048PageHTML("plot")
            + adrCd048PageHTML()
            + adrLamp048PageHTML()
            + adrTheater048PageHTML()
            + '</div>'
            + '</div>'
            + '</div>';
    }


    function adr048CreatePopupPanel() {
        try {
            var d = rootDoc();
            if (!d) return;

            var old = d.querySelector("#adr048-popup-panel");
            if (old) return;

            var wrap = d.createElement("div");
            wrap.innerHTML = adr048PanelHTML();
            var panel = wrap.firstChild;

            (d.body || d.documentElement).appendChild(panel);

            adr048BindPopupPanel();
            bindDirect();
            // v1.39.0 浮窗每次重建，掌灯页的素材与对话从状态里画回来；v1.43.2 只在停在掌灯页时算，别的页开窗不白算
            try { if (settings().activeTab === "lamp") adrLampRefreshAll(); else adrLampDirty = true; } catch (eLampOpen) {}
        } catch (e) {
            console.error("[ADR0483] create popup panel failed", e);
        }
    }


    function adr048OpenPopupPanel() {
        try { switchTab(settings().activeTab || "emotion"); adrDRefreshAllFieldsFromSettings(); } catch (eOpenRefresh) {}

        try {
            var d = rootDoc();

            // 每次打开浮窗前重建面板，避免抽屉/浮窗两套 DOM 不同步。
            try {
                var oldPanel = d.querySelector("#adr048-popup-panel");
                if (oldPanel && oldPanel.parentNode) oldPanel.parentNode.removeChild(oldPanel);
            } catch (e0) {}

            adr048CreatePopupPanel();
            setTimeout(adrDBindCompactTemplateControls, 120);
            setTimeout(adrDBindApiProfileControls, 120);
            adrDRefreshAllFieldsFromSettings();

            var p = d.querySelector("#adr048-popup-panel");
            var shell = d.querySelector("#adr048-popup-shell");
            var body = d.querySelector("#adr048-popup-body");

            if (!p || !shell) {
                try { alert("暗河红霞面板壳未创建成功"); } catch (_) {}
                return;
            }

            p.setAttribute("data-open", "1");

            adr048SetImportant(p, "display", "block");
            adr048SetImportant(p, "visibility", "visible");
            adr048SetImportant(p, "opacity", "1");
            adr048SetImportant(p, "pointer-events", "auto");
            adr048SetImportant(p, "position", "fixed");
            adr048SetImportant(p, "left", "0");
            adr048SetImportant(p, "right", "0");
            adr048SetImportant(p, "top", "0");
            adr048SetImportant(p, "bottom", "0");
            adr048SetImportant(p, "width", "100vw");
            adr048SetImportant(p, "height", "100vh");
            adr048SetImportant(p, "z-index", "2147483646");
            // v1.48.0：幕布不再遮盖聊天——不染色、不模糊，浮窗周围的楼照常看得见（江：「周围一圈毛玻璃清掉，正常就行」）。
            // 幕布本身还在（点浮窗外面关闭靠它），只是透明。
            adr048SetImportant(p, "background", "transparent");

            adr048SetImportant(shell, "display", "flex");
            adr048SetImportant(shell, "flex-direction", "column");
            adr048SetImportant(shell, "visibility", "visible");
            adr048SetImportant(shell, "opacity", "1");
            adr048SetImportant(shell, "pointer-events", "auto");
            adr048SetImportant(shell, "position", "fixed");
            adr048SetImportant(shell, "left", "10px");
            adr048SetImportant(shell, "right", "10px");
            adr048SetImportant(shell, "top", "64px");
            adr048SetImportant(shell, "bottom", "64px");
            adr048SetImportant(shell, "width", "auto");
            adr048SetImportant(shell, "height", "auto");
            adr048SetImportant(shell, "min-height", "0");
            adr048SetImportant(shell, "max-height", "calc(100vh - 128px)");
            adr048SetImportant(shell, "z-index", "2147483647");
            adr048SetImportant(shell, "overflow", "hidden");
            adr048SetImportant(shell, "background", "rgb(42,52,67)"); // v1.48.0：幕布不再模糊，壳体留 2% 的透会让背后的字隐约印上来，改成实的
            adr048SetImportant(shell, "color", "#f2f2f2");
            adr048SetImportant(shell, "border", "1px solid rgba(228,212,246,.16)");
            adr048SetImportant(shell, "border-radius", "30px");
            adr048SetImportant(shell, "box-shadow", "0 34px 70px -28px rgba(0,0,0,.72), 0 10px 26px -14px rgba(0,0,0,.46)");

            if (body) {
                adr048SetImportant(body, "display", "block");
                adr048SetImportant(body, "visibility", "visible");
                adr048SetImportant(body, "opacity", "1");
                adr048SetImportant(body, "flex", "1 1 auto");
                adr048SetImportant(body, "overflow", "auto");
                adr048SetImportant(body, "-webkit-overflow-scrolling", "touch");
                adr048SetImportant(body, "padding", "10px 12px 16px");
                adr048SetImportant(body, "min-height", "0");
            }

            adr048ApplyPanelTheme();
            adr048BindPopupPanel();
            bindDirect();
            adrDRestorePanelRuntimeState();

            try { if (body) body.scrollTop = 0; } catch (e1) {}
            // v1.41.9：面板显示出来之后再把掌灯的对话框卷到最新一句。重建面板时它还藏着、高度为 0，那时卷等于没卷——
            // 这就是"重开浮窗对话框停在最顶上、切页签却能到底"的根子。
            try { adrLampScrollThreadToBottom(); } catch (eTh) {}
        } catch (e) {
            console.error("[ADR0483] open popup failed", e);
            try { alert("暗河红霞面板打开失败：" + (e.message || String(e))); } catch (_) {}
        }
    }


    function adr048ClosePopupPanel() {
        try {
            // 关闭浮窗前先强制同步一次表单，避免移动端输入框/长文本框的 debounced save 尚未落盘。
            try {
                syncAll();
                adrDSaveLocalBackup(settings());
                saveNow();
            } catch (eSaveBeforeClose) {}

            var p = rootDoc().querySelector("#adr048-popup-panel");
            if (!p) return;
            p.setAttribute("data-open", "0");
            adr048SetImportant(p, "display", "none");
            adr048SetImportant(p, "visibility", "hidden");
            adr048SetImportant(p, "opacity", "0");
            adr048SetImportant(p, "pointer-events", "none");
        } catch (e) {}
    }

    // v1.14.4 开灯：浮窗双主题应用器。仅换皮不动逻辑；
    // 打开浮窗与点灯时各调一次，把 open 流程里的内联 !important 深色按主题重刷，
    // 其余配色交给 style.css 的 [data-arb-theme="dawn"] 级联。
    function adr048ApplyPanelTheme() {
        adr048ApplyFabTheme();
        try {
            var d = rootDoc();
            var p = d.querySelector("#adr048-popup-panel");
            if (!p) return;
            var palette = adr048Palette();
            var dawn = !adr048IsDarkPalette(palette);
            var wine = palette === "wine";
            p.setAttribute("data-arb-theme", dawn ? "dawn" : "dusk");
            p.setAttribute("data-adr-palette", palette);

            if (p.getAttribute("data-open") === "1") {
                // v1.48.0：幕布透明。v1.31.0–1.36.0 这里按配色给幕布染一层薄纱，再加样式表里的全屏模糊，
                // 浮窗周围的聊天就被一圈毛玻璃盖住；现在两样都去掉，浮窗靠自己的投影浮在楼上面。
                adr048SetImportant(p, "background", "transparent");
            }

            var shell = d.querySelector("#adr048-popup-shell");
            if (shell) {
                // v1.32.0：红霞是深色组第二员，壳体走自己的令牌；夜色那套内联值原样保留。
                adr048SetImportant(shell, "background", (dawn || wine)
                    ? "var(--arb-surface)"
                    : "rgb(42,52,67)");
                adr048SetImportant(shell, "color", (dawn || wine) ? "var(--arb-ink)" : "#f2f2f2");
                // v1.48.0：边收成一道细线；没有幕布垫着了，投影收拢、压深一点，浮窗才从楼上面浮得起来。
                adr048SetImportant(shell, "border", dawn
                    ? "1px solid rgba(255,255,255,.74)"
                    : (wine ? "1px solid rgba(226,166,186,.18)" : "1px solid rgba(228,212,246,.14)"));
                adr048SetImportant(shell, "box-shadow", dawn
                    ? "0 34px 70px -28px rgba(52,44,88,.52), 0 10px 26px -14px rgba(52,44,88,.30), 0 0 0 1px rgba(64,70,110,.07)"
                    : (wine ? "0 34px 70px -28px rgba(20,2,10,.78), 0 10px 26px -14px rgba(20,2,10,.50)" : "0 34px 70px -28px rgba(0,0,0,.72), 0 10px 26px -14px rgba(0,0,0,.46)"));
            }

            var tg = d.querySelector("#adr048-theme-toggle");
            if (tg) {
                var next = adr048NextPalette(palette);
                tg.textContent = ADR_PALETTE_ICON[palette];
                tg.title = "当前：" + ADR_PALETTE_LABEL[palette] + " · 点击切换：" + ADR_PALETTE_LABEL[next];
                tg.setAttribute("aria-label", tg.title);
            }
        } catch (e) {}
    }

    // v1.48.0：页签停在原位时是透明的一行字，滚到吸顶以后才垫一层纸底（不然下面的字会从字缝里透上来）。
    // 样式表自己分不出「吸没吸住」，这里听一下浮窗正文的滚动：只读两个位置，状态翻转时才改一次 class，不在滚动里写样式。
    function adr048SyncTabsStuck(body) {
        try {
            if (!body) return;
            var tabs = body.querySelector(".adr-top-tabs");
            if (!tabs) return;
            var stuck = body.scrollTop > 0 && (tabs.getBoundingClientRect().top - body.getBoundingClientRect().top) <= 0.75;
            if (stuck !== (tabs.getAttribute("data-hx-stuck") === "1")) tabs.setAttribute("data-hx-stuck", stuck ? "1" : "0");
        } catch (e) {}
    }
    function adr048BindTabsStuck() {
        try {
            var d = rootDoc();
            if (d.__adr048TabsStuckBound) return;
            d.__adr048TabsStuckBound = true;
            d.addEventListener("scroll", function (ev) {
                var t = ev && ev.target;
                if (t && t.id === "adr048-popup-body") adr048SyncTabsStuck(t);
            }, { capture: true, passive: true });
        } catch (e) {}
    }
    try { window.__adr048TabsStuckTest = { sync: adr048SyncTabsStuck }; } catch (e) {}

    function adr048BindPopupPanel() {
        try { adr048BindTabsStuck(); } catch (eStuck) {}   // 包一层：这个函数有时被单独拎出去跑（test_theme.js），那时没有上面那两个
        try {
            var d = rootDoc();

            var themeBtn = d.querySelector("#adr048-theme-toggle");
            if (themeBtn && !themeBtn.__adr048Bound) {
                themeBtn.__adr048Bound = true;
                var adr048FlipTheme = function (ev) {
                    try { ev.preventDefault(); ev.stopPropagation(); } catch (e) {}
                    try {
                        var next = adr048NextPalette(adr048Palette());
                        save("themePalette", next);
                        save("dawnTheme", next !== "dusk");
                        saveNow();
                        adr048ApplyPanelTheme();
                    } catch (e2) {}
                };
                themeBtn.addEventListener("click", adr048FlipTheme, true);
                // Native click also covers touch and keyboard; avoid a touchend/click double advance.
            }

            var close = d.querySelector("#adr048-popup-close");
            if (close && !close.__adr048Bound) {
                close.__adr048Bound = true;
                close.addEventListener("click", function (ev) {
                    try { ev.preventDefault(); ev.stopPropagation(); } catch (e) {}
                    adr048ClosePopupPanel();
                }, true);
                close.addEventListener("touchend", function (ev) {
                    try { ev.preventDefault(); ev.stopPropagation(); } catch (e) {}
                    adr048ClosePopupPanel();
                }, true);
            }
        } catch (e) {}
    }


    function adr048SetImportant(el, key, value) {
        try { el.style.setProperty(key, value, "important"); }
        catch(e) { try { el.style[key] = value; } catch(_) {} }
    }


    function adr048RemoveFab() {
        try {
            var d = rootDoc();
            var list = d.querySelectorAll("#adr048-fab");
            for (var i = 0; i < list.length; i++) {
                try { if (list[i].parentNode) list[i].parentNode.removeChild(list[i]); } catch (e) {}
            }
        } catch (e) {}
    }

    function adr048InstallFabOwner() {
        try {
            var w = rootWin();
            var old = w[ADR048_FAB_REGISTRY_KEY];
            if (old && old.instanceId !== ADR048_FAB_INSTANCE_ID && typeof old.stop === "function") {
                try { old.stop(); } catch (e) {}
            }
            w[ADR048_FAB_REGISTRY_KEY] = {
                instanceId: ADR048_FAB_INSTANCE_ID,
                stop: function () {
                    try {
                        if (w.__adr0481AnchorTimer) {
                            clearInterval(w.__adr0481AnchorTimer);
                            w.__adr0481AnchorTimer = null;
                        }
                        if (w.__adr048FabObserver) {
                            try { w.__adr048FabObserver.disconnect(); } catch (e0) {}
                            w.__adr048FabObserver = null;
                        }
                    } catch (e) {}
                    try { adr048RemoveFab(); } catch (e2) {}
                }
            };
        } catch (e3) {}
    }

    function adr048GetFabSavedPosition() {
        try {
            var st = settings();
            var left = Number(st.fabLeft);
            var top = Number(st.fabTop);
            if (Number.isFinite(left) && Number.isFinite(top)) return { left: left, top: top };
        } catch (e) {}
        return null;
    }

    function adr048ClampPoint(left, top, width, height) {
        try {
            var w = rootWin() || window;
            var vw = Number(w.innerWidth) || 360;
            var vh = Number(w.innerHeight) || 640;
            width = Number(width) || 42;
            height = Number(height) || 16;
            return {
                left: Math.max(4, Math.min(vw - width - 4, Number(left) || 0)),
                top: Math.max(4, Math.min(vh - height - 4, Number(top) || 0))
            };
        } catch (e) {
            return { left: Number(left) || 12, top: Number(top) || 148 };
        }
    }

    function adr048ApplyFabPosition(btn, pos, isSaved) {
        try {
            if (!btn) return;
            if (pos && Number.isFinite(Number(pos.left)) && Number.isFinite(Number(pos.top))) {
                var fixed = isSaved ? adr048ClampPoint(Number(pos.left), Number(pos.top), 42, 16) : pos;
                adr048SetImportant(btn, "left", Math.round(fixed.left) + "px");
                adr048SetImportant(btn, "top", Math.round(fixed.top) + "px");
                adr048SetImportant(btn, "right", "auto");
                adr048SetImportant(btn, "bottom", "auto");
                btn.setAttribute("data-user-moved", "1");
                return;
            }
            adr048SetImportant(btn, "left", "auto");
            adr048SetImportant(btn, "top", "auto");
            adr048SetImportant(btn, "right", "12px");
            adr048SetImportant(btn, "bottom", "148px");
        } catch (e) {}
    }

    function adr048SaveFabPosition(btn) {
        try {
            if (!btn) return;
            var r = btn.getBoundingClientRect();
            if (!r || r.width <= 0 || r.height <= 0) return;
            var pos = adr048ClampPoint(r.left, r.top, r.width, r.height);
            save("fabLeft", Math.round(pos.left));
            save("fabTop", Math.round(pos.top));
            try { adrDSaveLocalBackup(settings()); } catch (e0) {}
        } catch (e) {}
    }

    function adr048ShouldShowFab() {
        try {
            return settings().showFloatingWindow !== false;
        } catch (e) {
            return true;
        }
    }

    // v1.31.0：第四套「天青如梦」（celadon）。顺序：暗河夜色 → 粉霞水光 → 雾珠月汐 → 天青如梦 → 回到夜色。
    // v1.32.0：第五套「暗河红霞」（wine），深色组第二员。顺序：夜色 → 粉霞 → 雾珠 → 天青 → 红霞 → 回到夜色。
    // v1.35.0：第六套「莫兰迪烟粉」（morandi），浅色。顺序：夜色 → 粉霞 → 雾珠 → 天青 → 红霞 → 烟粉 → 回到夜色。
    // v1.36.0：第七套「晴空粉霞」（skyrose），浅色。顺序：夜色 → 粉霞 → 雾珠 → 天青 → 红霞 → 烟粉 → 晴空 → 回到夜色。
    var ADR_PALETTES = ["dusk", "sunset", "pearl", "celadon", "wine", "morandi", "skyrose"];
    var ADR_DARK_PALETTES = ["dusk", "wine"];
    var ADR_PALETTE_LABEL = { dusk: "暗河夜色", sunset: "粉霞水光", pearl: "雾珠月汐", celadon: "天青如梦", wine: "暗河红霞", morandi: "莫兰迪烟粉", skyrose: "晴空粉霞" };
    var ADR_PALETTE_ICON = { dusk: "🌙", sunset: "🌸", pearl: "🫧", celadon: "🕊️", wine: "🌹", morandi: "🎀", skyrose: "🌤️" };

    function adr048IsDarkPalette(palette) { return ADR_DARK_PALETTES.indexOf(palette) >= 0; }

    // Keep the previous light/dark attribute for shared layout; palette selects the colors.
    function adr048Palette() {
        var st = settings();
        if (ADR_PALETTES.indexOf(st.themePalette) !== -1) return st.themePalette;
        return st.dawnTheme === true ? "sunset" : "dusk";
    }

    function adr048NextPalette(palette) {
        var i = ADR_PALETTES.indexOf(palette);
        return ADR_PALETTES[(i + 1) % ADR_PALETTES.length];
    }

    function adr048FabTheme() {
        return adr048IsDarkPalette(adr048Palette()) ? "dusk" : "dawn";
    }

    function adr048ApplyFabTheme() {
        try {
            var d = rootDoc();
            var palette = adr048Palette();
            var drawer = d.querySelector("#adr044-drawer");
            if (drawer) drawer.setAttribute("data-adr-palette", palette);
            var btn = d.querySelector("#adr048-fab");
            if (!btn) return;
            btn.setAttribute("data-adr-palette", palette);
            // v1.37.0：动效开关只挂一个属性，style.css 据此把水波、亮流与脉冲全停；按钮与拖动监听不重建。
            btn.setAttribute("data-arb-motion", settings().fabMotion === false ? "off" : "on");
            var theme = adr048FabTheme();
            if (btn.getAttribute("data-arb-theme") !== theme) btn.setAttribute("data-arb-theme", theme);
            // v1.45.1 换配色、开关动效时把灯的状态补一遍。放在最后且自带保险：补灯出什么岔子都不许挡住上面的换色。
            try { if (typeof adr048ApplyFabBusy === "function") adr048ApplyFabBusy(); } catch (eBusy) {}
        } catch (e) {}
    }

    function adr048CreateFab() {
        try {
            var d = rootDoc();
            if (!d) return;

            if (!adr048ShouldShowFab()) {
                adr048RemoveFab();
                return;
            }

            var btn = d.querySelector("#adr048-fab");
            if (btn) { adr048ApplyFabTheme(); return; }

            btn = d.createElement("button");
            btn.id = "adr048-fab";
            btn.setAttribute("data-adr048-owned-fab", ADR048_FAB_INSTANCE_ID);
            btn.type = "button";
            // SVG palette follows data-arb-theme; the button and drag listeners are never rebuilt.
            // v1.33.0：浮标改版——去掉珠心／光环／日月，只留一条流淌的暗河。
            // 四段渐变底 + 玻璃高光 + 两道错位漂流的水波 + 一段沿波行走的亮流；
            // 每一处颜色都挂类名，由 style.css 按 data-adr-palette 逐套上色。
            btn.innerHTML = '<svg viewBox="0 0 120 44" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="height:100%;width:auto;display:block;pointer-events:none;overflow:visible">'
                + '<defs>'
                + '<linearGradient id="pkARB-bg" x1="0" y1="0" x2="1" y2="1"><stop class="arb-fab-stop-a" offset="0" stop-color="#2b2f5c"/><stop class="arb-fab-stop-b" offset=".38" stop-color="#55609e"/><stop class="arb-fab-stop-c" offset=".72" stop-color="#8f8fd0"/><stop class="arb-fab-stop-d" offset="1" stop-color="#c9b3e6"/></linearGradient>'
                + '<linearGradient id="pkARB-sheen" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".50"/><stop offset=".45" stop-color="#fff" stop-opacity=".04"/><stop offset="1" stop-color="#fff" stop-opacity=".16"/></linearGradient>'
                + '<linearGradient id="pkARB-river" x1="0" y1="0" x2="1" y2="0"><stop class="arb-fab-river-a" offset="0" stop-color="#fff" stop-opacity="0"/><stop class="arb-fab-river-b" offset=".5" stop-color="#fff" stop-opacity=".9"/><stop class="arb-fab-river-c" offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>'
                + '<clipPath id="pkARB-clip"><rect x="1" y="1" width="118" height="42" rx="21"/></clipPath>'
                + '</defs>'
                + '<rect class="arb-fab-shell" x="1" y="1" width="118" height="42" rx="21" fill="url(#pkARB-bg)" stroke="#ffffff" stroke-opacity=".55"/>'
                + '<rect class="arb-fab-sheen" x="1" y="1" width="118" height="42" rx="21" fill="url(#pkARB-sheen)"/>'
                + '<g clip-path="url(#pkARB-clip)">'
                + '<path class="arb-fab-river arb-fab-river-2" d="M-40 36 q 10 -3.5 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0" fill="none" stroke="url(#pkARB-river)" stroke-width="1" stroke-linecap="round" opacity=".45"/>'
                + '<path class="arb-fab-river arb-fab-river-1" d="M-40 31 q 10 -4.5 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0" fill="none" stroke="url(#pkARB-river)" stroke-width="1.3" stroke-linecap="round" opacity=".85"/>'
                + '<path class="arb-fab-current" d="M-40 31 q 10 -4.5 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-dasharray="9 111" opacity=".95"/>'
                + '</g>'
                + '<text class="arb-fab-word" x="60" y="22" text-anchor="middle" font-size="13.5" font-weight="600" fill="#f5f4ff" letter-spacing="3.2" font-family="-apple-system,sans-serif">ARB</text>'
                + '</svg>';
            btn.title = "Arrebol D 小红霞";
            btn.setAttribute("aria-label", "Arrebol D 小红霞");

            function setImp(k, v) { adr048SetImportant(btn, k, v); }
            setImp("position", "fixed");
            setImp("z-index", "2147483647");
            setImp("display", "inline-flex");
            setImp("align-items", "center");
            setImp("justify-content", "center");
            // v1.37.1：浮标袖珍一号，高 28 → 22px；SVG 按 120:44 等比跟着缩，宽约 76 → 60px。
            // v1.37.2：再等比缩 30%，高 22 → 15.4px，宽 60 → 42px。
            setImp("width", "auto");
            setImp("height", "15.4px");
            setImp("min-width", "auto");
            setImp("min-height", "15.4px");
            setImp("padding", "0");
            setImp("border-radius", "999px");
            setImp("border", "none");
            setImp("background", "transparent");
            setImp("backdrop-filter", "none");
            setImp("-webkit-backdrop-filter", "none");
            setImp("color", "rgba(64, 77, 98, .88)");
            setImp("-webkit-text-fill-color", "rgba(64, 77, 98, .88)");
            setImp("font-size", "13px");
            setImp("font-weight", "800");
            setImp("line-height", "15.4px");
            btn.style.boxShadow = "none"; /* 不带 important：给脉冲动画让路 */
            setImp("filter", "drop-shadow(0 3.5px 8px rgba(28,21,54,.34))");
            setImp("cursor", "grab");
            setImp("pointer-events", "auto");
            setImp("user-select", "none");
            setImp("-webkit-user-select", "none");
            setImp("touch-action", "none");
            setImp("white-space", "nowrap");
            setImp("visibility", "visible");
            setImp("opacity", "1");
            setImp("transform", "translateZ(0)");
            btn.setAttribute("data-anchor", "own-lazy-fixed");

            (d.body || d.documentElement).appendChild(btn);
            adr048ApplyFabTheme();
            adr048ApplyFabPosition(btn, adr048GetFabSavedPosition(), true);

            var dragging = false;
            var moved = false;
            var sx = 0, sy = 0, sl = 0, st = 0;

            function point(ev) {
                if (ev.touches && ev.touches.length) return { x: ev.touches[0].clientX, y: ev.touches[0].clientY };
                if (ev.changedTouches && ev.changedTouches.length) return { x: ev.changedTouches[0].clientX, y: ev.changedTouches[0].clientY };
                return { x: ev.clientX || 0, y: ev.clientY || 0 };
            }

            function startDrag(ev) {
                var p = point(ev);
                var r = btn.getBoundingClientRect();
                dragging = true;
                moved = false;
                sx = p.x; sy = p.y; sl = r.left; st = r.top;
                setImp("cursor", "grabbing");
                try { ev.preventDefault(); ev.stopPropagation(); } catch(e) {}
            }

            function moveDrag(ev) {
                if (!dragging) return;
                var p = point(ev);
                var dx = p.x - sx;
                var dy = p.y - sy;
                if (Math.abs(dx) + Math.abs(dy) > 10) moved = true;
                var r = btn.getBoundingClientRect();
                var pos = adr048ClampPoint(sl + dx, st + dy, r.width || 42, r.height || 16);
                setImp("left", Math.round(pos.left) + "px");
                setImp("top", Math.round(pos.top) + "px");
                setImp("right", "auto");
                setImp("bottom", "auto");
                btn.setAttribute("data-user-moved", "1");
                // v1.45.3：亮着灯拖动时，灯跟着落点决定挂外面还是收进胶囊两头（用算好的落点，不多读一次布局）
                if (btn.classList.contains("adr048-analyzing")) adr048PlaceFabLamps(btn, pos.left, pos.left + (r.width || 42));
                try { ev.preventDefault(); ev.stopPropagation(); } catch(e) {}
            }

            function endDrag(ev) {
                if (!dragging) return;
                dragging = false;
                setImp("cursor", "grab");
                if (moved) {
                    adr048SaveFabPosition(btn);
                } else {
                    setTimeout(function () {
                        try { adr048OpenPopupPanel(); } catch (e) { console.error(e); }
                    }, 30);
                }
                try { ev.preventDefault(); ev.stopPropagation(); } catch(e) {}
            }

            btn.addEventListener("mousedown", startDrag, { passive: false });
            btn.addEventListener("touchstart", startDrag, { passive: false });
            d.addEventListener("mousemove", moveDrag, { passive: false });
            d.addEventListener("mouseup", endDrag, { passive: false });
            d.addEventListener("touchmove", moveDrag, { passive: false });
            d.addEventListener("touchend", endDrag, { passive: false });
            d.addEventListener("touchcancel", endDrag, { passive: false });

            function hardOpen(ev) {
                try { ev.preventDefault(); ev.stopPropagation(); } catch(e) {}
                setTimeout(function () {
                    try { adr048OpenPopupPanel(); } catch (e2) { console.error(e2); }
                }, 20);
                return false;
            }
            btn.onclick = hardOpen;
            btn.addEventListener("click", hardOpen, true);
        } catch (e2) {
            console.error("[ADR0481] create lazy fab failed", e2);
        }
    }

    function adr048EnsureFabLater() {
        adr048InstallFabOwner();
        adr048CreatePopupPanel();
        setTimeout(adrDBindCompactTemplateControls, 120);
        setTimeout(adrDBindApiProfileControls, 120);
        if (!adr048ShouldShowFab()) {
            adr048RemoveFab();
            return;
        }
        adr048CreateFab();
        setTimeout(adr048CreateFab, 400);
        setTimeout(adr048CreateFab, 900);
        setTimeout(adr048CreateFab, 1600);
        setTimeout(adr048CreateFab, 2600);
        setTimeout(adr048CreateFab, 4200);

        try {
            var w = rootWin();
            var d = rootDoc();
            if (!w.__adr048FabObserver && typeof MutationObserver === "function" && d && d.body) {
                var pending = false;
                w.__adr048FabObserver = new MutationObserver(function () {
                    if (pending) return;
                    pending = true;
                    setTimeout(function () {
                        pending = false;
                        try {
                            if (adr048ShouldShowFab() && !d.querySelector("#adr048-fab")) adr048CreateFab();
                        } catch (e) {}
                    }, 120);
                });
                // v1.24.0：悬浮球是 body 的直接子节点，只盯 body 一层就够。
                // 旧写法 subtree:true 盯整棵树，流式生成期间每个字都进回调，白跑。
                w.__adr048FabObserver.observe(d.body, { childList: true, subtree: false });
            }
        } catch (e2) {}
    }


    var adrDAutoTriggerTimer = null;
    var adrDLastChatLengthSeen = -1;
    var adrDAutoTriggerRunning = false;
    // v1.0.5.6.8.3.5：页面加载后短安全期。自动触发可以读数/对齐，但绝不生成注入，堵住 iOS 刷新抢跑竞态。
    // v1.0.5.6.8.3.6：启动安全期内彻底只读，不创建/覆盖 baseline，避免面板刷新把 1/30 写成 0/30。
    // v1.0.5.6.8.3.9：partial 小读数保护 + 自动触发吞触发修复。角色总数只应单调增加；count < base 一律视作未加载全，不允许下拉 baseline。
    var ADR_D_AUTO_STARTUP_GRACE_MS = 20000;
    var adrDAutoScriptLoadedAt = Date.now();

    function adrDInStartupAutoGrace() {
        return Date.now() - adrDAutoScriptLoadedAt < ADR_D_AUTO_STARTUP_GRACE_MS;
    }

    function adrDChatKey() {
        try {
            var c = ctx();
            if (typeof c.getCurrentChatId === "function") {
                var x = c.getCurrentChatId();
                if (x) return String(x);
            }
            if (c.chatId) return String(c.chatId);
            return String(c.characterId || "char") + "::" + String(c.name1 || "chat");
        } catch (e) {
            return "unknown-chat";
        }
    }


    function adrDIsUnstableChatKey(key) {
        var k = String(key || "");
        if (!k) return true;
        if (k === "unknown-chat") return true;
        if (k === "char::chat") return true;
        if (k.indexOf("undefined") >= 0) return true;
        if (k.indexOf("null") >= 0) return true;
        return false;
    }

    function adrDChatKeyReady() {
        try {
            var c = ctx();
            if (typeof c.getCurrentChatId === "function") {
                var x = c.getCurrentChatId();
                return !!x && !adrDIsUnstableChatKey(String(x));
            }
            if (c.chatId) return !adrDIsUnstableChatKey(String(c.chatId));
            // 旧环境没有稳定 chat-id API 时，只能使用原 fallback key，保持兼容。
            return true;
        } catch (e) {
            return false;
        }
    }

    // v1.0.5.6.8.3：自动触发计数“换眼睛”。
    // 计数公式仍然是 count - baseline；只把 count 的读取源从当前前端窗口，优先换成 TavernHelper 全量历史。
    // v1.0.5.6.8.3.1：全量计数粘滞保护。成功取得过一次全量后，瞬时失败不再回退窗口计数，避免 source 抖动清空进度。
    // v1.0.5.6.8.3.2：冷启动闸门。有 TavernHelper 全量能力时，首次全量成功前不触发、不写 baseline，避免刷新冷窗口误触发。
    // v1.0.5.6.8.3.3：首次被动判定安全网，发现脏 baseline 只对齐不注入。
    // v1.0.5.6.8.3.5：chatKey 稳定前不落盘/不触发；启动 20 秒内禁自动注入；注入落点只允许助手楼。
    var ADR_D_FULL_COUNT_MODE = "full-chat-v1";
    var ADR_D_STICKY_FULL = true;
    // v1.9.31：per-chat count isolation。缓存记住自己属于哪个 chatKey；
    // 换聊天后旧缓存一律视为"未就绪"，粘滞保护只在同一聊天内生效，
    // 杜绝"旧聊天的 count 给新聊天写 baseline"的跨聊天污染。
    var adrDFullCountCache = { count: null, source: "window", lastMessageId: -1, updatedAt: 0, loading: false, messages: [], everFull: false, chatKey: "" };
    // v1.19.3 启动热修：全量读取必须 single-flight。
    // 旧版在 loading 时立刻返回一个已兑现 Promise；计数 UI 的 then() 又会重画计数，
    // 重画时再发起读取，最终形成永不让出主线程的微任务闭环。
    var adrDFullCountRefreshWaiters = [];
    var adrDFullCountQueueBusy = false;
    var adrDFullCountQueueAgainReason = "";

    function adrDFullCacheMatchesCurrentChat() {
        try {
            return !!adrDFullCountCache.chatKey && adrDFullCountCache.chatKey === (adrDChatKey ? adrDChatKey() : "");
        } catch (e) {
            return false;
        }
    }

    function adrDGetTavernHelper() {
        try { if (typeof TavernHelper !== "undefined" && TavernHelper) return TavernHelper; } catch (e0) {}
        try { var rw = rootWin(); if (rw && rw.TavernHelper) return rw.TavernHelper; } catch (e1) {}
        try { if (window.parent && window.parent.TavernHelper) return window.parent.TavernHelper; } catch (e2) {}
        return null;
    }

    function adrDWindowAssistantRoundCount() {
        var chat;
        try { chat = ctx().chat; } catch (e) { return 0; }
        if (!chat || !chat.length) return 0;

        var n = 0;
        for (var i = 0; i < chat.length; i++) {
            var m = chat[i];
            if (!m || m.is_system || m.is_user) continue;
            // v1.13.2：与全量口径同拍——数楼不数字，渲染文本清空不影响节奏。
            n++;
        }
        return n;
    }

    function adrDCountOneFullHistoryMessage(m) {
        if (!m) return 0;

        var role = String(m.role || "").toLowerCase();
        var isUser = m.is_user === true || role === "user";
        if (isUser) return 0;

        // 真 system 通知一般没有角色名；隐藏助手楼层可能被标记为 system，但仍带 name / message。
        // 为了让“小幽灵/隐藏楼层”也进入真实角色回复数，只有“role=system 且无 name”才跳过。
        if (role === "system" && !m.name) return 0;

        // v1.13.2：数楼不数字。楼层存在即计数，不再看当前渲染文本是否为空——
        // 预设正则/美化脚本随时可能把某些楼的展示文本清空或还原，开关一扳口径就横跳，
        // 导演会把口径跳变误当"到点"。节奏跟着楼走，不跟着渲染走。
        return 1;
    }

    async function adrDRefreshFullAssistantRoundCount(reason) {
        // v1.9.31：粘滞保护按 chatKey 收窄。只有"同一聊天内的瞬时失败"才允许沿用旧全量数；
        // 换了聊天后旧缓存一律作废，宁可短暂回退窗口计数，也不把上一个聊天的总数带过来。
        var keyNow = adrDChatKey ? adrDChatKey() : "";
        var stickyOk = ADR_D_STICKY_FULL && adrDFullCountCache.everFull &&
            Number.isFinite(Number(adrDFullCountCache.count)) &&
            adrDFullCountCache.chatKey === keyNow;

        if (adrDFullCountCache.loading) {
            // 不再用“立即返回旧数”伪装成一次已完成的刷新。
            // 所有并发调用共等当前读取结束，既不重复拉历史，也不会制造 Promise 自激链。
            return new Promise(function (resolve) {
                adrDFullCountRefreshWaiters.push(resolve);
            });
        }

        var th = adrDGetTavernHelper();
        if (!th || typeof th.getChatMessages !== "function") {
            if (stickyOk) {
                try { console.warn("[Arrebol D] full history source temporarily unavailable; keep sticky full cache", reason || ""); } catch (eStickyLog0) {}
                adrDFullCountCache.updatedAt = Date.now();
                return Number(adrDFullCountCache.count) || 0;
            }
            adrDFullCountCache.count = adrDWindowAssistantRoundCount();
            adrDFullCountCache.source = "window";
            adrDFullCountCache.chatKey = keyNow;
            try { adrDFullCountCache.messages = (ctx().chat || []).slice(); } catch (eMsgs0) { adrDFullCountCache.messages = []; }
            adrDFullCountCache.updatedAt = Date.now();
            return adrDFullCountCache.count;
        }

        adrDFullCountCache.loading = true;
        try {
            var lastId;
            if (typeof th.getLastMessageId === "function") {
                lastId = Number(th.getLastMessageId());
            } else {
                try { lastId = (ctx().chat || []).length - 1; } catch (e0) { lastId = -1; }
            }

            if (!Number.isFinite(lastId) || lastId < 0) {
                adrDFullCountCache.count = 0;
                adrDFullCountCache.source = "full";
                adrDFullCountCache.lastMessageId = -1;
                adrDFullCountCache.messages = [];
                adrDFullCountCache.everFull = true;
                adrDFullCountCache.chatKey = keyNow;
                adrDFullCountCache.updatedAt = Date.now();
                return 0;
            }

            var messages = await th.getChatMessages("0-" + lastId, { include_swipes: false });
            if (!Array.isArray(messages)) messages = [];
            adrDFullCountCache.messages = messages;

            var n = 0;
            for (var i = 0; i < messages.length; i++) {
                n += adrDCountOneFullHistoryMessage(messages[i]);
            }

            adrDFullCountCache.count = n;
            adrDFullCountCache.source = "full";
            adrDFullCountCache.lastMessageId = lastId;
            adrDFullCountCache.everFull = true;
            adrDFullCountCache.chatKey = keyNow;
            adrDFullCountCache.updatedAt = Date.now();
            try { console.log("[Arrebol D] full history count", n, "lastId=", lastId, "chatKey=", keyNow, "reason=", reason || ""); } catch (eLog) {}
            return n;
        } catch (e) {
            if (stickyOk) {
                console.warn("[Arrebol D] full history count failed; keep sticky full cache", e);
                adrDFullCountCache.updatedAt = Date.now();
                return Number(adrDFullCountCache.count) || 0;
            }
            console.warn("[Arrebol D] full history count failed; fallback to window count", e);
            adrDFullCountCache.count = adrDWindowAssistantRoundCount();
            adrDFullCountCache.source = "window";
            adrDFullCountCache.chatKey = keyNow;
            try { adrDFullCountCache.messages = (ctx().chat || []).slice(); } catch (eMsgs0) { adrDFullCountCache.messages = []; }
            adrDFullCountCache.updatedAt = Date.now();
            return adrDFullCountCache.count;
        } finally {
            adrDFullCountCache.loading = false;
            // 唤醒同一航班上的调用者；刷新函数自身已把异常降级成可靠的缓存/window 计数。
            var settledCount = Number.isFinite(Number(adrDFullCountCache.count))
                ? Number(adrDFullCountCache.count)
                : adrDWindowAssistantRoundCount();
            var waiters = adrDFullCountRefreshWaiters.splice(0, adrDFullCountRefreshWaiters.length);
            waiters.forEach(function (resolve) {
                try { resolve(settledCount); } catch (eWaiter) {}
            });
        }
    }

    function adrDQueueFullAssistantRoundCountRefresh(reason) {
        var why = reason || "queued";
        try {
            // UI/事件在同一段时间内可能同时要求刷新。只保留一班在飞；期间若又有变化，
            // 当前班落地后补最后一班，避免丢掉换聊/删楼等真正需要重读的信号。
            if (adrDFullCountQueueBusy) {
                adrDFullCountQueueAgainReason = why;
                return;
            }

            adrDFullCountQueueBusy = true;
            adrDRefreshFullAssistantRoundCount(why).then(function () {
                try { adrDUpdateAutoCounters(); } catch (e) {}
            }, function (eRefresh) {
                try { console.warn("[Arrebol D] queued full history refresh failed", eRefresh); } catch (eLog) {}
            }).then(function () {
                adrDFullCountQueueBusy = false;
                var again = adrDFullCountQueueAgainReason;
                adrDFullCountQueueAgainReason = "";
                if (again) {
                    setTimeout(function () {
                        adrDQueueFullAssistantRoundCountRefresh(again);
                    }, 0);
                }
            }, function () {
                adrDFullCountQueueBusy = false;
            });
        } catch (e) {
            adrDFullCountQueueBusy = false;
        }
    }

    async function adrDGetFullChatMessagesForRead(reason) {
        var th = adrDGetTavernHelper();
        if (th && typeof th.getChatMessages === "function") {
            var lastId = -1;
            try {
                if (typeof th.getLastMessageId === "function") lastId = Number(th.getLastMessageId());
            } catch (e0) {}

            var hasFreshFullCache = adrDFullCountCache &&
                adrDFullCountCache.source === "full" &&
                adrDFullCacheMatchesCurrentChat() &&
                Array.isArray(adrDFullCountCache.messages) &&
                adrDFullCountCache.messages.length &&
                (lastId < 0 || Number(adrDFullCountCache.lastMessageId) === lastId);

            if (!hasFreshFullCache) {
                await adrDRefreshFullAssistantRoundCount(reason || "full-read");
            }

            if (adrDFullCountCache && adrDFullCountCache.source === "full" && adrDFullCacheMatchesCurrentChat() && Array.isArray(adrDFullCountCache.messages)) {
                return adrDFullCountCache.messages;
            }
        }

        // v1.9.31：粘滞兜底同样必须同 chatKey，绝不把上一个聊天的楼层喂给导演。
        if (ADR_D_STICKY_FULL && adrDFullCountCache && adrDFullCountCache.everFull && adrDFullCacheMatchesCurrentChat() && Array.isArray(adrDFullCountCache.messages)) {
            return adrDFullCountCache.messages;
        }
        try { return (ctx().chat || []).slice(); } catch (e1) { return []; }
    }

    function adrDAssistantRoundCount() {
        // v1.19.3 启动热修：同步计数入口必须是纯读取，绝不能在 UI 渲染过程中反向排队刷新。
        // 真正需要重读历史的时机由 init / 聊天事件 / 轮询显式触发；未就绪时只回退当前窗口。
        if (adrDFullCountCache && adrDFullCountCache.source === "full" && adrDFullCacheMatchesCurrentChat() && Number.isFinite(Number(adrDFullCountCache.count))) {
            return Number(adrDFullCountCache.count);
        }
        return adrDWindowAssistantRoundCount();
    }

    function adrDCountSourceLabel() {
        try {
            if (adrDFullCountCache.source === "full" && adrDFullCacheMatchesCurrentChat()) return "全量历史";
            return "当前窗口/等待全量";
        } catch (e) {
            return "当前窗口";
        }
    }

    function adrDCurrentCountMode() {
        return adrDFullCountCache && adrDFullCountCache.source === "full" && adrDFullCacheMatchesCurrentChat() ? ADR_D_FULL_COUNT_MODE : "window-v1";
    }

    function adrDCountReady() {
        // 没有 TavernHelper 全量能力时，window 计数就是当前环境的权威来源，保持旧行为。
        var th = adrDGetTavernHelper();
        if (!th || typeof th.getChatMessages !== "function") return true;
        // 有全量能力时，必须等"当前这个聊天"的 full 成功后，才允许触发/写 baseline。
        // v1.9.31：换聊天后旧缓存不算就绪，堵住换聊瞬间用旧 count 写新聊天 baseline 的竞态。
        return !!(adrDFullCountCache && adrDFullCountCache.source === "full" && adrDFullCacheMatchesCurrentChat());
    }

    function adrDCurrentMessageTailForPoll() {
        var th = adrDGetTavernHelper();
        try {
            if (th && typeof th.getLastMessageId === "function") return Number(th.getLastMessageId()) + 1;
        } catch (e) {}
        try { return (ctx().chat || []).length || 0; } catch (e2) { return 0; }
    }


    function adrDSetCounterText(type, info) {
        try {
            var d = rootDoc();
            var id = "adr044-auto-counter-" + type;
            var html = adrDCounterHTML(info);
            var nodes = Array.prototype.slice.call(d.querySelectorAll("#" + id));
            nodes.forEach(function (el) {
                if (!el || el.__adrCounterHTML === html) return;
                var details = el.querySelector('.adr-counter-details');
                var expanded = details && details.open;
                el.innerHTML = html;
                el.__adrCounterHTML = html;
                if (expanded) {
                    details = el.querySelector('.adr-counter-details');
                    if (details) details.open = true;
                }
            });
        } catch (e) {}
    }


    // v1.9.31：base 比当前全量总数高出这么多条以上，判定为历史遗留污染，自动贴齐重记。
    // 小幅 count < base（swipe/重roll/删几楼）仍走 no-shrink 保护，不动 base。
    var ADR_D_BASE_OVERRUN_HEAL = 20;

    function adrDIsPassiveAutoCheck(reason) {
        var r = String(reason || "");
        // 用户主动改开关/间隔/自定义间隔时，不吞掉其有意触发；其它事件/轮询/刷新均视为被动检查。
        if (/^(toggle|range|custom)-/.test(r)) return false;
        return true;
    }

    function adrDIsDirtyBaselineGap(count, base, n) {
        // v1.0.5.6.8.3.9：first-pass / startup grace 只兜“离谱脏 baseline”，不吞正常跨阈值。
        // 正常触发通常 gap == n，或最多超出少量；若超出间隔 20 条以上，才视为旧 baseline/口径迁移污染。
        if (!Number.isFinite(Number(n)) || Number(n) <= 0) return false;
        if (!Number.isFinite(Number(count)) || !Number.isFinite(Number(base))) return false;
        var gap = Number(count) - Number(base);
        if (gap < Number(n)) return false;
        return (gap - Number(n)) >= 20;
    }

    function adrDShouldAlignDirtyBaselineOnFirstPassiveCheck(type, count, base, n, reason, inStartupGrace) {
        if (!adrDIsPassiveAutoCheck(reason)) return false;
        if (!adrDIsDirtyBaselineGap(count, base, n)) return false;

        // 启动 grace 仍然可以兜脏 baseline，但不能一刀切吞正常触发。
        if (inStartupGrace) return true;

        // v1.13.2：离谱差值守卫从"每会话一次"改为常任。
        // 活人聊天不可能在两次被动检查之间凭空多出 间隔+20 楼——每条消息都会触发检查、到点即触发，
        // 差值到不了这么大。会到这么大的只有一种情况：count 口径被外部脚本/正则/隐藏楼层扳动了。
        // 旧版一次性守卫用完后，每次口径上摆都被当成正常触发，表现为"每点一下开关导演就上岗一次"。
        // API 断线期间攒下的补拍带 pending-retry 标记，放行不吞。
        if (String(reason || "").indexOf("pending-retry") >= 0) return false;
        return true;
    }

    // v1.24.0：基准线住进 adrDChatState().auto[type]。
    // 只读、不建账、不落盘——给计数显示和轮询用；没有基准线就如实返回 null。
    function adrDPeekAutoState(type) {
        try {
            var item = adrDChatState().auto[adrDTypeOf(type)];
            return item && Number.isFinite(Number(item.base)) ? item : null;
        } catch (e) {}
        return null;
    }

    // 读取并在必要时建账：只有自动触发检查这一条路会调它。
    function adrDGetAutoState(type, count) {
        type = adrDTypeOf(type);
        var mode = adrDCurrentCountMode ? adrDCurrentCountMode() : "window-v1";
        if (!adrDChatKeyReady()) {
            return { base: Number(count) || 0, updatedAt: Date.now(), mode: "pending-chat-key", pendingChatKey: true, temporary: true };
        }
        var state = adrDChatState();
        var item = state.auto[type];

        if (item) {
            var changed = false;
            // 从窗口口径迁移到全量口径时只校准一次：旧 base 很小、全量 count 很大，不校准会安装后立刻误触发。
            // 若当前 count 反而小于旧 base，说明读到了 partial 小数，绝不下拉。
            if (mode === ADR_D_FULL_COUNT_MODE && item.mode !== ADR_D_FULL_COUNT_MODE) {
                var oldBaseForMode = Number(item.base);
                var currentCountForMode = Number(count) || 0;
                var migratedBase = (oldBaseForMode > currentCountForMode) ? oldBaseForMode : currentCountForMode;
                item = { base: migratedBase, updatedAt: Date.now(), mode: ADR_D_FULL_COUNT_MODE, migratedFromMode: item.mode || "window-v1" };
                changed = true;
            }
            // 同一聊天内全量总数只增，base 高出 count 二十楼以上只能是历史遗留，贴齐重记。
            var healCount = Number(count);
            if (adrDCountReady() && Number.isFinite(healCount) && healCount >= 0 && Number(item.base) - healCount > ADR_D_BASE_OVERRUN_HEAL) {
                var healedFrom = Number(item.base);
                item = { base: healCount, updatedAt: Date.now(), mode: mode, healedFromBase: healedFrom };
                changed = true;
                try { console.warn("[Arrebol D] heal overrun baseline", { type: type, from: healedFrom, to: healCount }); } catch (eHeal) {}
            }
            if (changed) { state.auto[type] = item; adrDSaveChatState(state); }
            return item;
        }

        item = { base: Number(count) || 0, updatedAt: Date.now(), mode: mode };
        state.auto[type] = item;
        adrDSaveChatState(state);
        return item;
    }

    function adrDSetAutoBaseline(type, count) {
        if (!adrDChatKeyReady()) return false;
        var state = adrDChatState();
        state.auto[adrDTypeOf(type)] = { base: Number(count) || 0, updatedAt: Date.now(), mode: adrDCurrentCountMode ? adrDCurrentCountMode() : "window-v1" };
        return adrDSaveChatState(state);
    }

    function adrDAdvanceAutoBaseline(type, count) {
        adrDSetAutoBaseline(type, count);
    }

    async function adrDCalibrateAutoBaseline(type) {
        try {
            type = type === "plot" ? "plot" : "emotion";
            if (!adrDChatKeyReady()) {
                status(type, "聊天还在加载，稍等几秒再对表", "#d6a26a");
                adrDUpdateAutoCounters();
                return false;
            }

            var count = await adrDRefreshFullAssistantRoundCount("manual-calibrate:" + type);
            if (!adrDCountReady()) {
                status(type, "全量历史还没读完，稍等几秒再对表", "#d6a26a");
                adrDUpdateAutoCounters();
                return false;
            }

            adrDSetAutoBaseline(type, count);
            try {
                var st = settings();
                st.lastAutoTriggerChatKey = adrDChatKey();
                if (type === "plot") {
                    st.lastAutoTriggerPlotCount = count;
                    st.lastAutoTriggerPlotAt = Date.now();
                } else {
                    st.lastAutoTriggerEmotionCount = count;
                    st.lastAutoTriggerEmotionAt = Date.now();
                }
                saveNow();
                adrDPersistAutoBaselineFields(st);
            } catch (ePersist) {}

            adrDUpdateAutoCounters();
            status(type, "已校准 ✓ 基准线移至 " + count + " 楼，从零开始攒", "#9bd8a6");
            adrDToast("小红霞已校准：基准线移至当前楼层");
            return true;
        } catch (e) {
            console.error("[Arrebol D] manual auto baseline calibrate failed", e);
            try { status(type === "plot" ? "plot" : "emotion", "校准失败，请稍后再试", "#d4726a"); } catch (eStatus) {}
            return false;
        }
    }

    // v1.9.32：计数条改结构化渲染。主行说人话（已攒/还差/基准线 N 楼起），
    // 视野与口径标记降为排查小字。所有拼接内容均为内部数值与固定文案，经 esc 转义。
    function adrDCounterDetailsHTML(tech) {
        return tech ? '<details class="adr-counter-details"><summary>计数详情</summary><div class="arb-ct-tech">' + esc(tech) + '</div></details>' : '';
    }

    function adrDCounterHTML(info) {
        if (typeof info === "string") {
            return '<div class="arb-ct"><div class="arb-ct-msg">' + esc(info) + '</div></div>';
        }
        var label = esc(info.label || "");
        var tag = info.tag ? '<span class="arb-ct-tag">' + esc(info.tag) + '</span>' : '';
        if (info.state !== "ok") {
            return '<div class="arb-ct">'
                + '<div class="arb-ct-top"><span class="arb-ct-label">' + label + tag + '</span></div>'
                + '<div class="arb-ct-msg">' + esc(info.msg || "") + '</div>'
                + adrDCounterDetailsHTML(info.tech)
                + '</div>';
        }
        var n = Math.max(1, Number(info.n) || 1);
        var passed = Math.max(0, Number(info.passed) || 0);
        var pct = Math.max(0, Math.min(100, Math.round(passed / n * 100)));
        return '<div class="arb-ct">'
            + '<div class="arb-ct-top">'
            + '<span class="arb-ct-label">' + label + tag + '</span>'
            + '<span class="arb-ct-nums"><b>' + esc(passed) + '</b><i>/' + esc(info.n) + '</i></span>'
            + '</div>'
            + '<div class="arb-ct-bar" role="progressbar" aria-label="' + esc(info.label || '进度') + '" aria-valuemin="0" aria-valuemax="' + n + '" aria-valuenow="' + Math.min(n, passed) + '"><i style="width:' + pct + '%"></i></div>'
            + (info.unit === 'card'
                ? '<div class="arb-ct-line">距下张还有 <b>' + esc(info.left) + '</b> 楼</div>'
                : info.graze
                ? '<div class="arb-ct-line">放养中 · 距下次接管还有 <b>' + esc(info.left) + '</b> 楼 · 基准线 <b>' + esc(info.base) + '</b> 楼起</div>'
                : '<div class="arb-ct-line">还差 <b>' + esc(info.left) + '</b> 条触发 · 基准线 <b>' + esc(info.base) + '</b> 楼起</div>')
            + adrDCounterDetailsHTML(info.tech)
            + '</div>';
    }

    function adrDAutoCounterText(type) {
        try {
            var st = settings();
            var enabled = type === "plot" ? !!st.autoTriggerPlot : !!st.autoTriggerEmotion;
            var label = type === "plot" ? "统筹" : "情感导演";
            var count = adrDAssistantRoundCount();
            var n = autoTriggerRange(type);

            if (!adrDMasterEnabled()) {
                return { state: "off", label: label, msg: "总开关已关闭 · 一键启动后从当前进度重新计数" };
            }

            var grazing = adrDGrazeActive(type);

            if (!enabled) {
                if (grazing) return { state: "off", label: label, tag: "放养中", msg: "自动触发未开启，无换稿点可归队；点「直接分析」或「手动注入」即归队" };
                return { state: "off", label: label, msg: "自动触发未开启" };
            }

            if (!Number.isFinite(n) || n <= 0) {
                if (grazing) return { state: "off", label: label, tag: "放养中", msg: "自动触发间隔未设置，无换稿点可归队；点「直接分析」或「手动注入」即归队" };
                return { state: "off", label: label, msg: "自动触发间隔未设置" };
            }

            if (!adrDCountReady()) {
                return { state: "wait", label: label, msg: "正在读取本聊天的全量历史，暂不累积/触发…", tech: "当前读数 " + count + " · 视野 " + adrDCountSourceLabel() };
            }

            if (!adrDChatKeyReady()) {
                return { state: "wait", label: label, msg: "等待聊天标识稳定，暂不落盘/触发…", tech: "当前读数 " + count + " · 视野 " + adrDCountSourceLabel() };
            }

            if (adrDInStartupAutoGrace && adrDInStartupAutoGrace()) {
                var peek = adrDPeekAutoState(type);
                var peekBase = peek && Number.isFinite(Number(peek.base)) ? Number(peek.base) : count;
                if (!Number.isFinite(peekBase) || peekBase < 0) peekBase = count;
                // 若 count < base，多半是页面重载/楼层未加载全的 partial 小读数；显示 0，但保留 base，不下拉。
                var peekPassed = Math.max(0, count - peekBase);
                var peekLeft = Math.max(0, n - peekPassed);
                var peekMode = peek && peek.mode ? String(peek.mode) : (adrDCurrentCountMode ? adrDCurrentCountMode() : "startup-readonly");
                return { state: "ok", label: label, tag: grazing ? "放养中 · 启动保护" : "启动保护", graze: grazing, passed: peekPassed, n: n, left: peekLeft, base: peekBase, tech: "本聊天共 " + count + " 条回复 · 视野 " + adrDCountSourceLabel() + " · " + peekMode };
            }

            // v1.24.0：显示只读。建账、校准、落盘全部只在自动触发检查里做——
            // 1.19.3 那场微任务风暴就是"显示反向触发写入"闹的，这里是最后一处。
            var state = adrDPeekAutoState(type);
            if (!state) {
                return { state: "wait", label: label, tag: grazing ? "放养中" : "", msg: "等第一次检查对表（换聊天或下一条消息后自动开始计数）", tech: "本聊天共 " + count + " 条回复 · 视野 " + adrDCountSourceLabel() };
            }
            var base = Number(state.base);
            // count < base 代表当前读数不可信（聊天重载/只读到一半），只显示 0，不把 baseline 拉下来。
            var passed = Math.max(0, count - base);
            var left = Math.max(0, n - passed);
            var modeText = state && state.mode ? String(state.mode) : (adrDCurrentCountMode ? adrDCurrentCountMode() : "unknown");
            return { state: "ok", label: label, tag: grazing ? "放养中" : "", graze: grazing, passed: passed, n: n, left: left, base: base, tech: "本聊天共 " + count + " 条回复 · 视野 " + adrDCountSourceLabel() + " · " + modeText };
        } catch (e) {
            return "自动触发计数：读取失败";
        }
    }

    function adrDUpdateAutoCounters() {
        try {
            adrDSetCounterText("emotion", adrDAutoCounterText("emotion"));
            adrDSetCounterText("plot", adrDAutoCounterText("plot"));
        } catch (e) {}
        try { adrCdUpdateStatusLine(); } catch (eCd) {}
    }


    function adrDShouldSchedulePendingAutoRetry() {
        // v1.9.26：楼层尾长不变时，也要给“已到 N 但失败保拍”的待触发拍子一次退避重试机会。
        // 只读检查，不创建/下拉 baseline，不参与 dirty-gap/no-shrink 数学。
        try {
            if (!adrDMasterEnabled()) return false;
            if (adrDAutoTriggerRunning || processing) return false;
            if (!adrDCountReady() || !adrDChatKeyReady()) return false;
            if (adrDInStartupAutoGrace && adrDInStartupAutoGrace()) return false;

            var st = settings();
            var count = adrDAssistantRoundCount();
            var now = Date.now();
            var types = ["emotion", "plot"];

            for (var i = 0; i < types.length; i++) {
                var type = types[i];
                var enabled = type === "plot" ? !!st.autoTriggerPlot : !!st.autoTriggerEmotion;
                if (!enabled) continue;
                var n = autoTriggerRange(type);
                if (!Number.isFinite(n) || n <= 0) continue;
                var state = adrDPeekAutoState(type);
                if (!state || !Number.isFinite(Number(state.base))) continue;
                var base = Number(state.base);
                if (count < base) continue; // partial 小读数，绝不重试。
                if (count - base < n) continue;

                var beatKey = adrDAutoBeatKey(type, base, n);
                var retry = adrDAutoRetryByBeat[beatKey];
                if (!retry || !Number.isFinite(Number(retry.nextAt)) || now >= Number(retry.nextAt)) {
                    return true;
                }
            }
        } catch (e) {}
        return false;
    }


    function adrDPersistAutoBaselineFields(source) {
        try {
            var st = source || settings();
            var backup = {};
            try { backup = adrDLoadLocalBackup ? (adrDLoadLocalBackup() || {}) : {}; } catch (e0) { backup = {}; }

            [
                "lastAutoTriggerChatKey",
                "lastAutoTriggerEmotionCount",
                "lastAutoTriggerPlotCount",
                "lastAutoTriggerAt",
                "lastAutoTriggerEmotionAt",
                "lastAutoTriggerPlotAt"
            ].forEach(function (k) {
                if (Object.prototype.hasOwnProperty.call(st, k)) backup[k] = st[k];
            });

            adrDSaveLocalBackup(backup);
            return true;
        } catch (e) {
            try { adrDSaveLocalBackup(settings()); } catch (e2) {}
            return false;
        }
    }

    function adrDResetAutoTriggerBaseline(type, reason) {
        try {
            type = type === "plot" ? "plot" : "emotion";
            var st = settings();
            var key = adrDChatKey();
            var count = adrDAssistantRoundCount();

            st.lastAutoTriggerChatKey = key;

            // v1.19.4：开关／间隔属于单导演操作。只初始化被操作的那本账，
            // 绝不能因为情感侧第一次落账就替统筹提前开表，反之亦然。
            if (type === "plot") {
                if (!Number.isFinite(Number(st.lastAutoTriggerPlotCount)) || Number(st.lastAutoTriggerPlotCount) < 0) {
                    st.lastAutoTriggerPlotCount = count;
                    adrDAdvanceAutoBaseline("plot", count);
                }
            } else if (!Number.isFinite(Number(st.lastAutoTriggerEmotionCount)) || Number(st.lastAutoTriggerEmotionCount) < 0) {
                st.lastAutoTriggerEmotionCount = count;
                adrDAdvanceAutoBaseline("emotion", count);
            }

            saveNow();
            adrDPersistAutoBaselineFields(st);
            adrDUpdateAutoCounters();
            console.log("[Arrebol D] auto trigger baseline", type, reason, key, count);
        } catch (e) {}
    }

    /* v1.16.0 生成中的楼数得着、读不着：升旗等它写完再开工，账实相符。 */
    var adrDGenStreaming = false;
    var adrDGenStreamingSince = 0;
    function adrDMarkGenStreaming(on) {
        adrDGenStreaming = !!on;
        adrDGenStreamingSince = on ? Date.now() : 0;
        if (!on) {
            // v1.38.5：降旗那一刻先采一次样，再记结束时间——此后字数没再变，就说明楼是真落定了。
            try { adrDFloorPulse(); } catch (ePulse) {}
            adrDGenEndedAt = Date.now();
        }
    }

    // v1.38.5：旗子之外再看两样证据。旧写法 GENERATION_STARTED 升旗、3 分钟没等到结束事件就强制降旗——
    // 会思考的模型、慢中转站一楼出 5 分钟很平常，保险丝一烧，导演就拿着半楼正文开分析，
    // 稿子还往正在流式的那一楼里塞，下一个 chunk 把它冲掉。现在降旗前先看：
    // ① 酒馆的停止按钮 #mes_stop 还亮着？② 最后一个助手楼的字数最近还在长？两样都没有才算真的没在生成。
    // 另外不管旗子在不在，最后一楼字数 4 秒内还变过就等等——漏掉事件也不会抢跑。
    var ADR_D_GEN_FUSE_MS = 180000;        // 旗子超过这么久才开始核对证据
    var ADR_D_GEN_QUIET_MS = 4000;         // 最后一楼至少安静这么久才算落定
    var ADR_D_GEN_EVIDENCE_MS = 30000;     // 超过保险丝后，字数这么久没长且停止按钮没亮，才降旗
    // sig = 楼序号:字数。grewAt 只在"同一楼字数变了"时更新——换聊天、加新楼是序号变，不算生成证据。
    var adrDFloorPulseState = { sig: "", idx: -1, len: -1, changedAt: 0, grewAt: 0, sampledAt: 0 };
    var adrDGenEndedAt = 0;                // 最近一次 MESSAGE_RECEIVED / GENERATION_ENDED / STOPPED 的时间

    function adrDLastAssistantSignature() {
        try {
            var chat = ctx().chat;
            if (!chat || !chat.length) return "";
            for (var i = chat.length - 1; i >= 0; i--) {
                var m = chat[i];
                if (!m || m.is_user) continue;
                return i + ":" + String(m.mes || "").length;
            }
        } catch (e) {}
        return "";
    }

    // 采一次样：最后一个助手楼的（序号:字数）变了就记下时间。轮询、等待循环、检查进门都会采。
    function adrDFloorPulse() {
        var now = Date.now();
        var sig = adrDLastAssistantSignature();
        if (sig !== adrDFloorPulseState.sig) {
            var parts = sig.split(":");
            var idx = parts.length === 2 ? Number(parts[0]) : -1;
            var len = parts.length === 2 ? Number(parts[1]) : -1;
            if (idx >= 0 && idx === adrDFloorPulseState.idx && len !== adrDFloorPulseState.len) adrDFloorPulseState.grewAt = now;
            adrDFloorPulseState.sig = sig;
            adrDFloorPulseState.idx = idx;
            adrDFloorPulseState.len = len;
            adrDFloorPulseState.changedAt = now;
        }
        adrDFloorPulseState.sampledAt = now;
        return adrDFloorPulseState;
    }

    function adrDStopButtonVisible() {
        try {
            var d = rootDoc();
            var el = d.querySelector("#mes_stop");
            if (!el) return false;
            var w = d.defaultView || rootWin();
            var disp = (w && typeof w.getComputedStyle === "function") ? w.getComputedStyle(el).display : (el.style ? el.style.display : "");
            return disp !== "none" && disp !== "";
        } catch (e) { return false; }
    }

    // 还在生成吗？旗子 / 停止按钮 / 字数刚变过，三样有一样就算在。
    // 字数那条只在"结束事件之后字数还在变"时才算：事件齐全的正常回合，MESSAGE_RECEIVED 一到就能开工，不多等。
    function adrDGenerationLooksLive() {
        var now = Date.now();
        var pulse = adrDFloorPulse();
        var quiet = now - pulse.grewAt;   // 距上一次"同一楼字数变化"多久
        if (adrDStopButtonVisible()) return true;
        if (adrDGenStreaming) {
            if (now - adrDGenStreamingSince < ADR_D_GEN_FUSE_MS) return true;
            // 过了保险丝：有证据就续旗，没证据才降。
            if (quiet < ADR_D_GEN_EVIDENCE_MS) return true;
            try { console.warn("[Arrebol D] generation flag cleared: no end event, stop button hidden, floor quiet for " + Math.round(quiet / 1000) + "s"); } catch (eLog) {}
            adrDMarkGenStreaming(false);
            return false;
        }
        // 旗子不在：结束事件之后字数又变过、且还没安静够，说明有人在没打招呼地往楼里写（漏事件 / 别的脚本），等等。
        if (pulse.grewAt > adrDGenEndedAt && quiet < ADR_D_GEN_QUIET_MS) return true;
        return false;
    }

    try {
        rootWin().__adrDGenTest = {
            looksLive: adrDGenerationLooksLive, pulse: adrDFloorPulse, flag: function () { return adrDGenStreaming; },
            setFuseMs: function (ms) { ADR_D_GEN_FUSE_MS = Number(ms) || 180000; },
            setQuietMs: function (ms) { ADR_D_GEN_QUIET_MS = Number(ms) || 4000; },
            setEvidenceMs: function (ms) { ADR_D_GEN_EVIDENCE_MS = Number(ms) || 30000; }
        };
    } catch (eGenHook) {}

    function adrDScheduleAutoTriggerCheck(reason) {
        try {
            if (adrDAutoTriggerTimer) clearTimeout(adrDAutoTriggerTimer);
            adrDAutoTriggerTimer = setTimeout(function () {
                adrDCheckAutoTrigger(reason || "scheduled");
            }, 4200);
        } catch (e) {}
    }

    var adrDAutoTriggerAgainReason = "";

    async function adrDCheckAutoTrigger(reason) {
        if (adrDAutoTriggerRunning || processing) {
            // v1.23.2：正在跑的那一趟结束后补查一次，被挡掉的信号不丢。
            adrDAutoTriggerAgainReason = reason || "again";
            return;
        }

        // v1.38.5：正在生成（旗子 / 停止按钮 / 最后一楼字数刚变过）就等，4.2 秒后再来看。
        // 字数那条也是"安静期"：楼写完之后至少稳 4 秒才读，不抢半楼。
        if (adrDGenerationLooksLive()) {
            adrDScheduleAutoTriggerCheck("wait-generation");
            return;
        }

        // v1.23.2：旗子在进门就升。旧写法要到导演真开跑才升，前面读全量、抽卡检查、
        // 问小眼睛这几段 await 都是敞开的，两趟检查能并肩进来重复问询、重复扣费。
        adrDAutoTriggerRunning = true;
        try {
            var st = settings();
            if (!adrDMasterEnabled()) {
                adrDUpdateAutoCounters();
                return;
            }
            if (!st.autoTriggerEmotion && !st.autoTriggerPlot && !adrCdActive()) {
                adrDUpdateAutoCounters();
                return;
            }

            // v1.38.4：进门记下这把聊天。下面每个 await 回来都对一次表，换了聊天就整趟作废——
            // 旧聊天的 count / 基准线 / 拍子都不能拿去给新聊天开导演、投卡。
            var homeKey = adrDChatKeyReady() ? adrDChatKey() : "";
            var count = await adrDRefreshFullAssistantRoundCount("auto-check:" + (reason || ""));
            if (homeKey && adrDChatKey() !== homeKey) { try { console.warn("[Arrebol D] auto check abandoned: chat switched while counting"); } catch (eSw1) {} return; }
            if (!adrDCountReady()) {
                try { console.log("[Arrebol D] auto trigger waits for first full history count", reason || ""); } catch (eReadyLog) {}
                adrDUpdateAutoCounters();
                return;
            }

            if (!adrDChatKeyReady()) {
                try { console.log("[Arrebol D] auto trigger waits for stable chat key", reason || ""); } catch (eKeyLog) {}
                adrDUpdateAutoCounters();
                return;
            }

            var inStartupGrace = adrDInStartupAutoGrace();
            // v1.0.5.6.8.3.9：启动 grace 不再作为“总开关”吞掉自动触发。
            // 真正需要静默对齐的，只应是 gap 离谱的脏 baseline；正常 gap >= N 必须继续触发。

            // v1.10.0：先投卡后导演——统筹随后盘账能看见最新一张投卡。抽卡失败不影响导演。
            try { await adrCdAutoCheck(count, reason, inStartupGrace); } catch (eCd) { try { console.warn("[抽卡小能手] 自动检查失败", eCd); } catch (eCd2) {} }
            if (adrDChatKey() !== homeKey) { try { console.warn("[Arrebol D] auto check abandoned: chat switched during card check"); } catch (eSw2) {} return; }

            var nEmotion = autoTriggerRange("emotion");
            var nPlot = autoTriggerRange("plot");
            var toRun = [];

            // v1.0.5.6.8.1：自动触发判断完全改用独立 auto state。
            // 情感和剧情各有自己的 baseline，互不影响。
            if (st.autoTriggerEmotion && nEmotion > 0) {
                var emotionState = adrDGetAutoState("emotion", count);
                var emotionBase = Number(emotionState.base);
                if (!Number.isFinite(emotionBase) || emotionBase < 0) {
                    emotionBase = count;
                    adrDSetAutoBaseline("emotion", count);
                }
                // 如果 count < base，说明当前可能是 partial 小读数。保住 base，不下拉；count-base 为负，自然不会触发。

                if (adrDShouldAlignDirtyBaselineOnFirstPassiveCheck("emotion", count, emotionBase, nEmotion, reason, inStartupGrace)) {
                    // 刷新/重挂载后的首次被动检查若已越阈值，视为旧 baseline 与全量 count 不一致：只对齐，不注入。
                    adrDAdvanceAutoBaseline("emotion", count);
                    st.lastAutoTriggerEmotionCount = count;
                    st.lastAutoTriggerEmotionAt = Date.now();
                    try { console.warn("[Arrebol D] align dirty emotion baseline on first passive check", { count: count, base: emotionBase, n: nEmotion, reason: reason || "" }); } catch (eFirstEmotion) {}
                } else if (count - emotionBase >= nEmotion) {
                    // v1.9.23：不要在 run() 前推进 baseline。API/网络失败时必须保留这一拍，避免失败丢拍后再罚等 N。
                    toRun.push({ type: "emotion", n: nEmotion, count: count, beatKey: adrDAutoBeatKey("emotion", emotionBase, nEmotion) });
                }
            }

            if (st.autoTriggerPlot && nPlot > 0) {
                var plotState = adrDGetAutoState("plot", count);
                var plotBase = Number(plotState.base);
                if (!Number.isFinite(plotBase) || plotBase < 0) {
                    plotBase = count;
                    adrDSetAutoBaseline("plot", count);
                }
                // 如果 count < base，说明当前可能是 partial 小读数。保住 base，不下拉；count-base 为负，自然不会触发。

                if (adrDShouldAlignDirtyBaselineOnFirstPassiveCheck("plot", count, plotBase, nPlot, reason, inStartupGrace)) {
                    // 刷新/重挂载后的首次被动检查若已越阈值，视为旧 baseline 与全量 count 不一致：只对齐，不注入。
                    adrDAdvanceAutoBaseline("plot", count);
                    st.lastAutoTriggerPlotCount = count;
                    st.lastAutoTriggerPlotAt = Date.now();
                    try { console.warn("[Arrebol D] align dirty plot baseline on first passive check", { count: count, base: plotBase, n: nPlot, reason: reason || "" }); } catch (eFirstPlot) {}
                } else if (count - plotBase >= nPlot) {
                    // v1.9.23：不要在 run() 前推进 baseline。API/网络失败时必须保留这一拍，避免失败丢拍后再罚等 N。
                    toRun.push({ type: "plot", n: nPlot, count: count, beatKey: adrDAutoBeatKey("plot", plotBase, nPlot) });
                }
            }

            st.lastAutoTriggerChatKey = adrDChatKey();
            saveNow();
            try { adrDPersistAutoBaselineFields(st); } catch (ePersist) {}
            adrDUpdateAutoCounters();

            if (!toRun.length) return;

            // v1.14.5 补丁B：补拍静音的判定，从"是谁叫醒的"改为"这一拍真的失败过没有"。
            // 旧逻辑把轮询捡回的首次触发也当成补拍，导致导演正常跑、正常注入，却不打招呼。
            var isSilentRetry = toRun.length > 0 && toRun.every(function (itRetry) {
                var rRetry = adrDAutoRetryByBeat[itRetry && itRetry.beatKey];
                return !!(rRetry && Number(rRetry.fails) > 0);
            });
            if (!isSilentRetry && settings().showAutoTriggerPopup !== false) adrDAutoTriggerPopup(toRun, count);
            for (var i = 0; i < toRun.length; i++) {
                var item = toRun[i];
                var type = item.type;
                var n = item.n;
                var triggerCount = Number(item.count);
                if (!Number.isFinite(triggerCount) || triggerCount < 0) triggerCount = count;
                var beatKey = item.beatKey;
                var extra = "自动触发：已新增约 " + n + " 个助手正文轮次。请基于当前精准读取上下文输出下一阶段方向。";
                if (adrDChatKey() !== homeKey) { try { console.warn("[Arrebol D] auto trigger abandoned: chat switched before", type); } catch (eSw3) {} break; }
                console.log("[Arrebol D] auto triggering", type, "reason=", reason, "count=", triggerCount, "N=", n);
                var okRun = await run(type, extra, { autoTrigger: true, beatKey: beatKey });
                if (adrDChatKey() !== homeKey) { try { console.warn("[Arrebol D] auto trigger result dropped: chat switched during", type); } catch (eSw4) {} break; }
                if (okRun) {
                    var stAfter = settings();
                    adrDAdvanceAutoBaseline(type, triggerCount);
                    stAfter.lastAutoTriggerChatKey = adrDChatKey();
                    if (type === "plot") {
                        stAfter.lastAutoTriggerPlotCount = triggerCount;
                        stAfter.lastAutoTriggerPlotAt = Date.now();
                    } else {
                        stAfter.lastAutoTriggerEmotionCount = triggerCount;
                        stAfter.lastAutoTriggerEmotionAt = Date.now();
                    }
                    saveNow();
                    try { adrDPersistAutoBaselineFields(stAfter); } catch (ePersistAfter) {}
                    try { adrDUpdateAutoCounters(); } catch (eCountersAfter) {}
                        adrDNoteAutoRetryResult(beatKey, true);
                } else {
                    adrDNoteAutoRetryResult(beatKey, false);
                    try { console.warn("[Arrebol D] auto trigger run failed; baseline not advanced", { type: type, count: triggerCount, n: n, reason: reason || "" }); } catch (eWarnRun) {}
                }
            }
        } catch (e) {
            console.error("[Arrebol D] auto trigger check failed", e);
        } finally {
            adrDAutoTriggerRunning = false;
        }

        try { adrDUpdateAutoCounters(); } catch (e2) {}
        if (adrDAutoTriggerAgainReason) {
            var againReason = adrDAutoTriggerAgainReason;
            adrDAutoTriggerAgainReason = "";
            adrDScheduleAutoTriggerCheck(againReason);
        }
    }

    // v1.16.3：删楼不罚楼。no-shrink 铁律只该防 partial 小读数，不该罚真删除。
    // 真删楼有 MESSAGE_DELETED 事件背书（轮询缩水兜底旧酒馆）：count 掉多少，基准线跟着降多少，
    // 已积累进度原地保住；partial 场景没有删除事件、轮询也不会在同会话内看到缩水，铁律照旧生效。
    function adrCdShiftBaselineDown(delta, count) {
        try {
            var state = adrCdChatState();
            var base = Number(state.lastDrawAt);
            if (!Number.isFinite(base) || base < 0) return;
            var nb = Math.min(Math.max(0, base - delta), Number(count));
            if (nb === base) return;
            state.lastDrawAt = nb;
            adrCdSaveChatState(state);
            try { console.log("[抽卡小能手] 删楼位移基准线", { from: base, to: nb, delta: delta }); } catch (eL) {}
        } catch (e) {}
    }

    function adrDShiftBaselinesDown(delta, count, reason) {
        try {
            var state = adrDChatState();
            var changed = false;
            ["emotion", "plot"].forEach(function (type) {
                var item = state.auto[type];
                if (!item || !Number.isFinite(Number(item.base))) return;
                var oldBase = Number(item.base);
                var newBase = Math.min(Math.max(0, oldBase - delta), Number(count));
                if (newBase === oldBase) return;
                item.base = newBase;
                item.updatedAt = Date.now();
                item.deleteShifted = { from: oldBase, delta: delta, t: Date.now() };
                state.auto[type] = item;
                changed = true;
            });
            if (changed) {
                adrDSaveChatState(state);
                try { console.log("[Arrebol D] 删楼位移基准线，进度保住不清零", { delta: delta, count: count, reason: reason || "" }); } catch (eLog) {}
            }
        } catch (e) {}
        try { adrCdShiftBaselineDown(delta, count); } catch (eCd) {}
    }

    var adrDDeleteShiftBusy = false;
    async function adrDHandlePossibleDeletion(reason) {
        if (adrDDeleteShiftBusy) return;
        adrDDeleteShiftBusy = true;
        try {
            var keyBefore = adrDChatKey ? adrDChatKey() : "";
            var th = adrDGetTavernHelper();
            var fullCapable = !!(th && typeof th.getChatMessages === "function");
            var prevOk = adrDFullCountCache &&
                adrDFullCountCache.chatKey === keyBefore &&
                Number.isFinite(Number(adrDFullCountCache.count)) &&
                (!fullCapable || adrDFullCountCache.source === "full");
            var prev = prevOk ? Number(adrDFullCountCache.count) : NaN;

            var now = await adrDRefreshFullAssistantRoundCount("delete:" + (reason || ""));

            // 换了聊天/口径未就绪/没有可信旧读数，都不做位移，只当普通刷新。
            if (!prevOk) return;
            if ((adrDChatKey ? adrDChatKey() : "") !== keyBefore) return;
            if (fullCapable && !adrDCountReady()) return;
            if (!adrDChatKeyReady()) return;

            var delta = prev - Number(now);
            if (!Number.isFinite(delta) || delta <= 0) return;
            adrDShiftBaselinesDown(delta, Number(now), reason);
        } catch (e) {
            try { console.warn("[Arrebol D] deletion shift failed", e); } catch (e2) {}
        } finally {
            adrDDeleteShiftBusy = false;
            try { adrDUpdateAutoCounters(); } catch (eC) {}
        }
    }

    function adrDInstallAutoTriggerWatchers() {
        try {
            var c = ctx();
            var es = c.eventSource;
            var types = c.event_types || c.eventTypes || {};

            function on(name) {
                try {
                    var ev = types[name];
                    if (es && ev && typeof es.on === "function") {
                        es.on(ev, function () { adrDScheduleAutoTriggerCheck(name); });
                    }
                } catch (e) {}
            }

            ["MESSAGE_RECEIVED", "MESSAGE_SENT", "GENERATION_ENDED", "CHAT_CHANGED", "CHAT_LOADED"].forEach(on);

            // v1.34.0 剧情展开推进的回复位时序：回复落地记「用过」，用户再发言才结算翻页。
            try {
                if (es && typeof es.on === "function") {
                    if (types.MESSAGE_RECEIVED) es.on(types.MESSAGE_RECEIVED, function () { adrCdExpandOnAiMessage(); });
                    if (types.MESSAGE_SENT) es.on(types.MESSAGE_SENT, function () { adrCdExpandOnUserMessage(); });
                }
            } catch (eExpandEv) {}

            // v1.16.2：生成事件升降旗。酒馆的 dryRun（只组装提示词不真生成的试跑，如算 token）
            // 也会发 GENERATION_STARTED，且永远等不到 ENDED——必须无视，否则旗子卡死、自动触发罢工。
            // MESSAGE_RECEIVED 只在楼层完整落地后发射，作第二重降旗保险。
            if (es && typeof es.on === "function") {
                if (types.GENERATION_STARTED) es.on(types.GENERATION_STARTED, function (genType, genParams, dryRun) {
                    if (dryRun) return;
                    adrDMarkGenStreaming(true);
                });
                ["GENERATION_ENDED", "GENERATION_STOPPED", "MESSAGE_RECEIVED"].forEach(function (nmGen) {
                    if (types[nmGen]) es.on(types[nmGen], function () { adrDMarkGenStreaming(false); });
                });
            }

            // v1.9.34：NG 检测走 swipe 事件（数组长度只随新生成增长，来回翻页不误计）；
            // 换聊天时恢复该聊天自己的浮动指导。
            // v1.16.3：删楼事件直连位移路径。600ms 等酒馆存盘落定再读全量。
            if (es && typeof es.on === "function" && types.MESSAGE_DELETED) {
                es.on(types.MESSAGE_DELETED, function () {
                    setTimeout(function () { adrDHandlePossibleDeletion("event-message-deleted"); }, 600);
                });
            }

            if (es && typeof es.on === "function") {
                if (types.MESSAGE_SWIPED) {
                    es.on(types.MESSAGE_SWIPED, function () { setTimeout(function () { adrDCheckNg("event"); }, 400); });
                }
                if (types.CHAT_CHANGED) {
                    es.on(types.CHAT_CHANGED, function () {
                        try { adrDAbortRunIfChatSwitched("chat-changed"); } catch (eSw) {}
                        setTimeout(function () { adrDRestoreFloatForCurrentChat("chat-changed"); adrDRefreshToneFields(); try { adrLampOnChatChanged(); } catch (eLampCc) {} }, 900);
                    });
                }
                // v1.39.0 掌灯页：新楼落地后素材要跟上（最新一楼变了）。
                if (types.MESSAGE_RECEIVED) {
                    es.on(types.MESSAGE_RECEIVED, function () {
                        // v1.43.2 掌灯页不在眼前就不重算素材（全量角色卡 / 世界书 + 逐楼摘要），记一笔，等它露面再算
                        setTimeout(function () { try { if (adrLampInView()) adrLampRefreshAll(); else adrLampDirty = true; } catch (eLampMr) {} }, 700);
                        try { adrLampAutoQuipOnMessage(); } catch (eLampQuip) {}   // v1.41.0 自动蛐蛐（开关默认关）
                        try { adrTheaterOnMessage(); } catch (eTheater) {}          // v1.43.0 红霞剧场（开关默认关）
                    });
                }
            }
        } catch (e) {}

        try { setTimeout(function () { adrDRestoreFloatForCurrentChat("startup"); }, 2600); } catch (eF34s) {}

        try {
            if (!rootWin().__arrebolDAutoTriggerPoll) {
                rootWin().__arrebolDAutoTriggerPoll = setInterval(function () {
                    try {
                        // v1.9.31：轮询同时盯 chatKey。楼层数碰巧相同的两个聊天也要触发换聊刷新。
                        var keyPoll = adrDChatKey ? adrDChatKey() : "";
                        var keyChangedThisTick = rootWin().__arrebolDLastChatKeySeen !== keyPoll;
                        if (keyChangedThisTick) {
                            rootWin().__arrebolDLastChatKeySeen = keyPoll;
                            adrDQueueFullAssistantRoundCountRefresh("poll-chat-key-change");
                            adrDScheduleAutoTriggerCheck("poll-chat-key-change");
                            adrDRestoreFloatForCurrentChat("poll-chat-key-change");
                        }
                        try { adrDFloorPulse(); } catch (ePulse) {}   // v1.38.5：顺手采一次最后一楼的字数
                        var len = adrDCurrentMessageTailForPoll();
                        if (adrDLastChatLengthSeen >= 0 && len !== adrDLastChatLengthSeen) {
                            // v1.16.3：同聊天内活会话看到楼数缩水，只可能是真删除
                            //（partial 小读数只发生在重载后，lastSeen 会先归 -1）——走位移路径保进度。
                            if (!keyChangedThisTick && len < adrDLastChatLengthSeen) {
                                adrDHandlePossibleDeletion("poll-shrink");
                            } else {
                                adrDQueueFullAssistantRoundCountRefresh("poll-tail-change");
                            }
                            adrDScheduleAutoTriggerCheck("poll-chat-length");
                        } else if (adrDShouldSchedulePendingAutoRetry()) {
                            adrDQueueFullAssistantRoundCountRefresh("poll-pending-retry");
                            adrDScheduleAutoTriggerCheck("pending-retry");
                        }
                        adrDLastChatLengthSeen = len;
                        adrDUpdateAutoCounters();
                        adrDCheckNg("poll");
                    } catch (e) {}
                }, 9000);
            }
        } catch (e2) {}

        // v1.0.5.6.8.1：页面刷新/插件重新挂载时不主动重置自动触发基线。
        // 基线只在开关/间隔改变或真正切换聊天时重置。
        setTimeout(adrDUpdateAutoCounters, 1200);
    }


    function adrDInstallTabFallbackOnly() {
        try {
            if (rootWin().__adrDTabFallbackOnlyInstalled) return;
            rootWin().__adrDTabFallbackOnlyInstalled = true;

            function findTabTarget(ev) {
                try {
                    var t = ev.target;
                    while (t && t !== rootDoc()) {
                        if (t.id === "adr044-tab-emotion" || t.id === "adr044-tab-plot") return t;
                        t = t.parentNode;
                    }
                } catch (e) {}
                return null;
            }

            function markStart(ev) {
                var hit = findTabTarget(ev);
                if (hit) adrDMarkButtonTouchStart(hit, ev);
            }

            function markMove(ev) {
                var hit = findTabTarget(ev);
                if (hit) adrDMarkButtonTouchMove(hit, ev);
            }

            function handle(ev) {
                try {
                    var hit = findTabTarget(ev);
                    if (!hit) return;
                    if (adrDShouldIgnoreButtonTap(hit, ev)) return;
                    ev.preventDefault();
                    ev.stopPropagation();
                    switchTab(hit.id === "adr044-tab-plot" ? "plot" : "emotion");
                    return false;
                } catch (e) {}
            }

            rootDoc().addEventListener("touchstart", markStart, true);
            rootDoc().addEventListener("touchmove", markMove, true);
            rootDoc().addEventListener("click", handle, true);
            rootDoc().addEventListener("touchend", handle, true);
        } catch (e2) {
            console.warn("[Arrebol D] install tab fallback failed", e2);
        }
    }


    function adrDTypeFromButtonId(id) {
        // v1.10.0：activeTab 可能是 "cd"，导演类型分发只认 emotion/plot。
        var fallback = settings().activeTab === "plot" ? "plot" : "emotion";
        if (!id) return fallback;
        if (id.indexOf("adr044-plot-") === 0 || id.indexOf("-plot") >= 0) return "plot";
        if (id.indexOf("adr044-emotion-") === 0 || id.indexOf("-emotion") >= 0) return "emotion";
        return fallback;
    }

    function adrDHandleAnyButtonId(id, btn) {
        try {
            if (!id || id.indexOf("adr044-") !== 0) return false;

            // tab 已由 tab fallback 处理，这里也兜底一次。
            if (id === "adr044-tab-emotion") {
                switchTab("emotion");
                return true;
            }
            if (id === "adr044-tab-plot") {
                switchTab("plot");
                return true;
            }

            // v1.10.0：抽卡小能手按钮全部注册进兜底表（v1.9.27 血案判例：不注册会被 450ms 防抖吞掉）。
            if (id === "adr044-tab-cd" || id.indexOf("adr044-cd-") === 0) {
                if (adrCdHandleButtonId(id, btn)) return true;
            }
            // v1.39.0：掌灯页按钮进兜底表，否则被 450ms 防抖吞掉。
            if (id === "adr044-tab-lamp" || id.indexOf("adr044-lamp-") === 0 || id.indexOf("adr044-pen-") === 0) {
                if (adrLampHandleButtonId(id, btn)) return true;
            }
            if (id === "adr044-tab-theater" || id.indexOf("adr044-theater-") === 0 || id.indexOf("adr044-stage-") === 0) {
                if (adrTheaterHandleButtonId(id, btn)) return true;
            }
            // v1.46.0 小红霞三个位（聊天 / 执笔 / 剧场）的 API 预设「保存」「删除」：id 不以 lamp- / pen- / stage- 开头，上面两条路由接不到，单独进兜底表
            if (adrHxApiHandleButtonId(id, btn)) return true;
            if (id === "adr044-api-profile-save-cd") { adrDSaveCurrentApiProfile("cd"); return true; }
            if (id === "adr044-api-profile-delete-cd") { adrDRequestDeleteCurrentApiProfile("cd"); return true; }
            if (id === "adr044-expand-load-models") { loadModels("expand"); return true; }
            if (id === "adr044-expand-test") { adrCdExpandTestConnection(); return true; }
            if (id === "adr044-expand-preset-reset") { adrCdSetValueSafe("adr044-expand-preset", ""); save("expandPreset", ""); saveNow(); status("expand", "已恢复出厂提示词 ✓", "#8ed99d"); return true; }
            if (id === "adr044-tone-save") { adrDSaveToneFromFields(); return true; }
            if (id === "adr044-tone-delete") { adrDDeleteToneFromFields(); return true; }
            if (id === "adr044-tone-clear") { adrDClearChatTone(); return true; }

            if (id === "adr044-probe-context") {
                runContextProbe();
                return true;
            }
            if (id === "adr044-probe-content") {
                runContentProbe();
                return true;
            }
            if (id === "adr044-preview-precise") {
                runPrecisePreview();
                return true;
            }

            // v1.9.28：总开关。必须注册在兜底表里，否则重蹈模板按钮被防抖吞掉的覆辙。
            if (id === "adr044-master-toggle") {
                adrDToggleMaster();
                return true;
            }

            var type = adrDTypeFromButtonId(id);

            if (id === "adr044-" + type + "-local") {
                localTest(type);
                return true;
            }

            if (id === "adr044-" + type + "-generate") {
                adrDRequestDirectAnalysis(type, btn);
                return true;
            }

            if (id === "adr044-" + type + "-reroll") {
                adrDRequestExtraAnalysis(type, btn);
                return true;
            }

            if (id === "adr044-" + type + "-stop") {
                abortRun(type);
                return true;
            }

            if (id === "adr044-" + type + "-copy") {
                copyText(type);
                return true;
            }

            if (id === "adr044-" + type + "-load-models") {
                syncType(type);
                loadModels(type);
                return true;
            }

            if (id === "adr044-" + type + "-save") {
                adrDForceSaveSettings(type);
                status(type, "当前使用已保存 ✓", "#8ed99d");
                return true;
            }

            if (id === "adr044-api-profile-save-" + type) {
                adrDSaveCurrentApiProfile(type);
                return true;
            }


            if (id === "adr044-api-profile-delete-" + type) {
                adrDRequestDeleteCurrentApiProfile(type);
                return true;
            }

            if (id === "adr044-" + type + "-calibrate-auto") {
                adrDRequestCalibrateAutoBaseline(type);
                return true;
            }

            if (id === "adr044-" + type + "-inject") {
                adrDRequestManualInject(type, btn);
                return true;
            }

            // v1.13.0：放养按钮同样必须进兜底表，否则被 450ms 防抖吞掉。
            if (id === "adr044-" + type + "-graze") {
                adrDRequestGraze(type, btn);
                return true;
            }

            // v1.9.27：模板按钮补进兜底表。此前兜底先盖防抖时间戳、又不认识这两个 id，
            // 元素自身监听器随后被 450ms 防抖吞掉，导致按钮永久失灵。
            if (id === "adr044-template-save-" + type) {
                adrDSaveCurrentTemplate(type);
                return true;
            }

            if (id === "adr044-template-delete-" + type) {
                adrDRequestDeleteCurrentTemplate(type, btn);
                return true;
            }
        } catch (e) {
            console.error("[Arrebol D] all-button fallback failed", e);
            try {
                var t2 = id && id.indexOf("plot") >= 0 ? "plot" : "emotion";
                status(t2, "按钮执行失败：" + (e.message || e), "#d4726a");
            } catch (e2) {}
            return true;
        }

        return false;
    }

    function adrDInstallAllButtonFallback() {
        try {
            if (rootWin().__adrDAllButtonFallbackInstalled) return;
            rootWin().__adrDAllButtonFallbackInstalled = true;

            function findButtonTarget(ev) {
                try {
                    var t = ev.target;
                    while (t && t !== rootDoc()) {
                        if (t.id && t.id.indexOf("adr044-") === 0) {
                            var tag = String(t.tagName || "").toLowerCase();
                            // 输入框/选择框不拦截，否则会影响输入。
                            if (tag === "input" || tag === "textarea" || tag === "select" || tag === "option") return null;
                            return t;
                        }
                        t = t.parentNode;
                    }
                } catch (e) {}
                return null;
            }

            function markStart(ev) {
                var hit = findButtonTarget(ev);
                if (hit) adrDMarkButtonTouchStart(hit, ev);
            }

            function markMove(ev) {
                var hit = findButtonTarget(ev);
                if (hit) adrDMarkButtonTouchMove(hit, ev);
            }

            function handle(ev) {
                try {
                    var hit = findButtonTarget(ev);
                    if (!hit) return;
                    if (adrDShouldIgnoreButtonTap(hit, ev)) return;
                    var ok = adrDHandleAnyButtonId(hit.id, hit);
                    if (ok) {
                        ev.preventDefault();
                        ev.stopPropagation();
                        return false;
                    }
                } catch (e) {
                    console.warn("[Arrebol D] all-button fallback listener failed", e);
                }
            }

            rootDoc().addEventListener("touchstart", markStart, true);
            rootDoc().addEventListener("touchmove", markMove, true);
            rootDoc().addEventListener("click", handle, true);
            rootDoc().addEventListener("touchend", handle, true);
        } catch (e2) {
            console.warn("[Arrebol D] install all-button fallback failed", e2);
        }
    }

    // v1.14.5 补丁C：抽屉与浮窗共用同一套 id，两份表单会各自漂移。
    // 作者已在 adrDRefreshAllFieldsFromSettings 里用 adrDSetAllById 一次写全部同名节点；
    // 这里只是让同一件事实时发生：谁被改了，就把同名的另一份也拨成一样。
    // 纯 UI 镜像——不读设置、不写设置、不发请求、不碰用户正在操作的那个节点。
    function adrDInstallTwinMirror() {
        try {
            var d = rootDoc();
            if (!d || d.__adrDTwinMirrorInstalled) return;
            d.__adrDTwinMirrorInstalled = true;

            d.addEventListener("change", function (evTwin) {
                try {
                    var el = evTwin && evTwin.target;
                    if (!el || !el.id || el.id.indexOf("adr044-") !== 0) return;

                    var nodes = d.querySelectorAll("#" + el.id);
                    if (!nodes || nodes.length < 2) return;

                    Array.prototype.forEach.call(nodes, function (n) {
                        if (!n || n === el) return;
                        if (n.type === "checkbox" || n.type === "radio") {
                            if (n.checked !== el.checked) n.checked = el.checked;
                            return;
                        }
                        if (typeof n.value !== "string" || n.value === el.value) return;
                        // 下拉框可能两边选项不同步：设不上就原样退回，绝不把对面清空。
                        var oldVal = n.value;
                        n.value = el.value;
                        if (n.value !== el.value) n.value = oldVal;
                    });
                } catch (eTwinInner) {}
            }, true);
        } catch (eTwin) {}
    }

    function init() {
        if (initialized) return;
        initialized = true;

        try {
            settings();
            adrDInstallTwinMirror();
            mountDrawer();
            installProbeGlobals();
            installProbeDelegation();
            bindDirect();
            adrDBindCompactTemplateControls();
            adrDBindApiProfileControls();
            adrDInstallTabFallbackOnly();
            adrDInstallAllButtonFallback();
            switchTab(settings().activeTab || "emotion");
            adr048CreatePopupPanel();
            setTimeout(adrDBindCompactTemplateControls, 120);
            setTimeout(adrDBindApiProfileControls, 120);
            adr048EnsureFabLater();
            adrxInstallDrawerMemory();
            adrDInstallAutoTriggerWatchers();
            adrDQueueFullAssistantRoundCountRefresh("init");
            adrDUpdateAutoCounters();
            setTimeout(adrDUpdateAutoCounters, 800);
            setTimeout(bindDirect, 500);
            setTimeout(adrDBindCompactTemplateControls, 650);
            setTimeout(adrDBindApiProfileControls, 650);
            setTimeout(bindDirect, 1500);
            setTimeout(bindDirect, 3000);
            console.log("[ADR044] dual drawer loaded");
        } catch (e) {
            console.error("[ADR044] init failed", e);
        }
    }

    function wait() {
        if (typeof SillyTavern === "undefined" || !SillyTavern.getContext) {
            setTimeout(wait, 300);
            return;
        }

        try {
            var c = SillyTavern.getContext();
            if (c.eventSource && c.event_types && c.event_types.APP_READY) {
                c.eventSource.on(c.event_types.APP_READY, function () {
                    setTimeout(init, 100);
                });
            }
            setTimeout(init, 1800);
        } catch (e) {
            setTimeout(init, 1200);
        }
    }

    wait();
})();
