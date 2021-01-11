<template>
    <el-tooltip effect="dark" :content="getTitle" placement="bottom">
      <span @click="toggleFullscreen">
          <i class="iconfont icon-fullscreen" v-if="!isFullscreen"></i>
          <i class="iconfont icon-exit-fullscreen" v-else></i>
      </span>
    </el-tooltip>
</template>

<script lang="ts">
import { defineComponent, computed, unref } from 'vue'
import { ElTooltip } from 'element-plus'

import { useI18n } from '/@/hooks/web/useI18n';
import { useFullscreen } from '/@/hooks/web/useFullScreen';

export default defineComponent({
    name: 'FullScreen',
    components: {
        ElTooltip,
    },
    setup() {
        const { t } = useI18n();
        const { toggleFullscreen, isFullscreenRef } = useFullscreen();

        const getTitle = computed(() => {
            return unref(isFullscreenRef)
            ? t('layout.header.tooltipExitFull')
            : t('layout.header.tooltipEntryFull');
        });

        return {
            toggleFullscreen,
            isFullscreen: isFullscreenRef,
            getTitle,
        }
    }
})
</script>

<style lang="scss" scoped>
.iconfont {
    display: inline-block;
    font-size: 26px;
}
</style>