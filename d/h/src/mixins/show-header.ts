import { ref } from 'vue';
import { useRoute } from 'vue-router';

export default function () {
  const route = useRoute();
  const isShowHeader = ref(true);
  console.log(route.query.plat);
  if (route.query.plat) {
    isShowHeader.value = false;
  }
  console.log(isShowHeader);
  return { isShowHeader };
}
