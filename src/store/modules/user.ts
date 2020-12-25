import { Action, Module, Mutation, VuexModule, getModule } from 'vuex-module-decorators';

import store from '/@/store/index'
import { hotModuleUnregisterModule } from '/@/utils/helper/vuexHelper';

const NAME = 'user'
hotModuleUnregisterModule(NAME);
@Module({ namespaced: true, name: NAME, dynamic: true, store })
class User extends VuexModule {

}

export const userStore = getModule<User>(User);