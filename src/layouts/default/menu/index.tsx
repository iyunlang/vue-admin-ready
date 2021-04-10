import './index.scss';

import { defineComponent, unref, toRef, PropType, computed } from 'vue'

import { BasicMenu } from '/@/components/Menu';
import { AppLogo } from '/@/components/Application';

import { MenuModeEnum, MenuSplitTyeEnum } from '/@/enums/menuEnum';

import { useSplitMenu } from './useLayoutMenu';

import { propTypes } from '/@/utils/propTypes';

import { useGo } from '/@/hooks/web/usePage';
import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
import { useRootSetting } from '/@/hooks/setting/useRootSetting';
import { useAppInject } from '/@/hooks/web/useAppInject';
import { useDesign } from '/@/hooks/web/useDesign';

export default defineComponent({
    name: 'LayoutMenu',
    props: {
        theme: propTypes.oneOf(['light', 'dark']),
    
        splitType: {
          type: Number as PropType<MenuSplitTyeEnum>,
          default: MenuSplitTyeEnum.NONE,
        },
    
        isHorizontal: propTypes.bool,
        // menu Mode
        menuMode: {
          type: [String] as PropType<Nullable<MenuModeEnum>>,
          default: '',
        },
      },
    setup( props ) {
        const go = useGo();

        const { prefixCls } = useDesign('layout-menu');

        const {
          getCollapsed,
          getMenuTheme,
          getIsSidebarType,
        } = useMenuSetting();

        const { getShowLogo } = useRootSetting();

        const { getIsMobile } = useAppInject();

        const getComputedMenuMode = computed(() =>
          unref(getIsMobile) ? MenuModeEnum.INLINE : props.menuMode || unref(getMenuMode)
        );

        const { menusRef } = useSplitMenu(toRef(props, 'splitType'));

        const getComputedMenuTheme = computed(() => props.theme || unref(getMenuTheme));

        const getIsShowLogo = computed(() => unref(getShowLogo) && unref(getIsSidebarType));

        const getLogoClass = computed(() => {
          return [
            `${prefixCls}-logo`,
            unref(getComputedMenuTheme),
            {
              [`${prefixCls}--mobile`]: unref(getIsMobile),
            },
          ];
        });

        console.log('侧边导航', menusRef)

        function handleMenuSelect(path: string) {
          go( path )
        }

        function renderHeader() {
          if (!unref(getIsShowLogo) && !unref(getIsMobile)) return null;
    
          return (
            <AppLogo
              showTitle={!unref(getCollapsed)}
              class={unref(getLogoClass)}
              theme={unref(getComputedMenuTheme)}
            />
          );
        }

        function renderMenu() {
            return (
              <BasicMenu 
                items={unref(menusRef)}
                onMenuSelect={handleMenuSelect}
                theme={unref(getMenuTheme)}
              />
            );
          }

        return () => {

            return (
                <>
                    {
                        renderHeader()
                    }
                    {
                        renderMenu()
                    }
                </>
            )
        }
    }
})