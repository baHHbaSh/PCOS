<template>
	<div class="v">
		<div class="w" id="0">
			<button @click="CYT()">YouTube</button>
			<button @click="ToWork()">Фриланс</button>
			<button @click="Game()">Игры</button>
			<button>Биржа</button>
			<button>Новости</button>
		</div>
		<iframe v-if="YT" width="863" height="396" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
			title="YouTube" frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
	</div>
</template>
<script>
export default {
	name: "MainPage",
	props: ["SetCycleDataFunc", "GetCycleDataFunc"],
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
				SetCycleDataFunc("game", GetCycleDataFunc()["game"] / 2)
			}
			catch { }
			this.SetPage('/work')
		},
		Game() {
			try {
				SetCycleDataFunc("game", 100)
			}
			catch { }
		},
		ToMarkest() {
			this.SetPage("/markets")
		}
	}
}
</script>