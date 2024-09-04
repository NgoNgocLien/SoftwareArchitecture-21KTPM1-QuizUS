import React from 'react';
import { 
    StyleSheet, 
    View, 
    Text,
    Button,
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

    let vouchers = [
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

            brandLogo: 'https://res.cloudinary.com/dyvmxcaxw/image/upload/v1723476217/Shopee_oc4lkd.png',
            brandName: 'SHOPEE',
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

            brandLogo: 'https://res.cloudinary.com/dyvmxcaxw/image/upload/v1723476217/Shopee_oc4lkd.png',
            brandName: 'SHOPEE',
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

            brandLogo: 'https://res.cloudinary.com/dyvmxcaxw/image/upload/v1723476217/Shopee_oc4lkd.png',
            brandName: 'SHOPEE',
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

            brandLogo: 'https://res.cloudinary.com/dyvmxcaxw/image/upload/v1723476217/Shopee_oc4lkd.png',
            brandName: 'SHOPEE',
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
        <View style={styles.background} >
            <Header />
            <Image source={require('@/assets/images/banner-reward.png')} style={{width: '100%', height: 140}}  />
            <View style={styles.tabContainer}>
                <TouchableWithoutFeedback onPress={() => router.push('/')}>
                    <View style={styles.tab}>
                        <Image source={require('@/assets/images/icons/coin.png')} style={{width: 24, height: 24}} />
                        <Text style={{color: Colors.light.subText}}>Xu thưởng</Text>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => router.push('/')}>
                    <View style={styles.tab}>
                        <Image source={require('@/assets/images/icons/gift.png')} style={{width: 24, height: 24}} />
                        <Text style={{color: Colors.light.subText}}>Vật phẩm</Text>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => router.push('/')}>
                    <View style={styles.tab}>
                        <Image source={require('@/assets/images/icons/voucher.png')} style={{width: 24, height: 24}} />
                        <Text style={{color: Colors.light.subText}}>Mã giảm giá</Text>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => router.push('/')}>
                    <View style={styles.tab}>
                        <Image source={require('@/assets/images/icons/donate-coin.png')} style={{width: 24, height: 24}} />
                        <Text style={{color: Colors.light.subText}}>Thanh toán</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingVertical: 12 }}>
                <View style={[styles.container, styles.titleContainer]}>
                    <Heading type="h4">Đổi xu lấy quà</Heading>
                    <Heading type="h6" color={Colors.light.primary} onPress={() => router.push('/')}>Xem tất cả</Heading>
                </View>

                    
                {coinVouchers.map((voucher, index) => (
                    <VoucherCard 
                        voucher = {voucher}
                        key={index} 
                    />
                ))}

                <View style={[styles.container, styles.titleContainer]}>
                    <Heading type="h4">Đổi mảnh ghép</Heading>
                    <Heading type="h6" color={Colors.light.primary} onPress={() => router.push('/')}>Xem tất cả</Heading>
                </View>

                {itemVouchers.map((voucher, index) => (
                    <VoucherCard 
                        voucher = {voucher}
                        key={index} 
                        style={index === itemVouchers.length - 1 ? { marginBottom: 32 } : { }} 
                    />
                ))}

            </ScrollView>
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
    titleContainer: {
        marginTop: 20,
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
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
    }
});