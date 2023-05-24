<script setup lang="ts">
import { useImage } from '@/hooks/useImage';
import CgIcon from './index.d';
const { localSrc } = useImage();
const suffixWebp = Array.from(document.documentElement.classList).includes('webp');
interface Props extends CgIcon.Props {
  name: string;
  width?: string | number;
  height?: string | number;
  shadow?: boolean;
}
withDefaults(defineProps<Props>(), {
  name: '',
  width: 40,
  height: 0,
  shadow: false
});

const setSrc = (name: string) => {
  if (name.includes('webp')) {
    return `${localSrc.value}/icon/${name}`;
  } else {
    return `${localSrc.value}/icon/${name}.${suffixWebp ? 'png.webp' : 'png'}`;
  }
};
</script>

<template>
  <img
    class="cg_icon"
    :style="`width: var(--cg-px-${width});height: ${height ? `var(--cg-px-${height})` : ''}`"
    :class="{ shadow }"
    :src="setSrc(name)"
  />
</template>

<style lang="scss" scoped>
.shadow {
  filter: var(--cg-img-shadow);
}
</style>
