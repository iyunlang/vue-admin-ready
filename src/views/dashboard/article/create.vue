<template>
    <div>

  <article-detail :is-edit="false" />
    </div>
</template>

<script>

import { defineComponent } from 'vue'
import ArticleDetail from './components/ArticleDetail.vue'

  export default defineComponent({
    name: 'ArticleCreate',
    components: { ArticleDetail },
  })
</script>

