<script setup lang="ts">
import { CgIcon } from '@/components/cg-template-2';
interface Props extends CgIcon.Props {
  modelValue: boolean;
  label?: string;
  icon?: string;
  activeIcon?: string;
}

withDefaults(defineProps<Props>(), {
  icon: 'i_checkbox',
  activeIcon: 'i_checkbox_active'
});
const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <div class="flex-middle" @click="emit('update:modelValue', !modelValue)">
    <cg-icon style="margin-right: 8px" :width="28" :name="modelValue ? activeIcon : icon" />
    <div>{{ label }}</div>
  </div>
</template>
