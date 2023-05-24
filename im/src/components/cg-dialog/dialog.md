# dialog

基础用法

```javascript
Dialog({
  message: 'Bạn có chắc thu hồi tin nhắn này?',
  onClose: () => {},
  onOk: () => {
    return true
  }
})
```

```javascript
// 有头像的展示
Dialog({
  message: 'Bạn có chắc thu hồi tin nhắn này?',
  title: 'Xoá hội thoại',
  avatarUrl: 'https://pic1.zhimg.com/v2-3b4fc7e3a1195a081d0259246c38debc_720w.jpg?source=172ae18b',
  onClose: () => {},
  onOk: () => {
    return true
  }
})
```

```javascript
// 有输入框的展示
Dialog({
  title:
    'Sau khi đổi biệt danh trong nhóm, nó sẽ chỉ hiển thị trong nhóm này và tất cả thành viên trong nhóm đều có thể nhìn thấy.',
  defaultVlaue: '',
  onClose: () => {},
  onOk: (result?: any) => {
    console.error('返回输入框的值', result)
    return true
  }
})
```

```javascript
// 异步关闭
Dialog({
  title: 'Bỏ ghim tin nhắn',
  message: 'Bạn có chắc muốn bỏ ghim tin nhắn này không?',
  onOk: (result?: any) => {
    return (
      new Promise() <
      boolean >
      ((resolve, reject) => {
        // 异步操作，最终返回一个布尔值
        setTimeout(() => {
          resolve(true)
        }, 2000)
      })
    )
  }
})
```

```javascript
// 异步关闭
Dialog({
  title: 'Bỏ ghim tin nhắn',
  message: 'AJay_liha,Kakashi,Jay_liha,VIGNY_POKakashi,Jay_liha,VIGNYasdfasd',
  businessCard: '[Danh thiếp cá nhân] Raly_Null',
  onClose: () => {},
  onOk: () => {
    return true
  }
})
```

### Props

| 参数              | 说明                                         | 类型      | 可选值 | 默认值  |
| ----------------- | -------------------------------------------- | --------- | ------ | ------- |
| title             | 标题,如果有头像传入 name                     | string    | -      | -       |
| message           | 文本内容，defaultVlaue 等于 undefined 才有效 | string    | -      | -       |
| confirmButtonText | 确认按钮文案                                 | string    | -      | `OK`    |
| cancelButtonText  | 取消按钮文案                                 | string    | -      | `Hủy`   |
| component         | 内容 Slots                                   | Component | -      | -       |
| closeClick        | 是否点击弹窗关闭                             | boolean   | -      | `false` |
| avatarUrl         | 头像的 url 地址                              | string    | -      | -       |
| defaultVlaue      | 输入框默认值,有这个字段就会展示输入框        | string    | -      | -       |
| businessCard      | 发送名片字符串                               | string    | -      | -       |
| data              | 透传到 component 数据                        | object    | -      | `{}`    |

### Events

| 参数    | 说明                                                  | 类型                              |
| ------- | ----------------------------------------------------- | --------------------------------- | -------- |
| onClose | `取消回调,没有取消回调不展示取消按钮`                 | `() => void`                      |
| onOk    | `确认回调,返回 true或Promise.then 为返回true才会关闭` | `(data?: any) => Promise<boolean> | boolean` |

### 返回值

| 参数       | 说明       | 类型         |
| ---------- | ---------- | ------------ |
| removeNode | 关闭 Toast | `() => void` |
