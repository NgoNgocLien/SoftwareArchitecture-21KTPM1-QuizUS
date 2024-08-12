import React from 'react';
import { StyleSheet, Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Profile() {
    return (
        <LinearGradient
            colors={['#FFFFFF', '#FFFFFF', '#FFD7D9']} // Gradient colors
            locations={[0, 0.49, 0.79]} // Start the gradient at 49% and end at 79%
            style={styles.background}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView style={styles.container}>
                <View style={styles.ticket}>
                    <View
                        style={{
                            width: '40%',
                            height: '100%',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            alignItems: 'flex-end'
                        }}>
                        <View
                            style={{
                            backgroundColor: 'grey',
                            height: 5,
                            width: 5,
                            borderBottomLeftRadius: 5,
                            }}
                        />
                        <View
                            style={{
                            backgroundColor: 'grey',
                            height: 5,
                            width: 5,
                            borderTopLeftRadius: 10,
                            }}
                        />
                    </View>
                    <View
                        style={{
                            width: '60%',
                            height: '100%',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start'
                        }}>
                        <View
                            style={{
                            backgroundColor: 'grey',
                            height: 5,
                            width: 5,
                            borderBottomRightRadius: 10,
                            }}
                        />
                        <View
                            style={{
                            backgroundColor: 'grey',
                            height: 5,
                            width: 5,
                            borderTopRightRadius: 10,
                            }}
                        />
                    </View>
                    
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
    },
    ticket: {
        width: '100%',
        height: 200,
        backgroundColor: 'white',
        borderRadius: 20,
        flexDirection: 'row',

        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 }, // Adds shadow below the header
        shadowOpacity: 0.5,
        shadowRadius: 5.4,

        // Shadow for Android
        elevation: 5, // Elevation for the shadow effect

    },

    
});