class Campaign {
    _id: string;
    id_brand1: number;
    id_brand2: number;
    name: string;
    photo: string;
    start_datetime: Date;
    end_datetime: Date;
    id_voucher: string;
    given_amount_voucher: number;
    id_quiz: string;
    item1_photo: string;
    item2_photo: string;
    max_amount_voucher: number;
    score_award: number;

    constructor({
        _id,
        id_brand1,
        id_brand2,
        name,
        photo,
        start_datetime,
        end_datetime,
        id_voucher,
        given_amount_voucher,
        id_quiz,
        item1_photo,
        item2_photo,
        max_amount_voucher,
        score_award,
    }: {
        _id: string;
        id_brand1: number;
        id_brand2: number;
        name: string;
        photo: string;
        start_datetime: string;
        end_datetime: string;
        id_voucher: string;
        given_amount_voucher: number;
        id_quiz: string;
        item1_photo: string;
        item2_photo: string;
        max_amount_voucher: number;
        score_award: number;
    }) {
        this._id = _id;
        this.id_brand1 = id_brand1;
        this.id_brand2 = id_brand2;
        this.name = name;
        this.photo = photo;
        this.start_datetime = new Date(start_datetime);
        this.end_datetime = new Date(end_datetime);
        this.id_voucher = id_voucher;
        this.given_amount_voucher = given_amount_voucher;
        this.id_quiz = id_quiz;
        this.item1_photo = item1_photo;
        this.item2_photo = item2_photo;
        this.max_amount_voucher = max_amount_voucher;
        this.score_award = score_award;
    }
}
