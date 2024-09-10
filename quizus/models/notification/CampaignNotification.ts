import  Noti from './Notification';

export class CampaignNotification extends Noti {
  private id_campaign: string;
  private name_campaign: string;
  private start_time: Date;

  constructor(seen_time: string, id_campaign: string, name_campaign: string, start_time: string) {
    super(seen_time);
    this.id_campaign = id_campaign;
    this.name_campaign = name_campaign;
    this.start_time = new Date(start_time);
  }

  getContent(): string{
    return `Sự kiện "${this.name_campaign}" sắp diễn ra vào ngày ${this.start_time}`;
  };

  display(): void {
    console.log(`Sự kiện yêu thích '${this.name_campaign}' sắp diễn ra vào ${this.start_time}.`);
  }  
}
