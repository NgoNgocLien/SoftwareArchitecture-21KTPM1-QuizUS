import React, { ReactNode } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';
import { Colors } from '@/constants/Colors';

interface GradientWrapperProps {
  children: ReactNode; // Define children as ReactNode
}

const GradientWrapper: React.FC<GradientWrapperProps> = ({ children }) => {
  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={[Colors.light.secondary, Colors.light.secondary]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0.33 }}
        style={{ flex: 1 }}
      >
        {children} {/* Render the children passed to this component */}
      </LinearGradient>
    </View>
  );
};

export default GradientWrapper;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
