/**
 * * 할일의 규격 선언
 */
export interface ITodoItem {
  /**
   * * 할 일의 순서번호
   */
  id: number
  /**
   * * 할일의 제목
   */
  title: string
  /**
   * * 완료 여부
   */
  done: boolean
}

/**
 * * 할일 목록 상태 규격 선언
 */
export interface ITodo {
  /**
   * * 할일 목록
   */
  todoList: ITodoItem[]
  /**
   * * 새로 제목을 입력하는 중인 할일
   */
  newTodo: ''
  /**
   * * 완료된 할 일을 보여줄지 여부
   */
  showComplete: boolean
}
