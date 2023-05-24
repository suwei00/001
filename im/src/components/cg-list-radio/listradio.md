# listradio 性别单项选择

基础用法
```javascript
 <cg-list-radio v-model="gender" :list="genderList" @on-change="changGender"></cg-list-radio>

```
```javascript
 <cg-list-radio v-model="gender" :list="genderList" @on-change="changGender" :itemHeight=""></cg-list-radio>

```

### Props

| 参数      | 说明                                          | 类型          | 可选值  | 默认值  |
| --------  | ---------------------------------------------| ------------ | ------- | ------- |
| v-model: |  当前选中标签的名称或索引值                      | string、number| -       | -       |
| :itemHeight|   item的高度                                  | string       |         |    112  |
| :list     |                                              | Array        |          |         |
| @on-change| 点击时触发                                     |              | -               | 2000   |



### 返回值

