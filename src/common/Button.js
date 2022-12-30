/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {responsiveScale} from '../utils';
import {myDefaultTheme} from '../utils/theme';

const {colors} = myDefaultTheme;
export default function Button(props) {
  if (Platform.OS === 'ios') {
    return (
      <TouchableOpacity
        {...props}
        style={{
          backgroundColor: props?.color ? props?.color : colors.primary,
          borderRadius: responsiveScale(10),
          alignItems: 'center',
          paddingVertical: responsiveScale(13),
          alignSelf: 'center',
          width: '90%',
          marginTop: responsiveScale(22),
          ...props?.buttonStyle,
        }}>
        {props?.loading ? <ActivityIndicator /> : props?.children}
      </TouchableOpacity>
    );
  } else {
    return (
      <View
        style={{
          borderRadius: responsiveScale(10),
          width: '100%',
          alignSelf: 'center',
          marginTop: responsiveScale(22),
          backgroundColor: props?.color ? props?.color : colors.primary,
          ...props?.buttonStyle,
        }}>
        <TouchableNativeFeedback
          {...props}
          style={{width: '100%'}}
          background={TouchableNativeFeedback.Ripple(
            colors.primaryLight,
            true,
          )}>
          <View
            style={{
              alignItems: 'center',
              paddingVertical: responsiveScale(13),
            }}>
            {props?.loading ? <ActivityIndicator /> : props?.children}
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    borderRadius: responsiveScale(10),
    width: '100%',
    alignSelf: 'center',
    marginTop: responsiveScale(22),
    backgroundColor: colors.secondary,
  },
  iosContainer: {
    backgroundColor: colors.primary,
    borderRadius: responsiveScale(10),
    alignItems: 'center',
    paddingVertical: responsiveScale(13),
    alignSelf: 'center',
    width: '90%',
    marginTop: responsiveScale(22),
  },
});
