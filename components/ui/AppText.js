import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';

const AppText = ({
  children,
  style,
  variant = 'body',
  color = 'text',
  weight = 'regular',
  align = 'left',
  ...props
}) => {
  const textStyles = [
    styles.base,
    styles[variant],
    { color: Colors.light[color] || color },
    { fontWeight: Typography.weight[weight] },
    { textAlign: align },
    style,
  ];

  return (
    <Text style={textStyles} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    fontFamily: Typography.fontFamily.regular,
    fontSize: Typography.size.base,
    color: Colors.light.text,
  },
  h1: {
    fontSize: Typography.size.display,
    fontWeight: Typography.weight.bold,
  },
  h2: {
    fontSize: Typography.size.xxxl,
    fontWeight: Typography.weight.bold,
  },
  h3: {
    fontSize: Typography.size.xxl,
    fontWeight: Typography.weight.semiBold,
  },
  title: {
    fontSize: Typography.size.xl,
    fontWeight: Typography.weight.semiBold,
  },
  subtitle: {
    fontSize: Typography.size.lg,
    color: Colors.light.textSecondary,
  },
  body: {
    fontSize: Typography.size.base,
  },
  small: {
    fontSize: Typography.size.sm,
  },
  xs: {
    fontSize: Typography.size.xs,
  },
});

export default AppText;
