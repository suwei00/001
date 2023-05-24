<script lang="ts">
import { defineComponent, h } from 'vue'
import { highlightChunks } from '@/utils/helpers'

export default defineComponent({
  name: 'CgHighTxt',

  props: {
    hSearch: {
      type: String,
      default: ''
    },
    hText: {
      type: String,
      default: ''
    },
    hStyle: Object,
    hClazz: {
      type: String,
      default: ''
    },
    hComponent: {
      type: String,
      default: 'strong'
    }
  },

  emits: ['click'],

  computed: {
    text() {
      return this.$slots.default && typeof this.$slots.default()[0].children === 'string'
        ? (this.$slots.default()[0].children as string)
        : this.hText
    },
    highlights() {
      return highlightChunks(this.text, this.hSearch)
    }
  },
  render() {
    if (!this.text) return null;
    return this.highlights.map(({ text: txt, isHighlighted }, index) =>
      !isHighlighted
        ? txt
        : h(this.hComponent, {
            key: index,
            class: ['cg-text__highlight', this.hClazz],
            style: this.hStyle,
            onClick: () => {
              this.$emit('click', this.$attrs);
            },
            ...this.$attrs
          }, txt)
    )
  }
})
</script>

<style lang="scss">
.cg-text__highlight {
  color: var(--cg-color-bg-1);
  font-weight: normal;
}
</style>
