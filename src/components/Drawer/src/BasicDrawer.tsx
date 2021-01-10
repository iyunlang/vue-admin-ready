import './index.scss';

import type { DrawerInstance, DrawerProps } from './types';
import type { CSSProperties } from 'vue';

import { defineComponent, ref, computed, watchEffect, watch, unref, nextTick, toRaw } from 'vue';

import { ElDrawer } from 'element-plus'

import { basicProps } from './props';

import { isFunction, isNumber, isBoolean } from '/@/utils/is';
import { deepMerge } from '/@/utils';

import { getSlot } from '/@/utils/helper/tsxHelper';
import { tryTsxEmit } from '/@/utils/helper/vueHelper';

const prefixCls = 'basic-drawer';
export default defineComponent({
  inheritAttrs: false,
  props: basicProps,
  emits: ['visible-change', 'ok', 'close', 'register'],
  setup(props, { slots, emit, attrs }) {
    
    const isShowRef = ref<boolean>(false)
    const propsRef = ref<Partial<Nullable<DrawerProps>>>(null);

    const getMergeProps = computed(
      (): DrawerProps => {
        return deepMerge(toRaw(props), unref(propsRef));
      }
    );

    const getProps = computed(
      (): DrawerProps => {
        const opt = {
          direction: 'rtl',
          ...attrs,
          ...unref(getMergeProps),
          modelValue: unref(isShowRef),
        };
        opt.title = undefined;
        const { size, customClass, appendToBody } = opt;
        if (appendToBody) {
          if (!size) {
            opt.size = '100%';
          }
          const detailCls = `${prefixCls}__detail`;

          opt.customClass = customClass ? `${customClass} ${detailCls}` : detailCls;
        }
        return opt as DrawerProps;
      }
    );

    const getBindValues = computed(
      (): DrawerProps => {
        return {
          ...attrs,
          ...unref(getProps),
        };
      }
    );

    watchEffect(() => {
      isShowRef.value = props.modelValue;
    });

    watch(
      () => isShowRef.value,
      (show) => {
        nextTick(() => {
          emit('visible-change', show);
        });
      },
      {
        immediate: false,
      }
    );

    async function beforeClose(done: Function) {
      const { beforeClose: ParentBeforeClose } = unref(getProps);
      if (ParentBeforeClose && isFunction(ParentBeforeClose)) {
        const res = await ParentBeforeClose();
        if( isBoolean(res) ) isShowRef.value = !res;
        isShowRef.value = !unref(isShowRef)
        done()
        return;
      }
      isShowRef.value = false;
      done()
    }

    function setDrawerProps(props: Partial<DrawerProps>): void {
      // Keep the last setDrawerProps
      propsRef.value = deepMerge(unref(propsRef) || {}, props);

      if (Reflect.has(props, 'modelValue')) {
        isShowRef.value = !!props.modelValue;
      }
    }

    const drawerInstance: DrawerInstance = {
      setDrawerProps: setDrawerProps,
    };

    tryTsxEmit((instance) => {
      emit('register', drawerInstance, instance.uid);
    });

    return () => {
      return (
        <ElDrawer {...unref(getBindValues)} beforeClose={beforeClose}>
          {{
            default: () => (
              <>
                {getSlot(slots)}
              </>
            ),
          }}
        </ElDrawer>
      );
    };
  },
});
