import { useEffect, useState, useCallback } from 'react';
import { 
    StyleSheet, 
    View, 
    Text,
    SafeAreaView,
    Image,
    TouchableWithoutFeedback,
    ScrollView,
} from 'react-native';
import { router, useFocusEffect } from 'expo-router';

import { Colors } from '@/constants/Colors';
import { Header } from '@/components/header/Header';
import { Heading } from '@/components/text/Heading';
import { VoucherCard } from '@/components/card/VoucherCard';
import { getActiveVouchers } from '@/api/VoucherApi';
import { VoucherFactory } from '@/models/voucher/VoucherFactory';
import { EmptyView } from '@/components/EmptyView';
import { LoadingView } from '@/components/LoadingView';
import { showToast } from '@/components/ToastBar';
import { PlayerInfo } from '@/models/game/PlayerInfo';
import { retrieveFromSecureStore } from '@/api/SecureStoreService';
import { getPlayerItem, getPlayerScore } from '@/api/PlayerApi';
import config from '@/constants/config';

export default function Rewards() {

    const [playerInfo, setPlayerInfo] = useState <PlayerInfo|undefined>(undefined);
    const [vouchers, setVouchers] = useState<any[][] | null>(null);
    const [loading, setLoading] = useState(true);

    const sortVouchers = () => {
        if (vouchers && playerInfo) {
            setVouchers([
                vouchers[0],
                vouchers[1].sort((a, b) => a.voucher.getScoreExchange() - b.voucher.getScoreExchange()), 
                // Sort item vouchers by the total quantity of items player has
                vouchers[2].sort((a, b) => {
                    const enoughA = (playerInfo.getPlayerQuantityItem1(a.campaign._id, a.voucher._id) >= 1 && playerInfo.getPlayerQuantityItem2(a.campaign._id, a.voucher._id) >= 1) ? 1 : 0;
                    const enoughB = (playerInfo.getPlayerQuantityItem1(b.campaign._id, b.voucher._id) >= 1 && playerInfo.getPlayerQuantityItem2(b.campaign._id, b.voucher._id) >= 1) ? 1 : 0;
                    return enoughB - enoughA;
                })
                    
            ]);
            vouchers[2].forEach((item) => {
                console.log(item.voucher._id, item.campaign._id);
            });
        }
    }

    const fetchPlayerInfo = useCallback(() => {
        retrieveFromSecureStore('id_player', (id_player: string) => {
            getPlayerItem(id_player).then((itemData: any) => {
                const player_items = itemData.map((d: any) => {
                    return {
                        id_campaign: d.id_campaign,
                        id_voucher: d.vouchers.id_voucher,
                        quantity_item1: d.quantity_item1,
                        quantity_item2: d.quantity_item2,
                        item1_photo: d.item1_photo,
                        item2_photo: d.item2_photo,
                    }
                })

                getPlayerScore(id_player).then((data) => {
                    setPlayerInfo(new PlayerInfo({
                        player_score: data.score,
                        player_items: player_items,
                    }))

                    if (vouchers) {
                        sortVouchers();
                    }

                }).catch((error) => {
                    console.error('Error fetching player score:', error);
                    showToast('error', 'Lỗi hệ thống');
                    setLoading(false);
                });

            }).catch((error) => {
                console.error('Error fetching player item:', error);
                showToast('error', 'Lỗi hệ thống');
                setLoading(false);
            });

        }).catch((error) => {
            console.error('Error retrieving id_player from SecureStore:', error);
            showToast('error', 'Không tìm thấy thông tin người chơi');
            setLoading(false);
        });
    },[]);

    // Fetch vouchers function
    const fetchVouchers = useCallback(() => {
        setLoading(true);
        getActiveVouchers()
            .then(voucherList => {
                let allVouchers: any[] = [];
                let coinVouchers: any[] = [];
                let itemVouchers: any[] = [];

                voucherList.forEach((item: any) => {
                    if (item.type === config.QUIZ_GAME) {
                        const { campaign, ...voucherData } = item;
                        const newVoucher = VoucherFactory.createVoucher('coin', voucherData);

                        coinVouchers.push({ voucher: newVoucher, campaign: campaign });
                        allVouchers.push({ voucher: newVoucher, campaign: campaign });
                    } else {
                        const { campaign, ...voucherData } = item;
                        
                        const newVoucher = VoucherFactory.createVoucher('item', {
                            ...voucherData,
                            item1_quantity: item.campaign.item1_quantity,
                            item2_quantity: item.campaign.item2_quantity,
                        });

                        itemVouchers.push({ voucher: newVoucher, campaign: campaign });
                        allVouchers.push({ voucher: newVoucher, campaign: campaign });
                    }
                }); 
                
                setVouchers([
                    allVouchers,
                    coinVouchers.sort((a, b) => a.voucher.getScoreExchange() - b.voucher.getScoreExchange()),
                    itemVouchers,
                ]);

                if (playerInfo) {
                    sortVouchers();
                }

                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching player vouchers:', error);
                setLoading(false);
                showToast('error', 'Lỗi hệ thống');
            });
    }, []);

    // Refetch data when the screen comes into focus
    useFocusEffect(fetchVouchers);
    useFocusEffect(fetchPlayerInfo);
    
    
    return (
        <View style={styles.background}>
            <Header />
            <Image source={require('@/assets/images/banner-reward.png')} style={styles.banner} />
            <View style={styles.tabContainer}>
                <TouchableWithoutFeedback onPress={() => router.push('/coins')}>
                    <View style={styles.tab}>
                        <Image source={require('@/assets/images/icons/coin.png')} style={styles.icon} />
                        <Text style={styles.tabText}>Xu thưởng</Text>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => router.push('/items')}>
                    <View style={styles.tab}>
                        <Image source={require('@/assets/images/icons/gift.png')} style={styles.icon} />
                        <Text style={styles.tabText}>Vật phẩm</Text>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => router.push('/my-vouchers')}>
                    <View style={styles.tab}>
                        <Image source={require('@/assets/images/icons/voucher.png')} style={styles.icon} />
                        <Text style={styles.tabText}>Mã giảm giá</Text>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => router.push('/rewards')}>
                    <View style={styles.tab}>
                        <Image source={require('@/assets/images/icons/donate-coin.png')} style={styles.icon} />
                        <Text style={styles.tabText}>Thanh toán</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>

            {
                (loading || playerInfo == undefined) ? <LoadingView /> :
                !vouchers || (vouchers[1]?.length === 0 && vouchers[2]?.length === 0) ? (
                    <EmptyView />
                ) : (
                    <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                        <View style={[styles.container, styles.titleContainer]}>
                            <Heading type="h4">Đổi xu lấy quà</Heading>
                            <Heading type="h6" color={Colors.light.primary} onPress={() => router.replace('/coins')} suppressHighlighting={true}>Xem tất cả</Heading>
                        </View>

                        {/* Lấy chỉ 2 mục */}
                        {vouchers[1]?.slice(0, 2).map((item, index) => (
                            <VoucherCard 
                                voucher={item.voucher.getVoucher()}
                                campaign={item.campaign}
                                playerInfo={playerInfo}
                                key={index} 
                            />
                        ))}

                        <View style={[styles.container, styles.titleContainer]}>
                            <Heading type="h4">Đổi mảnh ghép</Heading>
                            <Heading type="h6" color={Colors.light.primary} onPress={() => router.replace('/items')} suppressHighlighting={true}>Xem tất cả</Heading>
                        </View>
   
                        {/* Lấy chỉ 2 mục */}
                        {vouchers[2]?.slice(0, 2).map((item, index) => (
                            <VoucherCard 
                                voucher={item.voucher.getVoucher()}
                                campaign={item.campaign}
                                playerInfo={playerInfo}
                                key={index} 
                                style={index === 1 ? { marginBottom: 20 } : {}} 
                            />
                        ))}
                    </ScrollView>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
    banner: {
        width: '100%',
        height: 140,
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 12,
    },
    tab: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    icon: {
        width: 24,
        height: 24,
    },
    tabText: {
        color: Colors.light.subText,
    },
    scrollView: {
    },
    container: {
        paddingHorizontal: 20,
    },
    titleContainer: {
        marginTop: 20,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
});