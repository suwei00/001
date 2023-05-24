import { defineComponent, nextTick, PropType, reactive, ref, VNodeRef, watch, onMounted } from "vue";
import { CgContainer, CgContainerHead, CgEmpty, CgPagination } from '@/components/cg-template-2';
import { ElTable, ElTableColumn } from 'element-plus'
import "element-plus/lib/theme-chalk/el-table.css";
import './table'
import Sort from './sort'
import { formatNumToCurrencyWithK, toDecimalsLen, toTwoDecimalsCurrency } from '@/utils/format'
import { useLoading } from '@/hooks/useLoading'


export interface CgTableColumns {
  title: string;
  field: string;
  align?: 'left' | 'center' | 'right';
  isSort?: boolean;
  sortValue?: string;
  width?: string;
}

type ApiCaller = (params: any) => Promise<any>;


export default defineComponent({
  name: 'CgTable',
  props: {
    listApi: {
      type: Function as PropType<ApiCaller>,
      default: () => { }
    },
    columns: {
      type: Array as PropType<CgTableColumns[]>,
      default: () => []
    },
    formData: {
      type: Object as PropType<any>,
      default: () => ({})
    },
    isFirstLoad: {
      type: Boolean,
      default: true
    },
    summaryFields: {
      type: Array as PropType<string[]>,
      default: () => []
    }
  },
  emits: ['sort', 'changeData'],
  setup(props, { emit, slots, expose }) {

    const columns = ref<CgTableColumns[]>(props.columns || []);
    const agg = ref<any>({});
    const tableRef = ref<VNodeRef | null>(null);
    const result2 = ref<any>({})
    const { startLoading, closeLoading } = useLoading();

    const reset = (exclude?: string) => {
      columns.value.forEach((column) => {
        if (column.field !== exclude) {
          column.sortValue = ''
        }
      })
    }

    const sort = (field: string, type: string) => {
      paginationProps.page = 1;
      emit('sort', field, type)
      reset(field)
    }

    const tableData = ref<any>([]);

    // 分页props
    const paginationProps = reactive({
      page: 1,
      page_size: 10,
      total: 0,
    });

    const handleData = (data: any[]) => {
      const list = data.map(item => {
        const obj = { ...item }
        const keys = Object.keys(obj);
        keys.forEach(key => {
          const _: any = props.columns?.find(ele => ele.field === key);
          if (_?.handle) {
            obj['origin_' + key] = obj[key];
            obj[key] = _?.handle(obj);
          }
        })
        return obj;
      });
      return list;
    }

    const setTableFooterColor = () => {
      const tableFooter = tableRef.value?.$el.querySelector('.el-table__footer-wrapper');
      if (tableFooter) {
        const cell = tableFooter.querySelectorAll('.cell');
        cell.forEach((item: any) => {
          // 如果首字母是-，则设置为红色
          if (item.innerText && item.innerText[0] !== '-') {
            item.style.color = 'var(--cg-color-grey1)';
            item.style.font = 'var(--cg-font-text1)';
          } else {
            item.style.color = 'var(--cg-color-red)';
            item.style.font = 'var(--cg-font-text1)';
          }
        })
      }
    }

    const getListData = async (page?: number) => {
      if (page) {
        paginationProps.page = page;
      }
      try {
        startLoading();
        const params = {
          page: paginationProps.page,
          page_size: paginationProps.page_size,
          ...props.formData
        }
        const result = await props.listApi(params);
        tableData.value = handleData(result.d || []);
        if (params.page === 1) {
          result2.value = result;
        } else {
          let names = [];
          if (result2.value.names) {
            names = JSON.parse(JSON.stringify(result2.value.names));
          }
          result2.value = result;
          result2.value.names = names;
        }
        emit('changeData', result2.value);
        if (params.page === 1) {
          paginationProps.total = result.t;
          agg.value = result.agg || {};
        }

        closeLoading();

        nextTick(() => {
          setTableFooterColor();
        })
      } catch (error) {

        closeLoading();
        console.log('cg-table', error)
      }
    };

    onMounted(() => {
      props.isFirstLoad && getListData();
    });

    const pageChange = (page: number) => {
      paginationProps.page = page;
      getListData();
    }

    // 汇总，只支持summaryFields中的字段
    const summaryMethod = (param: any) => {
      const { columns, data } = param
      const sums: string[] = []
      columns.forEach((column: any, index: any) => {
        if (index === 0) {
          sums[index] = 'Tổng'
          return
        }
        if (props.summaryFields.includes(column.property)) {
          sums[index] = agg.value[column.property] ? `${(toTwoDecimalsCurrency(agg.value[column.property]))}K` : '';
        } else {
          sums[index] = ''
        }
      })

      return sums
    };

    watch(() => props.columns, (val) => {
      console.log('变化了columns', val)
      columns.value = val;
    })
    expose({
      getListData,agg
    })

    return () => (
      <div class="cg-table">
        <CgContainer v-slots={{
          content: () => (
            <ElTable
              ref={tableRef}
              key={columns.value.length}
              show-summary={props.summaryFields.length > 0}
              summary-method={summaryMethod}
              data={tableData.value}
              v-slots={{
                empty: () => (
                  slots.empty ? (slots.empty!()) : <CgEmpty />
                )
              }}>
              {
                columns.value.map((column) => (
                  <ElTableColumn
                    align={column?.align || 'center'}
                    width={column.width}
                    label={column.title}
                    prop={column.field}
                    v-slots={{
                      header: ({ row }: any) => (
                        <CgContainerHead class="table-border"
                          v-slots={{
                            [column.align || 'center']: () => (
                              column.isSort ?
                                <Sort
                                  v-model={[column.sortValue]}
                                  value={column.title}
                                  modelValue={column.sortValue as any}
                                  onUpdate:modelValue={(type) => sort(column.field, type)}
                                /> :
                                <span v-html={column.title}></span>
                            )
                          }}
                        />
                      ),
                      default: ({ row }: any) => (
                        slots[column.field] ? (slots[column.field]!({ row })) : row[column.field]
                      )
                    }}
                  />
                ))
              }
            </ElTable>
          ),
        }}>
        </CgContainer>
        <div class="page-content">
          {paginationProps.total > 0 && <CgPagination total={paginationProps.total} currentPage={paginationProps.page} onPageChange={pageChange} />}
        </div>
      </div>
    )
  }
});