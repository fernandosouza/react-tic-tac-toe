class Storage {
  constructor(storageName = 'gameLeaderBoard', initialValue = '[]') {
    this.storageName = storageName;
    if (!localStorage.getItem(storageName)) {
      localStorage.setItem(storageName, initialValue);
    }
  }

  getData() {
    return JSON.parse(localStorage.getItem(this.storageName));
  }

  update(data) {
    localStorage.setItem(this.storageName, JSON.stringify(data));
  }
}

export default Storage;
