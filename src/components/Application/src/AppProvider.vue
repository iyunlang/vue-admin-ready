<template>
    <slot />
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent, toRefs, ref } from 'vue'

import { createAppProviderContext } from './useAppContext';

import designSetting from '/@/settings/designSetting.ts';
import { createBreakpointListen } from '/@/hooks/event/useBreakpoint.ts';
export default defineComponent({
    name: 'Application',
    inheritAttrs: false,
    props: {
        prefixCls: {
            type: String as PropType<string>,
            default: designSetting.prefixCls,
        },
    },
    setup(props) {
        const isMobileRef = ref(false);
        const { prefixCls } = toRefs(props);
        createBreakpointListen(({ screenMap, sizeEnum, width }) => {
            const lgWidth = screenMap.get(sizeEnum.LG);
            if (lgWidth) {
            isMobileRef.value = width.value - 1 < lgWidth;
            }
        });
        createAppProviderContext({ prefixCls, isMobile: isMobileRef });
        return {}
    }
})
</script>