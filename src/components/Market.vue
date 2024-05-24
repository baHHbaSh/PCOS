<template>
    <dev>
        <button v-for="(data, index) in ListFound" :key="index" @click=""></button>
    </dev>
</template>
<script>
import Statistiks from "@/components/Statistics.vue"
export default {
    name: "Market",
    data() {
        return {
            ListFound: []
        }
    }
}
</script>