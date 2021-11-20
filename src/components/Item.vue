<template>
  <li :class="{ active: isShow }" @mouseenter="isShow = true" @mouseleave="isShow = false">
    <label>
      <input type="checkbox" v-model="todo.isCompleted" @change="changeState(todo)" />
      <span>{{ todo.title }}</span>
    </label>
    <button class="btn btn-danger" v-show="isShow" @click="deleteTodo(todo)">删除</button>
  </li>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import { ref } from 'vue'
import type { PropType } from 'vue'
import type { TodoType } from '../types'
import bus from 'vue3-eventbus'
defineProps({
  todo: {
    type: Object as PropType<TodoType>,
    default: () => {
      return {} as PropType<TodoType>
    },
  },
})

const isShow = ref(false)
// 修改状态
function changeState(todo: TodoType): void {
  bus.emit('changeTodoState', todo)
}
// 删除事件
function deleteTodo(todo: TodoType) {
  if (confirm('确定删除该事件吗？')) bus.emit('deleteTodo', todo)
}
</script>
<style scoped>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}
li.active {
  background: #27ae60;
  transition: all 0.3s;
  color: white;
}
</style>
