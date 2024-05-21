<template>
	<div class="v">
		<div class="w" id="0">
			<button @click="CYT()">YouTube</button>
			<button @click="SetPage('/work')">Фриланс</button>
			<button>Игры</button>
			<button>Биржа</button>
			<button>Новости</button>
		</div>
		<iframe v-if="YT" width="863" height="396" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" title="YouTube" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
	</div>
</template>
<script>
	export default {
		name: "MainPage",
		data(){
			return{
				YT:false,
			}
		},
		methods: {
			CYT(){
				this.YT=this.YT?false:true
			},
			SetPage(Path){
				this.$router.replace({path:Path})
			}
		}
	}
</script>