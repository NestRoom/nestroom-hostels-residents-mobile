import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
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
import { useAuth } from '@/store/AuthContext';
import { loginSchema } from '@/utils/validation';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    setErrors({});

    // Validate
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const fieldErrors = {};
      result.error.errors.forEach(err => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);
    const response = await login({ email, password });
    setIsLoading(false);

    if (response.success) {
      router.replace('/(tabs)');
    } else {
      Alert.alert('Login Failed', response.message);
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
            <Image
              source={require('@/assets/images/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <AppText variant="h2" align="center" style={styles.welcomeText}>
              Welcome Back
            </AppText>
            <AppText variant="subtitle" align="center" style={styles.subtitle}>
              Sign in to continue to your resident portal
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
              error={errors.email}
            />

            <AppTextInput
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              error={errors.password}
            />

            <TouchableOpacity
              onPress={() => router.push('/forgot-password')}
              style={styles.forgotPassword}
            >
              <AppText variant="small" color="primary" weight="semiBold">
                Forgot Password?
              </AppText>
            </TouchableOpacity>

            <AppButton
              title="Sign In"
              onPress={handleLogin}
              isLoading={isLoading}
              style={styles.loginButton}
            />

            <View style={styles.footer}>
              <AppText variant="body">Don{"'"}t have an account? </AppText>
              <TouchableOpacity onPress={() => router.push('/register')}>
                <AppText variant="body" color="primary" weight="semiBold">
                  Register
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
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  welcomeText: {
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  loginButton: {
    marginTop: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
  },
});

export default LoginScreen;
