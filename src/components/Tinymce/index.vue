<template>
  <div :class="{fullscreen:fullscreen}" class="tinymce-container" :style="{width:getContainerWidth}">
    <textarea :id="tinymceId" class="tinymce-textarea" />
    <!-- <div class="editor-custom-btn-container">
      <editorImage color="#1890ff" class="editor-upload-btn" @successCBK="imageSuccessCBK" />
    </div> -->
  </div>
</template>

<script>
/**
 * docs:
 * https://panjiachen.github.io/vue-element-admin-site/feature/component/rich-editor.html#tinymce
 */
import { defineComponent, reactive, computed, watch, onMounted, nextTick, ref } from 'vue'

import { ElMessage } from 'element-plus'

// import editorImage from './components/EditorImage'
import plugins from './plugins'
import toolbar from './toolbar'
import load from './dynamicLoadScript'

// why use this cdn, detail see https://github.com/PanJiaChen/tinymce-all-in-one
const tinymceCDN = 'https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js'

export default defineComponent({
  name: 'Tinymce',
  // components: { editorImage },
  props: {
    id: {
      type: String,
      default: function() {
        return 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
      }
    },
    value: {
      type: String,
      default: ''
    },
    toolbar: {
      type: Array,
      required: false,
      default() {
        return []
      }
    },
    menubar: {
      type: String,
      default: 'file edit insert view format table'
    },
    height: {
      type: [Number, String],
      required: false,
      default: 360
    },
    width: {
      type: [Number, String],
      required: false,
      default: 'auto'
    }
  },

  setup(props, { emit }) {
      const hasChange = ref(false);
      const hasInit = ref(false);
      const tinymceId = ref(props.id);
      const fullscreen = ref(false);
      const languageTypeList = reactive({
        'en': 'en',
        'zh': 'zh_CN',
        'es': 'es_MX',
        'ja': 'ja'
      })

      const val = ref(props.value)

      const getContainerWidth = computed(() => {
        const width = props.width
        if (/^[\d]+(\.[\d]+)?$/.test(width)) { // matches `100`, `'100'`
          return `${width}px`
        }
        return width
      })

      watch(val, (val, prevVal) => {
        if (!hasChange.value && hasInit.value) {
          nextTick(() =>
            window.tinymce.get(tinymceId.value).setContent(val || ''))
        }
      })

      onMounted(() => {
        init()
      })

      function init() {
        // dynamic load tinymce from cdn
        load(tinymceCDN, (err) => {
          if (err) {
            ElMessage.error(err.message)
            return
          }
          initTinymce()
        })
      }

      function destroyTinymce() {
        const tinymce = window.tinymce.get(tinymceId.value)
        if (fullscreen.value) {
          tinymce.execCommand('mceFullScreen')
        }

        if (tinymce) {
          tinymce.destroy()
        }
      }
      function setContent(value) {
        window.tinymce.get(tinymceId.value).setContent(value)
      }
      function getContent() {
        window.tinymce.get(tinymceId.value).getContent()
      }
      function imageSuccessCBK(arr) {
        arr.forEach(v => window.tinymce.get(tinymceId.value).insertContent(`<img class="wscnph" src="${v.url}" >`))
      }

      function initTinymce() {
        const _this = this
        window.tinymce.init({
          selector: `#${tinymceId.value}`,
          language: languageTypeList['en'],
          height: props.height,
          body_class: 'panel-body ',
          object_resizing: false,
          toolbar: props.toolbar.length > 0 ? props.toolbar : toolbar,
          menubar: props.menubar,
          plugins: plugins,
          end_container_on_empty_block: true,
          powerpaste_word_import: 'clean',
          code_dialog_height: 450,
          code_dialog_width: 1000,
          advlist_bullet_styles: 'square',
          advlist_number_styles: 'default',
          imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
          default_link_target: '_blank',
          link_title: false,
          nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
          init_instance_callback: editor => {
            if (val.value) {
              editor.setContent(val.value)
            }
            hasInit.value = true
            editor.on('NodeChange Change KeyUp SetContent', () => {
              hasChange.value = true
              emit('input', editor.getContent())
            })
          },
          setup(editor) {
            editor.on('FullscreenStateChanged', (e) => {
              fullscreen.value = e.state
            })
          },
          // it will try to keep these URLs intact
          // https://www.tiny.cloud/docs-3x/reference/configuration/Configuration3x@convert_urls/
          // https://stackoverflow.com/questions/5196205/disable-tinymce-absolute-to-relative-url-conversions
          convert_urls: false
        })
      }


      return {
        hasChange,
        hasInit,
        tinymceId,
        fullscreen,
        languageTypeList,

        getContainerWidth,
      }
  }
})
</script>

<style lang="scss" scoped>
.tinymce-container {
  position: relative;
  line-height: normal;
}

.tinymce-container {
  :deep(.mce-fullscreen) {
      z-index: 10000;
    
  }
}

.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}

.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 4px;
  /*z-index: 2005;*/
}

.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}

.editor-upload-btn {
  display: inline-block;
}
</style>
