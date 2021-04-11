<template>
  <div :class="getWrapClass">
    <ElTabs 
    v-model="activeKeyRef" 
    type="card" 
    tab-position="top" 
     
    scrollable 
    closable 
    @tab-click="handleChange"
    @tab-remove="handleRemove"
    :class="[`${getMenuTheme}`]"
    >
      <ElTabPane
        v-for="item in getTabsState"
        :key="item.path"
        :name="item.path"
      >
        <template #label>
          <TabContent :tabItem="item" />
        </template>
      </ElTabPane>
    </ElTabs>
  </div>
</template>
<script lang="ts">
  import { defineComponent, computed, unref, ref } from 'vue';

  import { ElTabs, ElTabPane } from 'element-plus';
  import TabContent from './components/TabContent.vue';

  import { useGo } from '/@/hooks/web/usePage';

  import { tabStore } from '/@/store/modules/tab';
  import { userStore } from '/@/store/modules/user';

  import { initAffixTabs, useTabsDrag } from './useMultipleTabs';
  import { REDIRECT_NAME } from '/@/router/constant';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent';
  import { listenerLastChangeTab } from '/@/logics/mitt/tabChange';
  import { useMultipleTabSetting } from '/@/hooks/setting/useMultipleTabSetting';
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';

  export default defineComponent({
    name: 'MultipleTabs',
    components: {
      QuickButton: createAsyncComponent(() => import('./components/QuickButton.vue')),
      ElTabs,
      ElTabPane,
      TabContent,
    },
    setup() {
      const affixTextList = initAffixTabs();
      const activeKeyRef = ref('');
      const go = useGo();

      useTabsDrag(affixTextList);
      
      const { getMenuTheme } = useMenuSetting()
      const { prefixCls } = useDesign('multiple-tabs');
      const { getShowQuick, getShowRedo } = useMultipleTabSetting();

      console.log('复杂导航', tabStore.getTabsState)

      const getTabsState = computed(() => tabStore.getTabsState);

      const unClose = computed(() => unref(getTabsState).length === 1);

      const getWrapClass = computed(() => {
        return [
          prefixCls,
          {
            [`${prefixCls}--hide-close`]: unref(unClose),
          },
        ];
      });

      listenerLastChangeTab((route) => {
        const { name } = route;
        // 登录验证
        // if (name === REDIRECT_NAME || !route || !userStore.getTokenState) return;
        // 没有登录验证
        if (name === REDIRECT_NAME || !route ) return;

        const { path, fullPath } = route;
        const p = fullPath || path;

        if (activeKeyRef.value !== p) {
          activeKeyRef.value = p;
        }
        
        tabStore.addTabAction(unref(route));
      });

      function handleChange(targetName: any) {
        activeKeyRef.value = targetName.props.name;
        go(targetName.props.name, false);
        // tabStore.closeTabByKeyAction(targetName.props.name)
      }

      function handleRemove(tabName: any) {
        console.log(tabName, unref(unClose))
        if (unref(unClose)) return;
        tabStore.closeTabByKeyAction(tabName);
      }

      return {
        getMenuTheme,
        prefixCls,
        unClose,
        getWrapClass,
        handleChange,
        activeKeyRef,
        getTabsState,
        getShowQuick,
        getShowRedo,
        handleRemove,
      };
    },
  });
</script>
<style lang="scss">
  @import './index.scss';
</style>
