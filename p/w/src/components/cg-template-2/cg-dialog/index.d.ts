declare namespace CgDialog {
  interface Props {
    closeOnClickOverlay?: boolean
    showOverlay?: boolean
    onClosed: () => void
  }
}

declare const CgDialog: import('vue').DefineComponent<CgDialog.Props>;

export default CgDialog;