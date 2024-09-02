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
import { LinearGradient } from 'expo-linear-gradient';

export default function Rewards() {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <LinearGradient
                colors={['#FFFFFF', '#FFFFFF', '#FFD7D9']} // Gradient colors
                locations={[0, 0.49, 0.79]} // Start the gradient at 49% and end at 79%
                style={styles.background}
            >
                <View>
                    <Header />          
                </View>
                <Button title="Show Toast" onPress={() => Toast.show(
                    <ToastBar type='info' message='Lorem ipsum dolor sit amet, consectetur adipiscing edit.'/>, ToastBarOptions
                )} />

            </LinearGradient>
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