import ParentLayout from '/@/layouts/page/ParentView.vue';

export const LAYOUT = import('/@/layouts/default/index.vue')

// export const getParentLayout = (name: string) => {
//   return () => {
//     new Promise((resolve) => {
//       resolve(
//         ...ParentLayout,
//         name
//       )
//     })
//   }
// }

export const REDIRECT_NAME = 'Redirect';