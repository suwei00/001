declare namespace CgEmergency {
  interface Props {
    content: string;
    title: string;
    time: string | number | Date;
  }
}
declare const CgEmergency: import('vue').DefineComponent<CgEmergency.Props>;
export default CgEmergency;
