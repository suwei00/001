declare namespace CgAmountInput {
  interface Props {
    modelValue: string | number
    defaultValue?: string
    maxLength?: number
    placeholder?: string
    numPattern?: RegExp
    precision?: number
    inputWidth?: string
    limitMax?: boolean
    rate?: number | string
  }
}
declare const CgAmountInput: import('vue').DefineComponent<CgAmountInput.Props>;
export default CgAmountInput;
