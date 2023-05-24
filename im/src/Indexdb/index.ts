type NumStr = number | string
type ResultType = void | boolean

interface includeId {
  id: NumStr
}

class IndexedDb {
  private dbName: string // 数据库名称
  private version: number // 数据库版本
  private db: IDBDatabase | null = null

  constructor(dbName: string, version: number) {
    this.dbName = dbName
    this.version = version
  }
  /**
   * 初始化 IndexedDB 数据库，如果不存在则创建
   * @param { string } tableList store 需要创建表List
   * @returns { Promise<ResultType> }
   */
  public async init(tableList: Array<string>): Promise<ResultType> {
    return new Promise<ResultType>((resolve) => {
      // 打开 IndexedDB 数据库，如果不存在则创建
      const request = window.indexedDB.open(this.dbName, this.version)
      request.onerror = () => {
        resolve(false)
      }
      request.onsuccess = () => {
        // 开启成功储存实例
        this.db = request.result
        resolve(true)
      }
      request.onupgradeneeded = (event: any) => {
        // 新建数据库完成 循环创建表
        const db = event.target.result
        for (const tableName of tableList) {
          if (db.objectStoreNames.contains(tableName)) {
            continue
          }
          db.createObjectStore(tableName, {
            autoIncrement: true,
            keyPath: 'id'
          })
        }
      }
    })
  }
  /**
   * 获取 store 中指定数据
   * @param { string } tableName store 名称
   * @param { NumStr } id 需要获取数据的Key
   * @returns { Promise<ResultType | any> }
   */
  public async getValue(tableName: string, id: NumStr): Promise<ResultType | any> {
    return new Promise<ResultType | any>((resolve) => {
      if (!this.db) return
      const transaction = this.db.transaction(tableName, 'readonly')
      const store = transaction.objectStore(tableName)
      const request: IDBRequest = store.get(id)
      request.onsuccess = (event: any) => {
        resolve(event.target.result || false)
      }
      request.onerror = () => {
        resolve(false)
      }
    })
  }
  /**
   * 获取指定 store 的全部数据
   * @param { string } tableName store 名称
   * @returns { Promise<ResultType | any[]> }
   */
  public async getAllValue(tableName: string): Promise<ResultType | any[]> {
    return new Promise<ResultType | any[]>((resolve) => {
      if (!this.db) return
      const transaction = this.db.transaction(tableName, 'readonly')
      const store = transaction.objectStore(tableName)
      const request: IDBRequest = store.getAll()
      request.onsuccess = (event: any) => {
        resolve(event.target.result || false)
      }
      request.onerror = () => {
        resolve(false)
      }
    })
  }
  /**
   * 获取指定 store 的某个key之前的x条数据
   * id 为空也可以查询最新数据
   * @param { string } tableName store 名称
   * @param { NumStr } id 需要开始获取数据Key
   * @param { boolean } isInclude 是否包含本身数据 false包含 true不包含 默认不包含
   * @param { number } size 需要获取数据条数  默认10条
   * @returns { Promise<ResultType | any[] > }
   */
  public async getDataBeforeKey({
    tableName,
    id,
    size = 10,
    isInclude = true
  }: {
    tableName: string
    id?: NumStr
    size?: number
    isInclude?: boolean
  }): Promise<ResultType | any[]> {
    return new Promise<ResultType | any[]>((resolve) => {
      if (!this.db) return
      const transaction = this.db.transaction(tableName, 'readonly')
      const store = transaction.objectStore(tableName)
      let range = null
      if (id) {
        range = IDBKeyRange.upperBound(id, isInclude)
      }
      const request = store.openCursor(range, 'prev')
      const data: any[] = []
      request.onsuccess = (event: any) => {
        const cursor = (event.target as IDBRequest).result
        if (cursor && data.length < size) {
          data.push(cursor.value)
          cursor.continue()
        } else {
          resolve(data.reverse())
        }
      }
      request.onerror = () => {
        resolve(false)
      }
    })
  }

