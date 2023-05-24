<script setup lang='ts' name="personal-dialog">
const { title, des } = defineProps<{ title: string; des?: string }>()

onMounted(() => animePopup())
</script>

<template>
  <div class="diolog">
    <main class="anime-item">
      <div class="title" mb-34px>
        <div class="left">
          <h5>{{ title }}</h5>
          <span class="des">{{ des }}</span>
        </div>
        <slot name="right" />
      </div>
      <slot name="body" />
    </main>
  </div>
</template>

    <style lang="scss" scoped>
    .diolog {
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        background-color: hsl(0, 0%, 0%, 0.3);
        z-index: 2000;
        color: #333;
    }

    main {
        width: 550px;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0px 10px 80px 1px rgba(0, 0, 0, 0.05);
        padding: 42px 50px 58px;
        position: absolute;
        top: 15%;
        left: 50%;
        transform: translateX(-50%);

        .title {
            text-align: left;
            position: relative;

            h5 {
                font-size: 18px;
                font-family: $jl-font;
                font-weight: 600;
            }

            .des {
                font-size: 12px;
                font-family: $jl-font;
                font-weight: 400;
                color: #94A6B7;
            }
        }
    }
    </style>

