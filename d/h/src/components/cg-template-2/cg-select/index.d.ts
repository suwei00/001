declare namespace CgSelect {
  interface Props {
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
    dateFormat?: string;
  }
}

declare const CgSelect: import('vue').DefineComponent<CgSelect.Props>;

export default CgSelect;
