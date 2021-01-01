import { defineComponent } from 'vue'

import { BasicMenu } from '/@/components/Menu';

export default defineComponent({
    name: 'LayoutMenu',
    setup() {

        function renderMenu() {
            return (
              <BasicMenu

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