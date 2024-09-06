import { Image, View } from 'react-native';

export function EmptyView() {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image source={require('@/assets/images/empty-result.png')} style={{width: 250, height: 210}} />
        </View>
    )
}