import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {myDefaultTheme} from '../../utils/theme';
import StationCard from '../../common/StationCard';
import {commonStyles} from '../../utils/commonStyles';
import CountBox from '../../common/CountBox';
import {showMessage} from 'react-native-flash-message';
import {supervisorHome} from '../../api';
import {responsiveScale} from '../../utils';

const {colors} = myDefaultTheme;

const {height} = Dimensions.get('window');

const keyExtractor = item => item?.id;
const Collection = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [refreshingPage, setRefreshingPage] = useState(false);
  const [loadingCount, setLoadingCount] = useState(false);
  const [loadingStations, setLoadingStations] = useState(false);
  const [counts, setCounts] = useState({});
  const [collectionRequests, setCollectionRequests] = useState([]);

  const focusedScreen = useIsFocused();

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

  const getDatas = async (intial = false) => {
    try {
      let {data} = await supervisorHome();
      setCounts(data);

      setCollectionRequests(data.collection_requests);
      intial ? setLoadingCount(false) : setRefreshingPage(false);
      setLoadingStations(false);
      setRefreshing(false);
    } catch (error) {
      showMessage({
        message: 'Oops! Something went wrong',
        description: 'Failed to fetch the counts. Please try again later',
      });
    }
  };

  const _renderItem = ({item}) => {
    return (
      <StationCard
        item={item?.station}
        navigation={navigation}
        cardType={'Collection'}
        details={item}
        navigateScreenName={'CollectionApproval'}
      />
    );
  };

  return (
    <View
      style={[
        commonStyles.container,
        {backgroundColor: colors.backgroundSecondary, height: height},
      ]}>
      <>
        <View style={styles.countContainer}>
          <CountBox
            loading={loadingCount}
            count={counts?.total_requests}
            label={'Total Request'}
            textAlign={'left'}
          />
          <CountBox
            loading={loadingCount}
            count={counts?.pending_requests}
            label={'Pending Request'}
            textAlign={'left'}
          />
        </View>
        <View style={styles.countContainer}>
          <CountBox
            loading={loadingCount}
            countSmall={counts?.collection_in_hand}
            label={'Collection in Hand'}
            textAlign={'left'}
          />
          <CountBox
            loading={loadingCount}
            countSmall={counts?.total_collection}
            label={'Total Collection'}
            textAlign={'left'}
          />
        </View>
        <View style={styles.countSection}>
          <CountBox
            loading={loadingCount}
            countSmall={counts?.collection_transferred}
            label={'Collection Transferred'}
            textAlign={'center'}
            color={colors.primaryLight}
            textColor={colors.primary}
          />
        </View>
      </>
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
        ListEmptyComponent={
          loadingStations ? (
            <View style={commonStyles.emptyStateContainer}>
              <ActivityIndicator color={colors.primary} />
            </View>
          ) : (
            <View style={commonStyles.emptyStateContainer}>
              <Text
                style={[
                  commonStyles.emptyStateText,
                  {color: colors.secondary},
                ]}>
                {
                  'Sorry! There are no station available for you. Please try again later.'
                }
              </Text>
            </View>
          )
        }
        keyExtractor={keyExtractor}
        data={collectionRequests}
        renderItem={_renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  countSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    padding: responsiveScale(10),
  },
  countContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    paddingTop: responsiveScale(10),
    paddingHorizontal: responsiveScale(10),
  },
});

export default Collection;
