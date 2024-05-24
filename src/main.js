import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import MainPage from './components/MainPage.vue'
import Work from './components/Work.vue'
import Market from './components/Market.vue'
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
Hygiene

100 - max

SetCycleDataFunc("type", value)
GetCycleDataFunc()["type"]
*/
let Spec = {
    CPU: 6,
    RAM: 3,
    ROM: 1,
    GPU: 7,
    SetCycleDataFunc: null,
    GetCycleDataFunc: null,
}

const routes = [
    { path: '/', component: MainPage, props: Spec },
    { path: "/work", component: Work, props: Spec },
    { path: "/markets", component: Market, props: Spec }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

createApp(App).use(router).mount('#app')