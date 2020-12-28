<template>
    <slot />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'Input',
    inheritAttrs: false,
    setup() {

        return {}
    }
})
</script>