/**
 * @FileDescription: 路由缓存
 * @Author: Jango
 * @Date: 2023年05月12日
 * @LastEditors: Jango
 * @LastEditTime: 2023年05月12日
 */

import { defineStore } from "pinia";

export const useCache = defineStore("cache", {
  state: () => {
    return {
      cacheList: [],
    };
  },
  actions: {
    SAVE_CACHE(name: string) {
      const index = this.cacheList.findIndex((item) => item === name);
      if (index < 0) this.cacheList.push(name);
    },
    REMOVE_CACHE(name: string) {
      const index = this.cacheList.findIndex((item) => item === name);
      if (index >= 0) this.cacheList?.slpice(index, 1);
    },
  },
});
