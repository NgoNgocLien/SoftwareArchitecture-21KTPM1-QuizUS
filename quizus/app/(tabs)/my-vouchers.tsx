import { useEffect, useState, useCallback } from 'react';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, TouchableWithoutFeedback, View, ScrollView, StyleSheet, SafeAreaView } from 'react-native';

import styles from '@/styles/my-vouchers.styles';
import { Colors } from '@/constants/Colors';
import { VoucherCard } from '@/components/card/VoucherCard';
import { LoadingView } from '@/components/LoadingView';
import { EmptyView } from '@/components/EmptyView';
import { Heading } from '@/components/text/Heading';
import { VoucherFactory } from '@/models/voucher/VoucherFactory';
import { getExchangedVouchers } from '@/api/VoucherApi';
import config from '@/constants/config';
import { showToast } from '@/components/ToastBar';
import {retrieveFromSecureStore} from '@/api/SecureStoreService'
const tabNames = [
    { index: 0, name: 'Tất cả' },
    { index: 1, name: 'Đổi xu' },
    { index: 2, name: 'Mảnh ghép' },
    { index: 3, name: 'Đã sử dụng' }
]

export default function MyVouchers() {
    const [loading, setLoading] = useState(true);

    const params= useLocalSearchParams();
    const focusTabIndex = parseInt(params.focusTabIndex as string);
    const [focusedTab, setFocusedTab] = useState(focusTabIndex || 0);

    const [vouchers, setVouchers] = useState<any[][] | null>(null);

    const handleTabFocus = (index: number) => {
        setFocusedTab(index);
    }

    const fetchMyVouchers = useCallback(() => {
        setLoading(true);
        retrieveFromSecureStore('id_player', (id_player: string) => {
            getExchangedVouchers(id_player)
                .then(playerVouchers => {
                    let allVouchers: any[] = [];
                    let coinVouchers: any[] = [];
                    let itemVouchers: any[] = [];
                    let usedVouchers: any[] = [];

                    playerVouchers.map((playerVoucher: {campaign?: any; voucher?: any; is_used?:boolean, id_playerVoucher: string}) => {
                        const { voucher, ...newPlayerVoucher } = playerVoucher;

                        if (playerVoucher.campaign.id_quiz !== "" && playerVoucher.campaign.id_quiz !== null && playerVoucher.campaign.id_quiz !== undefined) {
                            const newVoucher = VoucherFactory.createVoucher('coin', voucher);
                            
                            if (playerVoucher.is_used || Date.now() >= newVoucher.expired_date.getTime()){
                                usedVouchers.push({ ...newPlayerVoucher, voucher: newVoucher, id_playervoucher: playerVoucher.id_playerVoucher });
                            } else{
                                coinVouchers.push({ ...newPlayerVoucher, voucher: newVoucher, id_playervoucher: playerVoucher.id_playerVoucher });
                                allVouchers.push({ ...newPlayerVoucher, voucher: newVoucher, id_playervoucher: playerVoucher.id_playerVoucher });
                            }
                            
                        } else {
                            const newVoucher = VoucherFactory.createVoucher('item', voucher);

                            if (playerVoucher.is_used || Date.now() >= newVoucher.expired_date.getTime()){
                                usedVouchers.push({ ...newPlayerVoucher, voucher: newVoucher, id_playervoucher: playerVoucher.id_playerVoucher });
                            } else{
                                itemVouchers.push({ ...newPlayerVoucher, voucher: newVoucher, id_playervoucher: playerVoucher.id_playerVoucher });
                                allVouchers.push({ ...newPlayerVoucher, voucher: newVoucher, id_playervoucher: playerVoucher.id_playerVoucher });
                            }
                            
                        }
                    });

                    allVouchers.sort((a, b) => a.voucher.expired_date.getTime() - b.voucher.expired_date.getTime());
                    coinVouchers.sort((a, b) => a.voucher.expired_date.getTime() - b.voucher.expired_date.getTime());
                    itemVouchers.sort((a, b) => a.voucher.expired_date.getTime() - b.voucher.expired_date.getTime());
                    usedVouchers.sort((a, b) => a.voucher.expired_date.getTime() - b.voucher.expired_date.getTime());

                    setVouchers([allVouchers, coinVouchers, itemVouchers, usedVouchers]);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching player vouchers:', error);
                    setLoading(false);
                    showToast('error', 'Lỗi hệ thống');
                });
        }).catch((err) => {
            console.log(err);
            setLoading(false);
            showToast('error', 'Không tìm thấy thông tin người dùng');
        });

    }, []);

    // Refetch data when the screen comes into focus
    useFocusEffect(fetchMyVouchers);

    return (
        <View style={styles.background}>
            <SafeAreaView style={styles.header}>
                <MaterialCommunityIcons 
                    name={"arrow-left"} 
                    size={28} 
                    color={Colors.light.mainText} 
                    style={styles.backIcon} 
                    onPress={() => { router.replace('/(tabs)/rewards') }} 
                    suppressHighlighting={true} 
                />
            </SafeAreaView>
            <View style={[styles.container, styles.titleContainer]}>
                <Heading type="h4">Mã giảm giá</Heading>
                <FontAwesome name={'search'} style={styles.searchIcon} />
            </View>

            <ScrollView style={{ minHeight: 40, maxHeight: 40, flexDirection: 'row', display: 'flex' }} horizontal={true} showsHorizontalScrollIndicator={false} bounces={false}>
                <View style={styles.emptyTab}></View>

                {tabNames.map((tab, index) => (
                    <TouchableWithoutFeedback onPress={() => handleTabFocus(index)} key={tab.index}>
                        
                        <View style={[styles.categoryTab, focusedTab === tab.index ? styles.focusedTab : null]}>
                            <Text style={[styles.categoryText, focusedTab === tab.index ? styles.focusedText : null]}>
                                {tab.name}
                            </Text>
                            <View style={[styles.categoryAmountText, focusedTab === tab.index ? styles.focusedAmountText : null]}>
                                <Text style={[styles.categoryText, { fontSize: 12 }, focusedTab === tab.index ? styles.focusedText : null]}>
                                    {vouchers === null ? 0 : vouchers[index]?.length}
                                </Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                ))}

                <View style={styles.emptyTab}></View>
            </ScrollView>

            {
                focusedTab === 0 ? 
                loading ? <LoadingView /> :
                (
                    <>
                        {vouchers === null || vouchers[0].length === 0 ? (
                            <EmptyView />
                        ) : (
                            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingVertical: 12 }}>
                                {vouchers[0].map((item, index) => (
                                    <VoucherCard 
                                        voucher={item.voucher.getVoucher()}
                                        campaign={item.campaign}
                                        key={index} 
                                        is_used={item.is_used}
                                        id_playerVoucher={item.id_playerVoucher}
                                        style={index === vouchers[0].length - 1 ? { marginBottom: 32 } : {}} 
                                    />
                                ))}
                            </ScrollView> 
                        )}
                    </>
                ) : focusedTab === 1 ? 
                loading ? <LoadingView /> :
                (
                    <>
                        {vouchers === null || vouchers[1].length === 0 ? (
                            <EmptyView />
                        ) : (
                            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingVertical: 12 }}>
                                {vouchers[1].map((item, index) => (
                                    <VoucherCard
                                        voucher={item.voucher.getVoucher()}
                                        campaign={item.campaign}
                                        key={index} 
                                        is_used={item.is_used}
                                        id_playerVoucher={item.id_playerVoucher}
                                        style={index === vouchers[1].length - 1 ? { marginBottom: 32 } : {}} 
                                    />
                                ))}
                            </ScrollView> 
                        )}
                    </>
                ) : focusedTab === 2 ?
                loading ? <LoadingView /> :
                (
                    <>
                        {vouchers === null || vouchers[2].length === 0 ? (
                            <EmptyView />
                        ) : (
                            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingVertical: 12 }}>
                                {vouchers[2].map((item, index) => (
                                    <VoucherCard
                                        voucher={item.voucher.getVoucher()}
                                        campaign={item.campaign}
                                        key={index} 
                                        is_used={item.is_used}
                                        id_playerVoucher={item.id_playerVoucher}
                                        style={index === vouchers[2].length - 1 ? { marginBottom: 32 } : {}} 
                                    />
                                ))}
                            </ScrollView> 
                        )}
                    </>
                ) : focusedTab === 3 ?
                loading ? <LoadingView /> :
                (
                    <>
                        {vouchers === null || vouchers[3].length === 0 ? (
                            <EmptyView />
                        ) : (
                            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingVertical: 12 }}>
                                {vouchers[3].map((item, index) => (
                                    <VoucherCard
                                        voucher={item.voucher.getVoucher()}
                                        campaign={item.campaign}
                                        key={index} 
                                        is_used={item.is_used}
                                        id_playerVoucher={item.id_playerVoucher}
                                        style={index === vouchers[3].length - 1 ? { marginBottom: 32 } : {}} 
                                    />
                                ))}
                            </ScrollView> 
                        )}
                    </>
                ) : null
            }
        </View>
    )
}