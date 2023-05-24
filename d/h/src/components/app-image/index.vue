<template>
  <img class="app-image" :src="src" :alt="props.alt" loading="lazy" />
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useImage } from '@/hooks/useImage';

const props = withDefaults(
  defineProps<{
    src: string;
    alt?: string;
    isGame?: boolean;
    isGoogleCloud?: boolean;
  }>(),
  {
    isGame: false,
    isGoogleCloud: false
  }
);

const isGif = ref(props.src.includes('.gif'));
const isSvg = ref(props.src.includes('.svg'));
const { localSrc, gameSrc, googleCloudSrc } = useImage();
const suffixAvif = false;
const suffixWebp = Array.from(document.documentElement.classList).includes('webp');
// const suffixWebp = false

const src = computed(() => {
  let _src = props.src;
  if (props.isGame) {
    _src = `${gameSrc.value}${props.src}`;
  } else if (props.isGoogleCloud) {
    _src = `${googleCloudSrc.value}${props.src}`;
  } else {
    _src = `${localSrc.value}${props.src}`;
  }

  if (suffixAvif && !_src.includes('webp')) {
    if (!(isGif.value || isSvg.value)) {
      _src = `${_src}.avif`;
    }
  } else if (suffixWebp && !_src.includes('webp')) {
    if (!(isGif.value || isSvg.value)) {
      _src = `${_src}.webp`;
    }
  }
  return _src;
});
</script>
<style lang="scss" scoped></style>
