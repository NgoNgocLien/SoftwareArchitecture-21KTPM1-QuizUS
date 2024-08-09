import { Text, type TextProps, StyleSheet } from 'react-native';

export type ThemedTextProps = TextProps & {
  color?: string;
  type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' ;
};

export function Heading({
  style,
  color = "black",
  type,
  ...rest
}: ThemedTextProps) {
  // Optionally use useThemeColor if you want to provide default theme-based colors.
  return (
    <Text
      style={[
        { color: color },
        type === 'h1' ? styles.h1 : undefined,
        type === 'h2' ? styles.h2 : undefined,
        type === 'h3' ? styles.h3 : undefined,
        type === 'h4' ? styles.h4 : undefined,
        type === 'h5' ? styles.h5 : undefined,
        type === 'h6' ? styles.h6 : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
    h1: {
      fontSize: 32,
      fontWeight: 'bold',
      lineHeight: 40,
    },
    h2: {
      fontSize: 28,
      fontWeight: 'bold',
      lineHeight: 36,
    },
    h3: {
      fontSize: 24,
      fontWeight: 'bold',
      lineHeight: 32,
    },
    h4: {
      fontSize: 20,
      fontWeight: 'bold',
      lineHeight: 28,
    },
    h5: {
      fontSize: 18,
      fontWeight: '600',
      lineHeight: 24,
    },
    h6: {
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 22,
    },
  });
  
