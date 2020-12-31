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

  &__img {
    width: 40px;
    height: 40px;
    float: left;
  }

  &__title {

  }
}

</style>