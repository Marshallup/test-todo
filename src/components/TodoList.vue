<template>
  <div class="todos">
    <div
      v-if="isHeaderSlot"
      class="todos-header"
    >
      <slot name="header" />
    </div>
    <ul class="todos-list">
      <TodoItem
        v-for="item in items"
        :key="item.id"
        :item="item"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
import { defineProps, useSlots, computed } from 'vue';
import { TodoItemType } from '@/types/Todos.types';
import TodoItem from './TodoItem.vue';

interface TodoListProps {
  items: TodoItemType[],
}

defineProps<TodoListProps>();

const slots = useSlots();
const isHeaderSlot = computed(() => slots.header);

</script>
<script lang="ts">
export default {
  name: 'TodoList',
};
</script>

<style lang="scss" scoped>
.todos {
  padding: 0 15px;
  width: 420px;
  max-width: 100%;
  margin: 0 auto;
  &-header {
    margin-bottom: 20px;
  }
  &-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
    text-align: center;
  }
}
</style>
