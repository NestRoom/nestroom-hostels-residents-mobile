import React from 'react';
import { View, StyleSheet, StatusBar, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';

const ScreenWrapper = ({
  children,
  style,
  backgroundColor = Colors.light.background,
  withPadding = true,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: withPadding ? insets.left + 16 : insets.left,
          paddingRight: withPadding ? insets.right + 16 : insets.right,
        },
        style,
      ]}
    >
      <StatusBar barStyle="dark-content" backgroundColor={backgroundColor} />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ScreenWrapper;
