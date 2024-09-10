import Noti from './Notification';

export abstract class VoucherNotification extends Noti {
  name_voucher: string;
  // is_used: boolean;

  constructor(seen_time: string, noti_time: string,name_voucher: string
    // , is_used: boolean
  ) {
    super(seen_time, noti_time);
    this.name_voucher = name_voucher;
    // this.is_used = is_used;
  }
}

// VoucherRedeemedNotification.ts
// import { VoucherNotification } from './VoucherNotification';

export class VoucherRedeemedNotification extends VoucherNotification {
  constructor(seen_time: string, noti_time: string, name_voucher: string) {
    super(seen_time, noti_time, name_voucher);
  }

  getContent(): string{
    return `Đổi thành công mã giảm giá "${this.name_voucher}"`;
  };

  display(): void {
    console.log(`Voucher: ${this.name_voucher} đã đổi sử dụng`);
  }
}

// VoucherUsedNotification.ts
// import { VoucherNotification } from './VoucherNotification';

export class VoucherUsedNotification extends VoucherNotification {
  constructor(seen_time: string, noti_time: string, name_voucher: string) {
    super(seen_time, noti_time, name_voucher);
  }

  getContent(): string{
    return `Voucher "${this.name_voucher}" đã được sử dụng thành công`;
  };

  display(): void {
    console.log(`Voucher: ${this.name_voucher} đã được sử dụng`);
  }
}


