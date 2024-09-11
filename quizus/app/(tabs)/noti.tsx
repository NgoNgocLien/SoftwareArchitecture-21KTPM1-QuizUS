import { useCallback, useEffect, useState } from 'react';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
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
import { Button } from '@/components/Button';
import { getAll, updateSeenTime } from '@/api/NotiApi';
import { FriendNotification, FriendTurnRequestNotification } from '@/models/notification/FriendNotification';
import { replyTurn } from '@/api/GameApi';
const tabNames = [
    { index: 0, name: 'Voucher' },
    { index: 1, name: 'Sự kiện' },
    { index: 2, name: 'Bạn bè' },
]

export default function Notification() {
    const params= useLocalSearchParams();
    const previousRoute: '' | 'rewards' | 'favorite' = params.previousRoute as '' | 'rewards' | 'favorite';
    const [loading, setLoading] = useState(true);

    const [notifications, setNotifications] = useState<Noti[]>([]);
    const [unseen, setUnseen] = useState(false);

    const fetchNoti = () => {
        setLoading(true);
        retrieveFromSecureStore('id_player', (id_player: string) => {
           
            getAll(id_player).then((players) =>{
                console.log("noti.tsx: fetch noti")
                const voucherFactory = new VoucherNotificationFactory();
                const eventFactory = new EventNotificationFactory();
                const friendFactory = new FriendNotificationFactory();
            
                // Map through the data and use the correct factory for each type
                const mappedNotifications = players.map((item: any)  => {
                    if (item.seen_time === null)
                        setUnseen(true);

                    // console.log(item.type)
                    if (item.type === 'voucher') {
                    return voucherFactory.createVoucherNotification(item);
                    } else if (item.type === 'campaign') {
                        console.log("noti: ", item)
                    return eventFactory.createEventNotification(item);
                    } else if (item.type === 'friend') {
                    return friendFactory.createFriendNotification(item);
                    } else{
                        console.log("Invalid type: ", item.type);
                    }
                    // throw new Error('Unknown notification type');
                });

                // console.log("abc: ", mappedNotifications);
                setNotifications(mappedNotifications);
            })
            setLoading(false);
        })
    };

    useFocusEffect(
        useCallback(() => {
            fetchNoti();
        }, [])
    );

    const handleReadNoti = () => {
        if (!unseen)
            return;

        retrieveFromSecureStore("id_player", (id_player: string) =>{
            updateSeenTime(id_player).then(() => {
                // Re-fetch notifications after updating seen_time
                setUnseen(false);
                fetchNoti();
                
            }).catch(error => {
                console.error('Error updating seen time:', error);
            });
        })
    }

    const handleAccept = (notification: FriendTurnRequestNotification) => {     
        setLoading(true);
        notification.replyTurn(true).then(() =>{
            setUnseen(false);
            fetchNoti();
        })
    }

    const handleRefuse = (notification: FriendTurnRequestNotification) => {
        setLoading(true);
        notification.replyTurn(false).then(() =>{
            setUnseen(false);
            fetchNoti();
        })
    }

    // console.log("unseen notifications: ", unseen)
    return (
        <>
            <View style={styles.background}>
            {
                loading &&
                <View style={styles.loadingContainer}>
                    <LoadingView />
                </View> 
            }
            <SafeAreaView style={styles.header}>
                <MaterialCommunityIcons 
                    name={"arrow-left"} 
                    size={28} 
                    color={Colors.light.mainText} 
                    style={styles.backIcon} 
                    onPress={() => { 
                        const backRoute = `/(tabs)/${previousRoute}`;  // Correct way to concatenate the route
                        router.replace({
                            pathname: backRoute
                        }); 
                    }}
                    
                    suppressHighlighting={true} 
                />
            </SafeAreaView>
            <View style={[styles.container, styles.titleContainer]}>
                <Heading type="h4" style={{flexGrow: 2}}>Thông báo</Heading>
                <View style={{flexGrow: 1}} >
                    <Button text={'Đánh dấu đã đọc'} size={'small'} 
                        type={ unseen ? 'primary' : 'disabled' }
                        onPress={handleReadNoti}></Button>
                </View>
            </View>
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
                                <View key={notification.getId()} style={notification.getSeenTime() ? styles.notification : [styles.notification, styles.newNotification]}>
                                    <View style={styles.notificationBody}>
                                        <Paragraph type="p1" style={styles.notificationContent}>{notification.getContent()}</Paragraph>
                                        {
                                            !notification.getSeenTime() &&
                                            <View style={styles.notificationStatus}></View>
                                        }
                                        
                                    </View>
                                    {
                                        (notification instanceof FriendTurnRequestNotification) && notification.getIsAccept() == null && (
                                            <View style={styles.buttonView}>
                                                <Button text={'Từ chối'} type={'tertiary'} style={styles.button} onPress={() => {handleRefuse(notification)}}></Button>
                                                <Button text={'Đồng ý'} style={styles.button} onPress={() => {handleAccept(notification)}}></Button>
                                            </View>
                                        )
                                    }
                                    
                                    <Paragraph type="p3" color={Colors.gray._500}>{type}</Paragraph>
                                </View>
                            )
                        })
                    }
                    </ScrollView> 
                )
            }
        </View>
        </>

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
    loadingContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000, // Ensure the overlay appears above other components
    },
    header: {
        height: 100,
        top: 0,
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
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: "yellow",
        paddingRight: 0,
        borderBottomColor: Colors.gray._200,
        borderBottomWidth: 1,
    },

    notification:{
        padding: 20,
        borderBottomColor: Colors.gray._200,
        borderBottomWidth: 1,
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
    },

    buttonView:{
        flexDirection: 'row',
        justifyContent:'space-evenly',
        marginTop: 10,
    },
    button:{
        width: '35%',
    },
});