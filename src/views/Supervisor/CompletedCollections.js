import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {FONT_FAMILY} from '../../assets/fonts';
import CountBox from '../../common/CountBox';
import {responsiveScale} from '../../utils';
import {commonStyles} from '../../utils/commonStyles';
import {myDefaultTheme} from '../../utils/theme';
import {getCollectedTransactions} from '../../api';
import {showMessage} from 'react-native-flash-message';
import SimpleCard from '../../common/SimpleCard';

const {colors} = myDefaultTheme;

const keyExtractor = item => item?.station_code;

const CompletedCollections = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [refreshingPage, setRefreshingPage] = useState(false);
  const [loadingCount, setLoadingCount] = useState(false);

  const [loadingStations, setLoadingStations] = useState(false);

  const [collections, setCollections] = useState([]);

  const focusedScreen = useIsFocused();

  // const onRefresh = () => {
  //   setRefreshing(true);
  // };

  const _renderItem = ({item}) => {
    return <SimpleCard item={item} />;
  };

  const onRefresh = () => {
    setRefreshing(true);
    getDatas();
  };

  useEffect(() => {
    getDatas(true);
  }, []);

  useEffect(() => {
    if (refreshing && focusedScreen) {
      getDatas();
    }
  }, [refreshing]);

  const getDatas = (intial = false) => {
    getCollectedTransactions()
      .then(res => {
        setCollections(res.data);
        intial ? setLoadingCount(false) : setRefreshingPage(false);
        setLoadingStations(false);
        setRefreshing(false);
      })
      .catch(err => {
        showMessage({
          message: 'Oops! Something went wrong',
          description:
            'Failed to fetch the collections. Please try again later',
        });
      });
  };
  return (
    <View
      style={[
        commonStyles.container,
        {backgroundColor: colors.backgroundSecondary},
      ]}>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refreshingPage || (focusedScreen && refreshing)}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            titleColor={colors.primary}
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: responsiveScale(25),
        }}
        ListHeaderComponent={
          <View style={{backgroundColor: colors.card}}>
            <View style={styles.countSection}>
              <CountBox
                loading={loadingCount}
                countSmall={'SAR 50000'}
                color={colors.primaryLight}
                textColor={colors.primary}
                label={'Cash in Hand'}
                textAlign={'center'}
              />
            </View>
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
        data={collections}
        renderItem={_renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  countSection: {
    justifyContent: 'space-between',
    backgroundColor: colors.back,
    padding: responsiveScale(10),
  },
  countContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    padding: responsiveScale(10),
  },
  cardContainer: {
    width: '95%',
    backgroundColor: colors.secondaryLight,
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
    backgroundColor: colors.secondaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxText: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: responsiveScale(13),
    color: colors.secondary,
  },
  statusLabel: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: responsiveScale(12),
    color: colors.secondary,
  },
  cashAmount: {
    fontFamily: FONT_FAMILY.medium,
    fontSize: responsiveScale(14),
    alignSelf: 'center',
    color: colors.secondary,
  },
  cashButton: {
    backgroundColor: colors.background,
    borderRadius: responsiveScale(10),
    paddingHorizontal: responsiveScale(20),

    alignSelf: 'center',
  },
});
export default CompletedCollections;
