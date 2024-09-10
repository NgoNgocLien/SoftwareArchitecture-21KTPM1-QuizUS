// FriendItemGiftNotification.ts
import { FriendNotification } from './FriendNotification';

export class FriendItemGiftNotification extends FriendNotification {
  private id_itemgift: string;
  private id_item: string;
  private name_campaign: string;

  constructor(seen_time: string, name_sender: string, id_itemgift: string, id_item: string, name_campaign: string ) {
    super(seen_time, name_sender);
    this.id_itemgift = id_itemgift;
    this.id_item = id_item;
    this.name_campaign = name_campaign;
  }

  getContent(): string{
    return `${this.name_sender} tặng bạn mảnh ghép ${this.id_item} của sự kiện "${this.name_campaign}"`;
  };

  display(): void {
    console.log(`Có bạn ${this.name_sender} tặng mảnh ghép ${this.id_item} từ sự kiện ${this.name_campaign}`);
  }
}
