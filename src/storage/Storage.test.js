import '../tests/LocalStorageMock';
import Storage from './Storage';

describe('Storage', () => {
  it('should create a empty local storage', () => {
    const storage = new Storage('storage');
    const data = storage.getData();
    expect(data.length).toBe(0);
  });

  it('should update the storage', () => {
    const storage = new Storage('storage2');
    storage.update([1, 2, 3]);
    const data = storage.getData();
    expect(data.length).toBe(3);
    expect(data[0]).toBe(1);
    expect(data[1]).toBe(2);
    expect(data[2]).toBe(3);
  });
});
