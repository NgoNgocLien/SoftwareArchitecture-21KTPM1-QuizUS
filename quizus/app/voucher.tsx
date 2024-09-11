import { useEffect, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
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
    Clipboard,
    KeyboardAvoidingView,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { RootSiblingParent } from 'react-native-root-siblings';
import QRCode from 'react-native-qrcode-svg';

import { getCampaignsOfVoucher, getLikedCampaigns } from '@/api/CampaignApi';
import { getVoucherById, useVoucher, giftVoucher } from '@/api/VoucherApi';
import { getPlayerByKeyword } from '@/api/PlayerApi';
import { retrieveFromSecureStore } from '@/api/SecureStoreService';

import { showToast } from '@/components/ToastBar';
import { EmptyView } from '@/components/EmptyView';
import { LoadingView } from '@/components/LoadingView';
import { CampaignCard } from '@/components/card/CampaignCard';
import { Input } from '@/components/input/Input';
import { Label } from '@/components/text/Label';
import { SubHeader } from '@/components/header/SubHeader';
import { Colors } from '@/constants/Colors';
import { Paragraph } from '@/components/text/Paragraph';
import { Heading } from '@/components/text/Heading';
import { Button } from '@/components/Button';
import config from '@/constants/config';

export default function VoucherPage() {

    const params = useLocalSearchParams();
    const id_voucher = params.id_voucher as string;
    const mine = (params.mine as string) === 'true';

    const [is_used, setIsUsed] = useState<boolean>(false);
    const [id_playerVoucher, setIdPlayerVoucher] = useState<string>('');

    useEffect(() => {
        if (mine) {
            setIsUsed(params.is_used === 'true');
            setIdPlayerVoucher(params.id_playerVoucher as string);
        }
    }, [mine, params.is_used, params.id_playerVoucher]);

    const [loading, setLoading] = useState<boolean>(true);
    const [voucher, setVoucher] = useState<any|null>(null);
    const [campaigns, setCampaigns] = useState<any[]>([]);

    // Fetch campaign info
    useEffect(() => {
        if (id_voucher){
            getVoucherById(id_voucher).then(result => {
                setVoucher(result);

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
                message: `Tham gia ngay sự kiện ${ voucher ? "của " + voucher.brand.name : "" } tại QuizUS, nhận ngay voucher ưu đãi hấp dẫn!`,
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
                    // On iOS: Shared with activity type
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

    const handleUseVoucher = () => {
        try {
            useVoucher(id_playerVoucher)
            .then(data => {
                showToast('success', 'Sử dụng voucher thành công');
                setIsUsed(true);
            })
            .catch((error) => {
                console.error('Error using voucher:', error);
                showToast('error', 'Lỗi hệ thống');
            });
        } catch (error) {
            console.error(error);
            showToast('error', 'Lỗi hệ thống');
        }
    };

    const [keyword, setKeyword] = useState('');
    const handleGift = () => {
        console.log("keyword: ", keyword);
        getPlayerByKeyword(keyword)
        .then(player => {
            // console.log('gift-voucher: ', player.id_player)

            retrieveFromSecureStore('id_player', (id_player: string) => {

                if (id_player == player.id_player){
                    showToast('warning', 'Không thể tự tặng chính mình');
                    setLoading(false);
                    return;
                }

                console.log('gift-voucher: ',{
                    id_playervoucher: id_playerVoucher,
                    id_receiver: player.id_player,
                })

                giftVoucher(id_playerVoucher, player.id_player)              
                showToast('success','Tặng voucher thành công')
                setIsUsed(true);
                router.replace({
                    pathname: '/my-vouchers'
                })
            })
        })
        .catch(() => {
            showToast('error', 'Không tìm thấy người dùng');
        })
    }

    return (
        <RootSiblingParent>
        <View style={styles.container}>
            <SubHeader/>
            <View style={styles.background}>

                {loading ? <LoadingView /> : voucher === null  ? <EmptyView /> :
                (
                <>
                <KeyboardAvoidingView behavior='position' >
                <ScrollView showsVerticalScrollIndicator={false} bounces={true} >
                    <Image style={styles.banner} source={{uri: voucher.photo}} />
                            
                    <View style={styles.campaignHeaderContainer}>
                        <Image source={{uri: voucher.brand.logo}} style={styles.brandLogo} />
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
                            <Heading type="h5" style={[styles.heading, {marginHorizontal: 20}]}>Mã giảm giá</Heading>

                            <TouchableOpacity style={[styles.codeContainer]} activeOpacity={0.6} 
                                onPress={() => {
                                    Clipboard.setString(voucher.code); 
                                    Alert.alert('Đã sao chép');
                                }}>
                                <Paragraph type={'p2'}>{voucher.code}</Paragraph>
                                <MaterialCommunityIcons name={'content-copy'} size={18} color={Colors.light.subText} suppressHighlighting={true}/>
                            </TouchableOpacity>

                            <Heading type="h5" style={[styles.heading, {marginHorizontal: 20}]}>QR mã giảm giá</Heading>
                            <View style={styles.qrContainer}>
                                <QRCode value={`${config.QR_SCANNER}/66da72bca72515620596efca`} size={300} backgroundColor='white'/>
                            </View>

                            <Heading type="h5" style={[styles.heading, {marginHorizontal: 20}]}>Tặng mã giảm giá</Heading>
                            <View style={[styles.giftContainer, { marginHorizontal: 20 }]}>
                                <Input type={"default"} placeholder={"Nhập số điện thoại / email người nhận"}
                                    onChangeText={text => setKeyword(text)} value={keyword} style={{width: 'auto', flexGrow: 1}}/>
                                {
                                    is_used && Date.now() < Date.parse(voucher.expired_date) ?
                                    <Button text={'Tặng'} type='disabled' style={{width: 'auto', padding: 10 }} disabled={true}/> : 
                                    <Button onPress={handleGift} text={'Tặng'} style={{width: 'auto', padding: 10 }} />
                                }
                                
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
                </KeyboardAvoidingView>

                { mine && 
                <View style={styles.exchangeButtonContainer} >
                    { is_used ? 
                        <Button text='Đã sử dụng' type='disabled' style={styles.exchangeButton} disabled={true}/> :
                    Date.now() > Date.parse(voucher.expired_date) ?
                        <Button text='Hết hạn' type='disabled' style={styles.exchangeButton} disabled={true}/> :

                        <Button text='Dùng ngay' type='primary' style={styles.exchangeButton} onPress={() => {handleUseVoucher()}}/> 
                    }
                </View> 
                }
                </> 
                )}
            </View>
        </View>
        </RootSiblingParent>
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
    
    giftContainer: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1,
        columnGap: 10,
    },
});