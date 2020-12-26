import type { ProjectConfig } from '/@/types/config';
import { PROJ_CFG_KEY } from '/@/enums/cacheEnum';

import { Action, Module, Mutation, VuexModule, getModule } from 'vuex-module-decorators';
import store from '/@/store/index'

import { hotModuleUnregisterModule } from '/@/utils/helper/vuexHelper';
import { setLocal, getLocal, clearSession, clearLocal } from '/@/utils/helper/persistent';
import { deepMerge } from '/@/utils';

import { resetRouter } from '/@/router';

// import { permissionStore } from './permission';
// import { tabStore } from './tab';
// import { userStore } from './user';

export interface LockInfo {
    pwd: string | undefined;
    isLock: boolean;
}

let timeId: TimeoutHandle;

const NAME = 'app'
hotModuleUnregisterModule(NAME);
@Module({ namespaced: true, name: NAME, dynamic: true, store })
class App extends VuexModule {

    private pageLoadingState = false;

    private projectConfig: ProjectConfig | null = getLocal(PROJ_CFG_KEY)

    private lockMainScrollState = false

    get getPageLoading() {
        return this.pageLoadingState
    }

    get getProjectConfig() {
        return this.projectConfig
    }

    get getLockMainScrollState() {
        return this.lockMainScrollState
    }

    @Mutation
    commitPageLoadingState(loading: boolean): void {
        this.pageLoadingState = loading
    }

    @Mutation
    commitLockMainScrollState(loc: boolean): void {
        this.lockMainScrollState = loc
    }

    @Mutation
    commitProjectConfigState(proCfg: DeepPartial<ProjectConfig>): void {
        this.projectConfig = deepMerge(this.projectConfig || {}, proCfg);
        setLocal(PROJ_CFG_KEY, this.projectConfig)
    }

    @Action
    async resumeAllState() {
        resetRouter();
        clearSession();
        clearLocal();

        // permissionStore.commitResetState();
        // tabStore.commitResetState();
        // userStore.commitResetState();
    }

    @Action
    public async setPageLoadingAction(loading: boolean): Promise<void> {
        if(loading) {
            clearTimeout(timeId)
            timeId = setTimeout(() => {
                this.commitPageLoadingState(loading);
            }, 50);
        } else {
            this.commitPageLoadingState(loading);
            clearTimeout(timeId);
        }
    }
}

export const appStore = getModule<App>(App);