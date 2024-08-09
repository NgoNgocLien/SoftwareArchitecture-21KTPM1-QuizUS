import React, { useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, Image, View, SafeAreaView, Keyboard, TouchableWithoutFeedback, Alert, TextInput, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Heading } from '@/components/text/Heading';
import { Label } from '@/components/text/Label';
import { Paragraph } from '@/components/text/Paragraph';
import { useRouter, useLocalSearchParams  } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function OTP() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const {phoneNumber, password} = params;

  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
  const otpInputs = useRef<Array<TextInput | null>>([]);

  const handleChange = (text: string, index: number) => {
    if (text.length > 1) {
      text = text.slice(-1); // Ensure only the last character is used
    }
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (text && index < otpInputs.current.length - 1) {
      otpInputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
    if (e.nativeEvent.key === 'Backspace') {
      if (index > 0) {
        otpInputs.current[index - 1]?.focus();
      }
    }
  };

  const handleOTP = async () => {
    try {
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

      //   Alert.alert('Error', 'Mã OTP không hợp lệ');
      // }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Lỗi hệ thống');
    }
  };
  
  return (
    <LinearGradient
    colors={['#FFFFFF', '#FFFFFF', '#FFD7D9']} // Gradient colors
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
          <Image source={require('@/assets/images/otp.png')}  style={styles.otpImage} />
          <Heading type="h4" style={[styles.alignCenter, styles.title]}>
            Xác nhận số điện thoại
          </Heading>
          <Paragraph type="p2" style={styles.subtitle}>Vui lòng nhập mã OTP gồm 4 chữ số được gửi đến số điện thoại của bạn!</Paragraph>


          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => otpInputs.current[index] = ref}
                style={styles.otpInput}
                maxLength={1}
                keyboardType="number-pad" // `keyboardType` should be "number-pad" for numeric input
                value={digit}
                onChangeText={(text) => handleChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
              />
            ))}
          </View>

          <TouchableOpacity style={styles.resendContainer}>
            <Paragraph type="p2" color="#FF5252" >
              Gửi lại mã
            </Paragraph>
          </TouchableOpacity>

          <Button
              style={styles.continueContainer}
              text="Tiếp tục"
              type="primary"
              onPress={handleOTP}
            />

        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },

  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },

  alignCenter: {
    alignSelf: 'center',
  },

  otpImage:{
    alignSelf: 'center',
    marginTop: 45
  },

  title: {
    marginTop: 30,
    marginBottom: 10,
  },

  subtitle: {
    textAlign: 'center',
    width: 300,
    marginBottom: 20,
  },

  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '62%',
    marginBottom: 20,
  },

  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#FF5252',
    backgroundColor: '#FFF',
    textAlign: 'center',
    fontSize: 18,
    borderRadius: 10,
  },

  resendContainer: {
    marginTop: 20,
  },

  continueContainer: {
    marginTop: 'auto',
  },
});
