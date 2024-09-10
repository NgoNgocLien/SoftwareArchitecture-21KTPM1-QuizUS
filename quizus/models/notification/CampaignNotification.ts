import  Noti from './Notification';

export class CampaignNotification extends Noti {
  private id_campaign: string;
  private name_campaign: string;
  private start_time: string;

  constructor(seen_time: string, noti_time: string, id_campaign: string, name_campaign: string, start_time: string) {
    super(seen_time, noti_time);
    this.id_campaign = id_campaign;
    this.name_campaign = name_campaign;

    const date = new Date(start_time);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();
    this.start_time = `${day}-${month}-${year}`;
  }

  getContent(): string{
    return `Sự kiện "${this.name_campaign}" sắp diễn ra vào ngày ${this.start_time}`;
  };

  display(): void {
    console.log(`Sự kiện yêu thích '${this.name_campaign}' sắp diễn ra vào ${this.start_time}.`);
  }  
}
