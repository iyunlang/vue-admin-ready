import { defineComponent, computed, unref } from 'vue';
import { BasicDrawer } from '/@/components/Drawer/index';
import { ElDivider } from 'element-plus';
import {
  SettingFooter,
  ThemePicker,
} from './components';

import {
  HandlerEnum,
} from './enum';

import { useI18n } from '/@/hooks/web/useI18n';
import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting';

const { t } = useI18n();

import { HEADER_PRESET_BG_COLOR_LIST, SIDE_BAR_BG_COLOR_LIST } from '/@/settings/colorSetting.ts';

export default defineComponent({
  name: 'SettingDrawer',
  setup(_, { attrs }) {

    const {
      getHeaderBgColor,
    } = useHeaderSetting();

    const {
      getMenuBgColor,
    } = useMenuSetting();

    function renderHeaderTheme() {
      return (
        <ThemePicker
          colorList={HEADER_PRESET_BG_COLOR_LIST}
          def={unref(getHeaderBgColor)}
          event={HandlerEnum.HEADER_THEME}
        />
      );
    }

    function renderSiderTheme() {
      return (
        <ThemePicker
          colorList={SIDE_BAR_BG_COLOR_LIST}
          def={unref(getMenuBgColor)}
          event={HandlerEnum.MENU_THEME}
        />
      );
    }

    const dividerContentPosition = 'left'

    return () => (
      <BasicDrawer
        {...attrs} 
        size={330}
        // title={t('layout.setting.drawerTitle')}
        // customClass="setting-drawer"
      >
        {{
          default: () => (
            <> 
              <div 
              style={ {padding: '12px 20px 12px 6px'} }
              >
                  <ElDivider content-position={dividerContentPosition}>头部主题颜色</ElDivider>
                  { renderHeaderTheme() }
                  <ElDivider content-position={dividerContentPosition}>菜单栏主题颜色</ElDivider>
                  { renderSiderTheme() }
                  <SettingFooter />
              </div>
            </>
          ),
        }}
      </BasicDrawer>
    );
  },
});
