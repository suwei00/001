<script setup lang="ts">
import type CgSelect from './index.d';
import { CgField, CgIcon } from '@cg-template-2-components/index';
import { computed, onMounted, ref, watch } from 'vue';
import { timeToVietnam } from '@/utils/time';

interface Props extends CgSelect.Props {
  defaultShow?: boolean;
  modelValue: string | number | Date;
  data?: any;
  showLabelKey?: string;
  selectLeftText?: string;
  selectText?: string;
  selectRightText?: string;
  rowKey?: string;
  placeholder?: string;
  clickOverlayClose?: boolean;
  clickActionClose?: boolean;
  type?: 'customize' | 'tunnel' | 'view' | 'input' | 'noBorder';
  arrowIcon?: string;
  viewVlaue?: string;
  isSearch?: boolean;
  isPicker?: boolean;
  maxDate?: Date;
  minDate?: Date;
  iconSize?: number | string;
  dateFormat?: string;
  sheetItemHeight?: string;
  alignClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  defaultShow: false,
  modelValue: '',
  rowKey: 'value',
  selectLeftText: '',
  selectText: '',
  selectRightText: '',
  showLabelKey: 'label',
  clickOverlayClose: true,
  clickActionClose: false,
  type: 'input',
  arrowIcon: 'i_arrow_down',
  data: [],
  isSearch: false,
  isPicker: false,
  iconSize: 40
});

const emit = defineEmits(['update:modelValue', 'onOk']);

const _show = ref(props.defaultShow);
const _value = ref(props.modelValue);
const _data = ref(props.data);

const search = ref();
const list = ['view', 'input'];
watch(
  () => [props.modelValue, props.data],
  ([newVal, newData]) => {
    if (list.includes(props.type) && !props.isPicker && !props.isSearch) {
      if (newData.length) {
        SetModelValue(newVal);
      }
    }
    if (props.isPicker) {
      if (newVal) {
        _value.value = timeToVietnam(newVal, props.dateFormat);
      }
    }
  }
);

watch(
  () => props.data,
  newVal => {
    _data.value = newVal;
  }
);

const SetModelValue = (val: any) => {
  const current = props.data.find((item: any) => item[props.rowKey] === val);
  if (current) {
    _value.value = current[props.showLabelKey];
  } else {
    _value.value = val;
  }
};

const actions = computed(() => {
  if (props.isSearch && search.value) {
    return _data.value.filter((item: any) => {
      const Lower = item[props.showLabelKey].toLocaleLowerCase();
      return Lower.includes(search.value.toLocaleLowerCase());
    });
  } else {
    return _data.value;
  }
});

const activeItem = ref();
const activeId = ref();

const clickItemBack = (item: any, isNotEmit: boolean) => {
  activeId.value = item[props.rowKey];
  if (props.clickActionClose) {
    _show.value = false;
    if (!isNotEmit) {
      emit('onOk', item);
    }
  } else {
    activeItem.value = item;
  }
};

const onOk = () => {
  _show.value = false;
  if (props.isPicker) {
    emit('onOk', timeToVietnam(_value.value, props.dateFormat));
  } else {
    emit('onOk', activeItem.value);
  }
};

const setShow = (show?: boolean) => {
  if (actions.value.length > 1) {
    activeId.value = props.modelValue;
    _show.value = !_show.value;
  } else if (show) {
    _show.value = !_show.value;
  }
};

onMounted(() => {
  if (props.data.length) {
    SetModelValue(props.modelValue);
  }
});

