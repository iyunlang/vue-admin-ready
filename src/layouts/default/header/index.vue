<template>
  <Header :class="getHeaderClass">
    <div :class="`${prefixCls}-left`">
      <AppLogo/>
    </div>
    <div :class="`${prefixCls}-menu`">

    </div>
    <div :class="`${prefixCls}-action`">

    </div>
  </Header>
</template>

<script lang="ts">
import { defineComponent, computed, unref } from 'vue'
import { ElHeader } from 'element-plus'

import { propTypes } from '/@/utils/propTypes';

import { AppLogo } from '/@/components/Application'

import { useDesign } from '/@/hooks/web/useDesign.ts';
import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting.ts';
import { useAppInject } from '/@/hooks/web/useAppInject.ts';

export default defineComponent({
  name: 'LayoutHeader',
  components: {
    Header: ElHeader,
    AppLogo,
  },
  props: {
    fixed: propTypes.bool,
  },
  setup(props) {
    const { prefixCls } = useDesign('layout-header');

    const {
      getHeaderTheme,
    } = useHeaderSetting();

    const { getIsMobile } = useAppInject();

    const getHeaderClass = computed(() => {
      const theme = unref(getHeaderTheme)
      console.log('theme', theme)
      return [
        prefixCls,
        {
          [`${prefixCls}--fixed`]: props.fixed,
          [`${prefixCls}--mobile`]: unref(getIsMobile),
          [`${prefixCls}--${theme}`]: theme,
        }
      ]
    })

    return {
      prefixCls,
      getHeaderClass,
    }
  }
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>