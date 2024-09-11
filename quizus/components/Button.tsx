import React from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native';
import { Paragraph } from './text/Paragraph';
import { Colors } from '@/constants/Colors';
import { TabBarIcon } from './navigation/TabBarIcon';

export type ThemedButtonProps = TouchableOpacityProps & {
  type?: 'primary' | 'secondary' | 'correctAnswer' | 'wrongAnswer' | 'tertiary' | 'disabled';
  text: string;
  size?: string; 
};

export function Button({
  type = 'primary',
  text,
  size,
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
  } else if (type === 'disabled') {
    buttonStyle.push(styles.disabled);
  }

  if (size === 'small'){
    buttonStyle.push(styles.small);
  }

  let textColor;
  if (type === 'primary' || type === 'disabled')
    textColor = Colors.light.background
  else if (type === 'tertiary')
    textColor = Colors.brand._800
  else 
    textColor = Colors.light.mainText
  
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
        style={{textAlign: 'center'}}
        type="p2" 
        color={textColor}>
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
    flexDirection: 'row',
    textAlign: 'center',
  },

  small: {
    height: 'auto',
    width: '100%',
    paddingVertical: 5,
    paddingHorizontal: 15,
    alignSelf: 'center',
    marginBottom: 10,
  },

  primary: {
    backgroundColor: Colors.light.primary, 
  },
  tertiary: {
    backgroundColor: Colors.brand._200, 
  },
  disabled:{
    backgroundColor: Colors.gray._500, 
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
