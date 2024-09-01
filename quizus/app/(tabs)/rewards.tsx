import React from 'react';
import Toast from 'react-native-root-toast';
import { 
    StyleSheet, 
    View, 
    Keyboard, 
    TouchableWithoutFeedback, 
    Button
} from 'react-native';

import { Header } from '@/components/header/Header';
import { ToastBar, ToastBarOptions } from '@/components/ToastBar';

export default function Rewards() {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
                <Header />          
                <Button title="Show Toast" onPress={() => Toast.show(<ToastBar type='info' message='Lorem ipsum dolor sit amet, consectetur adipiscing edit.'/>, ToastBarOptions)} />
            </View>
        </TouchableWithoutFeedback>
        
    )
}

const styles = StyleSheet.create({
    background: {
      flex: 1,
    },
    container: {
        paddingHorizontal: 20,
    },

});