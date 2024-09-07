import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Keyboard, TouchableWithoutFeedback, View, ScrollView, Text } from 'react-native';

import { Button } from '@/components/Button';
import { Link, useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import config from '@/constants/config';

export default function Profile() {
    const router = useRouter();

    const handleLogout = () => {
        config.removeFromSecureStore("id_player");

        router.replace("/login")
    }
    return (
    <LinearGradient
    colors={[Colors.light.background, Colors.light.background, Colors.light.secondary]} // Gradient colors
        locations={[0, 0.49, 0.79]} // Start the gradient at 49% and end at 79%
        style={styles.background}
    >
    
        <SafeAreaView style={styles.container}>
            <Button text="Đăng xuất" type="primary" 
                onPress={() => {handleLogout()}}>
            </Button>
        </SafeAreaView>

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