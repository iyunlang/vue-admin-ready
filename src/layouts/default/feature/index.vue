<template>
  <SettingDrawer v-if="getShowSettingButton" />
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent';
  import { useRootSetting } from '/@/hooks/setting/useRootSetting.ts';

  export default defineComponent({
    name: 'LayoutFeatures',
    components: {
      SettingDrawer: createAsyncComponent(() => import('/@/layouts/default/setting/index.vue')),
    },
    setup() {
      const { getShowSettingButton } = useRootSetting();
      return {
        getShowSettingButton
      };
    },
  });
</script>
