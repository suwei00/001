# tab 

基础用法
```javascript
 <cg-tab v-model="tab_type" :list="tabList" @on-change="changeTab"></cg-tab>
```
```javascript 可自定义itemHeight 高度
 <cg-tab v-model="tab_type" :list="tabList" @on-change="changeTab" :itemHeight="100"></cg-tab>
```
### Props

| 参数      | 说明                                          | 类型          | 可选值  | 默认值  |
| --------  | ---------------------------------------------| ------------ | ------- | ------- |
| v-model:  |  当前选中标签的名称或索引值                      | string、number| -       | -       |
| :itemHeight|   item的高度                                  | string        |         |    81     |
| :list     |                                              | Array        |          |         |
| @on-change| 点击时触发                                     |              | -        | 2000   |



### 返回值

