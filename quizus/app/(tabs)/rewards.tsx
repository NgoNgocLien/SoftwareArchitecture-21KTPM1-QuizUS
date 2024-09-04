import React from 'react';
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

export default function Rewards() {

    let vouchers: any[] = [
        {
            id: 1,
            name: 'Ưu đãi 50k cho hóa đơn từ 100k',
            expired_date: '2024-09-25T12:00:00Z',
            price: 1000,
            type: 'coin',
            code: 'VOUCHER123',

            item_1: 0,
            item_2: 0,
            current_coin: 1000,

            brandLogo: 'https://res.cloudinary.com/dyvmxcaxw/image/upload/v1723476217/Shopee_oc4lkd.png',
            brandName: 'SHOPEE',
        },
        {
            id: 2,
            name: 'Phiếu quà tặng 100k cho hóa đơn từ 200k',
            expired_date: '2024-10-25T12:00:00Z',
            price: 1500,
            type: 'coin',
            code: 'VOUCHER123',

            item_1: 0,
            item_2: 0,
            current_coin: 1000,

            brandLogo: 'https://res.cloudinary.com/dyvmxcaxw/image/upload/v1725438714/image_26_ohwusp.png',
            brandName: 'CGV',
        },
        {
            id: 3,
            name: 'Ưu đãi 50k cho hóa đơn từ 200k trở lên',
            expired_date: '2024-09-25T12:00:00Z',
            price: -1,
            type: 'item',
            code: 'VOUCHER123',

            item_1: 1,
            item_2: 1,
            current_coin: 1000,

            brandLogo: 'https://res.cloudinary.com/dyvmxcaxw/image/upload/v1725438808/image_28_wk3gm5.png',
            brandName: 'PHUC LONG',
        },
        {
            id: 4,
            name: 'Ưu đãi 50% cho đơn 50k',
            expired_date: '2024-10-01T12:00:00Z',
            price: -1,
            type: 'item',
            code: 'VOUCHER123',

            item_1: 0,
            item_2: 1,
            current_coin: 1000,

            brandLogo: 'https://res.cloudinary.com/dyvmxcaxw/image/upload/v1725438809/image_31_wzigpo.png',
            brandName: 'KICHI-KICHI',
        },
        {
            id: 5,
            name: 'Ưu đãi 50k cho đơn 100k',
            expired_date: '2024-09-25T12:00:00Z',
            price: -1,
            type: 'item',
            code: 'VOUCHER123',

            item_1: 1,
            item_2: 0,
            current_coin: 1000,

            brandLogo: 'https://res.cloudinary.com/dyvmxcaxw/image/upload/v1725438809/image_21_azo1ib.png',
            brandName: 'STARBUCKS',
        },
        {
            id: 6,
            name: 'Ưu đãi 50% cho hóa đơn từ 200k',
            expired_date: '2024-10-14T12:00:00Z',
            price: -1,
            type: 'item',
            code: 'VOUCHER123',

            item_1: 1,
            item_2: 1,
            current_coin: 1000,

            brandLogo: 'https://res.cloudinary.com/dyvmxcaxw/image/upload/v1723476217/Shopee_oc4lkd.png',
            brandName: 'SHOPEE',
        }
    ]

    let coinVouchers = vouchers.filter(voucher => voucher.type === 'coin');
    let itemVouchers = vouchers.filter(voucher => voucher.type === 'item');

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
                    vouchers.length === 0 ? (
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
                            {coinVouchers.slice(0, 2).map((voucher, index) => (
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
                            {itemVouchers.slice(0, 2).map((voucher, index) => (
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
