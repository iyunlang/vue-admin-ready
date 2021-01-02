<template>
    <div
    v-if="getMenuFixed && !getIsMobile"
    :style="getHiddenDomStyle"
    :class="{ hidden: !showClassSideBarRef }"
    >
    </div>
    <ElAside
    :class="getSiderClass"
    :width="`${getMenuWidth}px`"
    >
        <!-- <template #trigger v-if="getShowTrigger">
            <LayoutTrigger />
        </template> -->
        <LayoutMenu :theme="getMenuTheme" :menuMode="getMode" :splitType="getSplitType" />
    </ElAside>
</template>

<script lang="ts">
import { defineComponent, computed, CSSProperties, unref } from 'vue'

import { ElAside } from 'element-plus'

import LayoutMenu from '../menu'

import { MenuModeEnum, MenuSplitTyeEnum } from '/@/enums/menuEnum';

import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
import { useAppInject } from '/@/hooks/web/useAppInject';
import { useDesign } from '/@/hooks/web/useDesign';

export default defineComponent({
    name: 'LayoutSider',
    components: {
        ElAside,
        LayoutMenu,
    },
    setup() {
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

        const getSiderClass = computed(() => {
            return [
            prefixCls,
            `${prefixCls}--${getMenuTheme}`,
            {
                [`${prefixCls}--fixed`]: unref(getMenuFixed),
                hidden: !unref(showClassSideBarRef),
                [`${prefixCls}--mix`]: unref(getIsMixMode) && !unref(getIsMobile),
            },
            ];
        });
        return {
            getHiddenDomStyle,
            getMenuFixed,
            getIsMobile,
            showClassSideBarRef,
            getMenuTheme,
            getMode,
            getSplitType,
            getSiderClass,
            getMenuWidth,
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