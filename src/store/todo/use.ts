import { todo } from './define'
import { UseTodo } from './inject'
import * as Core from '~/core'

/**
 * * 할 일 목록 상태 사용 함수
 */
export const useTodo = () => {
  // * 사용 클래스의 인스턴스를 생성합니다.
  const todoInstance = new UseTodo()

  // * 이전에 저장되었던 로컬 스토리지 값을 읽어옵니다.
  todoInstance.getTodos()

  // * todolist 가 변할때마다 값을
  // * 로컬 스토리지에 저장합니다.
  todo.subscribe(data => {
    try {
      if (window) {
        window.localStorage.setItem('todo_list', JSON.stringify(data.todoList))
      }
    } catch (e) {}
  })

  return todoInstance
}