  /**
   * 获取指定 store 的某个key之后的x条数据
   * id 为空也可以查询最早数据
   * @param { string } tableName store 名称
   * @param { NumStr } id 需要开始获取数据Key
   * @param { boolean } isInclude 是否包含本身数据 false包含 true不包含 默认不包含
   * @param { number } size 需要获取数据条数  默认10条
   * @returns { Promise<ResultType | any[] > }
   */

  public async getDataAfterKey({
    tableName,
    id,
    isInclude = true,
    size = 10
  }: {
    tableName: string
    id?: NumStr
    isInclude?: boolean
    size?: number
  }): Promise<ResultType | any[]> {
    return new Promise<ResultType | any[]>((resolve) => {
      if (!this.db) return
      const transaction = this.db.transaction(tableName, 'readonly')
      const store = transaction.objectStore(tableName)
      let range = null
      if (id) {
        range = IDBKeyRange.lowerBound(id, isInclude)
      }
      const request = store.openCursor(range, 'next')
      const data: any[] = []
      request.onsuccess = (event: any) => {
        const cursor = (event.target as IDBRequest).result
        if (cursor && data.length < size) {
          data.push(cursor.value)
          cursor.continue()
        } else {
          resolve(data)
        }
      }
      request.onerror = () => {
        resolve(false)
      }
    })
  }
  /**
   * 添加或修改到指定的 store 中
   * @param { string } tableName 要添加数据的 store 名称
   * @param { T } value 要添加的数据
   * @returns { Promise<ResultType> }
   */
  public async putValue<T extends includeId>(tableName: string, value: T): Promise<ResultType> {
    return new Promise<void | boolean>((resolve) => {
      if (!this.db) return
      const transaction = this.db.transaction(tableName, 'readwrite')
      const store = transaction.objectStore(tableName)
      const request = store.put(value)
      request.onerror = () => {
        resolve(false)
      }
      request.onsuccess = () => {
        resolve(true)
      }
    })
  }

  /**
   * 批量添加或修改数据到指定的 store 中
   * @param { string } tableName 要添加数据的 store 名称
   * @param { Array<T> } values 要添加的数据list
   * @returns { Promise<ResultType> }
   */
  public async putBulkValue<T extends includeId>(
    tableName: string,
    values: Array<T>
  ): Promise<ResultType> {
    return new Promise<ResultType>((resolve) => {
      if (!this.db) return
      const transaction = this.db.transaction(tableName, 'readwrite')
      const store = transaction.objectStore(tableName)
      const requestList: string[] = [] // 添加的测试回滚代码
      // 循环批量的添加或修改数据
      for (const value of values) {
        const request = store.put(value)
        request.onerror = () => {
          // 在批量添加或修改数据中只要有一次错误马上抛出错误并且回滚批量数据
          requestList.push('false')
          transaction.abort()
          resolve(false)
        }
        request.onsuccess = () => {
          requestList.push('true')
          // 在每次成功判断是否循环完成，循环完成并且全部成功返回成功数据
          if (requestList.length === values.length) {
            if (!requestList.includes('false')) {
              resolve(true)
            } else {
              transaction.abort()
              resolve(false)
            }
          }
        }
      }
    })
  }

  /**
   * 删除store指定数据
   * @param { string } tableName store 名称
   * @param { NumStr } id 需要删除的key
   * @returns { Promise<ResultType> }
   */
  public async deleteValue(tableName: string, id: NumStr): Promise<ResultType> {
    return new Promise<ResultType>((resolve) => {
      if (!this.db) return
      const transaction = this.db.transaction(tableName, 'readwrite')
      const store = transaction.objectStore(tableName)
      const request = store.delete(id)
      request.onsuccess = function () {
        resolve(true)
      }
      request.onerror = function () {
        resolve(false)
      }
    })
  }

  /**
   * 清空store所有数据
   * @param { string } tableName store 名称
   * @returns { Promise<ResultType> }
   *
   */
  public async clearTable(tableName: string): Promise<ResultType> {
    return new Promise<boolean | void>((resolve) => {
      if (!this.db) return
      const transaction = this.db.transaction(tableName, 'readwrite')
      const objectStore = transaction.objectStore(tableName)
      const request = objectStore.clear()
      request.onsuccess = () => {
        resolve(true)
      }
      request.onerror = () => {
        resolve(false)
      }
    })
  }
}

export default IndexedDb
