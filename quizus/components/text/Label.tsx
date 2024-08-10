import { Colors } from '@/constants/Colors';
import { Text, type TextProps, StyleSheet } from 'react-native';
export type ThemedTextProps = TextProps & {
  color?: string;
  // type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' ;
};

export function Label({
  style,
  color = Colors.light.subText,
  // type,
  ...rest
}: ThemedTextProps) {
  return (
    <Text
      style={[
        { color: color },
        styles.label,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
    label: {
      fontSize: 16,
      marginBottom: 10,
    },
  });
  
