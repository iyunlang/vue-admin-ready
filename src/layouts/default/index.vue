<template>
    <ElContainer>
      <LayoutFeatures />
      <LayoutHeader fixed />
      <ElContainer>
        <LayoutSider v-if="getShowSidebar || getIsMobile"></LayoutSider>
      </ElContainer>
    </ElContainer>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent';
  import { ElContainer } from 'element-plus'

  import LayoutHeader from './header/index.vue';
  import LayoutSider from './sider/index.vue';

  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
  import { useAppInject } from '/@/hooks/web/useAppInject';

  export default defineComponent({
    name: 'DefaultLayout',
    components: {
      ElContainer,
      LayoutFeatures: createAsyncComponent(() => import('/@/layouts/default/feature/index.vue')),
      LayoutHeader,
      LayoutSider,
    },
    setup() {
      const { getIsMobile } = useAppInject();

      const { getShowSidebar, getIsMixSidebar } = useMenuSetting();
      return {
        getIsMobile,
        getShowSidebar,
        getIsMixSidebar,
      };
    },
  });
</script>
