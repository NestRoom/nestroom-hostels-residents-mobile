import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import ScreenWrapper from '@/components/ui/ScreenWrapper';
import AppText from '@/components/ui/AppText';
import AppTextInput from '@/components/ui/AppTextInput';
import AppButton from '@/components/ui/AppButton';
import { Colors } from '@/constants/Colors';
import { registrationSchema } from '@/utils/validation';
import { secureFetch } from '@/services/api';

const RegisterScreen = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleRegister = async () => {
    setErrors({});

    // Validate
    const result = registrationSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = {};
      result.error.errors.forEach(err => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);
    try {
      await secureFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify(formData),
      });

      Alert.alert('Registration Successful', 'Your account has been created. Please sign in.', [
        { text: 'OK', onPress: () => router.replace('/login') },
      ]);
    } catch (err) {
      Alert.alert('Registration Failed', err.message || 'Failed to create account');
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
              Create Account
            </AppText>
            <AppText variant="subtitle" align="center" style={styles.subtitle}>
              Join NestRoom and experience a better way of hostel living.
            </AppText>
          </View>

          <View style={styles.form}>
            <AppTextInput
              label="Full Name"
              placeholder="Enter your full name"
              value={formData.name}
              onChangeText={val => handleInputChange('name', val)}
              error={errors.name}
            />

            <AppTextInput
              label="Email Address"
              placeholder="Enter your email"
              value={formData.email}
              onChangeText={val => handleInputChange('email', val)}
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
            />

            <AppTextInput
              label="Phone Number"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChangeText={val => handleInputChange('phone', val)}
              keyboardType="phone-pad"
              error={errors.phone}
            />

            <AppTextInput
              label="Password"
              placeholder="Create a password"
              value={formData.password}
              onChangeText={val => handleInputChange('password', val)}
              secureTextEntry
              error={errors.password}
            />

            <AppButton
              title="Register"
              onPress={handleRegister}
              isLoading={isLoading}
              style={styles.button}
            />

            <View style={styles.footer}>
              <AppText variant="body">Already have an account? </AppText>
              <TouchableOpacity onPress={() => router.push('/login')}>
                <AppText variant="body" color="primary" weight="semiBold">
                  Sign In
                </AppText>
              </TouchableOpacity>
            </View>
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
    paddingTop: 40,
    paddingBottom: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    color: Colors.light.primary,
    marginBottom: 8,
  },
  subtitle: {
    color: Colors.light.textSecondary,
    paddingHorizontal: 40,
  },
  form: {
    width: '100%',
  },
  button: {
    marginTop: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
  },
});

export default RegisterScreen;
