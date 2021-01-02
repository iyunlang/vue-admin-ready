<template>
    <ElMenu
    :class="getMenuClass"
    >
        <template v-for="item in items" :key="item.path">
            <BasicSubMenuItem
            :item="item"
            :level="1"
            />
        </template>
    </ElMenu>
</template>

<script lang="ts">
import { defineComponent, computed, unref } from 'vue';
import { ElMenu } from 'element-plus';

import BasicSubMenuItem from './components/BasicSubMenuItem.vue';

import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
import { useDesign } from '/@/hooks/web/useDesign';

import { basicProps } from './props';

import { MenuModeEnum, MenuTypeEnum } from '/@/enums/menuEnum';

export default defineComponent({
    name: 'BasicMenu',
    components: {
        ElMenu,
        BasicSubMenuItem,
    },
    props: basicProps,
    setup(props) {
        const { prefixCls } = useDesign('basic-menu');

        const { getCollapsed, getIsHorizontal, getTopMenuAlign, getSplit } = useMenuSetting();

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

        return {
            getMenuClass
        }
    }
})
</script>

<style lang="scss">
@import './index.scss';
</style>