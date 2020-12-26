<template>
    <p>vue</p>
    <Application>
        <div>Application的slot</div>
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