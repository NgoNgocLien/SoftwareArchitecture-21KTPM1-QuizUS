import React from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

export type ThemedTextInputProps = TextInputProps & {
  type?: 'default' | 'email' | 'phone' | 'numeric'; // You can expand this with more types if needed
  placeholder?: string;
};

export function Input({
  style,
  type = 'default', // Default type if not specified
  placeholder,
  ...rest
}: ThemedTextInputProps) {

  // Determine the keyboard type based on the 'type' prop
  const keyboardType = () => {
    switch (type) {
      case 'email':
        return 'email-address';
      case 'phone':
        return 'phone-pad';
      case 'numeric':
        return 'numeric';
      default:
        return 'default';
    }
  };

  return (
    <TextInput
      style={[styles.input, style]}
      placeholder={placeholder}
      keyboardType={keyboardType()} // Use the determined keyboard type
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 48,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 30,
    backgroundColor: '#F9F9F9',
  },
});
