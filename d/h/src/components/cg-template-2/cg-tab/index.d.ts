declare namespace CgTab {
  type itemProp = {
    label: string;
    value: any;
    [key: string]: any;
  };
  interface Props {
    label: string;
    value: any;
    [key: string]: any;
  }
}
declare const CgTab: import('vue').DefineComponent<CgTab.Props>;
export default CgTab;
