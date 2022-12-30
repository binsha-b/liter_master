/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Image,
  Linking,
  Platform,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import {myDefaultTheme} from '../utils/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import {responsiveScale} from '../utils';
import {FONT_FAMILY} from '../assets/fonts';
import {commonStyles} from '../utils/commonStyles';
const {colors} = myDefaultTheme;

const StatusCount = ({label, value}) => (
  <View style={{paddingLeft: responsiveScale(10)}}>
    <Text style={commonStyles.cardDetailLabel}>{label}</Text>

    <View style={styles.statusValue}>
      <Text style={commonStyles.cardDetailValue}>{value}</Text>
    </View>
  </View>
);

const FMRCard = ({
  navigation,
  showHeader = true,
  navigateScreenName = 'FMRStart',
  item,
  onClickDetails = '',
  editable = true,
}) => {
  const onStart = () => {
    navigation.navigate(navigateScreenName, {
      stationName: item?.station_details?.station_name,
      stationID: item?.station_details?.id,
      details: item,
      editable,
    });
  };

  const onDetails = () => {
    navigation.navigate('FMRStationDetails', {
      station_details: item?.station_details,
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

  return (
    <TouchableOpacity onPress={onDetails} style={styles.cardContainer}>
      {showHeader && (
        <Text style={styles.headerText}>
          {item?.station_details?.station_name}
        </Text>
      )}

      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 0.4}}>
          <Image
            style={styles.stationImage}
            source={
              item?.image
                ? {uri: item?.image}
                : require('../assets/images/sampleDesign/petrolPumb.png')
            }
          />
        </View>
        <View style={{justifyContent: 'space-between', flex: 0.6}}>
          <View style={{paddingLeft: responsiveScale(10)}}>
            <Text style={commonStyles.cardDetailLabel}>
              {showHeader ? 'Station Code' : 'Request Number'}
            </Text>
            <Text style={commonStyles.cardDetailValue}>
              {showHeader
                ? item?.station_details?.station_code
                : item?.report_num}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <StatusCount label={'New'} value={item?.count_new} />
            <StatusCount label={'Assigned'} value={item?.count_assigned} />
            <StatusCount label={'Ongoing'} value={item?.count_ongoing} />
          </View>
        </View>
      </View>

      <View
        style={{
          height: responsiveScale(1.5),
          backgroundColor: colors.cardSecondary,
          marginVertical: responsiveScale(10),
        }}
      />
      <View
        style={{
          flexDirection: 'row',
        }}>
        <View style={{flex: 0.65, flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={onPhone}
            hitSlop={{top: 20, bottom: 20, left: 10, right: 10}}
            style={{
              width: responsiveScale(30),
              height: responsiveScale(30),
              borderRadius: responsiveScale(100),
              backgroundColor: colors.cardSecondary,
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
              backgroundColor: colors.cardSecondary,
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
        <View style={{flex: 0.34}}>
          <TouchableOpacity
            onPress={onStart}
            hitSlop={{top: 20, bottom: 20, left: 10, right: 20}}
            style={{
              height: responsiveScale(34),
              borderRadius: responsiveScale(18),
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: colors.primary,
              backgroundColor: colors.primary,
              flexDirection: 'row',
            }}>
            <Text
              style={{
                fontFamily: FONT_FAMILY.regular,
                fontSize: responsiveScale(13),
                color: colors.background,
                marginRight: responsiveScale(0),
                includeFontPadding: false,
              }}>
              New FMR
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FMRCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: '95%',
    backgroundColor: colors.card,
    borderRadius: responsiveScale(10),
    padding: responsiveScale(12),
    marginTop: responsiveScale(10),
  },
  headerText: {
    fontSize: responsiveScale(15),
    fontFamily: FONT_FAMILY.semibold,
    textAlign: 'left',
    includeFontPadding: false,
    paddingBottom: responsiveScale(10),
    color: colors.text,
  },
  stationImage: {
    height: responsiveScale(115),
    width: responsiveScale(130),
    borderRadius: responsiveScale(10),
  },
  statusValue: {
    height: responsiveScale(22),
    borderRadius: responsiveScale(4),
    marginTop: responsiveScale(5),
    backgroundColor: colors.cardSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
