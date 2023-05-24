<template>
  <teleport to="#App">
    <transition name="fade-toast" mode="out-in" appear @after-leave="handleAfterLeave">
      <div v-if="show" class="toast-wrap" @click="show = false" :style="{ zIndex }">
        <p>{{ message }}</p>
      </div>
    </transition>
  </teleport>
</template>
<script src="./toast.ts"></script>
<style lang="scss" scoped>
.toast-wrap {
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translate(-50%);
  border: 1px solid var(--cg-color-white);
  border-radius: 10px;
  z-index: 2021;

  p {
    text-transform: capitalize;
    background: var(--cg-color-black3);
    text-align: center;
    font-size: 15px;
    color: var(--cg-color-white);
    border-radius: var(--cg-border-button-radius);
    padding: 12px 25px;
    max-width: 450px;
  }
}

.fade-toast-enter-active,
.fade-toast-leave-active {
  transition: all 0.3s ease-out;
}

.fade-toast-enter-from {
  top: 15%;
  opacity: 0;
}

.fade-toast-leave-to {
  top: 15%;
  opacity: 0;
}
</style>
