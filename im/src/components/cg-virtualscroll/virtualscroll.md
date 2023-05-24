# VirtualScrollList

基础用法
```javascript
const listItems = ref([]);
const itemHeight = ref(50);
const viewportHeight = ref(500);
```

```html
    <cg-virtualscroll
      :viewportHeight="viewportHeight"
      :itemHeight="itemHeight"
      :items="items"
    >
    </cg-virtualscroll>
```

### Props
| 参数              | 说明                  | 类型     | 可选值 |           | 默认值 |
| viewportHeight   | 容器高度 | ---------   | number  | primary / default |   0   |
| itemHeight       | 列表项高度 | --------- | number | primary / default   |   0   |
| listItems        | 列表数据 | ---------   | Array  | primary / default   |  []  |

### Slots

| name    | 说明            |
| ------- |---------------|
| default | slot template |


