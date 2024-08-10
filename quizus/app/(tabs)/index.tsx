import React from 'react';
import { StyleSheet, Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Header } from '@/components/Header';
import { Input } from '@/components/Input';

export default function HomePage() {
    return (
        <LinearGradient
            colors={['#FFFFFF', '#FFFFFF', '#FFD7D9']} // Gradient colors
            locations={[0, 0.49, 0.79]} // Start the gradient at 49% and end at 79%
            style={styles.background}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                    <Header />
                    <View style={styles.container}>
                        <Input placeholder="Search" />
                    </View>
                </View>
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
    },
});
  