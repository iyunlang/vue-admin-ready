<template>
    <BasicMenuItem :level="getParentsLevel" v-if="!menuHasChild(item)" v-bind="$props"></BasicMenuItem>
    <ElSubmenu v-else :index="getParentsLevel" :class="[`${prefixCls}__level${level}`, theme]">
        <template #title>
          <MenuItemContent v-bind="$props" :item="item"/>
        </template>

        <template v-for="(childrenItem, subIndex) in item.children || []" :key="childrenItem.path">
            <BasicSubMenuItem v-bind="$props" 
            :item="childrenItem" 
            :parentsLevel="getParentsLevel" 
            :level="subIndex"
            >
            </BasicSubMenuItem>
        </template>
    </ElSubmenu>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { ElSubmenu } from 'element-plus'

import type { Menu as MenuType } from '/@/router/types';

import BasicMenuItem from './BasicMenuItem.vue'
import MenuItemContent from './MenuItemContent.vue'

import { itemProps } from '../props';

import { useDesign } from '/@/hooks/web/useDesign';

export default defineComponent({
    name: 'BasicSubMenuItem',
    components: { 
        BasicMenuItem,
        MenuItemContent,
        ElSubmenu,
    },
    props: itemProps,
    setup(props) {
        const { prefixCls } = useDesign('basic-menu-item');
        function menuHasChild(menuTreeItem: MenuType): boolean {
            return (
                Reflect.has(menuTreeItem, 'children') &&
                !!menuTreeItem.children &&
                menuTreeItem.children.length > 0
            );
        }

        const getParentsLevel = props.parentsLevel?+'-'+props.level: props.level+''

        return {
            menuHasChild,
            prefixCls,
            getParentsLevel,
        }
    }
})
</script>