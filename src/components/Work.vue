<template>
    <canvas id="work"></canvas>
</template>
<script>
    import {Object, IsTouching, ObjTouching, ImageLoad, ImageObject, Clamp, PlayerObject} from "@/assets/CanvasClass";
    import {level} from "@/assets/map"
    import PlayerImage from "@/assets/player.png"
import { walk } from "vue/compiler-sfc";
    export default{
        name:"Work",
        data(){
            return{
                Canvas: null,
                Player: new PlayerObject(900,400,50,100, PlayerImage),
                RenderList: [],
                WallsList: [],
                GameCycle: null,
                ctx: null,
                Keys: {w:false,a:false,s:false,d:false},
                BeforePosition: [0,0],
                Lives: 100,
            }
        },
        methods:{
            PlayerTouchWall(){
                let c = false
                for (let LastWall of this.WallsList){
                    if (ObjTouching(this.Player, LastWall)){
                        c=true
                        break
                    }
                }
                return c
            },
            RenderCanvas(){
                //PlayerMoving
                let Speed = 4

                this.BeforePosition = this.Player.pos

                //Y

                if (this.Keys["KeyW"]) this.Player.y -= Speed
                if (this.Keys["KeyS"]) this.Player.y += Speed

                if (this.PlayerTouchWall()){
                    this.Player.y = this.BeforePosition[1]
                }

                //X

                if (this.Keys["KeyA"]) this.Player.x -= Speed
                if (this.Keys["KeyD"]) this.Player.x += Speed
                
                if (this.PlayerTouchWall()){
                    this.Player.x = this.BeforePosition[0]
                }
                this.ctx.save()
                this.ctx.translate(-(this.Player.x - this.Canvas.width/2 + this.Player.w/2), -(this.Player.y - this.Canvas.height/2 + this.Player.h/2))
                Array.from(this.RenderList).forEach(obj=>obj.Render(this.ctx));
                this.ctx.restore()
            },
            SetListenerDown(key){ this.Keys[key.code] = true  },
            SetListenerUp  (key){ this.Keys[key.code] = false },
            Init(){
                this.Canvas = document.querySelector("#work");
                this.ctx = this.Canvas.getContext("2d");
                this.Canvas.width = window.innerWidth;
                this.Canvas.height = window.innerHeight;
                document.addEventListener("keydown", this.SetListenerDown)
                document.addEventListener("keyup", this.SetListenerUp)
                
                const WandH = 150

                let Lists = level.split("\n")
                
                for (let y in Lists){
                    for (let x in Lists[y].split('')){
                        if (Lists[y][x] == "1") this.WallsList.push(new Object(x*WandH, y*WandH, WandH+1, WandH+1, "black"))
                        else if (Lists[y][x] == "0") this.RenderList.push(new Object(x*WandH, y*WandH, WandH+1, WandH+1, "#222"))
                    
                    }
            }
            this.WallsList.forEach(obj=>this.RenderList.push(obj))
            
            this.GameCycle = setInterval(()=>{this.RenderCanvas()}, .16)
            this.RenderList.push(this.Player);
        },
        },
        mounted() {
            this.Init()
        },
        unmounted(){
            if (this.GameCycle != null){
                clearInterval(this.GameCycle)
            }
        }
    };
</script>
<style scoped>
    body{
        background: black !important;
    }
</style>