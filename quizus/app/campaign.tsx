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
    SafeAreaView,
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
import { getCampaignById } from '@/api/CampaignApi';
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

// Call API
const defaultPlayerInfo = {
    score: 100,
    quantity_item1: 0,
    quantity_item2: 0
}

export default function Campaign() {

    const params = useLocalSearchParams();
    const id_campaign = params.id_campaign as string;

    const [loading, setLoading] = useState<boolean>(true);
    const [playerLoading, setPlayerLoading] = useState<boolean>(true);
    const [gameLoading, setGameLoading] = useState<boolean>(true);
    const [campaign, setCampaign] = useState<any|null>(null);
    const [type_game, setTypeGame] = useState<string|null>(null);
    const [voucher, setVoucher] = useState<Voucher|null>(null);

    // Fetch campaign info
    useEffect(() => {
        setLoading(true)
        if (id_campaign){
            getCampaignById(id_campaign).then(result => {
                setCampaign(result)

                if(result.id_quiz !== null && result.id_quiz !== undefined && result.id_quiz !== ''){
                    const newVoucher = VoucherFactory.createVoucher('coin', result.voucher);
                    setVoucher(newVoucher);
                    setTypeGame(config.QUIZ_GAME)
                } else {
                    const newVoucher = VoucherFactory.createVoucher('item', { ...result.voucher, item1_photo: result.item1_photo, item2_photo: result.item2_photo });
                    setVoucher(newVoucher);
                    setTypeGame(config.ITEM_GAME)
                }
                setLoading(false)
            }).catch(error => {
                console.error('Error fetching campaign info:', error);
                showToast('error', 'Lỗi hệ thống');
                setLoading(false)
            });
        } else {
            router.back();
            showToast('error', 'Lỗi hệ thống');
            setLoading(false)
        }
    }, [id_campaign])

    const [quizInfo, setQuizInfo] = useState<Quiz|null>(null);
    const [itemInfo, setItemInfo] = useState<Item|null>(null);
    
    useEffect(() => {
        setGameLoading(true)
        if (type_game ){                
            getGameInfo(id_campaign)
            .then(gameInfo => {
                if (type_game == config.QUIZ_GAME){
                    setQuizInfo(gameInfo.id_quiz)
                }
                else if (type_game == config.ITEM_GAME){
                    setItemInfo({
                        item1_photo: gameInfo.item1_photo,
                        item2_photo: gameInfo.item2_photo,
                    })
                }

                setGameLoading(false)
            })
            .catch(error => {
                console.error('Error fetching quiz info:', error);
                showToast('error', 'Lỗi hệ thống');
                setGameLoading(false)
            });   
        }
    }, [type_game])

    const [playerTurn, setPlayerTurn] = useState <number|null>(null);
    const [playerInfo, setPlayerInfo] = useState <PlayerInfo|undefined>(undefined);

    useEffect(() => {
        setPlayerLoading(true)
        if (id_campaign){
            retrieveFromSecureStore('id_player', (id_player: string) => {
                getPlayerTurn(id_player, id_campaign)
                .then(data => {
                    setPlayerTurn(data.player_turn)
                    setPlayerLoading(false)
                })
                .catch(error => {
                    console.error('Error fetching player turn:', error);
                    showToast('error', 'Lỗi hệ thống');
                    setPlayerLoading(false)
                });

                getPlayerItem(id_player).then((data) => {
                    const player_items = data.map((data: {
                        id_campaign: any; vouchers: { id_voucher: any; }; 
                        quantity_item1: any; quantity_item2: any; item1_photo: any; item2_photo: any; 
                    }) => {
                        return {
                            id_campaign: data.id_campaign,
                            id_voucher: data.vouchers.id_voucher,
                            quantity_item1: data.quantity_item1,
                            quantity_item2: data.quantity_item2,
                            item1_photo: data.item1_photo,
                            item2_photo: data.item2_photo,
                        }
                    })

                    getPlayerScore(id_player).then((data) => {
                        setPlayerInfo(new PlayerInfo({
                            player_score: data.score,
                            player_items: player_items,
                        }))

                        setPlayerLoading(false)
                    }).catch((error) => {
                        console.error('Error fetching player score:', error);
                        showToast('error', 'Lỗi hệ thống');

                        setPlayerLoading(false)
                    });

                }).catch((error) => {
                    console.error('Error fetching player score:', error);
                    showToast('error', 'Lỗi hệ thống');

                    setPlayerLoading(false);
                });
            }).catch((error) => {
                console.error('Error retrieving id_player from SecureStore:', error);
                showToast('error', 'Không tìm thấy thông tin người chơi');

                setPlayerLoading(false);
            });
        }
    },[id_campaign, playerTurn]);

    const [isModalVisible, setModalVisible] = useState(false);

    const handleShare = async () => {
        try {
            const result = await Share.share({
                message: 'Shopee đã có mặt trên QuizUS! Có thực mới vực được đạo, nhanh tay nuốt trọn thử thách này thôi!',
                url: 'https://expo.io',
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
                if (result.activityType ) {
                    showToast('success',"Chia sẻ thành công")
                    // console.log("aa")
                } else {
                    showToast('success',"Chia sẻ thành công")
                    // console.log("bb")
                }
            } else if (result.action === Share.dismissedAction) {
                showToast('warning',"Không chia sẻ")
                // console.log("cc")
            }
        } catch (error: any) {
            Alert.alert(error.message);
        }
    };
    
    return (
        <View style={styles.container}>
            <SubHeader/>
            <View style={styles.background}>

                {loading ? <LoadingView /> : campaign == null ? <EmptyView /> :
                (
                <>
                <ScrollView showsVerticalScrollIndicator={false} bounces={true}>
                    <Image style={styles.banner} source={{uri: campaign.photo}} />
                            
                        <View style={styles.campaignHeaderContainer}>
                            <Image source={{uri: campaign.brand.logo}} style={styles.brandLogo} />
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
                                    <MaterialCommunityIcons name={'share-outline'} style={styles.shareIcon} onPress={() => {handleShare()}} suppressHighlighting={true} />
                                </View>
                                <View style={styles.campaignHeader_bottom}>
                                    <Heading type='h5'>{campaign.name}</Heading>
                                </View>
                            </View>
                        </View>
                        <View style={styles.gameInfoContainer}>

                            <View style={styles.game__container}>
                                <Text style={styles.game_info_header}>Thưởng</Text>
                                <View style={styles.game_info_container}>
                                    {type_game === config.QUIZ_GAME ? (
                                        <>
                                            <Image source={require('@/assets/images/coin.png')} style={{width: 20, height: 20}}/>
                                            <Text style={styles.game_info_num}>{config.QUIZ_SCORE}</Text>
                                            <Text style={styles.game_info_text}>xu</Text>
                                        </>
                                    ) : (
                                        <>
                                            <Image source={require('@/assets/images/puzzle.png')} style={{width: 20, height: 20}}/>
                                            <Text style={styles.game_info_num}>2</Text>
                                            <Text style={styles.game_info_text}>mảnh</Text>
                                        </>
                                    )}
                                </View>
                            </View>

                            <View style={styles.vertical_seperator}></View>

                            <View style={styles.game__container}>
                                <Text style={styles.game_info_header}>Trò chơi</Text>
                                <Text style={styles.game_info_container}>
                                    <Text style={styles.game_info_num}>{type_game === config.QUIZ_GAME ? 'Trắc nghiệm' : 'Lắc vật phẩm'}</Text>
                                </Text>
                            </View>

                        </View>
                        <View style={styles.horizontal_seperator}></View>
                        <View style={[styles.campaignDetailContainer, {paddingBottom: 80}]}>
                            <Heading type="h5" style={[styles.heading, {marginHorizontal: 20}]}>Mô tả</Heading>
                            <Paragraph type='p2' style={{marginHorizontal: 20}}>
                                {campaign.description}
                            </Paragraph>

                            <Heading type="h5" style={[styles.heading, {marginHorizontal: 20}]}>Voucher có thể đổi</Heading>
                            {
                                playerLoading ? <LoadingView /> : (
                                    <VoucherCard 
                                        style={{marginBottom: 20}}
                                        voucher={type_game === config.QUIZ_GAME ? voucher as CoinVoucher : voucher as ItemVoucher}
                                        campaign={{brandName: campaign.brand.name, brandLogo: campaign.brand.logo, _id: id_campaign}}
                                        playerInfo={playerInfo}
                                    />
                                )
                            }
                        </View>
                </ScrollView>
                
                {
                    (playerLoading && gameLoading) ? null :
                    <View style={styles.joinButtonContainer} >
                        {
                            playerTurn 
                            ?   <Button text='Chơi ngay' type='primary' style={styles.joinButton} 
                                    onPress={() => {
                                        if (type_game == config.QUIZ_GAME){
                                            router.replace({
                                                pathname: `/quizgame/waiting`,
                                                params: {
                                                    quizInfo: JSON.stringify(quizInfo),
                                                    id_campaign: campaign._id
                                                }
                                            })
                                        } else if (type_game == config.ITEM_GAME){
                                            router.replace({
                                                pathname: `/itemgame/detail`,
                                                params: {
                                                    itemInfo: JSON.stringify(itemInfo),
                                                    id_campaign: campaign._id
                                                }
                                            })
                                        }
                                }}/> 
                            :   <Button text='Thêm lượt chơi' type='tertiary' style={styles.joinButton} 
                                    onPress={() => {setModalVisible(true);}}/> 
                        }
                        
                        <PLayerTurnModal 
                            isModalVisible={isModalVisible}
                            setModalVisible={setModalVisible}
                            id_campaign={campaign._id}
                            afterShare={() => {setPlayerTurn(1)}}
                            >
                        </PLayerTurnModal>
                    </View>
                }
                </>
                )}
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
        backgroundColor: Colors.gray._200,
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
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
    },

    game_info_num: {
        fontWeight: '500',
        fontSize: 16,
        color: Colors.light.mainText,
    },

    game_info_text: {
        fontWeight: '500',
        fontSize: 16,
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