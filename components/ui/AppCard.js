import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';

const AppCard = ({ children, style, glass = false, intensity = 20 }) => {
  const containerStyles = [styles.card, !glass && styles.standard, style];

  if (glass) {
    return (
      <BlurView intensity={intensity} style={containerStyles} tint="light">
        {children}
      </BlurView>
    );
  }

  return <View style={containerStyles}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    borderRadius: Spacing.radius.card,
    padding: 16,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
      },
      android: {
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.05)',
      },
    }),
  },
  standard: {
    backgroundColor: Colors.light.card,
    ...Spacing.shadow.md,
  },
});

export default AppCard;
