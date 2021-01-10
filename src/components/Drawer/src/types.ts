
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
}

export type UseDrawerReturnType = [RegisterFn, ReturnMethods];

export type UseDrawerInnerReturnType = [RegisterFn, ReturnInnerMethods];

export interface DrawerProps {
  /**
   * 是否插入至 body 元素上
   * @default false
   * @type boolean
   */
  appendToBody: boolean;

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
  size?: string ;

  /**
   * 标题
   * @default 
   * @type string | slot
   */
  title?: string;

  /**
   * The class name of the container of the Drawer dialog.
   * @type string
   */
  customClass?: string;

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
  modelValue: boolean;

  /**
   * 是否显示关闭按钮
   * @default true
   * @type boolean
   */
  showClose: boolean;

  /**
   * 关闭前的回调，会暂停 Drawer 的关闭
   * @default null
   * @type Function<Function>
   */
  beforeClose?: () => Promise<boolean>;
}
export interface DrawerActionType {
  scrollBottom: () => void;
  scrollTo: (to: number) => void;
  getScrollWrap: () => Element | null;
}
