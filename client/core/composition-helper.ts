import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'

/**
 * * vue composition-api의 인스턴스를 주입하는 helper 함수 입니다.
 * @see https://composition-api.vuejs.org/#summary
 * @see https://github.com/vuejs/composition-api
 */
export const injectVueInstance = () => Vue.use(VueCompositionApi)
