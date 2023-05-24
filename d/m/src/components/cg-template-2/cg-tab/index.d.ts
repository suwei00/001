declare namespace CgTab {
    type itemProp = {
        name: string;
        value: string | number;
        [key: string]: any;
      };
    interface Props {
        modelValue: number | string;
        list: Array<itemProp>;
        padding: string;
    }
}
declare const CgTab: import('vue').DefineComponent<CgTab.Props>;
export default CgTab;