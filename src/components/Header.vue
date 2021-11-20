<template>
  <div class="todo-header">
    <input type="text" v-model="todoTitle" placeholder="请输入你的任务名称，按回车键确认" @keydown.enter="addTodo" />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { nanoid } from 'nanoid'
import bus from 'vue3-eventbus'

const todoTitle = ref('')
function addTodo(): void {
  if (!todoTitle.value.trim()) return
  const todoInfo = reactive({
    id: nanoid(),
    title: todoTitle.value,
    isCompleted: false,
  })
  bus.emit('addTodo', todoInfo)
  todoTitle.value = ''
}
</script>

<style scoped>
/*header*/
.todo-header input {
  width: 560px;
  height: 28px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px;
}

.todo-header input:focus {
  outline: none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
}

/*main*/
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}

.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}
</style>
