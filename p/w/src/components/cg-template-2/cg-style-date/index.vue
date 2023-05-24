<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, computed } from 'vue';
import { ElDatePicker } from 'element-plus';
import dayjs from 'dayjs';
import { getDate, datePickerInitValue } from '@/utils/date-map';
import CgStyleDate from './index.d';
import { useOption } from '@/hooks/useOption';
interface Props extends CgStyleDate.Props {
  modelValue: any;
  width: string | number;
  valueFormat?: string;
  leftFix?: boolean;
  topFix?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  valueFormat: 'YYYY-MM-DD HH:mm:ss',
  modelValue: {
    ty: '',
    start_time: '',
    end_time: ''
  }
});
const { option } = useOption('dateShorts');
const shortcuts = option.value
  .map((item: any) => {
    const v = getDate(item.value);
    return {
      text: item.label,
      value: () => {
        console.log('点击了快捷选项', item);
        ty.value = item.ty;
        emit('update:modelValue', { ...props.modelValue, ty: ty.value, start_time: '', end_time: '' });
        emit('change', { ...props.modelValue, ty: ty.value, start_time: '', end_time: '' });
        datevalue.value = [];
        return v;
      },
      valueText: v.map(d => d.format(props.valueFormat)),
      key: item.value,
      ty: item.ty
    };
  })
  .filter(item => item.key !== 'thisWeek' && item.key !== 'lastWeek');

const emit = defineEmits(['update:modelValue', 'change']);

const ty = ref(props.modelValue.start_time && props.modelValue.end_time ? '' : props.modelValue.ty || '1');
const elpicker = ref();
const dateSelectWrap = ref();
const isFocused = ref(false);
const datevalue = ref(props.modelValue.start_time && props.modelValue.end_time ? [props.modelValue.start_time, props.modelValue.end_time] : []); // datePickerInitValue(props.valueFormat)
const datevaluetxt = computed(() => {
  if (+ty.value > 0) {
    return shortcuts.filter(item => item.ty === ty.value)[0]?.text;
  } else {
    return datevalue.value.map(v => dayjs(v).format('DD/MM/YYYY')).join(' - ');
  }
});

const rangeStart = dayjs().locale('vi').subtract(30, 'day').startOf('day');
const rangeEnd = dayjs().locale('vi').endOf('day');
// const pickerValue = ref([rangeStart, rangeEnd]);
const lastMonthFirstDay = dayjs().locale('vi').subtract(1, 'month').startOf('month');
const thisMonthLastDay = dayjs().locale('vi').endOf('month');
const defaultValue = [lastMonthFirstDay, thisMonthLastDay];

emit('update:modelValue', { ...props.modelValue, ty: ty.value, start_time: datevalue.value[0], end_time: datevalue.value[1] });

const disabledDate = (d: any) => {
  if (d.getTime() < rangeStart.valueOf() || d.getTime() > rangeEnd.valueOf()) {
    return true;
  }
  return false;
};

const popperClazz = ref('cg-daterange-popper');
const cellClazz = ref('cg-day-cell');
const cellClassname = (val: any) => {
  let clazz = 'cg-day-cell';
  if (datevalue.value.length === 2) {
    const t = dayjs(val).valueOf();
    if (t >= dayjs(datevalue.value[0]).valueOf() && t <= dayjs(datevalue.value[1]).valueOf()) {
      clazz += ' cg-in-range';
    }
    if (t === dayjs(datevalue.value[0]).valueOf()) {
      clazz += ' cg-start-date';
    }
    if (t === dayjs(datevalue.value[1]).startOf('day').valueOf()) {
      clazz += ' cg-end-date';
    }
  }
  return clazz;
};

const inputFocused = () => {
  isFocused.value = true;
  if (dateSelectWrap.value) {
    const { left, bottom, top, x, y, height } = dateSelectWrap.value.getBoundingClientRect();
    // const popper = document.querySelector('.cg-date-popper') as HTMLElement;
    const root = document.documentElement;
    root.style.setProperty('--cg-datepop-top', top + height + document.documentElement.scrollTop + 10 + 'px');
    root.style.setProperty('--cg-datepop-left', left + document.documentElement.scrollLeft + 'px');
  }
};

const inputBlur = () => {
  console.log('888')
  isFocused.value = false;
};

const winResize = () => {
  if (dateSelectWrap.value) {
    const { left, bottom, top, x, y, height } = dateSelectWrap.value.getBoundingClientRect();
    // const popper = document.querySelector('.cg-date-popper') as HTMLElement;
    const root = document.documentElement;
    root.style.setProperty('--cg-datepop-top', top + height + document.documentElement.scrollTop + 10 + 'px');
    root.style.setProperty('--cg-datepop-left', left + document.documentElement.scrollLeft + 'px');
  }
};

