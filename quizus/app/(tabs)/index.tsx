import { Link } from 'expo-router';
import { Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomePage() {
    return (
        <SafeAreaView>
            <Link href='/login'><Text>To Login</Text></Link>
        </SafeAreaView>
    )
}