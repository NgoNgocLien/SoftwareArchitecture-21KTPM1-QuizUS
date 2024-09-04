import React, { useState } from 'react';
import { View, Text, Image, Modal, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import Toast from 'react-native-root-toast';

import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';
import { ToastBar, ToastBarOptions } from '@/components/ToastBar';
import { Heading } from '../text/Heading';
import { Paragraph } from '../text/Paragraph';

export function McCard({
    question_text = 'https://res.cloudinary.com/dyvmxcaxw/image/upload/v1723476217/Shopee_oc4lkd.png',
}) {
   
    return (
        <>
            <View style={styles.videoContainer}>
                <Image
                    style={{width: '100%', height: '80%'}}
                    source={require('@/assets/images/MC.gif')}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    videoContainer: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        borderRadius: 5,
    }
});
