<template>
  <div class="overlay">
    <div class="modal">
      <div class="modal-inner">
        <div class="modal-content">
          <div class="modal-title">
            Создать запись
          </div>
          <form class="modal-form" @submit.prevent="onSubmit">
            <div
              v-for="item in data"
              :key="item.id"
              class="modal-form-item"
            >
              <label class="label" :for="item.id">
                <span class="label-text">
                  {{ item.label }}
                </span>
                <input
                  v-if="item.tag === 'input'"
                  class="modal-form-el input"
                  :id="item.id"
                  :type="item.type || 'text'"
                  v-model="item.value"
                  @input="validateItem(item)"
                />
                <select
                  v-if="item.tag === 'select'"
                  v-model="item.value"
                  :id="item.id"
                  class="modal-form-el select"
                  @change="validateItem(item)"
                >
                  <template v-if="item.options">
                    <option
                      v-for="option in item.options"
                      :key="option"
                      :value="option"
                    >
                      {{ option }}
                    </option>
                  </template>
                </select>
                <textarea
                  v-if="item.tag === 'textarea'"
                  :id="item.id"
                  class="modal-form-el textarea"
                  v-model="item.value"
                  @change="validateItem(item)"
                />
                <div class="modal-form-item-error">
                  {{ item.error }}
                </div>
              </label>
            </div>

            <div class="modal-footer">
              <BaseButton
                class="modal-btn"
                variant="danger"
                @click="closeModal"
              >
                Отмена
              </BaseButton>
              <BaseButton
                class="modal-btn"
                type="submit"
                variant="success"
                :disabled="hasError"
              >
                Создать
              </BaseButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  defineProps,
  reactive,
  defineEmits,
  ref,
  watch,
} from 'vue';
import { TodoItemType } from '@/types/Todos.types';
import BaseButton from './BaseButton.vue';

interface TodoCreateModalProps {
  show: boolean,
}
interface TodoCreateEmits {
  (event: 'addTodo', todo: TodoItemType): void,
  (event: 'closeModal'): void,
}
const emits = defineEmits<TodoCreateEmits>();
defineProps<TodoCreateModalProps>();

interface FormItem {
  id: string,
  label: string,
  value: string,
  error: string,
  tag: 'input' | 'textarea' | 'select',
  type?: 'text' | 'date',
  rules?: string[],
  options?: string[],
}

const data = reactive<FormItem[]>([
  {
    id: 'title',
    label: 'Заголовок',
    value: '',
    error: '',
    tag: 'input',
    type: 'text',
    rules: ['required'],
  },
  {
    id: 'date',
    label: 'Дата',
    value: '',
    error: '',
    tag: 'input',
    type: 'date',
    rules: ['required', 'dateNow'],
  },
  {
    id: 'tag',
    label: 'Тип задач',
    value: '',
    error: '',
    tag: 'select',
    options: ['Личное', 'Работа', 'Дом', 'Животные'],
    rules: ['required'],
  },
  {
    id: 'body',
    label: 'Описание',
    value: '',
    error: '',
    tag: 'textarea',
  },
]);
const hasError = ref(false);

function validateItem(item: FormItem): boolean {
  let hasError = false;
  item.rules?.forEach((rule) => {
    switch (rule) {
      case 'required':
        if (!item.value) {
          item.error = 'Поле обязательно для заполнения';
          hasError = true;
        } else {
          item.error = '';
        }
        break;
      case 'dateNow':
        if (item.value && item.type === 'date') {
          const dateNow = new Date();
          const dateChoised = new Date(`${item.value} 23:59:59`);

          if (dateNow.getTime() >= dateChoised.getTime()) {
            item.error = 'Дата не может быть меньше сегодняшней';
            hasError = true;
          } else {
            item.error = '';
          }
        }
        break;
      default:
        break;
    }
  });

  return hasError;
}

function validateData(): boolean {
  let hasErrors = false;
  data.forEach((item) => {
    if (validateItem(item)) {
      hasErrors = true;
    }
  });

  return hasErrors;
}

function getElementByID(id: string) {
  return data.find((item) => item.id === id);
}

function createTodoData(): TodoItemType {
  const title = getElementByID('title');
  const date = getElementByID('date');
  const tag = getElementByID('tag');
  const body = getElementByID('body');

  return {
    id: `${Date.now()}_${tag?.value}`,
    userId: 1,
    title: title?.value as string,
    date: date?.value,
    tag: tag?.value,
    body: body?.value,
    completed: false,
  };
}

function onSubmit() {
  const errors = validateData();

  if (!errors) {
    emits('addTodo', createTodoData());
  }
}
function closeModal() {
  emits('closeModal');
}

watch(data, (dataVal) => {
  hasError.value = dataVal.some((item) => item.error);
}, { deep: true });

</script>
<script lang="ts">
export default {
  name: 'TodoCreateModal',
};
</script>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0, .3);
  overflow-x: auto;
  overflow-y: scroll;
}
.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  padding: 20px;
  color: black;
  &-form {
    &-el {
      width: 100%;
      margin: 0;
      padding: 10px;
    }
    &-item {
      margin-bottom: 20px;
      &-error {
        color: red;
        font-size: 14px;
        margin-top: 5px;
      }
    }
  }
  &-title {
    font-size: 20px;
    text-align: center;
    margin-bottom: 20px;
  }
  &-content {
    width: 320px;
    max-width: 100%;
    background-color: white;
    padding: 20px;
  }
  &-btn {
    margin-right: 5px;
    &:last-child {
      margin-right: 0;
    }
  }
  &-footer {
    display: flex;
    align-items: center;
  }
}
.label {
  display: flex;
  flex-wrap: wrap;
  &-text {
    width: 100%;
    margin-bottom: 7px;
  }
}
</style>
