<template>
    <span :class="`${prefixCls}-wrapper`">
        <Icon v-if="getIcon" :icon="getIcon" :class="`${prefixCls}-wrapper__icon`" />
        <span :class="getNameClass">
            {{ getI18nName }}
            <MenuItemTag v-bind="$props" />
        </span>
    </span>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import Icon from '/@/components/Icon/index';
import MenuItemTag from './MenuItemTag.vue';

import { useDesign } from '/@/hooks/web/useDesign';
import { useI18n } from '/@/hooks/web/useI18n';

import { contentProps } from '../props';
const { t } = useI18n();

export default defineComponent({
    name: 'MenuItemContent',
    components: {
        Icon,
        MenuItemTag,
    },
    props: contentProps,
    setup( props ) {
        const { prefixCls } = useDesign('basic-menu-item-content');

        const getI18nName = computed(() => t(props.item?.name));

        const getIcon = computed(() => props.item?.icon);

        const getNameClass = computed(() => {
            const { showTitle } = props;
            return { [`${prefixCls}--show-title`]: showTitle, [`${prefixCls}-wrapper__name`]: !showTitle };
        });
    
        return {
            prefixCls,
            getIcon,
            getNameClass,
            getI18nName,
        }
    }
})
</script>