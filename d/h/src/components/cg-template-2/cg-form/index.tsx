// 禁用当前页面的ts检查
// @ts-nocheck

import { defineComponent, nextTick, PropType, reactive, ref, VNodeRef, watch } from "vue";
import { CgContainer, CgSelect, CgField, CgButton, CgTimeSelect } from '@/components/cg-template-2';
import "./cg-form.scss"

export type FormValueTypes = 'select' | 'field' | 'timeSelect';

export interface FormOptions {
  label: string;
  value: number | string;
}
export interface FormItem extends FormOptions {
  type: FormValueTypes;
  placeholder: string;
  modelValue?: string | number;
  options?: FormOptions[];
  lowercase?: boolean
}

export default defineComponent({
  name: "CgForm",
  props: {
    labelWidth: {
      type: Number,
      default: 100
    },
    options: {
      type: Array as PropType<FormItem[]>,
      default: () => []
    }
  },
  emits: ['submit', 'selectChange'],
  setup(props, { slots, emit, expose }) {
    const formRef = ref<VNodeRef | null>(null);
    const form = reactive({
    });

    const resetFrom = () => {
      for (let item of props.options) {
        form[item.value] = item.modelValue;
      }
    }

    resetFrom();

    const setFrom = (key: string, value: any) => {
      form[key] = value;
    }

    const submit = () => {
      emit('submit', { ...form });
    }

    const onItemClick = (data: any, item: FormItem) => {
      // form[item.value] = data.value;
      // emit('selectChange', item.value, data.value);
      if (data !== undefined) {
        form[item.value] = data.value;
      }else{
        form[item.value] = item.modelValue;
      }
      emit('selectChange', item.value, form[item.value]);
    }

    let _obj = {};
    const timeChange = (obj) => {
      _obj = { ...obj };
      if (obj.type === '') {
        form['start_time'] = obj.start_time;
        form['end_time'] = obj.end_time;
      } else {
        form['start_time'] = '';
        form['end_time'] = '';
      }
    }

    const rightBtnClick = (item: FormItem) => {
      if (_obj.type === '') {
        form[item.value] = `${_obj.start_time} - ${_obj.end_time}`;
        form['type'] = 'custom';
      } else {
        form[item.value] = _obj.type || form[item.value];
      }
      emit('selectChange', '', form);
    }
    const renderValue = (item: FormItem) => {
      switch (item.type) {
        case 'select':
          return (
            <CgSelect
              v-models={[
                [form[item.value], 'modelValue'],
              ]}
              selectLeftText="HỦY BỎ"
              selectRightText="XÁC NHẬN"
              data={item.options}
              onOnOk={(data: any) => onItemClick(data, item)}
              placeholder={item.placeholder}
            />
          )
        case 'timeSelect':
          return (
            <CgSelect
              v-models={[
                [form[item.value], 'modelValue'],
              ]}
              key={form[item.value]}
              selectLeftText="HỦY BỎ"
              selectRightText="XÁC NHẬN"
              data={item.options}
              onOnOk={() => rightBtnClick(item)}
              placeholder={item.placeholder}
              sheetItemHeight={'auto'}
              v-slots={{
                content: ({ ele }: any) => (
                  <div style="width: 100%">
                    <CgTimeSelect
                      v-models={[
                        [form[item.value], 'type'],
                        [form['start_time'], 'start_time'],
                        [form['end_time'], 'end_time'],
                      ]}
                      onChange={timeChange}
                    />
                  </div>
                )
              }}
            />
          )
        case 'field':
          return (
            item.lowercase ?
              <CgField v-model={[form[item.value], ['lowercase']]} placeholder={item.placeholder} clear="true" maxlength="14"/> :
              <CgField v-model={form[item.value]} placeholder={item.placeholder} clear="true" maxlength="14"/>
          )
        default:
          return null
      }
    }

    expose({
      resetFrom,
      setFrom
    })

    return () => (
      <CgContainer radius="16" padding="20,20,0,20" border="1">
        <div class="cg-form">
          {props.options.map((item, index) => {
            return (
              <div class="flex-middle cg-form-item">
                <div class="cg-form_label" style={{ width: `var(--cg-px-${props.labelWidth})` }}>
                  <span v-html={item.label}></span>
                </div>
                <div class="cg-form_value">
                  {renderValue(item)}
                </div>
              </div>
            )
          })}
          <div class="cg-from-bottom">
            <CgButton onClick={submit} center={true} width={643} height={88} v-slots={{
              'default': () => "TÌM KIẾM"
            }} />
          </div>
        </div>
      </CgContainer>
    )
  }
})