<template>
    <p>vue</p>
    <Application>
        Application的slot
    </Application>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { AppProvider } from '/@/components/Application'
export default defineComponent({
    name: 'App',
    components: {
        AppProvider
    }
})
</script>