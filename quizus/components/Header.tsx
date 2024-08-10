import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "react-native-vector-icons/Icon";
import {Colors} from "@/constants/Colors";

export default function Header() {
    // state of notification bell
    const [noti, setNoti] = React.useState(false);

    return (
        <SafeAreaView style={styles.header}>
            <Image source={require('@/assets/images/logo-svg.png')} style={styles.logo} />
            <MaterialCommunityIcons name={noti ? "bell-ring" : "bell-outline"} size={26} color={noti ? Colors['light'].primary : Colors['light'].mainText} style={styles.notiIcon} onPress={() => setNoti(!noti)} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({  
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 100,
        backgroundColor: 'white',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: -10,

        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 }, // Adds shadow below the header
        shadowOpacity: 0.05,
        shadowRadius: 3.84,

        // Shadow for Android
        elevation: 5, // Elevation for the shadow effect
    },
    logo: {
        width: 80,
        height: 40,
    },
    notiIcon: {
        marginBottom: -20
    }
});