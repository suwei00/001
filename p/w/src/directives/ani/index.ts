import { Directive } from 'vue';

const Ani: Directive = {
  beforeMount(el: Element, binding: any) {
    binding.addClass = () => {
      const { top } = el.getBoundingClientRect();
      const h = document.documentElement.clientHeight || document.body.clientHeight;
      if (top < h) {
        el.classList.add(binding.value);
        if (binding.addClass) {
          window.removeEventListener('scroll', binding.addClass);
        }
      }
    };
    window.addEventListener('scroll', binding.addClass);
  },
  beforeUnmount(el: Element, binding: any) {
    if (binding.addClass) {
      window.removeEventListener('scroll', binding.addClass);
    }
  }
};

export default Ani;
