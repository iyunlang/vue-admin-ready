<template>
  <span :class="[prefixCls, theme]" @click="toggleCollapsed">
    <i class="el-icon-s-fold" v-if="getCollapsed"></i>
    <i class="el-icon-s-unfold" v-else></i>
  </span>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { propTypes } from '/@/utils/propTypes';

  export default defineComponent({
    name: 'SiderTrigger',
    props: {
      theme: propTypes.oneOf(['light', 'dark']),
    },
    setup() {
      const { getCollapsed, toggleCollapsed } = useMenuSetting();
      const { prefixCls } = useDesign('layout-header-trigger');
      return { getCollapsed, toggleCollapsed, prefixCls };
    },
  });
</script>
