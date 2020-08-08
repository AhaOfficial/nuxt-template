import { Store } from 'vuex';
import { init } from '~/core/store-accessor';

const initializer = (store: Store<any>) => init(store);
export const plugins = [initializer];
export * from '~/core/store-accessor';