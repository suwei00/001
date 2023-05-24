<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import chatGray from '../../assets/image/chat/chat-gray.png?preset=full'
import friendGray from '../../assets/image/chat/friend-gray.png?preset=full'
import myGray from '../../assets/image/chat/my-gray.png?preset=full'
import chatActive from '../../assets/image/chat/chat-active.png?preset=full'
import friendActive from '../../assets/image/chat/friend-active.png?preset=full'
import myActive from '../../assets/image/chat/my-active.png?preset=full'

const chatGrayBg = getImageUrl(chatGray)
const friendGrayBg = getImageUrl(friendGray)
const myGrayBg = getImageUrl(myGray)
const chatActiveBg = getImageUrl(chatActive)
const friendActiveBg = getImageUrl(friendActive)
const myActiveBg = getImageUrl(myActive)
const footList = [
  {
    label: '聊天',
    cname: 'chat-icon',
    path: '/',
  },
  {
    label: '好友',
    cname: 'friends-icon',
    path: '/friends',
  },
  {
    label: '我的',
    cname: 'my-icon',
    path: '/my',
  },
]
</script>

<template>
  <main class="home-main">
    <slot name="header" />
    <section class="content">
      <slot />
    </section>
    <footer class="footer">
      <div class="footer-container">
        <RouterLink v-for="(item, index) in footList" :key="index" class="footer_a" :to="item.path">
          <div class="icon" :class="item.cname">
            <i />
          </div>
          <p>
            {{ item.label }}
          </p>
        </RouterLink>
      </div>
    </footer>
  </main>
</template>

<style lang="scss" scoped>
.home-main {
  display: flex;
  flex-direction: column;
  height: 100%;

  .content {
    flex: 1;
    height: 0;
    background-color: $color-gray-4;
    overflow: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}

.footer {
  width: 100%;
  height: $size66;
  box-shadow: 10px 3px 6px 1px rgba(0, 0, 0, 0.06);
  border-radius: 0px 0px 0px 0px;

  .footer-container {
    width: 100%;
    height: $size66;
    display: flex;
    padding: 0 12px;
    justify-content:space-around;
    background: linear-gradient(180deg, $color-white-2 0%, $color-white-2 100%);

    a {
      flex: 1;
      .icon {
        i {
          display: block;

          margin-top: $size12;
          background-size: cover;
          background-repeat: no-repeat;
        }
      }

      .chat-icon {
        i {
          background-image: v-bind(chatGrayBg);
          width: 24px;
          height: 23px;

        }
      }

      .friends-icon {
        i {
          background-image: v-bind(friendGrayBg);
          width: 22px;
          height: 22px;
        }
      }

      .my-icon {
        i {
          width: 19px;
          height: 22px;
          background-image: v-bind(myGrayBg);
        }
      }

      p {
        margin-top: $size8;
        line-height: 1;
        color: $color-gray-1;
        font-size: $size12;
      }

      &.router-link-active {
        p {
          color: $color-blue-1 !important;
          font-weight: 600;
        }

        .chat-icon {
          i {
            background-image: v-bind(chatActiveBg);
          }
        }

        .friends-icon {
          i {
            background-image: v-bind(friendActiveBg);
          }
        }

        .my-icon {
          i {
            background-image: v-bind(myActiveBg);
          }
        }
      }
    }
  }
}

.footer_a{
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
