import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import ScreenWrapper from '@/components/ui/ScreenWrapper';
import AppText from '@/components/ui/AppText';
import AppTextInput from '@/components/ui/AppTextInput';
import AppButton from '@/components/ui/AppButton';
import { Colors } from '@/constants/Colors';
import { secureFetch } from '@/services/api';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleResetRequest = async () => {
    setError('');
    if (!email) {
      setError('Please enter your email');
      return;
    }

    setIsLoading(true);
    try {
      await secureFetch('/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });

      Alert.alert('OTP Sent', 'A verification code has been sent to your email.', [
        {
          text: 'OK',
          onPress: () => router.push({ pathname: '/otp', params: { email } }),
        },
      ]);
    } catch (err) {
      Alert.alert('Error', err.message || 'Failed to send OTP');
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
              Forgot Password
            </AppText>
            <AppText variant="subtitle" align="center" style={styles.subtitle}>
              Enter your registered email address and we{"'"}ll send you an OTP to reset your
              password.
            </AppText>
          </View>

          <View style={styles.form}>
            <AppTextInput
              label="Email Address"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              error={error}
            />

            <AppButton
              title="Send OTP"
              onPress={handleResetRequest}
              isLoading={isLoading}
              style={styles.button}
            />

            <AppButton
              title="Back to Login"
              onPress={() => router.back()}
              variant="outline"
              style={styles.backButton}
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
    paddingHorizontal: 20,
    lineHeight: 22,
  },
  form: {
    width: '100%',
  },
  button: {
    marginTop: 20,
  },
  backButton: {
    marginTop: 16,
  },
});

export default ForgotPasswordScreen;
