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
    TouchableOpacity,
    Modal,
    Clipboard,
} from 'react-native';
import { Link, router, useLocalSearchParams } from 'expo-router';
import QRCode from 'react-native-qrcode-svg';

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

export default function VoucherPage() {

    const params = useLocalSearchParams();
    const id_voucher = params.id_voucher as string;

    const mine = (params.mine as string) === 'true';

    let is_used = false;
    if (mine) {
        is_used = (params.is_used === 'true');
    }

    const [loading, setLoading] = useState<boolean>(true);
    // const [type_game, setTypeGame] = useState<string|null>(null);
    const [voucher, setVoucher] = useState<any|null>(null);
    const [brand, setBrand] = useState<Brand | null>(null);
    const [campaigns, setCampaigns] = useState<any[]>([]);

    // Fetch campaign info
    useEffect(() => {
        if (id_voucher){
            getVoucherById(id_voucher).then(result => {
                setVoucher(result);
                setBrand(result.brand);

                if (!mine) {
                    getCampaignsOfVoucher(id_voucher).then(res => {
                        retrieveFromSecureStore('id_player', (id_player: string) => {
                            getLikedCampaigns(id_player).then((likedCampaigns) => {
                                res.map((campaign: any) => {
                                    campaign.isFavorite = likedCampaigns.some((likedCampaign: any) => likedCampaign.campaign_data._id === campaign._id);
                                });
                                setCampaigns(res);
                                setLoading(false);
            
                            }).catch((err) => {
                                setCampaigns(res);
                                setLoading(false);

                                console.log(err);
                                showToast('error', 'Lỗi hệ thống');
                            });
                        }).catch((err) => {                        
                            setCampaigns(res);
                            setLoading(false);

                            console.log(err);
                            showToast('error', 'Không tìm thấy thông tin người dùng');
                        });

                    }).catch(error => {
                        console.error('Error fetching campaign info:', error);
                        setLoading(false)
                    });
                } else {
                    setLoading(false);
                }
            
            }).catch(error => {
                console.error('Error fetching player score:', error.message);
                showToast('error', 'Lỗi hệ thống');
            });
        } else {
            router.back();
            showToast('error', 'Lỗi hệ thống');
        }
    }, [id_voucher]);

    const handleShare = async () => {
        try {
            const result = await Share.share({
                message: `${ brand ? brand.name : "Chúng tôi"} đã có mặt trên QuizUS! Có thực mới vực được đạo, nhanh tay nuốt trọn thử thách này thôi!`,
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
                    // On iOS: Shared with specific activity type (e.g., mail, social media)
                    // increasePlayerTurn(config.ID_PLAYER, id_campaign)
                    // .then(data => {
                    //     setPlayerTurn(1)
                    // })
                } else {
                    // On Android: Shared, but no confirmation of activity type
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error: any) {
            Alert.alert(error.message);
        }
    };

    const [playerInfo, setPlayerInfo] = useState <PlayerInfo | null>(null);

    if (!mine) {
        useEffect(() => {
            if (id_voucher){
                retrieveFromSecureStore('id_player', (id_player: string) => {

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
                        }).catch((error) => {
                            console.error('Error fetching player score:', error);
                            showToast('error', 'Lỗi hệ thống');
                        });

                    }).catch((error) => {
                        console.error('Error fetching player score:', error);
                        showToast('error', 'Lỗi hệ thống');
                    });

                    
                }).catch((error) => {
                    console.error('Error retrieving id_player from SecureStore:', error);
                    showToast('error', 'Không tìm thấy thông tin người chơi');
                });
            }
        },[id_voucher]);
    }

    const [isModalVisible, setModalVisible] = useState(false);
    
    return (
        <View style={styles.container}>
            <SubHeader/>
            <View style={styles.background}>

                {loading ? <LoadingView /> : voucher === null  ? <EmptyView /> :
                (
                <>
                <ScrollView showsVerticalScrollIndicator={false} bounces={true} >
                    <Image style={styles.banner} source={{uri: voucher.photo}} />
                            
                    <View style={styles.campaignHeaderContainer}>
                        <Image source={{uri: brand!.logo}} style={styles.brandLogo} />
                        <View style={{flex: 1, justifyContent: 'space-between'}}>
                            <View style={styles.campaignHeader_top}>
                            <View style={Date.now() < Date.parse(voucher.expired_date) ? styles.timeContainer : [styles.timeContainer, styles.outDatedContainer]}>
                                <MaterialCommunityIcons name={'clock-outline'} style={ Date.now() < Date.parse(voucher.expired_date) ? styles.timeIcon : [styles.timeIcon, styles.outDated] }/>
                                { 
                                    Date.now() < Date.parse(voucher.expired_date) ? 
                                        <Text style={styles.time}>{new Date(voucher.expired_date).getDate().toLocaleString('vi-VN', {minimumIntegerDigits: 2}) + '/' + (new Date(voucher.expired_date).getMonth() + 1).toLocaleString('vi-VN', {minimumIntegerDigits: 2}) + '/' + (new Date(voucher.expired_date).getFullYear())}</Text> :
                                        <Text style={[styles.time, styles.outDated]}>Hết hạn</Text> 
                                }
                            </View>
                                <MaterialCommunityIcons name={'share-outline'} style={styles.shareIcon} onPress={() => {handleShare()}} suppressHighlighting={true} />
                            </View>
                            <View style={styles.campaignHeader_bottom}>
                                <Heading type='h5'>{voucher.name}</Heading>
                            </View>
                        </View>
                    </View>

                    {
                        mine &&
                        <>
                            <Heading type="h5" style={[styles.heading, {marginHorizontal: 20}]}>Mã thanh toán</Heading>

                            <TouchableOpacity style={[styles.codeContainer]} activeOpacity={0.6} 
                                onPress={() => {
                                    Clipboard.setString(voucher.code); 
                                    Alert.alert('Đã sao chép');
                                }}>
                                <Paragraph type={'p2'}>{voucher.code}</Paragraph>
                                <MaterialCommunityIcons name={'content-copy'} size={18} color={Colors.light.subText} suppressHighlighting={true}/>
                            </TouchableOpacity>

                            <Heading type="h5" style={[styles.heading, {marginHorizontal: 20}]}>QR thanh toán</Heading>
                            <View style={styles.qrContainer}>
                                <QRCode value="facebook.com" size={300} backgroundColor='white'/>
                            </View>
                        </>
                    }
                        
                    <Heading type="h5" style={[styles.heading, {marginHorizontal: 20}]}>Điều khoản áp dụng</Heading>
                    <Paragraph type='p2' style={[{marginHorizontal: 20}, mine ? {paddingBottom: 100} : {}]}>
                        {voucher.description}
                    </Paragraph>

                    { 
                        !mine && (
                        <>
                            <View style={[styles.titleContainer, {marginHorizontal: 20}]}>
                                <Heading type="h5">Sự kiện đổi voucher</Heading>
                                <Heading type="h6" color={Colors.light.primary} onPress={() =>{
                                    router.push({
                                        pathname: '/campaignsOfVoucher',
                                        params: { campaigns: JSON.stringify(campaigns) }
                                    })
                                }} suppressHighlighting={true}>Xem tất cả</Heading>
                            </View>
                        
                            {campaigns.length === 0 ? (
                                <EmptyView />
                            ) : (
                                <CampaignCard 
                                    campaign={campaigns[0]}
                                    isFavorite={campaigns[0].isFavorite}
                                    style={{ marginBottom: 32, marginVertical: 20 }} 
                                />
                            )}
                        </> )
                    }
                        
                </ScrollView>

                { mine && 
                <View style={styles.exchangeButtonContainer} >
                    { is_used ? 
                        <Button text='Đã sử dụng' type='disabled' style={styles.exchangeButton} disabled={true}/> :
                        <Button text='Dùng ngay' type='primary' style={styles.exchangeButton} onPress={() => {}}/> 
                    }
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
        flex: 1,
        paddingTop: 10,
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

    exchangeButtonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: Colors.light.background,
    },
    exchangeButton: {
        marginBottom: Platform.OS === 'ios' ? 10 : 0,
    },

    titleContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },

    
    codeContainer: {
        marginHorizontal: 15,
        marginBottom: 10,
        borderRadius: 6,
        paddingVertical: 8,
        paddingHorizontal: 12,
        flexGrow: 1,
        backgroundColor: Colors.gray._200,
        color: Colors.light.mainText,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    codeText: {
        color: Colors.feedback.warning,
        fontWeight: '600',
        fontSize: 16,
    },

    qrContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        marginBottom: 10,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 8,
        borderWidth: 4,
        borderColor: Colors.gray._200,
    },
});