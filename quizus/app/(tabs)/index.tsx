import React from 'react';
import { StyleSheet, Keyboard, Text, TouchableWithoutFeedback, View, ScrollView, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Header } from '@/components/Header';
import { Input } from '@/components/Input';
import { Colors } from '@/constants/Colors';

export default function HomePage() {

    const DATA = [
        {
          id: '1',
          title: 'First Item',
        },
        {
          id: '2',
          title: 'Second Item',
        },
        {
          id: '3',
          title: 'Third Item',
        },
        {   
            id: '4',
            title: 'Fourth Item',
        },
        {
            id: '5',
            title: 'Fifth Item',
        }
      ];



    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <LinearGradient
                colors={['#FFFFFF', '#FFFFFF', '#FFD7D9']} // Gradient colors
                locations={[0, 0.49, 0.79]} // Start the gradient at 49% and end at 79%
                style={styles.background}>
                <View>
                    <Header />
                    <View style={styles.paddingContainer}>
                        <Input placeholder="Tìm kiếm thương hiệu, sự kiện" />
                    </View> 
                    <ScrollView horizontal={true} style={styles.container}>
                        <View style={styles.categoryBar}>
                            <View style={styles.emptyCategoryTab}></View>
                            <FlatList
                                data={DATA}
                                renderItem={({item}) => <Item title={item.title} />}
                                keyExtractor={item => item.id}
                                horizontal={true}
                            />

                            <View style={styles.emptyCategoryTab}></View>
                        </View>
                    </ScrollView>
                </View>
            </LinearGradient>
        </TouchableWithoutFeedback>
    )
}

type ItemProps = {
    title: string;
}

const Item = ({title}: ItemProps) => (
    <View style={styles.categoryTab}>
        <Text>{title}</Text>
    </View>
  );

const styles = StyleSheet.create({
    background: {
      flex: 1,
    },

    paddingContainer: {
        paddingHorizontal: 20,
    },

    // full-width container
    container: {
        width: '100%',
    },

    // box border
    categoryBar: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },

    emptyCategoryTab: {
        width: 20,
        height: 40,
        borderBottomColor: Colors.light.subText,
        borderBottomWidth: 1,
    },

    categoryTab: {
        width: 'auto',
        height: 40,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: Colors.light.subText,
        borderBottomWidth: 1,
        color: Colors.light.subText,
    },

    focusedCategoryTab: {
        color: Colors.light.primary,
        borderBottomColor: Colors.light.primary,
        borderBottomWidth: 2,
    },
});
  