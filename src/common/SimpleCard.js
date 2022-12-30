import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FONT_FAMILY} from '../assets/fonts';
import {responsiveScale} from '../utils';
import {myDefaultTheme} from '../utils/theme';

const {colors} = myDefaultTheme;
const SimpleCard = ({item}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={{
        padding: responsiveScale(15),
        marginTop: responsiveScale(15),
        marginHorizontal: responsiveScale(10),
        backgroundColor: colors.background,
        borderRadius: responsiveScale(10),
      }}>
      <View>
        <Text
          style={{
            fontFamily: FONT_FAMILY.bold,
            fontSize: responsiveScale(14),
            textAlign: 'left',
            includeFontPadding: false,
            color: colors.secondary,
          }}>
          {item?.tr_code}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontFamily: FONT_FAMILY.medium,
            fontSize: responsiveScale(13),
            textAlign: 'left',
            includeFontPadding: false,
            marginTop: responsiveScale(4),
          }}>
          {item?.station?.station_name}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottomWidth: 1,
          borderBottomColor: colors.secondaryLight,
          paddingBottom: responsiveScale(15),
        }}>
        <View style={{flex: 0.7}}>
          <Text
            style={{
              fontFamily: FONT_FAMILY.regular,
              fontSize: responsiveScale(11),
              textAlign: 'left',
              includeFontPadding: false,
              marginTop: responsiveScale(2),
            }}>
            {'Station Code'} : {item?.station?.station_code}
          </Text>
        </View>
        <View
          style={{
            flex: 0.3,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}>
          <Image
            style={{height: responsiveScale(12), width: responsiveScale(12)}}
            source={require('../assets/icons/date.png')}
          />
          <Text
            style={{
              fontFamily: FONT_FAMILY.regular,
              fontSize: responsiveScale(11),
              color: colors.secondary,
              textAlign: 'left',
              marginLeft: responsiveScale(5),
              includeFontPadding: false,
            }}>
            {item?.added_date}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: responsiveScale(10),
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontFamily: FONT_FAMILY.medium,
            fontSize: responsiveScale(14),
            textAlign: 'left',
            includeFontPadding: false,
            color: colors.secondary,
          }}>
          Amount
        </Text>

        <View style={styles.cashButton}>
          <Text style={styles.cashAmount}>{item?.total_amount}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  cashAmount: {
    fontFamily: FONT_FAMILY.medium,
    fontSize: responsiveScale(14),
    alignSelf: 'center',
    color: colors.secondary,
    includeFontPadding: false,
  },
  cashButton: {
    backgroundColor: colors.secondaryLight,
    borderRadius: responsiveScale(10),
    paddingHorizontal: responsiveScale(20),
    paddingVertical: responsiveScale(5),

    alignSelf: 'center',
  },
});
export default SimpleCard;
