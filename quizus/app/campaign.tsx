import React from 'react';
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
import { Link, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { SubHeader } from '@/components/header/SubHeader';
import { Colors } from '@/constants/Colors';
import { Paragraph } from '@/components/text/Paragraph';
import { Heading } from '@/components/text/Heading';
import { Button } from '@/components/Button';
import { VoucherCard } from '@/components/card/VoucherCard';

export default function Campaign({
    logo='https://res.cloudinary.com/dyvmxcaxw/image/upload/v1723476217/Shopee_oc4lkd.png',
    name='Kho báu biển xanh, lướt sóng săn quà đỉnh',
    photo='https://res.cloudinary.com/dyvmxcaxw/image/upload/v1723489893/Shopee-game-la-gi_hvpkdi.jpg',
    start_date='2024-08-25T12:00:00Z',
    end_date='2024-09-25T12:00:00Z',
    description='Shopee đã có mặt trên QuizUS! Có thực mới vực được đạo, nhanh tay nuốt trọn thử thách này thôi!',
}) {

    const handleShare = async () => {
        try {
            const result = await Share.share({
                message: 'Shopee đã có mặt trên QuizUS! Có thực mới vực được đạo, nhanh tay nuốt trọn thử thách này thôi!',
                url: 'exp://192.168.1.6:8081',
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                    Alert.alert('Shared with activity type of result.activityType');
                } else {
                    // shared
                    Alert.alert('Shared');
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error: any) {
            Alert.alert(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <SubHeader/>
            <View style={styles.background}>
                <ScrollView showsVerticalScrollIndicator={false} bounces={true}>
                    <Image style={styles.banner} source={{uri: photo}} />
                            
                        <View style={styles.campaignHeaderContainer}>
                            <Image source={{uri: logo}} style={styles.brandLogo} />
                            <View style={{flex: 1, justifyContent: 'space-between'}}>
                                <View style={styles.campaignHeader_top}>
                                <View style={Date.now() < Date.parse(end_date) ? styles.timeContainer : [styles.timeContainer, styles.outDatedContainer]}>
                                    <MaterialCommunityIcons name={'clock-outline'} style={ Date.now() < Date.parse(end_date) ? styles.timeIcon : [styles.timeIcon, styles.outDated] }/>
                                    { Date.now() < Date.parse(end_date) ? 
                                        <Text style={styles.time}>{new Date(end_date).toLocaleDateString()}</Text> :
                                        <Text style={[styles.time, styles.outDated]}>Hết hạn</Text> 
                                    }
                                </View>
                                    <MaterialCommunityIcons name={'share-outline'} style={styles.shareIcon} onPress={handleShare} suppressHighlighting={true} />
                                </View>
                                <View style={styles.campaignHeader_bottom}>
                                    <Heading type='h5'>{name}</Heading>
                                </View>
                            </View>
                        </View>
                        <View style={styles.gameInfoContainer}>
                            <View style={styles.game__container}>
                                <Text style={styles.game_info_header}>Thưởng</Text>
                                <Text style={styles.game_info_container}>
                                    <Text style={styles.game_info_num}>400</Text>
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
                                {description}
                            </Paragraph>

                            <Heading type="h5" style={styles.heading}>Phần thưởng</Heading>
                            <Paragraph type='p2'>
                                <Text style={{fontSize: 18, fontWeight: '800'}}>+400</Text> xu thưởng <Image source={require('@/assets/images/coin.png')} style={{width: 16, height: 16}}/>
                            </Paragraph>
                            <Paragraph type='p2' style={{color: Colors.light.subText}}>Trả lời đúng 10/10 câu</Paragraph>

                        </View>
                        <VoucherCard style={{marginBottom: 100}}/>
                </ScrollView>
                <View style={styles.joinButtonContainer} >
                    <Button text='Chơi ngay' type='primary' style={styles.joinButton}/>
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
        height: 200,
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