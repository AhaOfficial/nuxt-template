<template>
  <div class="background">
    <section class="todo-wrapper">
      <!-- 제목  -->
      <h1 class="todo-title">
        할 일 목록<br />{{ todo.today.value.date }}
        {{ todo.today.value.day }}
      </h1>

      <!-- 입력폼  -->
      <form @keydown.enter.prevent="">
        <input
          v-model="$todo.newTodo"
          type="text"
          class="input-todo"
          :class="{ active: $todo.newTodo }"
          placeholder="할 일을 여기 적고 +를 누릅니다."
          @keyup.enter="todo.addItem()"
        />
        <div class="btn btn-add" :class="{ active: $todo.newTodo }" @click="todo.addItem()">
          +
        </div>
      </form>

      <!-- 할 일 목록  -->
      <div v-if="todo.pending.value.length > 0">
        <p class="status busy">현재 할 일이 {{ todo.pending.value.length }}가지 있습니다.<span v-if="todo.pending.value.length > 1"></span></p>
        <transition-group name="todo-item" tag="ul" class="todo-list">
          <li v-for="item in todo.pending.value" :key="item.title">
            <input :id="'item_' + item.id" v-model="item.done" class="todo-checkbox" type="checkbox" />
            <label :for="'item_' + item.id"></label>
            <span class="todo-text">{{ item.title }}</span>
            <span class="delete" @click="() => todo.deleteItem(item)"></span>
          </li>
        </transition-group>
      </div>

      <!-- 할 일이 없을 때 -->
      <transition name="slide-fade">
        <p v-if="!todo.pending.value.length" class="status free">
          <img src="https://nourabusoud.github.io/vue-todo-list/images/beer_celebration.svg" alt="celebration" />
          모든 일을 다 마치셨습니다! 😊
        </p>
      </transition>

      <!-- 완료한 사항 목록 -->
      <div v-if="todo.completed.value.length > 0 && $todo.showComplete">
        <p class="status">완료된 사항: {{ todo.completedPercentage.value }}</p>
        <transition-group name="todo-item" tag="ul" class="todo-list archived">
          <li v-for="item in todo.completed.value" :key="item.title">
            <input :id="'item_' + item.id" v-model="item.done" class="todo-checkbox" type="checkbox" />
            <label :for="'item_' + item.id"></label>
            <span class="todo-text">{{ item.title }}</span>
            <span class="delete" @click="todo.deleteItem(item)"></span>
          </li>
        </transition-group>
      </div>

      <!-- 할 일 목록 제어 버튼 -->
      <div class="control-buttons">
        <div v-if="todo.completed.value.length > 0" class="btn btn-secondary" @click="todo.toggleShowComplete()">
          <span v-if="!$todo.showComplete">완료한 사항 보이기</span><span v-else>완료한 사항 감추기</span>
        </div>
        <div v-if="$todo.todoList.length > 0" class="btn btn-secondary" @click="todo.clearAll()">
          알림 다 지우기
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import * as Core from '~/core'
import { VueAPI } from '~/core'
import { Todo } from '~/store'

export default VueAPI.defineComponent({
  setup(props, context) {
    // * Todo 상태를 이 컴포넌트에서 사용합니다.
    const todo = Todo.useTodo()
    const { $todo } = todo

    return {
      /**
       * 할 일 목록 상태 사용 클래스
       */
      todo,
      /**
       * 바인딩 된 상태 저장소
       */
      $todo
    }
  }
})
</script>

<style src="./index.css" scoped />
