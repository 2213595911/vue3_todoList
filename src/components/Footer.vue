<template>
  <div class="todo-footer">
    <label>
      <input type="checkbox" v-model="checkboxAll" />
    </label>
    <span>
      <span>已完成{{ doneTodoListCount }} </span> / 全部 {{ todoListCount }}
    </span>
    <button class="btn btn-danger" @click="clearDoneTodo">清除已完成任务</button>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue'
import type { PropType } from 'vue'
import type { TodoType } from '../types'
import bus from 'vue3-eventbus'
const props = defineProps({
  todoList: {
    type: Array as PropType<TodoType[]>,
    default: () => [] as PropType<TodoType[]>,
  },
})

const todoListCount = computed(() => props.todoList.length)
const doneTodoListCount = computed(() => props.todoList.reduce((p, c) => (p += c.isCompleted ? 1 : 0), 0))
const checkboxAll = computed({
  get() {
    return doneTodoListCount.value === props.todoList.length && doneTodoListCount.value > 0
  },
  set() {
    bus.emit('checkall', checkboxAll.value)
  },
})
function clearDoneTodo(): void {
  if (confirm('确定清除所有已完成事件吗？')) bus.emit('clearDoneTodo')
}
</script>
<style scoped>
/*footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>
