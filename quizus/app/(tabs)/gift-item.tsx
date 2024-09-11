import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Image, TouchableWithoutFeedback, View, ScrollView, Text, Platform, KeyboardAvoidingView, TouchableOpacity, Keyboard } from 'react-native';

import { Button } from '@/components/Button';
import { useFocusEffect, useRouter } from 'expo-router';
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

export default function GiftItem() {
    const router = useRouter();

    const [loading, setLoading] = useState(true)
    const [keyword, setKeyword] = useState('')
    const [selectedIndex, setSelectedIndex] = useState(-1)
    const [selectedQuantity, setSelectedQuantity] = useState(-1)
    const [playerItems, setPlayerItems] = useState<any>([])

    useFocusEffect(
        useCallback(() => {
            // This will run when the screen comes into focus (when you navigate back to it)
            // You can reset state here
            setLoading(true);
            setKeyword('');
            setSelectedIndex(-1);
            setSelectedQuantity(-1);
            setPlayerItems([]);
            retrieveData(); // Call function to fetch data again
        }, [])
    );

   const retrieveData = () => {
        retrieveFromSecureStore('id_player', (id_player: string) => {
            getPlayerItem(id_player).then((data: any) => {
                let player_items: any[] = []
                data.forEach((data: {
                    id_campaign: any; vouchers: { id_voucher: any; }; quantity_item1: any; quantity_item2: any; item1_photo: any; item2_photo: any; 
                }) => {

                    if (data.quantity_item1 > 0)
                        player_items.push({
                            id_campaign: data.id_campaign,
                            id_voucher: data.vouchers.id_voucher,
                            quantity_item1: data.quantity_item1,
                            item1_photo: data.item1_photo,
                            id_item: 1
                        })

                    if (data.quantity_item1 > 0)
                        player_items.push({
                            id_campaign: data.id_campaign,
                            id_voucher: data.vouchers.id_voucher,
                            quantity_item2: data.quantity_item2,
                            item2_photo: data.item2_photo,
                            id_item: 2
                        })
                
                })
                setPlayerItems([...player_items])
                setLoading(false)
            }).catch((error) => {
                console.error('Error fetching player score:', error);
                showToast('error', 'Lỗi hệ thống');
            });

            
        }).catch((error) => {
            console.error('Error retrieving id_player from SecureStore:', error);
            showToast('error', 'Không tìm thấy thông tin người chơi');
        });
    };
    
    const handleGift = () => {
        setLoading(true);

        if (selectedIndex == -1){
            showToast('warning', 'Chưa chọn vật phẩm');
            setLoading(false);
            return;
        }

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
                    id_campaign: playerItems[selectedIndex].id_campaign,
                    id_item: playerItems[selectedIndex].id_item,
                })

                sendItem(id_player, player.id_player, playerItems[selectedIndex].id_item, playerItems[selectedIndex].id_campaign)
                .then(() => {
                    setSelectedIndex(-1)
                    setSelectedQuantity(-1)
                    setKeyword('')
                    showToast('success', 'Tặng thành công');
                    router.replace('/items')
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
                        onPress={() => { router.replace('/items') }} 
                        suppressHighlighting={true} 
                    />
                </SafeAreaView>
                <Image source={require('@/assets/images/banner-reward.png')} style={styles.banner} />
                <View style={[styles.container, styles.titleContainer]}>
                    <Heading type="h4">Tặng bạn bè</Heading>
                </View>
                <View style={[styles.container, styles.background]}>
                    {
                        playerItems.length > 0 ? (
                            <>
                            <Label>Tặng cho</Label>
                            <Input type={"default"} placeholder={"Nhập số điện thoại, email"}
                                onChangeText={setKeyword}/>

                            <View style={{justifyContent: 'space-between', flexDirection:'row'}}>
                                <Label>Vật phẩm</Label>
                                {
                                    selectedQuantity != -1 && <Label>Số lượng: {selectedQuantity}</Label>
                                }
                            </View>
                            <ScrollView 
                                horizontal={true} 
                                showsHorizontalScrollIndicator={false} 
                                alwaysBounceHorizontal={false} bounces={false}
                                style={[styles.itemsScrollContainer]}>
                            <View style={[styles.itemsContainer]}>
                            {
                                playerItems.map((item: any, index: number) => 
                                {
                                    const photo = item.item1_photo != undefined ? item.item1_photo : item.item2_photo;
                                    const quantity = item.quantity_item1!= undefined? item.quantity_item1 : item.quantity_item2;
                                    return (
                                        <TouchableOpacity key={photo} style={selectedIndex == index ? styles.focusedItemImage : styles.notFocusedItemImage}
                                            onPress={() => {
                                                setSelectedIndex(index);
                                                setSelectedQuantity(quantity);
                                            }}>
                                            <Image
                                                key={photo}
                                                source={{ uri: photo}}
                                                style={[styles.itemImage]}
                                            />
                                        </TouchableOpacity>
                                    )
                                }

                            )
                        }
                            </View>
                            </ScrollView> 
                            {
                                loading ? <LoadingView/> :
                                <Button onPress={handleGift} style={styles.giftButton} text={'Tặng ngay'}></Button> 
                            }
                            </>
                        ) : (
                            <EmptyView texts={['Bạn chưa có mảnh ghép nào.','Chơi trò chơi để thu thập sự kiện ngay']}/>
                        )
                    }
                    
                </View>
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
        width: '100%',
        height: 140,
        position: 'relative',
        top: Platform.OS === 'android' ? 50 : 0,
        zIndex: -1,
    },
    backIcon: {
        position: 'relative',
        left: 20,
    },
    titleContainer: {
        marginVertical: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemsScrollContainer:{
        borderColor: Colors.light.subText,
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        width: '100%',
        maxHeight: 100,
        minHeight: 80,
    },
    itemsContainer: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
        gap: 10,
        width: '100%',
        flexWrap: 'wrap',
        // backgroundColor: 'green'
    },
    itemImage: {
        width: 70,
        height: 70,
        borderRadius: 8,
    },
    itemName: {
        fontSize: 16,
        color: Colors.light.mainText,
    },
    focusedItemImage:{
        width: 80,
        height: 80,
        backgroundColor: Colors.light.secondary,
        borderColor: Colors.light.primary,
        borderWidth: 1,
        flexDirection:'row',
        justifyContent: 'center',
        alignContent: 'center',
        paddingTop: 4,
        borderRadius: 8,
    },
    notFocusedItemImage:{
        width: 80,
        height: 80,
        borderColor: Colors.light.background,
        borderWidth: 1,
        flexDirection:'row',
        justifyContent: 'center',
        alignContent: 'center',
        paddingTop: 4,
        borderRadius: 8,
    },
    giftButton:{
        marginTop: 'auto'
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
});

