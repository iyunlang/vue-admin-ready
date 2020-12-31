<template>
    <ElContainer>
      <LayoutFeatures />
      <LayoutHeader />
    </ElContainer>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent';
  import { ElContainer } from 'element-plus'

  import LayoutHeader from './header/index.vue';

  export default defineComponent({
    name: 'DefaultLayout',
    components: {
      ElContainer,
      LayoutFeatures: createAsyncComponent(() => import('/@/layouts/default/feature/index.vue')),
      LayoutHeader,
    },
    setup() {

      return {

      };
    },
  });
</script>
