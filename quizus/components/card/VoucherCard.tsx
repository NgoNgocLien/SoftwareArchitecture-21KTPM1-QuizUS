import React from 'react';
import { View, Text, Image, Clipboard, StyleSheet, TouchableOpacity, Pressable, Alert, TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { Colors } from '@/constants/Colors';
import {Voucher} from '@/models/voucher/Voucher'
import { CoinVoucher } from '@/models/voucher/CoinVoucher';
import { ItemVoucher } from '@/models/voucher/ItemVoucher';
import { VoucherFactory } from '@/models/voucher/VoucherFactory';
import { Paragraph } from '../text/Paragraph';
import { PlayerInfo } from '@/models/game/PlayerInfo';
import { exchangeCoinVoucher, exchangeItemVoucher } from '@/api/VoucherApi';
import { retrieveFromSecureStore } from '@/api/SecureStoreService';
import { showToast } from '../ToastBar';

const defaultCampaign = {
    _id: '1',
    brandName: 'NULL',
    brandLogo: 'https://res.cloudinary.com/dklt21uks/image/upload/v1725617785/quizus/w6z4afxecugisynvpiwy.png'
}

const defaultVoucher = {
    _id: "1",
    id_brand: 1,
    code: 'VOUCHER123',
    qr_code: 'https://res.cloudinary.com/dklt21uks/image/upload/v1725617785/quizus/w6z4afxecugisynvpiwy.png',
    photo: 'https://res.cloudinary.com/dklt21uks/image/upload/v1725617785/quizus/w6z4afxecugisynvpiwy.png',
    price: 1000,
    description: 'VOUCHER123',
    expired_date: new Date('2024-09-25T12:00:00Z'),
    status: true,
    name: 'Ưu đãi 50k cho đơn 100k',
    id_voucher: "1",
    score_exchange: 400
}

export function VoucherCard({
    voucher,
    campaign = defaultCampaign,
    playerInfo,
    is_used,
    ...rest
}:{ 
    voucher: any,    
    campaign?:{
        _id: string,
        brandName: string,
        brandLogo: string
    },
    playerInfo?: PlayerInfo
    is_used?: boolean,
    [key: string]: any;
}) {

    let expiredDateFormatted = voucher 
    ?
        new Date(voucher.expired_date).getDate().toLocaleString('vi-VN', {minimumIntegerDigits: 2}) + '/' + (new Date(voucher.expired_date).getMonth() + 1).toLocaleString('vi-VN', {minimumIntegerDigits: 2}) + '/' + new Date(voucher.expired_date).getFullYear()
    :
        '';
    

    let enoughCoin = (voucher instanceof CoinVoucher) && playerInfo && playerInfo.getPlayerScore() >= (voucher as CoinVoucher).getScoreExchange();
    let quantity_item1 = playerInfo != undefined ? playerInfo.getPlayerQuantityItem1(campaign._id, voucher._id) : 0;
    let quantity_item2 = playerInfo != undefined ? playerInfo.getPlayerQuantityItem2(campaign._id, voucher._id) : 0;
    let enoughItem = (voucher instanceof ItemVoucher) && playerInfo && (quantity_item1 >=1 && quantity_item2 >= 1 ? '2/2' : ((quantity_item1 >= 1 || quantity_item2 >= 1) ? '1/2' : '0/2'));

    const handleCoinVoucherExchange = () => {
        retrieveFromSecureStore('id_player', (id_player: string) => {
            exchangeCoinVoucher(id_player, campaign._id, (voucher as CoinVoucher).getScoreExchange())
                .then((result) => {
                    if (result) {
                        console.log(result);
                        showToast('success', 'Đổi thành công');
                    } else {
                        showToast('error', 'Đổi thất bại');
                    }
                })
                .catch((error) => {
                    console.error(error);
                    showToast('error', 'Đổi thất bại');
                });
        }).catch((error) => {
            console.error(error);
            showToast('error', 'Không thể lấy thông tin người chơi');
        });
    }

    const handleItemVoucherExchange = () => {
        retrieveFromSecureStore('id_player', (id_player: string) => {
            exchangeItemVoucher(id_player, campaign._id, voucher._id)
                .then((result) => {
                    if (result) {
                        console.log(result);
                        showToast('success', 'Đổi thành công');
                    } else {
                        showToast('error', 'Đổi thất bại');
                    }
                })
                .catch((error) => {
                    console.error(error);
                    showToast('error', 'Đổi thất bại');
                });
        }).catch((error) => {
            console.error(error);
            showToast('error', 'Không thể lấy thông tin người chơi');
        });
    }


    return (
        <Pressable style={[styles.voucherContainer, rest.style]} onPress={() => 
            router.push({
                pathname: '/voucher',
                params: { id_voucher: voucher._id }
            })}>
            <View style={styles.brandContainer}>
                <Image source={{uri: campaign.brandLogo}} style={styles.brandLogo}/>
            </View>
            <View style={styles.detailContainer}>
                <View style={styles.detail_top}>
                    <Text style={styles.brandName}>{campaign.brandName}</Text>
                    <View style={Date.now() < voucher.expired_date.getTime() ? styles.timeContainer : [styles.timeContainer, styles.outDatedContainer]}>
                        <MaterialCommunityIcons name={'clock-outline'} style={ Date.now() < voucher.expired_date.getTime() ? styles.timeIcon : [styles.timeIcon, styles.outDated] }/>
                        { Date.now() < voucher.expired_date.getTime() ? 
                            <Text style={styles.time}>{expiredDateFormatted}</Text> :
                            <Text style={[styles.time, styles.outDated]}>Hết hạn</Text> 
                        }
                    </View>
                </View>
                <View style={styles.detail_middle}>
                    <Text style={styles.name} numberOfLines={2}>{voucher.name}</Text>
                </View>
                
                {
                    (playerInfo) ? (
                        (voucher instanceof CoinVoucher) ? 
                        <TouchableOpacity style={enoughCoin ? styles.exchangeButton : [styles.exchangeButton, {backgroundColor: Colors.gray._200}]} activeOpacity={0.6} onPress={() => {handleCoinVoucherExchange()}}>
                            <Text style={enoughCoin ? styles.exchangeButtonText : [styles.exchangeButtonText, {color: Colors.gray._600}]}>Đổi ngay</Text>
                            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                                <Image source={enoughCoin ? require('@/assets/images/coin.png') : require('@/assets/images/coin-grayscale.png')} style={[{width: 20, height: 20}]}/>
                                <Text style={enoughCoin ? styles.exchangeButtonText : [styles.exchangeButtonText, {color: Colors.gray._600}]}> {voucher.score_exchange}</Text>
                            </View>
                        </TouchableOpacity> 
                        : (
                            <TouchableOpacity style={enoughItem == '2/2' ? styles.exchangeButton : [styles.exchangeButton, {backgroundColor: Colors.gray._200}]} activeOpacity={0.6} onPress={() => {handleItemVoucherExchange()}}>
                                <Text style={enoughItem === '2/2' ? styles.exchangeButtonText : [styles.exchangeButtonText, {color: Colors.gray._600}]}>Đổi ngay</Text>
                                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                                    <Image source={enoughItem === '2/2' ? require('@/assets/images/puzzle.png') : require('@/assets/images/puzzle-grayscale.png')} style={{width: 20, height: 20}}/>
                                    <Text style={enoughItem === '2/2' ? styles.exchangeButtonText : [styles.exchangeButtonText, {color: Colors.gray._600}]}> {enoughItem}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    ) : (
                        is_used ? (
                            <View style={[styles.exchangeButton, {backgroundColor: Colors.gray._200}]}>
                                <Paragraph type={'p2'} color={ Colors.gray._500}>Đã sử dụng</Paragraph>
                            </View>
                        )  : (
                        (Date.now() < voucher.expired_date.getTime()) && <TouchableOpacity style={[styles.exchangeButton, {backgroundColor: Colors.gray._100}]} activeOpacity={0.6} 
                            onPress={() => {
                                Clipboard.setString(voucher.code); 
                                Alert.alert('Đã sao chép', `Mã giảm giá ${voucher.code} vừa được sao chép`);
                            }}>
                            <Paragraph type={'p2'}>{voucher.code}</Paragraph>
                            <MaterialCommunityIcons name={'content-copy'} size={18} color={Colors.light.subText} suppressHighlighting={true}/>
                        </TouchableOpacity>
                        )
                        
                    )
                }
                
            </View>
        </Pressable>
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
    },
});