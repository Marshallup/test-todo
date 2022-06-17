<template>
  <li class="item">
    <div class="item-title">
      {{ title }}
    </div>
    <div v-if="item.body">
      <hr />
      <p>
        {{ item.body }}
      </p>
      <hr />
    </div>
    <div class="item__userInfo">
      UserID: {{ item.userId }}
    </div>
  </li>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { TodoItemType } from '@/types/Todos.types';

interface TodoItemProps {
  item: TodoItemType,
}

const props = defineProps<TodoItemProps>();
const title = computed(() => {
  if (props.item.date && props.item.tag) {
    return `${props.item.tag} - ${props.item.date} - ${props.item.title}`;
  }
  if (props.item.tag) {
    return `${props.item.tag} - ${props.item.title}`;
  }
  if (props.item.date) {
    return `${props.item.date} - ${props.item.title}`;
  }

  return props.item.title;
});

</script>
<script lang="ts">
export default {
  name: 'TodoItem',
};
</script>

<style lang="scss" scoped>
.item {
  min-height: 75px;
  padding: 10px 15px;
  margin-bottom: 10px;
  background-color: #128bff;
  border-radius: 10px;
  color: white;
  font-weight: 500;
  &:last-child {
    margin-bottom: 0;
  }
  &__userInfo {
    margin-top: 10px;
    text-align: center;
  }
  &-title {
    font-size: 18px;
    font-weight: 600;
  }
  &-date {
    font-weight: 500;
    font-size: 15px;
    text-align: right;
  }
}
</style>
