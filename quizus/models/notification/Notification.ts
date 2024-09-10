// Notification.ts
abstract class Noti {
  protected seen_time: string;
  protected noti_time: string;

  constructor(seen_time: string, noti_time: string) {
    this.seen_time = seen_time;
    this.noti_time = noti_time;
  }

  abstract getContent(): string;
  abstract display(): void;

  getSeenTime(): string{
    return this.seen_time;
  };

  getNotiTime(): string{
    return this.noti_time;
  };
}

export default Noti;
