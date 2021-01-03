<template>
    <ElMenu
    :collapse="getCollapsed"
    :class="getMenuClass"
    :mode="getIsHorizontal ? 'horizontal' : 'vertical'"
    :default-active="String(defaultActive)"
    :default-openeds="defaultOpeneds"
    @select="handleMenuSelect"
    @open="handleMenuOpen"
    @close="handleMenuClose"
    >
        <template v-for="(item, index) in items" :key="item.path">
            <BasicSubMenuItem
            :item="item"
            :level="index"
            />
        </template>
    </ElMenu>
</template>

<script lang="ts">
import type { MenuState } from './types';

import { RouteLocationNormalizedLoaded, useRouter } from 'vue-router';
import { defineComponent, computed, unref, reactive, toRefs, ref } from 'vue';
import { ElMenu } from 'element-plus';

import BasicSubMenuItem from './components/BasicSubMenuItem.vue';

import { REDIRECT_NAME } from '/@/router/constant';
import { getCurrentParentPath } from '/@/router/menus';

import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
import { useDesign } from '/@/hooks/web/useDesign';

import { useOpenKeys } from './useOpenKeys.ts';

import { basicProps } from './props';

import { MenuModeEnum, MenuTypeEnum } from '/@/enums/menuEnum';

import { listenerLastChangeTab } from '/@/logics/mitt/tabChange';

export default defineComponent({
    name: 'BasicMenu',
    components: {
        ElMenu,
        BasicSubMenuItem,
    },
    props: basicProps,
    emits: ['menuSelect'],
    setup(props, { emit }) {
        const isClickGo = ref(false);

        const { currentRoute } = useRouter();

        const menuState = reactive<MenuState>({
            defaultActive: 0,
            defaultOpeneds: [],
            collapsedOpeneds: [],
        });

        const { prefixCls } = useDesign('basic-menu');
        const { items, mode, accordion } = toRefs(props);
        const { getCollapsed, getIsHorizontal, getTopMenuAlign, getSplit } = useMenuSetting();
        const { handleOpenChange, setOpenKeys, getOpenKeys } = useOpenKeys(
            menuState,
            items,
            mode,
            accordion
        );

        const getIsTopMenu = computed(() => {
            const { type, mode } = props;

            return (
            (type === MenuTypeEnum.TOP_MENU && mode === MenuModeEnum.HORIZONTAL) ||
            (props.isHorizontal && unref(getSplit))
            );
        });

        const getMenuClass = computed(() => {
            const align = props.isHorizontal && unref(getSplit) ? 'start' : unref(getTopMenuAlign);
            return [
            prefixCls,
            `justify-${align}`,
            {
                [`${prefixCls}__second`]: !props.isHorizontal && unref(getSplit),
                [`${prefixCls}__sidebar-hor`]: unref(getIsTopMenu),
            },
            ];
        });

        listenerLastChangeTab((route) => {
            if (route.name === REDIRECT_NAME) return;
            handleMenuChange(route);
        }, false);

        function emitMenuSelect(levels: string) {
            const arr:number[] = levels.split('-').map(item => Number(item))
            let i = 1
            let route = props.items[arr[0]]
            while(i<arr.length) {
                let k = arr[i];
                route = route.children?.length?route.children[k]:route;
                i++
            }
            if(!route || !route.path) return
            
            emit('menuSelect', route.path);
        }

        async function handleMenuSelect( index: string, openIdxs: string[], item ) {
            // const { beforeClickFn } = props;
            // if (beforeClickFn && isFunction(beforeClickFn)) {
            // const flag = await beforeClickFn(index);
            // if (!flag) return;
            // }

            emitMenuSelect(index)

            menuState.defaultActive = index
            menuState.defaultOpeneds = openIdxs
        }

        async function handleMenuOpen( index: string, openIdxs: string[], item ) {
            emitMenuSelect(index)
            handleOpenChange(openIdxs)
        }

        async function handleMenuClose( index: string, openIdxs: string[], item ) {
            emitMenuSelect(index)
            handleOpenChange(openIdxs)
        }

        async function handleMenuChange(route?: RouteLocationNormalizedLoaded) {
            if (unref(isClickGo)) {
                isClickGo.value = false;
                return;
            }
            const path = (route || unref(currentRoute)).path;
            if (props.mode !== MenuModeEnum.HORIZONTAL) {
                setOpenKeys(path);
            }
            if (props.isHorizontal && unref(getSplit)) {
                const parentPath = await getCurrentParentPath(path);
                menuState.defaultOpeneds = [parentPath];
            } else {
                menuState.defaultOpeneds = [path];
            }
        }

        return {
            getCollapsed,
            getIsHorizontal,
            getMenuClass,
            getOpenKeys,
            handleMenuSelect,
            handleMenuOpen,
            handleMenuClose,
            ...toRefs(menuState),
        }
    }
})
</script>

<style lang="scss">
@import './index.scss';
</style>