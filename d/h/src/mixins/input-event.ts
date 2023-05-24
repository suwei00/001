import { toNumber } from 'lodash';
import { ref } from 'vue';
// 关于 键盘 input框的操作
export default function () {
  const inputAmount = ref('');
  const isShowFocusInput = ref(false);
  // 点击假输入框时触发
  const tapFakeInput = () => {
    isShowFocusInput.value = true;
  };
  // 清除假输入框数据
  const clearInput = () => {
    inputAmount.value = '';
  };
  // 获取当前from的余额
  const getMaxAmount = (v: string) => {
    const n = toNumber(v);
    inputAmount.value = Math.floor(n).toString();
  };
  return {
    inputAmount,
    isShowFocusInput,
    inputEvent: { tapFakeInput, clearInput, getMaxAmount }
  };
}
