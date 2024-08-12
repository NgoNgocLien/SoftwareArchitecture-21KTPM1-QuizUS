import { useState } from 'react';
import { StyleSheet, Keyboard, Text, TouchableWithoutFeedback, View, ScrollView,TextInput, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Header } from '@/components/Header';
import { Colors } from '@/constants/Colors';

export default function HomePage() {

    const tabNames = [
        { index: 0, name: 'Tất cả' },
        { index: 1, name: 'Nhà hàng' },
        { index: 2, name: 'Cà phê & Bánh' },
        { index: 3, name: 'Mỹ phẩm' },
        { index: 4, name: 'Thời trang' },
        { index: 5, name: 'Dịch vụ' }
    ]

    const [focusedTab, setFocusedTab] = useState(0);

    const handleTabFocus = (index: number) => {
        setFocusedTab(index);
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <LinearGradient
                colors={['#FFFFFF', '#FFFFFF', '#FFD7D9']} // Gradient colors
                locations={[0, 0.49, 0.79]} // Start the gradient at 49% and end at 79%
                style={styles.background}>
                <View>
                    <Header />
                    <View style={[styles.container, {marginTop: 20, marginBottom: 15}]}>
                        <TextInput style={styles.searchBar} placeholder="Tìm kiếm thương hiệu, sự kiện"/>    
                    </View>

                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} alwaysBounceHorizontal={false} bounces={false}>
                        <View style={styles.emptyTab}></View>

                        {tabNames.map((tab, index) => (
                            <Pressable onPress={() => handleTabFocus(index)}>
                                <View style={[styles.categoryTab, focusedTab === tab.index ? styles.focusedTab : null]}>
                                    <Text style={[styles.categoryText, focusedTab === tab.index ? styles.focusedText : null]}>{tab.name}</Text>
                                </View>
                            </Pressable>
                        ))}

                        <View style={styles.emptyTab}></View>
                    </ScrollView>
                </View>
            </LinearGradient>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    background: {
      flex: 1,
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
        borderBottomColor: Colors.light.subText,
        borderBottomWidth: 1,
    },

    categoryTab: {
        width: 'auto',
        height: 40,
        paddingHorizontal: 10,
        justifyContent: 'center',
        borderBottomColor: Colors.light.subText,
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

  