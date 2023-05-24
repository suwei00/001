declare namespace CgRadio {
  interface Props {
    modelValue: number | null
    list: Array<any>
    type: 'tunnel' | 'payType' | 'bank' | 'money',// 渠道、支付方式、取款银行
  }
}

declare const CgRadio: import('vue').DefineComponent<CgRadio.Props>;

export default CgRadio;