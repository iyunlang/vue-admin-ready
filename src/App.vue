<template>
    <AppProvider>
        <router-view />
    </AppProvider>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { AppProvider } from '/@/components/Application'
import { usePermission } from '/@/hooks/web/usePermission';
import { RoleEnum } from '/@/enums/roleEnum';

import { appStore } from '/@/store/modules/app'
import defaultSetting from '/@/settings/projectSetting';
export default defineComponent({
    name: 'App',
    components: {
        AppProvider
    },
    setup() {
        appStore.commitProjectConfigState(defaultSetting);
        const { changeRole } = usePermission();

        changeRole(RoleEnum.SUPER)

        return {}
    }
})
</script>