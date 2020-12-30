import { defineComponent, computed, unref } from 'vue';
import { BasicDrawer } from '/@/components/Drawer/index';
import {
  SettingFooter,
} from './components';

import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();

export default defineComponent({
  name: 'SettingDrawer',
  setup(_, { attrs }) {

    return () => (
      <BasicDrawer
        {...attrs}
        // title={t('layout.setting.drawerTitle')}
        // width={330}
        // wrapClassName="setting-drawer"
      >
        {{
          default: () => (
            <>
              <SettingFooter />
            </>
          ),
        }}
      </BasicDrawer>
    );
  },
});
