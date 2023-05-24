declare namespace CgBadge {
    interface Props {
        value?: string | number,
        maxValue?: number,
        isDot?: boolean,
    }
}

declare const CgBadge: import('vue').DefineComponent<CgBadge.Props>;

export default CgBadge;