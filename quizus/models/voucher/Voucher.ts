export class Voucher {
    _id: string;
    id_brand: number;
    code: string;
    qr_code: string;
    photo: string;
    price: number;
    description: string;
    expired_date: Date;
    status: boolean;
    name: string;
    id_voucher: string;
    
    constructor({
        _id,
        id_brand,
        code,
        qr_code,
        photo,
        price,
        description,
        expired_date,
        status,
        name,
        id_voucher,
    }: {
        _id: string;
        id_brand: number;
        code: string;
        qr_code: string;
        photo: string;
        price: number;
        description: string;
        expired_date: string;
        status: boolean;
        name: string;
        id_voucher: string;
    }) {
        this._id = _id;
        this.id_brand = id_brand;
        this.code = code;
        this.qr_code = qr_code;
        this.photo = photo;
        this.price = price;
        this.description = description;
        this.expired_date = new Date(expired_date);
        this.status = status;
        this.name = name;
        this.id_voucher = id_voucher;
    }

    getVoucher(): Voucher{
        return this;
    }

    useVoucher(): void{
        // call api
    }

    exchangeVoucher(): void{
        // call api
    }
}

  
  