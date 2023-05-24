declare namespace CgBreadcrumb {
  interface Props {
    modelValue: string
    list: string[]
  }
}

declare const CgBreadcrumb: import('vue').DefineComponent<CgBreadcrumb.Props>;

export default CgBreadcrumb;