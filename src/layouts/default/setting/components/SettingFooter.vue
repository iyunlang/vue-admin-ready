<template>
  
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { appStore } from '/@/store/modules/app'
import defaultSetting from '/@/settings/projectSetting';

export default defineComponent({
  name: 'SettingFooter',
  setup() {

    function handleResetSetting() {
      try {
        appStore.commitProjectConfigState(defaultSetting);
        // const { colorWeak, grayMode } = defaultSetting;
        // updateTheme(themeColor);
        // updateColorWeak(colorWeak);
        // updateGrayMode(grayMode);
        // createMessage.success(t('layout.setting.resetSuccess'));
      } catch (error) {
        // createMessage.error(error);
      }
    }

    return {
      handleResetSetting,
    }
  }
})
</script>