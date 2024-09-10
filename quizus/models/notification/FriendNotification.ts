// FriendNotification.ts
import  Noti from './Notification';

export abstract class FriendNotification extends Noti {
  protected name_sender: string;

  constructor(seen_time: string, name_sender: string) {
    super(seen_time);
    this.name_sender = name_sender;
  }
}
