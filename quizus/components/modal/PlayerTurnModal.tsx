import { FontAwesome6 } from "@expo/vector-icons"
import { Alert, Modal, Share, View } from "react-native"
import {Heading} from '@/components/text/Heading'
import {Paragraph} from '@/components/text/Paragraph'
import dialogStyles from "./Dialog.styles"
import { Button } from "@/components/Button"
import { Colors } from "@/constants/Colors"

import { increasePlayerTurn } from '@/api/GameApi';
import config from "@/constants/config"

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
    
    return (
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
                        onPress={() => {handleShare()}}></Button>
                    <Button style={dialogStyles.button} text={'Xin lượt chơi'} type='tertiary'></Button>
                </View>
                
            </View>
        </View>
    </Modal>
    )
}