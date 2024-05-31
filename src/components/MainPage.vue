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
			if (this.play > 0){
				this.play /= 2;
				this.Save();
				this.SetPage("/PCOS/work")
			}
			else{
				alert("Какая работа? Лучше поиграю.")
			}
		},
		Game() {
			try {
				this.Save()
			}
			catch (error) { console.error(error.stack); }
		},
		Save(){
			parent.postMessage({ play: this.play },window.location.origin)
		}
	},
	setup() {
		// It will be reactive, and the component
		// will update whenever Spec updates
		return { ...Spec }
	}
}
</script>