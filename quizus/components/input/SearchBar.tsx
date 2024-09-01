import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';

export function SearchBar({
    ...rest
}) {
  return (
    <View style={styles.container}>
        <TextInput style={styles.searchBar} placeholder="Tìm kiếm thương hiệu, sự kiện" {...rest} />
        <FontAwesome name={'search'} style={styles.searchIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        width: '100%',
    },
    
    searchBar: {
        height: 52,
        width: '100%',
        borderColor: Colors.gray._500,
        borderWidth: 1,
        borderRadius: 8,
        paddingRight: 12,
        paddingLeft: 40,
        backgroundColor: Colors.light.background,
    },

    searchIcon: {
        position: 'absolute',
        left: 12,
        fontSize: 24,
        color: Colors.gray._500,
    },
});

