<template>
  
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { registerGlobalCom } from '/@/components/registerGlobalCom'
export default defineComponent({
  name: 'DefaultLayout',
  components: {

  },
  setup() {
    registerGlobalCom()
    return {

    }
  }
})
</script>