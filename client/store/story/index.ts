import { Store } from 'vue-state-store'
import * as Core from '~/core'
import { VueAPI } from '~/core'

/**
 * 할 일 상태 선언
 */
interface ITodo {
  name: string
}

/**
 * 할 일 목록 상태 선언
 */
interface IStory {
  todos: Array<any>
}

/**
 * 할 일 목록 상태 저장소 규격 정의
 */
export class Story extends Store<IStory> {
  /**
   * 할 일을 등록합니다.
   * @param todo
   */
  async addTodo(todo: ITodo) {
    await this.update(data => {
      data.todos.push({
        idx: data.todos.length + 1,
        name: todo.name,
        done: false
      })
      return data
    })
  }
}

/**
 * 할 일 목록 상태 저장소 정의
 */
export const story = new Story({
  todos: []
})

/**
 * 할 일 목록 사용 주입 클래스
 */
export class UseStory {
  /**
   * 할 일 목록 상태 저장소
   */
  story = story
  /**
   * 바인딩 된 할 일 목록 상태 저장소
   */
  $story = story.bind()

  /**
   * 컴포넌트용 독립된 todo 입력란 바인딩 변수
   */
  todo = VueAPI.ref('')

  // * computed 로직 입니다.
  todos = VueAPI.computed(() => this.$story.todos)
  isEmptyTodo = VueAPI.computed(() => this.todo.value === '')
  isTodoShow = VueAPI.computed(() => this.todos.value.length > 0)
  isTodosEmpty = VueAPI.computed(() => this.todos.value.length === 0)
  emptyClass = VueAPI.computed(() => this.isEmptyTodo && ['cursor-not-allowed', 'opacity-50'])

  // * event 로직 입니다.
  addTodo = () => !this.isEmptyTodo.value && (story.addTodo({ name: this.todo.value }), (this.todo.value = ''))
  typingTodo = e => (this.todo.value = e.target.value)
}

/**
 * 할 일 목록 사용 함수
 */
export const useStory = () => {
  const storyInstance = new UseStory()
  return storyInstance
}
