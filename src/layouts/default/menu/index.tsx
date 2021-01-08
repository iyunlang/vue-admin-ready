import './index.scss';

import { defineComponent, unref, toRef, PropType } from 'vue'

import { BasicMenu } from '/@/components/Menu';

import { MenuModeEnum, MenuSplitTyeEnum } from '/@/enums/menuEnum';

import { useSplitMenu } from './useLayoutMenu';

import { propTypes } from '/@/utils/propTypes';

import { useGo } from '/@/hooks/web/usePage';

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

        const { menusRef } = useSplitMenu(toRef(props, 'splitType'));

        console.log('侧边导航', menusRef)

        function handleMenuSelect(path: string) {
          go( path )
        }

        function renderMenu() {
            return (
              <BasicMenu 
                items={unref(menusRef)}
                onMenuSelect={handleMenuSelect}
              />
            );
          }

        return () => {

            return (
                <>
                    {
                        renderMenu()
                    }
                </>
            )
        }
    }
})