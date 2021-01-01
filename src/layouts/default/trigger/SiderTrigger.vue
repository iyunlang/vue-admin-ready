<template>
    <i class="el-icon-s-fold" v-if="getCollapsed"></i>
    <i class="el-icon-s-unfold" v-else></i>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';

  export default defineComponent({
    name: 'SiderTrigger',
    setup() {
      const { getCollapsed } = useMenuSetting();
      return { getCollapsed };
    },
  });
</script>
