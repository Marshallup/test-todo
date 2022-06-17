<template>
  <h1>Test todos</h1>
  <TodoList
    v-if="todos.length"
    :items="todos"
  >
    <template #header>
      <BaseButton @click="openModal">
        Добавить задачу
      </BaseButton>
    </template>
  </TodoList>
  <div
    v-else-if="isLoadingTodos"
    class="todos-loader"
  >
    Идет загрузка...
  </div>
  <div v-else-if="isErrorRequestTodos" class="error-todos">
    Ошибка при запросе списка
    <BaseButton class="error-todos-btn" @click="loadTodos">
      Повторый запрос
    </BaseButton>
  </div>

  <TodoCreateModalVue
    v-if="isShowModal"
    :show="isShowModal"
    @add-todo="addTodo"
    @close-modal="hideModal"
  />
</template>

<script lang="ts" setup>
import { onMounted, ref, unref } from 'vue';
import { fetchTodos } from './services/todo.service';
import { TodoItemType } from './types/Todos.types';
import TodoCreateModalVue from './components/TodoCreateModal.vue';
import TodoList from './components/TodoList.vue';
import BaseButton from './components/BaseButton.vue';

const isShowModal = ref(false);
const isLoadingTodos = ref(true);
const isErrorRequestTodos = ref(false);
const todos = ref<TodoItemType[]>([]);

async function loadTodos() {
  isLoadingTodos.value = true;
  isErrorRequestTodos.value = false;
  await fetchTodos()
    .then((data) => {
      todos.value = data;
    })
    .catch(() => {
      isErrorRequestTodos.value = true;
    })
    .finally(() => {
      isLoadingTodos.value = false;
    });
}

function openModal() {
  document.body.classList.add('lock');
  isShowModal.value = true;
}
function hideModal() {
  document.body.classList.remove('lock');
  isShowModal.value = false;
}
function addTodo(todo: TodoItemType) {
  todos.value.pop();
  todos.value = [
    todo,
    ...unref(todos),
  ];
  hideModal();
}

onMounted(async () => {
  await loadTodos();
});

</script>
<script lang="ts">
export default {
  name: 'App',
};
</script>

<style lang="scss" scoped>
.todos-loader {
  font-size: 20px;
  text-align: center;
}
.error-todos {
  text-align: center;
  max-width: 400px;
  margin: 0 auto;
  &-btn {
    margin-top: 10px;
  }
}
</style>
