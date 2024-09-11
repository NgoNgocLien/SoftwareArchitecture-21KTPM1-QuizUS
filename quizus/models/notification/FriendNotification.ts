// FriendNotification.ts
import { replyTurn, seenTurnNoti } from '@/api/GameApi';
import  Noti from './Notification';

export abstract class FriendNotification extends Noti {
  protected name_sender: string;

  constructor(_id: string, seen_time: string, noti_time: string, name_sender: string) {
    super(_id, seen_time, noti_time);
    this.name_sender = name_sender;
  }
}

// FriendItemGiftNotification.ts
// import { FriendNotification } from './FriendNotification';

export class FriendItemGiftNotification extends FriendNotification {
  private id_itemgift: string;
  private id_item: string;
  private name_campaign: string;

  constructor(_id: string, seen_time: string, noti_time: string, name_sender: string, id_itemgift: string, id_item: string, name_campaign: string ) {
    super(_id, seen_time, noti_time, name_sender);
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


// FriendVoucherGiftNotification.ts
// import { FriendNotification } from './FriendNotification';

export class FriendVoucherGiftNotification extends FriendNotification {
  private name_voucher: string;
  private id_vouchergift: string;

  constructor(_id: string, seen_time: string, noti_time: string, name_sender: string, name_voucher: string, id_vouchergift:string) {
    super(_id, seen_time, noti_time, name_sender);
    this.name_voucher = name_voucher;
    this.id_vouchergift = id_vouchergift;
  }

  getContent(): string{
    return `${this.name_sender} tặng bạn 1 mã giảm giá "${this.name_voucher}"`;
  };

  display(): void {
    console.log(`Có bạn ${this.name_sender} tặng voucher ${this.name_voucher}`);
  }
}

// FriendTurnRequestNotification.ts
// import { FriendNotification } from './FriendNotification';

export class FriendTurnRequestNotification extends FriendNotification {
  private id_turnrequest: string;
  private name_campaign: string;
  private is_accept: boolean;

  constructor(_id: string, seen_time: string, noti_time: string, name_sender: string, id_turnrequest: string, name_campaign: string, is_accept: boolean) {
    super(_id, seen_time, noti_time, name_sender);
    this.id_turnrequest = id_turnrequest;
    this.name_campaign = name_campaign;
    this.is_accept = is_accept;
  }

  getContent(): string{
    return `${this.name_sender} xin 1 lượt chơi cho sự kiện "${this.name_campaign}"`;
  };

  getIsAccept(): boolean{
    return this.is_accept;
  };

  async replyTurn(newIsAccept: boolean): Promise<any>{
    return replyTurn(this.id_turnrequest, newIsAccept)
      .then(() =>{
        seenTurnNoti(this._id)
        .then((updatedNoti) => {
          console.log("friend notification: ", updatedNoti);
          this.seen_time = updatedNoti.seen_time;
          this.is_accept = updatedNoti.is_accept;
          console.log(this)
        })
      })
      .catch((err) =>{
        console.log("friend notification: ", err)
      })
  }

  display(): void {
    console.log(`Có bạn ${this.name_sender} xin luợt chơi từ sự kiện ${this.name_campaign}`);
  }
}

export class FriendTurnReceiveNotification extends FriendNotification {
  private id_turnrequest: string;
  private name_campaign: string;

  constructor(_id: string, seen_time: string, noti_time: string, name_sender: string, id_turnrequest: string, name_campaign: string ) {
    super(_id, seen_time, noti_time, name_sender);
    this.id_turnrequest = id_turnrequest;
    this.name_campaign = name_campaign;
  }

  getContent(): string{
    return `${this.name_sender} đồng ý tặng bạn 1 lượt chơi cho sự kiện "${this.name_campaign}"`;
  };

  display(): void {
    console.log(`Có bạn ${this.name_sender} xin luợt chơi từ sự kiện ${this.name_campaign}`);
  }
}


