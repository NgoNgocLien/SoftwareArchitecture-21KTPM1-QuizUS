import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Image, View, SafeAreaView, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Heading } from '@/components/text/Heading';
import { Label } from '@/components/text/Label';
import { Paragraph } from '@/components/text/Paragraph';
import { useNavigation, useRouter } from 'expo-router';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function Home() {
  const router = useRouter();

  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Image
            source={require('@/assets/images/logo.png')}
          />
          <FontAwesome5 name="bell" size={26} color="black" solid={false} />
        </View>
        <View style={styles.container}>
          
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },

  container: {
    flex: 1,
    paddingHorizontal: 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 70,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingHorizontal: 20,
    
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 }, // Adds shadow below the header
    shadowOpacity: 0.05,
    shadowRadius: 3.84,

    // Shadow for Android
    elevation: 5, // Elevation for the shadow effect
  },


  alignCenter: {
    alignSelf: 'center',
  },

  title: {
    marginTop: 40,
    marginBottom: 20,
  },

  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 30,
  },

  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 10,
  },

  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },

  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    gap: 3
  },
});
