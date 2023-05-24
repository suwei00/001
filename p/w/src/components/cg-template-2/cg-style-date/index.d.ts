declare namespace CgStyleDate {
  interface Props {
    modelValue: any;
    width: string | number;
    valueFormat?: string;
  }
}

declare const CgStyleDate: import('vue').DefineComponent<CgStyleDate.Props>;

export default CgStyleDate;
