import { defineComponent, nextTick, PropType, reactive, ref, VNodeRef } from "vue";
import { CgContainer, CgContainerHead, CgEmpty, CgButton } from '@/components/cg-template-2';
import "./cg-table.scss"

export interface CgTableColumns {
  title: string;
  field: string;
  width?: string;
}


type ApiCaller = (params: any) => Promise<any>;

export default defineComponent({
  name: "CgTable",
  props: {
    columns: {
      type: Array as PropType<CgTableColumns[]>,
      default: () => []
    },
    tableData: {
      type: Array as PropType<any[]>,
      default: () => []
    },
  },
  setup(props, { slots, emit }) {
    const columns = ref<CgTableColumns[]>(props.columns || []);
    return () => (
      <div class="cg-table">
        <CgContainer type="table" padding="0">
          <div class="flex-middle">
            {columns.value.map(item => {
              return (
                <CgContainerHead class="flex-1" bg="--cg-gradient-table" font="--cg-font-text8">
                  {{
                    center: () => <div class="txt-c" v-html={item.title}></div>,
                  }}
                </CgContainerHead>
              )
            })}
          </div>
          {
            props.tableData.length > 0 ? <ul class="cg-table_body">
              {
                props.tableData.map((item, index) => {
                  return (
                    <li class="flex-middle cg-table_body_item">
                      {columns.value.map(ele => {
                        return <span class="flex-1 txt-c">
                          {slots[ele.field] ? (slots[ele.field]?.({ row: item })) : item[ele.field]}
                        </span>
                      })}
                    </li>
                  )
                })
              }
            </ul> : null
          }
        </CgContainer >
        {
          props.tableData.length === 0 ? <CgEmpty marginTop={80} /> : null
        }
      </div >
    )
  },
});