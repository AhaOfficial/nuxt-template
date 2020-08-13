import { Store } from 'vue-state-store'
import { VueAPI } from '~/core'

// * 상태 규격 선언
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
export interface ITodo {
	/**
	 * * 할일 목록
	 */
	todoList: ITodoItem[]
	/**
	 * * 새로 제목을 입력하는 중인 할일
	 */
	new_todo: ''
	/**
	 * * 완료된 할 일을 보여줄지 여부
	 */
	showComplete: boolean
}

// * 상태 및 클래스 변수 선언
export class Todo extends Store<ITodo> {
	/**
	 * * 컴포넌트 계산용 바인딩
	 */
	value = this.bind()

	/**
	 * * 진행 중인 작업 목록
	 */
	pending = VueAPI.computed(() => {
		return this.value.todoList.filter(item => {
			return !item.done
		})
	})

	/**
	 * * 완료된 작업 목록
	 */
	completed = VueAPI.computed(() => {
		return this.value.todoList.filter(item => {
			return item.done
		})
	})

	/**
	 * * 완료 퍼센트
	 */
	completedPercentage = VueAPI.computed(() => {
		return Math.floor((this.completed.value.length / this.value.todoList.length) * 100) + '%'
	})

	/**
	 * * 오늘 요일 얻어오기
	 */
	today = VueAPI.computed(() => {
		const weekday = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
		const today: any = new Date()
		let dd = today.getDate()
		let mm = today.getMonth() + 1
		let yyyy = today.getFullYear()

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
	}).value

	/**
	 * * 할 일 목록을 로컬 스토리지에서 가져옵니다.
	 */
	getTodos() {
		try {
			if (typeof window != 'undefined' && window.localStorage.getItem('todo_list')) {
				this.value.todoList = JSON.parse(window.localStorage.getItem('todo_list') as string)
			}
		} catch (e) {}
	}

	/**
	 * * 하려는 일을 목록에 추가합니다.
	 */
	addItem() {
		// * 하려는 일의 제목이 작성되어 있는 경우만
		if (this.value.new_todo) {
			this.value.todoList.unshift({
				id: this.value.todoList.length,
				title: this.value.new_todo,
				done: false
			})
		}

		// * 하려는 일의 제목을 초기화합니다.
		this.value.new_todo = ''
		return true
	}

	/**
	 * * 해당 아이템을 목록에서 삭제합니다.
	 */
	deleteItem(item: ITodoItem) {
		this.value.todoList.splice(this.value.todoList.indexOf(item), 1)
	}

	/**
	 * * 완료한 일 목록을 보여줄지 말지를 토글합니다.
	 */
	toggleShowComplete() {
		this.value.showComplete = !this.value.showComplete
	}

	/**
	 * * 모든 할일 목록을 초기화합니다.
	 */
	clearAll() {
		this.value.todoList = []
	}
}

// * 상태 및 클래스 함수 정의
// export class TodoWithUtils extends Todo {}

// * 뷰의 컴포넌트에서 상태 인스턴스를 가져오는 함수를 만듭니다.
// (컴포넌트 안에서 use~~ 함수가 사용되어야만
// 라이프사이클을 바깥으로 빼올 수 있습니다.)
export const useTodo = () => {
	// * 상태 클래스 인스턴스를 생성합니다.
	const todo = new Todo({
		todoList: [
			{
				id: 0,
				title: '다람쥐 땅콩 주기',
				done: false
			},
			{ id: 1, title: '고양이 츄르 주기', done: false },
			{ id: 4, title: '뷰 예시 만들기', done: true }
		],
		new_todo: '',

		showComplete: false
	})

	// * 이전에 저장되었던 로컬 스토리지 값을 읽어옵니다.
	todo.getTodos()

	// * todolist 가 변할때마다 값을
	// * 로컬 스토리지에 저장합니다.
	todo.subscribe(data => {
		try {
			if (window) {
				window.localStorage.setItem('todo_list', JSON.stringify(data.todoList))
			}
		} catch (e) {}
	})

	return todo
}
