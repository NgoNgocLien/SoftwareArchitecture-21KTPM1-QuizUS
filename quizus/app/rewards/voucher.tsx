import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { StyleSheet, Text, TouchableWithoutFeedback, View, ScrollView, Image } from 'react-native';

import { Header } from '@/components/header/Header';
import { Colors } from '@/constants/Colors';
import { CampaignCard } from '@/components/card/CampaignCard';
import { SearchBar } from '@/components/input/SearchBar';
import { getCampaignsInProgess } from '@/api/CampaignApi';
import { VoucherCard } from '@/components/card/VoucherCard';

export default function HomePage() {

    const tabNames = [
        { index: 0, name: 'Tất cả' },
        { index: 1, name: 'Đổi xu' },
        { index: 2, name: 'Mảnh ghép' },
    ]

    const [focusedTab, setFocusedTab] = useState(0);
    // const [campaigns, setCampaigns] = useState([]);

    const handleTabFocus = (index: number) => {
        setFocusedTab(index);
    }

    // for each campaign, get the brand name and logo
    // useEffect(() => {
    //     getCampaignsInProgess().then((res) => {
    //         // for each campaign, add brand name and logo and isFavoritfalse/         let _campaigns = res.map((campaign: any) => {

    //             return {
    //                 ...campaign,
    //                 brandName: 'SHOPEE',
    //                 brandLogo: 'https://res.cloudinary.com/dyvmxcaxw/image/upload/v1723476217/Shopee_oc4lkd.png',
    //                 isFavorite: falsee,
    //             }
    //         });
    //         setCampaigns(_campaigns); 
    //     });
    // }, []);
    let allVouchers: Voucher[] = [];
    let coinVouchers = allVouchers.filter(voucher => voucher.score_exchange !== -1);
    let itemVouchers = allVouchers.filter(voucher => voucher.score_exchange === -1);

    let vouchers: Voucher[][] = [];
    vouchers.push(allVouchers);
    vouchers.push(coinVouchers);
    vouchers.push(itemVouchers);

    return (
        <View style={styles.background} >
            <Header />
            <View style={[styles.container, {marginTop: 20, marginBottom: 10}]}>
                <SearchBar editable={false}  />
            </View>

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} alwaysBounceHorizontal={false} bounces={false} style={{ minHeight: 40, maxHeight: 40}}>
                <View style={styles.emptyTab}></View>

                {tabNames.map((tab, index) => (
                    <TouchableWithoutFeedback onPress={() => handleTabFocus(index)} key={tab.index}>
                        <View style={[styles.categoryTab, focusedTab === tab.index ? styles.focusedTab : null]}>
                            <Text style={[styles.categoryText, focusedTab === tab.index ? styles.focusedText : null]}>{tab.name}</Text>
                            <Text style={[styles.categoryText, styles.categoryAmountText, focusedTab === tab.index ? styles.focusedText : null]}>{vouchers[index]?.length}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                ))}

                <View style={styles.emptyTab}></View>
            </ScrollView>
            
            {
                focusedTab === 0 ? (
                    <>
                        {vouchers[0].length === 0 ? (
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <Image source={require('@/assets/images/empty-result.png')} style={{width: 250, height: 210}} />
                            </View>
                        ) : (
                            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingVertical: 12 }}>
                            {vouchers[0].map((voucher, index) => (
                                <VoucherCard 
                                
                                    key={index} 
                                    style={index === vouchers.length - 1 ? { marginBottom: 32 } : {}} 
                                />
                            ))}
                            </ScrollView> 
                        )}
                    </>
                ) : focusedTab === 1 ? (
                    <>
                        {vouchers[1].length === 0 ? (
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <Image source={require('@/assets/images/empty-result.png')} style={{width: 250, height: 210}} />
                            </View>
                        ) : (
                            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingVertical: 12 }}>
                            {vouchers[1].map((voucher, index) => (
                                <VoucherCard
                            
                                    key={index} 
                                    style={index === vouchers[1].length - 1 ? { marginBottom: 32 } : {}} 
                                />
                            ))}
                            </ScrollView> 
                        )}
                    </>
                ) : (
                    <>
                        {vouchers[2].length === 0 ? (
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <Image source={require('@/assets/images/empty-result.png')} style={{width: 250, height: 210}} />
                            </View>
                        ) : (
                            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingVertical: 12 }}>
                            {vouchers[2].map((voucher, index) => (
                                <VoucherCard
                                    key={index} 
                                    style={index === vouchers[2].length - 1 ? { marginBottom: 32 } : {}} 
                                />
                            ))}
                            </ScrollView> 
                        )}
                    </>
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

    container: {
        paddingHorizontal: 20,
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
        width: 'auto',
        height: 40,
        paddingHorizontal: 10,
        justifyContent: 'center',
        borderBottomColor: Colors.gray._500,
        borderBottomWidth: 1,
        flexDirection: 'row',
        gap: 8
    },

    categoryText: {
        color: Colors.light.subText,
        fontWeight: 'medium',
        fontSize: 16,
    },

    categoryAmountText:{
        backgroundColor: Colors.gray._100,
        borderRadius: 5,
        paddingHorizontal: 5,
        paddingTop: 1,
        height: '60%'
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