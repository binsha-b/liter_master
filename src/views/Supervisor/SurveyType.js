import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {View} from 'react-native-animatable';
import {myDefaultTheme} from '../../utils/theme';
import {commonStyles} from '../../utils/commonStyles';
import {getSurveyStatus} from '../../api';
import {showMessage} from 'react-native-flash-message';
import {responsiveScale} from '../../utils';
import {FONT_FAMILY} from '../../assets/fonts';

const {colors} = myDefaultTheme;

const {height} = Dimensions.get('window');

const SurveyType = ({navigation, route}) => {
  const {stationID, stationName} = route.params;
  const [surveyTypes, setSurveyTypes] = useState([]);
  const [loadingTypes, setLoadingTypes] = useState(true);

  const SurveyTypeCard = ({type, status}) => {
    const getSurveyQuestions = () => {
      navigation.navigate('SurveyQuestions', {
        surveyType: type,
        stationID,
        stationName,
      });
    };

    return (
      <TouchableOpacity
        disabled={status === 'Completed' ? true : false}
        onPress={getSurveyQuestions}
        style={[
          styles.typeCard,
          {
            backgroundColor:
              status === 'Completed'
                ? colors.backgroundSecondary
                : colors.primaryLight,
          },
        ]}>
        <Text
          style={[
            styles.title,
            {color: status === 'Completed' ? colors.primary : colors.secondary},
          ]}>
          {type} Survey
        </Text>
        {status === 'Completed' && (
          <Text style={styles.status}>You already done</Text>
        )}
      </TouchableOpacity>
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: stationName,
    });
  }, [navigation]);

  useEffect(async () => {
    try {
      const body = {
        station_id: stationID,
      };
      let {data} = await getSurveyStatus(body);
      setSurveyTypes(data);
      setLoadingTypes(false);
    } catch (error) {
      showMessage({
        message: 'Oops! Something went wrong',
        description:
          'Failed to fetch the survey status. Please try again later',
      });
    }
  }, []);

  return (
    <View
      style={[
        commonStyles.container,
        {
          backgroundColor: colors.card,
          height: height,
          borderTopWidth: 1,
          borderTopColor: colors.backgroundSecondary,
        },
      ]}>
      {loadingTypes ? (
        <View style={commonStyles.emptyStateContainer}>
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : (
        <View
          style={{
            paddingHorizontal: responsiveScale(15),
            paddingTop: responsiveScale(15),
          }}>
          {surveyTypes.map(types => {
            return <SurveyTypeCard type={types?.type} status={types?.status} />;
          })}
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  status: {
    fontSize: responsiveScale(8),
    alignSelf: 'center',
    color: colors.primary,
    includeFontPadding: false,
  },
  title: {
    fontSize: responsiveScale(15),
    fontFamily: FONT_FAMILY.semibold,
    alignSelf: 'center',
    includeFontPadding: false,
  },
  typeCard: {
    height: responsiveScale(70),
    justifyContent: 'center',
    borderRadius: responsiveScale(10),
    overflow: 'hidden',
    marginBottom: responsiveScale(10),
  },
});
export default SurveyType;
