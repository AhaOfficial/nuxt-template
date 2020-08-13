<template>
  <div>
    <section class="todo-wrapper">
      <!-- 제목  -->
      <h1 class="todo-title">
        할 일 목록<br />{{ todo.today.date }}
        {{ todo.today.day }}
      </h1>

      <!-- 입력폼  -->
      <form @keydown.enter.prevent="">
        <input
          type="text"
          class="input-todo"
          v-bind:class="{ active: todo.value.new_todo }"
          placeholder="할 일을 여기 적고 +를 누릅니다."
          v-model="todo.value.new_todo"
          v-on:keyup.enter="todo.addItem()"
        />
        <div class="btn btn-add" v-bind:class="{ active: todo.value.new_todo }" @click="todo.addItem()">
          +
        </div>
      </form>

      <!-- 할 일 목록  -->
      <div v-if="todo.pending.value.length > 0">
        <p class="status busy">현재 할 일이 {{ todo.pending.value.length }}가지 있습니다.<span v-if="todo.pending.value.length > 1"></span></p>
        <transition-group name="todo-item" tag="ul" class="todo-list">
          <li v-for="item in todo.pending.value" v-bind:key="item.title">
            <input class="todo-checkbox" v-bind:id="'item_' + item.id" v-model="item.done" type="checkbox" />
            <label v-bind:for="'item_' + item.id"></label>
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
      <div v-if="todo.completed.value.length > 0 && todo.value.showComplete">
        <p class="status">완료된 사항: {{ todo.completedPercentage.value }}</p>
        <transition-group name="todo-item" tag="ul" class="todo-list archived">
          <li v-for="item in todo.completed.value" v-bind:key="item.title">
            <input class="todo-checkbox" v-bind:id="'item_' + item.id" v-model="item.done" type="checkbox" />
            <label v-bind:for="'item_' + item.id"></label>
            <span class="todo-text">{{ item.title }}</span>
            <span class="delete" @click="todo.deleteItem(item)"></span>
          </li>
        </transition-group>
      </div>

      <!-- 할 일 목록 제어 버튼 -->
      <div class="control-buttons">
        <div class="btn btn-secondary" v-if="todo.completed.value.length > 0" @click="todo.toggleShowComplete()">
          <span v-if="!todo.value.showComplete">완료한 사항 보이기</span><span v-else>완료한 사항 감추기</span>
        </div>
        <div class="btn btn-secondary" v-if="todo.value.todoList.length > 0" @click="todo.clearAll()">
          알림 다 지우기
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { VueAPI } from '~/core'
import { useTodo } from '~/store'

export default VueAPI.defineComponent({
  setup(props, context) {
    return {
      // * Todo 상태를 이 컴포넌트에서 사용합니다.
      todo: useTodo()
    }
  }
})
</script>

<style src="./index.css" />
