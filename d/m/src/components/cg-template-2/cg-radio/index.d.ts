declare namespace CgRadio {
  interface Props {
    modelValue?: number | null
    list: Array<any>
    type: 'exam' | 'payType' | 'tunnel' | 'offline' | 'bank' | 'tutorial' | 'money',// 答题、支付方式、通道、银行卡、充值教程、快捷金额
  }
}

declare const CgRadio: import('vue').DefineComponent<CgRadio.Props>;

export default CgRadio;
