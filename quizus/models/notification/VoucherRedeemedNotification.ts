// VoucherRedeemedNotification.ts
import { VoucherNotification } from './VoucherNotification';

export class VoucherRedeemedNotification extends VoucherNotification {
  constructor(seen_time: string, name_voucher: string) {
    super(seen_time, name_voucher);
  }

  getContent(): string{
    return `Đổi thành công mã giảm giá "${this.name_voucher}"`;
  };

  display(): void {
    console.log(`Voucher: ${this.name_voucher} đã đổi sử dụng`);
  }
}
