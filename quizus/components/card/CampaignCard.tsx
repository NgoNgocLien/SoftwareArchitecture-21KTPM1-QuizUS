import React, { useState } from 'react';
import { View, Text, Image, Modal, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';

import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';
import { showToast } from '@/components/ToastBar';
import { Heading } from '../text/Heading';
import { Paragraph } from '../text/Paragraph';
import { likeCampaign, unlikeCampaign } from '@/api/CampaignApi';
import config from '@/constants/config';

import dialogStyles from '@/components/modal/Dialog.styles';

export function CampaignCard({
    campaign,
    isFavorite,
    onFavoriteRemoved = () => {},
    ...rest
}:{
    campaign: any,
    isFavorite?: boolean,
    [key: string]: any,
    onFavoriteRemoved?: () => void
}) {

    const [modalVisible, setModalVisible] = useState(false);
    const [favorite, setFavorite] = useState(isFavorite);

    const handleFavorite = () => {
        if (favorite) {
            setModalVisible(true);
        } else {
            // TODO: Add to favorite
            config.retrieveFromSecureStore('id_player', (id: string) => {
                let id_player = id ? id : "";

                likeCampaign(id_player, campaign._id)
                .then((res) => {
                    // console.log('Campaign liked:', res); 
                    
                    showToast('success', 'Sự kiện đã được thêm vào Yêu thích');
                    setFavorite(true);
                })
                .catch((err) => {
                    console.log('Error:', err);
                    showToast('error', 'Lỗi hệ thống');
                });
            }).catch((err) => {
                console.log('Error:', err);
                showToast('error', 'Lỗi hệ thống');
            });
        }
    }

    const handleRemoveFavourite = () => {
        // call api to remove from favorite
        config.retrieveFromSecureStore('id_player', (id: string) => {
            let id_player = id ? id : "";

            unlikeCampaign(id_player, campaign._id)
            .then((res) => {
                // console.log('Campaign unliked:', res); 

                setFavorite(false);
                setModalVisible(!modalVisible);
                showToast('success', 'Sự kiện đã được xóa khỏi Yêu thích');
                if (onFavoriteRemoved) {
                    onFavoriteRemoved();
                }
            })
            .catch((err) => {
                console.log('Error:', err);

                setModalVisible(!modalVisible);
                showToast('error', 'Lỗi hệ thống');
            });
        }).catch((err) => {
            console.log('Error:', err);

            setModalVisible(!modalVisible);
            showToast('error', 'Lỗi hệ thống');
        });
    }

    const handleJoinCampaign = () => {
        router.push({
            pathname: '/campaign',
            params: { id_campaign: campaign._id }
        });


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
                    <Image source={{uri: campaign.brand.logo}} style={styles.brandLogo}/>
                </View>
                <View style={styles.detailContainer}>
                    <View style={styles.detail_top}>
                        <Text style={styles.brandName}>{campaign.brand.name}</Text>
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
                        <TouchableOpacity style={styles.joinButton} activeOpacity={0.6} onPress={() => router.push({
                            pathname: '/campaign',
                            params: { id_campaign: campaign._id, campaign: JSON.stringify(campaign) }
                        })}> 
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