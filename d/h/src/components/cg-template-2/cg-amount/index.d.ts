declare namespace CgAmount {
  interface Props {
    amount: string | number;
    size?: string | number;
    weight?: string | number;
    suffix?: string;
    padding?: string | number;
    color?: string;
    precision?: number;
    segmentation?: boolean;
    isClick?: boolean;
  }
}
declare const CgAmount: import('vue').DefineComponent<CgAmount.Props>;
export default CgAmount;
