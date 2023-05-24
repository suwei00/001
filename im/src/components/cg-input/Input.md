# Input

基础用法

```javascript
<cg-input clearable placeholder="测试" v-model="value" />
<cg-input
    class="input_default_type"
    clearable
    placeholder="Tin nhắn..."
    v-model="value"
    />
```

### Props

| 参数        | 说明                                            | 类型      | 可选值                                                                  | 默认值  |
| ----------- | ----------------------------------------------- | --------- | ----------------------------------------------------------------------- | ------- |
| class       | class 内置几种样式 search=true 无效             | string    | `input_head_type/input_dialog_type/input_default_type/input_count_type` | -       |
| modelValue  | 当前输入的值                                    | `number   | string `                                                                | -       |
| type        | 输入框类型, 支持原生 input 标签的所有 type 属性 | FieldType | -                                                                       | -       |
| maxlength   | 输入的最大字符数                                | number    | string                                                                  | -       |
| placeholder | 输入框占位提示文字                              | string    | -                                                                       | -       |
| disabled    | 是否禁用输入框                                  | boolean   | -                                                                       | `false` |
| readonly    | 是否点击弹窗关闭                                | boolean   | -                                                                       | `false` |
| clearable   | 是否启用清除图标，点击清除图标后会清空输入框    | boolean   | -                                                                       | `false` |
| search      | 是否展示搜索 icon                               | number    | -                                                                       | 3       |

### Events

| 参数  | 说明                   | 类型                                   |
| ----- | ---------------------- | -------------------------------------- |
| input | `输入框内容变化时触发` | `(value: string 当前输入的值) => void` |
| focus | `输入框获得焦点时触发` | `(event: Event) => void`               |
| blur  | `输入框失去焦点时触发` | `(event: Event) => void`               |
| clear | `点击清除按钮时触发	`   | `() => void`                           |

### Slots

| name  | 说明                 |
| ----- | -------------------- |
| left  | 自定义输入框头部     |
| right | 自定义输入框尾部按钮 |
