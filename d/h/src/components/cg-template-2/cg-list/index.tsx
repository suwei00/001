// 禁用当前文件的ts检查
// @ts-nocheck

import { defineComponent, PropType, reactive, ref, VNodeRef } from "vue";
import { CgEmpty } from '@/components/cg-template-2';
import { useLoading } from '@/hooks/useLoading';
import List from './list.vue'

const { startLoading, closeLoading } = useLoading();
type ApiCaller = (params: any) => Promise<any>;

export default defineComponent({
  name: "CgList",
  emits: ['changeData'],
  props: {
    listApi: {
      type: Function as PropType<ApiCaller>,
      default: () => { }
    },
    formData: {
      type: Object as PropType<any>,
      default: () => ({})
    },
    disabledRefresh: {
      type: Boolean,
      default: true
    },
    isLoading: {
      type: Boolean,
      default: true
    }
  },
  setup(props, { slots, emit, expose }) {

    const refreshing = ref(false);

    const loading = ref(false);
    const finished = ref(false);

    const tableData = ref<any[]>([]);
    const agg = ref<any>({});
    const names = ref<any[]>([]);

    // 分页props
    const paginationProps = reactive({
      page: 1,
      page_size: 10,
      total: 0,
    });

    const getListData = async (page?: number) => {
      if (page) {
        paginationProps.page = page;
      }

      return new Promise(async (resolve, reject) => {
        try {
          props.isLoading && startLoading();
          const params = {
            page: page || paginationProps.page,
            page_size: paginationProps.page_size,
            ...props.formData
          }
          const result = await props.listApi(params);

          props.isLoading && closeLoading();


          // 没有分页的情况
          if (result.t === undefined) {
            finished.value = true;
          }

          if (refreshing.value || params.page === 1) {
            console.info('删除数据')
            tableData.value = [];
            refreshing.value = false;
          }

          tableData.value.push(...(result.d || []));

          if (paginationProps.page === 1) {
            paginationProps.total = result.t;
            agg.value = result.agg || {};
          }

          if (result.names && paginationProps.page === 1) {
            names.value = result.names || [];
          }

          console.log('接口数据', tableData.value)


          emit('changeData', tableData.value, {
            agg: agg.value,
            names: names.value,
            t: paginationProps.total
          });
          resolve(result);

        } catch (error) {

          console.log('cg-table error')
          reject(error);
          props.isLoading && closeLoading();

        }
      })
    };
    const onLoad = async () => {
      console.error('执行indextsx load')
      await getListData(paginationProps.page);
      loading.value = false;
      if ((paginationProps.page * paginationProps.page_size) >= paginationProps.total) {
        console.error('没有更多了')
        finished.value = true;
      } else {
        paginationProps.page++;
      }
    }

    const onRefresh = async () => {
      console.error('触发刷新')
      paginationProps.page = 1;
      loading.value = true;
      finished.value = false;
      onLoad();
    }

    const getDefaultSlots = () => {
      // console.error('slots.default', slots.default?.())
      return slots.default?.({
        data: tableData.value,
        agg: agg.value,
        names: names.value
      })
    }

    onRefresh();

    expose({
      onRefresh, agg
    })

    return () => (
      <div class="cg-list">
        <van-pull-refresh
          v-model={refreshing.value}
          onRefresh={onRefresh}
          loading-text=""
          disabled={props.disabledRefresh}
        >
          {slots.top?.({
            data: tableData.value,
            agg: agg.value,
            names: names.value,
          })}
          {
            (tableData.value.length === 0) ?
              slots.empty ? slots?.empty() : getDefaultSlots() :
              <List
                v-model={loading.value}
                finished={finished.value}
                onLoad={onLoad}
              >
                {getDefaultSlots()}
              </List>
            // <van-list
            //   v-model={[loading.value, 'loading']}
            //   finished={finished.value}
            //   immediate-check={false}
            //   finished-text=""
            //   loading-text=" "
            //   onLoad={onLoad}
            // >
            //   {getDefaultSlots()}
            // </van-list>
          }
        </van-pull-refresh>
      </div>
    )
  },
});