defineExpose({ setShow });
</script>
<template>
  <div class="cg-select" @click="() => setShow()">
    <div v-if="type === 'noBorder'">
      <slot />
    </div>
    <div v-else-if="type === 'tunnel'" class="tunnel-name">
      <div>
        <span class="placeholder" v-if="!modelValue"> {{ placeholder }}</span>
        <slot name="tunnel" />
      </div>
      <cg-icon :width="iconSize" class="down" :name="arrowIcon" />
    </div>
    <div v-else-if="type === 'view'" class="view_title">
      {{ viewVlaue || _value }}
      <cg-icon
        v-if="actions.length > 1"
        :width="arrowIcon === 'i_arrow_down' ? iconSize : 20"
        class="down"
        :name="arrowIcon"
      />
    </div>
    <cg-field
      v-else-if="type === 'input'"
      v-model="_value"
      :placeholder="placeholder"
      type="text"
      readonly
    >
      <template #right>
        <cg-icon :width="iconSize" class="down" :name="arrowIcon" />
      </template>
    </cg-field>
    <div v-else-if="type === 'customize' || isPicker || isSearch" class="customize">
      <div>
        <span class="placeholder" v-if="!modelValue"> {{ placeholder }}</span>
        <slot name="customize" />
      </div>
      <cg-icon :width="iconSize" class="down" :name="arrowIcon" />
    </div>
  </div>

  <teleport to="body">
    <div class="cg_action_sheet" >
      <van-action-sheet v-model:show="_show" :close-on-click-overlay="clickOverlayClose">
        <div class="select_sheet">
          <div class="select_sheet_head">
            <div class="search" v-if="isSearch">
              <cg-field
                placeholder="Chọn hoặc nhập thẻ ngân hàng của bạn"
                v-model="search"
                type="text"
              >
                <template #left>
                  <cg-icon width="60" name="i_search" />
                </template>
              </cg-field>
              <cg-icon
                width="30"
                class="i_search_close"
                @click="_show = false"
                name="i_search_close"
              />
            </div>
            <div class="cancel" v-if="selectLeftText" @click="_show = false">
              {{ selectLeftText }}
            </div>
            <div class="title" v-if="selectText">{{ selectText }}</div>
            <div class="ok" @click="onOk" v-if="selectRightText">{{ selectRightText }}</div>
          </div>

          <div
            class="sheet_conetnt cg_bar_box"
            :style="{ alignItems: actions.length < 7 && !isSearch ? 'center' : 'flex-start' }"
          >
            <div class="sheet_list">
              <template v-if="$slots.content">
                <slot name="content" />
              </template>
              <template v-else>
                <van-datetime-picker
                  v-if="isPicker"
                  v-model="_value"
                  type="date"
                  :show-toolbar="false"
                  :columns-order="['day', 'month', 'year']"
                  :min-date="minDate"
                  :max-date="maxDate"
                />
                <div
                  v-else
                    
                  class="sheet_item "
                  @click="clickItemBack(item, modelValue === item[rowKey])"
                  :class="{
                    sheet_item_active: activeId === item[rowKey],
                    sheet_item_center: !$slots.item,
                    align_class:alignClass==='align'
                  }"
                  :style="{
                    height: props.sheetItemHeight ? props.sheetItemHeight : 'var(--cg-px-80)',
                  }"
                  v-for="(item, index) in actions"
                  :key="item[rowKey]"
                >
                  <template v-if="$slots.item">
                    <slot name="item" :data="item" :index="index" />
                  </template>
                  <span v-else>{{ item[showLabelKey] }}</span>
                </div>
              </template>
            </div>
          </div>
        </div>
      </van-action-sheet>
    </div>
  </teleport>
</template>

<style lang="scss" scoped>
.cg-select {
  width: 100%;
  height: 80px;

  .tunnel-name {
    font: var(--cg-font-text7);
    color: var(--cg-color-blue1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80px;
    border-radius: var(--cg-border-radius);
    border: 2px solid var(--cg-color-blue11);
    padding-left: 20px;
  }

  .customize {
    font: var(--cg-font-text7);
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80px;
    border-radius: var(--cg-border-radius);
    border: 2px solid var(--cg-color-blue11);
    padding-left: 20px;
  }

  .down {
    margin-right: 8px;
  }
}

.cg_action_sheet {
  :deep(.van-action-sheet__content) {
    overflow: hidden;
  }
}

.select_sheet {
  background-color: var(--cg-color-white);
  height: 660px;
  display: flex;
  flex-direction: column;

  &_head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100px;
    width: 100%;
    padding: 0 var(--cg-px-32);
    font: var(--cg-font-text2);
    font-weight: 700;
    color: var(--cg-color-blue1);
    background-image: url(link($base-img-dir + '/home/shadow_img.png'));
    background-position: center;
    background-size: 100%;

    .title {
      flex: 1;
      text-align: center;
      color: var(--cg-color-black1);
      font: var(--cg-font-text1);
      padding: 0 12px;
    }

    .cancel {
      // flex: 1;
      min-width: 140px;
      white-space: nowrap;
    }

    .ok {
      // flex: 1;
      text-align: right;
      min-width: 140px;
      white-space: nowrap;
    }
  }

  .sheet_conetnt {
    flex: 1;
    height: 0;
    display: flex;
    overflow: hidden;
    overflow-y: auto;
    margin: 0 var(--cg-px-14);
    padding: 0 var(--cg-px-18);
    font: var(--cg-font-text6);

    .sheet_list {
      width: 100%;
    }

    .sheet_item {
      box-sizing: border-box;
      height: var(--cg-px-80);
      border-bottom: 1px solid var(--cg-color-white1);
      display: flex;
      align-items: center;
      justify-content: center;
    }
      .align_class{
        justify-content: flex-start;
      }
    .sheet_item_center {
      justify-content: space-around;
    }

    .sheet_item_active {
      background-color: var(--cg-color-blue24);
      font-weight: 700;
    }
  }
}

.view_title {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .down {
    margin-left: 12px;
  }
}

.search {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .i_search_close {
    margin-left: 20px;
  }

  :deep(.cg_field) {
    border-width: 2px;
    border-color: var(--cg-color-blue23);
    border-radius: var(--cg-border-radius-input);
  }
}

.placeholder {
  font: var(--cg-font-text9);
  color: var(--cg-color-gray);
}
</style>
