<template>
  <div class="login">
    <div class="login-container">
      <div class="login-text">
        <p class="hello">欢迎来到</p>
        <h1 class="title">vue-admin-ready</h1>
      </div>
      <div class="login-warp">
        <el-form :model="formData" :rules="formRules" ref="formRef">
          <el-form-item name="username">
            <el-input
              size="medium"
              placeholder="请输入管理员"
              v-model="formData.username">
              <template #prefix>
                <i class="el-input__icon iconfont icon-icon-test25"></i>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item name="password">
            <el-input
              size="medium"
              type="password"
              placeholder="请输入6位密码"
              v-model="formData.password">
              <template #prefix>
                <i class="el-input__icon iconfont icon-icon-test23"></i>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, reactive, unref, ref, toRaw } from 'vue';

  import { userStore } from '/@/store/modules/user';

  export default defineComponent({
    components: {
      
    },
    data() {
      return {
        user: {
          username: '',
          password: ''
        }
      }
    },
    setup() {
      const formRef = ref<any>(null);
      const autoLoginRef = ref(false);

      const formData = reactive({
        username: 'admin',
        password: '123456',
      });

      const formState = reactive({
        loading: false,
      });

      const formRules = reactive({
        account: [{ required: true, message: '', trigger: 'blur' }],
        password: [
          { required: true, message: '', trigger: 'blur' },
        ],
      });

      async function handleLogin() {
        const form = unref(formRef);
        // if(!form) return; 
        formState.loading = true;
        try {
          // const data = await form.validate();
          const userInfo = await userStore.login(
            toRaw({
              password: formData.password,
              username: formData.username,
            })
          );
        } catch (error) {
        } finally {
          // resetVerify();
          formState.loading = false;
        }
      }

      return {
        formData,
        formRules,
        handleLogin,
        formState,
        login: handleLogin,
        autoLogin: autoLoginRef,
      }
    },
  });
</script>
<style lang="scss" scope>
@import '../../../styles/var/index.scss';
.iconfont {
  color: #1A5BA4;
}
.login {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  box-sizing: border-box;
  border: 1px solid transparent;
  background: $login-bg;

  &-container {
    text-align: center;
    max-width: 1200px;
    margin: 0 auto;
    padding-top: 120px;

    .login-text {
      float: left;
      overflow: hidden;
      margin-left: 50px;

      .title {
        color: #fff;
        font-size: 35px;
      }
      .hello {
        color: $login-hello;
        font-size: 22px;
        margin-top: 80px;
      }
    }
    .login-warp {
      float: right;
      overflow: hidden;
      margin-right: 50px;
      width: 390px;
      background-color: #fff;
      border-radius: 6px;

      .el-form {
        padding: 30px 30px 24px 24px;

        .el-button {
          width: 100%;
        }
      }
    }
  }
}

@media screen and (max-width: 968px){
  .login {
    &-container {
      .login-text {
        display: none;
      }
      .login-warp {
        margin: 0;
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
}

@media screen and (max-width: 425px){
  .login {
    &-container {
      .login-text {
        display: none;
      }
      .login-warp {
        margin: 0;
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 90%;
      }
    }
  }
}
</style>
