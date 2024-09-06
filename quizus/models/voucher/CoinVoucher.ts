import { Voucher } from "./Voucher";

export class CoinVoucher extends Voucher {
    score_exchange: number;

    constructor(voucherData: any) {
        super(voucherData);
        this.score_exchange = voucherData.score_exchange;
    }

    getScoreExchange(): number {
        return this.score_exchange;
    }

    getVoucher(): CoinVoucher{
        return this;
    }
}