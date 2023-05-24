declare namespace CgUseAmount {
  interface Props {
    prefix?: string;
    suffix?: string;
    prefixSize?: string | number;
    suffixSize?: string | number;
    amountSize?: string | number;
    amountColor?: string;
    amountWeight?: string | number;
    amountPadding?: string | number;
    amountPrefix?: string;
    segmentation?: boolean;
  }
}
declare const CgUseAmount: import('vue').DefineComponent<CgUseAmount.Props>;
export default CgUseAmount;
