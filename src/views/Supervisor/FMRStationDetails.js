import React, {useEffect, useState, useLayoutEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  I18nManager,
  StyleSheet,
} from 'react-native';
import {FONT_FAMILY} from '../../assets/fonts';
import {responsiveScale} from '../../utils';
import {commonStyles} from '../../utils/commonStyles';
import {myDefaultTheme} from '../../utils/theme';
import moment from 'moment';
import {getFmr} from '../../api';
import {showMessage} from 'react-native-flash-message';

const {colors} = myDefaultTheme;

const Tabs = [
  {label: 'New', value: 'New'},
  {label: 'Ongoing', value: 'Ongoing'},
  {label: 'Completed', value: 'Completed'},
  {label: 'Delayed', value: 'Delayed'},
];

const DetailCard = React.memo(({navigation, item, stationName}) => {
  // const onPress = () => {
  //   navigation.navigate('FMRStationSubDetails', {details: item, stationName});
  // };
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      // onPress={onPress}
      style={{
        padding: responsiveScale(10),
        borderRadius: responsiveScale(10),
        marginVertical: responsiveScale(10),
        width: '95%',
        backgroundColor: '#fff',
        alignSelf: 'center',
      }}>
      <Text
        style={{
          fontSize: responsiveScale(15),
          paddingBottom: responsiveScale(10),
          fontFamily: FONT_FAMILY.semibold,
          color: colors.text,
        }}>
        1111
      </Text>

      <View style={{flexDirection: 'row'}}>
        <View>
          <Text style={styles.boxHead}>Category</Text>
          <View style={styles.box}>
            <Text style={styles.boxText}>aaaa</Text>
          </View>
        </View>
        <View style={{marginLeft: responsiveScale(20)}}>
          <Text style={styles.boxHead}>Issue Type</Text>
          <View style={styles.box}>
            <Text style={styles.boxText}>aaaa</Text>
          </View>
        </View>
        <View style={{marginLeft: responsiveScale(20)}}>
          <Text style={styles.boxHead}>Priority</Text>
          <View style={styles.box}>
            <Text style={styles.boxText}>High</Text>
          </View>
        </View>
        {/* <View style={{marginLeft: responsiveScale(20)}}>
            <Text style={styles.boxHead}>
            Status
            </Text>
            <View
              style={[
                styles.box,
                {backgroundColor: getStatusBgColor(item?.translatedStatus)},
              ]}>
              <Text
                style={[
                  styles.boxText,
                  {color: getStatusTextColor(item?.translatedStatus)},
                ]}>
               new
              </Text>
            </View>
          </View> */}
      </View>
      <View
        style={{
          marginTop: responsiveScale(10),
          height: responsiveScale(1.5),
          width: '95%',
          backgroundColor: colors.cardSecondary,
        }}
      />
      <View style={{paddingTop: responsiveScale(10)}}>
        <Text
          style={{
            fontSize: responsiveScale(12),
            fontFamily: FONT_FAMILY.regular,
          }}>
          Manager
        </Text>
      </View>
    </TouchableOpacity>
  );
});

const FMRStationDetails = ({navigation, route}) => {
  const {station_details} = route.params;
  const [selectedTab, setSelectedTab] = useState('New');
  const [loading, setLoading] = useState(true);
  const [stations, setStations] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: station_details?.station_name,
    });
  }, [navigation]);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        let {data} = await getFmr({
          station_id: station_details?.id,
          status: selectedTab,
        });
        console.log(data);
        if (data?.status === true) {
          setStations(data?.data);
        } else {
          showMessage({
            message: data?.message,
            type: 'danger',
          });
        }
        // setLoading(false);
      } catch (error) {
        // setLoading(false);
        showMessage({
          message: 'failed',
          description: '' + error,
          type: 'danger',
        });
      }
    };

    fetchStations();
  }, []);

  useEffect(() => {
    // onRefresh();
  }, [selectedTab]);

  const _renderItems = ({item}) => {
    console.log(item);
    return (
      <DetailCard
        stationName={station_details?.station_name}
        item={item}
        navigation={navigation}
      />
    );
  };

  return (
    <View style={commonStyles.container}>
      <View style={{padding: responsiveScale(10)}}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: colors.cardSecondary,
            padding: responsiveScale(6),
            borderRadius: responsiveScale(32),
            justifyContent: 'space-between',
            marginBottom: 0,
          }}>
          {Tabs.map(t => (
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => setSelectedTab(t.value)}
              key={t.value}
              style={{
                height: responsiveScale(32),
                flex: 1 / 4.25,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor:
                  selectedTab === t.value
                    ? colors.secondary
                    : colors.secondary2,
                borderRadius: responsiveScale(32),
              }}>
              <Text
                style={{
                  fontFamily: FONT_FAMILY.regular,
                  fontSize: responsiveScale(12),
                  fontWeight: selectedTab === t.value ? '700' : '600',
                  color: selectedTab === t.value ? '#fff' : '#333840',
                }}>
                {t.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        // refreshControl={
        //   <RefreshControl
        //     refreshing={loading}
        //     // onRefresh={onRefresh}
        //     tintColor={colors.primary}
        //     titleColor={colors.primary}
        //   />
        // }
        contentContainerStyle={{flexGrow: 1}}
        // keyExtractor={keyExtractor}
        // data={reports[selectedTab]}
        data={[1, 2]}
        renderItem={_renderItems}
        ListEmptyComponent={
          //   !loading && (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              paddingHorizontal: responsiveScale(40),
            }}>
            <Text
              style={{
                fontFamily: FONT_FAMILY.regular,
                fontSize: responsiveScale(12.5),
                fontWeight: '400',
                color: '#2C2627',
                textAlign: 'center',
              }}>
              'Sorry! There are no reports available for the current selected
              tab. Please try again later.
            </Text>
          </View>
          //   )
        }
      />
    </View>
  );
};

export default FMRStationDetails;

const styles = StyleSheet.create({
  boxHead: {
    color: '#333840',
    fontSize: responsiveScale(11),
    fontFamily: FONT_FAMILY.regular,
  },
  box: {
    paddingHorizontal: responsiveScale(8),
    backgroundColor: colors.cardSecondary,
    borderRadius: responsiveScale(5),
    marginTop: responsiveScale(4),
    height: responsiveScale(25),
    justifyContent: 'center',
  },
  boxText: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: responsiveScale(12),
  },
});
