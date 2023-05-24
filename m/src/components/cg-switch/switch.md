# tab 

基础用法
```javascript
 <cg-switch v-model="state" @on-change="changeSwitch" > </cg-switch>

```
```javascript
<cg-switch v-model="state" @on-change="changeSwitch" :disabled="true"> </cg-switch>

```
```javascript
<cg-switch v-model="state" @on-change="changeSwitch" :disabled="true" :activeBg="'var(--cg-color-bg-3)'" :inactiveBg="'var(--cg-color-bg-4)'"> </cg-switch>


```
### Props

| 参数      | 说明                                          | 类型          | 可选值  | 默认值                    |
| --------  | ---------------------------------------------| ------------ | ------- | ------------------------ |
| v-model:  |   开关选中状态                                 | boolean       | -       | -                      |
| :activeBg  |   打开时的背景色                               | string        |         | var(--cg-color-bg-6)                       |
| :inactiveBg|   关闭时的背景色                               | string        |         |  var(--cg-color-bg-1)  |
| :disabled  |   是否为禁用状态                               | boolean       |         |  false                 |
| :list     |                                              | Array        |          |                        |
| @on-change| 点击时触发                                     |              | -        |                       |



### 返回值

