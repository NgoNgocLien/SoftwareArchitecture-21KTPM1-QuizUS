import React, { useEffect, useState } from 'react';
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
} from 'react-native';
import { Link, router, useLocalSearchParams } from 'expo-router';

import { SubHeader } from '@/components/header/SubHeader';
import { Colors } from '@/constants/Colors';
import { Paragraph } from '@/components/text/Paragraph';
import { Heading } from '@/components/text/Heading';
import { Button } from '@/components/Button';
import { VoucherCard } from '@/components/card/VoucherCard';
import config from '@/constants/config';
import { getQuizInfo } from '@/api/QuizApi';
import { Voucher } from '@/models/voucher/Voucher';

export default function Campaign() {
    const params = useLocalSearchParams();
    const voucher = params.voucher;

    const [campaigns, setCampaigns] = useState<[] | null>(null);

    useEffect(() => {
        // call api get campaign by id_voucher

        // getCampaignsByVoucher(voucher.id_voucher)
        // .then(campaigns => {
        //     setCampaigns(campaigns)
        // })
        // .catch(error => {
        //     console.error('Error fetching quiz info:', error);
        // });
    }, [])

    return (
        <View style={styles.container}>
            <SubHeader/>
            <View style={styles.background}>
                <ScrollView showsVerticalScrollIndicator={false} bounces={true}>
                    <Image style={styles.banner} source={{uri: voucher.photo}} />
                            
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
                                    <MaterialCommunityIcons name={'share-outline'} style={styles.shareIcon} onPress={handleShare} suppressHighlighting={true} />
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
                        <VoucherCard style={{marginBottom: 100}}/>
                </ScrollView>
                <View style={styles.joinButtonContainer} >
                    <Button text='Chơi ngay' type='primary' style={styles.joinButton} 
                        onPress={() => {router.replace({
                            pathname: "/quiz/detail",
                            params: {
                                quizInfo: JSON.stringify(quizInfo),
                                id_campaign: campaign.id
                            }
                        })}}/>
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