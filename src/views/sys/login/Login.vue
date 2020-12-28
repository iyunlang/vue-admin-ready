<template>
  <div class="login">
    <div class="login-warp">
      <div class="form-row">
        <el-input
          size="medium"
          placeholder="请输入管理员"
          v-model="username">
          <template #prefix>
            <!-- <i class="el-input__icon el-icon-search"></i> -->
            <i class="iconfont icon-yonghuming"></i>
          </template>
        </el-input>
      </div>
      <div class="form-row">
        <el-input
          size="medium"
          type="password"
          placeholder="请输入6位密码"
          v-model="username">
          <template #prefix>
            <i class="el-input__icon el-icon-search"></i>
          </template>
        </el-input>
      </div>
      <div class="form-row">
        <el-button type="primary">登录</el-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    components: {
      
    },
    setup() {
      return {}
    },
  });
</script>
<style lang="scss" scope>
.iconfont {
  color: #1A5BA4;
}
.login-warp {
  position: absolute;
  padding-top: 60px;
  padding-bottom: 70px;
  width: 220px;
  .form-row {
    margin-bottom: 20px;
    width: 100%;
    .el-input {
      width: 100%;
      height: 46px;
      .el-input__inner {
        height: 100%;
      }
    }
    .el-button {
      width: 100%;
      height: 50px;
      font-size: 18px;
      letter-spacing: 6px;
    }
  }
}
</style>
