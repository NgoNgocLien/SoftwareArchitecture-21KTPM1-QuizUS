import React, { useCallback, useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Keyboard, TouchableWithoutFeedback, View, ScrollView, Text, Image, Platform } from 'react-native';

import { Button } from '@/components/Button';
import { Link, useFocusEffect, useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { VoucherCard } from '@/components/card/VoucherCard';
import { EmptyView } from '@/components/EmptyView';
import { LoadingView } from '@/components/LoadingView';
import { retrieveFromSecureStore } from '@/api/SecureStoreService';
import { getPlayerItem, getPlayerScore } from '@/api/PlayerApi';
import { showToast } from '@/components/ToastBar';
import { PlayerInfo } from '@/models/game/PlayerInfo';
import { getActiveVouchers } from '@/api/VoucherApi';
import { VoucherFactory } from '@/models/voucher/VoucherFactory';
import { ItemVoucher } from '@/models/voucher/ItemVoucher';

export default function Items() {
    const router = useRouter();

    const tabNames = [
        { index: 0, name: 'Tất cả' },
        { index: 1, name: 'Nhà hàng' },
        { index: 2, name: 'Cafe & Bánh' },
        { index: 3, name: 'Mua sắm' },
        { index: 4, name: 'Giải trí' }
    ]

    const [focusedTab, setFocusedTab] = useState(0);

    const [vouchers, setVouchers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const [nhaHang, setNhahang] = useState<any[]>([]);
    const [cafeBanh, setCafeBanh] = useState<any[]>([]);
    const [muaSam, setMuaSam] = useState<any[]>([]);
    const [giaiTri, setGiaiTri] = useState<any[]>([]);

    const handleTabFocus = (index: number) => {
        setFocusedTab(index);
    }

    const [playerInfo, setPlayerInfo] = useState <PlayerInfo|undefined>(undefined);

    const sortVouchers = () => {
        if (vouchers.length !== 0 && playerInfo) {
            setVouchers(
                vouchers.sort((a: any, b: any) => {
                    const enoughA = (playerInfo.getPlayerQuantityItem1(a.campaign._id, a.voucher._id) >= 1 && playerInfo.getPlayerQuantityItem2(a.campaign._id, a.voucher._id) >= 1) ? 1 : 0;
                    const enoughB = (playerInfo.getPlayerQuantityItem1(b.campaign._id, b.voucher._id) >= 1 && playerInfo.getPlayerQuantityItem2(b.campaign._id, b.voucher._id) >= 1) ? 1 : 0;
                    return enoughB - enoughA;
                })      
            );

            if (nhaHang.length !== 0) {
                setNhahang(
                    nhaHang.sort((a: any, b: any) => {
                        const enoughA = (playerInfo.getPlayerQuantityItem1(a.campaign._id, a.voucher._id) >= 1 && playerInfo.getPlayerQuantityItem2(a.campaign._id, a.voucher._id) >= 1) ? 1 : 0;
                        const enoughB = (playerInfo.getPlayerQuantityItem1(b.campaign._id, b.voucher._id) >= 1 && playerInfo.getPlayerQuantityItem2(b.campaign._id, b.voucher._id) >= 1) ? 1 : 0;
                        return enoughB - enoughA;
                    })      
                );
            }

            if (cafeBanh.length !== 0) {
                setCafeBanh(
                    cafeBanh.sort((a: any, b: any) => {
                        const enoughA = (playerInfo.getPlayerQuantityItem1(a.campaign._id, a.voucher._id) >= 1 && playerInfo.getPlayerQuantityItem2(a.campaign._id, a.voucher._id) >= 1) ? 1 : 0;
                        const enoughB = (playerInfo.getPlayerQuantityItem1(b.campaign._id, b.voucher._id) >= 1 && playerInfo.getPlayerQuantityItem2(b.campaign._id, b.voucher._id) >= 1) ? 1 : 0;
                        return enoughB - enoughA;
                    })      
                );
            }

            if (muaSam.length !== 0) {
                setMuaSam(
                    muaSam.sort((a: any, b: any) => {
                        const enoughA = (playerInfo.getPlayerQuantityItem1(a.campaign._id, a.voucher._id) >= 1 && playerInfo.getPlayerQuantityItem2(a.campaign._id, a.voucher._id) >= 1) ? 1 : 0;
                        const enoughB = (playerInfo.getPlayerQuantityItem1(b.campaign._id, b.voucher._id) >= 1 && playerInfo.getPlayerQuantityItem2(b.campaign._id, b.voucher._id) >= 1) ? 1 : 0;
                        return enoughB - enoughA;
                    })      
                );
            }

            if (giaiTri.length !== 0) {
                setGiaiTri(
                    giaiTri.sort((a: any, b: any) => {
                        const enoughA = (playerInfo.getPlayerQuantityItem1(a.campaign._id, a.voucher._id) >= 1 && playerInfo.getPlayerQuantityItem2(a.campaign._id, a.voucher._id) >= 1) ? 1 : 0;
                        const enoughB = (playerInfo.getPlayerQuantityItem1(b.campaign._id, b.voucher._id) >= 1 && playerInfo.getPlayerQuantityItem2(b.campaign._id, b.voucher._id) >= 1) ? 1 : 0;
                        return enoughB - enoughA;
                    })      
                );
            }
        }
    }

    useFocusEffect(useCallback(()=> {
        retrieveFromSecureStore('id_player', (id_player: string) => {
            getPlayerItem(id_player).then((data: any) => {
                const player_items = data.map((data: {
                    id_campaign: any; vouchers: { id_voucher: any; }; quantity_item1: any; quantity_item2: any; item1_photo: any; item2_photo: any; }) => {
                    return {
                        id_campaign: data.id_campaign,
                        id_voucher: data.vouchers.id_voucher,
                        quantity_item1: data.quantity_item1,
                        quantity_item2: data.quantity_item2,
                        item1_photo: data.item1_photo,
                        item2_photo: data.item2_photo,
                    }
                })

                getPlayerScore(id_player).then((data) => {
                    console.log({
                        player_score: data.score,
                        player_items: player_items,
                    })
                    setPlayerInfo(new PlayerInfo({
                        player_score: data.score,
                        player_items: player_items,
                    }))

                }).catch((error) => {
                    console.error('Error fetching player score:', error);
                    showToast('error', 'Lỗi hệ thống');
                });

            }).catch((error) => {
                console.error('Error fetching player score:', error);
                showToast('error', 'Lỗi hệ thống');
            });

            
        }).catch((error) => {
            console.error('Error retrieving id_player from SecureStore:', error);
            showToast('error', 'Không tìm thấy thông tin người chơi');
        });
    },[]));

    const fetchItemVouchers = useCallback(() => {
        setLoading(true);
        getActiveVouchers()
        .then(voucherList => {

            let itemVouchers: any[] = [];
            let nhaHangVouchers: any[] = [];
            let cafeBanhVouchers: any[] = [];
            let muaSamVouchers: any[] = [];
            let giaiTriVouchers: any[] = [];

            voucherList.map((item: any) => {
                const { campaign, ...voucherData } = item;

                if(campaign.id_quiz === null || campaign.id_quiz === undefined || campaign.id_quiz === '') {
                    const newVoucher = VoucherFactory.createVoucher('item', voucherData);
                    itemVouchers.push({ voucher: newVoucher, campaign: {...campaign, id_campaign: campaign._id} });
                    if (campaign.brandField === 'Nhà hàng') {
                        nhaHangVouchers.push({ voucher: newVoucher, campaign: campaign });
                    } else if (campaign.brandField === 'Cafe & Bánh') {
                        cafeBanhVouchers.push({ voucher: newVoucher, campaign: campaign });
                    } else if (campaign.brandField === 'Mua sắm') {
                        muaSamVouchers.push({ voucher: newVoucher, campaign: campaign });
                    } else if (campaign.brandField === 'Giải trí') {
                        giaiTriVouchers.push({ voucher: newVoucher, campaign: campaign });
                    }
                }
            }); 
            
            setVouchers(itemVouchers);
            setNhahang(nhaHangVouchers);
            setCafeBanh(cafeBanhVouchers);
            setMuaSam(muaSamVouchers);
            setGiaiTri(giaiTriVouchers);

            setLoading(false);

            if (playerInfo) {
                sortVouchers();
            }

            // console.log('Coin Vouchers:', coinVouchers);
        })
        .catch(error => {
            console.error('Error fetching player vouchers:', error);
            setLoading(false);
            showToast('error', 'Lỗi hệ thống');
        });

    }, [playerInfo]);

    useFocusEffect(fetchItemVouchers);
    
    return (
        <View style={styles.background}>
            {/* <SubHeader style={{backgroundColor: 'transparent'}} /> */}
            <Image source={require('@/assets/images/banner-coins.png')} style={styles.banner} />
            <SafeAreaView style={[styles.header]}>
                <MaterialCommunityIcons name={'arrow-left'} size={28} color={Colors['light'].mainText} onPress={() => router.replace('/(tabs)/rewards')} suppressHighlighting={true}/>
            </SafeAreaView>

            <View style={styles.coinsContainer}>
                <View style={styles.coins}>
                    <Text style={styles.coinsLabel}>Mảnh ghép</Text>
                    <Text style={styles.coinsText}><Image source={require('@/assets/images/puzzle.png')} style={{width: 24, height: 24}}/> {playerInfo?.getTotalQuantityItems()}</Text>
                </View>
            </View>

            <View style={styles.tabContainer}>
                <TouchableWithoutFeedback onPress={() => router.replace({
                    pathname: '/my-vouchers',
                    params: {
                        focusTabIndex: 1
                    }
                })}>
                    <View style={styles.tab}>
                        <Image source={require('@/assets/images/icons/voucher.png')} style={styles.icon} />
                        <Text style={styles.tabText}>Đã đổi</Text>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => router.replace('/gift-item')}>
                    <View style={styles.tab}>
                        <Image source={require('@/assets/images/icons/donate-coin.png')} style={styles.icon} />
                        <Text style={styles.tabText}>Tặng bạn bè</Text>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback>
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
                loading ? <LoadingView /> :
                focusedTab === 0 ? (
                    <>
                        {vouchers.length === 0 ? (
                            <EmptyView />
                        ) : (
                            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingVertical: 12 }}>
                            {vouchers.map((item, index) => (
                                <VoucherCard 
                                    voucher={item.voucher}
                                    campaign={item.campaign}
                                    key={index} 
                                    playerInfo={playerInfo}
                                    style={index === vouchers.length - 1 ? { marginBottom: 32 } : {}} 
                                />
                            ))}
                            </ScrollView> 
                        )}
                    </>
                ) : focusedTab === 1 ? (
                    <>
                        {nhaHang.length === 0 ? (
                            <EmptyView />
                        ) : (
                            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingVertical: 12 }}>
                            {nhaHang.map((item, index) => (
                                <VoucherCard 
                                    voucher={item.voucher}  
                                    campaign={item.campaign}
                                    playerInfo={playerInfo}
                                    key={index} 
                                    style={index === nhaHang.length - 1 ? { marginBottom: 32 } : {}} 
                                />
                            ))}
                            </ScrollView> 
                        )}
                    </>
                ) : focusedTab === 2 ? (
                    <>
                        {cafeBanh.length === 0 ? (
                            <EmptyView />
                        ) : (
                            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingVertical: 12 }}>
                            {cafeBanh.map((item, index) => (
                                <VoucherCard 
                                    voucher={item.voucher}
                                    campaign={item.campaign}
                                    playerInfo={playerInfo}
                                    key={index} 
                                    style={index === cafeBanh.length - 1 ? { marginBottom: 32 } : {}} 
                                />
                            ))}
                            </ScrollView> 
                        )}
                    </>
                ) : focusedTab === 3 ? (
                    <>
                        {muaSam.length === 0 ? (
                            <EmptyView />
                        ) : (
                            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingVertical: 12 }}>
                            {muaSam.map((item, index) => (
                                <VoucherCard 
                                    voucher={item.voucher}
                                    campaign={item.campaign}
                                    playerInfo={playerInfo}
                                    key={index} 
                                    style={index === muaSam.length - 1 ? { marginBottom: 32 } : {}} 
                                />
                            ))}
                            </ScrollView> 
                        )}
                    </>
                ) : focusedTab === 4 ? (
                    <>
                        {giaiTri.length === 0 ? (
                            <EmptyView />
                        ) : (
                            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingVertical: 12 }}>
                            {giaiTri.map((item, index) => (
                                <VoucherCard 
                                    voucher={item.voucher}
                                    campaign={item.campaign}
                                    playerInfo={playerInfo}
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
    tabContainer:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingBottom: 20
    },
    tab: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6,
        flex: 1,
        paddingHorizontal: 20
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