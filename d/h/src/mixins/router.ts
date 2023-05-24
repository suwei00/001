import { useRoute, useRouter } from 'vue-router';
import bus from '@/utils/bus';

// 路由返回
export default function useBackRouter(defaultPath: string = 'home') {
  const router = useRouter();
  const route = useRoute();
  const { query, path } = router.currentRoute.value;
  const key: string = `${path}-from-route`;
  const firstRoute: any = sessionStorage.getItem(key);
  // 记录首次 进入页面路由
  if (query.from !== firstRoute && query.from !== undefined) {
    sessionStorage.setItem(key, String(query.from));
  }
  function goBack(field?: string) {
    const fromPath = sessionStorage.getItem(key);
    // 如果已存第一次访问路由跳转对应路由
    const toPath: any = fromPath || firstRoute || defaultPath;
    router.push(`/${toPath}`);

    // 登记活动
    if (field) {
      const timer = setTimeout(() => {
        bus.emit('completionBind', field)
        clearTimeout(timer)
      }, 100);
    }
  }
  const goTo = (p: string, q?: { [prop: string]: string }) => {
    router.push({ path: p, query: { from: route.path.replace('/', ''), ...q } });
  };
  return {
    goBack,
    goTo
  };
}
