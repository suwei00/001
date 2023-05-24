declare namespace CgContainer {
  interface Props {
    padding?:  string;
    type?: 'login' | 'table'  // login:登陆
    radius?: string; // 圆角,
    margin?: string,
    width?: number | string // 宽 单位px
    height?: number | string // 高 单位px
    border?: string // 边框
    isShadow?: boolean//是否有阴影
    bg?:string//背景色
  }
}

declare const CgContainer: import('vue').DefineComponent<CgContainer.Props>;

export default CgContainer;
