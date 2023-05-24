import IndexedDb from '@/Indexdb'
import { defineStore } from 'pinia'
interface State {
  IDB: any // 数据库实例
}

export const useIndexDBStore = defineStore({
  id: 'indexDB', // id必填，且需要唯一
  state: (): State => {
    return {
      IDB: null
    }
  },
  actions: {
    initIdnexDB(name: string) {
      // name 建议数据库名称按照登录信息的唯一值建库
      this.IDB = new IndexedDb(name, 1.0)
      this.IDB.init(['ChatList']).then((res: boolean) => {
        if (res) {
          console.error('初始化成功')
        }
      })
    }
  }
})
