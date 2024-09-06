import { useEffect, useState } from 'react';
import { 
    StyleSheet, 
    View, 
    Text,
    SafeAreaView,
    Image,
    TouchableWithoutFeedback,
    ScrollView
} from 'react-native';
import { router } from 'expo-router';

import { Colors } from '@/constants/Colors';
import { Header } from '@/components/header/Header';
import { Heading } from '@/components/text/Heading';
import { VoucherCard } from '@/components/card/VoucherCard';
import { getActiveVouchers } from '@/api/VoucherApi';
import { VoucherFactory } from '@/models/voucher/VoucherFactory';

export default function Rewards() {

    const [_vouchers, setVouchers] = useState<any[][] | null>(null);

    useEffect(() => {
        getActiveVouchers()
        .then(vouchers => {

            console.log(vouchers);

            let allVouchers: any[] = [];
            let _coinVouchers: any[] = [];
            let _itemVouchers: any[] = [];

            vouchers.map((activeVoucher: {campaign?: any; voucher?: any; }) => {
                const {voucher, ...newActiveVoucher} = activeVoucher

                if(activeVoucher.campaign.id_quiz !== "") {
                    const newVoucher = VoucherFactory.createVoucher('coin', voucher);

                    _coinVouchers.push({...newActiveVoucher, voucher: newVoucher});
                    allVouchers.push({...newActiveVoucher, voucher: newVoucher});
                } else {
                    const newVoucher = VoucherFactory.createVoucher('item', voucher);
                    _itemVouchers.push({...newActiveVoucher, voucher: newVoucher});
                    allVouchers.push({...newActiveVoucher, voucher: newVoucher});
                }
            }); 
            
            setVouchers([allVouchers, _coinVouchers, _itemVouchers]);
        })
        .catch(error => {
            console.error('Error fetching player vouchers:', error);
        });

    }, []);

    return (
        <View style={styles.background}>
            <Header />
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
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
                    !_vouchers || _vouchers[1]?.length === 0 || _vouchers[2]?.length === 0 ? (
                        <View style={styles.emptyContainer}>
                            <Image source={require('@/assets/images/empty-result.png')} style={styles.emptyImage} />
                        </View>
                    ) : (
                        <>
                            <View style={[styles.container, styles.titleContainer]}>
                                <Heading type="h4">Đổi xu lấy quà</Heading>
                                <Heading type="h6" color={Colors.light.primary} onPress={() => router.push('/coins')} suppressHighlighting={true}>Xem tất cả</Heading>
                            </View>

                            {/* Lấy chỉ 2 mục */}
                            
                            { _vouchers[1]?.slice(0, 2).map((voucher, index) => (
                                <VoucherCard 
                                    voucher={voucher}
                                    key={index} 
                                />
                            ))}

                            <View style={[styles.container, styles.titleContainer]}>
                                <Heading type="h4">Đổi mảnh ghép</Heading>
                                <Heading type="h6" color={Colors.light.primary} onPress={() => router.push('/rewards')} suppressHighlighting={true}>Xem tất cả</Heading>
                            </View>

                            {/* Lấy chỉ 2 mục */}
                            {_vouchers[2]?.slice(0, 2).map((voucher, index) => (
                                <VoucherCard 
                                    voucher={voucher}
                                    key={index} 
                                    style={index === 1 ? { marginBottom: 20 } : {}} 
                                />
                            ))}
                        </>
                    )
                }
            </ScrollView>     
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
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyImage: {
        width: 250,
        height: 210,
    },
});
