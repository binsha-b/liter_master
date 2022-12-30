import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {FONT_FAMILY} from '../assets/fonts';
import {responsiveScale} from '../utils';

import {myDefaultTheme} from '../utils/theme';

const {colors} = myDefaultTheme;
const {height} = Dimensions.get('window');
const CountBox = ({
  count = 0,
  countSmall = 0,
  label = '',
  loading = true,
  color = colors.cardSecondary,
  textColor = colors.secondary,
  textAlign = 'left',
  onPress = null,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: textAlign === 'center' ? 1 : 0.48,
        borderColor: colors.secondary,
        borderRadius: responsiveScale(10),
        padding: responsiveScale(14),
        justifyContent: 'center',
        paddingVertical: responsiveScale(10),
        backgroundColor: color,
      }}>
      <View style={{height: responsiveScale(35), justifyContent: 'center'}}>
        {!loading ? (
          count ? (
            <Text
              style={{
                fontFamily: FONT_FAMILY.bold,
                fontSize: responsiveScale(22),
                color: textColor,
                textAlign: textAlign,
                includeFontPadding: false,
              }}>
              {count}
            </Text>
          ) : (
            <Text
              style={{
                fontFamily: FONT_FAMILY.bold,
                fontSize: responsiveScale(18),
                color: textColor,
                textAlign: textAlign,
                includeFontPadding: false,
              }}>
              {countSmall}
            </Text>
          )
        ) : (
          <ActivityIndicator color={colors.primary} />
        )}
      </View>
      <Text
        style={{
          fontFamily: FONT_FAMILY.regular,
          fontSize: responsiveScale(12),
          color: textColor,
          textAlign: textAlign,
          includeFontPadding: false,
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};
export default CountBox;
