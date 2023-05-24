declare namespace CgAvatar {
  interface Props {
    isJump?: boolean;
    editable?: boolean;
    width?: number | string; // 头像的宽度
    height?: number | string; // 头像的高度
    fillRate: number;
  }
}
declare const CgAvatar: import('vue').DefineComponent<CgAvatar.Props>;
export default CgAvatar;
