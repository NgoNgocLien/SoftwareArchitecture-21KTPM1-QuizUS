import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Image, TouchableWithoutFeedback, View, ScrollView, Text, Platform } from 'react-native';
import LottieView from "lottie-react-native";

import { Button } from '@/components/Button';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';

import {removeFromSecureStore} from '@/api/SecureStoreService'
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function GiftVoucher() {
    const router = useRouter();

    return (
        <View style={styles.background}>
            <Image source={require('@/assets/images/banner-reward.png')} style={styles.banner} />
            <SafeAreaView style={[styles.header]}>
                <MaterialCommunityIcons name={'arrow-left'} size={28} color={Colors['light'].mainText} onPress={() => router.replace('/(tabs)/rewards')} suppressHighlighting={true}/>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
      flex: 1,
    },
    container: {
        paddingHorizontal: 20,
        flex: 1
    },
    banner: {
        width: '100%',
        height: 140,
    },
    header: {
        position: 'absolute',
        top: Platform.OS === 'android' ? 50 : 0,
        left: 20,
        display: 'flex',
        flexDirection: 'row',
    },
    coinsContainer: {
        marginHorizontal: 20,
        padding: 20,
        marginTop: -48,
        marginBottom: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 3.8,
        elevation: 5,
    },
    
});

