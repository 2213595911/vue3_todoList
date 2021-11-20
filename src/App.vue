<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <Header />
      <List :todo-list="state.todoList" />
      <Footer :todo-list="state.todoList" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, computed, onMounted, watch } from 'vue'
import Header from './components/Header.vue'
import List from './components/List.vue'
import Footer from './components/Footer.vue'
import { nanoid } from 'nanoid'
import type { TodoType } from './types'
import bus from 'vue3-eventbus'
import { saveData, getData } from './utils/localStorageUtil'

const state = reactive({
  todoList: [] as TodoType[],
})

onMounted(() => state.todoList.push(...getData()))
watch(
  () => state.todoList,
  value => saveData(value),
  { deep: true }
)
// 添加事件
bus.on('addTodo', (todo: TodoType): void => {
  state.todoList.unshift(todo)
})
// 修改选中状态
bus.on('changeTodoState', (Curtodo: TodoType): void => {
  const activeTodo = computed(() => state.todoList.find(todo => todo.id === Curtodo.id))
  activeTodo.value!.isCompleted = Curtodo.isCompleted
})
// 删除选中事件
bus.on('deleteTodo', (Curtodo: TodoType): void => {
  state.todoList = state.todoList.filter(todo => todo.id !== Curtodo.id)
})
// 全选
bus.on('checkall', (checkboxAllState: boolean): void => {
  state.todoList.forEach(todo => (todo.isCompleted = !checkboxAllState))
})
// 清除已完成事件
bus.on('clearDoneTodo', (): void => {
  state.todoList = state.todoList.filter(todo => !todo.isCompleted)
})
</script>

<style></style>
