<template>
  <div 
  :class="[prefixCls, theme]"
  @click="handleGoHome"
  >
    <img 
      :class="[`${prefixCls}__img`]"
      src="/@/assets/images/logo.png" alt=""
    />
    <div 
    :class="`${prefixCls}__title`"
    v-if="showTitle"
    >
      {{title}}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { useGlobSetting } from '/@/hooks/setting';
import { useDesign } from '/@/hooks/web/useDesign.ts'
import { useGo } from '/@/hooks/web/usePage';

import { PageEnum } from '/@/enums/pageEnum';

import { propTypes } from '/@/utils/propTypes';

export default defineComponent({
  name: 'AppLogo',
  props: {
        /**
     * The theme of the current parent component
     */
    theme: propTypes.oneOf(['light', 'dark']),
    // Whether to show title
    showTitle: propTypes.bool.def(true),
  },
  setup() {

    const { prefixCls } = useDesign('app-logo')

    const { title } = useGlobSetting();

    const go = useGo();

    function handleGoHome(): void {
      go(PageEnum.BASE_HOME);
    }

    return {
      handleGoHome,
      prefixCls,
      title,
    }
  }
})
</script>

<style lang="scss" scoped>
@import '../../../styles/index.scss';
$prefix-cls: '#{$namespace}-app-logo';

.#{$prefix-cls} {
  display: flex;
  align-items: center;
  max-height: 60px;
  padding-left: 7px;
  cursor: pointer;

  &__img {
    width: 32px;
    height: 32px;
  }

  &.light {
    border-bottom: 1px solid $header-light-bottom-border-color;
  }

  &.light &__title {
    color: $primary-color;
  }

  &.dark &__title {
    color: $white;
  }

  &__title {
    font-size: 16px;
    font-weight: 700;
    opacity: 0;
    transition: all 0.5s;

    @include small() {
      opacity: 1;
    }
  }
}

</style>