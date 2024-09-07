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

// Call API
const defaultPlayerInfo = {
    score: 100,
    quantity_item1: 0,
    quantity_item2: 0
}

export default function Rewards() {

    const [vouchers, setVouchers] = useState<any[][] | null>(null);
    const [loading, setLoading] = useState(true);

    // Fetch vouchers function
    const fetchVouchers = useCallback(() => {
        setLoading(true);
        getActiveVouchers()
            .then(voucherList => {
                let allVouchers: any[] = [];
                let coinVouchers: any[] = [];
                let itemVouchers: any[] = [];

                voucherList.forEach((item: {campaign: any; voucher: any; }) => {
                    if (item.campaign.id_quiz !== "") {
                        const newVoucher = VoucherFactory.createVoucher('coin', item.voucher);

                        coinVouchers.push({ voucher: newVoucher, campaign: item.campaign });
                        allVouchers.push({ voucher: newVoucher, campaign: item.campaign });
                    } else {
                        const newVoucher = VoucherFactory.createVoucher('item', {
                            ...item.voucher,
                            item1_quantity: item.campaign.item1_quantity,
                            item2_quantity: item.campaign.item2_quantity,
                        });

                        itemVouchers.push({ voucher: newVoucher, campaign: item.campaign });
                        allVouchers.push({ voucher: newVoucher, campaign: item.campaign });
                    }
                }); 
                
                setVouchers([allVouchers, coinVouchers, itemVouchers]);
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
                loading ? <LoadingView /> :
                !vouchers || (vouchers[1]?.length === 0 && vouchers[2]?.length === 0) ? (
                    <EmptyView />
                ) : (
                    <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                        <View style={[styles.container, styles.titleContainer]}>
                            <Heading type="h4">Đổi xu lấy quà</Heading>
                            <Heading type="h6" color={Colors.light.primary} onPress={() => router.push('/coins')} suppressHighlighting={true}>Xem tất cả</Heading>
                        </View>

                        {/* Lấy chỉ 2 mục */}
                        {vouchers[1]?.slice(0, 2).map((item, index) => (
                            <VoucherCard 
                                voucher={item.voucher.getVoucher()}
                                campaign={item.campaign}
                                playerInfo={defaultPlayerInfo}
                                key={index} 
                            />
                        ))}

                        <View style={[styles.container, styles.titleContainer]}>
                            <Heading type="h4">Đổi mảnh ghép</Heading>
                            <Heading type="h6" color={Colors.light.primary} onPress={() => router.push('/rewards')} suppressHighlighting={true}>Xem tất cả</Heading>
                        </View>
   
                        {/* Lấy chỉ 2 mục */}
                        {vouchers[2]?.slice(0, 2).map((item, index) => (
                            <VoucherCard 
                                voucher={item.voucher.getVoucher()}
                                campaign={item.campaign}
                                playerInfo={defaultPlayerInfo}
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