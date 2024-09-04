import React from 'react';
import { 
    StyleSheet, 
    View, 
    Text,
    Button,
    SafeAreaView,
    Image,
    TouchableWithoutFeedback
} from 'react-native';
import { router } from 'expo-router';

import { Colors } from '@/constants/Colors';
import { getCampaignsInProgess } from '@/api/CampaignApi';
import { Header } from '@/components/header/Header';

export default function Rewards() {

    console.log(getCampaignsInProgess());

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