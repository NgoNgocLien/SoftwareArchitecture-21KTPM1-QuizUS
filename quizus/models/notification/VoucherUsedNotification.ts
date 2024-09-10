// VoucherUsedNotification.ts
import { VoucherNotification } from './VoucherNotification';

export class VoucherUsedNotification extends VoucherNotification {
  constructor(seen_time: string, name_voucher: string) {
    super(seen_time, name_voucher);
  }

  getContent(): string{
    return `Voucher "${this.name_voucher}" đã được sử dụng thành công`;
  };

  display(): void {
    console.log(`Voucher: ${this.name_voucher} đã được sử dụng`);
  }
}
