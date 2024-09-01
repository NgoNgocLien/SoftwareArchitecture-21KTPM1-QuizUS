import React from 'react';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { 
    SafeAreaView, 
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
} from 'react-native';
import { Link, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { SubHeader } from '@/components/SubHeader';
import { Colors } from '@/constants/Colors';
import { Paragraph } from '@/components/text/Paragraph';
import { Heading } from '@/components/text/Heading';
import { Button } from '@/components/Button';

export default function Campaign() {
    return (
        <View style={styles.container}>
            <SubHeader/>
            <LinearGradient
                    colors={['#FFFFFF', '#FFFFFF', '#FFD7D9']} // Gradient colors
                    locations={[0, 0.49, 0.79]} // Start the gradient at 49% and end at 79%
                    style={styles.background}>
            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                <Image style={styles.banner} source={{uri: 'https://res.cloudinary.com/dyvmxcaxw/image/upload/v1723489893/Shopee-game-la-gi_hvpkdi.jpg'}} />
                
                        
                    <View style={styles.campaignHeaderContainer}>
                        <Image source={{uri: 'https://res.cloudinary.com/dyvmxcaxw/image/upload/v1723476217/Shopee_oc4lkd.png'}} style={styles.brandLogo} />
                        <View style={{flex: 1, justifyContent: 'space-between'}}>
                            <View style={styles.campaignHeader_top}>
                                <View style={styles.timeContainer}>
                                    <MaterialCommunityIcons name={'clock-outline'} style={styles.timeIcon}/>
                                    <Text style={styles.time}>01/02 - 29/03</Text>
                                </View>
                                <MaterialCommunityIcons name={'share-outline'} style={styles.shareIcon} />
                            </View>
                            <View style={styles.campaignHeader_bottom}>
                                <Heading type='h5'>Kho báu biển xanh, lướt sóng săn quà đỉnh</Heading>
                            </View>
                        </View>
                    </View>
                    <View style={styles.campaignInfoContainer}>
                        <View style={styles.info__container}>
                            <MaterialCommunityIcons name={'trophy-variant-outline'} style={styles.info__icon} />
                            <Text style={styles.info__text}>+150 Điểm</Text>
                        </View>
                        <View style={styles.seperator}></View>
                        <View style={styles.info__container}>
                            <MaterialCommunityIcons name={'comment-question-outline'} style={styles.info__icon} />
                            <Text style={styles.info__text}>10 Câu hỏi</Text>
                        </View>
                    </View>
                    <View style={styles.campaignDetailContainer}>
                        <View style={styles.heading__container}>
                            <MaterialCommunityIcons name={'information-outline'} style={styles.heading__icon} />
                            <Text style={styles.heading__text}>Giới thiệu</Text>
                        </View>
                        <Paragraph type='p2'>
                            Game mùa hè hot nhất 2024 đã đổ bộ trên Quiz Us. Hoá thân thành cao thủ lướt sóng, bạn sẽ bước vào hành trình chinh phục kho báu cảu biển xanh. Hàng loạt quà tặng hấp dẫn sẽ xuất hiện xuyên suốt các chặng hành trình. Đặc biệt, khi thu thập đủ 4 mảnh ghép, bạn có cơ hội đổi 1 voucher trị giá 100K từ Grab.
                        </Paragraph>

                        <View style={styles.heading__container}>
                            <MaterialCommunityIcons name={'gift-outline'} style={styles.heading__icon} />
                            <Text style={styles.heading__text}>Phần thưởng</Text>
                        </View>
                        <Paragraph type='p2'> 
                            Người chơi trả lời đúng các câu hỏi sẽ được nhận phần thưởng tương ứng:{'\n'}
                            <MaterialCommunityIcons name={'circle-small'} size={18} />Dưới 5 câu = +200 xu{'\n'}
                            <MaterialCommunityIcons name={'circle-small'} size={18} />Từ 6-10 câu = +400 xu & 1 mảnh ghép
                        </Paragraph>

                        <View style={styles.heading__container}>
                            {/* <MaterialCommunityIcons name={'swap-horizontal'} style={styles.heading__icon} /> */}
                            <FontAwesome name={'exchange'} style={styles.heading__icon} />
                            <Text style={styles.heading__text}>Quy đổi</Text>  
                        </View>
                        <Paragraph type='p2'>
                        Phần thưởng được dùng để đổi mã giảm giá hoặc voucher <Link href='/rewards' style={styles.link}>tại đây</Link>:{'\n'}
                            <MaterialCommunityIcons name={'circle-small'} size={18} />4 mảnh ghép = 1 voucher Grab{'\n'}
                            <MaterialCommunityIcons name={'circle-small'} size={18} />1000 xu = 1 voucher bất kỳ
                        </Paragraph>
                    </View>

                    
                
            </ScrollView>
            <View style={styles.joinButton} >
                <Button text='Chơi ngay' type='primary'/>
            </View>
            </LinearGradient>
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
    campaignInfoContainer: {
        paddingHorizontal: 20,
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
        backgroundColor: Colors.light.green_50
    },
    timeIcon: {
        color: Colors.light.green_100,
        fontSize: 16
    },
    time: {
        color: Colors.light.green_100,
        fontWeight: '500',
        fontSize: 14,
    },
    shareIcon: {
        fontSize: 24,
        color: Colors.light.gray,
    },

    campaignName: {
        fontSize: 18,
        fontWeight: '600',
    },

    info__container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    info__icon: {
        fontSize: 18,
        color: Colors.light.primary,
    },
    info__text: {
        color: Colors.light.mainText,
        fontWeight: '500',
        fontSize: 16,
    },

    seperator: {
        width: 1.5,
        height: 28,
        backgroundColor: Colors.light.primary,
    },

    heading__container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
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

    joinButton: {
        marginHorizontal: 20,
        marginBottom: 20,
    }
});