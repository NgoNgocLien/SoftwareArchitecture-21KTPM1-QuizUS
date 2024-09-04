import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Image, View, SafeAreaView, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import { Button } from '@/components/Button';
import { Input } from '@/components/input/Input';
import { Heading } from '@/components/text/Heading';
import { Label } from '@/components/text/Label';
import { Paragraph } from '@/components/text/Paragraph';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import config from '@/constants/config';

export default function Signup() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    try {

      if (!phoneNumber || !password || !confirmPassword){
        Alert.alert('Error', "Không để trống số điện thoại, mật khẩu, xác nhận mật khẩu");
        return;
      }

      if (password != confirmPassword){
        Alert.alert('Error', "Mật khẩu xác nhận phải trùng khớp với mật khẩu");
        return;
      }
    
      const response = await fetch(`${config.USER_BE}/api/player/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber
        }),
      });

      if (response.ok) {
        router.push({
          pathname: '/otp',
          params: { phoneNumber, password }, 
        });
      } else {
        const result = await response.json();
        Alert.alert('Error', result.message);
      } 

    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Lỗi từ frontend');
    }
  };
  
  return (
    <LinearGradient
    colors={[Colors.light.background, Colors.light.background, Colors.light.secondary]} // Gradient colors
    locations={[0, 0.49, 0.79]} // Start the gradient at 49% and end at 79%
    style={styles.safeArea}
    > 
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Image
            style={[styles.alignCenter, {width: 80, height: 42}]}
            source={require('@/assets/images/logo.png')}
          />
          <Heading type="h1" style={[styles.alignCenter, styles.title]}>
            Tạo tài khoản
          </Heading>

          <Label>Số điện thoại</Label>
          <Input type="numeric" 
            onChangeText={setPhoneNumber}/>

          <Label>Mật khẩu</Label>
          <Input secureTextEntry={true}
            onChangeText={setPassword} />

          <Label>Xác nhận mật khẩu</Label>
          <Input secureTextEntry={true}
            onChangeText={setConfirmPassword} />


          <Button text="Tiếp tục" type="primary" onPress={handleSignup} style={{marginTop: 10}}/>

          <View style={styles.separatorContainer}>
            <View style={styles.separator} />
            <Paragraph type="p3" color={Colors.light.subText}>Hoặc</Paragraph>
            <View style={styles.separator} />
          </View>

          <Button text="Đăng kí với Gmail" type="secondary" />

          <View style={styles.signupContainer}>
            <Paragraph type="p2">Đã có tài khoản?</Paragraph>
            <TouchableOpacity  onPress={() => {router.replace('/login')}}>
              <Paragraph type="p2" color={Colors.light.primary}>
                Đăng nhập
              </Paragraph>
            </TouchableOpacity>
          </View>

        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },

  alignCenter: {
    alignSelf: 'center',
  },

  title: {
    marginTop: 30,
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
    gap: 3
  },
});
