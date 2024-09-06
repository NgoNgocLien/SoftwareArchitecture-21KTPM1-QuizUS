import { CoinVoucher } from "./CoinVoucher";
import { ItemVoucher } from "./ItemVoucher";
import { Voucher } from "./Voucher";

export class VoucherFactory {
    static createVoucher(voucherType: string, voucherData: any): Voucher {
      if (voucherType === 'item') {
        return new ItemVoucher(voucherData);
      } else if (voucherType === 'coin') {
        return new CoinVoucher(voucherData);
      } else {
        throw new Error('Invalid voucher type');
      }
    }
  }
  