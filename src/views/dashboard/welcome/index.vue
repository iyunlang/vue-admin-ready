<template>
  <div class="welcome">
    <h1>
      欢迎来到 admin-ready
    </h1>

    <p class="sub-content">此网站为管理后台前端界面解决方案，涉及的功能有动态路由，主题设置，路由权限，登录拦截。</p>
    <p class="sub-content"><el-link type="success">响应式、多主题、国际化</el-link>   针对不同屏幕大小设计、多主题满足多样化的品牌诉求</p>

    <p class="sub-content">
      <span>github</span>
      <el-link type="success" href="https://github.com/iyunlang/vue-admin-ready">https://github.com/iyunlang/vue-admin-ready</el-link>
    </p>

    <p class="sub-content">
      <span>技术栈</span>
      <el-tag
        v-for="item in codes"
        :key="item.label"
        type="success"
        effect="plain">
        {{ item.label }}
      </el-tag>
    </p>

    <p class="sub-content">
      <span>框架或插件</span>
      <el-tag
      v-for="item in frameOrPlugin"
      :key="item.label"
      type="success"
      effect="plain">
      {{ item.label }}
    </el-tag>
    </p>


    <el-divider></el-divider>
    <el-row class="code-list" :gutter="20">
      <el-col :span="6" v-for="item in images" :key="item">
        <el-image
          style="width: 100px; height: 100px"
          :src="item.src"
          fit="contain"></el-image>
          <p class="code-sub">{{item.text}}</p>
      </el-col>
    </el-row>

  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { ElImage, ElRow, ElCol, ElDivider, ElTag, ElLink } from 'element-plus';
  export default defineComponent({
    name: 'Welcome',
    components: { ElImage, ElRow, ElCol, ElDivider, ElTag, ElLink },
    data() {
      return {
        images: [
          { text: '欢迎添加QQ群：一起学习前端', src: '/@/assets/images/code.png' }
        ],
        codes: [
          { label: 'Vue3' },
          { label: 'Typescript' },
          { label: 'Vuex' },
          { label: 'Vite' },
          { label: 'Sass' },
        ],
        frameOrPlugin: [
          { label: 'Element-plus' },
          { label: 'SortableJs' },
        ]
      }
    }
  });
</script>
<style lang="scss" scoped>
  .welcome {
      font-size: 16px;
    h1 {
      font-size: 24px;
      text-align: center;
      font-weight: bold;
      color: #333;
    }
    .code-list {
      text-align: center;
    }
    .el-link, .el-tag {
      margin-left: 12px;
    }
    .sub-content {
      margin-top: 16px;
    }
  }
</style>
