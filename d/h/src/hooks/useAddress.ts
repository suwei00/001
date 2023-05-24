import axios from 'axios';
import { computed, reactive, ref, watch } from 'vue';

/**
 * 获取国家地区列表
 * @description: useAddress
 * @param {*}
 */
export function useAddress() {
  const address = ref([]);
  const cityObj = reactive({
    region: '',
    province: '',
    city: '',
    area: '',
  });

  axios.get('https://dl-sg.td22t5f.com/lang/error/VietnamCity.json').then(res => {
    address.value = res.data;
  })

  watch(() => cityObj.region, (val) => {
      cityObj.province = '';
      cityObj.city = '';
      cityObj.area = '';
  })
  watch(() => cityObj.province, (val) => {
      cityObj.city = '';
      cityObj.area = '';
  })
  watch(() => cityObj.city, (val) => {
      cityObj.area = '';
  })

  // 南，北，中
  const regionOptionLot = computed(() => {
    return address.value.map((item: any) => {
      return {
        label: item.name,
        value: item.name,
      }
    })
  });
  // 省
  const provinceOptionLot = computed(() => {
    const list = address.value.find((item: any) => item.name === cityObj.region) as any;
    if (list) {
      // cityObj.province = list.children[0].name;
      return list.children.map((item: any) => {
        return {
          label: item.name,
          value: item.name,
        }
      })
    }
    return []
  });
  // 市
  const cityOptionLot = computed(() => {
    const list = address.value.find((item: any) => item.name === cityObj.region) as any;
    if (list) {
      const province = list.children.find((item: any) => item.name === cityObj.province) as any;
      if (province) {
        // cityObj.city = province.children[0].name;
        return province.children.map((item: any) => {
          return {
            label: item.name,
            value: item.name,
          }
        })
      }
    }
    return []
  });
  // 区
  const areaOptionLot = computed(() => {
    const list = address.value.find((item: any) => item.name === cityObj.region) as any;
    if (list) {
      const province = list.children.find((item: any) => item.name === cityObj.province) as any;
      if (province) {
        const city = province.children.find((item: any) => item.name === cityObj.city) as any;
        if (city) {
          // cityObj.area = city.children[0].name;
          return city.children.map((item: any) => {
            return {
              label: item.name,
              value: item.name,
            }
          })
        }
      }
    }
    return []
  });

  return {
    regionOptionLot,
    provinceOptionLot,
    cityOptionLot,
    areaOptionLot,
    cityObj
  }
}