<template>
  <div @click="openDrawer" :class="prefixCls">
    <i class="el-icon-setting"/>
    <teleport to="body">
      <SettingDrawer @register="register"/>
    </teleport>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import SettingDrawer from './SettingDrawer.tsx';

  import { useDrawer } from '/@/components/Drawer';
  import { useDesign } from '/@/hooks/web/useDesign';
  
  export default defineComponent({
    name: 'SettingButton',
    components: {
      SettingDrawer,
    },
    setup() {
      const [register, { openDrawer }] = useDrawer();

      const { prefixCls } = useDesign('setting-button');

      return {
        register,
        openDrawer,
        prefixCls,
      };
    },
  });
</script>

<style lang="scss" scoped>
  @import '../../../styles/index.scss';
  $prefix-cls: '#{$namespace}-setting-button';

  .#{$prefix-cls} {
    position: absolute;
    top: 45%;
    right: 0;
    z-index: 10;
    display: flex;
    padding: 10px;
    color: $white;
    cursor: pointer;
    background: $primary-color;
    border-radius: 6px 0 0 6px;
    justify-content: center;
    align-items: center;

    .el-icon-setting {
      color: #fff;
    }
    svg {
      width: 1em;
      height: 1em;
    }
  }
</style>
