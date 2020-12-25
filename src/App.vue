<template>
    <p>vue</p>
    <icon icon="bx:bx-home"></icon>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Icon from '/@/components/Icon'
export default defineComponent({
    name: 'App',
    components: {
        Icon
    }
})
</script>