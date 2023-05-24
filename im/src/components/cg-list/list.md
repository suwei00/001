# list

基础用法

```javascript
const list = ref([]);
const loading = ref(false);
const finished = ref(false);
```

```html
    <cg-list
      :loading="loading"
      :finished="finished"
      @refresh="refresh" 
      @loadMoreData="loadMoreData"
     >
    </cg-list>
```

### Props

| 参数              | 说明                  | 类型      | 可选值 | 默认值  |
| ----------------- | --------------------- | --------- | ------ | ------- |
| loading  | 是否正在加载中                   | boolean  | 
| finished | 是否加载完所有数据                | boolean  | -                         | -       |



### Events

| 参数    | 说明                                                  | 类型                              |
| ------- | ----------------------------------------------------- | --------------------------------- | -------- |
| refresh  | `刷新`                 | `() => void`                      |
| loadMoreData | `加载更多数据`           | `() => void`                      |
