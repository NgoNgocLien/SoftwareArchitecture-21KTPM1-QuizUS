import Noti from './Notification';

export abstract class VoucherNotification extends Noti {
  name_voucher: string;
  // is_used: boolean;

  constructor(seen_time: string, name_voucher: string
    // , is_used: boolean
  ) {
    super(seen_time);
    this.name_voucher = name_voucher;
    // this.is_used = is_used;
  }
}

