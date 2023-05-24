declare namespace CgBigNumber{
    interface Props {
        money: string, // 显示的金额
    }
}

declare const CgBigNumber: import('vue').DefineComponent<CgBigNumber.Props>;

export default CgBigNumber;