<template>
    <div
    v-if="getMenuFixed && !getIsMobile"
    :style="getHiddenDomStyle"
    :class="{ hidden: !showClassSideBarRef }"
    >
    </div>
    <ElAside
    ref="sideRef"
    :class="getSiderClass"
    :width="getSideWidth"
    >
        <!-- <template #trigger v-if="getShowTrigger">
            <LayoutTrigger />
        </template> -->
        <LayoutMenu :theme="getMenuTheme" :menuMode="getMode" :splitType="getSplitType" />
        <DragBar ref="dragBarRef" />
    </ElAside>
</template>

<script lang="ts">
import { defineComponent, computed, CSSProperties, unref, ref } from 'vue'

import { ElAside } from 'element-plus'

import LayoutMenu from '../menu'

import { MenuModeEnum, MenuSplitTyeEnum } from '/@/enums/menuEnum';

import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
import { useTrigger, useDragLine, useSiderEvent } from './useLayoutSider';
import { useAppInject } from '/@/hooks/web/useAppInject';
import { useDesign } from '/@/hooks/web/useDesign';

import DragBar from './DragBar.vue';

export default defineComponent({
    name: 'LayoutSider',
    components: {
        ElAside,
        LayoutMenu,
        DragBar,
    },
    setup() {
        const dragBarRef = ref<ElRef>(null);
        const sideRef = ref<ElRef>(null);
        const {
            getCollapsed,
            getMenuWidth,
            getSplit,
            getMenuTheme,
            getRealWidth,
            getMenuHidden,
            getMenuFixed,
            getIsMixMode,
        } = useMenuSetting();

        const { prefixCls } = useDesign('layout-sideBar');

        const { getIsMobile } = useAppInject();
        
        const { getTriggerAttr, getShowTrigger } = useTrigger(getIsMobile);

        useDragLine(sideRef, dragBarRef);

        const showClassSideBarRef = computed(() => {
            return unref(getSplit) ? !unref(getMenuHidden) : true;
        });

        const getMode = computed(() => {
            return unref(getSplit) ? MenuModeEnum.INLINE : null;
        });

        const getSplitType = computed(() => {
            return unref(getSplit) ? MenuSplitTyeEnum.LEFT : MenuSplitTyeEnum.NONE;
        });

        const getHiddenDomStyle = computed(
            (): CSSProperties => {
            const width = `${unref(getRealWidth)}px`;
            return {
                width: width,
                overflow: 'hidden',
                flex: `0 0 ${width}`,
                maxWidth: width,
                minWidth: width,
                transition: 'all 0.2s',
            };
            }
        );

        const getSideWidth = computed(
            ():string => {
                console.log(unref(getSideWidth))
                return `${unref(getSideWidth)}px`
        })

        const getSideStyle = computed(
            (): CSSProperties => {
                const width = unref(getMenuWidth)
                return {
                    width: `${width}px !important`
                }
            }
        )

        const getSiderClass = computed(() => {
            return [
            prefixCls,
            `${prefixCls}--${unref(getMenuTheme)}`,
            {
                [`${prefixCls}--fixed`]: unref(getMenuFixed),
                hidden: !unref(showClassSideBarRef),
                [`${prefixCls}--mix`]: unref(getIsMixMode) && !unref(getIsMobile),
            },
            ];
        });
        return {
            sideRef,
            dragBarRef,
            getSideStyle,
            getSideWidth,
            getHiddenDomStyle,
            getMenuFixed,
            getIsMobile,
            getTriggerAttr,
            getShowTrigger,
            showClassSideBarRef,
            getMenuTheme,
            getMode,
            getSplitType,
            getSiderClass,
            getMenuWidth,
            getCollapsed,
        }
    }
})
</script>

<style lang="scss" scoped>
@import '../../../styles/index.scss';
$layout-sider-prefix-cls: '#{$namespace}-layout-sideBar';

.#{$layout-sider-prefix-cls} {
    z-index: $layout-sider-fixed-z-index;
    background-color: #fff;

    &--light {
        background-color: $sider-dark-lighten-1-bg-color;
    }

    &--dark {
        background-color: $sider-dark-bg-color;
    }

    &--fixed {
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
    }

    &--mix {
      top: 48px;
      height: calc(100% - $header-height);
    }
}


</style>