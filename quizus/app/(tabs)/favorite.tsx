import { useState, useCallback, useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, ScrollView, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Header } from '@/components/header/Header';
import { Colors } from '@/constants/Colors';
import { CampaignCard } from '@/components/card/CampaignCard';
import { Heading } from '@/components/text/Heading';
import MaskedView from '@react-native-masked-view/masked-view';
import { getLikedCampaigns } from '@/api/CampaignApi';
import { retrieveFromSecureStore } from '@/api/SecureStoreService';
import { EmptyView } from '@/components/EmptyView';
import { LoadingView } from '@/components/LoadingView';
import { useFocusEffect } from 'expo-router';
import { showToast } from '@/components/ToastBar';
import eventEmitter from '@/models/notification/EventEmitter';

export default function Favorite() {
    const [campaigns, setCampaigns] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState(false);

    useEffect(() => {
    const handleNotification = (data: any) => {
      setNotification(true);
    };

    eventEmitter.on('notification', handleNotification);

    return () => {
      eventEmitter.remove('notification', handleNotification);
    };
    }, []);
    
    const fetchLikedCampaigns = useCallback(() => {
        setLoading(true);
        retrieveFromSecureStore('id_player', (id_player: string) => {
            getLikedCampaigns(id_player).then((likedCampaigns) => {
                if (likedCampaigns.length === 0) {
                    setLoading(false);
                    return;
                }
                setCampaigns(likedCampaigns.map((likedCampaign: any) => likedCampaign.campaign_data));
                setLoading(false);

            }).catch((err) => {
                console.log(err);
                setLoading(false);
                showToast('error', 'Lỗi hệ thống');
            });
        }).catch((err) => {
            console.log(err);
            setLoading(false);
            showToast('error', 'Không tìm thấy thông tin người dùng');
        });
    }, []);

    // Using useFocusEffect to handle data fetching when the screen is focused
    useFocusEffect(fetchLikedCampaigns);

    const handleFavoriteRemoved = () => {
        fetchLikedCampaigns();
    }

    return (
        <View style={styles.background} >
            <Header 
                notification={notification}
                setNotification={setNotification}/>
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
                {loading ? <LoadingView /> :
                campaigns.length === 0 ? <EmptyView /> : 
                (
                    <ScrollView showsVerticalScrollIndicator={false} style={{ paddingVertical: 12 }}>
                    {campaigns.map((campaign, index) => (
                        <CampaignCard 
                            campaign={campaign}
                            isFavorite={true}
                            key={index} 
                            style={index === campaigns.length - 1 ? { marginBottom: 32 } : {}} 
                            onFavoriteRemoved={handleFavoriteRemoved}
                        />
                    ))}
                    </ScrollView> 
                )}
            </MaskedView>
        </View>
    );
}

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
