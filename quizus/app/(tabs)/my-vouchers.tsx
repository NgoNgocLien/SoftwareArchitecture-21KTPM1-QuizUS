import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { Text, TouchableWithoutFeedback, View, ScrollView, Image, SafeAreaView } from 'react-native';

import { Colors } from '@/constants/Colors';
import { VoucherCard } from '@/components/card/VoucherCard';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { Heading } from '@/components/text/Heading';
import styles from './my-vouchers.styles';

import { VoucherFactory } from '@/models/voucher/VoucherFactory';

import { getExchangedVouchers } from '@/api/VoucherApi';

const tabNames = [
    { index: 0, name: 'Tất cả' },
    { index: 1, name: 'Đổi xu' },
    { index: 2, name: 'Mảnh ghép' },
]

export default function MyVouchers() {
    const [focusedTab, setFocusedTab] = useState(0);
    const [vouchers, setVouchers] = useState<any[][] | null>(null);

    const handleTabFocus = (index: number) => {
        setFocusedTab(index);
    }

    useEffect(() => {        
        getExchangedVouchers("100006")
        .then(playerVouchers => {

            let allVouchers: any[] = [];
            let coinVouchers: any[] = [];
            let itemVouchers: any[] = [];

            playerVouchers.map((playerVoucher: {campaign?: any; voucher?: any; }) => {
                const {voucher, ...newPlayerVoucher} = playerVoucher

                if(playerVoucher.campaign.id_quiz !== "") {
                    const newVoucher = VoucherFactory.createVoucher('coin', voucher);

                    coinVouchers.push({...newPlayerVoucher, voucher: newVoucher});
                    allVouchers.push({...newPlayerVoucher, voucher: newVoucher});
                } else {
                    const newVoucher = VoucherFactory.createVoucher('item', voucher);
                    itemVouchers.push({...newPlayerVoucher, voucher: newVoucher});
                    allVouchers.push({...newPlayerVoucher, voucher: newVoucher});
                }
            });

            setVouchers([allVouchers, coinVouchers, itemVouchers]);
        })
        .catch(error => {
            console.error('Error fetching player vouchers:', error);
        });

    }, []);

    return (
        <View style={styles.background} >
             <SafeAreaView style={styles.header}>
                <MaterialCommunityIcons name={"arrow-left"} size={28} color={Colors.light.mainText} style={styles.backIcon} onPress={() => {router.replace('/(tabs)/rewards')}} suppressHighlighting={true}/>
            </SafeAreaView>
            <View style={[styles.container, styles.titleContainer]}>
                <Heading type="h4">Mã giảm giá</Heading>
                <FontAwesome name={'search'} style={styles.searchIcon} />
            </View>

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} alwaysBounceHorizontal={false} bounces={false} style={{ minHeight: 40, maxHeight: 40}}>
                <View style={styles.emptyTab}></View>

                {tabNames.map((tab, index) => (
                    <TouchableWithoutFeedback onPress={() => handleTabFocus(index)} key={tab.index}>
                        <View style={[styles.categoryTab, focusedTab === tab.index ? styles.focusedTab : null]}>
                            <Text style={[styles.categoryText, focusedTab === tab.index ? styles.focusedText : null]}>{tab.name}</Text>
                            <Text style={[styles.categoryText, styles.categoryAmountText, focusedTab === tab.index ? styles.focusedText : null]}>
                                {vouchers === null ? 0 : vouchers[index]?.length}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                ))}

                <View style={styles.emptyTab}></View>
            </ScrollView>
            
            {
                focusedTab === 0 ? (
                    <>
                        {vouchers === null || vouchers[0].length === 0 ? (
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
                        {vouchers === null || vouchers[1].length === 0 ? (
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
                        {vouchers === null || vouchers[2].length === 0 ? (
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
