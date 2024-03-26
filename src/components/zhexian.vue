<template>
  <div>
    <div>【负荷数据预测】</div>
    <div ref="target" class="w-full h-full"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';
import Data from '@/assets/data/zhexian_demo1.json';

const target = ref(null);

const renderChart = () => {
  const chartDom = target.value;
  const myChart = echarts.init(chartDom);

  const data1 = Data.slice(0, 15);
  const data2 = Data.slice(15);

  const mergedData = data1.concat(data2);

  const option = {
    xAxis: {
      type: 'category',
      data: mergedData.map(item => item.date)
    },
    yAxis: {
      type: 'value',
      data: mergedData.map(item => item.value)
    },
    dataZoom: [
      {
        type: 'slider',
        start: 0,
        end: 100,
        xAxisIndex: 0
      },
      {
        type: 'inside',
        xAxisIndex: 0
      },
      {
        type: 'slider',
        start: 0,
        end: 100,
        yAxisIndex: 0
      },
      {
        type: 'inside',
        yAxisIndex: 0
      },
      {
        type: 'slider',
        start: 0,
        end: 100,
        yAxisIndex: 1
      },
      {
        type: 'inside',
        yAxisIndex: 1
      }
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      },
      formatter: function (params) {
        const date = params[0].axisValue;
        const value = params[0].value;
        return `${date}: ${value}`;
      }
    },
    series: [
      {
        data: mergedData.map(item => ({
          value: item.value,
          symbol: 'none'
        })),
        type: 'line',
        lineStyle: {
          color: 'orange'
        },
        areaStyle: {
          color: 'rgba(0, 0, 0, 0)'
        },
        itemStyle: {
          color: 'orange'
        },
      },
      {
        data: data1.map(item => item.value),
        symbol: 'none',
        type: 'line',
        lineStyle: {
          color: 'lightblue'
        },
        areaStyle: {
          color: 'rgba(0, 0, 0, 0)'
        },
        itemStyle: {
          color: 'lightblue'
        },
      }
    ]
  };

  myChart.setOption(option);
};

onMounted(() => {
  renderChart();
});
</script>

<style lang="scss" scoped></style>
