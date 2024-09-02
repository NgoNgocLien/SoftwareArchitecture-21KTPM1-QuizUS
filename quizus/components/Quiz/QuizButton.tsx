import React from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Paragraph } from '../text/Paragraph';
import { Colors } from '@/constants/Colors';

export type ThemedButtonProps = TouchableOpacityProps & {
  type?: 'normal' | 'true' | 'wrong';
  text: string; 
};

export function QuizButton({
  type,
  text,
  style,
  ...rest
}: ThemedButtonProps) {
  return (
    <TouchableOpacity style={[
        type=='normal' && styles.primary, 
        type=='true' && styles.secondary, 
        style]} 
        {...rest}
        activeOpacity={0.6} >
        <Paragraph type="p2" color={Colors.light.mainText}>
        {text}
        </Paragraph>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  primary: {
    backgroundColor: Colors.light.primary, 
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%'
  },
  secondary: {
    backgroundColor: Colors.light.background,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    width: '100%',
    borderColor: Colors.light.secondary,
    borderWidth: 1,
  }
});
