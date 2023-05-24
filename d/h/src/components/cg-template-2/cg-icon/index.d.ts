declare namespace CgIcon {
  interface Props {
    name: string;
    width?: string | number;
    height?: string | number;
    shadow?: boolean;
    onClick?: () => void;
  }
}

declare const CgIcon: import('vue').DefineComponent<CgIcon.Props>;

export default CgIcon;
