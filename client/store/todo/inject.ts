import { ITodoItem } from './declare'
import { todo } from './define'
import * as Core from '~/core'
import { VueAPI } from '~/core'

/**
 * * 할 일 목록 상태 사용 주입 클래스
 */
export class UseTodo {
  /**
   * * 할 일 목록 상태 저장소
   */
  todo = todo
  /**
   * * 바인딩 된 할 일 상태 저장소
   */
  $todo = todo.bind()

  /**
   * * 진행 중인 작업 목록
   */
  pending = VueAPI.computed(() => {
    return this.$todo.todoList.filter(item => {
      return !item.done
    })
  })

  /**
   * * 완료된 작업 목록
   */
  completed = VueAPI.computed(() => {
    return this.$todo.todoList.filter(item => {
      return item.done
    })
  })

  /**
   * * 완료 퍼센트
   */
  completedPercentage = VueAPI.computed(() => {
    return Math.floor((this.completed.value.length / this.$todo.todoList.length) * 100) + '%'
  })

  /**
   * * 오늘 요일 얻어오기
   */
  today = VueAPI.computed(() => {
    const weekday = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
    const today: any = new Date()
    let dd = today.getDate()
    let mm = today.getMonth() + 1
    const yyyy = today.getFullYear()

    if (dd < 10) dd = '0' + dd
    if (mm < 10) mm = '0' + mm

    const dayObject: {
      /**
       * * 요일을 문자열로 반환합니다.
       */
      day: string

      /**
       * * 날짜를 YYYY-MM-DD 형태의 문자열로 반환합니다.
       */
      date: string
    } = {
      day: weekday[today.getDay()],
      date: yyyy + '-' + mm + '-' + dd
    }
    return dayObject
  })

  /**
   * * 할 일 목록을 로컬 스토리지에서 가져옵니다.
   */
  getTodos() {
    try {
      if (typeof window !== 'undefined' && window.localStorage.getItem('todo_list')) {
        this.$todo.todoList = JSON.parse(window.localStorage.getItem('todo_list') as string)
      }
    } catch (e) {}
  }

  /**
   * * 하려는 일을 목록에 추가합니다.
   */
  addItem() {
    // * 하려는 일의 제목이 작성되어 있는 경우만
    if (this.$todo.newTodo) {
      this.$todo.todoList.unshift({
        id: this.$todo.todoList.length,
        title: this.$todo.newTodo,
        done: false
      })
    }

    // * 하려는 일의 제목을 초기화합니다.
    this.$todo.newTodo = ''
    return true
  }

  /**
   * * 해당 아이템을 목록에서 삭제합니다.
   */
  deleteItem = (item: ITodoItem) => {
    this.$todo.todoList.splice(this.$todo.todoList.indexOf(item), 1)
  }

  /**
   * * 완료한 일 목록을 보여줄지 말지를 토글합니다.
   */
  toggleShowComplete = () => {
    this.$todo.showComplete = !this.$todo.showComplete
  }

  /**
   * * 모든 할일 목록을 초기화합니다.
   */
  clearAll = () => {
    this.$todo.todoList = []
  }
}
