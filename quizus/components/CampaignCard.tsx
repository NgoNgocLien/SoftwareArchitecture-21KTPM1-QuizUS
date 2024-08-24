import React from 'react';
import { View, Text, Image, TouchableHighlight, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RootSiblingParent } from 'react-native-root-siblings';
import Toast from 'react-native-root-toast';

import { Colors } from '@/constants/Colors';
import { Paragraph } from './text/Paragraph';
import { router } from 'expo-router';
import { ToastBar, ToastBarOptions } from './ToastBar';

export function CampaignCard({
    brandLogo = 'https://res.cloudinary.com/dyvmxcaxw/image/upload/v1723476217/Shopee_oc4lkd.png',
    brandName = 'SHOPEE',
    time = '01/02 - 29/03',
    campaignName = 'Kho báu biển xanh - Lướt sóng săn quà đỉnh',
    isFavorite = false,
}) {

    const [favorite, setFavorite] = React.useState(isFavorite);

    const handleFavorite = () => {
        setFavorite(!favorite);
        Toast.show(<ToastBar type='success' message='Sự kiện đã được thêm vào Yêu thích'/>, ToastBarOptions)
    }

    return (
        <View style={styles.campaignContainer}>
            <View style={styles.brandContainer}>
                <Image source={{uri: brandLogo}} style={styles.brandLogo}/>
            </View>
            <View style={styles.detailContainer}>
                <View style={styles.detail_top}>
                    <Text style={styles.brandName}>{brandName}</Text>
                    <View style={styles.timeContainer}>
                        <MaterialCommunityIcons name={'clock-outline'} style={styles.timeIcon}/>
                        <Text style={styles.time}>{time}</Text>
                    </View>
                </View>
                <View style={styles.detail_middle}>
                    <Text style={styles.campaignName}>{campaignName}</Text>
                </View>
                <View style={styles.detail_bottom}>
                    <TouchableOpacity style={styles.joinButton} activeOpacity={0.6} onPress={() => router.push('/campaign')}>
                        <Text style={styles.joinButtonText}>Tham gia</Text>
                    </TouchableOpacity>
                    <MaterialCommunityIcons name={favorite ? 'heart' : 'heart-outline'} style={[styles.favoriteIcon, favorite ? {color: Colors.light.primary} : null]} onPress={handleFavorite} suppressHighlighting={true} />
                </View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    campaignContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        marginVertical: 8,
        marginHorizontal: 20,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 }, // Adds shadow below the header
        shadowOpacity: 0.2,
        shadowRadius: 3.8,
        elevation: 5,
    },

    brandContainer: {
        flex: 1, 
        borderStyle: 'dashed', 
        borderColor: Colors.light.gray,
        borderRightWidth: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    brandLogo: {
        width: 80,
        height: 80,
    },
    
    detailContainer: {
        flex: 2.5,
    },

    detail_top: {
        marginTop: 10,
        marginHorizontal: 15, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems:'center'
    },
    brandName: {
        color: Colors.light.subText,
        fontSize: 12,
    },
    timeContainer: {
        padding: 4,
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 4, 
        borderRadius: 4, 
        backgroundColor: Colors.light.green_50
    },
    timeIcon: {
        color: Colors.light.green_100,
        fontSize: 16
    },
    time: {
        color: Colors.light.green_100,
        fontWeight: '500',
        fontSize: 12,
    },

    detail_middle: {
        marginHorizontal: 15,
        marginVertical: 10,
    },
    campaignName: {
        fontSize: 18,
        fontWeight: '500',
    },

    detail_bottom: {
        marginHorizontal: 15,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        alignItems: 'center'
    },
    joinButton: {
        borderRadius: 6,
        paddingVertical: 8,
        justifyContent: 'center',
        flexGrow: 1,
        backgroundColor: Colors.light.secondary,
        color: Colors.light.mainText,
        textAlign: 'center',
    },
    joinButtonText: {
        color: Colors.light.primary,
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 16,
    },
    favoriteIcon: {
        color: Colors.light.gray,
        fontSize: 28
    }
});