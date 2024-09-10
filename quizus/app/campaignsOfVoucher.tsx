import React, { useEffect, useState } from 'react';
import { FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import { 
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    Platform,
    Share,
    Alert,
    Modal,
} from 'react-native';
import { Link, router, useLocalSearchParams } from 'expo-router';

import { SubHeader } from '@/components/header/SubHeader';
import { Colors } from '@/constants/Colors';
import { Paragraph } from '@/components/text/Paragraph';
import { Heading } from '@/components/text/Heading';
import { Button } from '@/components/Button';
import { VoucherCard } from '@/components/card/VoucherCard';

import config from '@/constants/config';
import { getGameInfo, getPlayerTurn } from '@/api/GameApi';
import { getCampaignById, getCampaignsOfVoucher } from '@/api/CampaignApi';
import { showToast } from '@/components/ToastBar';
import { EmptyView } from '@/components/EmptyView';
import { LoadingView } from '@/components/LoadingView';
import { VoucherFactory } from '@/models/voucher/VoucherFactory';
import { Voucher } from '@/models/voucher/Voucher';
import { CoinVoucher } from '@/models/voucher/CoinVoucher';
import { ItemVoucher } from '@/models/voucher/ItemVoucher';
import PLayerTurnModal from '@/components/modal/PlayerTurnModal';
import { PlayerInfo } from '@/models/game/PlayerInfo';
import { retrieveFromSecureStore } from '@/api/SecureStoreService';
import { getPlayerItem, getPlayerScore } from '@/api/PlayerApi';
import { getVoucherById } from '@/api/VoucherApi';
import { getLikedCampaigns } from '@/api/CampaignApi';
import { CampaignCard } from '@/components/card/CampaignCard';

// Call API
const defaultPlayerInfo = {
    score: 100,
    quantity_item1: 0,
    quantity_item2: 0
}

export default function CampaignsOfVoucher() {

    const params = useLocalSearchParams();
    const campaigns = JSON.parse(params.campaigns as string);
    
    return (
        <View style={styles.background}>
            <SubHeader/>
                    
            {campaigns.length === 0 ? (
                <EmptyView />
            ) : (
                <ScrollView showsVerticalScrollIndicator={false} style={{ paddingVertical: 12 }}>
                    {campaigns.map((campaign: any, index: number) => (
                        <CampaignCard 
                            campaign={campaign}
                            isFavorite={campaign.isFavorite}
                            key={index} 
                            style={index === campaigns.length - 1 ? { marginBottom: 32 } : {}} 
                        />
                    ))}
                </ScrollView> 
            )}
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
    },
    background: {
        flex: 1,
        backgroundColor: '#fff',
    },
});