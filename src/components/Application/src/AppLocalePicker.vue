<template>
    <ElDropdown :class="[theme]">
        <span class="el-dropdown-link">
            {{getLangText}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <template #dropdown>
            <ElDropdownMenu>
                <ElDropdownItem 
                v-for="(item, index) in localeList" 
                :key="item"
                :index="index"
                @click="handleMenuItemClick(item)"
                >
                {{item.text}}
                </ElDropdownItem>
            </ElDropdownMenu>
        </template>
    </ElDropdown>
</template>

<script lang="ts">
import { defineComponent, toRefs, ref, computed, watchEffect, unref } from 'vue'
import { ElDropdown, ElDropdownItem, ElDropdownMenu } from 'element-plus'

import type { DropMenu } from '/@/components/Dropdown';

import { propTypes } from '/@/utils/propTypes';
import { LocaleType } from '/@/locales/types';

import { useDesign } from '/@/hooks/web/useDesign';
import { useLocale } from '/@/hooks/web/useLocale';
import { useLocaleSetting } from '/@/hooks/setting/useLocaleSetting';

export default defineComponent({
    name: 'AppLocalePicker',
    components: { ElDropdown, ElDropdownItem, ElDropdownMenu },
    props: {
      // Whether to display text
      showText: propTypes.bool.def(true),
      // Whether to refresh the interface when changing
      reload: propTypes.bool,
      theme: propTypes.oneOf(['light', 'dark']),
    },
    setup(props) {
        const selectedKeys = ref<string[]>([]);

        const { prefixCls } = useDesign('app-locale-picker');

        const { localeList } = useLocaleSetting();


        const { changeLocale, getLang } = useLocale();

        const getLangText = computed(() => {
            const key = selectedKeys.value[0];
            if (!key) return '';
            return localeList.find((item) => item.event === key)?.text;
        });

        console.log(unref(localeList))
        console.log(getLangText)

        watchEffect(() => {
            selectedKeys.value = [unref(getLang)];
        });

        function toggleLocale(lang: LocaleType | string) {
            changeLocale(lang as LocaleType);
            selectedKeys.value = [lang as string];
            props.reload && location.reload();
        }

        function handleMenuItemClick(lang: DropMenu) {
            toggleLocale(lang.event as LocaleType)
        }

        return {
            prefixCls,
            localeList,
            handleMenuItemClick,
            getLangText,
        }
    }
})
</script>

<style lang="scss">
.el-dropdown {

    &.light {
        color: #000;
        [class^=el-icon-] {
            color: #000;
        }
    }

    &.dark {
        color: #fff;
        [class^=el-icon-] {
            color: #fff;
        }
    }
}
</style>