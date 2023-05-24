import type { HtmlHTMLAttributes } from 'vue';
declare namespace CgButton {
  interface Props extends HtmlHTMLAttributes {
    whiteStyle?: boolean; // 白色风格
    disabled?: boolean;
    small?: boolean; // 弹窗小按钮
    big?: boolean; // 弹窗小按钮
    round?: boolean; // 两边是圆的风格
    mini?: boolean; // 迷你按钮
    width?: number | string; // 宽 单位px
    height?: number | string; // 高 单位px
    padding?: string;
    fontSize?: number | string;
    uppercase?: boolean; // 是否转换为大写字母，默认是
    center?: boolean; // 是否居中
  }
}

declare const CgButton: import('vue').DefineComponent<CgButton.Props>;

export default CgButton;
