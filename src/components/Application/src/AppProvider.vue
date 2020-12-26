<template>
    <slot />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'Application',
    inheritAttrs: false,
    setup() {

        return {}
    }
})
</script>