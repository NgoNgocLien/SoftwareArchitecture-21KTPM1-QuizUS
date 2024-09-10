import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Image, TouchableWithoutFeedback, View, Clipboard, Text, Platform, KeyboardAvoidingView, TouchableOpacity, Keyboard, Alert, ScrollView } from 'react-native';
// import Clipboard from '@react-native-clipboard/clipboard';

import { Button } from '@/components/Button';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';

import { retrieveFromSecureStore} from '@/api/SecureStoreService'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Heading } from '@/components/text/Heading';
import { Label } from '@/components/text/Label';
import { Input } from '@/components/input/Input';
import { getPlayerByKeyword, getPlayerItem, getPlayerScore } from '@/api/PlayerApi';
import { showToast } from '@/components/ToastBar';
import { PlayerInfo } from '@/models/game/PlayerInfo';
import { EmptyView } from '@/components/EmptyView';
import { LoadingView } from '@/components/LoadingView';
import { sendItem } from '@/api/GameApi';
import { Paragraph } from '@/components/text/Paragraph';

export default function GiftVoucher() {
    const router = useRouter();
    const params = useLocalSearchParams();
    
    const voucher = JSON.parse(params.voucher as string)
    const [iaUsed, setIsUsed] = useState(false);

    const [loading, setLoading] = useState(false)
    const [keyword, setKeyword] = useState('')


    useEffect(() => {
        retrieveFromSecureStore('id_player', (id_player: string) => {
                        
        }).catch((error) => {
            console.error('Error retrieving id_player from SecureStore:', error);
            showToast('error', 'Không tìm thấy thông tin người chơi');
        });
    },[]);
    
    const handleGift = () => {
        setLoading(true);


        getPlayerByKeyword(keyword)
        .then(player => {
            console.log('gift-item: ', player.id_player)

            retrieveFromSecureStore('id_player', (id_player: string) => {

                if (id_player == player.id_player){
                    showToast('warning', 'Không thể tự tặng chính mình');
                    setLoading(false);
                    return;
                }

                console.log('gift-item: ',{
                    id_sender: id_player,
                    id_receiver: player.id_player,
                })

            
                setLoading(false);
            })
        })
        .catch(() => {
            setLoading(false);
            showToast('error', 'Không tìm thấy người dùng');
        })
    }

    return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View style={styles.background}>
        <SafeAreaView style={styles.header}>
            <MaterialCommunityIcons 
                name={"arrow-left"} 
                size={28} 
                color={Colors.light.mainText} 
                style={styles.backIcon} 
                onPress={() => { router.replace('/my-vouchers') }} 
                suppressHighlighting={true} 
            />
        </SafeAreaView>
        <View style={[styles.container, styles.titleContainer]}>
            <Heading type="h4">Tặng mã giảm giá</Heading>
        </View>
            <View style={[styles.container]}>
                <Label>Tặng cho</Label>
                <Input type={"default"} placeholder={"Nhập số điện thoại, email"}
                    onChangeText={setKeyword}/>
                {
                    loading ? <LoadingView/> :
                    <Button onPress={handleGift} style={styles.giftButton} text={'Tặng ngay'}></Button> 
                }
            </View>
            <View style={[styles.container, styles.titleContainer]}>
                <Heading type="h4">Sử dụng mã giảm giá</Heading>
            </View>
            <Paragraph>Online</Paragraph>
            <TouchableOpacity style={[styles.codeButton, styles.container, {backgroundColor: Colors.gray._100}]} activeOpacity={0.6} 
                onPress={() => {
                    Clipboard.setString(voucher.code); 
                    Alert.alert('Đã sao chép', `Mã giảm giá ${voucher.code} vừa được sao chép`);
                }}>
                <Paragraph type={'p2'}>{voucher.code}</Paragraph>
                <MaterialCommunityIcons name={'content-copy'} size={18} color={Colors.light.subText} suppressHighlighting={true}/>
            </TouchableOpacity>
            <Image source={{uri: voucher.qr_code || 'https://res.cloudinary.com/dklt21uks/image/upload/v1725617785/quizus/w6z4afxecugisynvpiwy.png'}} style={styles.banner} />
            <Button text={'Đổi quà online'}></Button>
        </View>
    </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },

    container: {
        paddingHorizontal: 20,
    },

    header: {
        height: 100,
        backgroundColor: Colors.light.background,
        justifyContent: 'center',
        paddingBottom: -10,
    },
    banner: {
        width: 100,
        height: 100,
    },
    backIcon: {
        position: 'relative',
        left: 20,
    },
    titleContainer: {
        marginBottom: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    giftButton:{
        // marginBottom: 50
    },
    overlayContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        paddingHorizontal: 20,
        flex: 1,
        backgroundColor: Colors.gray._900,
        opacity: 0.5,
        zIndex: 100
      },
    codeButton: {
        marginHorizontal: 15,
        marginBottom: 10,
        borderRadius: 6,
        paddingVertical: 8,
        paddingHorizontal: 12,
        height: 50,
        backgroundColor: Colors.yellow,
        color: Colors.light.mainText,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

