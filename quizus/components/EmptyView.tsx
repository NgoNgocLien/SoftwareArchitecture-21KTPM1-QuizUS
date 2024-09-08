import { Image, View } from 'react-native';
import { Paragraph } from './text/Paragraph';
import { Colors } from '@/constants/Colors';

export function EmptyView({texts}:{
    texts?: string[]
}) {
    return (
        <View style={{ flex: 1,justifyContent: 'center', alignItems: 'center'}}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('@/assets/images/empty-result.png')} style={{ width: 250, height: 210 }} />
            </View>
            <View style={{ width: '80%', marginTop: 20 }}>
                {
                    texts && texts.map(text => 
                        <Paragraph type={'p2'} style={{ textAlign: 'center'}} color={Colors.gray._500}>
                            {text}
                        </Paragraph>
                    )
                }
            </View>
        </View>
    );
}
