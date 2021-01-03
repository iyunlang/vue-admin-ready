<template>
  <div :class="getWrapClass">
    <ElTabs 
    v-model="activeKeyRef.name" 
    type="card" 
    tab-position="top" 
    addable 
    scrollable 
    closable 
    @tab-remove="removeTab"
    >
      <ElTabPane
        v-for="item in getTabsState"
        :key="item.name"
        :name="item.name"
      >
        <template #label>
          <TabContent :tabItem="item" />
        </template>
      </ElTabPane>
    </ElTabs>

    <!-- <ElTabs
      type="border-card"
      :value="activeKeyRef"
      :stretch="true"
      :addable="true"
      :closable="true"
      :editable="true"
      @tab-click="handleChange"
      @tab-add="handleChange"
      @edit="handleEdit"
    >
      <template v-for="item in getTabsState" :key="item.query ? item.fullPath : item.path">
        <ElTabPane :name="key" :closable="!(item && item.meta && item.meta.affix)">
              {{item.name}}

          <template #tab>
            <TabContent :tabItem="item" />
          </template>
        </ElTabPane>
      </template>

      <template #tabBarExtraContent v-if="getShowRedo || getShowQuick">
        <TabRedo v-if="getShowRedo" />
        <QuickButton v-if="getShowQuick" />
      </template>
    </ElTabs> -->
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

  export default defineComponent({
    name: 'MultipleTabs',
    components: {
      QuickButton: createAsyncComponent(() => import('./components/QuickButton.vue')),
      TabRedo: createAsyncComponent(() => import('./components/TabRedo.vue')),
      ElTabs,
      ElTabPane,
      TabContent,
    },
    setup() {
      const affixTextList = initAffixTabs();
      const activeKeyRef = ref('');
      const go = useGo();

      useTabsDrag(affixTextList);
      
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

      function handleChange(activeKey: any) {
        activeKeyRef.value = activeKey;
        go(activeKey, false);
      }

      // Close the current tab
      function handleEdit(targetKey: string) {
        // Added operation to hide, currently only use delete operation
        if (unref(unClose)) return;

        tabStore.closeTabByKeyAction(targetKey);
      }

      function removeTab(tabName: string) {
        console.log(unref(unClose), tabName)
        if (unref(unClose)) return;

        tabStore.closeTabByKeyAction(tabName);
      }

      return {
        prefixCls,
        unClose,
        getWrapClass,
        handleEdit,
        handleChange,
        activeKeyRef,
        getTabsState,
        getShowQuick,
        getShowRedo,
        removeTab,
      };
    },
  });
</script>
<style lang="scss">
  @import './index.scss';
</style>
