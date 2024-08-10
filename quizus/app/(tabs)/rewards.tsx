import { Link } from 'expo-router';
import { Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Rewards() {
    return (
        <SafeAreaView>
            <Link href='/(tabs)'><Text>To Tabs</Text></Link>
        </SafeAreaView>
    )
}