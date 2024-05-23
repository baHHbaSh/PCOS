import {createApp} from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import App from './App.vue'
import MainPage from './components/MainPage.vue'
import Work from './components/Work.vue'
import "@/assets/OS.css"

let Spec = {
    CPU:6,
    RAM:3,
    ROM:1,
    GPU:7
}

const routes = [
    { path: '/', component: MainPage },
    { path: "/work", component: Work, props: Spec },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

createApp(App).use(router).mount('#app')