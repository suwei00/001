declare namespace CgScrollBar {
  interface Props {
    height?: string, // 容器高度
    always?: boolean // 是否滚动时才显示
    color?: string // 滚动条颜色
    background?: string, // 滚动轨道颜色
    yellowStyle?: boolean, // 特殊：中奖弹窗的黄色风格
    scrollBarHeight?: number | string // 滚动条占容器高度的百分比 默认100%
    scrollBarTop?: number | string // 滚动条距离容器顶部的位置的的百分比 默认0
    maxHeight?: number | string // 超过最大高度时滚动 单位px
    inside?: boolean // 滚动条在内容区内
  }
}

declare const CgScrollBar: import('vue').DefineComponent<CgScrollBar.Props>;

export default CgScrollBar;