# Spec和API

G2 5.0 同时提供了一套全集式的Functional API 和 Spec API来声明图表：

```ts
// functional
import { Chart } from '@antv/g2';

// 初始化图表实例

const chart = new Chart({
  container: 'container',
});

// 声明可视化
chart
  .interval() // 创建一个 Interval 标记
  .data([
    // 绑定数据
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ])
  .encode('x', 'genre') // 编码 x 通道
  .encode('y', 'sold'); // 编码 y 通道

// 渲染可视化
chart.render();
```

```ts
// spec
import { Chart } from '@antv/g2';

// 初始化图表实例

const chart = new Chart({
  container: 'container',
});

// 声明可视化
chart.options({
  type: 'interval', // 创建一个 Interval 标记
  data: [
    // 绑定数据
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ],
  encode: {
    x: 'genre', // 编码 x 通道
    y: 'sold', // 编码 y 通道
  },
});

// 渲染可视化
chart.render();
```

## 比较

- 能力等价：Functional API是基于Spec API，通过一系列方法生成options来实现的，不论哪种API，最后G2最后都直接渲染当前的options
- 风格区别：
- Spec更易用
- Functional更灵活

## 视图树

G2 Spec 视图树由不同节点构成，各节点通过node.type指定类型，不同类型有不同作用：

```ts
({
  type: 'spaceFlex',
  children: [
    {
      type: 'view',
      children: [{ type: 'line' }, { type: 'point' }],
    },
    {
      type: 'interval',
    },
  ],
});
```

- 视图即单视图图表（Single View Plot），视图树通过不同的窗口节点{type:'view'}在时间和空间上的管理，绘制多视图图表（Multiple View Plots）。
- API 通过parent.child()给指定的parent添加对应的child声明层次关系，上面层次关系用API声明如下

```ts
const spaceFlex = chart.spaceFlex();
const view = spaceFlex.view();
view.line();
view.point();
spaceFlex.interval();
```

三种节点：

- 标记节点
- 视图节点
- 复合节点

视图树上的叶子节点，不能继续嵌套，interval、line、point

## 视图节点

组织标记节点，如一个图表中有多种标记，需要将对应标记节点放入视图节点中绘制单视图图标。视图节点只能包含标记节点。

## 复合节点

绘制多视图图表，可以嵌套复合节点，视图节点和标记节点

## 应用场景

- 智能可视化：可基于Spec进行失散和纠错
- 上层封装：转换Spec对应的Options会比直接调用更容易
- 低代码搭建：可基于Spec直接生成配置面板，搭建一个BI工具
- 图表运算：Spec可看作一种数据结构，进而做一系列去处，比如图片相加等
- 服务端渲染：可以直接把Spec对应的Options渲染成图片

## 案例

### 饼图

![饼图|class=h-center|height=300](image008.png)

```ts
import { Chart } from '@antv/g2';

// 初始化图表实例

const chart = new Chart({
  container: 'container',
});

// 声明可视化
chart.options({
  type: 'interval',
  height: 640,
  data: {
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/bmw-prod/79fd9317-d2af-4bc4-90fa-9d07357398fd.csv',
  },
  transform: [{ type: 'stackY' }],
  coordinate: { type: 'theta' },
  scale: {
    color: { palette: 'spectral', offset: (t) => t * 0.8 + 0.1 },
  },
  legend: false,
  encode: { y: 'value', color: 'name' },
  style: { stroke: 'white' },
  labels: [
    {
      text: 'name',
      radius: 0.8,
      style: { fontSize: 10, fontWeight: 'bold' },
    },
    {
      text: (d, i, data) => (i < data.length - 3 ? d.value : ''),
      radius: 0.8,
      style: { fontSize: 9, dy: 12 },
    },
  ],
  animate: { enter: { type: 'waveIn', duration: 1000 } },
});

// 渲染可视化
chart.render();
```

### 空间复合

![空间复合|class=h-center|height=300](image009.png)

```ts
import { Chart } from '@antv/g2';

// 初始化图表实例

const chart = new Chart({
  container: 'container',
});

// 声明可视化
chart.options({
  type: 'spaceFlex',
  width: 900,
  data: {
    type: 'fetch',
    value: 'https://assets.antv.antgroup.com/g2/seattle-weather.json',
  },
  direction: 'col',
  ratio: [1, 2],
  children: [
    {
      type: 'interval',
      paddingBottom: 0,
      paddingRight: 300,
      transform: [{ type: 'groupX', y: 'max' }],
      axis: { x: false },
      encode: {
        x: (d) => new Date(d.date).getUTCDate(),
        y: 'temp_max',
        color: 'steelblue',
      },
    },
    {
      type: 'spaceFlex',
      ratio: [2, 1],
      children: [
        {
          type: 'cell',
          paddingRight: 0,
          paddingBottom: 50,
          transform: [{ type: 'group', color: 'max' }],
          encode: {
            x: (d) => new Date(d.date).getUTCDate(),
            y: (d) => new Date(d.date).getUTCMonth(),
            color: 'temp_max',
          },
          style: { inset: 0.5 },
          axis: {
            x: { title: 'Date' },
            y: { title: 'Month' },
          },
          scale: { color: { palette: 'gnBu' } },
          legend: false,
        },
        {
          type: 'interval',
          paddingBottom: 50,
          transform: [{ type: 'groupX', y: 'max' }],
          coordinate: { transform: [{ type: 'transpose' }] },
          axis: { x: false },
          encode: {
            x: (d) => new Date(d.date).getUTCMonth(),
            y: 'temp_max',
            color: 'steelblue',
          },
        },
      ],
    },
  ],
});

// 渲染可视化
chart.render();
```
