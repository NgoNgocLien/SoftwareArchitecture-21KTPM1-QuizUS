import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Image, View, SafeAreaView, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Heading } from '@/components/text/Heading';
import { Label } from '@/components/text/Label';
import { Paragraph } from '@/components/text/Paragraph';
import { useRouter } from 'expo-router';

export default function Signup() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      // if (!phoneNumber || !password){
      //   Alert.alert('Error', "Không để trống số điện thoại hoặc mật khẩu");
      //   return;
      // }
      
      // Alert.alert('Success', phoneNumber + ' ' + password);
      // const response = await fetch('https://example.com/api/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     phoneNumber,
      //     password,
      //   }),
      // });

      // const result = await response.json();

      // if (response.ok) {
        router.push('/home');
      // } else {

      //   Alert.alert('Error', 'Số điện thoại hoặc mật khẩu sai');
      // }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Lỗi hệ thống');
    }
  };
  
  return (
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

          {/* <TouchableOpacity> */}
            <Paragraph type="p2" color="#FF5252" style={styles.forgotPassword}>
              Quên mật khẩu?
            </Paragraph>
          {/* </TouchableOpacity> */}

          <Button text="Tiếp tục" type="primary" onPress={handleLogin}/>

          <View style={styles.separatorContainer}>
            <View style={styles.separator} />
            <Paragraph type="p3" color="#ccc">Hoặc</Paragraph>
            <View style={styles.separator} />
          </View>

          <Button text="Đăng nhập với Gmail" type="secondary" />

          <View style={styles.signupContainer}>
            <Paragraph type="p2">Chưa có tài khoản?</Paragraph>
            <TouchableOpacity>
              <Paragraph type="p2" color="#FF5252">
                Tạo tài khoản
              </Paragraph>
            </TouchableOpacity>
          </View>

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
    padding: 20,
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
