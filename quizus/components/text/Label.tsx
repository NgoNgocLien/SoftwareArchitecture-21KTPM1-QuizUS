import { Colors } from '@/constants/Colors';
import { Text, type TextProps, StyleSheet } from 'react-native';
export type ThemedTextProps = TextProps & {
  color?: string;
};

export function Label({
  style,
  color = Colors.light.subText,
    ...rest
}: ThemedTextProps) {
  return (
    <Text
      style={[
        { color: color},
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
  
