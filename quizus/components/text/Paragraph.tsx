import { Colors } from '@/constants/Colors';
import { Text, type TextProps, StyleSheet } from 'react-native';

export type ThemedTextProps = TextProps & {
  color?: string;
  type?: 'p1' | 'p2' | 'p3';
};

export function Paragraph({
  style,
  color = Colors.light.mainText,
  type,
  ...rest
}: ThemedTextProps) {
  // Optionally use useThemeColor if you want to provide default theme-based colors.
  return (
    <Text
      style={[
        { color: color },
        type === 'p1' ? styles.p1 : undefined,
        type === 'p2' ? styles.p2 : undefined,
        type === 'p3' ? styles.p3 : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  p1: {
    fontSize: 18,       // Larger body text
    lineHeight: 26,     // Adjusted line height for better readability
    fontWeight: '400',  // Regular weight
  },
  p2: {
    fontSize: 16,       // Medium body text
    lineHeight: 24,     // Adjusted line height
    fontWeight: '400',  // Regular weight
  },
  p3: {
    fontSize: 14,       // Smaller body text
    lineHeight: 22,     // Adjusted line height
    fontWeight: '400',  // Regular weight
  },
});

  