const pickerHeaderClicked = (event: any, el: any) => {
  let pickerHeader = document.getElementsByClassName('el-date-range-picker__header');
  for (let i = 0; i < pickerHeader.length; i++) {
    const nianyuenode = pickerHeader[i].lastChild as HTMLElement;
    const text = nianyuenode.innerText.split(' ');
    if (+text[0] > 1000) {
      nianyuenode.innerHTML = `${text[2]} ${text[3]} ${text[1]} ${text[0]}`;
    }
  }
};

onMounted(() => {
  window.addEventListener('resize', winResize);
  window.addEventListener('scroll', winResize);

  let pickerHeader = document.getElementsByClassName('el-date-range-picker__header');
  for (let i = 0; i < pickerHeader.length; i++) {
    const nianyuenode = pickerHeader[i].lastChild as HTMLElement;
    const text = nianyuenode.innerText.split(' ');
    if (+text[0] > 1000) {
      nianyuenode.innerHTML = `${text[2]} ${text[3]} ${text[1]} ${text[0]}`;
    }
    pickerHeader[i].addEventListener('click', e => {
      pickerHeaderClicked(e, pickerHeader[i]);
    });
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', winResize);
  window.removeEventListener('scroll', winResize);
});

// 点击日期面板的日期时
const calendarChange = (val: [Date, Date]) => {
  if (val && val[0] && val[1]) {
    console.log('点击了日期面板选择了时间范围', val);
    ty.value = '';
    datevalue.value = val
      .map((d, idx) => {
        if (idx === 0) {
          return dayjs(d).startOf('day');
        }
        return dayjs(d).endOf('day');
      })
      .map(d => dayjs(d).format(props.valueFormat));
    emit('update:modelValue', { ...props.modelValue, ty: '', start_time: datevalue.value[0], end_time: datevalue.value[1] });
    emit('change', { ...props.modelValue, ty: '', start_time: datevalue.value[0], end_time: datevalue.value[1] });
  } else {
    popperClazz.value = '';
  }
};
</script>

<template>
  <div class="cg-style-date" :style="{ width: props.width + 'px' }">
    <div ref="dateSelectWrap" class="date-select-wrap">
      <div class="fake-input">{{ datevaluetxt }}</div>
      <div class="suffix">
        <app-image class="right-icon icon-arrow-down" :class="{ 'is-reverse': isFocused }" src="/icon/i_arrow_up.png"
          alt="" />
      </div>
    </div>
    <!-- v-model="datevalue" -->
    <!-- 没有使用 v-model format value-format 无效 -->
    <el-date-picker ref="elpicker" class="hidden-date-picker" type="daterange" placeholder="Pick a day"
      :shortcuts="shortcuts" :disabled-date="disabledDate"
      :popper-class="`cg-date-popper ${popperClazz} ${leftFix ? ' left-fix ' : ''} ${topFix ? ' top-fix ' : ''}`"
      :cell-class-name="cellClassname" :format="valueFormat" :value-format="valueFormat" @focus="inputFocused"
      @blur="inputBlur" @calendar-change="calendarChange" :default-value="defaultValue">
    </el-date-picker>
    <!-- :append-to-body="false" -->
  </div>
</template>

<style lang="scss" scoped>
.cg-style-date {
  position: relative;
  display: inline-block;
  vertical-align: middle;

  .date-select-wrap {
    position: relative;
    width: 100%;
    height: 38px;

    .fake-input {
      font: var(--cg-font-text);
      color: var(--cg-color-grey1);
      width: 100%;
      height: 40px;
      line-height: 38px;
      border-radius: 4px;
      outline: none;
      padding: 0 15px;
      padding-right: 30px;
      transition: var(--el-transition-border);
      border: var(--el-input-border, var(--el-border-base));
      box-sizing: border-box;
      background-color: var(--el-input-background-color, var(--el-color-white));
      background-image: none;
      cursor: pointer;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    .suffix {
      position: absolute;
      right: 5px;
      top: 0;
      width: 25px;
      height: 100%;
      transition: all var(--el-transition-duration);
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        transform: rotateZ(180deg);
        transition: transform var(--el-transition-duration), -webkit-transform var(--el-transition-duration);
        height: 20px;

        &.is-reverse {
          transform: rotateZ(0deg);
        }
      }
    }
  }
}
</style>
