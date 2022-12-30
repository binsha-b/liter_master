/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text, Image} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {myDefaultTheme} from '../utils/theme';
import Feather from 'react-native-vector-icons/Feather';
import {FONT_FAMILY} from '../assets/fonts';
import {responsiveScale} from '../utils';
const {colors} = myDefaultTheme;
const Header = ({
  navigation,
  showBack = false,
  title = '',
  showMenu = false,
  color = '',
  icon = false,
  userStore,
}) => {
  const insets = useSafeAreaInsets();
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View
      style={[
        styles.headerContainer,
        {
          backgroundColor: color,
          borderBottomWidth: responsiveScale(1.5),
          borderBottomColor: colors.secondaryLight,
          paddingTop: responsiveScale(10) + insets.top,
        },
      ]}>
      {/* {showBack && (
        <StatusBar
          animated={true}
          barStyle="dark-content"
          backgroundColor=colors.card
        />
      )}
      {showMenu && (
        <StatusBar
          animated={true}
          barStyle="light-content"
          backgroundColor={colors.primary}
        />
      )} */}
      <View style={{flex: 0.3}}>
        {showBack && (
          <TouchableOpacity
            onPress={goBack}
            hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
            style={{
              height: responsiveScale(22),
              width: responsiveScale(22),
              borderRadius: responsiveScale(11),
              backgroundColor: colors.primary,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              style={{
                height: responsiveScale(15),
                width: responsiveScale(15),
                tintColor: colors.card,
              }}
              source={require('../assets/icons/backLeft.png')}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={{flex: 0.5}}>
        {title === 'Surveys' ? (
          <Image
            style={{
              tintColor: colors.card,
              height: responsiveScale(40),
              width: responsiveScale(100),
            }}
            source={require('../assets/images/logoUp.png')}
          />
        ) : (
          <Text
            numberOfLines={1}
            style={{
              textAlign: 'center',
              fontSize: responsiveScale(17),
              fontFamily: FONT_FAMILY.bold,
              color: colors.text,
              includeFontPadding: false,
            }}>
            {title}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: responsiveScale(10),
    paddingBottom: responsiveScale(15),
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
  },
});

export default Header;
