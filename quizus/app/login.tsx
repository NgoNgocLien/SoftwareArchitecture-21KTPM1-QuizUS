import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Image, View, SafeAreaView, Keyboard, TouchableWithoutFeedback, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Heading } from '@/components/text/Heading';
import { Label } from '@/components/text/Label';
import { Paragraph } from '@/components/text/Paragraph';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import config from '@/constants/config.js';

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      if (!phoneNumber || !password){
        Alert.alert('Error', "Không để trống số điện thoại hoặc mật khẩu");
        return;
      }
      
      const response = await fetch(`${config.USER_BE}/api/player/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber,
          password,
        }),
      });

      if (response.ok) {
        router.replace('/(tabs)');
      } else {
        const result = await response.json();
        Alert.alert('Error', result.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Lỗi hệ thống');
    }
  };

  const handleForgetPwd = () =>{
    router.replace('/(tabs)');
  }
  
  return (
    <KeyboardAvoidingView
      style={styles.safeArea}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
    <LinearGradient
    colors={[Colors.light.background, Colors.light.background, Colors.light.secondary]} // Gradient colors
    locations={[0, 0.49, 0.79]} // Start the gradient at 49% and end at 79%
    style={styles.safeArea}
    > 
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Image
            style={styles.alignCenter}
            source={require('@/assets/images/logo.png')}
          />
          <Heading type="h1" style={[styles.alignCenter, styles.title]}>
            Đăng nhập
          </Heading>

          <Label>Số điện thoại</Label>
          <Input type="numeric" 
            onChangeText={setPhoneNumber}/>

          <Label>Mật khẩu</Label>
          <Input secureTextEntry={true}
            onChangeText={setPassword} />

          <TouchableOpacity onPress={handleForgetPwd}>
            <Paragraph type="p2" color={Colors.light.primary} style={styles.forgotPassword}>
              Quên mật khẩu?
            </Paragraph>
          </TouchableOpacity>

          <Button text="Tiếp tục" type="primary" onPress={handleLogin}/>

          <View style={styles.separatorContainer}>
            <View style={styles.separator} />
            <Paragraph type="p3" color={Colors.light.subText}>Hoặc</Paragraph>
            <View style={styles.separator} />
          </View>

          <Button text="Đăng nhập với Gmail" type="secondary" />

          <View style={styles.signupContainer}>
            <Paragraph type="p2">Chưa có tài khoản?</Paragraph>
            <TouchableOpacity onPress={() => {router.replace('/signup')}}>
              <Paragraph type="p2" color={Colors.light.primary}>
                Tạo tài khoản
              </Paragraph>
            </TouchableOpacity>
          </View>

        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
    </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  container: {
    flex: 1,
    padding: 20,
    height: '100%'
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
    backgroundColor: Colors.light.subText,
  },

  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    // marginTop: 'auto',
    position: 'relative',
    bottom: 0
  },
});
