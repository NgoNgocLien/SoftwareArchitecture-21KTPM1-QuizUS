import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { StyleSheet, Text, TouchableWithoutFeedback, View, ScrollView, Image } from 'react-native';

import { Header } from '@/components/header/Header';
import { Colors } from '@/constants/Colors';
import { CampaignCard } from '@/components/card/CampaignCard';
import { SearchBar } from '@/components/input/SearchBar';
import { getCampaignsInProgess, getLikedCampaigns } from '@/api/CampaignApi';
import { EmptyView } from '@/components/EmptyView';
import { LoadingView } from '@/components/LoadingView';
import config from '@/constants/config';

export default function HomePage() {

    const tabNames = [
        { index: 0, name: 'Tất cả' },
        { index: 1, name: 'Nhà hàng' },
        { index: 2, name: 'Cafe & Bánh' },
        { index: 3, name: 'Mua sắm' },
        { index: 4, name: 'Giải trí' }
    ]
    
    const [loading, setLoading] = useState(true);
    const [focusedTab, setFocusedTab] = useState(0);

    const [campaigns, setCampaigns] = useState<any[]>([]);
    const [cafeBanh, setCafeBanh] = useState<any[]>([]);
    const [muaSam, setMuaSam] = useState<any[]>([]);
    const [giaiTri, setGiaiTri] = useState<any[]>([]);
    const [nhaHang, setNhaHang] = useState<any[]>([]);

    const handleTabFocus = (index: number) => {
        setFocusedTab(index);
    }

    // should get brand name and logo in backend

    // for each campaign, get the brand name and logo
    useEffect(() => {

        getCampaignsInProgess().then((res) => {
            config.retrieveFromSecureStore('id_player', (id_player: string) => {

                getLikedCampaigns(id_player).then((likedCampaigns) => {
                    res.map((campaign: any) => {
                        campaign.isFavorite = likedCampaigns.some((likedCampaign: any) => likedCampaign.campaign_data._id === campaign._id);
                    });
                    setCampaigns(res);
                    setLoading(false);

                }).catch((err) => {
                    console.log(err);
                    setCampaigns(res);
                    setLoading(false);
                });
            }).catch((err) => {
                console.log(err);
                setCampaigns(res);
                setLoading(false);
            });
        }).catch((err) => {
            console.log(err);
            setLoading(false);  
        });
    }, []);

    useEffect(() => {
        setNhaHang(campaigns.filter((item: any) => item.brand.field === 'Nhà hàng'));
        setCafeBanh(campaigns.filter((item: any) => item.brand.field === 'Cafe & Bánh'));
        setMuaSam(campaigns.filter((item: any) => item.brand.field === 'Mua sắm'));
        setGiaiTri(campaigns.filter((item: any) => item.brand.field === 'Giải trí'));
    }, [campaigns]);

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
                focusedTab === 0 ? 
                loading ? <LoadingView /> : (
                    <>
                        {campaigns.length === 0 ? (
                            <EmptyView />
                        ) : (
                            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingVertical: 12 }}>
                            {campaigns.map((campaign, index) => (
                                <CampaignCard 
                                    campaign={campaign}
                                    isFavorite={true}
                                    key={index} 
                                    style={index === campaigns.length - 1 ? { marginBottom: 32 } : {}} 
                                />
                            ))}
                            </ScrollView> 
                        )}
                    </>
                ) : focusedTab === 1 ? 
                loading ? <LoadingView /> : (
                    <>
                        {nhaHang.length === 0 ? (
                            <EmptyView />
                        ) : (
                            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingVertical: 12 }}>
                            {nhaHang.map((campaign, index) => (
                                <CampaignCard 
                                    campaign={campaign}
                                    isFavorite={campaign.isFavorite}
                                    key={index} 
                                    style={index === nhaHang.length - 1 ? { marginBottom: 32 } : {}} 
                                />
                            ))}
                            </ScrollView> 
                        )}
                    </>
                ) : focusedTab === 2 ? 
                loading ? <LoadingView /> : (
                    <>
                        {cafeBanh.length === 0 ? (
                            <EmptyView />
                        ) : (
                            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingVertical: 12 }}>
                            {cafeBanh.map((campaign, index) => (
                                <CampaignCard 
                                    campaign={campaign}
                                    isFavorite={campaign.isFavorite}
                                    key={index} 
                                    style={index === cafeBanh.length - 1 ? { marginBottom: 32 } : {}} 
                                />
                            ))}
                            </ScrollView> 
                        )}
                    </>
                ) : focusedTab === 3 ? 
                loading ? <LoadingView /> : (
                    <>
                        {muaSam.length === 0 ? (
                            <EmptyView />
                        ) : (
                            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingVertical: 12 }}>
                            {muaSam.map((campaign, index) => (
                                <CampaignCard 
                                    campaign={campaign}
                                    isFavorite={campaign.isFavorite}
                                    key={index} 
                                    style={index === muaSam.length - 1 ? { marginBottom: 32 } : {}} 
                                />
                            ))}
                            </ScrollView> 
                        )}
                    </>
                ) : focusedTab === 4 ? 
                loading ? <LoadingView /> : (
                    <>
                        {giaiTri.length === 0 ? (
                            <EmptyView />
                        ) : (
                            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingVertical: 12 }}>
                            {giaiTri.map((campaign, index) => (
                                <CampaignCard 
                                    campaign={campaign}
                                    isFavorite={campaign.isFavorite}
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