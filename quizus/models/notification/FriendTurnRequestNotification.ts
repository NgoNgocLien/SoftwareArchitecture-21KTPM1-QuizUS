// FriendTurnRequestNotification.ts
import { FriendNotification } from './FriendNotification';

export class FriendTurnRequestNotification extends FriendNotification {
  private id_turnrequest: string;
  private name_campaign: string;

  constructor(seen_time: string, name_sender: string, id_turnrequest: string, name_campaign: string ) {
    super(seen_time, name_sender);
    this.id_turnrequest = id_turnrequest;
    this.name_campaign = name_campaign;
  }

  getContent(): string{
    return `${this.name_sender} xin 1 lượt chơi cho sự kiện "${this.name_campaign}"`;
  };

  display(): void {
    console.log(`Có bạn ${this.name_sender} xin luợt chơi từ sự kiện ${this.name_campaign}`);
  }
}
