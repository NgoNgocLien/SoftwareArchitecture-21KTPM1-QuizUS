import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { StyleSheet, Text, TouchableWithoutFeedback, View, ScrollView, Image } from 'react-native';

import { Header } from '@/components/header/Header';
import { Colors } from '@/constants/Colors';
import { CampaignCard } from '@/components/card/CampaignCard';
import { SearchBar } from '@/components/input/SearchBar';
import { getCampaignsInProgess } from '@/api/CampaignApi';

export default function HomePage() {

    const tabNames = [
        { index: 0, name: 'Tất cả' },
        { index: 1, name: 'Nhà hàng' },
        { index: 2, name: 'Cafe & Bánh' },
        { index: 3, name: 'Mua sắm' },
        { index: 4, name: 'Giải trí' }
    ]

    const [focusedTab, setFocusedTab] = useState(0);
    const [campaignsss, setCampaigns] = useState([]);

    const handleTabFocus = (index: number) => {
        setFocusedTab(index);
    }

    // for each campaign, get the brand name and logo
    useEffect(() => {
        getCampaignsInProgess().then((res) => {
            // for each campaign, add brand name and logo and isFavoritfalse
            let _campaigns = res.map((campaign: any) => {
                return {
                    ...campaign,
                    brandName: 'SHOPEE',
                    brandLogo: 'https://res.cloudinary.com/dyvmxcaxw/image/upload/v1723476217/Shopee_oc4lkd.png',
                    isFavorite: false,
                }
            });
            // console.log(_campaigns);
            setCampaigns(_campaigns); 
        });
    }, []);

    let campaigns = [
        {
            id: '64e9d9c8e8b4c21c4b2e9f5f',
            brandLogo: 'https://res.cloudinary.com/dyvmxcaxw/image/upload/v1725438734/image_40_pjzahq.png',
            brandName: 'GRAB',
            start_datetime: '2024-08-25T12:00:00Z',
            end_datetime: '2024-09-25T12:00:00Z',
            name: 'Cuộc Đua Săn Quà, Trúng Lớn Mỗi Ngày',
            
            isFavorite: false,
            id_brand1: 1,
            id_brand2: 2,        
            photo: 'https://res.cloudinary.com/dyvmxcaxw/image/upload/v1725439296/360_F_505624884_d3W9poOAjT6X7w41gxdxLFtxKjJ1DrWk_zfod62.jpg',
            category: 'Mua sắm',
            description: 'Shopee đã có mặt trên QuizUS! Có thực mới vực được đạo, nhanh tay nuốt trọn thử thách này thôi!',
        },
        {
            id: '64e9d9c8e8b4c21c4b2e9f5f',
            brandLogo: 'https://res.cloudinary.com/dyvmxcaxw/image/upload/v1723476217/Shopee_oc4lkd.png',
            brandName: 'SHOPEE',
            start_datetime: '2024-08-25T12:00:00Z',
            end_datetime: '2024-09-25T12:00:00Z',
            name: 'Săn Kho Báu Mỗi Ngày, Trúng Voucher Đỉnh Cao',
            
            isFavorite: false,
            id_brand1: 1,
            id_brand2: 2,        
            photo: 'https://res.cloudinary.com/dyvmxcaxw/image/upload/v1725439296/360_F_505624884_d3W9poOAjT6X7w41gxdxLFtxKjJ1DrWk_zfod62.jpg',
            category: 'Mua sắm',
            description: 'Shopee đã có mặt trên QuizUS! Có thực mới vực được đạo, nhanh tay nuốt trọn thử thách này thôi!',
        },
        {
            id: '64e9d9c8e8b4c21c4b2e9f5f',
            brandLogo: 'https://res.cloudinary.com/dyvmxcaxw/image/upload/v1725438808/image_27_yhpkap.png',
            brandName: 'HIGHLANDS',
            start_datetime: '2024-08-25T12:00:00Z',
            end_datetime: '2024-09-25T12:00:00Z',
            name: 'Săn Kho Báu Mỗi Ngày, Trúng Voucher Đỉnh Cao',
            
            isFavorite: false,
            id_brand1: 1,
            id_brand2: 2,        
            photo: 'https://res.cloudinary.com/dyvmxcaxw/image/upload/v1725439296/360_F_505624884_d3W9poOAjT6X7w41gxdxLFtxKjJ1DrWk_zfod62.jpg',
            category: 'Cafe & Bánh',
            description: 'Shopee đã có mặt trên QuizUS! Có thực mới vực được đạo, nhanh tay nuốt trọn thử thách này thôi!',
        },
        {
            id: '64e9d9c8e8b4c21c4b2e9f5f',
            brandLogo: 'https://res.cloudinary.com/dyvmxcaxw/image/upload/v1725438808/image_29_daqusn.png',
            brandName: 'PIZZA HUT',
            start_datetime: '2024-08-25T12:00:00Z',
            end_datetime: '2024-10-23T12:00:00Z',
            name: 'Xoay Lắc Đèn Lồng, Mở Rương Quà Tặng',

            isFavorite: false,
            id_brand1: 1,
            id_brand2: 2,        
            photo: 'https://res.cloudinary.com/dyvmxcaxw/image/upload/v1725439296/360_F_505624884_d3W9poOAjT6X7w41gxdxLFtxKjJ1DrWk_zfod62.jpg',
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

            isFavorite: false,
            id_brand1: 1,
            id_brand2: 2,        
            photo: 'https://res.cloudinary.com/dyvmxcaxw/image/upload/v1725439296/360_F_505624884_d3W9poOAjT6X7w41gxdxLFtxKjJ1DrWk_zfod62.jpg',
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

            isFavorite: false,
            id_brand1: 1,
            id_brand2: 2,        
            photo: 'https://res.cloudinary.com/dyvmxcaxw/image/upload/v1725439296/360_F_505624884_d3W9poOAjT6X7w41gxdxLFtxKjJ1DrWk_zfod62.jpg',
            category: 'Giải trí',
            description: 'Shopee đã có mặt trên QuizUS! Có thực mới vực được đạo, nhanh tay nuốt trọn thử thách này thôi!',
        }, 
        {
            id: '64e9d9c8e8b4c21c4b2e9f5f',
            brandLogo: 'https://res.cloudinary.com/dyvmxcaxw/image/upload/v1725438809/image_21_azo1ib.png',
            brandName: 'STARBUCKS',
            start_datetime: '2024-09-01T12:00:00Z',
            end_datetime: '2024-10-31T12:00:00Z',
            name: 'Phiêu Lưu Xứ Sở Quà, Rinh Về Niềm Vui',

            isFavorite: false,
            id_brand1: 1,
            id_brand2: 2,        
            photo: 'https://res.cloudinary.com/dyvmxcaxw/image/upload/v1725439296/360_F_505624884_d3W9poOAjT6X7w41gxdxLFtxKjJ1DrWk_zfod62.jpg',
            category: 'Cafe & Bánh',
            description: 'Shopee đã có mặt trên QuizUS! Có thực mới vực được đạo, nhanh tay nuốt trọn thử thách này thôi!',
        }, 
    ]

    let nhaHang = campaigns.filter(campaign => campaign.category === 'Nhà hàng');
    let cafeBanh = campaigns.filter(campaign => campaign.category === 'Cafe & Bánh');
    let muaSam = campaigns.filter(campaign => campaign.category === 'Mua sắm');
    let giaiTri = campaigns.filter(campaign => campaign.category === 'Giải trí');

    return (
        <View style={styles.background} >
            <Header />
            <View style={[styles.container, {marginTop: 20, marginBottom: 10}]}>
                <SearchBar editable={false} onPress={() => router.push('/(tabs)/search')} />
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
                focusedTab === 0 ? (
                    <>
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
                    </>
                ) : focusedTab === 1 ? (
                    <>
                        {nhaHang.length === 0 ? (
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <Image source={require('@/assets/images/empty-result.png')} style={{width: 250, height: 210}} />
                            </View>
                        ) : (
                            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingVertical: 12 }}>
                            {nhaHang.map((campaign, index) => (
                                <CampaignCard 
                                    campaign={campaign}
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
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <Image source={require('@/assets/images/empty-result.png')} style={{width: 250, height: 210}} />
                            </View>
                        ) : (
                            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingVertical: 12 }}>
                            {cafeBanh.map((campaign, index) => (
                                <CampaignCard 
                                    campaign={campaign}
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
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <Image source={require('@/assets/images/empty-result.png')} style={{width: 250, height: 210}} />
                            </View>
                        ) : (
                            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingVertical: 12 }}>
                            {muaSam.map((campaign, index) => (
                                <CampaignCard 
                                    campaign={campaign}
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
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <Image source={require('@/assets/images/empty-result.png')} style={{width: 250, height: 210}} />
                            </View>
                        ) : (
                            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingVertical: 12 }}>
                            {giaiTri.map((campaign, index) => (
                                <CampaignCard 
                                    campaign={campaign}
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
        fontWeight: '600',
    }
});