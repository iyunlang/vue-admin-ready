
import type { CSSProperties, VNodeChild } from 'vue';


export interface DrawerInstance {
  setDrawerProps: (props: Partial<DrawerProps> | boolean) => void;
}

export interface ReturnMethods extends DrawerInstance {
  openDrawer: <T = any>(visible?: boolean, data?: T, openOnSet?: boolean) => void;
}

export type RegisterFn = (drawerInstance: DrawerInstance, uuid?: string) => void;

export interface ReturnInnerMethods extends DrawerInstance {
  closeDrawer: () => void;
  changeLoading: (loading: boolean) => void;
  changeOkLoading: (loading: boolean) => void;
}

export type UseDrawerReturnType = [RegisterFn, ReturnMethods];

export type UseDrawerInnerReturnType = [RegisterFn, ReturnInnerMethods];

export interface DrawerFooterProps {
  
}
export interface DrawerProps extends DrawerFooterProps {

  /**
   * 是否需要遮罩层
   * @default true
   * @type boolean
   */
  modal?: boolean;

  /**
   * 抽屉打开方向
   * @default 'rtl'
   * @type 'rtl' | 'ltr' | 'ttb' | 'btt'
   */
  direction?: 'rtl' | 'ltr' | 'ttb' | 'btt';

  /**
   * 窗体大小
   * @default '30%'
   * @type （number）xpx , （string）x%
   */
  size?: string | number;

  /**
   * 标题
   * @default 
   * @type string | slot
   */
  title?: VNodeChild | JSX.Element;

  /**
   * 是否带标题
   * @default true
   * @type boolean
   */
  withHeader?: boolean;

  /**
   * 是否显示遮罩层
   * @default true
   * @type boolean
   */
  modelValue?: boolean;
  closeFunc?: () => Promise<any>;
  loading?: boolean;

  /**
 * 是否使用虚拟 loading 的是或否的按钮
 * @default false
 * @type boolean
 */
  confirmLoading: boolean;
  
}
export interface DrawerActionType {
  scrollBottom: () => void;
  scrollTo: (to: number) => void;
  getScrollWrap: () => Element | null;
}
