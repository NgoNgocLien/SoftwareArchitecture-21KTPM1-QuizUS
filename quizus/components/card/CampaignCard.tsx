import React, { useState } from 'react';
import { View, Text, Image, Modal, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import Toast from 'react-native-root-toast';

import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';
import { ToastBar, ToastBarOptions } from '@/components/ToastBar';
import { Heading } from '../text/Heading';
import { Paragraph } from '../text/Paragraph';

export function CampaignCard({
    campaign = {
        id: 1,
        brandLogo: 'https://res.cloudinary.com/dyvmxcaxw/image/upload/v1723476217/Shopee_oc4lkd.png',
        brandName: 'SHOPEE',
        start_datetime: '2024-08-25T12:00:00Z',
        end_datetime: '2024-09-25T12:00:00Z',
        name: 'Kho báu biển xanh - Lướt sóng săn quà đỉnh',
        
        isFavorite: false,
        id_brand1: 1,
        id_brand2: 2,
        photo: '',
    },
    ...rest
}) {
    const [modalVisible, setModalVisible] = useState(false);

    const [favorite, setFavorite] = React.useState(campaign.isFavorite);
    const handleFavorite = () => {
        if (favorite) {
            setModalVisible(true);
        } else {
            // TODO: Add to favorite
            Toast.show(<ToastBar type='success' message='Sự kiện đã được thêm vào Yêu thích'/>, ToastBarOptions)
            setFavorite(true);
        }
    }

    const handleRemoveFavourite = () => {
        setModalVisible(!modalVisible);
        setFavorite(false);
        Toast.show(<ToastBar type='success' message='Sự kiện đã được xóa khỏi Yêu thích'/>, ToastBarOptions)
    }

    // dd/MM
    let startDateFormatted = new Date(campaign.start_datetime).getDate().toLocaleString('vi-VN', {minimumIntegerDigits: 2}) + '/' + (new Date(campaign.start_datetime).getMonth() + 1).toLocaleString('vi-VN', {minimumIntegerDigits: 2});
    let endDateFormatted = new Date(campaign.end_datetime).getDate().toLocaleString('vi-VN', {minimumIntegerDigits: 2}) + '/' + (new Date(campaign.end_datetime).getMonth() + 1).toLocaleString('vi-VN', {minimumIntegerDigits: 2});

    return (
        <>
            <Modal animationType="fade" transparent={true} visible={modalVisible} >
                <View style={dialogStyles.centeredView}>
                    <View style={dialogStyles.modalView}>

                        <View style={dialogStyles.topView}>
                            <View style={dialogStyles.dangerIconContainer}>
                                <FontAwesome6 name='triangle-exclamation' style={dialogStyles.dangerIcon}/>
                            </View>
                            <FontAwesome6 name='xmark' style={{fontSize: 20, padding: 5, color: Colors.gray._600}} onPress={() => setModalVisible(!modalVisible)} suppressHighlighting={true}/>
                        </View>

                        <Heading type='h5'>Bỏ yêu thích</Heading>
                        <Paragraph type='p2' color={Colors.light.subText}>Bạn có chắc chắn muốn xoá sự kiện này khỏi danh sách yêu thích?</Paragraph>

                        <TouchableOpacity style={dialogStyles.confirmButton} activeOpacity={0.6} onPress={handleRemoveFavourite}>
                            <Text style={dialogStyles.confirmButtonText}>OK</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>

            <View style={[styles.campaignContainer, rest.style]}>
                <View style={styles.brandContainer}>
                    <Image source={{uri: campaign.brandLogo}} style={styles.brandLogo}/>
                </View>
                <View style={styles.detailContainer}>
                    <View style={styles.detail_top}>
                        <Text style={styles.brandName}>{campaign.brandName}</Text>
                        <View style={Date.now() < Date.parse(campaign.end_datetime) ? styles.timeContainer : [styles.timeContainer, styles.outDatedContainer]}>
                            <MaterialCommunityIcons name={'clock-outline'} style={ Date.now() < Date.parse(campaign.end_datetime) ? styles.timeIcon : [styles.timeIcon, styles.outDated] }/>
                            { Date.now() < Date.parse(campaign.end_datetime) ? 
                                // formatted as 'MM/DD'
                                <Text style={styles.time}>{startDateFormatted} - {endDateFormatted}</Text> :
                                <Text style={[styles.time, styles.outDated]}>Hết hạn</Text> 
                            }
                        </View>
                    </View>
                    <View style={styles.detail_middle}>
                        <Text style={styles.campaignName} numberOfLines={2}>{campaign.name}</Text>
                    </View>
                    <View style={styles.detail_bottom}>
                        <TouchableOpacity style={styles.joinButton} activeOpacity={0.6} onPress={() => router.push('/campaign')}>
                            <Text style={styles.joinButtonText}>Tham gia</Text>
                        </TouchableOpacity>
                        <MaterialCommunityIcons name={favorite ? 'heart' : 'heart-outline'} style={[styles.favoriteIcon, favorite ? {color: Colors.light.primary} : null]} onPress={handleFavorite} suppressHighlighting={true} />
                    </View>
                </View>
            </View>
        </>
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
        height: 48,
    },
    campaignName: {
        fontSize: 18,
        fontWeight: '500',
        overflow: 'hidden',
        // overflow as ... if the text is too long
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
        color: Colors.gray._500,
        fontSize: 28
    }
});

const dialogStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    modalView: {
        marginHorizontal: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    topView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    dangerIconContainer: {
        backgroundColor: Colors.brand._200,
        borderColor: Colors.brand._50,
        borderWidth: 6,
        borderRadius: 30,
        width: 50,
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dangerIcon: {
        color: Colors.light.primary,
        fontSize: 20,
    },
    confirmButton: {
        backgroundColor: Colors.light.primary,
        padding: 12,
        borderRadius: 10,
        marginTop: 20,
    },
    confirmButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
    },
});