# indexDB 使用教程

#### 实例化 indexDB

```javascript
// 使用Pinia实例化indexDB
const indexDBStore = useIndexDBStore()
const { token } = storeToRefs(userStore)
// 检测是否已经登录 实例化indexDB的名称要和登录信息的唯一值建库
if (token) {
  // 需登录成功调用初始化数据库，已有数据库会直接打开
  indexDBStore.initIdnexDB('登录信息的唯一值')
}
// 初始化实例放 src/store/indexDb.ts 中
```

#### 基本使用

```javascript
// 从Pinia获取indexDB实例
const indexDBStore = useIndexDBStore()
const { IDB } = storeToRefs(indexDBStore)

IDB.value.putValue('ChatList', { data: '测试1' }).then((res: boolean) => {
  if (res) {
    console.error('添加成功')
  }
})

IDB.value
  .putBulkValue('ChatList', [
    { data: '测试2' },
    { data: '测试7' },
    { data: '测试4' },
    { data: '测试9' }
  ])
  .then((res: boolean) => {
    if (res) {
      console.error('批量添加成功')
    }
  })

IDB.value.getValue('ChatList', 4).then((res: any | boolean) => {
  if (res) {
    console.error('查询成功', res)
  }
})

IDB.value.getAllValue('ChatList').then((res: any[] | boolean) => {
  if (res) {
    console.error('批量查询成功', res)
  }
})

IDB.value
  .getDataBeforeKey({ tableName: 'ChatList', id: 80, isInclude: false, size: 20 })
  .then((res: any[] | boolean) => {
    if (res) {
      console.error('批量查询Before成功', res)
    }
  })

IDB.value.getDataAfterKey({ tableName: 'ChatList' }).then((res: any[] | boolean) => {
  if (res) {
    console.error('批量查询After成功', res)
  }
})

IDB.value.deleteValue('ChatList', 10).then((res: boolean) => {
  if (res) {
    console.error('删除成功', res)
  }
})

IDB.value.clearTable('ChatList').then((res: boolean) => {
  if (res) {
    console.error('清空成功')
  }
})
```

#### 完整实例化和使用方式

```javascript
// 实例化 indexDB test1 数据库名称  1.0版本
const IDB = new IndexedDb('test1', 1.0)
// 初始化 indexDB 创建需要的表 [string] 表名称,可遍历创建多个表 res返回成功
// 创建表只会出现在初始化的时候，已经创建完成数据库无法添加新表，只会打开数据库。 如因迭代变化需添加其他表可升级版本，完成初始化新加表名称，并不会影响之前的数据
IDB.init(['ChatList']).then((res) => {
  if (res) {
    // 添加或修改指定的表 需在 indexDB实例化之后
    IDB.putValue('ChatList', { data: '测试1' }).then((res: boolean) => {
      if (res) {
        console.error('添加成功')
      }
    })

    IDB.putBulkValue('ChatList', [
      { data: '测试2' },
      { data: '测试7' },
      { data: '测试4' },
      { data: '测试9' }
    ]).then((res: boolean) => {
      if (res) {
        console.error('批量添加成功')
      }
    })

    IDB.getValue('ChatList', 4).then((res: any | boolean) => {
      if (res) {
        console.error('查询成功', res)
      }
    })

    IDB.getAllValue('ChatList').then((res: any[] | boolean) => {
      if (res) {
        console.error('批量查询成功', res)
      }
    })

    IDB.getDataBeforeKey({ tableName: 'ChatList', id: 80, isInclude: false, size: 20 }).then(
      (res: any[] | boolean) => {
        if (res) {
          console.error('批量查询Before成功', res)
        }
      }
    )

    IDB.getDataAfterKey({ tableName: 'ChatList' }).then((res: any[] | boolean) => {
      if (res) {
        console.error('批量查询After成功', res)
      }
    })

    IDB.deleteValue('ChatList', 10).then((res: boolean) => {
      if (res) {
        console.error('删除成功', res)
      }
    })

    IDB.clearTable('ChatList').then((res: boolean) => {
      if (res) {
        console.error('清空成功')
      }
    })
  }
})
```
