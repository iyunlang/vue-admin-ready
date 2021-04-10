<template>
    <div>
        <el-form ref="form" :model="postForm" class="demo-dynamic" size="small">

            <el-form-item style="margin-bottom: 20px;">
                <el-row :gutter="24">
                    <el-col :span="18">
                        <el-input v-model="postForm.title" placeholder="请输文章标题" />
                    </el-col>
                    <el-col :span="6">
                        <el-button @click="submit" type="primary" style="min-width: 100px">提交</el-button>
                    </el-col>
                </el-row>
            </el-form-item>

            <el-form-item style="margin-bottom: 30px;">
                <Tinymce ref="editor" v-model="postForm.content" @input="handleInput" :height="400" />
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

import { defineComponent, reactive, unref } from 'vue'

import { ElCol, ElRow } from 'element-plus'

import Tinymce from '/@/components/Tinymce/index.vue';

  export default defineComponent({
    name: 'ArticleDetail',
    components: { 
        ElCol,
        ElRow,
        Tinymce
    },
    setup() {
        const postForm = reactive({
            title: "",
            content: "",
        })

        function submit() {
            console.log("提交")
            console.log(unref(postForm))
        }

        function handleInput(content) {
            postForm.content = content
        }

        return {
            postForm,
            submit,
            handleInput,
        }
    }
  })
</script>

