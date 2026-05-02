import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import ScreenWrapper from '@/components/ui/ScreenWrapper';
import AppText from '@/components/ui/AppText';
import AppTextInput from '@/components/ui/AppTextInput';
import AppButton from '@/components/ui/AppButton';
import { Colors } from '@/constants/Colors';
import { secureFetch } from '@/services/api';

const ResetPasswordScreen = () => {
  const { email, otp } = useLocalSearchParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleReset = async () => {
    setErrors({});
    const fieldErrors = {};

    if (password.length < 6) {
      fieldErrors.password = 'Password must be at least 6 characters';
    }
    if (password !== confirmPassword) {
      fieldErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);
    try {
      await secureFetch('/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify({ email, otp, password }),
      });

      Alert.alert('Success', 'Your password has been reset successfully.', [
        {
          text: 'Login Now',
          onPress: () => router.replace('/login'),
        },
      ]);
    } catch (err) {
      Alert.alert('Error', err.message || 'Failed to reset password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScreenWrapper style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.header}>
            <AppText variant="h2" align="center" style={styles.title}>
              Reset Password
            </AppText>
            <AppText variant="subtitle" align="center" style={styles.subtitle}>
              Create a new password for your account.
            </AppText>
          </View>

          <View style={styles.form}>
            <AppTextInput
              label="New Password"
              placeholder="Enter new password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              error={errors.password}
            />

            <AppTextInput
              label="Confirm Password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              error={errors.confirmPassword}
            />

            <AppButton
              title="Reset Password"
              onPress={handleReset}
              isLoading={isLoading}
              style={styles.button}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 60,
    paddingBottom: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    color: Colors.light.primary,
    marginBottom: 12,
  },
  subtitle: {
    color: Colors.light.textSecondary,
    paddingHorizontal: 30,
    lineHeight: 22,
  },
  form: {
    width: '100%',
  },
  button: {
    marginTop: 20,
  },
});

export default ResetPasswordScreen;
