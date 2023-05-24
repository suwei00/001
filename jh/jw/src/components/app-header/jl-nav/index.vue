<script setup lang='ts' name="jl-nav">
import type { ArrElement } from '~/api/type'

const router = useRouter()
const { currentRoute } = $(router)
const appStore = useAppStore()
const { launch } = useLaunch()
const { navGameList, navList } = $(storeToRefs(appStore))
// 点击nav
const handleNavClick = (item: ArrElement<typeof navList>) => {
  router.push(item.path!)
}
let currentKey = $ref<null | string>(null)

// 鼠标移入nav
const handleMouseEnter = (item: ArrElement<typeof navList>) => {
  if (currentKey !== item.key)
    currentKey = item.key!
}
// 鼠标移出nav
const handleMouseLeave = () => {
  currentKey = null
}
const handleLaunch = (item: ArrElement<ArrElement<typeof navGameList>['l']>) => {
  launch(item.id)
}
</script>

<template>
  <div class="nav">
    <ul class="nav-list">
      <li
        v-for="item in navList" :key="item.id" :class="{ active: item.key === currentRoute.meta.key }"
        @mouseenter="handleMouseEnter(item)" @mouseleave="handleMouseLeave()" @click="handleNavClick(item)"
      >
        {{ item.label }}
      </li>
    </ul>

    <teleport to="body">
      <div v-if="navGameList?.length" class="games">
        <ul
          v-for="currentGames in navGameList" :key="currentGames.key" class="game-list"
          :class="[currentGames.key, currentKey === currentGames.key ? 'active' : '']"
        >
          <li
            v-for="(item, index) in currentGames.l" :key="item.id" :data-index="index" :style="{ width: item.width }"
            class="game-item" @click="handleLaunch(item)"
          >
            <jl-image
              h-full w-full hover-translate-y--10px transition-all transition-duration-300 :src="item.src!"
              :thumb="item.thumbnail!"
            />
            <maintain
              height="190px" :enable="item.maintained !== 1" :z-index="2000"
            />
          </li>
        </ul>
      </div>
    </teleport>
  </div>
</template>

<style lang="scss" scoped>
.nav {
  height: 100%;

  .nav-list {
    display: flex;
    padding-right: 38px;
    margin-left: -24px;
    height: 100%;

    li {
      display: flex;
      align-items: center;
      font-size: 18px;
      line-height: 25px;
      color: $text-primary;
      margin-left: 24px;
      cursor: pointer;
      user-select: none;
      @include overline-from-center($color-primary-second);
    }
  }

}
</style>

<style lang="scss">
.games {
  position: fixed;
  top: 80px;
  left: 0;
  width: 100%;
  min-width: 1400px;
  z-index: 1996;

  .game-list {
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(180deg, #E1E7FB 0%, #FFFFFF 54%, #FFFFFF 100%);
    transform: translateY(-200%);
    transition: all 0.4s;
    z-index: 0;
    overflow: hidden;
    box-shadow: 0px 0px 50px 1px rgba(0, 0, 0, 0.2);

    &:hover,
    &.active {
      transform: translateY(0);
      z-index: 1;
    }

    .game-item {
      position: relative;
      height: 50px;
      cursor: pointer;
      height: 320px;
      transition: all 0.5s ease;

      &:hover {
        scale: 1.05;
        transform: translateY(5px);
      }
    }
  }
}
</style>
