import type { PropType } from 'vue';

import { useI18n } from '/@/hooks/web/useI18n';
import { propTypes } from '/@/utils/propTypes';
const { t } = useI18n();

export const basicProps = {
  customClass: propTypes.string.def(''),
  title: propTypes.string.def(''),
  modelValue: propTypes.bool,
  modal: propTypes.bool.def(true),
  beforeClose: {
    type: [Function, Object] as PropType<any>,
    default: null,
  },
  destroyOnClose: propTypes.bool,
};
