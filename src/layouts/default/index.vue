<template>
    <ElContainer :class="prefixCls">
      <LayoutFeatures />
      <LayoutHeader fixed />
      <ElContainer>
        <LayoutSider v-if="getShowSidebar || getIsMobile"></LayoutSider>
        <ElContainer :class="`${prefixCls}__main`">
          <LayoutMultipleHeader />
          <LayoutContent />
        </ElContainer>
      </ElContainer>
    </ElContainer>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent';
  import { ElContainer } from 'element-plus'

  import LayoutHeader from './header/index.vue';
  import LayoutSider from './sider/index.vue';
  import LayoutContent from './content/index.vue';
  import LayoutMultipleHeader from './header/MultipleHeader.vue';

  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
  import { useAppInject } from '/@/hooks/web/useAppInject';
  import { useDesign } from '/@/hooks/web/useDesign';

  export default defineComponent({
    name: 'DefaultLayout',
    components: {
      ElContainer,
      LayoutFeatures: createAsyncComponent(() => import('/@/layouts/default/feature/index.vue')),
      LayoutHeader,
      LayoutSider,
      LayoutContent,
      LayoutMultipleHeader,
    },
    setup() {
      const { prefixCls } = useDesign('default-layout');

      const { getIsMobile } = useAppInject();

      const { getShowSidebar, getIsMixSidebar } = useMenuSetting();
      return {
        prefixCls,
        getIsMobile,
        getShowSidebar,
        getIsMixSidebar,
      };
    },
  });
</script>

<style lang="scss" scoped>
@import '../../styles/index.scss';
$prefix-cls: '#{$namespace}-default-layout';

  .#{$prefix-cls} {
    display: flex;
    width: 100%;
    min-height: 100%;
    background: $content-bg;
    flex-direction: column;

    > .ant-layout {
      min-height: 100%;
    }

    &__main {
      margin-left: 1px;
      display: block;
    }
  }
</style>
