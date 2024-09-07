import { useEffect, useState, useCallback } from 'react';
import { router, useFocusEffect } from 'expo-router';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, TouchableWithoutFeedback, View, ScrollView, StyleSheet, SafeAreaView } from 'react-native';

import { Colors } from '@/constants/Colors';
import { VoucherCard } from '@/components/card/VoucherCard';
import { LoadingView } from '@/components/LoadingView';
import { EmptyView } from '@/components/EmptyView';
import { Heading } from '@/components/text/Heading';
import { VoucherFactory } from '@/models/voucher/VoucherFactory';
import { getExchangedVouchers } from '@/api/VoucherApi';
import config from '@/constants/config';
import { showToast } from '@/components/ToastBar';

const tabNames = [
    { index: 0, name: 'Tất cả' },
    { index: 1, name: 'Đổi xu' },
    { index: 2, name: 'Mảnh ghép' },
]

export default function MyVouchers() {
    const [loading, setLoading] = useState(true);
    const [focusedTab, setFocusedTab] = useState(0);
    const [vouchers, setVouchers] = useState<any[][] | null>(null);

    const handleTabFocus = (index: number) => {
        setFocusedTab(index);
    }

    const fetchMyVouchers = useCallback(() => {
        setLoading(true);
        config.retrieveFromSecureStore('id_player', (id_player: string) => {
            getExchangedVouchers(id_player)
                .then(playerVouchers => {
                    let allVouchers: any[] = [];
                    let coinVouchers: any[] = [];
                    let itemVouchers: any[] = [];

                    playerVouchers.map((playerVoucher: {campaign?: any; voucher?: any; }) => {
                        const { voucher, ...newPlayerVoucher } = playerVoucher;

                        if (playerVoucher.campaign.id_quiz !== "") {
                            const newVoucher = VoucherFactory.createVoucher('coin', voucher);

                            coinVouchers.push({ ...newPlayerVoucher, voucher: newVoucher });
                            allVouchers.push({ ...newPlayerVoucher, voucher: newVoucher });
                        } else {
                            const newVoucher = VoucherFactory.createVoucher('item', voucher);
                            itemVouchers.push({ ...newPlayerVoucher, voucher: newVoucher });
                            allVouchers.push({ ...newPlayerVoucher, voucher: newVoucher });
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

            <View style={{ minHeight: 40, maxHeight: 40, flexDirection: 'row', display: 'flex' }}>
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
            </View>

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
                                        style={index === vouchers[2].length - 1 ? { marginBottom: 32 } : {}} 
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

    searchIcon: {
        fontSize: 24,
        color: Colors.gray._500,
    },

    searchBar: {
        height: 52,
        width: '100%',
        borderColor: Colors.light.subText,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: Colors.light.background,
    },

    emptyTab: {
        width: 20,
        height: 40,
        borderBottomColor: Colors.gray._500,
        borderBottomWidth: 1,    
    },

    categoryTab: {
        height: 40,
        flexGrow: 1,
        justifyContent: 'center',
        
        borderBottomColor: Colors.gray._500,
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },

    categoryText: {
        color: Colors.light.subText,
        fontWeight: '500',
        fontSize: 16,
    },

    categoryAmountText:{
        backgroundColor: Colors.gray._200,
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },

    focusedAmountText: {
        backgroundColor: Colors.light.secondary,
    },

    focusedTab: {
        borderBottomColor: Colors.light.primary,
        borderBottomWidth: 2,
    },

    focusedText: {
        color: Colors.light.primary,
        fontWeight: '700',
    }
});