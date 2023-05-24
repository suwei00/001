declare namespace CgItem {
    interface Props {
        modelValue?: string | number,// v-model
        itemHeight?: string | number,// item高度
        list?: any[
        {   // 选项列表
            label: string,// 选项名称
            value: string | number,// 选项值
            [key: string]: any,// 其他属性
        }
        ],// 选项列表
    }
}

declare const CgItem: import('vue').DefineComponent<CgItem.Props>;

export default CgItem;