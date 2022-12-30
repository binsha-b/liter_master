import {useIsFocused} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {myDefaultTheme} from '../../utils/theme';
import {commonStyles} from '../../utils/commonStyles';
import CountBox from '../../common/CountBox';
import FMRCard from '../../common/FMRCard';
import {FONT_FAMILY} from '../../assets/fonts';
import {responsiveScale} from '../../utils';
import {getFmrStation} from '../../api';
import {showMessage} from 'react-native-flash-message';
const {colors} = myDefaultTheme;

const keyExtractor = item => item?.station_code;
const FMR = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [refreshingPage, setRefreshingPage] = useState(false);
  const [loadingCount, setLoadingCount] = useState(false);
  const [loadingStations, setLoadingStations] = useState(false);
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        let {data} = await getFmrStation();

        if (data?.status === true) {
          setStations(data?.data);
        } else {
          showMessage({
            message: data?.message,
            type: 'danger',
          });
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        showMessage({
          message: 'failed',
          description: '' + error,
          type: 'danger',
        });
      }
    };

    fetchStations();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
  };

  const _renderItem = ({item}) => {
    return (
      <View style={{alignItems: 'center'}}>
        <FMRCard item={item} navigation={navigation} startScreen="FMRStart" />
      </View>
    );
  };

  const fmrStations = [
    {
      id: 1,
      station_code: '2343534534',
      station_name: 'Aston Fuel Station',
      address: 'sheikh zayed road',
      region: 'North',
    },
    {
      id: 2,
      station_code: '3453453454',
      station_name: 'BNC Station',
      address: 'Hala station road',
      region: 'North',
    },
  ];
  return (
    <View
      style={[
        commonStyles.container,
        {backgroundColor: colors.backgroundSecondary},
      ]}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: colors.background,
          paddingBottom: responsiveScale(10),
        }}
        ListHeaderComponent={
          <View
            style={{
              justifyContent: 'space-between',
              backgroundColor: colors.card,
              padding: responsiveScale(10),
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: colors.card,
                paddingBottom: responsiveScale(10),
              }}>
              <CountBox
                loading={loadingCount}
                count={2}
                label={'New'}
                textAlign={'left'}
              />
              <CountBox
                loading={loadingCount}
                count={2}
                label={'Assigned'}
                textAlign={'left'}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: colors.card,
                paddingBottom: responsiveScale(10),
              }}>
              <CountBox
                loading={loadingCount}
                count={5}
                label={'Ongoing'}
                textAlign={'left'}
              />
              <CountBox
                loading={loadingCount}
                count={2}
                label={'Delay Processing'}
                textAlign={'left'}
              />
            </View>

            <CountBox
              loading={loadingCount}
              count={3}
              label={'Material Request'}
              textAlign={'left'}
              color={colors.primaryLight}
              textColor={colors.primary}
            />
          </View>
        }
        ListEmptyComponent={
          loadingStations ? (
            <View style={{flex: 1, justifyContent: 'center'}}>
              <ActivityIndicator color={colors.primary} />
            </View>
          ) : (
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
                  color: colors.secondary,
                  textAlign: 'center',
                  includeFontPadding: false,
                }}>
                {
                  'Sorry! There are no station available for you. Please try again later.'
                }
              </Text>
            </View>
          )
        }
        keyExtractor={keyExtractor}
        data={stations}
        renderItem={_renderItem}
      />
    </View>
  );
};

export default FMR;
