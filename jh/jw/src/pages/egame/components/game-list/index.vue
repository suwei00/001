<script setup lang='ts' name="game-list">
import maintainImg from '@images/common/maintain.png?preset=full'
const { flag } = defineProps<{ flag: 'egame' | 'fish' }>()
const type = $(useRouteQuery<string>('type', '0'))
const appStore = useAppStore()
const { launch } = useLaunch()
const { navList } = $(appStore)
// 当前游戏类型列表
const currentNav = $computed(() => {
  const list = navList.find(item => item.key === flag)?.l
  if (!list)
    return []
  return list.map((item) => {
    const { name, id } = item
    return {
      ...item,
      label: name,
      value: id,
    }
  })
})
// 当前游戏类型
let activeType = $ref(+type)
// 点击不同游戏类型时，切换tab选中
watch($$(type), (val) => {
  activeType = +val
})
// 当前游戏类型pid
const pid = $computed(() => currentNav[activeType]?.value)

const isReady = computed(() => !!pid)

const { data, page_size, page, total } = usePage((page, page_size) => () => getGameList({ page: page.value, page_size: page_size.value, flag: 0, pid }), {
  ready: isReady,
  page_size: 20,
  refreshDeps: $$([pid]),
  resetPageDeps: $$([pid]),
})
const maintained = $computed(() => appStore.getGameById(pid)?.maintained)
</script>

<template>
  <div class="game-list">
    <jl-games-tabs
      v-if="currentNav.length" key="game-list" v-model="activeType" flex justify-center mb-22px
      direction="horizontal" :list="currentNav"
    />
    <div class="list-wrapper">
      <ul class="list">
        <li
          v-for="(item, index) in data" :key="item.id" cursor-pointer :data-index="index"
          @click="launch(`${pid}`, item.game_id)"
        >
          <div w-233px h-147px overflow-hidden>
            <jl-cloud-image w="233px" h="147px" is-game class="game-img" :src="item.img_pc" />
          </div>
          <p text-15px color-black-primary lh-40px>
            {{ item.name }}
          </p>
          <div class="mask">
            <button>立即游戏</button>
          </div>
        </li>
      </ul>
      <div v-if="maintained !== 1" class="maintain-box" @click.stop>
        <div class="maintain">
          <img :src="getSupportImage(maintainImg)" alt="">
          <span>场馆维护中⋯</span>
        </div>
      </div>
      <jl-pagination v-model:page-size="page_size" v-model:current-page="page" mt-20px :total="total" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.game-list {
  width: 1300px;
  margin: 0 auto;
  background: #FFFFFF;
  box-shadow: 0px 2px 8px 1px rgba(86, 122, 254, 0.3);
  border-radius: 20px 20px 20px 20px;
  padding: 20px 30px 35px;
  min-height: 300px;

  .list-wrapper {
    border-top: 1px solid rgba(210, 215, 227, 1);
    padding-top: 30px;
    position: relative;

    .list {
      display: flex;
      flex-wrap: wrap;
      margin-top: -20px;
      margin-left: -20px;

      li {
        width: 232px;
        border: 1px solid #CEDAFD;
        border-radius: 6px;
        overflow: hidden;
        margin-left: 20px;
        margin-top: 20px;
        position: relative;
        .game-img{
          transition: all 0.3s ease;
        }
        .mask{
          position: absolute;
          width: 232px;
          height: 0;
          background-color: hsl(0, 0%, 0%, 0.3);
          top: 0;
          left: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          overflow: hidden;
          button{
            color: #fff;
            width: 150px;
            height: 40px;
            background-color: #597EF7;
            border-radius: 8px;
            font-size: 13px;
          }
        }
        &:hover{
          .mask{
            height: 147px;
          }
          .game-img{
            scale: 1.1;
          }
        }
      }
      p{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 0 8px;
      }
    }

    .maintain-box {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: hsla(0, 0%, 100%, 0.35);
      cursor: not-allowed;
      user-select: none;
      z-index: 1998;

      .maintain {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 360px;
        height: 180px;
        background: linear-gradient(180deg, rgba(51, 51, 51, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%);
        box-shadow: 0px 0px 20px 1px rgba(86, 122, 254, 0.6);
        border: 2px solid #96AEFF;
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 12px;

        img {
          width: 97px !important;
          height: 86.73px !important;
          margin-bottom: 14px;
        }

        span {
          width: 113px;
          height: 30px;
          border: 1px solid #fff;
          line-height: 28px;
          border-radius: 50px;
          font-size: 15px;
          color: #FFFFFF;
          text-shadow: 0px 3px 6px rgba(86, 122, 254, 0.6);
          text-align: center;
        }
      }
    }
  }
}
</style>
