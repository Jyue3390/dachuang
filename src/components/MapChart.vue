<template>
	<div>
        <header> 供电线路 </header>
		<div ref="target" class="w-full h-full"></div>
	</div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import mapJson from '@/assets/MapData/china.json'
import elecData from '@/assets/data/elec2223.json'
import axios from 'axios'

const props = defineProps({
	data: {
		type: Object,
		required: true
	}
})
const target = ref(null)
let mChart = null
onMounted(() => {
	mChart = echarts.init(target.value)
	renderChart()
})
const renderChart = () => {
    echarts.registerMap('china', mapJson)// echarts 渲染
    const channel = ["锡泰直流","雁淮直流","建苏直流","锦苏直流","龙政直流"];
    const channel1 = [
        {
            type: 'lines',
            coordinateSystem: 'geo',
            //polyline: true,
            smooth: true,
            data: [
                // 锡泰直流
                {
                    fromName: '内蒙古自治旗锡盟',
                    toName: '泰州',
                    coords: [
                        [115.48829,44.19456],
                        [119.91224,32.48142]
                    ],
                    values: 1
                },
                // 雁淮直流
                {
                    fromName: '山西朔州雁门关换流',
                    toName: '淮安',
                    coords: [
                        [112.42250,39.31583],
                        [119.10758,33.55248]
                    ],
                    values: 2
                },
                //建苏直流
                {
                    fromName: '四川凉山州建昌换流站',
                    toName: '苏州姑苏',
                    coords: [
                        [102.08068,27.88579],
                        [120.61301,31.33951]
                    ],
                    values: 3
                },
            ],
            lineStyle: {
                color: 'rgba(255, 255, 255, 0.8)', // 线条颜色
                width: 3, // 线条宽度
                type: 'solid', // 线条类型，可选为：'solid', 'dashed', 'dotted'
               curveness: 0.2
            },
            emphasis: {
                lineStyle: {
                    color: 'rgba(5, 255, 255, 0.8)', // 高亮时的线条颜色
                    width: 10 // 高亮时的线条宽度
                },
            },
            effect: {
                show: true,
                constantSpeed: 50, // 圆点沿线移动的速度，值越大速度越快
                trailLength: 0.1, // 圆点移动的轨迹长度，取值范围为 0 到 1
                symbol: 'circle', // 圆点的形状
                symbolSize: 10, // 圆点的大小
                color: 'rgba(255, 255, 255, 0.8)' // 圆点的颜色
            },            
        },
    ]
    const channel2 = [
        {
            type: 'lines',
            coordinateSystem: 'geo',
            //polyline: true,
            smooth: true,
            data: [
                // 锦苏直流
                {
                    fromName: '锦屏',
                    toName: '苏州',
                    coords: [
                        [101.79178, 28.13861],
                        [120.58110, 31.30170]
                    ],
                    values: 4
                },
                //龙政直流
                {
                    fromName: '宜昌龙泉',
                    toName: '常州政平',
                    coords: [
                        [111.49023,30.73095],
                        [120.99134,31.60327]
                    ],
                    values: 5
                },
            ],
            lineStyle: {
                color: 'rgba(199, 252, 199, 0.8)', // 线条颜色
                width: 3, // 线条宽度
                type: 'solid', // 线条类型，可选为：'solid', 'dashed', 'dotted'
               curveness: 0.5
            },
            emphasis: {
                lineStyle: {
                    color: 'rgba(0, 255, 255, 0.8)', // 高亮时的线条颜色
                    width: 10 // 高亮时的线条宽度
                },
            },
            effect: {
                show: true,
                constantSpeed: 50, // 圆点沿线移动的速度，值越大速度越快
                trailLength: 0.1, // 圆点移动的轨迹长度，取值范围为 0 到 1
                symbol: 'circle', // 圆点的形状
                symbolSize: 10, // 圆点的大小
                color: 'rgba(240, 255, 240, 0.8)' // 圆点的颜色
            },
            
        },
    ];
    const series = channel1.concat(channel2);
    let options = {// 创建 options 对象并设置基本选项
        // 时间线，提供了在多个 ECharts option 间进行切换
        timeline: {
			// 数据
			data: elecData.map(item => item.date),
			// 类目轴
			axisType: 'category',
			// 自动切换
			autoPlay: true,
			// 间隔时间
			playInterval: 3000,
			// 位置
			left: '2%',
			right: '10%',
			bottom: '51.5%',
			width: '90%',
			// 轴的文本标签
			label: {
				// 默认状态
				normal: {
					textStyle: {
						color: '#ddd'
					}
				},
				// 高亮状态
				emphasis: {
					textStyle: {
						color: '#fff'
					}
				}
			},
			// 文字大小
			symbolSize: 10,
			// 线的样式
			lineStyle: {
				color: '#999'
			},
			// 选中点的样式
			checkpointStyle: {
				borderColor: '#888',
				borderWidth: 2
			},
			// 控件样式
			controlStyle: {
				// 上一步按钮
				showNextBtn: true,
				// 下一步按钮
				showPrevBtn: true,
				// 默认样式
				normal: {
					color: '#666',
					borderColor: '#666'
				},
				// 高亮样式
				emphasis: {
					color: '#aaa',
					borderColor: '#aaa'
				}
			}
		},        
        options:[]
    }
    elecData.forEach((item) => {
        let optionItem = {
            grid: {
                left: '4%',
                right: '4%',
                bottom: '10%',
                width: '80%',
                height: '35%'
            },
            xAxis: {
                type: 'category',
                data: ["锡泰直流", "雁淮直流", "建苏直流", "锦苏直流", "龙政直流"],
            },
            yAxis: {
                type: 'value',
            },
            color: [
                {
                type: 'linear',
                x: 1,
                y: 1,
                x2: 0,
                y2: 0,
                colorStops: [  // 设置颜色渐变
                    { offset: 0, color: 'rgba(0, 0, 270, 0.2)' },
                    { offset: 1, color: 'rgba(110, 270, 260, 1)' }
                    ]
                }
            ],
            series: [{
                type: 'bar',
                barWidth: '39%', // 减少每个柱子的宽度
                label: {
                    show: false,
                    position: 'top',
                },
                data: item.data
            }]
        };       
        options.options.push(optionItem);
    });

    options.baseOption= {
        grid: {
            right: '2%',
            top: '15%',
            bottom: '10%',
            width: '20%'
        },
        // 中国地图
        geo: { 
            show: true,// 展示               
            map: 'china',// 中国地图              
            roam: false, // 禁止缩放和平移              
            center: [108.195397, 10.7], // 设置地图的中心点坐标// 中心点
            zoom: 0.8, // 设置地图的缩放比例            
            itemStyle: {// 默认状态的省份样式
                normal:{
                    borderColor: 'rgba(100, 235, 248, 1)',// 边框色值
                    borderWidth: 1,// 边框宽度
                    areaColor: {// 区域颜色
                        type: 'radial',// 经向色值
                        x: 0.5,
                        y: 0.5,
                        r: 0.5,
                        colorStops: [
                            // 0% 处的颜色
                            {
                                offset: 0,
                                color: 'rgba(14, 235, 248, 0)'
                            },
                            // 100% 处的颜色
                            {
                                offset: 1,
                                color: 'rgba(0, 235, 248, .2)'
                            }
                        ],
                        globalCoord: false// 缺省为 false
                    }
                },
                // 设置特定省份的样式
                emphasis: {
                    areaColor: '#389BB7',
                    borderWidth: 0
                }
            },            
        },
        // 添加飞行轨迹系列
        series: series.concat(channel1),
        // 启用 Tooltip 功能
        tooltip: {
            trigger: 'item', // 设置触发方式为鼠标悬停时触发
            formatter: function(params) {
                // 在这里可以自定义 Tooltip 的显示内容
                if (params.data) {
                    const data = params.data;
                    if (data.fromName && data.toName) {
                        // const lineName = data.fromName + ' → ' + data.toName;
                        // return lineName;
                        return channel[data.values-1]
                    }
                }
                return '';
            }
        },
        // 监听鼠标移动事件
        grid: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            containLabel: true
        },
        graphic: [
            {
                type: 'group',
                id: 'lineNameGroup', // 自定义的 id
                children: [
                    {
                        type: 'text',
                        id: 'lineNameText', // 自定义的 id
                        z: 100,
                        style: {
                            fill: 'rgba(255, 255, 255, 0.8)', // 线条名字的颜色
                            fontSize: 14,
                            fontWeight: 'bold'
                        }
                    }
                ]
            }
        ],      
    };
    mChart.setOption(options)// 设置地图的选项
    // mChart.on('timelinechanged', function(params) {
    //     const currentIndex = params.currentIndex;
    //     mChart.setOption(options.options[currentIndex]);
    // });
};
</script>
<style lang="scss" scoped></style>