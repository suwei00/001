<script setup lang="ts" name="flip">
import Tick from '@pqina/flip'
import '@pqina/flip/dist/flip.min.css'
const { value } = defineProps<{ value: string | number }>()
const tickRef = ref(null)
let tick = $ref<any>()
onMounted(() => {
  tick = Tick.DOM.create(tickRef.value, {
    value,
  })
  watchEffect(() => tick.value = toThousands(toFloat(value)))
})
onBeforeUnmount(() => {
  Tick.DOM.destroy(tickRef.value)
})
</script>

<template>
  <div ref="tickRef" class="tick">
    <div data-repeat="true" aria-hidden="true">
      <span data-view="flip" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.tick {
  font-size: 3em;
  white-space: nowrap;
}

:deep(.tick-flip) {
  margin-left: 0;
  .tick-flip-panel {
    background-color: #597EF7;
  }

  .tick-flip-panel-text-wrapper {
    font-family: $jl-font;
    font-weight: bold;
  }

  &:nth-last-child(4n+3) {
    width: 30px;
    max-width: 30px;
    min-width: 30px;
    margin-right: 0;
    margin-left: 0;

    .tick-flip-card {
      display: none;
    }

    .tick-flip-panel-text-wrapper {
      color: red;
    }

    .tick-flip-panel-back-shadow {
      display: none;
    }

    .tick-flip-spacer {
      visibility: visible;
      width: 20px;
      text-align: center;
      color: #597EF7;
      font-family: $jl-font;
      font-weight: bold;
    }

    .tick-flip-shadow {
      display: none;
    }

    .tick-flip-card-shadow {
      display: none;
    }
  }
}
</style>
