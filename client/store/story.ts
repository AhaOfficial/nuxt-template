import { Store } from 'vue-state-store'
import { VueAPI } from '~/core'

interface ITodo {
  name: string
}

interface IStory {
  todos: Array<any>
}

// * 선언
export class Story extends Store<IStory> {
  /**
   * * 투두를 등록합니다.
   * @param todo
   */
  async addTodo(todo: ITodo) {
    await this.update(data => {
      data.todos.push({ idx: data.todos.length + 1, name: todo.name, done: false })
      return data
    })
  }
}

// * 정의
export const story = new Story({
  todos: []
})

/**
 *	{ idx: '1', name: 'Todo 1', done: false },
 *	{ idx: '2', name: 'Todo 2', done: false },
 *	{ idx: '3', name: 'Todo 3', done: false }
 */

// * 사용
// * 상태 관련 공유 로직을 작성합니다
export const useStory = () => {
  // * data 입니다.
  const todo = VueAPI.ref('')
  const todos = VueAPI.ref(story.get().todos)

  // * computed 로직 입니다.
  const isEmptyTodo = VueAPI.computed(() => todo.value === '')
  const isTodoShow = VueAPI.computed(() => todos.value.length > 0)
  const isTodosEmpty = VueAPI.computed(() => todos.value.length === 0)
  const emptyClass = VueAPI.computed(() => isEmptyTodo && ['cursor-not-allowed', 'opacity-50'])

  // * event 로직 입니다.
  const addTodo = () => !isEmptyTodo.value && (story.addTodo({ name: todo.value }), (todo.value = ''))
  const typingTodo = e => (todo.value = e.target.value)

  return {
    todo,
    todos,
    isEmptyTodo,
    isTodoShow,
    isTodosEmpty,
    emptyClass,
    addTodo,
    typingTodo
  }
}
