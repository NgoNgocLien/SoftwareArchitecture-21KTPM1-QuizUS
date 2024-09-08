export class PlayerInfo {
    player_score: number | undefined;
    player_items: {
        id_campaign: string;
        id_voucher: string;
        quantity_item1: number;
        quantity_item2: number;
        item1_photo: string;
        item2_photo: string;
    }[];

    constructor({
        player_score,
        player_items,
    }: {
        player_score: number;
        player_items: any[];
    }) {
        this.player_score = player_score
        this.player_items = player_items;
    }

    setPlayerScore(player_score: number): void{
        this.player_score = player_score;
    }

    getPlayerScore(): number{
        return this.player_score || 0;
    }

    getPlayerQuantityItem1(id_campaign: string, id_voucher: string): number{
        const data = this.player_items.filter(player_item => player_item.id_voucher === id_voucher && player_item.id_campaign === id_campaign);
        return data[0].quantity_item1;
    }

    getPlayerQuantityItem2(id_campaign: string, id_voucher: string): number{
        const data = this.player_items.filter(player_item => player_item.id_voucher === id_voucher && player_item.id_campaign === id_campaign);
        console.log(data[0]);
        console.log(data[0].quantity_item2);
        return data[0].quantity_item2;
    }

    isEnoughCoin(score_exchange: number): boolean{
        return this.player_score ? this.player_score >= score_exchange : false
    }

    getTotalQuantityItems(): number{
        return this.player_items.reduce((prev, curr) => {
            return prev + curr.quantity_item1 + curr.quantity_item2;
        }, 0);
    }
}

  
  