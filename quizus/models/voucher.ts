export interface IVoucher {
    _id: string;
    id_brand: number;
    code: string;
    qr_code: string;
    photo: string;
    price: number;
    description: string;
    expired_date: string;
    score_exchange: number;
    status: boolean;
    name: string;

    type: string;
}

// redeem with coins or items
export type VoucherType =
    | 'COIN'
    | 'ITEM';