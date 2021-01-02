<template>
    <AppProvider>
        <router-view />
    </AppProvider>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue'
import { AppProvider } from '/@/components/Application'

import { usePermission } from '/@/hooks/web/usePermission';
import { useLocale } from '/@/hooks/web/useLocale';

import { RoleEnum } from '/@/enums/roleEnum';

import { appStore } from '/@/store/modules/app'

import defaultSetting from '/@/settings/projectSetting';

import { getConfigProvider, initAppConfigStore } from '/@/setup/App';

const { elemPlusConfigLocale } = useLocale();

export default defineComponent({
    name: 'App',
    components: {
        AppProvider
    },
    setup() {

        initAppConfigStore()

        const { transformCellText } = getConfigProvider();

        appStore.commitProjectConfigState(defaultSetting);
        const { changeRole } = usePermission();

        console.log(4, elemPlusConfigLocale)

        changeRole(RoleEnum.SUPER)

        return {
            transformCellText,
            elemPlusConfigLocale,
        }
    }
})
</script>