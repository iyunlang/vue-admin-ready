<template>
    <p>vue</p>
    <AppProvider>
        <router-view />
    </AppProvider>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { AppProvider } from '/@/components/Application'
console.log(AppProvider)
export default defineComponent({
    name: 'App',
    components: {
        AppProvider
    },
    setup() {

        return {}
    }
})
</script>