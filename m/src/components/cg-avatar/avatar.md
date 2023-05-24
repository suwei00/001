## 空状态

基础用法

```javascript
默认头像：
<cg-avatar />
```
```javascript
自定义头像大小、形状、路径：
<cg-avatar size="99" shape="square" src="https://pic1.zhimg.com/v2-3b4fc7e3a1195a081d0259246c38debc_720w.jpg?source=172ae18b" />
```
```javascript
自定义头像类型及右下角图标和大小：
<cg-avatar icon="avatar_notice" badge="avatar_notice" badge-size="30" />
```

### Props

| 参数     | 说明                 | 类型    | 可选值                    | 默认值  |
| -------- | -------------------- | ------- | ------------------------- | ------- |
| size  | 头像大小  | string｜number  |  自定义  | 80 |
| src  | 手机相册头像地址  | string  |  网络图片｜空  | 空 |
| icon | 其他类型头像  | string  | 图片文件夹_图片名称 例如：avatar_group(群组)｜avatar_notice(公告)｜avatar_collection(收藏)｜avatar_link(链接)｜avatar_add(添加好友)  | 空 |
| shape  | 头像形状  | string  |  circle｜shape  | circle |
| badge  | 右下角图标类型  | string  | 图片文件夹_图片名称 例如：avatar_online(在线)｜avatar_edit(编辑)｜avatar_black(拉黑)｜avatar_check(选中)｜avatar_del(删除)  | 空 |
| badge-size  | 右下角图标大小  | string｜number  |  自定义  | 28 |



