import { createApp, reactive } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from '@/App.vue'
import MainPage from '@/components/MainPage.vue'
import Work from '@/components/Work.vue'
import "@/assets/OS.css"

/*
Потребности/Ресурсы:
деньги
досуг
сон
хп

отдельно:
еда
вода
туалет
гигиена
___________________
money
play
sleep
hp
eat
water
toilet
hygiene

100 - max

SetCycleDataFunc("type", value)
GetCycleDataFunc()["type"]

Формат сейва {"eat":[id], PCspec:[CPU, GPU, RAM, ROM], "Need":{"play":int,"sleep":int,"hp":int,"eat":int,"water":int,"toilet":int,"hygiene":int}, markets:[]}
*/
export const Spec = reactive({
    money: 10,
	play: 100,
	sleep: 100,
	hp: 100,
	water: 100,
	toilet: 100,
	hygiene: 100,
	CPU: 1,
	GPU: 1,
	RAM: 1,
	ROM: 1
})

window.addEventListener("message", event => {
    //  Update global state
    for (let key in event.data) { // Or Object.assign, etc
        Spec[key] = event.data[key];
    }
});
//window.addEventListener("message", event=>{window.Spec = event.data})
const routes = [
    { path: "/PCOS/", component: MainPage },
    { path: "/PCOS/work", component: Work }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})
createApp(App).use(router).mount('#app')