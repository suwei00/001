declare namespace CgContainerHead {
  interface Props {
    height?: string,
    padding?: string,
    bg?: string
    font?: string
  }
}

declare const CgContainerHead: import('vue').DefineComponent<CgContainerHead.Props>;

export default CgContainerHead;