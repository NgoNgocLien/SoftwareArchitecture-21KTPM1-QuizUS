import { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, TouchableWithoutFeedback, View, ScrollView, StyleSheet, SafeAreaView } from 'react-native';

import { Colors } from '@/constants/Colors';
import { LoadingView } from '@/components/LoadingView';
import { EmptyView } from '@/components/EmptyView';
import { Heading } from '@/components/text/Heading';
import {retrieveFromSecureStore} from '@/api/SecureStoreService'
import Noti from '@/models/notification/Notification';
import { EventNotificationFactory, FriendNotificationFactory, VoucherNotificationFactory } from '@/models/notification/NotificationFactory';
import { Paragraph } from '@/components/text/Paragraph';
import { VoucherNotification } from '@/models/notification/VoucherNotification';
import { CampaignNotification } from '@/models/notification/CampaignNotification';
const tabNames = [
    { index: 0, name: 'Voucher' },
    { index: 1, name: 'Sự kiện' },
    { index: 2, name: 'Bạn bè' },
]

const data = [
    { type: 'voucher', isUsed: true, name_voucher: 'Giảm 50%', seen_time: null },
    { type: 'voucher', isUsed: false, name_voucher: 'Giảm 20k', seen_time: '2024-09-08' },
    { type: 'event', name_campaign: 'Black Friday', id_campaign: '123', start_time: '10:00 AM', seen_time: '2024-09-08' },
    { type: 'friend', subtype: 'item', name_sender: 'My Linh', id_itemgift: '1', id_item: 1, name_campaign: 'Ưu đãi sốc mùa hè', seen_time: null },
    { type: 'friend', subtype: 'voucher', name_sender: 'My Linh',  id_vouchergift: '1', name_voucher: 'Giảm 10%', seen_time: null },
    { type: 'friend', subtype: 'turn', name_sender: 'My Linh', id_turnrequest: '1', name_campaign: 'Ưu đãi sốc mùa đông', seen_time: '2024-09-08' }
  ];
  
export default function Notification() {
    const params= useLocalSearchParams();

    const [loading, setLoading] = useState(true);
    const [focusedTab, setFocusedTab] = useState(0);

    const [vouchers, setVouchers] = useState<any[]| null>(null);
    const [campaigns, setCampaigns] = useState<any[]| null>(null);
    const [friends, setFriends] = useState<any[]| null>(null);

    const [notifications, setNotifications] = useState<Noti[]>([]);

    const handleTabFocus = (index: number) => {
        setFocusedTab(index);
    }

    const fetchNoti = () => {
        setLoading(true);
        retrieveFromSecureStore('id_player', (id_player: string) => {
           
              const voucherFactory = new VoucherNotificationFactory();
              const eventFactory = new EventNotificationFactory();
              const friendFactory = new FriendNotificationFactory();
        
              // Map through the data and use the correct factory for each type
              const mappedNotifications = data.map(item => {
                if (item.type === 'voucher') {
                  return voucherFactory.createVoucherNotification(item);
                } else if (item.type === 'event') {
                  return eventFactory.createEventNotification(item);
                } else if (item.type === 'friend') {
                  return friendFactory.createFriendNotification(item);
                }
                throw new Error('Unknown notification type');
              });
        
              setNotifications(mappedNotifications);
              setLoading(false);
        })
    };

    useEffect(() => {
        fetchNoti();
    }, []);

    return (
        <View style={styles.background}>
            <SafeAreaView style={styles.header}>
                <MaterialCommunityIcons 
                    name={"arrow-left"} 
                    size={28} 
                    color={Colors.light.mainText} 
                    style={styles.backIcon} 
                    onPress={() => { router.replace('/(tabs)') }} 
                    suppressHighlighting={true} 
                />
            </SafeAreaView>
            <View style={[styles.container, styles.titleContainer]}>
                <Heading type="h4">Thông báo</Heading>
            </View>

            {
                loading 
                ? <LoadingView /> 
                : ( 
                <>
                {
                    notifications.length == 0 
                    ? <EmptyView texts={['Chưa có thông báo']}/> 
                    : (
                        <ScrollView showsVerticalScrollIndicator={false} style={{ paddingVertical: 12 }}>
                        {
                            notifications.map((notification, index) => {
                                const type = 
                                    (notification instanceof VoucherNotification) ? "Mã giảm giá" : 
                                    (notification instanceof CampaignNotification) ? "Sự kiện" : "Bạn bè";
                                
                                return (
                                    <View key={index} style={notification.getSeenTime() ? styles.notification : [styles.notification, styles.newNotification]}>
                                        <View style={styles.notificationBody}>
                                            <Paragraph type="p1" style={styles.notificationContent}>{notification.getContent()}</Paragraph>
                                            {
                                                !notification.getSeenTime() &&
                                                <View style={styles.notificationStatus}></View>
                                            }
                                            
                                        </View>
                                        <Paragraph type="p3" color={Colors.gray._500}>{type}</Paragraph>
                                    </View>
                                )
                            })
                        }
                        </ScrollView> 
                    )
                }
                </>)
            }

            
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: Colors.light.background,
    },

    container: {
        paddingHorizontal: 20,
    },

    header: {
        height: 100,
        backgroundColor: Colors.light.background,
        justifyContent: 'center',
        paddingBottom: -10,

        // Shadow for iOS
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 5 }, // Adds shadow below the header
        shadowOpacity: 0.08,
        shadowRadius: 4,

        // Shadow for Android
        elevation: 7, // Elevation for the shadow effect
    },

    backIcon: {
        position: 'relative',
        left: 20,
    },

    titleContainer: {
        marginVertical: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    notification:{
        padding: 20
    },
    newNotification:{
        backgroundColor: Colors.light.secondary
    },
    notificationBody:{
        flexDirection: 'row',
        justifyContent:'space-between',
    },
    notificationContent:{
        maxWidth: '90%',
    },
    notificationStatus:{
        width: 10,
        height: 10,
        backgroundColor: Colors.light.primary,
        borderRadius: 50,
        alignSelf: 'center',
    }

});