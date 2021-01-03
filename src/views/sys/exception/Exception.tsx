import './exception.scss';

import type { PropType } from 'vue';

import { defineComponent, ref, computed, unref } from 'vue';


export default defineComponent({
  name: 'ErrorPage',
  props: {
    
  },
  setup(props) {
    
    return () => {

      return (
        <p>Exception</p>
      );
    };
  },
});
