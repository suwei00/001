import { ref } from 'vue';
import { APIs } from '@/http';
import { useLoading } from '@cg-template-1-components/loading';
export default function () {
  const vipList = ref<any[]>([]);
  const vipRebate = ref<any[]>([]);
  const loading = useLoading();
  const initVIPinfo = () => {
    loading.open();
    APIs.getVIPList().then((res: any) => {
      vipList.value = res;
      loading.close();
    });
  };
  const initVipRebate = () => {
    APIs.getVIPRebate().then((res: any) => {
      vipRebate.value = res;
    });
  };
  return { vipList, initVIPinfo, initVipRebate, vipRebate };
}
