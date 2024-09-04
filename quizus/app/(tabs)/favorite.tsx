import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, ScrollView, TouchableWithoutFeedback, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Header } from '@/components/header/Header';
import { Colors } from '@/constants/Colors';
import { CampaignCard } from '@/components/card/CampaignCard';
import { SearchBar } from '@/components/input/SearchBar';
import { Heading } from '@/components/text/Heading';
import MaskedView from '@react-native-masked-view/masked-view';

export default function Favorite({
    campaigns = [
        {
            id: '64e9d9c8e8b4c21c4b2e9f5f',
            brandLogo: 'https://res.cloudinary.com/dyvmxcaxw/image/upload/v1723476217/Shopee_oc4lkd.png',
            brandName: 'SHOPEE',
            start_datetime: '2024-08-25T12:00:00Z',
            end_datetime: '2024-09-25T12:00:00Z',
            name: 'Săn Kho Báu Mỗi Ngày, Trúng Voucher Đỉnh Cao',
            
            isFavorite: true,
            id_brand1: 1,
            id_brand2: 2,        
            photo: 'https://res.cloudinary.com/dyvmxcaxw/image/upload/v1723489893/Shopee-game-la-gi_hvpkdi.jpg',
            category: 'Mua sắm',
            description: 'Shopee đã có mặt trên QuizUS! Có thực mới vực được đạo, nhanh tay nuốt trọn thử thách này thôi!',
        },
        {
            id: '64e9d9c8e8b4c21c4b2e9f5f',
            brandLogo: 'https://res.cloudinary.com/dyvmxcaxw/image/upload/v1725438808/image_29_daqusn.png',
            brandName: 'PIZZA HUT',
            start_datetime: '2024-08-25T12:00:00Z',
            end_datetime: '2024-10-23T12:00:00Z',
            name: 'Xoay Lắc Đèn Lồng, Mở Rương Quà Tặng',

            isFavorite: true,
            id_brand1: 1,
            id_brand2: 2,        
            photo: 'https://res.cloudinary.com/dyvmxcaxw/image/upload/v1723489893/Shopee-game-la-gi_hvpkdi.jpg',
            category: 'Nhà hàng',
            description: 'Shopee đã có mặt trên QuizUS! Có thực mới vực được đạo, nhanh tay nuốt trọn thử thách này thôi!',
        },
        {
            id: '64e9d9c8e8b4c21c4b2e9f5f',
            brandLogo: 'https://res.cloudinary.com/dyvmxcaxw/image/upload/v1725438809/image_31_wzigpo.png',
            brandName: 'KICHI KICHI',
            start_datetime: '2024-07-31T12:00:00Z',
            end_datetime: '2024-09-25T12:00:00Z',
            name: 'Bão Quà Cuồng Nhiệt',

            isFavorite: true,
            id_brand1: 1,
            id_brand2: 2,        
            photo: 'https://res.cloudinary.com/dyvmxcaxw/image/upload/v1723489893/Shopee-game-la-gi_hvpkdi.jpg',
            category: 'Nhà hàng',
            description: 'Shopee đã có mặt trên QuizUS! Có thực mới vực được đạo, nhanh tay nuốt trọn thử thách này thôi!',
        }, 
        {
            id: '64e9d9c8e8b4c21c4b2e9f5f',
            brandLogo: 'https://res.cloudinary.com/dyvmxcaxw/image/upload/v1725438714/image_26_ohwusp.png',
            brandName: 'CGV',
            start_datetime: '2024-07-31T12:00:00Z',
            end_datetime: '2024-09-25T12:00:00Z',
            name: 'Lắc Tay Săn Kho Báu, Rinh Về Ngàn Quà Tặng',

            isFavorite: true,
            id_brand1: 1,
            id_brand2: 2,        
            photo: 'https://res.cloudinary.com/dyvmxcaxw/image/upload/v1723489893/Shopee-game-la-gi_hvpkdi.jpg',
            category: 'Giải trí',
            description: 'Shopee đã có mặt trên QuizUS! Có thực mới vực được đạo, nhanh tay nuốt trọn thử thách này thôi!',
        }, 
    ]
}) {
    return (
        <View style={styles.background} >
            <Header />
            <View style={[styles.container, styles.titleContainer]}>
                <Heading type="h4">Yêu thích</Heading>
                <FontAwesome name={'search'} style={styles.searchIcon} />
            </View>
            <MaskedView maskElement={
                <LinearGradient 
                    colors={["rgba(0,0,0,0)", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black"]}
                    style={{ flex: 1 }}
                />
                } style={{flex: 1}}>

                {campaigns.length === 0 ? (
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Image source={require('@/assets/images/empty-result.png')} style={{width: 250, height: 210}} />
                    </View>
                ) : (
                    <ScrollView showsVerticalScrollIndicator={false} style={{ paddingVertical: 12 }}>
                    {campaigns.map((campaign, index) => (
                        <CampaignCard 
                            campaign={campaign}
                            key={index} 
                            style={index === campaigns.length - 1 ? { marginBottom: 32 } : {}} 
                        />
                    ))}
                    </ScrollView> 
                )}
            </MaskedView>
        </View>
  );
};


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
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    searchIcon: {
        fontSize: 24,
        color: Colors.gray._500,
    },
});