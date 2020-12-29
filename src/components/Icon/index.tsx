import './index.scss'
// import '//at.alicdn.com/t/font_2101671_40p2ivrq6wr.css'
import {
  defineComponent,
  ref,
  watch,
  onMounted,
  nextTick,
  unref,
  computed,
  CSSProperties,
  PropType
} from 'vue';
import Iconify from '@purge-icons/generated';
import { propTypes } from '/@/utils/propTypes';
import { isString } from '@vueuse/core';
export default defineComponent({
  name: 'RIcon',
  props: {
    icon: propTypes.string,
    color: propTypes.string,
    size: propTypes.number,
    prefix: propTypes.string.def('')
  },
  setup(props, { attrs }) {
    const elRef = ref<ElRef>(null)

    const getIconRef = computed(() => {
      const { icon, prefix } = props;
      return `${prefix ? prefix + ':': ''}${icon}`
    })

    const update = async () => {
      const el = unref(elRef)
      if(el) {
        await nextTick();
        const icon = unref(getIconRef);
        const svg = Iconify.renderSVG(icon, {});

        if(svg) {
          el.textContent = "";
          el.appendChild(svg)
        } else {
          const span = document.createElement('span')
          span.className = 'iconify'
          span.dataset.icon = icon
          el.textContent = "";
          el.appendChild(span)
        }
      }
    }

    const wrapStyleRef = computed(
      (): CSSProperties => {
        const { color, size } = props;
        let fs = size
        if(isString(fs)) {
          fs = parseInt(fs, 10)
        }
        return {
          fontSize: `${fs}px`,
          color,
          display: 'inline-flex'
        }
      }
    )

    watch(() => props.icon, update, { flush: 'post' })

    onMounted(update)

    return () => (
      <span ref={elRef} class={[attrs.class, 'app-iconify anticon']} style={unref(wrapStyleRef)}></span>
    )
  }
})