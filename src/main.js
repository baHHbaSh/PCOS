import {createApp} from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import App from './App.vue'
import MainPage from './components/MainPage.vue'
import Work from './components/Work/Work.vue'
import "@/assets/OS.css"

const routes = [
    { path: '/', component: MainPage },
    { path: "/work", component: Work },
]

const router= createRouter({
    history: createWebHistory(),
    routes
})

createApp(App).use(router).mount('#app')