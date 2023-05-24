declare namespace CgBounceText{
    interface Props {
        text?: string | number;
        suffix?: string;
        duration?: number;
        wrapWidth?: number;
        wrapHeight?: number;
        imageWidth?: number;
    }
}

declare const CgBounceText: import('vue').DefineComponent<CgBounceText.Props>;

export default CgBounceText;