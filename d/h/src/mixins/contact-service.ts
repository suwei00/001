import { useRouter, useRoute } from 'vue-router';

export default function () {
  const router = useRouter();
  const route = useRoute();
  const goServer = () => {
    route.query.plat ? window.open('yiyappnative://event?type=cs', '_self') : router.push('/customer-service');
  };
  return { goServer };
}
