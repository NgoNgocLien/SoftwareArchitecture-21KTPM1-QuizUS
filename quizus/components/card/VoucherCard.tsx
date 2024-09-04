import React from 'react';
import { View, Text, Image, TouchableHighlight, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Toast from 'react-native-root-toast';

import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';
import { ToastBar, ToastBarOptions } from '@/components/ToastBar';

export function VoucherCard({
    voucher = {
        id: 1,
        name: 'Ưu đãi 50k cho đơn 100k',
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
    ...rest
}) {

    let expiredDateFormatted = new Date(voucher.expired_date).getDate().toLocaleString('vi-VN', {minimumIntegerDigits: 2}) + '/' + (new Date(voucher.expired_date).getMonth() + 1).toLocaleString('vi-VN', {minimumIntegerDigits: 2});

    let enoughCoin = voucher.price <= voucher.current_coin;
    let enoughItem = voucher.item_1 >=1 && voucher.item_2 >= 1 ? '2/2' : voucher.item_1 >= 1 || voucher.item_2 >= 1 ? '1/2' : '0/2';

    return (
        <View style={[styles.voucherContainer, rest.style]}>
            <View style={styles.brandContainer}>
                <Image source={{uri: voucher.brandLogo}} style={styles.brandLogo}/>
            </View>
            <View style={styles.detailContainer}>
                <View style={styles.detail_top}>
                    <Text style={styles.brandName}>{voucher.brandName}</Text>
                    <View style={Date.now() < Date.parse(voucher.expired_date) ? styles.timeContainer : [styles.timeContainer, styles.outDatedContainer]}>
                        <MaterialCommunityIcons name={'clock-outline'} style={ Date.now() < Date.parse(voucher.expired_date) ? styles.timeIcon : [styles.timeIcon, styles.outDated] }/>
                        { Date.now() < Date.parse(voucher.expired_date) ? 
                            <Text style={styles.time}>{expiredDateFormatted}</Text> :
                            <Text style={[styles.time, styles.outDated]}>Hết hạn</Text> 
                        }
                    </View>
                </View>
                <View style={styles.detail_middle}>
                    <Text style={styles.name} numberOfLines={2}>{voucher.name}</Text>
                </View>
                
                {
                    voucher.type === 'coin' ? 
                        <TouchableOpacity style={styles.exchangeButton} activeOpacity={0.6} onPress={() => {}}>
                            <Text style={enoughCoin ? styles.exchangeButtonText : [styles.exchangeButtonText]}>Đổi ngay</Text>
                            <Text style={enoughCoin ? styles.exchangeButtonText : [styles.exchangeButtonText]}><Image source={require('@/assets/images/coin.png')} style={{width: 16, height: 16}}/> {voucher.price}</Text>
                        </TouchableOpacity> :

                        <TouchableOpacity style={styles.exchangeButton} activeOpacity={0.6} onPress={() => {}}>
                            <Text style={enoughItem === '2/2' ? styles.exchangeButtonText : [styles.exchangeButtonText, {color: Colors.gray._600}]}>Đổi ngay</Text>
                            <Text style={enoughItem === '2/2' ? styles.exchangeButtonText : [styles.exchangeButtonText, {color: Colors.gray._600}]}>{enoughItem}</Text>
                        </TouchableOpacity>
                }
                
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    voucherContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        marginVertical: 8,
        marginHorizontal: 20,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 3.8,
        elevation: 5,
    },

    brandContainer: {
        flex: 1, 
        borderStyle: 'dashed', 
        borderColor: Colors.gray._400,
        borderRightWidth: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
        
    },
    brandLogo: {
        width: 80,
        height: 80,
    },
    
    detailContainer: {
        flex: 2.5,
    },

    detail_top: {
        marginTop: 10,
        marginHorizontal: 15, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems:'center'
    },
    brandName: {
        color: Colors.light.subText,
        fontSize: 12,
    },
    timeContainer: {
        padding: 4,
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 4, 
        borderRadius: 4, 
        backgroundColor: Colors.green._50
    },
    timeIcon: {
        color: Colors.green._800,
        fontSize: 16
    },
    time: {
        color: Colors.green._800,
        fontWeight: '500',
        fontSize: 12,
    },

    outDatedContainer: {
        backgroundColor: Colors.gray._200,
    },

    outDated: {
        color: Colors.light.subText,
    },

    detail_middle: {
        marginHorizontal: 15,
        marginVertical: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: '500',
        height: 48,
        overflow: 'hidden',
    },
    exchangeButton: {
        marginHorizontal: 15,
        marginBottom: 10,
        borderRadius: 6,
        paddingVertical: 8,
        paddingHorizontal: 12,
        flexGrow: 1,
        backgroundColor: Colors.yellow,
        color: Colors.light.mainText,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    exchangeButtonText: {
        color: Colors.feedback.warning,
        fontWeight: '600',
        fontSize: 16,
    }
});