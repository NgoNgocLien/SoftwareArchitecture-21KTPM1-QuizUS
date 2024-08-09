import React from 'react';
import { StyleSheet, TouchableOpacity, Image, View, SafeAreaView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Heading } from '@/components/text/Heading';
import { Label } from '@/components/text/Label';
import { Paragraph } from '@/components/text/Paragraph';

export default function Login() {
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
          <Input type="numeric" />

          <Label>Mật khẩu</Label>
          <Input secureTextEntry={true} />

          <TouchableOpacity>
            <Paragraph type="p2" color="#FF5252" style={styles.forgotPassword}>
              Quên mật khẩu?
            </Paragraph>
          </TouchableOpacity>

          <Button text="Tiếp tục" type="primary" />

          <View style={styles.separatorContainer}>
            <View style={styles.separator} />
            <Paragraph type="p3" color="#ccc">Hoặc</Paragraph>
            <View style={styles.separator} />
          </View>

          <Button text="Đăng nhập với Gmail" type="secondary" />
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
    marginTop: 60,
    marginBottom: 30,
  },

  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 30,
  },

  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    gap: 10,
  },

  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
});
