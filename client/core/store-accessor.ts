import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';
import example from '~/store/example';

// 구조개선 필요함.
let exampleStore: example;

function init(store: Store<any>): void {
    exampleStore = getModule(example, store);
}

export { init, exampleStore }