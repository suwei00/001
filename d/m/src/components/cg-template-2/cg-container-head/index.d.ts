declare namespace CgContainerHead {
  interface Props {
    height?: string,
    padding?: string
    bg?:string
  }
}

declare const CgContainerHead: import('vue').DefineComponent<CgContainerHead.Props>;
import { type } from '../../../http/APIs';

export default CgContainerHead;