declare namespace CgTime {
  interface Props {
    color?: string,// 颜色
    font?: string,// 字体
    time: number | string,// 时间戳
    formatStr?: string,// 格式化
    isTwoLine?: boolean,// 是否两行显示
    align?: string,// 对齐方式
  }
}
declare const CgTime: import('vue').DefineComponent<CgTime.Props>;
export default CgTime;