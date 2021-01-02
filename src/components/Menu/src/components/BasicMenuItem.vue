<template>
    <ElMenuItem :class="getLevelClass">
        <MenuItemContent v-bind="$props" :item="item" />
    </ElMenuItem>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import { ElMenuItem } from 'element-plus'

import MenuItemContent from './MenuItemContent.vue'

import { useDesign } from '/@/hooks/web/useDesign';

import { itemProps } from '../props';

export default defineComponent({
    name: 'BasicMenuItem',
    components: {
        ElMenuItem,
        MenuItemContent,
    },
    props: itemProps,
    setup( props ) {
        const { prefixCls } = useDesign('basic-menu-item');
        const getLevelClass = computed(() => {
            const { level, theme } = props;

            const levelCls = [`${prefixCls}__level${level}`, theme];
            return levelCls;
        });

        return {
            prefixCls,
            getLevelClass,
        }
    }
})
</script>