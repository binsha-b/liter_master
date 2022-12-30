/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Image,
  Linking,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {myDefaultTheme} from '../utils/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import {responsiveScale} from '../utils';
import {FONT_FAMILY} from '../assets/fonts';
import {commonStyles} from '../utils/commonStyles';
const {colors} = myDefaultTheme;

const StationCard = ({
  navigation,
  showHeader = true,
  navigateScreenName = 'SurveyStartStation',
  item,
  onClickDetails = '',
  editable = true,
  cardType = '',
  details = {},
}) => {
  const onStart = () => {
    if (cardType === 'Collection') {
      navigation.navigate(navigateScreenName, {
        stationName: item?.station_name,
        stationID: item?.id,
        Details: details,
        title: 'Approval',
      });
      return false;
    }
    navigation.navigate(navigateScreenName, {
      stationName: item?.station_name,
      stationID: item?.id,
      details: item,
      editable,
    });
  };
  const onPhone = () => {
    Linking.openURL(`tel:${item?.phone}`);
  };

  const onMap = () => {
    const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
    const latLng = `${item?.lat},${item?.lng}`;
    const label = item?.station_name;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    Linking.openURL(url);
  };

  //   const onDetails = () => {
  //     navigation.navigate(onClickDetails, {
  //       station_details: item,
  //     });
  //   };

  return (
    <TouchableOpacity
      //onPress={onDetails}
      // disabled={!onClickDetails}
      style={{
        marginTop: responsiveScale(10),
        backgroundColor: colors.background,
        borderRadius: responsiveScale(10),
        padding: responsiveScale(10),
        marginHorizontal: responsiveScale(10),
      }}>
      {showHeader && (
        <Text
          numberOfLines={1}
          style={{
            fontSize: responsiveScale(15),
            fontFamily: FONT_FAMILY.semibold,
            textAlign: 'left',
            includeFontPadding: false,
            paddingBottom: responsiveScale(10),
            color: colors.text,
          }}>
          {item?.station_name}
        </Text>
      )}
      <View style={{paddingBottom: responsiveScale(10), flexDirection: 'row'}}>
        <View>
          <Image
            style={{
              height: responsiveScale(110),
              width: responsiveScale(130),
              borderRadius: responsiveScale(10),
            }}
            source={
              item?.image
                ? {uri: item?.image}
                : require('../assets/images/sampleDesign/petrolPumb.png')
            }
          />
        </View>
        <View style={{paddingLeft: responsiveScale(10)}}>
          <Text numberOfLines={2} style={commonStyles.cardDetailLabel}>
            {showHeader ? 'Station Code' : 'Request Number'}
          </Text>
          <Text numberOfLines={2} style={commonStyles.cardDetailValue}>
            {showHeader ? item?.station_code : item?.report_num}
          </Text>
          <Text
            style={[
              commonStyles.cardDetailLabel,
              {marginTop: responsiveScale(8)},
            ]}>
            {'Address'}
          </Text>
          <Text numberOfLines={2} style={commonStyles.cardDetailValue}>
            {item?.address}
          </Text>
          <Text
            style={[
              commonStyles.cardDetailLabel,
              {marginTop: responsiveScale(8)},
            ]}>
            {'Region'}
          </Text>
          <Text numberOfLines={2} style={commonStyles.cardDetailValue}>
            {item?.region}
          </Text>
        </View>
      </View>
      <View
        style={{
          height: responsiveScale(1.5),
          backgroundColor: colors.secondaryLight,
        }}
      />
      <View
        style={{
          paddingTop: responsiveScale(10),
          flexDirection: 'row',
        }}>
        <View style={{flex: 0.7, flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={onPhone}
            hitSlop={{top: 20, bottom: 20, left: 10, right: 10}}
            style={{
              width: responsiveScale(30),
              height: responsiveScale(30),
              borderRadius: responsiveScale(100),
              backgroundColor: colors.secondaryLight,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FontAwesome
              size={responsiveScale(16)}
              name="phone"
              color={colors.secondary}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onMap}
            hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
            style={{
              width: responsiveScale(30),
              height: responsiveScale(30),
              borderRadius: responsiveScale(100),
              backgroundColor: colors.secondaryLight,
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: responsiveScale(20),
            }}>
            <FontAwesome
              size={responsiveScale(16)}
              name="location-arrow"
              color={colors.secondary}
            />
          </TouchableOpacity>
        </View>
        <View style={{flex: 0.3}}>
          <TouchableOpacity
            onPress={onStart}
            hitSlop={{top: 20, bottom: 20, left: 10, right: 20}}
            style={{
              height: responsiveScale(36),
              borderRadius: responsiveScale(18),
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: responsiveScale(15),
              borderWidth: responsiveScale(1.5),
              borderColor: colors.primary,
              flexDirection: 'row',
            }}>
            <Text
              style={{
                fontFamily: FONT_FAMILY.semibold,
                fontSize: responsiveScale(13),
                color: colors.primary,
                marginRight: responsiveScale(10),
                includeFontPadding: false,
              }}>
              {editable ? 'Start' : 'View'}
            </Text>
            <Image
              style={{height: responsiveScale(14), width: responsiveScale(11)}}
              source={require('../assets/icons/startRight.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default StationCard;
