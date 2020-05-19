export type EventTypes = 'gameEnd';

export class EventEmitter {
  private subscribers: Map<EventTypes, Function[]>;

  constructor() {
    this.subscribers = new Map();
  }

  on(event: EventTypes, fn: Function) {
    if (!this.subscribers.get(event)) {
      this.subscribers.set(event, []);
    }

    this.subscribers.get(event)!.push(fn);
  }

  off(event: EventTypes, fn: Function) {
    if (this.subscribers.get(event)) {
      this.subscribers.set(event, this.subscribers.get(event)!.filter(subscribed => fn !== subscribed));
    }
  }

  dispatch(event: EventTypes, arg: any) {
    if (this.subscribers.get(event)) {
      this.subscribers.get(event)!.forEach(fn => fn.call(null, arg));
    }
  }
}