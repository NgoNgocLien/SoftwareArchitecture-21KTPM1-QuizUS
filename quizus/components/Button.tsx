import React from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Paragraph } from './text/Paragraph';

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
        style]} {...rest}>
        <Paragraph type="p2" 
            color={
                type=='primary' ? "white" : "#000"}>
        {text}
        </Paragraph>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  primary: {
    backgroundColor: '#FF5252', 
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%'
  },
  secondary: {
    backgroundColor: '#fff',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
  }
});
