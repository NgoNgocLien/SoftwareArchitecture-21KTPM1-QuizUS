import React from 'react';
import { FontAwesome6 } from '@expo/vector-icons';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

import { Colors } from '@/constants/Colors';
import { SearchBar } from '@/components/input/SearchBar';
import { router } from 'expo-router';

export default function Search() {
    return (
        <View style={styles.container} >
            <SafeAreaView style={styles.searchHeader}>
                <FontAwesome6 name={'chevron-left'} style={{fontSize: 20, color: Colors.gray._500}} onPress={() => router.back()}/>
                <SearchBar />
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    searchHeader: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10,
    },

});