import React from 'react';
import { StyleSheet, Keyboard, TouchableWithoutFeedback, View, ScrollView, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/Button';
import { useRouter } from 'expo-router';

export default function Profile() {
    const router = useRouter();
    return (
        <LinearGradient
            colors={['#FFFFFF', '#FFFFFF', '#FFD7D9']} // Gradient colors
            locations={[0, 0.49, 0.79]} // Start the gradient at 49% and end at 79%
            style={styles.background}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView>
                
                    <View style={styles.container}>
                        <Button text="Đăng xuất" type="primary" onPress={() => {router.replace("/login")}}></Button>
                    </View>

                </SafeAreaView>
            </TouchableWithoutFeedback>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    background: {
      flex: 1,
    },
    container: {
        paddingHorizontal: 20,
        flex: 1
    }
    
});