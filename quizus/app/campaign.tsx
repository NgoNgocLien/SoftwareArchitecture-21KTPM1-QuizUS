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

import dialogStyles from '@/components/modal/Dialog.styles'

import config from '@/constants/config';
import { getGameInfo, getPlayerTurn, increasePlayerTurn } from '@/api/GameApi';


export default function Campaign() {

    

    let campaigns = [
        {
            id: '64e9d9c8e8b4c21c4b2e9f5f',
            brandLogo: 'https://res.cloudinary.com/dyvmxcaxw/image/upload/v1725438734/image_40_pjzahq.png',
            brandName: 'GRAB',
            start_datetime: '2024-08-25T12:00:00Z',
            end_datetime: '2024-09-25T12:00:00Z',
            name: 'Cuộc Đua Săn Quà, Trúng Lớn Mỗi Ngày',
            
            isFavorite: false,
            id_brand1: 1,
            id_brand2: 2,        
            photo: 'https://res.cloudinary.com/dyvmxcaxw/image/upload/v1725439296/360_F_505624884_d3W9poOAjT6X7w41gxdxLFtxKjJ1DrWk_zfod62.jpg',
            category: 'Mua sắm',
            description: 'Grab đã có mặt trên QuizUS! Có thực mới vực được đạo, nhanh tay nuốt trọn thử thách này thôi!',
        },
        {
            id: '64e9d9c8e8b4c21c4b2e9f60',
            brandLogo: 'https://res.cloudinary.com/dyvmxcaxw/image/upload/v1723476217/Shopee_oc4lkd.png',
            brandName: 'SHOPEE',
            start_datetime: '2024-08-25T12:00:00Z',
            end_datetime: '2024-09-25T12:00:00Z',
            name: 'Săn Kho Báu Mỗi Ngày, Trúng Voucher Đỉnh Cao',
            
            isFavorite: false,
            id_brand1: 1,
            id_brand2: 2,        
            photo: 'https://res.cloudinary.com/dyvmxcaxw/image/upload/v1725439296/360_F_505624884_d3W9poOAjT6X7w41gxdxLFtxKjJ1DrWk_zfod62.jpg',
            category: 'Mua sắm',
            description: 'Shopee đã có mặt trên QuizUS! Có thực mới vực được đạo, nhanh tay nuốt trọn thử thách này thôi!',
        },
        {
            id: 'a',
            brandLogo: 'https://res.cloudinary.com/dyvmxcaxw/image/upload/v1725438808/image_27_yhpkap.png',
            brandName: 'HIGHLANDS',
            start_datetime: '2024-08-25T12:00:00Z',
            end_datetime: '2024-09-25T12:00:00Z',
            name: 'Săn Kho Báu Mỗi Ngày, Trúng Voucher Đỉnh Cao',
            
            isFavorite: false,
            id_brand1: 1,
            id_brand2: 2,        
            photo: 'https://res.cloudinary.com/dyvmxcaxw/image/upload/v1725439296/360_F_505624884_d3W9poOAjT6X7w41gxdxLFtxKjJ1DrWk_zfod62.jpg',
            category: 'Cafe & Bánh',
            description: 'Highlands đã có mặt trên QuizUS! Có thực mới vực được đạo, nhanh tay nuốt trọn thử thách này thôi!',
        },
        {
            id: 'b',
            brandLogo: 'https://res.cloudinary.com/dyvmxcaxw/image/upload/v1725438808/image_29_daqusn.png',
            brandName: 'PIZZA HUT',
            start_datetime: '2024-08-25T12:00:00Z',
            end_datetime: '2024-10-23T12:00:00Z',
            name: 'Xoay Lắc Đèn Lồng, Mở Rương Quà Tặng',

            isFavorite: false,
            id_brand1: 1,
            id_brand2: 2,        
            photo: 'https://res.cloudinary.com/dyvmxcaxw/image/upload/v1725439296/360_F_505624884_d3W9poOAjT6X7w41gxdxLFtxKjJ1DrWk_zfod62.jpg',
            category: 'Nhà hàng',
            description: 'Pizza Hut đã có mặt trên QuizUS! Có thực mới vực được đạo, nhanh tay nuốt trọn thử thách này thôi!',
        },
        {
            id: 'c',
            brandLogo: 'https://res.cloudinary.com/dyvmxcaxw/image/upload/v1725438809/image_31_wzigpo.png',
            brandName: 'KICHI KICHI',
            start_datetime: '2024-07-31T12:00:00Z',
            end_datetime: '2024-09-25T12:00:00Z',
            name: 'Bão Quà Cuồng Nhiệt',

            isFavorite: false,
            id_brand1: 1,
            id_brand2: 2,        
            photo: 'https://res.cloudinary.com/dyvmxcaxw/image/upload/v1725439296/360_F_505624884_d3W9poOAjT6X7w41gxdxLFtxKjJ1DrWk_zfod62.jpg',
            category: 'Nhà hàng',
            description: 'Kichi Kichi đã có mặt trên QuizUS! Có thực mới vực được đạo, nhanh tay nuốt trọn thử thách này thôi!',
        }, 
        {
            id: 'd',
            brandLogo: 'https://res.cloudinary.com/dyvmxcaxw/image/upload/v1725438714/image_26_ohwusp.png',
            brandName: 'CGV',
            start_datetime: '2024-07-31T12:00:00Z',
            end_datetime: '2024-09-25T12:00:00Z',
            name: 'Lắc Tay Săn Kho Báu, Rinh Về Ngàn Quà Tặng',

            isFavorite: false,
            id_brand1: 1,
            id_brand2: 2,        
            photo: 'https://res.cloudinary.com/dyvmxcaxw/image/upload/v1725439296/360_F_505624884_d3W9poOAjT6X7w41gxdxLFtxKjJ1DrWk_zfod62.jpg',
            category: 'Giải trí',
            description: 'CGV đã có mặt trên QuizUS! Có thực mới vực được đạo, nhanh tay nuốt trọn thử thách này thôi!',
        }, 
        {
            id: 'e',
            brandLogo: 'https://res.cloudinary.com/dyvmxcaxw/image/upload/v1725438809/image_21_azo1ib.png',
            brandName: 'STARBUCKS',
            start_datetime: '2024-09-01T12:00:00Z',
            end_datetime: '2024-10-31T12:00:00Z',
            name: 'Phiêu Lưu Xứ Sở Quà, Rinh Về Niềm Vui',

            isFavorite: false,
            id_brand1: 1,
            id_brand2: 2,        
            photo: 'https://res.cloudinary.com/dyvmxcaxw/image/upload/v1725439296/360_F_505624884_d3W9poOAjT6X7w41gxdxLFtxKjJ1DrWk_zfod62.jpg',
            category: 'Cafe & Bánh',
            description: 'Starbucks đã có mặt trên QuizUS! Có thực mới vực được đạo, nhanh tay nuốt trọn thử thách này thôi!',
        }, 
    ]

    const params = useLocalSearchParams();
    const id_campaign = params.id_campaign as string

    const campaign: any = campaigns.find(campaign => campaign.id === id_campaign);
    const type_game = campaign.id_quiz != "" ? config.QUIZ_GAME : config.ITEM_GAME;

    const handleShare = async (addPlayerTurn: boolean) => {
        try {
            const result = await Share.share({
                message: 'Shopee đã có mặt trên QuizUS! Có thực mới vực được đạo, nhanh tay nuốt trọn thử thách này thôi!',
                url: 'exp://192.168.1.6:8081',
            },{
                excludedActivityTypes: [
                    'com.apple.UIKit.activity.PostToWeibo',
                    'com.apple.UIKit.activity.Print',
                    'com.apple.UIKit.activity.CopyToPasteboard',
                    'com.apple.UIKit.activity.AssignToContact',
                    'com.apple.UIKit.activity.SaveToCameraRoll',
                    'com.apple.UIKit.activity.AddToReadingList',
                    'com.apple.UIKit.activity.PostToFlickr',
                    'com.apple.UIKit.activity.PostToVimeo',
                    'com.apple.UIKit.activity.PostToTencentWeibo',
                    'com.apple.UIKit.activity.AirDrop',
                    'com.apple.UIKit.activity.OpenInIBooks',
                    'com.apple.UIKit.activity.MarkupAsPDF',
                    'com.apple.reminders.RemindersEditorExtension',
                    'com.apple.mobilenotes.SharingExtension',
                    'com.apple.mobileslideshow.StreamShareService',
                    'com.linkedin.LinkedIn.ShareExtension',
                    'pinterest.ShareExtension',
                    'com.google.GooglePlus.ShareExtension',
                    'com.tumblr.tumblr.Share-With-Tumblr',
                    'net.whatsapp.WhatsApp.ShareExtension'
                ],
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType && addPlayerTurn) {
                    // On iOS: Shared with specific activity type (e.g., mail, social media)
                    // increasePlayerTurn(config.ID_PLAYER, id_campaign)
                    // .then(data => {
                    //     setPlayerTurn(1)
                    // })
                } else {
                    // On Android: Shared, but no confirmation of activity type
                    if (addPlayerTurn){
                        // increasePlayerTurn(config.ID_PLAYER, id_campaign)
                        // .then(data => {
                        //     setPlayerTurn(1)
                        // })
                    }
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error: any) {
            Alert.alert(error.message);
        }
    };

    const [quizInfo, setQuizInfo] = useState<Quiz|null>(null);
    const [itemInfo, setItemInfo] = useState<Item|null>(null);
    useEffect(() => {
        if (id_campaign){
            getGameInfo(id_campaign)
            .then(gameInfo => {

                if (type_game === config.QUIZ_GAME)
                    setQuizInfo(gameInfo.id_quiz)
                else if (type_game === config.ITEM_GAME)
                    setItemInfo({
                        item1_photo: gameInfo.item1_photo,
                        item2_photo: gameInfo.item2_photo,
                    })
            })
            .catch(error => {
                console.error('Error fetching quiz info:', error);
            });   
      
        }
    }, [id_campaign])

    const [playerTurn, setPlayerTurn] = useState <number>(0);
    useEffect(() => {
        if (id_campaign){
            getPlayerTurn(config.ID_PLAYER, id_campaign)
            .then(data => {
                setPlayerTurn(data.player_turn)
            })
            .catch(error => {
                console.error('Error fetching quiz info:', error);
            });
        }
    },[id_campaign, playerTurn]);

    const [isModalVisible, setModalVisible] = useState(false);
    return (
        <View style={styles.container}>
            <SubHeader/>
            <View style={styles.background}>
                <ScrollView showsVerticalScrollIndicator={false} bounces={true}>
                    <Image style={styles.banner} source={{uri: campaign.photo}} />
                            
                        <View style={styles.campaignHeaderContainer}>
                            <Image source={{uri: campaign.brandLogo}} style={styles.brandLogo} />
                            <View style={{flex: 1, justifyContent: 'space-between'}}>
                                <View style={styles.campaignHeader_top}>
                                <View style={Date.now() < Date.parse(campaign.end_datetime) ? styles.timeContainer : [styles.timeContainer, styles.outDatedContainer]}>
                                    <MaterialCommunityIcons name={'clock-outline'} style={ Date.now() < Date.parse(campaign.end_datetime) ? styles.timeIcon : [styles.timeIcon, styles.outDated] }/>
                                    { 
                                        Date.now() < Date.parse(campaign.end_datetime) ? 
                                            <Text style={styles.time}>{new Date(campaign.end_datetime).toLocaleDateString()}</Text> :
                                            <Text style={[styles.time, styles.outDated]}>Hết hạn</Text> 
                                    }
                                </View>
                                    <MaterialCommunityIcons name={'share-outline'} style={styles.shareIcon} onPress={() => {handleShare(false)}} suppressHighlighting={true} />
                                </View>
                                <View style={styles.campaignHeader_bottom}>
                                    <Heading type='h5'>{campaign.name}</Heading>
                                </View>
                            </View>
                        </View>
                        <View style={styles.gameInfoContainer}>
                            <View style={styles.game__container}>
                                <Text style={styles.game_info_header}>Thưởng</Text>
                                <Text style={styles.game_info_container}>
                                    <Text style={styles.game_info_num}>{config.QUIZ_SCORE}</Text>
                                    <Text style={styles.game_info_text}> xu</Text>
                                </Text>
                            </View>
                            <View style={styles.vertical_seperator}></View>
                            <View style={styles.game__container}>
                                <Text style={styles.game_info_header}>Câu hỏi</Text>
                                <Text style={styles.game_info_container}>
                                    <Text style={styles.game_info_num}>10</Text>
                                    <Text style={styles.game_info_text}> câu hỏi</Text>
                                </Text>
                            </View>
                        </View>
                        <View style={styles.horizontal_seperator}></View>
                        <View style={styles.campaignDetailContainer}>
                            <Heading type="h5" style={styles.heading}>Giới thiệu</Heading>
                            <Paragraph type='p2'>
                                {campaign.description}
                            </Paragraph>

                            <Heading type="h5" style={styles.heading}>Phần thưởng</Heading>
                            <Paragraph type='p2'>
                                <Text style={{fontSize: 18, fontWeight: '800'}}>+{config.QUIZ_SCORE}</Text> xu thưởng <Image source={require('@/assets/images/coin.png')} style={{width: 16, height: 16}}/>
                            </Paragraph>
                            <Paragraph type='p2' style={{color: Colors.light.subText}}>Trả lời đúng 10/10 câu</Paragraph>

                        </View>
                        {/* <VoucherCard style={{marginBottom: 100}}/> */}
                </ScrollView>
                <View style={styles.joinButtonContainer} >
                    {
                        playerTurn 
                        ?   <Button text='Chơi ngay' type='primary' style={styles.joinButton} 
                                onPress={() => {
                                    if (type_game == config.QUIZ_GAME){
                                        router.replace({
                                            pathname: `/quizgame/detail`,
                                            params: {
                                                quizInfo: JSON.stringify(quizInfo),
                                                id_campaign: campaign.id
                                            }
                                        })
                                    } else if (type_game == config.ITEM_GAME){
                                        router.replace({
                                            pathname: `/itemgame/detail`,
                                            params: {
                                                itemInfo: JSON.stringify(itemInfo),
                                                id_campaign: campaign.id
                                            }
                                        })
                                    }
                            }}/> 
                        :   <Button text='Thêm lượt chơi' type='tertiary' style={styles.joinButton} 
                                onPress={() => {setModalVisible(true);}}/> 
                    }
                    
                    <Modal
                        transparent={true} 
                        animationType="fade" 
                        visible={isModalVisible}
                        onRequestClose={() => {setModalVisible(false);}}
                    >
                        <View style={dialogStyles.centeredView}>
                            <View style={dialogStyles.modalView}>
                                <View style={dialogStyles.topView}>
                                    <Heading type={'h5'}>Thêm lượt chơi</Heading>
                                    <FontAwesome6 name='xmark' style={{fontSize: 20, padding: 5, color: Colors.gray._600}} 
                                        onPress={() => setModalVisible(false)} suppressHighlighting={true}/>
                                </View>
                                <Paragraph type={'p2'}>
                                    Bạn đã hết lượt chơi. Chia sẻ sự kiện hoặc xin lượt chơi từ bạn bè để có thể tham gia sự kiện
                                </Paragraph>
                                <View style={dialogStyles.buttonView}>
                                    <Button style={dialogStyles.button} text={'Chia sẻ sự kiện'} type='primary' 
                                        onPress={() => {handleShare(true)}}></Button>
                                    <Button style={dialogStyles.button} text={'Xin lượt chơi'} type='tertiary'></Button>
                                </View>
                                
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
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
        height: 180,
    },
    campaignHeaderContainer: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        gap: 10,
    },
    gameInfoContainer: {
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    campaignDetailContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },

    brandLogo: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    campaignHeader_top: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    campaignHeader_bottom: {
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
        fontSize: 14,
    },
    outDatedContainer: {
        backgroundColor: Colors.gray._200,
    },
    outDated: {
        color: Colors.light.subText,
    },
    shareIcon: {
        fontSize: 24,
        color: Colors.gray._600,
    },

    campaignName: {
        fontSize: 18,
        fontWeight: '600',
    },

    game_info_header: {
        color: Colors.light.mainText,
        fontWeight: '600',
        fontSize: 10,
    },
    game__container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 2,
        paddingHorizontal: 20,
    },
    game_info_container: {
        color: Colors.light.mainText,
        fontWeight: '500',
        fontSize: 16,
    },

    game_info_num: {
    },

    game_info_text: {
        color: Colors.light.subText,
    },

    vertical_seperator: {
        width: 1.2,
        height: 40,
        backgroundColor: Colors.gray._500,
    },
    horizontal_seperator: {
        width: 'auto',
        height: 1.2,
        backgroundColor: Colors.gray._500,
        marginHorizontal: 20,
        marginTop: 10,
    },

    heading: {
        marginTop: 10,
        marginBottom: 5
    },
    heading__icon: {
        fontSize: 16,
        color: Colors.light.primary,
    },
    heading__text: {
        color: Colors.light.primary,
        fontWeight: '600',
        fontSize: 14,
        textTransform: 'uppercase',
    },

    link: {
        fontWeight: '500',
        textDecorationLine: 'underline',
    },

    joinButtonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: Colors.light.background,
    },
    joinButton: {
        marginBottom: Platform.OS === 'ios' ? 10 : 0,
    }
});