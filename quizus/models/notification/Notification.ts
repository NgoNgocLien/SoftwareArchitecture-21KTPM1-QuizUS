// Notification.ts
abstract class Noti {
  protected seen_time: string;
  protected noti_time: string;
  protected _id: string;

  constructor(_id: string, seen_time: string, noti_time: string) {
    this.seen_time = seen_time;
    this.noti_time = noti_time;
    this._id = _id;
  }

  abstract getContent(): string;
  abstract display(): void;

  getSeenTime(): string{
    return this.seen_time;
  };

  getNotiTime(): string{
    return this.noti_time;
  };

  getId(): string{
    return this._id;
  }
}

export default Noti;
