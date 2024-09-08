import { useState } from "react";
import { useRouter } from 'expo-router';

import { Image, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";

export function Header() {
    // state of notification bell
    const router = useRouter();

    const [noti, setNoti] = useState(false);

    const handleBellPress = () => {
        setNoti(false);
        router.replace({
            pathname: '/noti',
        })
    }

    return (
        <SafeAreaView style={styles.header}>
            <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
            <MaterialCommunityIcons name={noti ? "bell-ring" : "bell-outline"} size={26} color={noti ? Colors['light'].primary : Colors['light'].mainText} style={styles.notiIcon} onPress={handleBellPress} suppressHighlighting={true}/>
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
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 5 }, // Adds shadow below the header
        shadowOpacity: 0.08,
        shadowRadius: 4,

        // Shadow for Android
        elevation: 7, // Elevation for the shadow effect
    },
    logo: {
        width: 80,
        height: 42,
    },
    notiIcon: {
        marginBottom: -20
    }
});