import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {myDefaultTheme} from '../../utils/theme';
import StationCard from '../../common/StationCard';
import {getSurveyCount, getSurveyStations} from '../../api';
import {showMessage} from 'react-native-flash-message';
import {commonStyles} from '../../utils/commonStyles';
import CountBox from '../../common/CountBox';
import {responsiveScale} from '../../utils';

const {colors} = myDefaultTheme;

const {height} = Dimensions.get('window');

const keyExtractor = item => item?.station_code;

const Surveys = ({navigation}) => {
  const [counts, setCounts] = useState({});
  const [surveyStations, setSurveyStations] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshingPage, setRefreshingPage] = useState(false);
  const [loadingCount, setLoadingCount] = useState(false);
  const [loadingStations, setLoadingStations] = useState(false);
  const [status, setStatus] = useState('Pending');
  const focusedScreen = useIsFocused();

  useEffect(() => {
    setLoadingStations(true);

    getDatas(true);
  }, [status]);

  const getDatas = async (intial = false) => {
    try {
      let {data} = await getSurveyCount();
      setCounts(data);
      intial ? setLoadingCount(false) : setRefreshingPage(false);
      setRefreshing(false);
    } catch (error) {
      intial ? setLoadingCount(false) : setRefreshingPage(false);
      setRefreshing(false);
      showMessage({
        message: 'Oops! Something went wrong',
        description: 'Failed to fetch the survey count. Please try again later',
      });
    }

    try {
      let {data} = await getSurveyStations();
      let data_ar = data.map(s => {
        return {
          ...(s.station_details.length
            ? s.station_details[0]
            : s.station_details),
        };
      });

      setSurveyStations(data_ar);
      intial ? setLoadingStations(false) : setRefreshingPage(false);
      setRefreshing(false);
    } catch (error) {
      showMessage({
        message: 'Oops! Something went wrong',
        description:
          'Failed to fetch the survey stations. Please try again later',
      });
      intial ? setLoadingStations(false) : setRefreshingPage(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setLoadingStations(true);
    setRefreshing(true);
    getDatas();
  };

  const _renderItem = ({item}) => {
    return (
      <StationCard
        item={item}
        navigation={navigation}
        navigateScreenName={'SurveyType'}
      />
    );
  };

  return (
    <View
      style={[
        commonStyles.container,
        {backgroundColor: colors.backgroundSecondary, height: height},
      ]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: colors.background,
          padding: responsiveScale(10),
        }}>
        <CountBox
          loading={loadingCount}
          count={counts?.count_completed}
          label={'Today Completed'}
          color={
            status === 'Completed' ? colors.primaryLight : colors.cardSecondary
          }
          textColor={status === 'Completed' ? colors.primary : colors.secondary}
          onPress={() => setStatus('Completed')}
          status={status}
        />

        <CountBox
          loading={loadingCount}
          count={counts?.count_pending}
          label={'Today Pending'}
          color={
            status === 'Pending' ? colors.primaryLight : colors.cardSecondary
          }
          textColor={status === 'Pending' ? colors.primary : colors.secondary}
          onPress={() => setStatus('Pending')}
          status={status}
        />
      </View>
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
        contentContainerStyle={{flexGrow: 1, marginBottom: responsiveScale(15)}}
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
                Sorry! There are no station available for you. Please try again
                later.
              </Text>
            </View>
          )
        }
        keyExtractor={keyExtractor}
        data={surveyStations}
        renderItem={_renderItem}
      />
    </View>
  );
};

export default Surveys;
