import './index.scss';

import type { DrawerInstance, DrawerProps } from './types';
import type { CSSProperties } from 'vue';

import { defineComponent, ref, computed, watchEffect, watch, unref, nextTick, toRaw } from 'vue';

import { ElDrawer } from 'element-plus'

import { basicProps } from './props';

import { isFunction, isNumber } from '/@/utils/is';
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

    const getBindValues = computed(
      (): DrawerProps => {
        return {
          ...attrs,
          ...unref(getProps),
        };
      }
    );

    const getProps = computed(
      (): DrawerProps => {
        const opt = {
          ...attrs,
          modelValue: unref(isShowRef),
        };
        return opt as DrawerProps;
      }
    );

    watchEffect(() => {
      isShowRef.value = props.visible;
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

    async function onSwitch(e: ChangeEvent) {
      const { closeFunc } = unref(getProps);
      emit('close', e);
      if (closeFunc && isFunction(closeFunc)) {
        const res = await closeFunc();
        isShowRef.value = !res;
        return;
      }
      isShowRef.value = false;
    }

    function setDrawerProps(props: Partial<DrawerProps>): void {
      // Keep the last setDrawerProps
      propsRef.value = deepMerge(unref(propsRef) || {}, props);

      if (Reflect.has(props, 'visible')) {
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
        <ElDrawer class={prefixCls} modelValue={unref(isShowRef)}>
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
