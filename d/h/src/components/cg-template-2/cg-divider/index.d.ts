declare namespace CgDivider {
    interface Props {
        direction?: 'horizontal' | 'vertical',// 线条方向
        color?: string,// 线条颜色
        margin?: string,// 线条外边距
    }
}
declare const CgDivider: import('vue').DefineComponent<CgDivider.Props>;
export default CgDivider;