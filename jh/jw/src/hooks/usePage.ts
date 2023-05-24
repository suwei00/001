import type { Ref } from 'vue'
import type { Options, Service } from 'vue-request'
/**
 * @description usePage在useRequest上增加的新参数
 * @interface CustomOptions
 */
interface CustomOptions {
  totalKey?: string // 映射返回结果中的total,使用lodash get方法
  dataKey?: string // 映射返回结果中的list,使用lodash get方法
  resetPageDeps?: Ref<any>[] // 设置哪些依赖属性变更会重置page为1
  page?: number // 默认页码
  page_size?: number // 默认每页数量
}
/**
 * @description 在useRequest改进，管理分页请求
 *  1.暴露page,page_size,total,自动管理
 *  2.新增option配置resetPageDeps，设置要重置页码的属性值
 *  3.使用totalKey,dataKey结合lodash获取总数和列表数据
 * @template R
 * @template P
 * @param {(page: Ref<number>, page_size: Ref<number>) => Service<R, P>} service
 * @param {(Options<R, P> & CustomOptions)} [options]
 */
function usePage<D = any[], R = any, P extends unknown[] = any>(service: (page: Ref<number>, page_size: Ref<number>) => Service<R, P>, options?: Options<R, P> & CustomOptions) {
  const page = ref(options?.page ?? 1)
  const page_size = ref(options?.page_size ?? 10)
  const total = ref(0)
  const direction = ref(true)
  const refreshDeps = options?.refreshDeps ? [...options.refreshDeps, page_size, page] : [page_size, page]
  const {
    data: resData,
    run,
    ...rest
  } = useRequest(service(page, page_size)
    , {
      ...options,
      refreshDeps,
      loadingKeep: 500,
      onAfter(params) {
        // 业务需求，只有第一页后端才返回的total数量
        if (page.value === 1) {
          console.log(resData.value)
          total.value = get(resData.value, options?.totalKey ?? 't', 0)
        }
        // 处理默认onAfter事件
        options?.onAfter?.(params)
      },
    })
  const data = computed<D>(() => get(resData.value, options?.dataKey ?? 'd', []))
  /**
   * @description 重置当前页码为1
   */
  const resetPage = () => page.value = 1
  /**
   * @description 查询
   * @return {*}
   */
  const search = () => {
    if (page.value === 1)
      return (run as any)()
    else
      resetPage()
  }
  //  监听要重置页码为1的数组
  if (options?.resetPageDeps?.length) {
    watch(options.resetPageDeps, () => {
      if (page.value !== 1)
        page.value = 1
    }, { flush: 'sync' })
  }
  // 监听页码变化,true变大，false变小
  watch(page, (newVal, oldVal) => {
    direction.value = newVal > oldVal
  })
  return { ...rest, page, page_size, data, total, direction, resetPage, run, search }
}
export default usePage
