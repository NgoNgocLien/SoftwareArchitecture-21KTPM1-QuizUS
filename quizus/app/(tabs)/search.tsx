import React from 'react';
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import { router } from 'expo-router';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Image, ScrollView, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Colors } from '@/constants/Colors';
import { SearchBar } from '@/components/input/SearchBar';
import { Heading } from '@/components/text/Heading';
import { Paragraph } from '@/components/text/Paragraph';
import { CampaignCard } from '@/components/card/CampaignCard';

export default function Search() {
    type RecentSearch = {key: string};

    const [recentSearches, setRecentSearches] = React.useState<RecentSearch[]>([]);
    const [searchText, setSearchText] = React.useState<string>('');

    React.useEffect(() => {
        const loadRecentSearches = async () => {
            try {
                const searches = await AsyncStorage.getItem('CAMPAIGN_SEARCHES');
                if (searches !== null) {
                    setRecentSearches(JSON.parse(searches));
                }
            } catch (error) {
                console.log(error);
            }
        };
        loadRecentSearches();
    }, []);

    const handleAddRecentSearch = async (key: string) => {
        try {
            // limit recent searches to 5
            setSearchText(key);
            if (key === '') {
                return;
            }
            if (recentSearches.length >= 5) {
                recentSearches.pop();
            }
            let newRecentSearches = recentSearches.filter((search) => search.key !== key);
            newRecentSearches = [{key: key}, ...newRecentSearches];
            setRecentSearches([...newRecentSearches]);
            await AsyncStorage.setItem('CAMPAIGN_SEARCHES', JSON.stringify([...newRecentSearches]));
        } catch (error) {
            console.log(error);
        }
    };

    const handleRemoveRecentSearch = async (key: string) => {
        try {
            const newRecentSearches = recentSearches.filter((search) => search.key !== key);
            setRecentSearches(newRecentSearches);
            await AsyncStorage.setItem('CAMPAIGN_SEARCHES', JSON.stringify(newRecentSearches));
        } catch (error) {
            console.log(error);
        }
    };

    const campaignsFound = [
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
    ];

    return (
        <View style={styles.background} >
            <SafeAreaView >
                <View style={styles.searchHeader}>
                    <FontAwesome6 name={'chevron-left'} style={{fontSize: 20, color: Colors.gray._500, paddingRight: 8, paddingVertical: 12}} onPress={() => router.back()} suppressHighlighting={true}/>
                    <SearchBar styles={{ flex: 1 }} onSubmitEditing={(e: any) => handleAddRecentSearch(e.nativeEvent.text)} />
                </View>
            </SafeAreaView>

            {
                searchText !== '' ? 
                (
                    <>
                        {campaignsFound.length === 0 ? (
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <Image source={require('@/assets/images/empty-result.png')} style={{width: 250, height: 210}} />
                            </View>
                        ) : (
                            <ScrollView style={{flex: 1}}>
                                <View style={styles.container}>
                                    <Heading type="h5" style={styles.title}>Kết quả tìm kiếm</Heading>
                                </View>
                                {campaignsFound.map((campaign, index) => (
                                    <CampaignCard 
                                        campaign={campaign}
                                        key={index} 
                                        style={index === campaignsFound.length - 1 ? { marginBottom: 32 } : {}} 
                                    />
                                ))}
                            </ScrollView>
                        )}
                    </>
                ) : (
                    <ScrollView style={styles.container}>
                        {recentSearches.length > 0 &&
                            <Heading type="h5" style={styles.title}>Gần đây</Heading>
                        }
                        <FlatList
                            scrollEnabled={false}
                            data={recentSearches}
                            renderItem={({item}) => 
                                (
                                    <View style={styles.recentSearchesContainer}>
                                        <Paragraph type={"p2"}>{item.key}</Paragraph>
                                        <FontAwesome6 name={'xmark'} style={{fontSize: 16, color: Colors.gray._500, paddingLeft: 12, paddingVertical: 12}} onPress={() => handleRemoveRecentSearch(item.key)} suppressHighlighting={true}/>
                                    </View>
                                )
                            }
                        />

                        <Heading type="h5" style={styles.title}>Đề xuất</Heading>

                        <FlatList
                            scrollEnabled={false}
                            numColumns={4}
                            columnWrapperStyle={{justifyContent: 'space-between', marginBottom: 16}}
                            data={[
                                {key: 'https://res.cloudinary.com/dyvmxcaxw/image/upload/v1723476217/Shopee_oc4lkd.png'},
                                {key: 'https://res.cloudinary.com/dyvmxcaxw/image/upload/v1725438734/image_40_pjzahq.png'},
                                {key: 'https://res.cloudinary.com/dyvmxcaxw/image/upload/v1725438808/image_27_yhpkap.png'},
                                {key: 'https://res.cloudinary.com/dyvmxcaxw/image/upload/v1725438714/image_26_ohwusp.png'},
                                {key: 'https://res.cloudinary.com/dyvmxcaxw/image/upload/v1725438808/image_15_hokcvx.png'},
                                {key: 'https://res.cloudinary.com/dyvmxcaxw/image/upload/v1725438808/image_28_wk3gm5.png'},
                                {key: 'https://res.cloudinary.com/dyvmxcaxw/image/upload/v1725438808/image_29_daqusn.png'},
                                {key: 'https://res.cloudinary.com/dyvmxcaxw/image/upload/v1725438809/image_31_wzigpo.png'},
                                {key: 'https://res.cloudinary.com/dyvmxcaxw/image/upload/v1725438809/image_21_azo1ib.png'},
                            ]}
                            renderItem={({item}) => 
                                (
                                    <View style={styles.brandLogoContainer}>
                                        <Image source={{uri: item.key}} style={{width: '100%', height: '100%'}} />
                                    </View>
                                )
                            }
                        /> 
                    </ScrollView>
                )
            }   
        </View>
    )
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        paddingHorizontal: 20,
    },
    searchHeader: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    recentSearchesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        marginTop: 20,
        marginBottom: 10,
    },
    brandLogoContainer: {
        width: 75,
        height: 75,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.gray._200,
        alignItems: 'center',
        justifyContent: 'center',
    }

});