import React from 'react';
import { StyleSheet, Keyboard, TouchableWithoutFeedback, View, ScrollView, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Profile() {
    return (
        <LinearGradient
            colors={['#FFFFFF', '#FFFFFF', '#FFD7D9']} // Gradient colors
            locations={[0, 0.49, 0.79]} // Start the gradient at 49% and end at 79%
            style={styles.background}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView horizontal={true} style={{backgroundColor: 'blue'}}>
                    <Text style={{fontSize: 50}}>Profile</Text>
                    <Text style={{fontSize: 50}}>Pro</Text>
                    <Text style={{fontSize: 50}}>Pro</Text>
                    <Text style={{fontSize: 50}}>Pro</Text>
                    <Text style={{fontSize: 50}}>Pro</Text>
                    <Text style={{fontSize: 50}}>Pro</Text>
                    <Text style={{fontSize: 50}}>Pro</Text>
                    <Text style={{fontSize: 50}}>Pro</Text>
                    <Text style={{fontSize: 50}}>Pro</Text>
                    <Text style={{fontSize: 50}}>Pro</Text>
                    <Text style={{fontSize: 50}}>Pro</Text>
                    <Text style={{fontSize: 50}}>Pro</Text>
                </ScrollView>
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