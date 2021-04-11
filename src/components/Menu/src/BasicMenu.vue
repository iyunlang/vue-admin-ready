<template>
    <ElMenu
    :collapse="getCollapsed"
    :class="getMenuClass"
    :mode="getIsHorizontal ? 'horizontal' : 'vertical'"
    :default-active="defaultActive"
    :default-openeds="getOpenKeys"
    @select="handleMenuSelect"
    @open="handleMenuOpen"
    @close="handleMenuClose"
    :background-color="getMenuBgColor"
    :text-color="getTextColor"
    :active-text-color="getActiveTextColor"
    >
        <template v-for="(item, index) in items" :key="item.path">
            <BasicSubMenuItem
            :item="item"
            :level="item.path"
            :theme="theme"
            />
        </template>
    </ElMenu>
</template>

<script lang="ts">
import type { MenuState } from './types';

import { RouteLocationNormalizedLoaded, useRouter } from 'vue-router';
import { defineComponent, computed, unref, reactive, toRefs, ref, PropType } from 'vue';
import { ElMenu } from 'element-plus';

import BasicSubMenuItem from './components/BasicSubMenuItem.vue';

import { REDIRECT_NAME } from '/@/router/constant';
import { getCurrentParentPath } from '/@/router/menus';
import type { Menu } from '/@/router/types';

import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
import { useDesign } from '/@/hooks/web/useDesign';

import { useOpenKeys } from './useOpenKeys.ts';

import { basicProps } from './props';

import { isFunction } from '/@/utils/is'

import { ThemeEnum } from '/@/enums/appEnum';
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
            defaultActive: "/home/welcome",
            defaultOpeneds: ['/home/welcome'],
            collapsedOpeneds: ['/dashboard', '/dashboard/workbench', '/dashboard/analysis'],
        });

        const { prefixCls } = useDesign('basic-menu');
        const { items, mode, accordion } = toRefs(props);
        const { getCollapsed, getIsHorizontal, getTopMenuAlign, getSplit, getMenuBgColor } = useMenuSetting();
        const { handleOpenChange, setOpenKeys, getOpenKeys } = useOpenKeys(
            menuState,
            items,
            mode,
            accordion
        );

        const getActiveTextColor = computed(() => {
            if(props.theme === ThemeEnum.LIGHT) return '#1b82bd'
            return '#1b82bd'
        })

        const getTextColor = computed(() => {
            if(props.theme === ThemeEnum.LIGHT) return '#444444'
            return '#ffffff'
        })

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
            `${props.theme}`,
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

        async function handleMenuSelect( path: string, openIdxs: string[] ) {
            let arr = path.split("-")
            let route = arr[arr.length-1]

            const { beforeClickFn } = props;
            if (beforeClickFn && isFunction(beforeClickFn)) {
                const flag = await beforeClickFn(route);
                if (!flag) return;
            }

            emit('menuSelect', route);
            isClickGo.value = true;
            menuState.defaultActive = path
            menuState.defaultOpeneds = openIdxs
        }

        async function handleMenuOpen( path: string, openIdxs: string[] ) {
            if(openIdxs.length > 1) return;
            let items = props.items;
            for(let index in items) {
                if(items[index].path === path) {
                    let route: Menu = items[index];
                    if(route.children?.length) {
                        let goPath = route.children[0].path;
                        if(goPath !== menuState.defaultActive) {
                            openIdxs.push(goPath)
                            emit('menuSelect', path);
                            isClickGo.value = true;
                            menuState.defaultActive = openIdxs.join('-')
                            menuState.defaultOpeneds = openIdxs
                        }
                    } 
                } 
            }
        }

        async function handleMenuClose( path: string, openIdxs: string[] ) {
            // handleOpenChange(openIdxs)
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
            getMenuBgColor,
            getCollapsed,
            getIsHorizontal,
            getMenuClass,
            getOpenKeys,
            getTextColor,
            getActiveTextColor,
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