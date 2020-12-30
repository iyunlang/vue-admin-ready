<template>
  <SettingDrawer @register="register" />
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import SettingDrawer from './SettingDrawer';

  import { useDrawer } from '/@/components/Drawer';
  
  export default defineComponent({
    name: 'LayoutSetting',
    components: {
      SettingDrawer
    },
    setup() {
      const [register, { openDrawer }] = useDrawer();

      return {
        register,
        openDrawer,
      };
    },
  });
</script>
