import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, ScrollView, TouchableWithoutFeedback, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Header } from '@/components/header/Header';
import { Colors } from '@/constants/Colors';
import { CampaignCard } from '@/components/card/CampaignCard';
import { SearchBar } from '@/components/input/SearchBar';
import { Heading } from '@/components/text/Heading';
import MaskedView from '@react-native-masked-view/masked-view';

export default function Favorite() {
    return (
        <View style={styles.background} >
            <Header />
            <View style={[styles.container, styles.screenTitleContainer]}>
                <Heading type="h4">Yêu thích</Heading>
                <FontAwesome name={'search'} style={styles.searchIcon} />
            </View>
            <MaskedView maskElement={
                <LinearGradient 
                    // This worked for me, but it depends on your use-case
                    colors={["rgba(0,0,0,0)", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black", "black"]}
                    style={{ flex: 1 }}
                />
                } style={{flex: 1}}>
                    
                    <ScrollView showsVerticalScrollIndicator={false} style={{ paddingVertical: 12 }}>
                        <CampaignCard />
                        <CampaignCard />
                        <CampaignCard />
                        <CampaignCard />
                        <CampaignCard style={{ marginBottom: 32 }} />
                    </ScrollView> 
            </MaskedView>
        </View>
  );
};


const styles = StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: Colors.light.background,
    },

    container: {
        paddingHorizontal: 20,
    },

    screenTitleContainer: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    searchIcon: {
        fontSize: 24,
        color: Colors.gray._500,
    },
});