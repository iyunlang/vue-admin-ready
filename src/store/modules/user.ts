import { Action, Module, Mutation, VuexModule, getModule } from 'vuex-module-decorators';

import store from '/@/store/index'

const NAME = 'user'

@Module({ namespaced: true, name: NAME, dynamic: true, store })
class User extends VuexModule {

}

export const userStore = getModule<User>(User);