import messages from 'globby?locale!/@/locales/lang/**/*.@(ts)';

import type { DropMenu } from '/@/components/Dropdown';

// locale list
export const localeList: DropMenu[] = [
  {
    text_min: '中文',
    text: '简体中文',
    event: 'zh',
  },
  {
    text_min: 'En',
    text: 'English',
    event: 'en',
  },
];

export default messages;
