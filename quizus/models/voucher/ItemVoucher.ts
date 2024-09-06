import { Voucher } from "./Voucher";

export class ItemVoucher extends Voucher {
  item1_photo: string;
  item2_photo: string;

  constructor(voucherData: any) {
    super(voucherData);
    this.item1_photo = voucherData.item1_photo;
    this.item2_photo = voucherData.item2_photo;
  }

  getItem1(): string {
    return this.item1_photo;
  }

  getItem2(): string {
    return this.item2_photo;
  }

  getVoucher(): ItemVoucher{
    return this;
  }
}
  
 