class Storage {
  private storageName: string;

  constructor(storageName = 'gameLeaderBoard', initialValue = '[]') {
    this.storageName = storageName;
    if (!localStorage.getItem(storageName)) {
      localStorage.setItem(storageName, initialValue);
    }
  }

  getData<V>(): V | null {
    const storedData = localStorage.getItem(this.storageName);
    if (storedData) {
      return JSON.parse(storedData || '');
    }
    return null;
  }

  update(data: any) {
    localStorage.setItem(this.storageName, JSON.stringify(data));
  }
}

export default Storage;
