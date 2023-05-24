const Local = {
  set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify({ data: value }));
  },
  get(key: string): any {
    let storage: any = localStorage.getItem(key);
    if (storage) {
      try {
        storage = JSON.parse(storage);
        return storage.data;
      } catch (e) {
        return null;
      }
    }
    return null;
  },
  remove(key: string): void {
    localStorage.removeItem(key);
  },
  clear(): void {
    const needKeep = ['walletSorter', 'USEDBANKS', 'USEDBANKSW'];
    const obj = {};
    // 取
    for (let key of needKeep) {
      obj[key] = localStorage.getItem(key);
    }

    localStorage.clear();
    // 登记活动浮标
    sessionStorage.removeItem('NoMoreCompletionGif')

    // 存
    for (let key of needKeep) {
      obj[key] && localStorage.setItem(key, obj[key]);
    }
  }
};

export default Local;
