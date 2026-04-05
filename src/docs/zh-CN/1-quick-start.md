# 快速上手

使用方式：

- 包管理器
- CDN

## 包管理器

### 安装

```bash
npm install @antv/g2
yarn add @antv/g2
pnpm add @antv/g2
```

### 使用

```html
<div id="container"></div>
```

```ts
import { Chart } from '@antv/g2';

// 准备数据
const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

// 初始化图表实例
const chart = new Chart({
  container: 'container',
});

// 声明可视化
chart
  .interval() // 创建一个 Interval 标记
  .data(data) // 绑定数据
  .encode('x', 'genre') // 编码 x 通道
  .encode('y', 'sold'); // 编码 y 通道

// 渲染可视化
chart.render();
```

## CDN

```html
<script src="https://unpkg.com/@antv/g2/dist/g2.min.js"></script>
<script>
  // 准备数据
  const data = [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ];

  // 初始化图表实例
  const chart = new G2.Chart({
    container: 'container',
  });

  // 声明可视化
  chart
    .interval() // 创建一个 Interval 标记
    .data(data) // 绑定数据
    .encode('x', 'genre') // 编码 x 通道
    .encode('y', 'sold'); // 编码 y 通道

  // 渲染可视化
  chart.render();
</script>
```

## 前端框架中使用

- 在`React`中使用`G2`
  > G2 提供了在 React 中使用的完整指南，包括组件封装、数据绑定、状态管理等最佳实践和示例代码
- 在`VUE`中使用`G2`
  > G2 提供了在 Vue2、Vue3 中使用的方法指南，支持选项式 API 和组合式 API，附带完整的示例代码参考

## 上手开发

### 基础知识

- `G2`配置项总览
  > 详细展示 G2 的完整配置体系，涵盖图表初始化配置、API 链式调用、options 方法配置等所有可用的配置选项和层级关系
- `G2`图表组成
  > 为了更好地使用 G2 进行数据可视化，我们需要了解 G2 图表的组成以及相关概念，以及图表布局的知识
- 图表生命周期
  > Chart 对象的基础使用和生命周期管理，包括创建图表实例、配置全局选项、挂载图表、渲染图表、更新图表以及图表的清空和销毁
- 图表`API`
  > 完整的 API 参考文档，轻松完成创建可视化、渲染图表、获取实例、触发事件等操作，还可以通过链式调用 API 来配置图表

### 绘制图形

- 图形标记（Mark）
  > G2 绘图的基础单元，包括点、线、面、文字等 30+ 种标记类型，任何图表都可以由一个或多个标记组合而成
- 数据配置和数据转换（Data）
  > 支持内联数组、远程 URL、JSON/CSV 格式便捷配置数据源，并且支持 filter、join、kde等多种数据转换，在绘图前轻松进行数据预处理
- 编码映射（Encode）
  > 将数据属性映射到视觉通道（位置、颜色、大小、形状等），是连接数据和图形的关键桥梁
- 视图（View）
  > 图表的核心组成单元，用于承载和组织多个标记，统一管理数据、坐标系、交互、样式等配置
- 比例尺（Scale）
  > 将抽象数据映射为视觉数据的桥梁，提供线性、对数、时间等多种类型，决定数据如何被可视化呈现
- 标记转换（Transform）
  > 和数据预处理不同，标记转换提供绘制中转换，包括堆叠、筛选、聚合、排序、分组、扰动等多种变换方式，支持复杂的数据分析和图形优化

### 图表配置组件

- 坐标轴（Axis）

  ![坐标轴|width=600|height=300](https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*NlP_QJ0Ux0EAAAAATIAAAAgAemJ7AQ/original)

  > 图表的尺子，建立数据与视觉位置的映射关系，通过刻度、刻度值标签、网格线等元素帮助用户把数据数字和图表位置对应起来，可以通过配置格式化刻度值，调整刻度值标签位置等

- 图例（Legend）

  ![图例|width=600|height=300](https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*ZYtvSoUX-q4AAAAARFAAAAgAemJ7AQ/original)

  > 图表的辅助元素，使用颜色、大小、形状区分不同数据类型，是非空间通道（color、opacity、size、shape）对应比例尺的可视化，支持数据筛选和交互

- 标题（Title）

  ![图例|width=600|height=300](https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*pSo8Q5pctIcAAAAAQ1AAAAgAemJ7AQ/original)

  > 指定图表的标题内容，一句话展示图表概要信息，由主标题和副标题两部分组成，可通过调整文本样式进行定制，默认无标题

- 滚动条（Scrollbar）

  ![滚动条|width=600|height=300](https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*5fKuRbs5510AAAAAQOAAAAgAemJ7AQ/original)

  > 解决图表信息过于密集无法完全展示的问题，当内容超出显示区域时使用，可与 x 或 y 通道绑定，控制显示的部分内容，默认关闭

- 缩略轴（Slider）

  ![缩略轴|width=600|height=300](https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Q3EASpc7jmwAAAAAQ0AAAAgAemJ7AQ/original)

  > 辅助看数据的组件，将大量数据浓缩到一个轴上，既可宏观看数据全貌又可微观看片段，支持拖拽观察数据在一定区间内的演变，适用于大数据量场景

- 提示信息（Tooltip）

  ![提示信息|width=600|height=300](https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*K5iUTrYme5QAAAAAQpAAAAgAemJ7AQ/original)

  > 图表交互的核心组件之一，动态展示数据点详细信息（数值、百分比等），支持鼠标悬停、点击、触摸等多种触发方式，增强图表的交互性和可读性

- 数据标签（Label）

  ![数据标签|width=600|height=300](https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Xp_XSoMgOFIAAAAAanAAAAgAemJ7AQ/original)

  > 给图表添加标注的手段，包含数据点、连接线、文本数值等元素，通过简洁文字说明减少误解，强调关键数据或趋势，引导用户关注重要信息

### 布局交互

- 坐标系（Coordinate）

  > 管理空间位置映射，支持直角坐标、极坐标、3D 坐标等多种类型，实现不同的可视化布局

- 交互（Interaction）

  > 提供 20+ 种交互方式，包括悬停提示、刷选高亮、缩放平移等，增强数据探索体验

- 复合视图（Composition）

  > 支持分面、重复、图层等多种组合方式，轻松构建仪表盘、小倍数等复杂布局

### 样式美化

- 样式（Style）

  > 精细控制标记和视图的视觉样式，支持填充色、描边、透明度、字体等丰富的样式属性

- 颜色映射（Color）

  > 提供多种颜色编码方式和内置色板，支持分类颜色、连续颜色、自定义色板等多种配色方案

- 主题（Theme）

  > 内置 Classic、Academy 等多种主题风格，支持主题定制和扩展，快速统一图表视觉风格

### 高级特性

- 状态管理（State）

  > 为图表元素配置 hover、select 等不同状态下的样式，实现丰富的交互反馈效果

- 事件处理（Event）

  > 监听图表生命周期和用户交互事件，获取点击数据、渲染状态等信息，实现自定义交互逻辑

- 动画（Animate）

  > 内置 fadeIn、scaleIn、morphing 等多种动画类型，支持入场、更新、退场动画的精细控制
