import { Directive } from 'vue';
// 头像注水百分比
const percent: Directive = {
  beforeMount(el: HTMLElement, bind) {
    el.style.position = 'relative';
    const i = document.createElement('i');
    i.style.position = 'absolute';
    i.style.width = '100%';
    i.style.height = (1 - (bind.value ?? 0)) * 100 + '%';
    i.style.left = '0';
    i.style.top = '0';
    i.style.opacity = '0.73';
    i.style.background = '#000';
    el.appendChild(i);
  },
  updated(el: HTMLElement, bind) {
    const i = el.getElementsByTagName('i')[0];
    i.style.height = (1 - (bind.value ?? 0)) * 100 + '%';
  }
};

export default percent;
