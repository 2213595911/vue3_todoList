<template>
  <ul class="todo-main">
    <Item v-for="item in todoList" :key="item.id" :todo="item" />
  </ul>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import type { PropType } from 'vue'
import Item from './Item.vue'
import type { TodoType } from '../types'

defineProps({
  todoList: {
    type: Array as PropType<TodoType[]>,
    default: () => [] as PropType<TodoType[]>,
  },
})
</script>

<style scoped></style>
