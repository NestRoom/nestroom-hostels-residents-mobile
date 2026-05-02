import React, { useState, useRef } from 'react';
import { View, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import ScreenWrapper from '@/components/ui/ScreenWrapper';
import AppText from '@/components/ui/AppText';
import AppButton from '@/components/ui/AppButton';
import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';

const { width, height } = Dimensions.get('window');

const SLIDES = [
  {
    id: '1',
    title: 'Welcome to NestRoom',
    description: 'Experience premium hostel living with modern amenities and top-notch security.',
    image: require('@/assets/images/onboarding_comfort.png'),
  },
  {
    id: '2',
    title: 'Effortless Attendance',
    description: 'Mark your attendance with just a tap using our smart geofencing technology.',
    image: require('@/assets/images/onboarding_geofence.png'),
  },
  {
    id: '3',
    title: 'Stay Connected',
    description:
      'Get real-time updates on meals, notifications, and manage your complaints easily.',
    image: require('@/assets/images/onboarding_community.png'),
  },
];

const WelcomeScreen = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const flatListRef = useRef(null);
  const router = useRouter();

  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex < SLIDES.length) {
      const offset = nextSlideIndex * width;
      flatListRef?.current?.scrollToOffset({ offset });
      setCurrentSlideIndex(nextSlideIndex);
    } else {
      router.push('/login');
    }
  };

  const skip = () => {
    router.push('/login');
  };

  const Slide = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Image source={item.image} style={styles.image} resizeMode="contain" />
        <View style={styles.textContainer}>
          <AppText variant="h2" align="center" style={styles.title}>
            {item.title}
          </AppText>
          <AppText variant="subtitle" align="center" style={styles.description}>
            {item.description}
          </AppText>
        </View>
      </View>
    );
  };

  return (
    <ScreenWrapper withPadding={false} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={skip}>
          <AppText variant="body" color="primary" weight="semiBold">
            Skip
          </AppText>
        </TouchableOpacity>
      </View>

      <FlatList
        ref={flatListRef}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        data={SLIDES}
        contentContainerStyle={{ height: height * 0.75 }}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        renderItem={({ item }) => <Slide item={item} />}
        keyExtractor={item => item.id}
      />

      <View style={styles.footer}>
        <View style={styles.indicatorContainer}>
          {SLIDES.map((_, index) => (
            <View
              key={index}
              style={[styles.indicator, currentSlideIndex === index && styles.activeIndicator]}
            />
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <AppButton
            title={currentSlideIndex === SLIDES.length - 1 ? 'Get Started' : 'Next'}
            onPress={goToNextSlide}
            style={styles.button}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
  },
  header: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
  },
  slide: {
    width,
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  image: {
    height: '60%',
    width: '100%',
  },
  textContainer: {
    marginTop: 20,
  },
  title: {
    marginBottom: 10,
    color: Colors.light.primary,
  },
  description: {
    color: Colors.light.textSecondary,
    lineHeight: 24,
  },
  footer: {
    height: height * 0.25,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  indicator: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: Colors.light.primary,
    width: 24,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  button: {
    width: '100%',
  },
});

export default WelcomeScreen;
