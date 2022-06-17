<template>
  <button
    class="btn"
    :class="colorClass"
    :type="type"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import {
  withDefaults,
  computed,
  ButtonHTMLAttributes,
  defineProps,
} from 'vue';

interface BaseButtonProps {
  variant?: 'default' | 'success' | 'danger',
  type?: ButtonHTMLAttributes['type'],
  disabled?: boolean,
}
const props = withDefaults(defineProps<BaseButtonProps>(), {
  variant: 'default',
  type: 'button',
  disabled: false,
});
const colorClass = computed(() => `btn--${props.variant}`);

</script>

<style lang="scss" scoped>
.btn {
  color: white;
  border: none;
  font-weight: 600;
  font-size: 17px;
  padding: 13px;
  width: 100%;
  border-radius: 10px;
  cursor: pointer;
  outline: none;
  &--default {
    background-color: #6d09fe;
  }
  &--success {
    background-color: #4caf50;
  }
  &--danger {
    background-color: #e53935;
  }
  &:disabled {
    background-color: grey;
    cursor: default;
  }
}
</style>
