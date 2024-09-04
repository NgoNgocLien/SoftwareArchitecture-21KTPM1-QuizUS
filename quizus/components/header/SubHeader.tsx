import { StyleSheet, Platform } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";

export function SubHeader({
    ...rest
}) {
    return (
        <SafeAreaView style={[styles.header, rest.style]}>
            <MaterialCommunityIcons name={'arrow-left'} size={28} color={Colors['light'].mainText} onPress={() => router.dismiss()} suppressHighlighting={true}/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({  
    header: {
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingBottom: Platform.OS === 'ios' ? -20 : 10,
        paddingTop: Platform.OS === 'android' ? 10 : 0,
        
        // Shadow for iOS
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 5 }, // Adds shadow below the header
        shadowOpacity: 0.08,
        shadowRadius: 4,

        // Shadow for Android
        elevation: 5, // Elevation for the shadow effect
    },
});