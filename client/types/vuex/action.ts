import type { ActionTree, ActionContext } from 'vuex'
import type { Context as AppContext } from '@nuxt/types'

export interface Actions<S, R> extends ActionTree<S, R> {
    nuxtServerInit(
        actionContext: ActionContext<S, R>,
        appContext: AppContext
    ): void
}