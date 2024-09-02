import React from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native';
import { Paragraph } from './text/Paragraph';
import { Colors } from '@/constants/Colors';
import { TabBarIcon } from './navigation/TabBarIcon';

export type ThemedButtonProps = TouchableOpacityProps & {
  type?: 'primary' | 'secondary' | 'correctAnswer' | 'wrongAnswer' | 'tertiary';
  text: string; 
};

export function Button({
  type = 'primary',
  text,
  style,
  ...rest
}: ThemedButtonProps) {
  const buttonStyle: ViewStyle[] = [styles.buttonBase]; // Common base styles

  if (type === 'primary') {
    buttonStyle.push(styles.primary);
  } else if (type === 'secondary') {
    buttonStyle.push(styles.secondary);
  } else if (type === 'correctAnswer') {
    buttonStyle.push(styles.correctAnswer);
  } else if (type === 'wrongAnswer') {
    buttonStyle.push(styles.wrongAnswer);
  } else if (type === 'tertiary') {
    buttonStyle.push(styles.tertiary);
  }
  
  return (
    <TouchableOpacity style={[...buttonStyle, style]} {...rest} activeOpacity={0.6}>
      {
        type === 'correctAnswer' && (
          <TabBarIcon name={'check-circle'} color={Colors.green._400} style={styles.icon} />
        ) 
      }
      {
        type === 'wrongAnswer' && (
          <TabBarIcon name={'close-circle'} color={Colors.feedback.error} style={styles.icon}/>
        ) 
      }
      <Paragraph 
        // style={{width: '100%', backgroundColor: Colors.brand._100, textAlign: 'center'}}
        type="p2" 
        color={type === 'primary' ? Colors.light.background : Colors.light.mainText}>
          {text} 
      </Paragraph>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonBase: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    flexDirection: 'row'
  },
  primary: {
    backgroundColor: Colors.light.primary, 
  },
  tertiary: {
    backgroundColor: Colors.brand._200, 
  },
  secondary: {
    backgroundColor: Colors.light.background,
    borderColor: Colors.light.secondary,
    borderWidth: 3,
  },
  correctAnswer: {
    backgroundColor: Colors.green._50,
    borderColor: Colors.green._400,
    borderWidth: 3,
  },
  wrongAnswer: {
    backgroundColor: Colors.brand._100,
    borderColor: Colors.feedback.error,
    borderWidth: 3,
  },
  icon:{
    position: 'absolute',
    left: 10
  }
});
