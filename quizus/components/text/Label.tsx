import { Text, type TextProps, StyleSheet } from 'react-native';
export type ThemedTextProps = TextProps & {
  color?: string;
  // type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' ;
};

export function Label({
  style,
  color = "black",
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
      color: '#333',
      marginBottom: 10,
    },
  });
  
