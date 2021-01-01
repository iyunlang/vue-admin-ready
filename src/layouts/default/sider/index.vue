<template>
    <ElDrawer
    v-if="getIsMobile"
    >
        <Sider/>
    </ElDrawer>
    <Sider v-else />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElDrawer } from 'element-plus'

import Sider from './LayoutSider.vue'

import { useAppInject } from '/@/hooks/web/useAppInject';

export default defineComponent({
    name: 'SiderWrapper',
    components: {
        ElDrawer,
        Sider,
    },
    setup() {
        const { getIsMobile } = useAppInject();

        return {
            getIsMobile
        }
    }
})
</script>