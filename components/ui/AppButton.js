import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing } from '@/constants/Spacing';

const AppButton = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  style,
  textStyle,
}) => {
  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';
  const isOutline = variant === 'outline';

  const buttonStyles = [
    styles.base,
    styles[size],
    isPrimary && styles.primary,
    isSecondary && styles.secondary,
    isOutline && styles.outline,
    disabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.textBase,
    styles[`text_${size}`],
    isPrimary && styles.textPrimary,
    isSecondary && styles.textSecondary,
    isOutline && styles.textOutline,
    disabled && styles.textDisabled,
    textStyle,
  ];

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || isLoading}
      style={buttonStyles}
    >
      {isLoading ? (
        <ActivityIndicator color={isOutline ? Colors.light.primary : '#fff'} />
      ) : (
        <Text style={textStyles}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: Spacing.radius.button,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...Spacing.shadow.sm,
  },
  sm: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  md: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  lg: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  primary: {
    backgroundColor: Colors.light.primary,
  },
  secondary: {
    backgroundColor: Colors.light.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.light.primary,
    elevation: 0,
    shadowOpacity: 0,
  },
  disabled: {
    backgroundColor: '#E5E7EB',
    borderColor: '#E5E7EB',
  },
  textBase: {
    fontWeight: Typography.weight.bold,
    textAlign: 'center',
  },
  text_sm: {
    fontSize: Typography.size.sm,
  },
  text_md: {
    fontSize: Typography.size.base,
  },
  text_lg: {
    fontSize: Typography.size.lg,
  },
  textPrimary: {
    color: '#fff',
  },
  textSecondary: {
    color: '#fff',
  },
  textOutline: {
    color: Colors.light.primary,
  },
  textDisabled: {
    color: '#9CA3AF',
  },
});

export default AppButton;
