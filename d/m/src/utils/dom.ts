export function hasClass(el: Element, className:string) {
  if (!el) return false;
  const reg:RegExp = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

export function addClass(el: Element, className:string) {
  if (!el) return;
  if (hasClass(el, className)) {
    return
  }
  const newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

export function removeClass(el: Element, className:string) {
  if (!el) return;
  let newClass = ' ' + el.className.replace(/[\t\r\n]/g, ' ') + ' ';
  if (hasClass(el, className)) {
    while (newClass.indexOf(' ' + className + ' ') >= 0) {
      newClass = newClass.replace(' ' + className + ' ', ' ');
    }
    el.className = newClass.replace(/^\s+|\s+$/g, '');
  }
}