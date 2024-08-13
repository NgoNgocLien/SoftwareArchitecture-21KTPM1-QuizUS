import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { 
    SafeAreaView, 
    View,
    Text,
    StyleSheet,
    Image,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Header } from '@/components/Header';
import { SubHeader } from '@/components/SubHeader';
import { Colors } from '@/constants/Colors';

export default function Campaign() {
    return (
        <View style={styles.container}>
            <SubHeader />
            <Image style={styles.banner} source={{uri: 'https://res.cloudinary.com/dyvmxcaxw/image/upload/v1723489893/Shopee-game-la-gi_hvpkdi.jpg'}} />
            <LinearGradient
                colors={['#FFFFFF', '#FFFFFF', '#FFD7D9']} // Gradient colors
                locations={[0, 0.49, 0.79]} // Start the gradient at 49% and end at 79%
                style={styles.background}>
                    
                <View style={styles.campaignHeaderContainer}>
                    <Image source={{uri: 'https://res.cloudinary.com/dyvmxcaxw/image/upload/v1723476217/Shopee_oc4lkd.png'}} style={styles.brandLogo} />
                    <View>
                        <View style={styles.campaignHeader_top}>
                            <View style={styles.timeContainer}>
                                <MaterialCommunityIcons name={'clock-outline'} style={styles.timeIcon}/>
                                <Text style={styles.time}>01/02 - 29/03</Text>
                            </View>
                            <MaterialCommunityIcons name={'share-outline'} style={styles.shareIcon} />
                        </View>
                        <View style={styles.campaignHeader_bottom}>
                            <Text style={styles.campaignName}>Kho báu biển xanh - Lướt sóng săn quà đỉnh</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.campaignInfoContainer}>

                </View>
                <View style={styles.campaignDetailContainer}>

                </View>
            </LinearGradient>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    background: {
        flex: 1,
    },
    banner: {
        width: '100%',
        height: 200,
    },
    campaignHeaderContainer: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },
    campaignInfoContainer: {
    },
    campaignDetailContainer: {
    },

    brandLogo: {
        width: 80,
        height: 80,
    },
    campaignHeader_top: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    campaignHeader_bottom: {
        paddingVertical: 10,
    },
    timeContainer: {
        padding: 4,
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 4, 
        borderRadius: 4, 
        backgroundColor: Colors.light.success_50
    },
    timeIcon: {
        color: Colors.light.success_100,
        fontSize: 16
    },
    time: {
        color: Colors.light.success_100,
        fontWeight: '500',
        fontSize: 14,
    },
    shareIcon: {
        fontSize: 24,
        color: Colors.light.gray,
    },

    campaignName: {
        fontSize: 18,
        fontWeight: '500',
    },
});