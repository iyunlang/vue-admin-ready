<template>
  <Header :class="getHeaderClass" :height="`${getHeaderHeight}px`">
    <div :class="`${prefixCls}-left`">
      <AppLogo 
      :theme="getHeaderTheme"
      :class="`${prefixCls}-logo`"
      :style="getLogoWidth"
      />
      <LayoutTrigger
      v-if="
        (getShowContent && getShowHeaderTrigger && !getSplit && !getIsMixSidebar) || getIsMobile
      "
      :theme="getHeaderTheme"
      :sider="false"
      />
    </div>
    <div :class="`${prefixCls}-menu`">

    </div>
    <div :class="`${prefixCls}-action`">

      <FullScreen v-if="getShowFullScreen" :class="`${prefixCls}-action__item fullscreen-item`"/>

      <UserDropDown :theme="getHeaderTheme"/>

      <AppLocalePicker :theme="getHeaderTheme" :class="`${prefixCls}-action__item`"/>

    </div>
  </Header>
</template>

<script lang="ts">
import { defineComponent, computed, unref } from 'vue'
import { ElHeader } from 'element-plus'

import { propTypes } from '/@/utils/propTypes';

import LayoutTrigger from '../trigger/index.vue';
import { AppLogo, AppLocalePicker } from '/@/components/Application'
import { UserDropDown, FullScreen } from './components'

import { useDesign } from '/@/hooks/web/useDesign.ts';
import { useAppInject } from '/@/hooks/web/useAppInject.ts';
import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting.ts';
import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';

import { MenuModeEnum, MenuSplitTyeEnum } from '/@/enums/menuEnum';

export default defineComponent({
  name: 'LayoutHeader',
  components: {
    Header: ElHeader,
    AppLogo,
    UserDropDown,
    LayoutTrigger,
    AppLocalePicker,
    FullScreen,
  },
  props: {
    fixed: propTypes.bool,
  },
  setup(props) {
    const { prefixCls } = useDesign('layout-header');
    const {
      getShowTopMenu,
      getShowHeaderTrigger,
      getSplit,
      getIsMixMode,
      getMenuWidth,
      getIsMixSidebar,
    } = useMenuSetting();
    const {
      getHeaderHeight,
      getHeaderTheme,
      getShowContent,
      getShowFullScreen,
    } = useHeaderSetting();

    const { getIsMobile } = useAppInject();

    const getHeaderClass = computed(() => {
      const theme = unref(getHeaderTheme)
      return [
        prefixCls,
        {
          [`${prefixCls}--fixed`]: props.fixed,
          [`${prefixCls}--mobile`]: unref(getIsMobile),
          [`${prefixCls}--${theme}`]: theme,
        }
      ]
    })

    const getLogoWidth = computed(() => {
      if (!unref(getIsMixMode)) {
        return {};
      }
      const width = unref(getMenuWidth) < 180 ? 180 : unref(getMenuWidth);
      return { width: `${width}px` };
    });

    const getSplitType = computed(() => {
      return unref(getSplit) ? MenuSplitTyeEnum.TOP : MenuSplitTyeEnum.NONE;
    });

    const getMenuMode = computed(() => {
      return unref(getSplit) ? MenuModeEnum.HORIZONTAL : null;
    });

    return {
      prefixCls,
      getHeaderClass,
      getHeaderTheme,
      getShowContent,
      getShowHeaderTrigger,
      getSplitType,
      getSplit,
      getIsMixSidebar,
      getIsMobile,
      getLogoWidth,
      getShowTopMenu,
      getMenuMode,
      getHeaderHeight,
      getShowFullScreen,
    }
  }
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>