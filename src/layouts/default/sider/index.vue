<template>
    <ElDrawer
    v-if="getIsMobile"
    :withHeader="false"
    :modelValue="!getCollapsed"
    >
        <Sider/>
    </ElDrawer>
    <MixSider v-else-if="getIsMixSidebar" />
    <Sider v-else />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElDrawer } from 'element-plus'

import Sider from './LayoutSider.vue'
import MixSider from './MixSider.vue';

import { useMenuSetting } from '/@/hooks/setting/useMenuSetting'

import { useAppInject } from '/@/hooks/web/useAppInject';

export default defineComponent({
    name: 'SiderWrapper',
    components: {
        ElDrawer,
        MixSider,
        Sider,
    },
    setup() {
        const { getIsMobile } = useAppInject();
        const { setMenuSetting, getCollapsed, getMenuWidth, getIsMixSidebar } = useMenuSetting();

        return {
            getIsMobile,
            getMenuWidth,
            getIsMixSidebar,
            getCollapsed,
        }
    }
})
</script>