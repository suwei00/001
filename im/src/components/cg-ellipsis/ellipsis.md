# ellipsis 文字省略

## 基础用法

 通过 `content` 属性传入内容

```html

  <cg-ellipsis
    content="Tham gia nhómTham giaTham Nhấn vào ở trên cùng bên phải Facebook, rồi nhấn vào Nhóm và chọn nhóm của bạn Nhấn vào ">
  </cg-ellipsis>

```

 通过 `expandText` 属性来设置展开文案，通过 `collapseText` 属性来设置关闭文案
 通过 `rows` 属性来限制行数

```html

  <cg-ellipsis
    expandText="Mở rộng" 
    collapseText="Thu hẹp"
    rows="3" 
    content="Tham gia nhómTham giaTham Nhấn vào ở trên cùng bên phải Facebook, rồi nhấn vào Nhóm và chọn nhóm của bạn Nhấn vào nhóm, rồi nhấn vào Thông báo. Tại đây, bạn có thể chọn: Tất cảam Nhấn vào ở trên cùng bên phải Facebook, rồi nhấn vào Nhómchọn nhóm của bạn Nhấn vào tên nhóm, rồi nhấn vào Thông báo. Tại đây, bạn có thể chọn: Tất cả">
  </cg-ellipsis>

```

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| content | 文字内容 | _string_ | - |
| rows | 最多展示行数 | _number \| string_  | - |
| expandText| 展开按钮文案 | _string_ | - |
| collapseText | 关闭按钮文案 | _string_  | - |
| lineHeight  | 行高 | _number \| string_ | - |
| symbol | 省略符号 | _number \| string_  | ... |
| btnColor | 展开收起按钮字体颜色 | _number \| string_  | 4 |
