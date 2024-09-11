import QRCode from 'react-native-qrcode-svg';
import {
    StyleSheet,
    View,
} from 'react-native';
 
export default function qr() {
    return (
        <View style={styles.container}>
            <QRCode value="facebook.com" size={300}/>
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },

});
 