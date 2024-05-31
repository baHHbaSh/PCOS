<template>
	<div class="owerlay">
		<h1 class="owerlayData">Багов найдено - {{ CollectedBug.length < ROM * 2 ? CollectedBug.length : "Перевес" }}</h1>
				<h1 class="owerlayData">❤️ - {{ Math.round(Lives / RAM * 100) }}%</h1>
				<h1 class="owerlayData">CPU - {{ CPU }}</h1>
				<h1 class="owerlayData">GPU - {{ GPU }}</h1>
				<h1 class="owerlayData">RAM - {{ RAM }}</h1>
				<h1 class="owerlayData">ROM - {{ ROM }}</h1>
	</div>
	<div v-for="(war, k) in War" :key="k">
		<div class="challenge">
			<h1>{{ war[0] }}</h1>
			<p>x=</p>
			<div class="row">
				<button @click="Answer(answer, war[2], war[3])" v-for="(answer, p) in shuffleArray(war[1])"
					:key="p">{{ answer }}</button>
			</div>
		</div>
	</div>
	<canvas id="work"></canvas>
</template>
<script>
import { Object, IsTouching, ObjTouching, ImageLoad, ImageObject, Clamp, PlayerObject, BugObject, ShopObject } from "@/assets/CanvasClass";
import { level } from "@/assets/map"
import PlayerImage from "@/assets/player.png"
import BugImage from "@/assets/bug.png"
import ShopImage from "@/assets/shop.png"
import { Spec } from "@/main";
export default {
	name: "Work",
	data() {
		return {
			Canvas: undefined,
			Player: new PlayerObject(600, 200, 50, 100, PlayerImage),
			RenderList: [],
			WallsList: [],
			GameCycle: null,
			ctx: undefined,
			Keys: { w: false, a: false, s: false, d: false },
			BeforePosition: [0, 0],
			Lives: this.RAM,
			CollectedBug: [],
			War: [],
			TMPFUNC: null,
			LastHard: undefined
		}
	},
	methods: {
		shuffleArray(array) {
			for (let i = array.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[array[i], array[j]] = [array[j], array[i]];
			}
			return array
		},
		Randint(min, max) { return min + Math.round(Math.random() * (max - min)) },
		Answer(Ans, x, Hard) {
			console.log(Hard)
			if (Ans == x) {
				if (this.CollectedBug.length < this.ROM * 2) { this.CollectedBug.push(+Hard) }
			}
			else this.Lives--
			this.War.pop()
			console.log(this.Lives / this.RAM * 100)
			if (Math.round(this.Lives / this.RAM * 100) <= 0) { console.log("defeat"); this.$router.replace("/PCOS") }
			setTimeout(this.TMPFUNC, 36000 * 1000)
		},
		GetChallenge(func) {
			this.LastHard = this.Randint(1, this.CPU)
			if (this.War.length == 0) this.War.push(this.QuizGen(this.LastHard))
			this.TMPFUNC = func
		},
		QuizGen(Hard) {
			if (Hard == 1) {
				let zn = Math.random() >= .5 ? "+" : "-"
				let fs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9][Math.round(Math.random() * 8) + (zn == "-" ? 1 : 0)]
				let x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9][zn == "-" ? this.Randint(fs, 9) : Math.round(Math.random() * 9)]
				let Shg = Math.round(Math.random() * 5) + 1
				return [`${fs} ${zn} x = ${eval(fs + zn + x)}`, [x, x - Shg, x + Shg, x + 1 + Math.round(Math.random() * 4) + Shg], x, Hard]
			}
			else if (Hard == 2) {
				let zn = Math.random() > .5 ? "+" : "-"
				let fs = this.Randint(9, zn == "+" ? 49 : 99)
				let x = this.Randint(9, zn == "+" ? 49 : fs)
				let Shg = Math.round(Math.random() * 5) + 1
				return [`${fs} ${zn} x = ${eval(fs + zn + x)}`, [x, x - Shg, x + Shg, x + 1 + Math.round(Math.random() * 4) + Shg], x, Hard]
			}
			else if (Hard == 3) {
				let zn = Math.random() > .5 ? "+" : "-"
				let fs = this.Randint(-100, 100)
				let x = this.Randint(-100, 100)
				let Shg = Math.round(Math.random() * 5) + 1
				return [`${fs} ${zn} x = ${eval(`${fs} ${zn} ${x}`)}`, [x, x - Shg, x + Shg, x + 1 + Math.round(Math.random() * 4) + Shg], x, Hard]
			}
			else if (Hard == 4) {
				let zn = Math.random() > .5 ? "+" : "-"
				let fs = this.Randint(-1000, 1000)
				let x = this.Randint(-1000, 1000)
				let Shg = Math.round(Math.random() * 5) + 1
				return [`${fs} ${zn} x = ${eval(`${fs} ${zn} ${x}`)}`, [x, x - Shg, x + Shg, x + 1 + Math.round(Math.random() * 4) + Shg], x, Hard]
			}
			else if (Hard == 5) {
				let fs = this.Randint(-10, 10)
				fs = fs == 0 ? 2 : fs
				let x = this.Randint(-10, 10)
				let Shg = Math.round(Math.random() * 5) + 1
				return [`${fs} * x = ${fs * x}}`, [x, x - Shg, x + Shg, x + 1 + Math.round(Math.random() * 4) + Shg], x, Hard]
			}
			else if (Hard == 6) {
				let result = this.Randint(-10, 10)
				let x = this.Randint(1, 10)
				let Shg = Math.round(Math.random() * 5) + 1
				return [`${result * x} / x = ${result}`, [x, x - Shg, x + Shg, x + 1 + Math.round(Math.random() * 4) + Shg], x, Hard]
			}
			else if (Hard == 7) {
				let result = this.Randint(-1000, 1000)
				let x = this.Randint(1, 10)
				let Shg = Math.round(Math.random() * 5) + 1
				return [`${result * x} / x = ${result}`, [x, x - Shg, x + Shg, x + 1 + Math.round(Math.random() * 4) + Shg], x, Hard]
			}
			else if (Hard == 8) {
				let zn1 = ["+", "-"][this.Randint(0, 1)]
				let zn2 = ["+", "-", "*"][this.Randint(0, 2)]
				let fs = this.Randint(-10, 10)
				let x = this.Randint(-10, 10)
				let ts = this.Randint(-10, 10)
				let Shg = Math.round(Math.random() * 5) + 1
				return [`${fs} ${zn1} x ${zn2} ${ts} = ${eval(`${fs} ${zn1} ${x} ${zn2} ${ts}`)}`, [x, x - Shg, x + Shg, x + 1 + Math.round(Math.random() * 4) + Shg], x, Hard]
			}
			else if (Hard == 9) {
				let zn1 = ["+", "-"][this.Randint(0, 1)]
				let zn2 = ["+", "-", "*"][this.Randint(0, 2)]
				let fs = this.Randint(-1000, 1000)
				let x = this.Randint(-50, 50)
				let ts = this.Randint(-10, 10)
				let Shg = Math.round(Math.random() * 5) + 1
				return [`${fs} ${zn1} x ${zn2} ${ts} = ${eval(`${fs} ${zn1} ${x} ${zn2} ${ts}`)}`, [x, x - Shg, Math.abs(x + Shg), x + 1 + Math.round(Math.random() * 4) + Shg], x, Hard]
			}
		},
		PlayerTouchWall() {
			let c = false
			for (let LastWall of this.WallsList) {
				if (ObjTouching(this.Player, LastWall)) {
					c = true
					break
				}
			}
			return c
		},
		RenderCanvas() {
			//PlayerMoving
			let Speed = 2 + this.GPU / 2

			this.BeforePosition = this.Player.pos

			//Y

			if (this.Keys["KeyW"] && this.War.length == 0) this.Player.y -= Speed
			if (this.Keys["KeyS"] && this.War.length == 0) this.Player.y += Speed

			if (this.PlayerTouchWall()) {
				this.Player.y = this.BeforePosition[1]
			}

			//X

			if (this.Keys["KeyA"] && this.War.length == 0) this.Player.x -= Speed
			if (this.Keys["KeyD"] && this.War.length == 0) this.Player.x += Speed

			if (this.PlayerTouchWall()) {
				this.Player.x = this.BeforePosition[0]
			}
			this.ctx.save()
			this.ctx.translate(-(this.Player.x - this.Canvas.width / 2 + this.Player.w / 2), -(this.Player.y - this.Canvas.height / 2 + this.Player.h / 2))
			Array.from(this.RenderList).forEach(obj => obj.Render(this.ctx));
			this.ctx.restore()
		},
		SetListenerDown(key) { this.Keys[key.code] = true },
		SetListenerUp(key) { this.Keys[key.code] = false },
		Init() {
			this.Canvas = document.querySelector("#work");
			this.ctx = this.Canvas.getContext("2d");
			this.Resize()
			document.addEventListener("keydown", this.SetListenerDown)
			document.addEventListener("keyup", this.SetListenerUp)

			const WandH = 150

			let Lists = level.split("\n")

			for (let y in Lists) {
				for (let x in Lists[y].split('')) {
					if (Lists[y][x] == "0") this.RenderList.push(new Object(x * WandH, y * WandH, WandH + 1, WandH + 1, "#222"))
					else if (Lists[y][x] == "1") this.WallsList.push(new Object(x * WandH, y * WandH, WandH + 1, WandH + 1, "black"))
					else if (Lists[y][x] == "2") this.RenderList.push(new ShopObject(x * WandH, y * WandH, WandH + 1, WandH + 1, ShopImage, this.Player, () => { this.SellAndLeave() }))
					else if (Lists[y][x] == "3") this.RenderList.push(new BugObject(x * WandH, y * WandH, WandH + 1, WandH + 1, BugImage, this.Player, () => { this.GetChallenge() }))
				}
			}
			this.WallsList.forEach(obj => this.RenderList.push(obj))
			this.GameCycle = setInterval(() => { this.RenderCanvas() }, .16)
			this.RenderList.push(this.Player);
			
		},
		Resize() {
			this.Canvas.width = window.innerWidth;
			this.Canvas.height = window.innerHeight;
			this.ctx.fillRect(0, 0, this.Canvas.width, this.Canvas.height)
		},
		SellAndLeave() {
			try {
				this.CollectedBug.forEach(Bprice => { console.log(this.money, Bprice, this.CollectedBug); this.money += Bprice ** 2 })
				parent.postMessage({ money: this.money },window.location.origin)
			}
			catch {
				console.error("Функция не была найдена, результат не сохранён, проверь Spec")
			}
			this.$router.replace("/PCOS")
		},
	},
	mounted() {
		this.Init()
		window.addEventListener("resize", this.Resize)
	},
	unmounted() {
		clearInterval(this.GameCycle)
		window.removeEventListener("resize", this.Resize)
		document.removeEventListener("keydown", this.SetListenerDown)
		document.removeEventListener("keyup", this.SetListenerUp)
	},
	setup() {
        // It will be reactive, and the component
        // will update whenever Spec updates
        return { ...Spec }
    }
};
</script>
<style scoped>
.owerlay,
.challenge {
	position: absolute;
}

.owerlayData {
	margin: 20px;
}

.challenge {
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 100%;
	align-items: center;
	text-align: center;
	color: rgb(215, 35, 35);
	background: linear-gradient(135deg, rgb(65, 65, 65), black);
	top: 2vh;
	left: 2vw;
	width: 96vw;
	height: 96vh;
}

.row {
	display: flex;
	flex-direction: row;
}

button {
	width: auto !important;
	margin: 10px;
}
</style>