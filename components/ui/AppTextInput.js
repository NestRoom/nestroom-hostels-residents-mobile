import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import AppText from './AppText';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing } from '@/constants/Spacing';

const AppTextInput = ({ label, error, style, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);

  const containerStyles = [
    styles.inputContainer,
    isFocused && styles.inputFocused,
    error && styles.inputError,
    style,
  ];

  return (
    <View style={styles.container}>
      {label && (
        <AppText variant="small" weight="medium" style={styles.label}>
          {label}
        </AppText>
      )}
      <View style={containerStyles}>
        <TextInput
          style={styles.input}
          placeholderTextColor="#9CA3AF"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
      </View>
      {error && (
        <AppText variant="xs" style={styles.errorText}>
          {error}
        </AppText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    marginBottom: 6,
    marginLeft: 4,
    color: Colors.light.textSecondary,
  },
  inputContainer: {
    backgroundColor: '#F3F4F6',
    borderRadius: Spacing.radius.md,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 12,
    height: 50,
    justifyContent: 'center',
  },
  inputFocused: {
    borderColor: Colors.light.primary,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: Colors.light.error,
  },
  input: {
    fontSize: Typography.size.base,
    color: Colors.light.text,
    height: '100%',
  },
  errorText: {
    color: Colors.light.error,
    marginTop: 4,
    marginLeft: 4,
  },
});

export default AppTextInput;
