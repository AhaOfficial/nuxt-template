import { Store } from 'vue-state-store'
import { ITodo, ITodoItem } from './declare'
import * as Core from '~/core'

/**
 * * 할 일 목록 상태 저장소 규격 정의
 */
export class Todo extends Store<ITodo> {}

/**
 * * 할 일 목록 상태 저장소 정의
 */
export const todo = new Todo({
  todoList: [
    {
      id: 0,
      title: '다람쥐 땅콩 주기',
      done: false
    },
    {
      id: 1,
      title: '고양이 츄르 주기',
      done: false
    },
    {
      id: 4,
      title: '뷰 예시 만들기',
      done: true
    }
  ],
  newTodo: '',
  showComplete: false
})
