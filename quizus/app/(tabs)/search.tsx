import React from 'react';
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import { router } from 'expo-router';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Colors } from '@/constants/Colors';
import { SearchBar } from '@/components/input/SearchBar';
import { Heading } from '@/components/text/Heading';
import { Paragraph } from '@/components/text/Paragraph';

export default function Search() {
    type RecentSearch = {key: string};

    const [recentSearches, setRecentSearches] = React.useState<RecentSearch[]>([]);

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

    return (
        <View style={styles.background} >
            <SafeAreaView >
                <View style={styles.searchHeader}>
                    <FontAwesome6 name={'chevron-left'} style={{fontSize: 20, color: Colors.gray._500, paddingRight: 8, paddingVertical: 12}} onPress={() => router.back()} suppressHighlighting={true}/>
                    <SearchBar styles={{ flex: 1 }} onEndEditing={(e: any) => handleAddRecentSearch(e.nativeEvent.text)} />
                    
                </View>
            </SafeAreaView>

            <ScrollView style={[styles.container]}>
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