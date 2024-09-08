import { FontAwesome6 } from "@expo/vector-icons"
import { Alert, Keyboard, Modal, Share, TouchableWithoutFeedback, View } from "react-native"
import {Heading} from '@/components/text/Heading'
import {Paragraph} from '@/components/text/Paragraph'
import dialogStyles from "./Dialog.styles"
import { Button } from "@/components/Button"
import { Colors } from "@/constants/Colors"
import { Input } from '@/components/input/Input'
import { increasePlayerTurn, sendTurn } from '@/api/GameApi';
import config from "@/constants/config"
import { useState } from "react"
import { showToast } from "@/components/ToastBar";
import { getPlayerByKeyword } from "@/api/PlayerApi"
import { retrieveFromSecureStore } from "@/api/SecureStoreService"


export default function PLayerTurnModal({
    isModalVisible,
    setModalVisible,
    id_campaign,
    afterShare
}:{
    isModalVisible: boolean,
    setModalVisible: (value: boolean) => void,
    id_campaign: string,
    afterShare: any,
}) {
    const [loading, setLoading] = useState(false)
    const [keyword, setKeyword] = useState('')
    const [errMsg, setErrorMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const [showTurnRequest,  setShowTurnRequest] = useState(false)

    const handleShare = async () => {
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
                if (result.activityType) {
                    // On iOS: Shared with specific activity type (e.g., mail, social media)
                    increasePlayerTurn(config.ID_PLAYER, id_campaign)
                    .then(data => {
                        setModalVisible(false)
                        afterShare()
                    })
                } else {
                    // On Android: Shared, but no confirmation of activity type
                    increasePlayerTurn(config.ID_PLAYER, id_campaign)
                    .then(data => {
                        setModalVisible(false)
                        afterShare()
                    })
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error: any) {
            Alert.alert(error.message);
        }
    };

    const handleRequest = () =>{
        setLoading(true);
        
        if (keyword == ""){
            setErrorMsg('Chưa nhập thông tin')
            setLoading(false);
            return;
        }

        getPlayerByKeyword(keyword)
        .then(player => {
            console.log('player turn modal: ', player.id_player)

            retrieveFromSecureStore('id_player', (id_player: string) => {

                if (id_player == player.id_player){
                    setErrorMsg('Thông tin không hợp lệ')
                    setLoading(false);
                    return;
                }

                console.log('player turn modal: ',{
                    id_sender: id_player,
                    id_receiver: player.id_player,
                    id_campaign: id_campaign,
                })

                sendTurn(id_player, player.id_player, id_campaign)
                .then(() => {
                    setErrorMsg('')
                    setSuccessMsg('Xin lượt chơi thành công')
                    setTimeout(() => {
                        setModalVisible(false)
                    }, 2000);
                })

                setLoading(false);
            })
        })
        .catch(() => {
            setLoading(false);
            setErrorMsg('Không tìm thấy người dùng')
        })
    }

    const resetMsg = () =>{
        setErrorMsg('');
        setSuccessMsg('');
    }
    
    return (
        <Modal
        transparent={true} 
        animationType="fade" 
        visible={isModalVisible}
        onRequestClose={() => {setModalVisible(false);}}
        >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={dialogStyles.centeredView}>
            <View style={dialogStyles.modalView}>
                {
                    !showTurnRequest && 
                    <>
                    <View style={dialogStyles.topView}>
                        <Heading type={'h5'}>Thêm lượt chơi</Heading>
                        <FontAwesome6 name='xmark' style={{fontSize: 20, padding: 5, color: Colors.gray._600}} 
                            onPress={() => setModalVisible(false)} suppressHighlighting={true}/>
                    </View>
                    <Paragraph type={'p2'}>
                        Bạn đã hết lượt chơi. Chia sẻ sự kiện hoặc xin lượt chơi từ bạn bè để có thể tham gia sự kiện
                    </Paragraph>
                    <View style={dialogStyles.buttonView}>
                        <Button style={dialogStyles.button} text={'Xin lượt chơi'} type='tertiary'
                            onPress={() => {
                                setShowTurnRequest(true)
                            }}></Button>
                        <Button style={dialogStyles.button} text={'Chia sẻ sự kiện'} type='primary' 
                            onPress={() => {handleShare()}}></Button>

                    </View>
                    </>
                }
                {
                    showTurnRequest && 
                    <>
                    <View style={[dialogStyles.topView, {flexDirection: "column", gap: 10}]}>
                        <Heading type={'h5'}>Xin lượt chơi</Heading>
                        <Input type={"default"} placeholder={"Nhập số điện thoại, email, mã định danh"}
                                onChangeText={setKeyword} style={{marginBottom:0}}/>
                        {
                            errMsg && <Paragraph type={'p2'} color={Colors.feedback.error}>{errMsg}</Paragraph>
                        }
                        {
                            successMsg && <Paragraph type={'p2'} color={Colors.feedback.success}>{successMsg}</Paragraph>
                        }
                    </View>
                    <View style={[dialogStyles.buttonView, {minHeight: 60}]}>
                    {
                        !loading && <>
                         <Button style={dialogStyles.button} text={'Quay lại'} type='tertiary' 
                                onPress={() => {setShowTurnRequest(false); resetMsg()}}></Button>
                            <Button style={dialogStyles.button} text={'Gửi yêu cầu'} type='primary'
                                onPress={() => {handleRequest()}}></Button>
                        </>
                    }
                    </View>
                    </>
                }
                
            </View>
        </View>
        </TouchableWithoutFeedback>
    </Modal>
    )
}