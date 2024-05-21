<template>
    <canvas id="work"></canvas>
</template>
<script>
    import {Object, IsTouching, ObjTouching, ImageLoad, ImageObject, Clamp, PlayerObject} from "@/assets/CanvasClass.js"
    export default{
        name:"Work",
        data(){
            return{
                Canvas: null,
                Player: new PlayerObject(0,0,50,100,"MGameImage/player.png"),
                RenderList: [],
            }
        },
        methods:{
            RenderCanvas(){
                Array.from(this.RenderList).forEach(obj=>obj.Render())
            }
        },
        mounted() {
            this.Canvas = this.$el.querySelector("#work");
            this.RenderList.push(this.Player)
        },
    }
</script>
<style scoped>
    body{
        background: black !important;
    }
</style>