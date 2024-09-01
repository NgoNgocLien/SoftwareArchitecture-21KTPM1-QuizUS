import React from 'react';
import { View, Text, Image, TouchableHighlight, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Toast from 'react-native-root-toast';

import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';
import { ToastBar, ToastBarOptions } from '@/components/ToastBar';

export function VoucherCard({
    brandLogo = 'https://res.cloudinary.com/dyvmxcaxw/image/upload/v1723476217/Shopee_oc4lkd.png',
    brandName = 'SHOPEE',
    startDate = '2024-08-25T12:00:00Z',
    endDate = '2024-09-25T12:00:00Z',
    voucherName = 'Ưu đãi 20% đặt đơn trên 200k Grab Food',
    ...rest
}) {

    return (
        <View style={[styles.voucherContainer, rest.style]}>
            <View style={styles.brandContainer}>
                <Image source={{uri: brandLogo}} style={styles.brandLogo}/>
            </View>
            <View style={styles.detailContainer}>
                <View style={styles.detail_top}>
                    <Text style={styles.brandName}>{brandName}</Text>
                    <View style={Date.now() < Date.parse(endDate) ? styles.timeContainer : [styles.timeContainer, styles.outDatedContainer]}>
                        <MaterialCommunityIcons name={'clock-outline'} style={ Date.now() < Date.parse(endDate) ? styles.timeIcon : [styles.timeIcon, styles.outDated] }/>
                        { Date.now() < Date.parse(endDate) ? 
                            <Text style={styles.time}>{new Date(startDate).getDate()}/{new Date(startDate).getMonth() + 1} - {new Date(endDate).getDate()}/{new Date(endDate).getMonth() + 1}</Text> :
                            <Text style={[styles.time, styles.outDated]}>Hết hạn</Text> 
                        }
                    </View>
                </View>
                <View style={styles.detail_middle}>
                    <Text style={styles.voucherName}>{voucherName}</Text>
                </View>
                
                <TouchableOpacity style={styles.viewButton} activeOpacity={0.6} onPress={() => router.push('/voucher')}>
                    <Text style={styles.viewButtonText}>Xem</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    voucherContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        marginVertical: 8,
        marginHorizontal: 20,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 3.8,
        elevation: 5,
    },

    brandContainer: {
        flex: 1, 
        borderStyle: 'dashed', 
        borderColor: Colors.gray._400,
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
        backgroundColor: Colors.green._50
    },
    timeIcon: {
        color: Colors.green._800,
        fontSize: 16
    },
    time: {
        color: Colors.green._800,
        fontWeight: '500',
        fontSize: 12,
    },

    outDatedContainer: {
        backgroundColor: Colors.gray._200,
    },

    outDated: {
        color: Colors.light.subText,
    },

    detail_middle: {
        marginHorizontal: 15,
        marginVertical: 10,
    },
    voucherName: {
        fontSize: 18,
        fontWeight: '500',
    },
    viewButton: {
        marginHorizontal: 15,
        marginBottom: 10,
        borderRadius: 6,
        paddingVertical: 8,
        justifyContent: 'center',
        flexGrow: 1,
        backgroundColor: Colors.light.secondary,
        color: Colors.light.mainText,
        textAlign: 'center',
    },
    viewButtonText: {
        color: Colors.light.primary,
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 16,
    }
});