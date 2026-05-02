import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import ScreenWrapper from '@/components/ui/ScreenWrapper';
import AppText from '@/components/ui/AppText';
import AppButton from '@/components/ui/AppButton';
import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import { Typography } from '@/constants/Typography';
import { secureFetch } from '@/services/api';

const OTPScreen = () => {
  const { email } = useLocalSearchParams();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const inputs = useRef([]);
  const router = useRouter();

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    // Move to previous input if backspace is pressed and current is empty
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join('');
    if (otpString.length < 6) {
      Alert.alert('Error', 'Please enter the full 6-digit OTP');
      return;
    }

    setIsLoading(true);
    try {
      await secureFetch('/auth/verify-otp', {
        method: 'POST',
        body: JSON.stringify({ email, otp: otpString }),
      });

      router.push({ pathname: '/reset-password', params: { email, otp: otpString } });
    } catch (err) {
      Alert.alert('Error', err.message || 'Verification failed');
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
              OTP Verification
            </AppText>
            <AppText variant="subtitle" align="center" style={styles.subtitle}>
              Enter the 6-digit code sent to {email}
            </AppText>
          </View>

          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={ref => (inputs.current[index] = ref)}
                style={styles.otpInput}
                maxLength={1}
                keyboardType="number-pad"
                value={digit}
                onChangeText={value => handleOtpChange(value, index)}
                onKeyPress={e => handleKeyPress(e, index)}
              />
            ))}
          </View>

          <AppButton
            title="Verify OTP"
            onPress={handleVerify}
            isLoading={isLoading}
            style={styles.button}
          />

          <View style={styles.footer}>
            <AppText variant="body">Didn{"'"}t receive the code? </AppText>
            <TouchableOpacity
              onPress={() => {
                /* Resend Logic */
              }}
            >
              <AppText variant="body" color="primary" weight="semiBold">
                Resend
              </AppText>
            </TouchableOpacity>
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
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  otpInput: {
    width: 50,
    height: 60,
    backgroundColor: '#F3F4F6',
    borderRadius: Spacing.radius.md,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    textAlign: 'center',
    fontSize: Typography.size.xxl,
    fontWeight: Typography.weight.bold,
    color: Colors.light.text,
  },
  button: {
    width: '100%',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
  },
});

export default OTPScreen;
