# 什么是G2

G2 是一个简洁的渐进式语法，主要用于制作基于网页的可视化。它提供了一套函数风格式、声明形式的 API 和组件化的编程范式，希望能帮助用户能快速完成报表搭建、数据探索、可视化叙事等多样化的需求。

- 标记（Mark）：数据驱动的图形
- 转换（Transform）：派生数据
- 比例尺（Scale）：将抽象的数据映射为视觉数据
- 坐标系（Coordinate）：对空间通道应用点变换
- 视图复合（Composition）：管理和增强视图
- 动画（Animation）：数据驱动的动画和连续的形变动画
- 交互（Interaction）：操作视图展现详细信息

## 标记（Mark）

最小视觉单元，所有图表都由不同标记构成
![标记（Mark）|class=h-center|height=300](image001.png)

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart
  .point()
  .data({
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
  })
  .encode('x', 'weight')
  .encode('y', 'height')
  .encode('color', 'gender');

chart.render();
```

## 转换（Transform）

改变数据和标记的展现形式，用于数据分析

![转换（Transform）|class=h-center|height=300](image002.png)

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart
  .rect()
  .data({
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
  })
  .encode('x', 'height')
  .encode('color', 'gender')
  .transform({ type: 'binX', y: 'count' })
  .transform({ type: 'stackY' })
  .style('insetLeft', 1);

chart.render();
```

## 比例尺（Scale）

比例尺用于控制标记的视觉样式。

![比例尺（Scale）|class=h-center|height=300](image003.png)

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart
  .rect()
  .data({
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
  })
  .encode('x', 'height')
  .encode('color', 'gender')
  .transform({ type: 'binX', y: 'count' })
  .transform({ type: 'stackY' })
  .scale('color', { range: ['steelblue', 'orange'] })
  .scale('y', { nice: true })
  .style('insetLeft', 1);

chart.render();
```

## 坐标系（Coordinate）

坐标系会改变图表的展示形式。

![坐标系（Coordinate）|class=h-center|height=200](image004.png)

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart
  .rect()
  .data({
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
  })
  .encode('x', 'height')
  .encode('color', 'gender')
  .transform({ type: 'binX', y: 'count' })
  .transform({ type: 'stackY' })
  .scale('color', { range: ['steelblue', 'orange'] })
  .scale('y', { type: 'sqrt', nice: true })
  .coordinate({ type: 'polar' })
  .axis('y', { title: false })
  .style('insetLeft', 1);

chart.render();
```

## 视图复合（Composition）

视图复合用于制作多视图图表。

![视图复合（Composition）|class=h-center|height=300](image005.png)

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
  paddingLeft: 60,
});

const facet = chart
  .facetRect()
  .data({
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
  })
  .encode('y', 'gender');

facet
  .rect()
  .encode('x', 'height')
  .encode('color', 'gender')
  .transform({ type: 'binX', y: 'count' })
  .transform({ type: 'stackY' })
  .scale('y', { nice: true })
  .attr('frame', false)
  .style('insetLeft', 1);

chart.render();
```

## 动画（Animation）

动画支持分组动画和关键帧动画。

![动画（Animation）|class=h-center|height=300](image006.png)

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart
  .rect()
  .data({
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
  })
  .encode('x', 'height')
  .encode('color', 'gender')
  .encode('enterDuration', 1000)
  .transform({ type: 'stackEnter', groupBy: ['color'] })
  .transform({ type: 'binX', y: 'count' })
  .transform({ type: 'stackY' })
  .style('insetLeft', 1);

chart.render();
```

## 交互（Interaction）

交互可以按需探索数据。

![交互（Interaction）|class=h-center|height=300](image007.png)

```ts
import { Chart } from '@antv/g2';

const chart = new Chart({
  container: 'container',
});

chart
  .point()
  .data({
    type: 'fetch',
    value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/scatter.json',
  })
  .encode('x', 'weight')
  .encode('y', 'height')
  .encode('color', 'gender')
  .encode('shape', 'point')
  .style({
    fillOpacity: 0.7,
    transform: 'scale(1, 1)',
    transformOrigin: 'center center',
  })
  .state('inactive', {
    fill: 'black',
    fillOpacity: 0.5,
    transform: 'scale(0.5, 0.5)',
  })
  .interaction('brushXHighlight', true);

chart.render();
```
