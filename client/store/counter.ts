import { Store } from 'vue-state-store'

export interface ICounter {
  count: number
  author: string
}

export class Counter extends Store<ICounter> {
  value = this.bind()

  up() {
    this.value.count++
  }

  down() {
    this.value.count--
  }
}

export const useCount = () => {
  const counter = new Counter({
    author: '',
    count: 0
  })
  return counter
}
