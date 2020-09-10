<template>
  <div class="background">
    <section class="todo-wrapper">
      <!-- 제목  -->
      <h1 class="todo-title">할 일 목록<br />{{ today.date }} {{ today.day }}</h1>

      <!-- 입력폼  -->
      <form @keydown.enter.prevent="">
        <input
          v-model="new_todo"
          type="text"
          class="input-todo"
          :class="{ active: new_todo }"
          placeholder="할 일을 여기 적고 +를 누릅니다."
          @keyup.enter="addItem"
        />
        <div class="btn btn-add" :class="{ active: new_todo }" @click="addItem">+</div>
      </form>

      <!-- 할 일 목록  -->
      <div v-if="pending.length > 0">
        <p class="status busy">현재 할 일이 {{ pending.length }}가지 있습니다.<span v-if="pending.length > 1"></span></p>
        <transition-group name="todo-item" tag="ul" class="todo-list">
          <li v-for="item in pending" :key="item.title">
            <input :id="'item_' + item.id" v-model="item.done" class="todo-checkbox" type="checkbox" />
            <label :for="'item_' + item.id"></label>
            <span class="todo-text">{{ item.title }}</span>
            <span class="delete" @click="deleteItem(item)"></span>
          </li>
        </transition-group>
      </div>

      <!-- 할 일이 없을 때 -->
      <transition name="slide-fade">
        <p v-if="!pending.length" class="status free">
          <img src="https://nourabusoud.github.io/vue-todo-list/images/beer_celebration.svg" alt="celebration" />
          모든 일을 다 마치셨습니다! 😊
        </p>
      </transition>

      <!-- 완료한 사항 목록 -->
      <div v-if="completed.length > 0 && showComplete">
        <p class="status">완료된 사항: {{ completedPercentage }}</p>
        <transition-group name="todo-item" tag="ul" class="todo-list archived">
          <li v-for="item in completed" :key="item.title">
            <input :id="'item_' + item.id" v-model="item.done" class="todo-checkbox" type="checkbox" />
            <label :for="'item_' + item.id"></label>
            <span class="todo-text">{{ item.title }}</span>
            <span class="delete" @click="deleteItem(item)"></span>
          </li>
        </transition-group>
      </div>

      <!-- 할 일 목록 제어 버튼 -->
      <div class="control-buttons">
        <div v-if="completed.length > 0" class="btn btn-secondary" @click="toggleShowComplete">
          <span v-if="!showComplete">완료한 사항 보이기</span><span v-else>완료한 사항 감추기</span>
        </div>
        <div v-if="todoList.length > 0" class="btn btn-secondary" @click="clearAll">알림 다 지우기</div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import * as Core from '~/core'
import { VueAPI } from '~/core'

export default VueAPI.defineComponent({
  data() {
    return {
      todoList: [
        {
          id: 0,
          title: 'Go to codepen and get inspired',
          done: false
        },
        { id: 1, title: 'Pick a project', done: false },
        { id: 4, title: 'Create a new pen', done: true }
      ],
      new_todo: '',

      showComplete: false
    }
  },
  mounted() {
    this.getTodos()
  },
  watch: {
    todoList: {
      handler(updatedList) {
        localStorage.setItem('todo_list', JSON.stringify(updatedList))
      },
      deep: true
    }
  },
  computed: {
    pending() {
      return (this.todoList as any).filter(function (item: any) {
        return !item.done
      })
    },
    completed() {
      return (this.todoList as any).filter(function (item: any) {
        return item.done
      })
    },
    completedPercentage() {
      return Math.floor(((this.completed as any).length / (this.todoList as any).length) * 100) + '%'
    },
    today() {
      const weekday = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
      let today: any = new Date()
      let dd = today.getDate()
      let mm = today.getMonth() + 1 // January is 0!
      const yyyy = today.getFullYear()

      if (dd < 10) {
        dd = '0' + dd
      }

      if (mm < 10) {
        mm = '0' + mm
      }

      today = {
        day: weekday[today.getDay()],
        date: yyyy + '-' + mm + '-' + dd
      }

      return today
    }
  },
  methods: {
    // get all todos when loading the page
    getTodos() {
      if (localStorage.getItem('todo_list')) {
        this.todoList = JSON.parse(localStorage.getItem('todo_list') as any)
      }
    },
    // add a new item
    addItem() {
      // validation check
      if (this.new_todo) {
        this.todoList.unshift({
          id: this.todoList.length,
          title: this.new_todo,
          done: false
        })
      }
      // reset new_todo
      this.new_todo = ''
      // save the new item in localstorage
      return true
    },
    deleteItem(item: any) {
      this.todoList.splice(this.todoList.indexOf(item), 1)
    },
    toggleShowComplete() {
      this.showComplete = !this.showComplete
    },
    clearAll() {
      this.todoList = []
    }
  }
})
</script>

<style src="./index.css" scoped />
