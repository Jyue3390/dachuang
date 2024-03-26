<template>
	<div
		class="bg-[url('assets/img/bg.jpg')] bg-cover bg-center h-screen text-white p-2
		 flex flex-col overflow-hidden bg-opacity-50"
		v-if="data"
	>
		<h1 class="text-4xl font-bold mb-3 text-center">省间现货预测平台</h1>
		<div class="flex-1 flex justify-between">
			<div class="w-2/5 flex flex-col">
				<!-- 地图可视化 -->
				<MapChart
					class="bg-opacity-90 bg-slate-800 p-3 mt-2 flex-1"
					:data="data.mapData"
				/>
			</div>
			<div class="w-3/5 flex flex-col">
				<Zhexian class="h-2/5 bg-opacity-90 bg-slate-800 box-border pb-4" :data="data.serverData" />
        		<Shenbao class="h-2/5 bg-opacity-90 bg-slate-800 box-border pb-4"  />
			</div>
		</div>
	</div>
</template>

<script setup>
import MapChart from './components/MapChart.vue'
import { ref } from 'vue'
import { getVisualization } from '@/api/visualization.js'
import Zhexian from './components/zhexian.vue'
import Shenbao from './components/shenbao.vue'

const data = ref(null)

const loadData = async () => {
	data.value = await getVisualization()
}

loadData()

setInterval(() => {
	loadData()
}, 3000)
</script>
