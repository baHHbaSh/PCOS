<template>
	<div class="v">
		<div class="w" id="0">
			<button @click="CYT()">YouTube</button>
			<button @click="ToWork()">Фриланс</button>
			<button @click="Game()">Игры</button>
		</div>
		<iframe v-if="YT" width="863" height="396" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
			title="YouTube" frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
	</div>
</template>
<script>
import { Spec } from '@/main.js';

export default {

	name: "MainPage",
	data() {
		return {
			YT: false,
		}
	},
	methods: {
		CYT() {
			this.YT = this.YT ? false : true
		},
		SetPage(Path) {
			this.$router.replace({ path: Path })
		},
		ToWork() {
			try {
				this.play /= 2
			}
			catch (error) { console.error(error.stack); }
			this.SetPage('/PCOS/work')
		},
		Game() {
			try {
				this.Save()
			}
			catch (error) { console.error(error.stack); }
		},
		Save(){
			parent.postMessage({ money: this.money, CPU: this.CPU, RAM: this.RAM, ROM: this.ROM, GPU: this.GPU, play: this.play, sleep: this.sleep, hp: this.hp, water: this.water, toilet: this.toilet, hygiene: this.hygiene },window.location.origin)
		}
	},
	setup() {
        // It will be reactive, and the component
        // will update whenever Spec updates
        return { ...Spec }
    }
}
</script>