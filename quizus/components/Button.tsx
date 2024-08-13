import React from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Paragraph } from './text/Paragraph';
import { Colors } from '@/constants/Colors';

export type ThemedButtonProps = TouchableOpacityProps & {
  type?: string; 
  text: string; 
};

export function Button({
  type,
  text,
  style,
  ...rest
}: ThemedButtonProps) {
  return (
    <TouchableOpacity style={[
        type=='primary' && styles.primary, 
        type=='secondary' && styles.secondary, 
        style]} {...rest}
        activeOpacity={0.6} >
        <Paragraph type="p2" 
            color={
                type=='primary' ? Colors.light.background : Colors.light.mainText}>
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
    borderColor: Colors.light.subText,
    borderWidth: 1,
  }
});
