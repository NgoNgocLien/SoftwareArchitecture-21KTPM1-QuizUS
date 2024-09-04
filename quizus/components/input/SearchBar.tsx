import React from 'react';
import { View, TextInput, StyleSheet, Pressable } from 'react-native';
import { Colors } from '@/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';

export function SearchBar({
    editable = true,
    ...rest
}) {
  return (
    <Pressable style={[styles.container, rest.styles]} >
        <TextInput style={styles.searchBar} placeholder="Tìm kiếm thương hiệu, sự kiện" editable={editable} onPress={rest.onPress} onEndEditing={rest.onEndEditing} />
        <FontAwesome name={'search'} style={styles.searchIcon} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
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

