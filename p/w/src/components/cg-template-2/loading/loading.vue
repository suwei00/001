<template>
  <teleport to="#App">
    <transition name="fade-loading" mode="out-in" appear @after-leave="handleAfterLeave">
      <div v-show="show" class="loading-wrap">
        <div class="loading flex ai-c jc-c">
          <div class="anim"></div>
        </div>
      </div>
    </transition>
  </teleport>
</template>
<script src="./loading.ts"></script>
<style lang="scss" scoped>
.loading-wrap {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2020;
  background: rgba(0, 0, 0, 0.2);
  .loading {
    width: 120px;
    height: 120px;
    border-radius: 16px;
    background-color: rgba($color: #000000, $alpha: 0.69);
    .anim {
      width: 100px;
      height: 100px;
      background-repeat: no-repeat;
      background-image: url(link($base-img-dir + 'loading/loading.gif'));
      background-size: cover;
    }
  }
}
.fade-loading-enter-active,
.fade-loading-leave-active {
  transition: all 0.5s ease;
}

.fade-loading-enter-from {
  opacity: 0;
}
.fade-loading-leave-to {
  opacity: 0;
}

</style>
