// FriendVoucherGiftNotification.ts
import { FriendNotification } from './FriendNotification';

export class FriendVoucherGiftNotification extends FriendNotification {
  private name_voucher: string;
  private id_vouchergift: string;

  constructor(seen_time: string, name_sender: string, name_voucher: string, id_vouchergift:string) {
    super(seen_time, name_sender);
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
