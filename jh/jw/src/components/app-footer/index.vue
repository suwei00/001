<script setup lang="ts" name="app-footer">
const router = useRouter()
</script>

<template>
  <div class="app-footer">
    <div class="brands">
      <brand src="footer/cg.svg" w-126px h-46px />
      <brand src="footer/ag.svg" w-124px h-46px />
      <brand src="footer/bbin.svg" w-116px h-46px />
      <brand src="footer/og.svg" w-86px h-46px />
      <brand src="footer/ebet.svg" w-134px h-46px />
      <brand src="footer/bg.svg" w-152px h-46px />
      <brand src="footer/dg.svg" w-98px h-46px />
      <brand src="footer/wm.svg" w-70px h-46px />
      <brand src="footer/evo.svg" w-136px h-46px />
      <brand src="footer/im.svg" w-218px h-46px />
    </div>
    <div class="brands">
      <brand src="footer/saba.svg" w-152px h-46px />
      <brand src="footer/fb.svg" w-114px h-46px />
      <brand src="footer/ky.svg" w-155px h-46px />
      <brand src="footer/kx.svg" w-155px h-46px />
      <brand src="footer/pg.svg" w-155px h-46px />
      <brand src="footer/mg.svg" w-90px h-46px />
      <brand src="footer/jdb.svg" w-100px h-46px />
      <brand src="footer/cq9.svg" w-110px h-46px />
    </div>
    <div class="desc">
      <p>
        久赢娱乐拥有菲律宾政府竞猜委员会（PAGCOR）、欧洲马耳他（MGA）和英国博彩委员会（GAMBLING COMMISSION）颁发的合法执照。
      </p>
      <p>注册于英属维尔京群岛（BVI），是受国际行业协会认可的合法公司。进行注册并娱乐前，请确保您年满18周岁！</p>
    </div>
    <div class="mechanisms">
      <brand src="footer/pagcor.svg" w-196px h-64px />
      <brand src="footer/mga.svg" w-194px h-64px />
      <brand src="footer/bf.svg" w-194px h-64px />
      <brand src="footer/gc.svg" w-194px h-66px />
    </div>

    <ul class="links">
      <li @click="router.push('/help/register?category=0')">
        帮助指南
      </li>
      <li @click="router.push('/help/responsibility?category=2')">
        博彩责任
      </li>
      <li @click="router.push('/help/privacy?category=2')">
        隐私声明
      </li>
      <li @click="router.push('/help/terms?category=2')">
        规则条款
      </li>
      <li @click="router.push('/help/service?category=3')">
        联系我们
      </li>
    </ul>
    <p class="copyright">
      版权所有 ©2021-2023 久赢娱乐 保留所有权
    </p>
  </div>
</template>

<style lang="scss" scoped>
.app-footer {
  padding: 20px 0;
  background-color: #2F3742;
  position: relative;

  i {
    display: inline-block;
    transition: all .5s;
  }

  .brands {
    display: flex;
    align-items: center;
    justify-content: center;
    &+.brands {
      margin-top: 15px;
    }

  }

  .mechanisms {
    padding-top: 20px;
    padding-bottom: 30px;
    display: flex;
    justify-content: center;

  }

  .desc {
    padding-top: 15px;
    color: #717C93;
    line-height: 18px;
    font-size: 13px;
  }

  .links {
    display: flex;
    justify-content: center;

    li {
      color: #717C93;
      font-size: 13px;
      line-height: 20px;
      padding: 0 20px;
      cursor: pointer;

      &+li {
        border-left: 1px solid #717C93;
      }
    }
  }

  .copyright {
    margin-top: 20px;
    color: #717C93;
    font-size: 12px;
  }
}
</style>
