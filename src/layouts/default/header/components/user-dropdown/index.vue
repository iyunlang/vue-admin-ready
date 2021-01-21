<template>
    <ElDropdown :class="`${prefixCls}-overlay`">
      <div :class="[prefixCls, `${prefixCls}--${theme}`]">
        <ElAvatar :class="[`${prefixCls}__avatar`]" :size="getAvatarSize" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></ElAvatar>
        <span :class="[`${prefixCls}__name`]">super admin</span>
      </div>
      <template #dropdown>
        <ElDropdownMenu>
          <ElDropdownItem icon="el-icon-switch-button">退出</ElDropdownItem>
        </ElDropdownMenu>
      </template>
    </ElDropdown>
</template>

<script lang="ts">
import { computed, defineComponent, unref } from 'vue';

import { ElDropdown, ElDropdownMenu, ElDropdownItem, ElAvatar } from 'element-plus';

import { useDesign } from '/@/hooks/web/useDesign';
import { useAppInject } from '/@/hooks/web/useAppInject';

import { propTypes } from '/@/utils/propTypes';

export default defineComponent({
    name: 'UserDropdown',
    components: {
        ElDropdown,
        ElDropdownMenu,
        ElDropdownItem,
        ElAvatar,
    },
    props: {
      theme: propTypes.oneOf(['dark', 'light']),
    },
    setup() {
        const { prefixCls } = useDesign('header-user-dropdown');

        const { getIsMobile } = useAppInject();

        const getAvatarSize = computed(() => !unref(getIsMobile) ? 'medium': 'small')

        return {
            prefixCls,
            getAvatarSize,
        }
    }
})
</script>

<style lang="scss" scoped>
@import '../../../../../styles/index.scss';
$prefix-cls: '#{$namespace}-header-user-dropdown';
$prefix-cls-overlay: '#{$namespace}-header-user-dropdown-overlay';

.#{$prefix-cls} {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 10px;

    &__avatar {
        margin-right: 6px;
    }

    &--light {
        .#{$prefix-cls}__name {
            color: $text-color-base;
        }
    }

    &--dark {
        .#{$prefix-cls}__name {
            color: $white;
        }
    }

}
.#{$prefix-cls-overlay} {
    height: 100%;
}
</style>