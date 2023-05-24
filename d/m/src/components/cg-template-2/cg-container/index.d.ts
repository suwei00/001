declare namespace CgContainer {
  interface Props {
    padding?: string;
    type?: 'login' | 'smallContainer' | 'popup' | 'parent' | 'info' | 'bank' | 'active'; // 活动：active login:登陆
    url?: string; // 活动图片地址
    radius?: string; // 圆角,
    margin?: string,
    width?: number | string // 宽 单位px
    height?: number | string // 高 单位px
    shadow?: boolean
  }
}

declare const CgContainer: import('vue').DefineComponent<CgContainer.Props>;

export default CgContainer;
