// Notification.ts
abstract class Noti {
  protected seen_time: string;

  constructor(seen_time: string) {
    this.seen_time = seen_time;
  }

  abstract getContent(): string;
  abstract display(): void;

  getSeenTime(): string{
    return this.seen_time;
  };
}

export default Noti;
