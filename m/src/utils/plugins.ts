function install(Vue: ReturnType<typeof import('vue').createApp>) {
    const prototype = Vue.config.globalProperties;
    prototype.cgToPx = function (num: number) {
        return `var(--cg-px-${num})`
    }
}

declare module 'vue' {
    interface ComponentCustomProperties {
        cgToPx(num: number): string
    }
}
export default install;