declare namespace CgAvatar {
    interface Props {
        img?: string,
        isCricle?: boolean,// 是否有圆圈
        rate?: number | string,// 圆圈的比例 100 为满圆
        width?: number | string,// 头像的宽度
        height?: number | string,// 头像的高度
    }
}
declare const CgAvatar: import('vue').DefineComponent<CgAvatar.Props>;
export default CgAvatar;