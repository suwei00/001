export default function usePublicPopup() {
  const popupRef = ref()
  const bodyRef = ref()
  const close = () => {
    popupRef.value.remove()
  }
  onClickOutside(bodyRef, () => { popupRef.value.remove() })

  return {
    popupRef, bodyRef, close,
  }
}
