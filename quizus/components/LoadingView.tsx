import { ActivityIndicator, View } from 'react-native';
import { Colors } from '@/constants/Colors';

export function LoadingView() {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
            <ActivityIndicator size="large" color={Colors.light.primary} />
        </View>
    )
}

