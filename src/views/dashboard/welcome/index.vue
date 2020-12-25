<template>
  <div class="welcome">
    <p>welcome</p>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'Welcome',
    // components: { House },
  });
</script>
<style lang="scss" scoped>
  .welcome {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
  }
</style>
