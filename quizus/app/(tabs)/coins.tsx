import { StyleSheet, TouchableWithoutFeedback, View, Image, Text, ScrollView, SafeAreaView, Platform } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Button } from '@/components/Button';
import { Header } from '@/components/header/Header';
import { Colors } from '@/constants/Colors';
import config from '@/constants/config';
import { SubHeader } from '@/components/header/SubHeader';
import { VoucherCard } from '@/components/card/VoucherCard';
import { getActiveVouchers } from '@/api/VoucherApi';
import { VoucherFactory } from '@/models/voucher/VoucherFactory';
import { LoadingView } from '@/components/LoadingView';
import { EmptyView } from '@/components/EmptyView';

export default function Coins() {
    const router = useRouter();

    const tabNames = [
        { index: 0, name: 'Tất cả' },
        { index: 1, name: 'Nhà hàng' },
        { index: 2, name: 'Cafe & Bánh' },
        { index: 3, name: 'Mua sắm' },
        { index: 4, name: 'Giải trí' }
    ]

    const [focusedTab, setFocusedTab] = useState(0);

    const handleTabFocus = (index: number) => {
        setFocusedTab(index);
    }

    const [vouchers, setVouchers] = useState<any[] | null>(null);
    const [loading, setLoading] = useState(true);

    const [nhaHang, setNhahang] = useState<any[] | null>(null);
    const [cafeBanh, setCafeBanh] = useState<any[] | null>(null);
    const [muaSam, setMuaSam] = useState<any[] | null>(null);
    const [giaiTri, setGiaiTri] = useState<any[] | null>(null);

    useEffect(() => {
        getActiveVouchers()
        .then(voucherList => {

            let coinVouchers: any[] = [];
            let nhaHangVouchers: any[] = [];
            let cafeBanhVouchers: any[] = [];
            let muaSamVouchers: any[] = [];
            let giaiTriVouchers: any[] = [];

            voucherList.map((item: {campaign: any; voucher: any; }) => {

                if(item.campaign.id_quiz !== "") {
                    const newVoucher = VoucherFactory.createVoucher('coin', item.voucher);

                    coinVouchers.push({ voucher: newVoucher, campaign: item.campaign });

                    if (item.campaign.brandField === 'Nhà hàng') {
                        nhaHangVouchers.push({ voucher: newVoucher, campaign: item.campaign });
                    } else if (item.campaign.brandField === 'Cafe & Bánh') {
                        cafeBanhVouchers.push({ voucher: newVoucher, campaign: item.campaign });
                    } else if (item.campaign.brandField === 'Mua sắm') {
                        muaSamVouchers.push({ voucher: newVoucher, campaign: item.campaign });
                    } else if (item.campaign.brandField === 'Giải trí') {
                        giaiTriVouchers.push({ voucher: newVoucher, campaign: item.campaign });
                    }

                }
            }); 
            
            setVouchers(coinVouchers);
            setNhahang(nhaHangVouchers);
            setCafeBanh(cafeBanhVouchers);
            setMuaSam(muaSamVouchers);
            setGiaiTri(giaiTriVouchers);

            setLoading(false);

            // console.log('Coin Vouchers:', coinVouchers);
        })
        .catch(error => {
            console.error('Error fetching player vouchers:', error);
            setLoading(false);
        });

    }, []);

    return (
        <View style={styles.background}>
            {/* <SubHeader style={{backgroundColor: 'transparent'}} /> */}
            <Image source={require('@/assets/images/banner-coins.png')} style={styles.banner} />
            <SafeAreaView style={[styles.header]}>
                <MaterialCommunityIcons name={'arrow-left'} size={28} color={Colors['light'].mainText} onPress={() => router.replace('/(tabs)/rewards')} suppressHighlighting={true}/>
            </SafeAreaView>

            <View style={styles.coinsContainer}>
                <View style={styles.coins}>
                    <Text style={styles.coinsLabel}>Xu thưởng</Text>
                    <Text style={styles.coinsText}><Image source={require('@/assets/images/coin.png')} style={{width: 24, height: 24}}/> 2300</Text>
                </View>

                <TouchableWithoutFeedback onPress={() => router.push('/my-vouchers')}>
                    <View style={styles.tab}>
                        <Image source={require('@/assets/images/icons/voucher.png')} style={styles.icon} />
                        <Text style={styles.tabText}>Đã đổi</Text>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => router.push('/coins')}>
                    <View style={styles.tab}>
                        <Image source={require('@/assets/images/icons/time.png')} style={styles.icon} />
                        <Text style={styles.tabText}>Lịch sử</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} alwaysBounceHorizontal={false} bounces={false} style={{ minHeight: 40, maxHeight: 40}}>
                <View style={styles.emptyTab}></View>

                {tabNames.map((tab, index) => (
                    <TouchableWithoutFeedback onPress={() => handleTabFocus(index)} key={tab.index}>
                        <View style={[styles.categoryTab, focusedTab === tab.index ? styles.focusedTab : null]}>
                            <Text style={[styles.categoryText, focusedTab === tab.index ? styles.focusedText : null]}>{tab.name}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                ))}

                <View style={styles.emptyTab}></View>
            </ScrollView>
            {
                !vouchers || loading ? (
                    <LoadingView />
                ) : 
                
                focusedTab === 0 ? (
                    <>
                        {vouchers.length === 0 ? (
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <Image source={require('@/assets/images/empty-result.png')} style={{width: 250, height: 210}} />
                            </View>
                        ) : (
                            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingVertical: 12 }}>
                            {vouchers.map((item, index) => (
                                <VoucherCard 
                                    voucher={item.voucher}
                                    campaign={item.campaign}
                                    key={index} 
                                    style={index === vouchers.length - 1 ? { marginBottom: 32 } : {}} 
                                />
                            ))}
                            </ScrollView> 
                        )}
                    </>
                ) : focusedTab === 1 ? (
                    <>
                        {!nhaHang || nhaHang.length === 0 ? (
                            <EmptyView />
                        ) : (
                            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingVertical: 12 }}>
                            {nhaHang.map((item, index) => (
                                <VoucherCard 
                                    voucher={item.voucher}  
                                    campaign={item.campaign}
                                    key={index} 
                                    style={index === nhaHang.length - 1 ? { marginBottom: 32 } : {}} 
                                />
                            ))}
                            </ScrollView> 
                        )}
                    </>
                ) : focusedTab === 2 ? (
                    <>
                        {!cafeBanh || cafeBanh.length === 0 ? (
                            <EmptyView />
                        ) : (
                            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingVertical: 12 }}>
                            {cafeBanh.map((item, index) => (
                                <VoucherCard 
                                    voucher={item.voucher}
                                    campaign={item.campaign}
                                    key={index} 
                                    style={index === cafeBanh.length - 1 ? { marginBottom: 32 } : {}} 
                                />
                            ))}
                            </ScrollView> 
                        )}
                    </>
                ) : focusedTab === 3 ? (
                    <>
                        {!muaSam || muaSam.length === 0 ? (
                            <EmptyView />
                        ) : (
                            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingVertical: 12 }}>
                            {muaSam.map((item, index) => (
                                <VoucherCard 
                                    voucher={item.voucher}
                                    campaign={item.campaign}
                                    key={index} 
                                    style={index === muaSam.length - 1 ? { marginBottom: 32 } : {}} 
                                />
                            ))}
                            </ScrollView> 
                        )}
                    </>
                ) : focusedTab === 4 ? (
                    <>
                        {!giaiTri || giaiTri.length === 0 ? (
                            <EmptyView />
                        ) : (
                            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingVertical: 12 }}>
                            {giaiTri.map((item, index) => (
                                <VoucherCard 
                                    voucher={item.voucher}
                                    campaign={item.campaign}
                                    key={index} 
                                    style={index === giaiTri.length - 1 ? { marginBottom: 32 } : {}} 
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
        position: 'absolute',
        top: Platform.OS === 'android' ? 50 : 0,
        left: 20,
        display: 'flex',
        flexDirection: 'row',
    },
    banner: {
        width: '100%',
        height: 150,

        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 3.8,
        elevation: 5,
    },
    coinsContainer: {
        marginHorizontal: 20,
        padding: 20,
        marginTop: -48,
        marginBottom: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 3.8,
        elevation: 5,
    },

    coins: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 4,
        flex: 4
    },
    coinsLabel: {
        color: Colors.light.subText,
        fontSize: 16,
        fontWeight: '600',
    },
    coinsText: {
        color: Colors.feedback.warning,
        fontSize: 24,
        fontWeight: '700',
    },

    tab: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6,
        flex: 1,
    },
    icon: {
        width: 28,
        height: 28,
    },
    tabText: {
        color: Colors.light.subText,
        fontSize: 12,
        fontWeight: '500',
    },

    emptyTab: {
        width: 20,
        height: 40,
        borderBottomColor: Colors.gray._500,
        borderBottomWidth: 1,    
    },

    categoryTab: {
        width: 'auto',
        height: 40,
        paddingHorizontal: 10,
        justifyContent: 'center',
        borderBottomColor: Colors.gray._500,
        borderBottomWidth: 1,
    },

    categoryText: {
        color: Colors.light.subText,
        fontWeight: 'medium',
        fontSize: 16,
    },

    focusedTab: {
        borderBottomColor: Colors.light.primary,
        borderBottomWidth: 2,
    },

    focusedText: {
        color: Colors.light.primary,
        fontWeight: 500,
    }
    
});