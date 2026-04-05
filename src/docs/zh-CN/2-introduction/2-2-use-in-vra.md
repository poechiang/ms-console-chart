# 在前端架构（VUE+REACT+ANGULAR）中使用

实现效果：

![alt text](image008.png)

通用逻辑：

```ts
// 渲染条形图
const renderBarChart = (container: HTMLElement) => {
  const chart = new Chart({
    container,
  });

  // 准备数据
  const data = [ ... ];

  // 声明可视化
  chart
    .interval() // 创建一个 Interval 标记
    .data(data) // 绑定数据
    .encode('x', 'genre') // 编码 x 通道
    .encode('y', 'sold') // 编码 y 通道
    .encode('key', 'genre') // 指定 key
    .animate('update', { duration: 300 }); // 指定更新动画的时间

  // 渲染可视化
  chart.render();

  return chart;
}

// 更新条形图的数据
const updateBarChart = (chart) => {
  // 获得 Interval Mark
  const interval = chart.getNodesByType('interval')[0];

  // 模拟并且更新 Interval 的数据
  const newData = interval.data().map((d) => ({
    ...d,
    sold: Math.random() * 400 + 100,
  }));

  interval.data(newData);

  // 重新渲染
  chart.render();
}
```

> 框架中，new Chart不推荐使用id，直接使用Html元素实例，避免在生成id时的时间延迟。

## Vue

### 选项式API

```vue
<!-- components/G2Demo.vue -->
<template>
  <div>
    <div ref="container"></div>
    <button @click="onClick">Update Data</button>
  </div>
</template>

<script>
import { Chart } from '@antv/g2';
import { renderBarChart, updateBarChart } from './common/utils';

export default {
  name: 'G2Demo',
  props: {},
  mounted() {
    this.chart = renderBarChart(this.$refs.container);
  },
  unmounted() {
    this.chart.destroy();
  },
  methods: {
    onClick() {
      updateBarChart(this.chart);
    },
  },
};
</script>
```

### 组合式API

```vue
<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { Chart } from '@antv/g2';
import { renderBarChart, updateBarChart } from './common/utils';

let chart;
const container = ref(null);

onMounted(() => {
  chart = renderBarChart(container.value);
});

onUnmounted(() => {
  chart.destroy();
  chart = null;
});
</script>
<template>
  <div>
    <div ref="container"></div>
    <button @click="() => updateBarChart(chart)">Update Data</button>
  </div>
</template>
```

### 组件使用

```vue
<!-- App.vue -->
<template>
  <div id="app">
    <G2Demo />
  </div>
</template>

<script>
import G2Demo from './components/G2Demo';

export default {
  name: 'App',
  components: {
    G2Demo,
  },
};
</script>
```

## React

```tsx
import { Chart } from '@antv/g2';
import { useEffect, useRef } from 'react';
import { renderBarChart, updateBarChart } from './common/utils';

export default function G2Demo() {
  const container = useRef(null);
  const chart = useRef(null);

  useEffect(() => {
    if (!chart.current) {
      chart.current = renderBarChart(container.current);
    }

    return () => {
      chart.current.destroy();
      chart.current = null;
    };
  }, []);

  return (
    <div className="App">
      <div ref={container}></div>
      <button onClick={() => updateBarChart(chart.current)}>Update Data</button>
    </div>
  );
}
```

## Angular

等待补充
