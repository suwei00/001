declare namespace CgProgress {
  interface Props {
    rate: number | string;
    position: 'none' | 'top' | 'center' | 'bottom';
    height: number | string;
  }
}

declare const CgProgress: import('vue').DefineComponent<CgProgress.Props>;

export default CgProgress;
