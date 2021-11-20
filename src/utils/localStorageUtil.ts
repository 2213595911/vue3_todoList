import { TodoType } from '@/types'

export function saveData(value: TodoType[]): void {
  localStorage.setItem('todo_key', JSON.stringify(value))
}

export function getData(): TodoType[] {
  return JSON.parse(localStorage.getItem('todo_key')!) || []
}
