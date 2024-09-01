import { useState } from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View, ScrollView,TextInput } from 'react-native';

import { Header } from '@/components/Header';
import { Colors } from '@/constants/Colors';
import { CampaignCard } from '@/components/card/CampaignCard';
import { SearchBar } from '@/components/input/SearchBar';
import { FontAwesome } from '@expo/vector-icons';

export default function HomePage() {

    const tabNames = [
        { index: 0, name: 'Tất cả' },
        { index: 1, name: 'Nhà hàng' },
        { index: 2, name: 'Cà phê & Bánh' },
        { index: 3, name: 'Mua sắm' },
        { index: 4, name: 'Giải trí' }
    ]

    const [focusedTab, setFocusedTab] = useState(0);

    const handleTabFocus = (index: number) => {
        setFocusedTab(index);
    }

    return (
        // <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
            <View style={styles.background} >
                <Header />
                <View style={[styles.container, {marginTop: 20, marginBottom: 10}]}>
                    <SearchBar />
                </View>

                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} alwaysBounceHorizontal={false} bounces={false} style={{ minHeight: 40, maxHeight: 40}}>
                    <View style={styles.emptyTab}></View>

                    {tabNames.map((tab, index) => (
                        <TouchableWithoutFeedback onPress={() => handleTabFocus(index)} key={tab.index}>
                            <View style={[styles.categoryTab, focusedTab === tab.index ? styles.focusedTab : null]}>
                                <Text style={[styles.categoryText, focusedTab === tab.index ? styles.focusedText : null]}>{tab.name}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    ))}

                    <View style={styles.emptyTab}></View>
                </ScrollView>
                
                <ScrollView showsVerticalScrollIndicator={false} style={{paddingVertical: 12}}>
                    <CampaignCard />
                    <CampaignCard />
                    <CampaignCard />
                    <CampaignCard />
                    <CampaignCard style={{marginBottom: 32}}/>
                    
                </ScrollView> 
            </View>
        // </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: Colors.light.background,
    },

    container: {
        paddingHorizontal: 20,
    },

    searchBar: {
        height: 52,
        width: '100%',
        borderColor: Colors.light.subText,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: Colors.light.background,
    },

    emptyTab: {
        width: 20,
        height: 40,
        borderBottomColor: Colors.gray._500,
        borderBottomWidth: 1,    
    },

    categoryTab: {
        width: 'auto',
        height: 40,
        paddingHorizontal: 10,
        justifyContent: 'center',
        borderBottomColor: Colors.gray._500,
        borderBottomWidth: 1,
    },

    categoryText: {
        color: Colors.light.subText,
        fontWeight: 'medium',
        fontSize: 16,
    },

    focusedTab: {
        borderBottomColor: Colors.light.primary,
        borderBottomWidth: 2,
    },

    focusedText: {
        color: Colors.light.primary,
        fontWeight: 500,
    }
});