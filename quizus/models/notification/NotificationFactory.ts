import Noti from './Notification';

import { VoucherRedeemedNotification } from './VoucherRedeemedNotification';
import { VoucherUsedNotification } from './VoucherUsedNotification';

import { CampaignNotification } from './CampaignNotification';

import { FriendItemGiftNotification } from './FriendItemGiftNotification';
import { FriendVoucherGiftNotification } from './FriendVoucherGiftNotification';
import { FriendTurnRequestNotification } from './FriendTurnRequestNotification';

export interface NotificationAbstractFactory {
  createVoucherNotification(data: any): Noti;
  createEventNotification(data: any): Noti;
  createFriendNotification(data: any): Noti;
}

export class VoucherNotificationFactory implements NotificationAbstractFactory {
  createVoucherNotification(data: any): Noti {
    if (data.isUsed) {
      return new VoucherUsedNotification(data.seen_time, data.name_voucher);
    } else {
      return new VoucherRedeemedNotification(data.seen_time, data.name_voucher);
    }
  }

  createEventNotification(data: any): Noti {
    throw new Error('Not implemented');
  }

  createFriendNotification(data: any): Noti {
    throw new Error('Not implemented');
  }
}

export class EventNotificationFactory implements NotificationAbstractFactory {
  createVoucherNotification(data: any): Noti {
    throw new Error('Not implemented');
  }

  createEventNotification(data: any): Noti {
    return new CampaignNotification(data.seen_time, data.name_campaign, data.id_campaign, data.start_time);
  }

  createFriendNotification(data: any): Noti {
    throw new Error('Not implemented');
  }
}

export class FriendNotificationFactory implements NotificationAbstractFactory {
  createVoucherNotification(data: any): Noti {
    throw new Error('Not implemented');
  }

  createEventNotification(data: any): Noti {
    throw new Error('Not implemented');
  }

  createFriendNotification(data: any): Noti {
    if (data.subtype === 'item') {
      return new FriendItemGiftNotification(data.seen_time, data.name_sender, data.id_itemgift, data.id_item, data.name_campaign);
    } else if (data.subtype === 'voucher') {
      return new FriendVoucherGiftNotification(data.seen_time, data.name_sender, data.name_voucher, data.id_vouchergift);
    } else {
      return new FriendTurnRequestNotification(data.seen_time, data.name_sender, data.id_turnrequest, data.name_campaign);
    }
  }
}
