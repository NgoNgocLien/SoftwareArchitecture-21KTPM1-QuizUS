import React from 'react';
import { 
    StyleSheet, 
    View, 
    Text,
    Button,
    SafeAreaView
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { getCampaignsInProgess } from '@/api/CampaignApi';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

export default function Rewards() {

    console.log(getCampaignsInProgess());

    return (
        <LinearGradient
            colors={['#FFFFFF', '#FFFFFF', '#FFD7D9']} // Gradient colors
            locations={[0, 0.49, 0.79]} // Start the gradient at 49% and end at 79%
            style={styles.background}
        >   

            <SafeAreaView style={styles.container}>
            <Button title="Get Campaign" onPress={() => {
                getCampaignsInProgess().then((res) => {
                    console.log(res);
                })}}
            />

            </SafeAreaView>
                
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    background: {
      flex: 1,
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },

});